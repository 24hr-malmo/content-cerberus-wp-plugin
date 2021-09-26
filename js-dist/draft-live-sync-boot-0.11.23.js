(function () {
  'use strict';

  const equalFn = (a, b) => a === b;

  const $PROXY = Symbol("solid-proxy");
  const signalOptions = {
    equals: equalFn
  };
  let runEffects = runQueue;
  const NOTPENDING = {};
  const STALE = 1;
  const PENDING = 2;
  const UNOWNED = {
    owned: null,
    cleanups: null,
    context: null,
    owner: null
  };
  var Owner = null;
  let Transition = null;
  let Listener = null;
  let Pending = null;
  let Updates = null;
  let Effects = null;
  let ExecCount = 0;

  function createRoot(fn, detachedOwner) {
    detachedOwner && (Owner = detachedOwner);
    const listener = Listener,
          owner = Owner,
          root = fn.length === 0 && !false ? UNOWNED : {
      owned: null,
      cleanups: null,
      context: null,
      owner
    };
    Owner = root;
    Listener = null;
    let result;

    try {
      runUpdates(() => result = fn(() => cleanNode(root)), true);
    } finally {
      Listener = listener;
      Owner = owner;
    }

    return result;
  }

  function createSignal(value, options) {
    options = options ? Object.assign({}, signalOptions, options) : signalOptions;
    const s = {
      value,
      observers: null,
      observerSlots: null,
      pending: NOTPENDING,
      comparator: options.equals || undefined
    };
    return [readSignal.bind(s), value => {
      if (typeof value === "function") {
        value = value(s.pending !== NOTPENDING ? s.pending : s.value);
      }

      return writeSignal(s, value);
    }];
  }

  function createComputed(fn, value, options) {
    updateComputation(createComputation(fn, value, true));
  }

  function createRenderEffect(fn, value, options) {
    updateComputation(createComputation(fn, value, false));
  }

  function createEffect(fn, value, options) {
    runEffects = runUserEffects;
    const c = createComputation(fn, value, false);
    c.user = true;
    Effects && Effects.push(c);
  }

  function createMemo(fn, value, options) {
    options = options ? Object.assign({}, signalOptions, options) : signalOptions;
    const c = createComputation(fn, value, true);
    c.pending = NOTPENDING;
    c.observers = null;
    c.observerSlots = null;
    c.state = 0;
    c.comparator = options.equals || undefined;
    updateComputation(c);
    return readSignal.bind(c);
  }

  function batch(fn) {
    if (Pending) return fn();
    let result;
    const q = Pending = [];

    try {
      result = fn();
    } finally {
      Pending = null;
    }

    runUpdates(() => {
      for (let i = 0; i < q.length; i += 1) {
        const data = q[i];

        if (data.pending !== NOTPENDING) {
          const pending = data.pending;
          data.pending = NOTPENDING;
          writeSignal(data, pending);
        }
      }
    }, false);
    return result;
  }

  function untrack(fn) {
    let result,
        listener = Listener;
    Listener = null;
    result = fn();
    Listener = listener;
    return result;
  }

  function onCleanup(fn) {
    if (Owner === null) ;else if (Owner.cleanups === null) Owner.cleanups = [fn];else Owner.cleanups.push(fn);
    return fn;
  }

  function getListener() {
    return Listener;
  }

  function createContext(defaultValue) {
    const id = Symbol("context");
    return {
      id,
      Provider: createProvider(id),
      defaultValue
    };
  }

  function useContext(context) {
    return lookup(Owner, context.id) || context.defaultValue;
  }

  function children(fn) {
    const children = createMemo(fn);
    return createMemo(() => resolveChildren(children()));
  }

  function readSignal() {
    if (this.state && this.sources) {
      const updates = Updates;
      Updates = null;
      this.state === STALE ? updateComputation(this) : lookDownstream(this);
      Updates = updates;
    }

    if (Listener) {
      const sSlot = this.observers ? this.observers.length : 0;

      if (!Listener.sources) {
        Listener.sources = [this];
        Listener.sourceSlots = [sSlot];
      } else {
        Listener.sources.push(this);
        Listener.sourceSlots.push(sSlot);
      }

      if (!this.observers) {
        this.observers = [Listener];
        this.observerSlots = [Listener.sources.length - 1];
      } else {
        this.observers.push(Listener);
        this.observerSlots.push(Listener.sources.length - 1);
      }
    }
    return this.value;
  }

  function writeSignal(node, value, isComp) {
    if (node.comparator) {
      if (node.comparator(node.value, value)) return value;
    }

    if (Pending) {
      if (node.pending === NOTPENDING) Pending.push(node);
      node.pending = value;
      return value;
    }

    node.value = value;

    if (node.observers && (!Updates || node.observers.length)) {
      runUpdates(() => {
        for (let i = 0; i < node.observers.length; i += 1) {
          const o = node.observers[i];
          if (Transition && Transition.running && Transition.disposed.has(o)) ;
          if (o.observers && o.state !== PENDING) markUpstream(o);
          o.state = STALE;
          if (o.pure) Updates.push(o);else Effects.push(o);
        }

        if (Updates.length > 10e5) {
          Updates = [];
          if (false) ;
          throw new Error();
        }
      }, false);
    }

    return value;
  }

  function updateComputation(node) {
    if (!node.fn) return;
    cleanNode(node);
    const owner = Owner,
          listener = Listener,
          time = ExecCount;
    Listener = Owner = node;
    runComputation(node, node.value, time);

    Listener = listener;
    Owner = owner;
  }

  function runComputation(node, value, time) {
    let nextValue;

    try {
      nextValue = node.fn(value);
    } catch (err) {
      handleError(err);
    }

    if (!node.updatedAt || node.updatedAt <= time) {
      if (node.observers && node.observers.length) {
        writeSignal(node, nextValue);
      } else node.value = nextValue;

      node.updatedAt = time;
    }
  }

  function createComputation(fn, init, pure, options) {
    const c = {
      fn,
      state: STALE,
      updatedAt: null,
      owned: null,
      sources: null,
      sourceSlots: null,
      cleanups: null,
      value: init,
      owner: Owner,
      context: null,
      pure
    };
    if (Owner === null) ;else if (Owner !== UNOWNED) {
      {
        if (!Owner.owned) Owner.owned = [c];else Owner.owned.push(c);
      }
    }
    return c;
  }

  function runTop(node) {
    let top = node.state === STALE && node,
        pending;
    if (node.suspense && untrack(node.suspense.inFallback)) return node.suspense.effects.push(node);

    while (node = node.owner) {
      if (node.state === PENDING) pending = node;else if (node.state === STALE) {
        top = node;
        pending = undefined;
      }
    }

    if (pending) {
      const updates = Updates;
      Updates = null;
      lookDownstream(pending);
      Updates = updates;
      if (!top || top.state !== STALE) return;
    }

    top && updateComputation(top);
  }

  function runUpdates(fn, init) {
    if (Updates) return fn();
    let wait = false;
    if (!init) Updates = [];
    if (Effects) wait = true;else Effects = [];
    ExecCount++;

    try {
      fn();
    } catch (err) {
      handleError(err);
    } finally {
      completeUpdates(wait);
    }
  }

  function completeUpdates(wait) {
    if (Updates) {
      runQueue(Updates);
      Updates = null;
    }

    if (wait) return;

    if (Effects.length) batch(() => {
      runEffects(Effects);
      Effects = null;
    });else {
      Effects = null;
    }
  }

  function runQueue(queue) {
    for (let i = 0; i < queue.length; i++) runTop(queue[i]);
  }

  function runUserEffects(queue) {
    let i,
        userLength = 0;

    for (i = 0; i < queue.length; i++) {
      const e = queue[i];
      if (!e.user) runTop(e);else queue[userLength++] = e;
    }

    const resume = queue.length;

    for (i = 0; i < userLength; i++) runTop(queue[i]);

    for (i = resume; i < queue.length; i++) runTop(queue[i]);
  }

  function lookDownstream(node) {
    node.state = 0;

    for (let i = 0; i < node.sources.length; i += 1) {
      const source = node.sources[i];

      if (source.sources) {
        if (source.state === STALE) runTop(source);else if (source.state === PENDING) lookDownstream(source);
      }
    }
  }

  function markUpstream(node) {
    for (let i = 0; i < node.observers.length; i += 1) {
      const o = node.observers[i];

      if (!o.state) {
        o.state = PENDING;
        o.observers && markUpstream(o);
      }
    }
  }

  function cleanNode(node) {
    let i;

    if (node.sources) {
      while (node.sources.length) {
        const source = node.sources.pop(),
              index = node.sourceSlots.pop(),
              obs = source.observers;

        if (obs && obs.length) {
          const n = obs.pop(),
                s = source.observerSlots.pop();

          if (index < obs.length) {
            n.sourceSlots[s] = index;
            obs[index] = n;
            source.observerSlots[index] = s;
          }
        }
      }
    }

    if (node.owned) {
      for (i = 0; i < node.owned.length; i++) cleanNode(node.owned[i]);

      node.owned = null;
    }

    if (node.cleanups) {
      for (i = 0; i < node.cleanups.length; i++) node.cleanups[i]();

      node.cleanups = null;
    }

    node.state = 0;
    node.context = null;
  }

  function handleError(err) {
    throw err;
  }

  function lookup(owner, key) {
    return owner && (owner.context && owner.context[key] || owner.owner && lookup(owner.owner, key));
  }

  function resolveChildren(children) {
    if (typeof children === "function" && !children.length) return resolveChildren(children());

    if (Array.isArray(children)) {
      const results = [];

      for (let i = 0; i < children.length; i++) {
        const result = resolveChildren(children[i]);
        Array.isArray(result) ? results.push.apply(results, result) : results.push(result);
      }

      return results;
    }

    return children;
  }

  function createProvider(id) {
    return function provider(props) {
      let res;
      createComputed(() => res = untrack(() => {
        Owner.context = {
          [id]: props.value
        };
        return children(() => props.children);
      }));
      return res;
    };
  }

  const FALLBACK = Symbol("fallback");

  function dispose(d) {
    for (let i = 0; i < d.length; i++) d[i]();
  }

  function mapArray(list, mapFn, options = {}) {
    let items = [],
        mapped = [],
        disposers = [],
        len = 0,
        indexes = mapFn.length > 1 ? [] : null;
    onCleanup(() => dispose(disposers));
    return () => {
      let newItems = list() || [],
          i,
          j;
      return untrack(() => {
        let newLen = newItems.length,
            newIndices,
            newIndicesNext,
            temp,
            tempdisposers,
            tempIndexes,
            start,
            end,
            newEnd,
            item;

        if (newLen === 0) {
          if (len !== 0) {
            dispose(disposers);
            disposers = [];
            items = [];
            mapped = [];
            len = 0;
            indexes && (indexes = []);
          }

          if (options.fallback) {
            items = [FALLBACK];
            mapped[0] = createRoot(disposer => {
              disposers[0] = disposer;
              return options.fallback();
            });
            len = 1;
          }
        } else if (len === 0) {
          mapped = new Array(newLen);

          for (j = 0; j < newLen; j++) {
            items[j] = newItems[j];
            mapped[j] = createRoot(mapper);
          }

          len = newLen;
        } else {
          temp = new Array(newLen);
          tempdisposers = new Array(newLen);
          indexes && (tempIndexes = new Array(newLen));

          for (start = 0, end = Math.min(len, newLen); start < end && items[start] === newItems[start]; start++);

          for (end = len - 1, newEnd = newLen - 1; end >= start && newEnd >= start && items[end] === newItems[newEnd]; end--, newEnd--) {
            temp[newEnd] = mapped[end];
            tempdisposers[newEnd] = disposers[end];
            indexes && (tempIndexes[newEnd] = indexes[end]);
          }

          newIndices = new Map();
          newIndicesNext = new Array(newEnd + 1);

          for (j = newEnd; j >= start; j--) {
            item = newItems[j];
            i = newIndices.get(item);
            newIndicesNext[j] = i === undefined ? -1 : i;
            newIndices.set(item, j);
          }

          for (i = start; i <= end; i++) {
            item = items[i];
            j = newIndices.get(item);

            if (j !== undefined && j !== -1) {
              temp[j] = mapped[i];
              tempdisposers[j] = disposers[i];
              indexes && (tempIndexes[j] = indexes[i]);
              j = newIndicesNext[j];
              newIndices.set(item, j);
            } else disposers[i]();
          }

          for (j = start; j < newLen; j++) {
            if (j in temp) {
              mapped[j] = temp[j];
              disposers[j] = tempdisposers[j];

              if (indexes) {
                indexes[j] = tempIndexes[j];
                indexes[j](j);
              }
            } else mapped[j] = createRoot(mapper);
          }

          mapped = mapped.slice(0, len = newLen);
          items = newItems.slice(0);
        }

        return mapped;
      });

      function mapper(disposer) {
        disposers[j] = disposer;

        if (indexes) {
          const [s, set] = createSignal(j);
          indexes[j] = set;
          return mapFn(newItems[j], s);
        }

        return mapFn(newItems[j]);
      }
    };
  }

  function createComponent(Comp, props) {

    return untrack(() => Comp(props));
  }

  function trueFn() {
    return true;
  }

  const propTraps = {
    get(_, property, receiver) {
      if (property === $PROXY) return receiver;
      return _.get(property);
    },

    has(_, property) {
      return _.has(property);
    },

    set: trueFn,
    deleteProperty: trueFn,

    getOwnPropertyDescriptor(_, property) {
      return {
        configurable: true,
        enumerable: true,

        get() {
          return _.get(property);
        },

        set: trueFn,
        deleteProperty: trueFn
      };
    },

    ownKeys(_) {
      return _.keys();
    }

  };

  function mergeProps(...sources) {
    return new Proxy({
      get(property) {
        for (let i = sources.length - 1; i >= 0; i--) {
          const v = sources[i][property];
          if (v !== undefined) return v;
        }
      },

      has(property) {
        for (let i = sources.length - 1; i >= 0; i--) {
          if (property in sources[i]) return true;
        }

        return false;
      },

      keys() {
        const keys = [];

        for (let i = 0; i < sources.length; i++) keys.push(...Object.keys(sources[i]));

        return [...new Set(keys)];
      }

    }, propTraps);
  }

  function splitProps(props, ...keys) {
    const blocked = new Set(keys.flat());
    const descriptors = Object.getOwnPropertyDescriptors(props);
    const res = keys.map(k => {
      const clone = {};

      for (let i = 0; i < k.length; i++) {
        const key = k[i];
        Object.defineProperty(clone, key, descriptors[key] ? descriptors[key] : {
          get() {
            return props[key];
          }

        });
      }

      return clone;
    });
    res.push(new Proxy({
      get(property) {
        return blocked.has(property) ? undefined : props[property];
      },

      has(property) {
        return blocked.has(property) ? false : property in props;
      },

      keys() {
        return Object.keys(props).filter(k => !blocked.has(k));
      }

    }, propTraps));
    return res;
  }

  function For(props) {
    const fallback = "fallback" in props && {
      fallback: () => props.fallback
    };
    return createMemo(mapArray(() => props.each, props.children, fallback ? fallback : undefined));
  }

  function Show(props) {
    let strictEqual = false;
    const condition = createMemo(() => props.when, undefined, {
      equals: (a, b) => strictEqual ? a === b : !a === !b
    });
    return createMemo(() => {
      const c = condition();

      if (c) {
        const child = props.children;
        return (strictEqual = typeof child === "function" && child.length > 0) ? untrack(() => child(c)) : child;
      }

      return props.fallback;
    });
  }

  const booleans = ["allowfullscreen", "allowpaymentrequest", "async", "autofocus", "autoplay", "checked", "controls", "default", "disabled", "formnovalidate", "hidden", "ismap", "itemscope", "loop", "multiple", "muted", "nomodule", "novalidate", "open", "playsinline", "readonly", "required", "reversed", "seamless", "selected", "truespeed"];
  const Properties = new Set(["className", "indeterminate", "value", ...booleans]);
  const ChildProperties = new Set(["innerHTML", "textContent", "innerText", "children"]);
  const Aliases = {
    className: "class",
    htmlFor: "for"
  };
  const DelegatedEvents = new Set(["beforeinput", "click", "dblclick", "focusin", "focusout", "input", "keydown", "keyup", "mousedown", "mousemove", "mouseout", "mouseover", "mouseup", "pointerdown", "pointermove", "pointerout", "pointerover", "pointerup", "touchend", "touchmove", "touchstart"]);
  const SVGNamespace = {
    xlink: "http://www.w3.org/1999/xlink",
    xml: "http://www.w3.org/XML/1998/namespace"
  };

  function memo(fn, equals) {
    return createMemo(fn, undefined, !equals ? {
      equals
    } : undefined);
  }

  function reconcileArrays(parentNode, a, b) {
    let bLength = b.length,
        aEnd = a.length,
        bEnd = bLength,
        aStart = 0,
        bStart = 0,
        after = a[aEnd - 1].nextSibling,
        map = null;

    while (aStart < aEnd || bStart < bEnd) {
      if (a[aStart] === b[bStart]) {
        aStart++;
        bStart++;
        continue;
      }

      while (a[aEnd - 1] === b[bEnd - 1]) {
        aEnd--;
        bEnd--;
      }

      if (aEnd === aStart) {
        const node = bEnd < bLength ? bStart ? b[bStart - 1].nextSibling : b[bEnd - bStart] : after;

        while (bStart < bEnd) parentNode.insertBefore(b[bStart++], node);
      } else if (bEnd === bStart) {
        while (aStart < aEnd) {
          if (!map || !map.has(a[aStart])) parentNode.removeChild(a[aStart]);
          aStart++;
        }
      } else if (a[aStart] === b[bEnd - 1] && b[bStart] === a[aEnd - 1]) {
        const node = a[--aEnd].nextSibling;
        parentNode.insertBefore(b[bStart++], a[aStart++].nextSibling);
        parentNode.insertBefore(b[--bEnd], node);
        a[aEnd] = b[bEnd];
      } else {
        if (!map) {
          map = new Map();
          let i = bStart;

          while (i < bEnd) map.set(b[i], i++);
        }

        const index = map.get(a[aStart]);

        if (index != null) {
          if (bStart < index && index < bEnd) {
            let i = aStart,
                sequence = 1,
                t;

            while (++i < aEnd && i < bEnd) {
              if ((t = map.get(a[i])) == null || t !== index + sequence) break;
              sequence++;
            }

            if (sequence > index - bStart) {
              const node = a[aStart];

              while (bStart < index) parentNode.insertBefore(b[bStart++], node);
            } else parentNode.replaceChild(b[bStart++], a[aStart++]);
          } else aStart++;
        } else parentNode.removeChild(a[aStart++]);
      }
    }
  }

  const $$EVENTS = "_$DX_DELEGATE";

  function render(code, element, init) {
    let disposer;
    createRoot(dispose => {
      disposer = dispose;
      insert(element, code(), element.firstChild ? null : undefined, init);
    });
    return () => {
      disposer();
      element.textContent = "";
    };
  }

  function template(html, check, isSVG) {
    const t = document.createElement("template");
    t.innerHTML = html;
    let node = t.content.firstChild;
    if (isSVG) node = node.firstChild;
    return node;
  }

  function delegateEvents(eventNames, document = window.document) {
    const e = document[$$EVENTS] || (document[$$EVENTS] = new Set());

    for (let i = 0, l = eventNames.length; i < l; i++) {
      const name = eventNames[i];

      if (!e.has(name)) {
        e.add(name);
        document.addEventListener(name, eventHandler);
      }
    }
  }

  function setAttribute(node, name, value) {
    if (value == null) node.removeAttribute(name);else node.setAttribute(name, value);
  }

  function setAttributeNS(node, namespace, name, value) {
    if (value == null) node.removeAttributeNS(namespace, name);else node.setAttributeNS(namespace, name, value);
  }

  function addEventListener(node, name, handler, delegate) {
    if (delegate) {
      if (Array.isArray(handler)) {
        node[`$$${name}`] = handler[0];
        node[`$$${name}Data`] = handler[1];
      } else node[`$$${name}`] = handler;
    } else if (Array.isArray(handler)) {
      node.addEventListener(name, e => handler[0](handler[1], e));
    } else node.addEventListener(name, handler);
  }

  function classList(node, value, prev = {}) {
    const classKeys = Object.keys(value),
          prevKeys = Object.keys(prev);
    let i, len;

    for (i = 0, len = prevKeys.length; i < len; i++) {
      const key = prevKeys[i];
      if (!key || key === "undefined" || key in value) continue;
      toggleClassKey(node, key, false);
      delete prev[key];
    }

    for (i = 0, len = classKeys.length; i < len; i++) {
      const key = classKeys[i],
            classValue = !!value[key];
      if (!key || key === "undefined" || prev[key] === classValue) continue;
      toggleClassKey(node, key, classValue);
      prev[key] = classValue;
    }

    return prev;
  }

  function style(node, value, prev = {}) {
    const nodeStyle = node.style;
    if (typeof value === "string") return nodeStyle.cssText = value;
    typeof prev === "string" && (prev = {});
    let v, s;

    for (s in prev) {
      value[s] == null && nodeStyle.removeProperty(s);
      delete prev[s];
    }

    for (s in value) {
      v = value[s];

      if (v !== prev[s]) {
        nodeStyle.setProperty(s, v);
        prev[s] = v;
      }
    }

    return prev;
  }

  function spread(node, accessor, isSVG, skipChildren) {
    if (typeof accessor === "function") {
      createRenderEffect(current => spreadExpression(node, accessor(), current, isSVG, skipChildren));
    } else spreadExpression(node, accessor, undefined, isSVG, skipChildren);
  }

  function insert(parent, accessor, marker, initial) {
    if (marker !== undefined && !initial) initial = [];
    if (typeof accessor !== "function") return insertExpression(parent, accessor, initial, marker);
    createRenderEffect(current => insertExpression(parent, accessor(), current, marker), initial);
  }

  function assign(node, props, isSVG, skipChildren, prevProps = {}) {
    let isCE, isProp, isChildProp;

    for (const prop in props) {
      if (prop === "children") {
        if (!skipChildren) insertExpression(node, props.children);
        continue;
      }

      const value = props[prop];
      if (value === prevProps[prop]) continue;

      if (prop === "style") {
        style(node, value, prevProps[prop]);
      } else if (prop === "class" && !isSVG) {
        node.className = value;
      } else if (prop === "classList") {
        classList(node, value, prevProps[prop]);
      } else if (prop === "ref") {
        value(node);
      } else if (prop.slice(0, 3) === "on:") {
        node.addEventListener(prop.slice(3), value);
      } else if (prop.slice(0, 10) === "oncapture:") {
        node.addEventListener(prop.slice(10), value, true);
      } else if (prop.slice(0, 2) === "on") {
        const name = prop.slice(2).toLowerCase();
        const delegate = DelegatedEvents.has(name);
        addEventListener(node, name, value, delegate);
        delegate && delegateEvents([name]);
      } else if ((isChildProp = ChildProperties.has(prop)) || !isSVG && (isProp = Properties.has(prop)) || (isCE = node.nodeName.includes("-"))) {
        if (isCE && !isProp && !isChildProp) node[toPropertyName(prop)] = value;else node[prop] = value;
      } else {
        const ns = isSVG && prop.indexOf(":") > -1 && SVGNamespace[prop.split(":")[0]];
        if (ns) setAttributeNS(node, ns, prop, value);else setAttribute(node, Aliases[prop] || prop, value);
      }

      prevProps[prop] = value;
    }
  }

  function toPropertyName(name) {
    return name.toLowerCase().replace(/-([a-z])/g, (_, w) => w.toUpperCase());
  }

  function toggleClassKey(node, key, value) {
    const classNames = key.split(/\s+/);

    for (let i = 0, nameLen = classNames.length; i < nameLen; i++) node.classList.toggle(classNames[i], value);
  }

  function eventHandler(e) {
    const key = `$$${e.type}`;
    let node = e.composedPath && e.composedPath()[0] || e.target;

    if (e.target !== node) {
      Object.defineProperty(e, "target", {
        configurable: true,
        value: node
      });
    }

    Object.defineProperty(e, "currentTarget", {
      configurable: true,

      get() {
        return node;
      }

    });

    while (node !== null) {
      const handler = node[key];

      if (handler && !node.disabled) {
        const data = node[`${key}Data`];
        data !== undefined ? handler(data, e) : handler(e);
        if (e.cancelBubble) return;
      }

      node = node.host && node.host !== node && node.host instanceof Node ? node.host : node.parentNode;
    }
  }

  function spreadExpression(node, props, prevProps = {}, isSVG, skipChildren) {
    if (!skipChildren && "children" in props) {
      createRenderEffect(() => prevProps.children = insertExpression(node, props.children, prevProps.children));
    }

    createRenderEffect(() => assign(node, props, isSVG, true, prevProps));
    return prevProps;
  }

  function insertExpression(parent, value, current, marker, unwrapArray) {
    while (typeof current === "function") current = current();

    if (value === current) return current;
    const t = typeof value,
          multi = marker !== undefined;
    parent = multi && current[0] && current[0].parentNode || parent;

    if (t === "string" || t === "number") {
      if (t === "number") value = value.toString();

      if (multi) {
        let node = current[0];

        if (node && node.nodeType === 3) {
          node.data = value;
        } else node = document.createTextNode(value);

        current = cleanChildren(parent, current, marker, node);
      } else {
        if (current !== "" && typeof current === "string") {
          current = parent.firstChild.data = value;
        } else current = parent.textContent = value;
      }
    } else if (value == null || t === "boolean") {
      current = cleanChildren(parent, current, marker);
    } else if (t === "function") {
      createRenderEffect(() => {
        let v = value();

        while (typeof v === "function") v = v();

        current = insertExpression(parent, v, current, marker);
      });
      return () => current;
    } else if (Array.isArray(value)) {
      const array = [];

      if (normalizeIncomingArray(array, value, unwrapArray)) {
        createRenderEffect(() => current = insertExpression(parent, array, current, marker, true));
        return () => current;
      }

      if (array.length === 0) {
        current = cleanChildren(parent, current, marker);
        if (multi) return current;
      } else {
        if (Array.isArray(current)) {
          if (current.length === 0) {
            appendNodes(parent, array, marker);
          } else reconcileArrays(parent, current, array);
        } else if (current == null || current === "") {
          appendNodes(parent, array);
        } else {
          reconcileArrays(parent, multi && current || [parent.firstChild], array);
        }
      }

      current = array;
    } else if (value instanceof Node) {
      if (Array.isArray(current)) {
        if (multi) return current = cleanChildren(parent, current, marker, value);
        cleanChildren(parent, current, null, value);
      } else if (current == null || current === "" || !parent.firstChild) {
        parent.appendChild(value);
      } else parent.replaceChild(value, parent.firstChild);

      current = value;
    } else ;

    return current;
  }

  function normalizeIncomingArray(normalized, array, unwrap) {
    let dynamic = false;

    for (let i = 0, len = array.length; i < len; i++) {
      let item = array[i],
          t;

      if (item instanceof Node) {
        normalized.push(item);
      } else if (item == null || item === true || item === false) ;else if (Array.isArray(item)) {
        dynamic = normalizeIncomingArray(normalized, item) || dynamic;
      } else if ((t = typeof item) === "string") {
        normalized.push(document.createTextNode(item));
      } else if (t === "function") {
        if (unwrap) {
          while (typeof item === "function") item = item();

          dynamic = normalizeIncomingArray(normalized, Array.isArray(item) ? item : [item]) || dynamic;
        } else {
          normalized.push(item);
          dynamic = true;
        }
      } else normalized.push(document.createTextNode(item.toString()));
    }

    return dynamic;
  }

  function appendNodes(parent, array, marker) {
    for (let i = 0, len = array.length; i < len; i++) parent.insertBefore(array[i], marker);
  }

  function cleanChildren(parent, current, marker, replacement) {
    if (marker === undefined) return parent.textContent = "";
    const node = replacement || document.createTextNode("");

    if (current.length) {
      let inserted = false;

      for (let i = current.length - 1; i >= 0; i--) {
        const el = current[i];

        if (node !== el) {
          const isParent = el.parentNode === parent;
          if (!inserted && !i) isParent ? parent.replaceChild(node, el) : parent.insertBefore(node, marker);else isParent && parent.removeChild(el);
        } else inserted = true;
      }
    } else parent.insertBefore(node, marker);

    return [node];
  }

  const init = () => {
    if (wp.data) {
      let lastIsSaving = false;
      let lastIsSavingOther = false;
      wp.data.subscribe(() => {
        const isSavingPost = wp.data.select('core/editor').isSavingPost();
        const isSavingNonPostEntityChanges = wp.data.select('core/editor').isSavingNonPostEntityChanges();

        if (lastIsSaving !== isSavingPost) {
          // This is to check if the post has been saved
          lastIsSaving = isSavingPost;
          const isSaved = wp.data.select('core/editor').didPostSaveRequestSucceed();

          if (isSaved) {
            wp.hooks.doAction('dls.post-saved');
          }
        } else if (lastIsSavingOther !== isSavingNonPostEntityChanges) {
          // This is to check if we saved a reusable block
          lastIsSavingOther = isSavingNonPostEntityChanges;
          const isSaved = wp.data.select('core/editor').didPostSaveRequestSucceed();

          if (isSaved) {
            wp.hooks.doAction('dls.post-saved');
          }
        }
      });
    }
  };

  const $RAW = Symbol("store-raw"),
        $NODE = Symbol("store-node"),
        $NAME = Symbol("store-name");

  function wrap$1(value, name) {
    let p = value[$PROXY];

    if (!p) {
      Object.defineProperty(value, $PROXY, {
        value: p = new Proxy(value, proxyTraps$1)
      });
      const keys = Object.keys(value),
            desc = Object.getOwnPropertyDescriptors(value);

      for (let i = 0, l = keys.length; i < l; i++) {
        const prop = keys[i];

        if (desc[prop].get) {
          const get = desc[prop].get.bind(p);
          Object.defineProperty(value, prop, {
            get
          });
        }
      }
    }

    return p;
  }

  function isWrappable(obj) {
    return obj != null && typeof obj === "object" && (!obj.__proto__ || obj.__proto__ === Object.prototype || Array.isArray(obj));
  }

  function unwrap(item, set = new Set()) {
    let result, unwrapped, v, prop;
    if (result = item != null && item[$RAW]) return result;
    if (!isWrappable(item) || set.has(item)) return item;

    if (Array.isArray(item)) {
      if (Object.isFrozen(item)) item = item.slice(0);else set.add(item);

      for (let i = 0, l = item.length; i < l; i++) {
        v = item[i];
        if ((unwrapped = unwrap(v, set)) !== v) item[i] = unwrapped;
      }
    } else {
      if (Object.isFrozen(item)) item = Object.assign({}, item);else set.add(item);
      const keys = Object.keys(item),
            desc = Object.getOwnPropertyDescriptors(item);

      for (let i = 0, l = keys.length; i < l; i++) {
        prop = keys[i];
        if (desc[prop].get) continue;
        v = item[prop];
        if ((unwrapped = unwrap(v, set)) !== v) item[prop] = unwrapped;
      }
    }

    return item;
  }

  function getDataNodes(target) {
    let nodes = target[$NODE];
    if (!nodes) Object.defineProperty(target, $NODE, {
      value: nodes = {}
    });
    return nodes;
  }

  function proxyDescriptor(target, property) {
    const desc = Reflect.getOwnPropertyDescriptor(target, property);
    if (!desc || desc.get || property === $PROXY || property === $NODE || property === $NAME) return desc;
    delete desc.value;
    delete desc.writable;

    desc.get = () => target[$PROXY][property];

    return desc;
  }

  function ownKeys(target) {
    if (getListener()) {
      const nodes = getDataNodes(target);
      (nodes._ || (nodes._ = createDataNode()))();
    }

    return Reflect.ownKeys(target);
  }

  function createDataNode() {
    const [s, set] = createSignal(undefined, {
      equals: false
    });
    s.$ = set;
    return s;
  }

  const proxyTraps$1 = {
    get(target, property, receiver) {
      if (property === $RAW) return target;
      if (property === $PROXY) return receiver;
      const value = target[property];
      if (property === $NODE || property === "__proto__") return value;
      const wrappable = isWrappable(value);

      if (getListener() && (typeof value !== "function" || target.hasOwnProperty(property))) {
        let nodes, node;

        if (wrappable && (nodes = getDataNodes(value))) {
          node = nodes._ || (nodes._ = createDataNode());
          node();
        }

        nodes = getDataNodes(target);
        node = nodes[property] || (nodes[property] = createDataNode());
        node();
      }

      return wrappable ? wrap$1(value) : value;
    },

    set() {
      return true;
    },

    deleteProperty() {
      return true;
    },

    ownKeys: ownKeys,
    getOwnPropertyDescriptor: proxyDescriptor
  };

  function setProperty(state, property, value) {
    if (state[property] === value) return;
    const array = Array.isArray(state);
    const len = state.length;
    const isUndefined = value === undefined;
    const notify = array || isUndefined === property in state;

    if (isUndefined) {
      delete state[property];
    } else state[property] = value;

    let nodes = getDataNodes(state),
        node;
    (node = nodes[property]) && node.$();
    if (array && state.length !== len) (node = nodes.length) && node.$(node, undefined);
    notify && (node = nodes._) && node.$(node, undefined);
  }

  function mergeStoreNode(state, value) {
    const keys = Object.keys(value);

    for (let i = 0; i < keys.length; i += 1) {
      const key = keys[i];
      setProperty(state, key, value[key]);
    }
  }

  function updatePath(current, path, traversed = []) {
    let part,
        prev = current;

    if (path.length > 1) {
      part = path.shift();
      const partType = typeof part,
            isArray = Array.isArray(current);

      if (Array.isArray(part)) {
        for (let i = 0; i < part.length; i++) {
          updatePath(current, [part[i]].concat(path), [part[i]].concat(traversed));
        }

        return;
      } else if (isArray && partType === "function") {
        for (let i = 0; i < current.length; i++) {
          if (part(current[i], i)) updatePath(current, [i].concat(path), [i].concat(traversed));
        }

        return;
      } else if (isArray && partType === "object") {
        const {
          from = 0,
          to = current.length - 1,
          by = 1
        } = part;

        for (let i = from; i <= to; i += by) {
          updatePath(current, [i].concat(path), [i].concat(traversed));
        }

        return;
      } else if (path.length > 1) {
        updatePath(current[part], path, [part].concat(traversed));
        return;
      }

      prev = current[part];
      traversed = [part].concat(traversed);
    }

    let value = path[0];

    if (typeof value === "function") {
      value = value(prev, traversed);
      if (value === prev) return;
    }

    if (part === undefined && value == undefined) return;
    value = unwrap(value);

    if (part === undefined || isWrappable(prev) && isWrappable(value) && !Array.isArray(value)) {
      mergeStoreNode(prev, value);
    } else setProperty(current, part, value);
  }

  function createStore(store, options) {
    const unwrappedStore = unwrap(store || {});
    const wrappedStore = wrap$1(unwrappedStore);

    function setStore(...args) {
      batch(() => updatePath(unwrappedStore, args));
    }

    return [wrappedStore, setStore];
  }

  const AppContext = createContext([{
    path: 'start'
  }, {}]);
  function AppProvider(props) {
    const startPath = location.hash.replace(/#/, '') || 'sync-check';
    const [state, setState] = createStore({
      path: startPath
    });
    window.addEventListener('popstate', event => {
      const path = event.target.location.hash.replace(/#/, '');
      setState({ ...state,
        path
      });
    });
    const store = [state, {
      apiUrl: props.values.api
    }];
    return createComponent(AppContext.Provider, {
      value: store,

      get children() {
        return props.children;
      }

    });
  }

  let e = {
    data: ""
  },
      t = t => "object" == typeof window ? ((t ? t.querySelector("#_goober") : window._goober) || Object.assign((t || document.head).appendChild(document.createElement("style")), {
    innerHTML: " ",
    id: "_goober"
  })).firstChild : t || e,
      l = /(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(})/g,
      a = /\/\*[^]*?\*\/|\s\s+|\n/g,
      o = (e, t) => {
    let r,
        l = "",
        a = "",
        n = "";

    for (let c in e) {
      let s = e[c];
      "object" == typeof s ? (r = t ? t.replace(/([^,])+/g, e => c.replace(/([^,])+/g, t => /&/.test(t) ? t.replace(/&/g, e) : e ? e + " " + t : t)) : c, a += "@" == c[0] ? "f" == c[1] ? o(s, c) : c + "{" + o(s, "k" == c[1] ? "" : t) + "}" : o(s, r)) : "@" == c[0] && "i" == c[1] ? l = c + " " + s + ";" : (c = c.replace(/[A-Z]/g, "-$&").toLowerCase(), n += o.p ? o.p(c, s) : c + ":" + s + ";");
    }

    return n[0] ? (r = t ? t + "{" + n + "}" : n, l + r + a) : l + a;
  },
      n = {},
      c = e => {
    let t = "";

    for (let r in e) t += r + ("object" == typeof e[r] ? c(e[r]) : e[r]);

    return t;
  },
      s = (e, t, r, s, i) => {
    let p = "object" == typeof e ? c(e) : e,
        u = n[p] || (n[p] = (e => {
      let t = 0,
          r = 11;

      for (; t < e.length;) r = 101 * r + e.charCodeAt(t++) >>> 0;

      return "go" + r;
    })(p));

    if (!n[u]) {
      let t = "object" == typeof e ? e : (e => {
        let t,
            r = [{}];

        for (; t = l.exec(e.replace(a, ""));) t[4] && r.shift(), t[3] ? r.unshift(r[0][t[3]] = r[0][t[3]] || {}) : t[4] || (r[0][t[1]] = t[2]);

        return r[0];
      })(e);
      n[u] = o(i ? {
        ["@keyframes " + u]: t
      } : t, r ? "" : "." + u);
    }

    return ((e, t, r) => {
      -1 == t.data.indexOf(e) && (t.data = r ? e + t.data : t.data + e);
    })(n[u], t, s), u;
  },
      i = (e, t, r) => e.reduce((e, l, a) => {
    let n = t[a];

    if (n && n.call) {
      let e = n(r),
          t = e && e.props && e.props.className || /^go/.test(e) && e;
      n = t ? "." + t : e && "object" == typeof e ? e.props ? "" : o(e, "") : e;
    }

    return e + l + (null == n ? "" : n);
  }, "");

  function p(e) {
    let r = this || {},
        l = e.call ? e(r.p) : e;
    return s(l.unshift ? l.raw ? i(l, [].slice.call(arguments, 1), r.p) : l.reduce((e, t) => t ? Object.assign(e, t.call ? t(r.p) : t) : e, {}) : l, t(r.target), r.g, r.o, r.k);
  }

  p.bind({
    g: 1
  });
      let b = p.bind({
    k: 1
  });

  const ThemeContext = createContext();
  function styled(tag) {
    let _ctx = this || {};

    return (...args) => {
      const Styled = props => {
        const theme = useContext(ThemeContext);
        const withTheme = mergeProps(props, {
          theme
        });
        const clone = mergeProps(withTheme, {
          get className() {
            const pClassName = withTheme.className,
                  append = "className" in withTheme && /^go[0-9]+/.test(pClassName); // Call `css` with the append flag and pass the props

            let className = p.apply({
              target: _ctx.target,
              o: append,
              p: withTheme,
              g: _ctx.g
            }, args);
            return [pClassName, className].filter(Boolean).join(" ");
          }

        });
        const [local, newProps] = splitProps(clone, ["as"]);
        const createTag = local.as || tag;
        let el;

        if (typeof createTag === "function") {
          el = createTag(newProps);
        } else {
          el = document.createElement(createTag);
          spread(el, newProps);
        }

        return el;
      };

      Styled.className = props => {
        return untrack(() => {
          return p.apply({
            target: _ctx.target,
            p: props,
            g: _ctx.g
          }, args);
        });
      };

      return Styled;
    };
  }

  const Container$2 = styled('nav')`
    color: black;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 2rem;
`;
  const StyledLink = styled('a')`
    font-size: 14px;
    display: block;
    padding: 0 1rem;
`;

  const Navigation = () => {
    useContext(AppContext);
    return createComponent(Container$2, {
      get children() {
        return [createComponent(StyledLink, {
          href: "#sync-check",
          children: "Sync Check"
        }), createComponent(StyledLink, {
          href: "#sync-draft",
          children: "Sync Draft"
        }), createComponent(StyledLink, {
          href: "#sync-live",
          children: "Sync Live"
        })];
      }

    });
  };

  const wpAjaxAction = async (action, data = {}) => new Promise((resolve, reject) => {
    jQuery.ajax({
      url: '/wp-admin/admin-ajax.php',
      type: 'post',
      dataType: 'json',
      data: {
        action,
        ...data
      },
      success: function (response) {
        resolve(response);
      },
      error: (xhr, err) => {
        reject(err);
      }
    });
  });

  const wpAjax = async (url, data) => new Promise((resolve, reject) => {
    jQuery.ajax({
      url,
      type: data ? 'post' : 'get',
      dataType: 'json',
      data,
      success: function (response) {
        resolve(response);
      },
      error: (xhr, err) => {
        reject(xhr.responseJSON);
      }
    });
  });

  const Container$1 = styled('div')`
    background-color: white;
    padding: 1.0rem 2rem 2rem;
    border: 3px solid #ccc;
    border-radius: 3px;
    min-height: 50vh;
`;

  const Page = props => {
    return createComponent(Container$1, {
      get children() {
        return props.children;
      }

    });
  };

  const Container = styled('div')`
    display: flex;
`;
  const Content = styled('div')`
    flex: 1;
`;
  const Actions = styled('div')`
    width: 220px;
    align-items: center;
    justify-content: center;
    display: flex;
`;

  const Text = styled('p')`
    font-size: 14px;
    padding-bottom: .5rem;
`;

  const Heading1 = styled('div')`
    font-size: 40px;
    font-weight: bold;
    text-align: center;
    width: 100%;
    padding: 3rem 0 2rem;
`;
  const Heading2 = styled('h2')`
    font-size: 24px;
    margin-bottom: .5rem;
`;
  const Heading3 = styled('h3')`
    font-size: 18px;
    margin-bottom: .5rem;
    margin-top: 0px;
`;

  const PageTop = props => {
    return createComponent(Container, {
      get children() {
        return [createComponent(Content, {
          get children() {
            return [createComponent(Heading2, {
              get children() {
                return props.title;
              }

            }), createComponent(Text, {
              get children() {
                return props.description;
              }

            })];
          }

        }), createComponent(Actions, {
          get children() {
            return props.actions;
          }

        })];
      }

    });
  };

  styled('svg')`
    margin: auto; 
    background: white;
    display: block; 
    shape-rendering: auto;
    width: ${p => p.width};
    height: ${p => p.height};
`;
  styled('svg')`
    margin: auto; 
    background: rgb(255, 255, 255); 
    display: block; 
    shape-rendering: auto;
`;

  const _tmpl$$3 = template(`<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="200px" height="200px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid"><circle cx="50" cy="50" r="32" stroke-width="8" stroke-dasharray="50.26548245743669 50.26548245743669" fill="none" stroke-linecap="round"><animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="2.0408163265306123s" keyTimes="0;1" values="0 50 50;360 50 50"></animateTransform></circle></svg>`);
  const sizes = {
    small: '20px',
    medium: '30px',
    large: '50px',
    xlarge: '100px'
  };

  const Loading = ({
    size = 'large',
    inverted = false
  }) => {
    let width = sizes[size];
    let height = sizes[size];
    let style$1 = {
      display: 'block',
      'shape-rendering': 'auto',
      width,
      height,
      stroke: '#006ba1'
    };

    if (inverted) {
      style$1.stroke = '#fff';
    }

    return (() => {
      const _el$ = _tmpl$$3.cloneNode(true);

      style(_el$, style$1);

      return _el$;
    })();
  };

  const StyledButton$1 = styled('button')`
    max-width: 300px;
    background-color: #006ba1;
    border-color: #006ba1;
    color: #fff;
    min-height: 32px;
    width: 100%;
    line-height: 2.30769231;
    padding: 0 12px;
    transition: background-color .3s ease-in;
    display: inline-block;
    text-decoration: none;
    font-size: 13px;
    line-height: 2.15384615;
    min-height: 30px;
    margin: 0;
    cursor: pointer;
    border-width: 1px;
    border-style: solid;
    appearance: none;
    border-radius: 3px;
    white-space: nowrap;
    box-sizing: border-box;
    text-decoration: none;
    text-shadow: none;
    cursor: pointer;
    margin-top: 10px;

    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;

    &:hover {
       background-color: #4278a3;
       cursor: pointer;
    }

    ${p => p.leftMargin ? `
        margin-left: 20px;
    ` : ''};

    ${p => p.disabled ? `
        cursor: default;
        border: 1px solid rgb(220, 220, 222);
        color: #a7aaad;
        background-color: #f6f7f7;
        &:hover {
            background-color: #f6f7f7;
            cursor: default;
        }
    ` : ''};

`;
  const StyledIcon = styled('div')`
    position: absolute;
    right: 7px;
`;

  const Button = props => {
    ({ ...props
    });

    return createComponent(StyledButton$1, mergeProps(props, {
      get children() {
        return [memo(() => props.children), createComponent(Show, {
          get when() {
            return props.loading;
          },

          get children() {
            return createComponent(StyledIcon, {
              get children() {
                return createComponent(Loading, {
                  size: "small",

                  get inverted() {
                    return !props.disabled;
                  }

                });
              }

            });
          }

        })];
      }

    }));
  };

  const StyledItem = styled('div')`
    display: flex;
    margin-bottom: 2px;
`;
  const StyledType = styled('div')`
    background-color: #ddd;
    font-size: 10px;
    color: #999;
    padding: 0px 4px 0px 4px;
    height: 16px;
    line-height: 15px;
    margin: 0 5px 0 0;
    border-radius: 2px;
    width: 70px;
    text-align: center;
    cursor: pointer;
`;
  const StyledButton = styled('div')`
    background-color: #2271b1;
    font-size: 10px;
    color: white;
    padding: 0px 4px 0px 4px;
    height: 16px;
    line-height: 15px;
    margin: 0 5px 0 0;
    border-radius: 2px;
    cursor: pointer;
`;
  const StyledPermalink = styled('a')`
    display: block;
    color: grey;
    text-decoration: none;
`;
  const StyledDot = styled('div')`
    padding: 0 5px 0 0;
    svg {
        fill: ${p => p.color};
        transition: fill .2s ease-in;
    }
`;

  const _tmpl$$2 = template(`<svg height="10" width="10"><circle cx="5" cy="5" r="5" stroke-width="0"></circle></svg>`);

  const Item = ({
    showCheckButton,
    showSyncButton,
    showDraft,
    showLive,
    item,
    onClick,
    onTypeClick
  }) => {
    const getDot = (info, state) => {
      let color = '#bbbbbb';

      if (state === 'error') {
        color = '#da694b';
      } else if (state === '') {
        color = '#bbbbbb';
      } else {
        if (info) {
          if (info.synced) {
            color = '#99da4b';
          } else {
            color = '#e9da4e';
          }
        }
      }

      return color;
    };

    return createComponent(StyledItem, {
      get children() {
        return [createComponent(Show, {
          when: showDraft,

          get children() {
            return createComponent(StyledDot, {
              get color() {
                var _item$status, _item$status2;

                return getDot((_item$status = item.status) === null || _item$status === void 0 ? void 0 : _item$status.draft, (_item$status2 = item.status) === null || _item$status2 === void 0 ? void 0 : _item$status2.state);
              },

              get children() {
                return _tmpl$$2.cloneNode(true);
              }

            });
          }

        }), createComponent(Show, {
          when: showLive,

          get children() {
            return createComponent(StyledDot, {
              get color() {
                var _item$status3, _item$status4;

                return getDot((_item$status3 = item.status) === null || _item$status3 === void 0 ? void 0 : _item$status3.live, (_item$status4 = item.status) === null || _item$status4 === void 0 ? void 0 : _item$status4.state);
              },

              get children() {
                return _tmpl$$2.cloneNode(true);
              }

            });
          }

        }), createComponent(Show, {
          when: showSyncButton,

          get children() {
            return createComponent(StyledButton, {
              onClick: onClick,
              children: "sync"
            });
          }

        }), createComponent(Show, {
          when: showCheckButton,

          get children() {
            return createComponent(StyledButton, {
              onClick: onClick,
              children: "check"
            });
          }

        }), createComponent(StyledType, {
          onClick: () => onTypeClick(item.type),

          get children() {
            return item.type;
          }

        }), createComponent(StyledPermalink, {
          target: "_new",

          get href() {
            return item.permalink;
          },

          get children() {
            return item.permalink || '/';
          }

        })];
      }

    });
  };

  const SyncContent = ({
    type
  }) => {
    const [_, {
      apiUrl
    }] = useContext(AppContext);
    const [items, setItems] = createStore({
      list: []
    });
    const [checking, setChecking] = createSignal(false);
    createEffect(async () => {
      const result = await wpAjaxAction('get_all_resources');
      const parsed = result.list.map((item, index) => {
        return { ...item,
          index
        };
      });
      setItems({
        list: parsed
      });
    });

    const sync = async item => {
      try {
        const result = await wpAjax(`${apiUrl}/sync.php`, {
          action: 'sync',
          permalink: item.permalink,
          release: type,
          sync_check: false
        });

        if (result.data) {
          setItems('list', item.index, 'status', {
            [type]: {
              synced: true
            },
            state: 'loaded'
          });
        } else {
          setItems('list', item.index, 'status', {
            state: 'error'
          });
        }
      } catch (err) {
        setItems('list', item.index, 'status', {
          state: 'error'
        });
      }
    };

    const syncItem = async item => {
      setChecking(true);
      await sync(item);
      setChecking(false);
    };

    const doAll = async () => {
      if (checking()) {
        return;
      }

      let ok = false;

      if (type === 'live' && confirm('Do you really which to publish everything?')) {
        ok = true;
      } else if (type === 'draft') {
        ok = true;
      }

      if (ok) {
        setChecking(true);
        items.list.forEach((_, index) => {
          setItems('list', index, 'status', {
            state: ''
          });
          index++;
        });

        for await (let item of items.list) {
          await sync(item);
        }

        setChecking(false);
      }
    };

    const syncByType = async type => {
      setChecking(true);
      const filtered = items.list.filter(item => item.type === type);
      filtered.forEach((_, index) => {
        setItems('list', index, 'status', {
          state: ''
        });
        index++;
      });

      for await (let item of filtered) {
        await sync(item);
      }

      setChecking(false);
    };

    const buttonText = type === 'draft' ? 'Begin to sync to Draft' : 'Publish everything to Live';
    const title = type === 'draft' ? 'Sync Draft' : 'Sync Live';
    const description = type === 'draft' ? 'This is where you can make sure that wordpress and the draft content is in sync' : 'This is where you can make sure that Draft and Live are in sync';
    return createComponent(Page, {
      get children() {
        return [createComponent(PageTop, {
          title: title,
          description: description,

          get actions() {
            return createComponent(Button, {
              get loading() {
                return checking();
              },

              onClick: () => doAll(),
              children: buttonText
            });
          }

        }), createComponent(For, {
          get each() {
            return items.list;
          },

          children: item => {
            return createComponent(Item, {
              showDraft: type === 'draft',
              showLive: type === 'live',
              showSyncButton: true,
              onClick: () => syncItem(item),
              onTypeClick: () => syncByType(item.type),
              item: item,

              get permalink() {
                return item.permalink;
              }

            });
          }
        })];
      }

    });
  };

  const SyncCheck = () => {
    const [_, {
      apiUrl
    }] = useContext(AppContext);
    const [items, setItems] = createStore({
      list: []
    });
    const [checking, setChecking] = createSignal(false);
    console.log(apiUrl);
    createEffect(async () => {
      const result = await wpAjaxAction('get_all_resources');
      const parsed = result.list.map((item, index) => {
        return { ...item,
          index
        };
      });
      setItems({
        list: parsed
      });
    });

    const sync = async item => {
      try {
        const result = await wpAjax(`${apiUrl}/check-sync.php`, {
          permalink: item.permalink
        });
        setItems('list', item.index, 'status', {
          draft: result.data.resourceStatus.find(itemStatus => itemStatus.target === 'draft' && itemStatus.comparedTo === '__original'),
          live: result.data.resourceStatus.find(itemStatus => itemStatus.target === 'live' && itemStatus.comparedTo === 'draft'),
          state: 'loaded'
        });
      } catch (err) {
        setItems('list', item.index, 'status', {
          state: 'error'
        });
      }
    };

    const syncItem = async item => {
      setChecking(true);
      await sync(item);
      setChecking(false);
    };

    const doAll = async () => {
      if (checking()) {
        return;
      }

      setChecking(true);
      items.list.forEach((_, index) => {
        setItems('list', index, 'status', {
          state: ''
        });
        index++;
      });

      for await (let item of items.list) {
        await sync(item);
      }

      setChecking(false);
    };

    const syncByType = async type => {
      setChecking(true);
      const filtered = items.list.filter(item => item.type === type);
      filtered.forEach((_, index) => {
        setItems('list', index, 'status', {
          state: ''
        });
        index++;
      });

      for await (let item of filtered) {
        await sync(item);
      }

      setChecking(false);
    };

    return createComponent(Page, {
      get children() {
        return [createComponent(PageTop, {
          title: "Sync Check",
          description: "This is where you can check if all content is in sync",

          get actions() {
            return createComponent(Button, {
              get loading() {
                return checking();
              },

              onClick: () => doAll(),
              children: "Begin to check"
            });
          }

        }), createComponent(For, {
          get each() {
            return items.list;
          },

          children: item => {
            return createComponent(Item, {
              showDraft: true,
              showLive: true,
              showCheckButton: true,
              item: item,

              get permalink() {
                return item.permalink;
              },

              onClick: () => syncItem(item),
              onTypeClick: () => syncByType(item.type)
            });
          }
        })];
      }

    });
  };

  const StyledContainer$2 = styled('div')`
     color: black;
     max-width: 1200px;
     margin: 0 auto;
`;
  styled('div')`
`;
  styled('div')`
    font-size: 1rem;
    padding: 1rem 0;
`;

  const App = () => {
    const [state] = useContext(AppContext);
    return createComponent(StyledContainer$2, {
      get children() {
        return [createComponent(Heading1, {
          children: "Content Dashboard"
        }), createComponent(Navigation, {}), createComponent(Show, {
          get when() {
            return state.path === 'sync-check';
          },

          get children() {
            return createComponent(SyncCheck, {});
          }

        }), createComponent(Show, {
          get when() {
            return state.path === 'sync-draft';
          },

          get children() {
            return createComponent(SyncContent, {
              type: "draft"
            });
          }

        }), createComponent(Show, {
          get when() {
            return state.path === 'sync-live';
          },

          get children() {
            return createComponent(SyncContent, {
              type: "live"
            });
          }

        })];
      }

    });
  };

  const StyledContainer$1 = styled('div')`

    padding-top: 6px;

    ${p => p.horizontal ? `
        display: flex;   
        align-items: center;
        border-bottom: 1px dotted grey;
        padding: 0 10px 8px 10px;
        margin-left: -10px;
        margin-right: -10px;
        justify-content: flex-end;
    ` : ''} 

    ${p => p.box ? `
        position: relative;
        min-width: 255px;
        border: 1px solid #ccd0d4;
        box-shadow: 0 1px 1px rgb(0 0 0 / 4%);
        background: #fff;
        padding: 1rem;
        box-sizing: border-box;
        margin-bottom: 7px;
    ` : ''}

`;
  const StyledChecking = styled('div')`
    color: #a7aaad;
    border: 1px solid rgb(220, 220, 222);
    background: #f6f7f7;
    padding: .75rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 3px;

    ${p => p.horizontal ? `
        padding: 0px;
        border: 0px;
        padding: 4px 10px 5px 10px;
        background: transparent;
        flex-direction: row;
        align-items: center;
        margin-top: 10px;
    ` : ''} 

`;
  const StyledStatusText = styled('div')`
    text-align: center;
    min-width: 100px;
    ${p => p.horizontal ? `
        margin-top: 10px;
    ` : ''}

`;

  const MetaBox = ({
    options
  }) => {
    const [status, setStatus] = createStore({});
    const [checking, setChecking] = createSignal(true);
    const [publishing, setPublishing] = createSignal(false);
    const [unpublishing, setUnpublishing] = createSignal(false);
    const payload = {
      permalink: options.permalink
    }; // Dont run this if its an older version of wp or not running gutenberg

    createEffect(() => {
      if (wp && wp.hooks && wp.hooks.addAction) {
        check();
        wp.hooks.addAction('dls.post-saved', 'dls', () => {
          check(false);
        });
      }
    });

    const check = async (showChecking = true) => {
      if (showChecking) {
        setChecking(true);
        await new Promise(resolve => setTimeout(resolve, 500));
      }

      try {
        const result = await wpAjax(`${options.api}/check-sync.php`, payload);
        setStatus({
          draft: result.data.resourceStatus.find(itemStatus => itemStatus.target === 'draft' && itemStatus.comparedTo === '__original'),
          live: result.data.resourceStatus.find(itemStatus => itemStatus.target === 'live' && itemStatus.comparedTo === 'draft'),
          state: 'loaded'
        });
      } catch (err) {
        console.log('ee', err);
        setStatus({
          state: 'error'
        });
      }

      setChecking(false);
    };

    const publish = async e => {
      // If we dont stop the event, the options page in wp is saved by ACF
      e.preventDefault();
      e.stopPropagation();
      setPublishing(true);
      const result = await wpAjaxAction('publish_to_live', payload);

      if (result.data) {
        check(false);
      } else {
        setStatus({
          state: 'error'
        });
      }

      await new Promise(resolve => setTimeout(resolve, 1000));
      setPublishing(false);
    };

    const unpublish = async e => {
      // If we dont stop the event, the options page in wp is saved by ACF
      e.preventDefault();
      e.stopPropagation();
      setUnpublishing(true);
      const result = await wpAjaxAction('unpublish_from_live', payload);

      if (result.data) {
        check(false);
      } else {
        setStatus({
          state: 'error'
        });
      }

      await new Promise(resolve => setTimeout(resolve, 1000));
      setUnpublishing(false);
    };

    return createComponent(StyledContainer$1, {
      get horizontal() {
        return options.metaMenu;
      },

      get box() {
        return options.optionsMeta;
      },

      get children() {
        return [createComponent(Show, {
          get when() {
            return checking();
          },

          get children() {
            return createComponent(StyledChecking, {
              get horizontal() {
                return options.metaMenu;
              },

              get children() {
                return [createComponent(Loading, {
                  get size() {
                    return options.metaMenu ? 'small' : 'large';
                  }

                }), createComponent(StyledStatusText, {
                  children: "Checking content in draft and live"
                })];
              }

            });
          }

        }), createComponent(Show, {
          get when() {
            return !checking();
          },

          get children() {
            return [createComponent(StyledStatusText, {
              get horizontal() {
                return options.metaMenu;
              },

              children: "Publish content"
            }), createComponent(Button, {
              get leftMargin() {
                return options.metaMenu;
              },

              get loading() {
                return publishing();
              },

              onClick: e => publish(e),

              get disabled() {
                var _status$live;

                return (_status$live = status.live) === null || _status$live === void 0 ? void 0 : _status$live.synced;
              },

              get children() {
                var _status$live2;

                return (_status$live2 = status.live) !== null && _status$live2 !== void 0 && _status$live2.synced ? 'Published to live site' : 'Publish to live site';
              }

            }), createComponent(Button, {
              get leftMargin() {
                return options.metaMenu;
              },

              get loading() {
                return unpublishing();
              },

              onClick: e => unpublish(e),

              get disabled() {
                var _status$live3;

                return !((_status$live3 = status.live) !== null && _status$live3 !== void 0 && _status$live3.synced);
              },

              get children() {
                return status.live && status.live.synced ? 'Unpublish from live site' : 'Content not published';
              }

            }), createComponent(Show, {
              get when() {
                return options.enableTestContent;
              },

              get children() {
                return createComponent(Button, {
                  get leftMargin() {
                    return options.metaMenu;
                  },

                  get loading() {
                    return unpublishing();
                  },

                  onClick: e => unpublish(e),

                  get disabled() {
                    var _status$test;

                    return !((_status$test = status.test) !== null && _status$test !== void 0 && _status$test.synced);
                  },

                  get children() {
                    return status.test && status.test.synced ? 'Unpublish from test target' : 'Publish to test target';
                  }

                });
              }

            }), createComponent(Show, {
              get when() {
                return options.enableDiffButton;
              },

              get children() {
                return createComponent(Button, {
                  get leftMargin() {
                    return options.metaMenu;
                  },

                  children: "Show diff (raw)"
                });
              }

            })];
          }

        })];
      }

    });
  };

  const StyledInput = styled('input')`
`;
  const StyledInputBox$1 = styled('div')`
    display: flex;
    flex-direction: column;
    width: 100%;
    padding-right: 10px;
    box-sizing: border-box;
`;
  const StyledInputLabel$1 = styled('label')`
    padding: 5px 5px 0px 5px;
    font-size: 10px;
    height: 18px;
`;

  const Input = ({
    placeholder = '',
    label = ' ',
    value,
    onChange = () => {}
  }) => {
    const update = e => {
      onChange(e.target.value); // current());
    };

    return createComponent(StyledInputBox$1, {
      get children() {
        return [createComponent(StyledInputLabel$1, {
          children: label
        }), createComponent(StyledInput, {
          type: "text",

          get value() {
            return value();
          },

          placeholder: placeholder,
          onKeyup: update
        })];
      }

    });
  };

  const StyledSelect = styled('select')`
    max-width: 100% !important;
`;
  const StyledInputBox = styled('div')`
    display: flex;
    flex-direction: column;
    width: 100%;
    padding-left: 10px;
    box-sizing: border-box;
`;
  const StyledInputLabel = styled('label')`
    padding: 5px 5px 0px 5px;
    font-size: 10px;
    height: 18px;
`;

  const _tmpl$$1 = template(`<option></option>`);

  const Select = ({
    options = [],
    placeholder = '',
    label = ' ',
    value,
    onChange = () => {}
  }) => {
    const update = e => {
      console.log(e);
      onChange(e.target.value);
    };

    return createComponent(StyledInputBox, {
      get children() {
        return [createComponent(StyledInputLabel, {
          children: label
        }), createComponent(StyledSelect, {
          get value() {
            return value();
          },

          placeholder: placeholder,
          onChange: update,

          get children() {
            return createComponent(For, {
              each: options,
              children: option => (() => {
                const _el$ = _tmpl$$1.cloneNode(true);

                insert(_el$, () => option.label);

                createRenderEffect(_p$ => {
                  const _v$ = option.value,
                        _v$2 = option.value === value();

                  _v$ !== _p$._v$ && (_el$.value = _p$._v$ = _v$);
                  _v$2 !== _p$._v$2 && (_el$.selected = _p$._v$2 = _v$2);
                  return _p$;
                }, {
                  _v$: undefined,
                  _v$2: undefined
                });

                return _el$;
              })()
            });
          }

        })];
      }

    });
  };

  const slideInAnimation = b`
    0% {
        max-height: 0;
    }
    100% {
        max-height: 300px;
    }
`;
  const slideStartAnimation = b`
    0% {
        max-height: 0;
    }
    100% {
        max-height: 0;
    }
`;
  const slideOutAnimation = b`
    0% {
        max-height: 300px;
    }
    100% {
        max-height: 0;
    }
`;
  const animations = {
    'open': slideInAnimation,
    'close': slideOutAnimation,
    'init': slideStartAnimation
  };
  const StyledContainer = styled('div')`
     color: black;
     max-width: 1200px;
     margin: 0 auto;
`;
  styled('div')`
`;
  styled('div')`
    font-size: 1rem;
    padding: 1rem 0;
`;
  const StyledAddBox = styled('div')`
    display: flex;
    justify-content: flex-end;
`;
  const StyledNewDomainContainer = styled('div')`
    max-height: 0px;
    overflow: hidden;
    ${p => {
  return `animation: ${animations[p.state]} .4s ease-in-out forwards;`;
}}
`;
  const StyledNewDomainInnerContainer = styled('div')`
    background-color: #fff;
    border: 1px solid #aaa;
    border-radius: 3px;
    margin-top: 20px;
    padding: 20px;
`;
  const StyledNewDomainBox = styled('div')`
    width: 100%;
    display: flex;
    padding-bottom: 10px;
`;
  const StyledNewDomainButtonBox = styled('div')`
    width: 100%;
    display: flex;
    justify-content: flex-end;
`;
  const StyledError = styled('div')`
    color red;
`;
  const StyledRemoveButton = styled('div')`
    background-color: #2271b1;
    font-size: 10px;
    color: white;
    padding: 0px 4px 0px 4px;
    height: 16px;
    line-height: 15px;
    margin: 0 5px 0 0;
    border-radius: 2px;
    cursor: pointer;
    max-width: 30px;
    text-align: center;
`;
  const StyledTable = styled('table')`
    margin-top: 20px;
    background-color: #fff;
    padding: 20px;
    border-radius: 3px;
    border: 1px solid #aaa;
    box-sizing: border-box;
    width: 100%;
    thead {
        text-align: left;
    }
`;
  const StyledTDActions = styled('td')`
    display: flex;
    justify-content: flex-end;
`;

  const _tmpl$ = template(`<thead><tr><th>Domain</th><th>Target</th><th>SiteId</th><th></th></tr></thead>`),
        _tmpl$2 = template(`<tbody></tbody>`),
        _tmpl$3 = template(`<tr><td></td><td></td><td></td></tr>`);
  const targetOptions = [{
    value: 'draft',
    label: 'Draft'
  }, {
    value: 'live',
    label: 'Live'
  }, {
    value: 'test',
    label: 'Test'
  }];

  function makeId(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;

    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
  }

  const DomainSettings = ({
    options
  }) => {
    const [state, setState] = createStore({
      list: []
    });
    const [domain, setDomain] = createSignal('');
    const [target, setTarget] = createSignal('draft');
    const [showCreate, setShowCreate] = createSignal('init');
    const [errorMessage, setErrorMessage] = createSignal('');
    const [saving, setSaving] = createSignal(false);

    const getDomainSettings = async () => {
      const result = await wpAjax(`${options.api}/get-domain-settings.php`);
      setState('list', result);
    };

    const upsert = async (id = makeId(20)) => {
      try {
        setErrorMessage('');

        if (saving()) {
          return;
        }

        setSaving(true);
        await wpAjax(`${options.api}/upsert-domain-setting.php`, {
          domain: domain(),
          target: target(),
          id
        });
        await getDomainSettings();
        setTarget('draft');
        setDomain('');
        setSaving(false);
        setShowCreate('close');
      } catch (err) {
        console.log('ee', err);

        if (err.error === 'domain-already-exists') {
          setErrorMessage('Domain already exists');
        } else {
          setErrorMessage('Something caused an error');
        }

        setSaving(false);
      }
    };

    const deleteEntry = async id => {
      try {
        await wpAjax(`${options.api}/delete-domain-setting.php`, {
          id
        });
        await getDomainSettings();
      } catch (err) {
        console.log(err);
      }
    };

    const updateValue = (name, value) => {
      // For now, just ignore domains that arent valid
      // if (name === 'domain' && !value.match(domainRe)) {
      //     return;
      // }
      if (name === 'domain') {
        setDomain(value);
      }

      if (name === 'target') {
        setTarget(value);
      }
    };

    createEffect(() => {
      getDomainSettings();
    });
    return createComponent(StyledContainer, {
      get children() {
        return [createComponent(Heading1, {
          children: "Domain Settings"
        }), createComponent(Text, {
          children: "This is the list of domains and targets that will be used for this site. You can add as many as you need but the domains need to be pointed to the server to make it work."
        }), createComponent(StyledAddBox, {
          get children() {
            return createComponent(Button, {
              onClick: () => setShowCreate('open'),
              children: "Add new domain and target"
            });
          }

        }), createComponent(StyledNewDomainContainer, {
          get state() {
            return showCreate();
          },

          get children() {
            return createComponent(StyledNewDomainInnerContainer, {
              get children() {
                return [createComponent(Heading3, {
                  children: "Add new domain and target"
                }), createComponent(StyledNewDomainBox, {
                  get children() {
                    return [createComponent(Input, {
                      placeholder: "domain",
                      label: "Domain:",
                      value: domain,
                      onChange: value => updateValue('domain', value)
                    }), createComponent(Select, {
                      options: targetOptions,
                      value: target,
                      onChange: value => updateValue('target', value)
                    })];
                  }

                }), createComponent(Show, {
                  when: errorMessage,

                  get children() {
                    return createComponent(StyledError, {
                      children: errorMessage
                    });
                  }

                }), createComponent(StyledNewDomainButtonBox, {
                  get children() {
                    return [createComponent(Button, {
                      onClick: () => setShowCreate('close'),
                      children: "Cancel"
                    }), createComponent(Button, {
                      get loading() {
                        return saving();
                      },

                      leftMargin: true,

                      get disabled() {
                        return !domain() || !target();
                      },

                      onClick: () => upsert(),
                      children: "Save"
                    })];
                  }

                })];
              }

            });
          }

        }), createComponent(StyledTable, {
          get children() {
            return [_tmpl$.cloneNode(true), (() => {
              const _el$2 = _tmpl$2.cloneNode(true);

              insert(_el$2, createComponent(For, {
                get each() {
                  return state.list;
                },

                children: item => (() => {
                  const _el$3 = _tmpl$3.cloneNode(true),
                        _el$4 = _el$3.firstChild,
                        _el$5 = _el$4.nextSibling,
                        _el$6 = _el$5.nextSibling;

                  insert(_el$4, () => item.content.domain);

                  insert(_el$5, () => item.content.target);

                  insert(_el$6, () => item.content.siteId);

                  insert(_el$3, createComponent(StyledTDActions, {
                    get children() {
                      return createComponent(StyledRemoveButton, {
                        onClick: () => deleteEntry(item.externalId),
                        children: "delete"
                      });
                    }

                  }), null);

                  return _el$3;
                })()
              }));

              return _el$2;
            })()];
          }

        })];
      }

    });
  };

  const getData = id => {
    try {
      return JSON.parse(document.getElementById(id).innerHTML); // eslint-disable-line
    } catch (err) {
      return {};
    }
  };

  const renderMetaBox = () => {
    let root = document.getElementById('dls-metabox-root');

    if (root) {
      const data = getData('dls-data');
      data.metaMenu = root.getAttribute('data-type') === 'nav-menu';

      if (data.metaMenu) {
        root = document.createElement('div');
        root && document.querySelector('#nav-menu-footer').prepend(root);
      }

      render(() => createComponent(MetaBox, {
        options: data
      }), root);
    }
  };

  const renderAdmin = () => {
    const data = getData('dls-data');
    render(() => createComponent(AppProvider, {
      values: data,

      get children() {
        return createComponent(App, {});
      }

    }), document.getElementById('dls-root'));
  };

  const renderDomainSettings = () => {
    const root = document.getElementById('dls-domain-settings-root');
    const data = getData('dls-data');
    render(() => createComponent(DomainSettings, {
      options: data
    }), root);
  };

  jQuery(document).ready(function ($) {
    // Turn off the pre publish dialog
    if (wp && wp.data && wp.data.dispatch) {
      wp.data.dispatch('core/editor').disablePublishSidebar();
    }

    init();
    let hookData = {};

    try {
      hookData = $('#dls-hooks').length > 0 ? JSON.parse($('#dls-hooks').html()) : {
        hook: ''
      };
    } catch (err) {}
    console.log('Current hook', hookData && hookData.hook);

    if (hookData.hook === 'post.php' || hookData.hook === 'post-new.php') {
      renderMetaBox();
    } else if (hookData.hook === 'nav-menus.php') {
      renderMetaBox();
    } else if (hookData.hook.includes('toplevel_page_draft-live-sync')) {
      renderAdmin();
    } else if (hookData.hook.includes('toplevel_page_cerberus-domain-settings')) {
      renderDomainSettings();
    } else if (!hookData.hook.includes('.php')) {
      renderMetaBox();
    }
  });

}());
//# sourceMappingURL=draft-live-sync-boot-0.11.23.js.map
