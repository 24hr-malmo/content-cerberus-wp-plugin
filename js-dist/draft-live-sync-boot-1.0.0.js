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

  function onMount(fn) {
    createEffect(() => untrack(fn));
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

  function Switch(props) {
    let strictEqual = false;
    const conditions = children(() => props.children),
          evalConditions = createMemo(() => {
      let conds = conditions();
      if (!Array.isArray(conds)) conds = [conds];

      for (let i = 0; i < conds.length; i++) {
        const c = conds[i].when;
        if (c) return [i, c, conds[i]];
      }

      return [-1];
    }, undefined, {
      equals: (a, b) => a && a[0] === b[0] && (strictEqual ? a[1] === b[1] : !a[1] === !b[1]) && a[2] === b[2]
    });
    return createMemo(() => {
      const [index, when, cond] = evalConditions();
      if (index < 0) return props.fallback;
      const c = cond.children;
      return (strictEqual = typeof c === "function" && c.length > 0) ? untrack(() => c(when)) : c;
    });
  }

  function Match(props) {
    return props;
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
        const isSavingNonPostEntityChanges = wp.data.select('core/editor').isSavingNonPostEntityChanges && wp.data.select('core/editor').isSavingNonPostEntityChanges();

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
    const startPath = location.hash.replace(/#/, '') || 'start';
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

  let g = p.bind({
    g: 1
  }),
      b = p.bind({
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

  const Container = styled('nav')`
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
    const [state, {
      navigate
    }] = useContext(AppContext);
    return createComponent(Container, {
      get children() {
        return [createComponent(StyledLink, {
          href: "#start",
          children: "Start"
        }), createComponent(StyledLink, {
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
        reject(xhr.responseJSON || err);
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

  const Container$2 = styled('div')`
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
    margin: 2rem 0 4rem;
    line-height: 1.2;
    display: block;
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
    return createComponent(Container$2, {
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

  const xStyledSvg = styled('svg')`
    margin: auto; 
    background: white;
    display: block; 
    shape-rendering: auto;
    width: ${p => p.width};
    height: ${p => p.height};
`;
  const StyledSvg = styled('svg')`
    margin: auto; 
    background: rgb(255, 255, 255); 
    display: block; 
    shape-rendering: auto;
`;

  const _tmpl$ = template(`<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="200px" height="200px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid"><circle cx="50" cy="50" r="32" stroke-width="8" stroke-dasharray="50.26548245743669 50.26548245743669" fill="none" stroke-linecap="round"><animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="2.0408163265306123s" keyTimes="0;1" values="0 50 50;360 50 50"></animateTransform></circle></svg>`);
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
      const _el$ = _tmpl$.cloneNode(true);

      style(_el$, style$1);

      return _el$;
    })();
  };

  const StyledButton = styled('button')`
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

    return createComponent(StyledButton, mergeProps(props, {
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
  const StyledButton$1 = styled('div')`
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

  const _tmpl$$1 = template(`<svg height="10" width="10"><circle cx="5" cy="5" r="5" stroke-width="0"></circle></svg>`);

  const Item = ({
    showCheckButton,
    showSyncButton,
    showDraft,
    showLive,
    item,
    onClick,
    onTypeClick,
    getAllTargetsContent
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

    const logContent = async () => {
      console.log('Item: ', item);

      try {
        const result = await getAllTargetsContent();
        console.log(result);
      } catch (err) {
        console.log('Error logging diff: ', err);
      }
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
                return _tmpl$$1.cloneNode(true);
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
                return _tmpl$$1.cloneNode(true);
              }

            });
          }

        }), createComponent(Show, {
          when: showSyncButton,

          get children() {
            return createComponent(StyledButton$1, {
              onClick: onClick,
              children: "sync"
            });
          }

        }), createComponent(Show, {
          when: showCheckButton,

          get children() {
            return createComponent(StyledButton$1, {
              onClick: onClick,
              children: "check"
            });
          }

        }), createComponent(Show, {
          when: showCheckButton,

          get children() {
            return createComponent(StyledButton$1, {
              onClick: logContent,
              children: "log"
            });
          }

        }), createComponent(StyledType, {
          onClick: onTypeClick,

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

    const getAllTargetsContent = async permalink => {
      const result = await wpAjax(`${apiUrl}/get-all-targets-content.php`, {
        permalink: permalink
      });
      return result;
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
              getAllTargetsContent: () => getAllTargetsContent(item.permalink),

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

  const Warning = styled('p')`
    font-size: 14px;
    padding-bottom: .5rem;
    background-color: #ffeaee;
    border: 2px solid #ffc0cb;
    border-radius: 3px;
    padding: 1rem 2rem;
    text-align: center;
`;

  const Start = () => {
    return createComponent(Page, {
      get children() {
        return [createComponent(PageTop, {
          title: "Start",
          description: "This plugin lets you control and debug content through the content service."
        }), createComponent(Warning, {
          children: "This is mainly used while developing or by admins!"
        })];
      }

    });
  };

  const StyledContainer = styled('div')`
     color: black;
     max-width: 1200px;
     margin: 0 auto;
`;
  const StyledTitle = styled('div')`
`;
  const StyledParagraph = styled('div')`
    font-size: 1rem;
    padding: 1rem 0;
`;

  const App = () => {
    const [state] = useContext(AppContext);
    return createComponent(StyledContainer, {
      get children() {
        return [createComponent(Heading1, {
          children: "Content Dashboard"
        }), createComponent(Navigation, {}), createComponent(Show, {
          get when() {
            return state.path === 'start';
          },

          get children() {
            return createComponent(Start, {});
          }

        }), createComponent(Show, {
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
    box-sizing: border-box !important;

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
  const StyledError = styled('div')`
    color: red;
    padding-top: 0.4rem;
`;
  const StyledWarning = styled('div')`
    color: darkgray;
    padding-top: 0.4rem;
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

  const [contentStatus, setContentStatus] = createStore({
    options: {},
    setChecking: () => true,
    syncStatus: {},
    publish: () => null,
    changesNotSavedToDraft: false,
    showRejectionControls: false,
    rejectionReason: '',
    approvalStatus: '',
    errorMessage: '',
    approvedBy: ''
  });
  const setRejectionReason = msg => {
    setContentStatus({
      rejectionReason: msg
    });
  };
  const setApprovalStatus = status => {
    setContentStatus({
      approvalStatus: status
    });
  };
  const toggleRejectionControls = () => {
    setContentStatus(state => ({
      showRejectionControls: !state.showRejectionControls
    }));
  };
  const withdrawRequestOnNewDraft = () => {
    if (contentStatus.options.requireApproval) {
      withdrawPublicationRequest();
    }
  };
  const getPublicationRequest = async () => {
    try {
      var _result$data$resource;

      const result = await wpAjax(`${contentStatus.options.api}/get-publication-request.php`, {
        postId: contentStatus.options.postId
      });

      if ((_result$data$resource = result.data.resource) !== null && _result$data$resource !== void 0 && _result$data$resource.content) {
        const content = result.data.resource.content;
        setContentStatus({
          approvalStatus: content.status,
          approvedBy: content.approvedBy,
          rejectedBy: content.rejectedBy,
          rejectionReason: content.rejectionReason || '',
          requestedBy: content.requestedBy,
          editorEmail: content.from_user_email,
          postTitle: content.post_title,
          siteTitle: content.from_site_name
        });
        console.log(`Publication request for ${contentStatus.options.permalink}: `, contentStatus);
      } else {
        console.log('No publication request found for:', contentStatus.options.permalink);
        setApprovalStatus('');
      }
    } catch (err) {
      console.log('Error fetching publication request', err);
    }
  };
  const upsertPublicationRequest = async status => {
    // console.log('Creating/updating pub request for ' + contentStatus.options.permalink + ': ', contentStatus);
    try {
      var _window;

      await wpAjax(`${contentStatus.options.api}/upsert-publication-request.php`, {
        permalink: contentStatus.options.permalink,
        status: status,
        editorUrl: (_window = window) === null || _window === void 0 ? void 0 : _window.location.href,
        approvedBy: status === 'approved' || status === 'approvedAndPublished' ? contentStatus.options.userName : '',
        rejectedBy: status === 'rejected' ? contentStatus.options.userName : '',
        requestedBy: status === 'pending' ? contentStatus.options.userName : contentStatus.requestedBy,
        rejectionReason: contentStatus.rejectionReason
      });
      return {};
    } catch (err) {
      console.log('Error upserting publication request', err);
      return {
        err
      };
    }
  };

  const deletePublicationRequest = async () => {
    console.log('Deleting pub request for ' + contentStatus.options.permalink + ': ', contentStatus);

    try {
      var _result$data, _result$data$deleteRe;

      const result = await wpAjax(`${contentStatus.options.api}/delete-publication-request.php`, {
        postId: contentStatus.options.postId
      });

      if (!(result !== null && result !== void 0 && (_result$data = result.data) !== null && _result$data !== void 0 && (_result$data$deleteRe = _result$data.deleteResource) !== null && _result$data$deleteRe !== void 0 && _result$data$deleteRe.success)) {
        var _result$errors, _result$errors$;

        console.log('Unable to delete publication request because: ', result === null || result === void 0 ? void 0 : (_result$errors = result.errors) === null || _result$errors === void 0 ? void 0 : (_result$errors$ = _result$errors[0]) === null || _result$errors$ === void 0 ? void 0 : _result$errors$.message);
      }

      return {};
    } catch (err) {
      console.log('Error deleting request', err);
      return {
        err
      };
    }
  };

  const updatePublicationApproval = async (status = '') => {
    contentStatus.setChecking(true);
    const result = await upsertPublicationRequest(status);

    if (result.err) {
      setContentStatus({
        errorMessage: 'Error changing status to ' + status
      });
      console.log('Err upserting request', result.err);
    } else {
      setApprovalStatus(status);
    }

    contentStatus.setChecking(false);

    if (status === 'approved' || status === 'rejected') {
      notifyEditor();
    }
  };

  const notifyEditor = async () => {
    const {
      postTitle,
      rejectionReason,
      approvalStatus,
      editorEmail
    } = contentStatus;
    const {
      userName: admin,
      siteTitle
    } = contentStatus.options;

    try {
      var _window2;

      await wpAjax(`${contentStatus.options.api}/send-publication-approval-email.php`, {
        data: {
          useCustomMailSystem: contentStatus.options.useCustomSmtp,
          postTitle,
          rejectionReason,
          approvalStatus,
          admin,
          editorEmail,
          siteTitle,
          postUrl: (_window2 = window) === null || _window2 === void 0 ? void 0 : _window2.location.href
        }
      });
    } catch (err) {
      console.log('Error sending email');
    }
  };

  const withdrawPublicationRequest = async () => {
    contentStatus.setChecking(true);
    const result = await deletePublicationRequest();

    if (result.err) {
      setContentStatus({
        errorMessage: 'Something went wrong withdrawing publication request'
      });
      console.log('Err deleting request', result.err);
    } else {
      setApprovalStatus('');
    }

    contentStatus.setChecking(false);
  };
  const beginRejection = () => {
    toggleRejectionControls();
  };

  const _tmpl$$2 = template(`<em></em>`);
  const StyledRejectionMessage = styled('div')`
    padding: 0.25rem;
    background: #fefbe6;
`;

  const ApprovalStatus = () => {
    return createComponent(Switch, {
      get children() {
        return [createComponent(Match, {
          get when() {
            return contentStatus.approvalStatus === 'pending';
          },

          get children() {
            return createComponent(StyledStatusText, {
              get horizontal() {
                return contentStatus.options.metaMenu;
              },

              children: "Pending approval"
            });
          }

        }), createComponent(Match, {
          get when() {
            return contentStatus.approvalStatus === 'approved';
          },

          get children() {
            return createComponent(StyledStatusText, {
              get horizontal() {
                return contentStatus.options.metaMenu;
              },

              get children() {
                return ["Publication approved ", memo(() => contentStatus.approvedBy ? ' by ' + contentStatus.approvedBy : '')];
              }

            });
          }

        }), createComponent(Match, {
          get when() {
            return contentStatus.approvalStatus === 'rejected';
          },

          get children() {
            return [createComponent(StyledStatusText, {
              get horizontal() {
                return contentStatus.options.metaMenu;
              },

              get children() {
                return ["Publication rejected ", memo(() => contentStatus.rejectedBy ? ' by ' + contentStatus.rejectedBy : '')];
              }

            }), createComponent(Show, {
              get when() {
                return contentStatus.rejectionReason;
              },

              get children() {
                return createComponent(StyledRejectionMessage, {
                  get children() {
                    const _el$ = _tmpl$$2.cloneNode(true);

                    insert(_el$, () => contentStatus.rejectionReason);

                    return _el$;
                  }

                });
              }

            })];
          }

        })];
      }

    });
  };

  const PublishButton = () => {
    return createComponent(Button, {
      get leftMargin() {
        return contentStatus.options.metaMenu;
      },

      get loading() {
        return contentStatus.publishing;
      },

      onClick: e => contentStatus.publish(e),

      get disabled() {
        return contentStatus.changesNotSavedToDraft;
      },

      get children() {
        var _contentStatus$syncSt, _contentStatus$syncSt2, _contentStatus$syncSt3;

        return contentStatus.changesNotSavedToDraft ? (_contentStatus$syncSt = contentStatus.syncStatus.live) !== null && _contentStatus$syncSt !== void 0 && _contentStatus$syncSt.exists ? 'Save draft before updating on live' : 'Save draft before publishing to live' : (_contentStatus$syncSt2 = contentStatus.syncStatus.live) !== null && _contentStatus$syncSt2 !== void 0 && _contentStatus$syncSt2.exists ? (_contentStatus$syncSt3 = contentStatus.syncStatus.live) !== null && _contentStatus$syncSt3 !== void 0 && _contentStatus$syncSt3.synced ? 'Updated on live site' : 'Update on live site' : 'Publish to live site';
      }

    });
  };

  const _tmpl$$3 = template(`<div><h4>Rejection reason</h4><textarea rows="4" placeholder="Message to the editor" maxlength="200"></textarea><div></div></div>`);

  const AdminControls = () => {
    return [createComponent(Button, {
      get leftMargin() {
        return contentStatus.options.metaMenu;
      },

      onClick: e => updatePublicationApproval('approved'),

      get disabled() {
        return contentStatus.showRejectionControls;
      },

      children: "Approve"
    }), createComponent(Show, {
      get when() {
        return !contentStatus.showRejectionControls;
      },

      get children() {
        return createComponent(Button, {
          get leftMargin() {
            return contentStatus.options.metaMenu;
          },

          onClick: e => beginRejection(),

          get disabled() {
            return contentStatus.showRejectionControls;
          },

          children: "Reject"
        });
      }

    }), createComponent(Show, {
      get when() {
        return contentStatus.showRejectionControls;
      },

      get children() {
        const _el$ = _tmpl$$3.cloneNode(true),
              _el$2 = _el$.firstChild,
              _el$3 = _el$2.nextSibling,
              _el$4 = _el$3.nextSibling;

        _el$.style.setProperty("margin-block", '1.5rem');

        _el$2.style.setProperty("margin-bottom", 0);

        _el$3.addEventListener("change", e => {
          setRejectionReason(e.target.value);
        });

        _el$3.style.setProperty("width", '100%');

        _el$3.style.setProperty("margin-top", '0.5rem');

        _el$4.style.setProperty("display", 'flex');

        insert(_el$4, createComponent(Button, {
          get leftMargin() {
            return contentStatus.options.metaMenu;
          },

          onClick: e => toggleRejectionControls(),
          disabled: false,
          style: {
            'margin-top': 0,
            'margin-right': '0.2rem'
          },
          children: "Cancel"
        }), null);

        insert(_el$4, createComponent(Button, {
          get leftMargin() {
            return contentStatus.options.metaMenu;
          },

          onClick: e => updatePublicationApproval('rejected'),
          disabled: false,
          style: {
            'margin-top': 0
          },
          children: "Send rejection"
        }), null);

        return _el$;
      }

    }), createComponent(Show, {
      get when() {
        return !contentStatus.showRejectionControls;
      },

      get children() {
        return createComponent(PublishButton, {});
      }

    })];
  };

  const _tmpl$$4 = template(`<div><h5>Dev mode</h5></div>`);
  const debugging = false;

  const DebugPanel = () => {
    return (() => {
      const _el$ = _tmpl$$4.cloneNode(true),
            _el$2 = _el$.firstChild;

      _el$.style.setProperty("background", 'lightgray');

      _el$.style.setProperty("padding", '0.5rem');

      insert(_el$, createComponent(Button, {
        get leftMargin() {
          return contentStatus.options.metaMenu;
        },

        onClick: e => updatePublicationApproval('approved'),
        disabled: false,
        children: "Approve"
      }), null);

      insert(_el$, createComponent(Button, {
        get leftMargin() {
          return contentStatus.options.metaMenu;
        },

        onClick: e => updatePublicationApproval('rejected'),
        disabled: false,
        children: "Reject"
      }), null);

      insert(_el$, createComponent(Button, {
        get leftMargin() {
          return contentStatus.options.metaMenu;
        },

        onClick: e => updatePublicationApproval('pending'),

        get disabled() {
          return contentStatus.changesNotSavedToDraft;
        },

        children: "Set to pending"
      }), null);

      return _el$;
    })();
  };

  const PublishingControls = () => {
    return [createComponent(Show, {
      get when() {
        return contentStatus.approvalStatus === '';
      },

      get children() {
        return [createComponent(Show, {
          get when() {
            return contentStatus.options.userHasPublicationRights;
          },

          get children() {
            return createComponent(PublishButton, {});
          }

        }), createComponent(Show, {
          get when() {
            return !contentStatus.options.userHasPublicationRights;
          },

          get children() {
            return createComponent(Button, {
              get leftMargin() {
                return contentStatus.options.metaMenu;
              },

              onClick: e => updatePublicationApproval('pending'),

              get disabled() {
                return contentStatus.changesNotSavedToDraft;
              },

              get children() {
                return contentStatus.changesNotSavedToDraft ? 'Save draft before publishing request' : 'Request approval to publish';
              }

            });
          }

        })];
      }

    }), createComponent(Show, {
      when: debugging,

      get children() {
        return createComponent(DebugPanel, {});
      }

    }), createComponent(Show, {
      get when() {
        return contentStatus.approvalStatus === 'pending';
      },

      get children() {
        return [createComponent(Show, {
          get when() {
            return contentStatus.options.userHasPublicationRights;
          },

          get children() {
            return createComponent(AdminControls, {});
          }

        }), createComponent(Show, {
          get when() {
            return !contentStatus.options.userHasPublicationRights;
          },

          get children() {
            return createComponent(Button, {
              get leftMargin() {
                return contentStatus.options.metaMenu;
              },

              onClick: e => withdrawPublicationRequest(),
              disabled: false,
              children: "Withdraw publication request"
            });
          }

        })];
      }

    }), createComponent(Show, {
      get when() {
        return contentStatus.approvalStatus === 'approved';
      },

      get children() {
        return [createComponent(Show, {
          get when() {
            return contentStatus.options.userHasPublicationRights;
          },

          get children() {
            return createComponent(PublishButton, {});
          }

        }), createComponent(Show, {
          get when() {
            return !contentStatus.options.userHasPublicationRights;
          },

          get children() {
            return createComponent(Button, {
              get leftMargin() {
                return contentStatus.options.metaMenu;
              },

              get loading() {
                return contentStatus.publishing;
              },

              onClick: e => contentStatus.publish(e),

              get disabled() {
                return contentStatus.changesNotSavedToDraft;
              },

              get children() {
                return contentStatus.changesNotSavedToDraft ? 'Discard unapproved changes to publish' : 'Publish to live site 123';
              }

            });
          }

        })];
      }

    }), createComponent(Show, {
      get when() {
        return contentStatus.approvalStatus === 'rejected';
      },

      get children() {
        return createComponent(Show, {
          get when() {
            return contentStatus.options.userHasPublicationRights;
          },

          get children() {
            return createComponent(PublishButton, {});
          }

        });
      }

    })];
  };

  const WithdrawlWarning = () => {
    return createComponent(Show, {
      get when() {
        return contentStatus.approvalStatus === 'pending' && contentStatus.changesNotSavedToDraft;
      },

      get children() {
        return createComponent(StyledWarning, {
          children: "Saving a new draft will automatically withdraw the pending publication approval"
        });
      }

    });
  };

  const PublishingUpdateControls = () => {
    return [createComponent(Show, {
      get when() {
        return contentStatus.approvalStatus === '';
      },

      get children() {
        return [createComponent(Show, {
          get when() {
            return contentStatus.options.userHasPublicationRights;
          },

          get children() {
            return createComponent(Button, {
              get leftMargin() {
                return contentStatus.options.metaMenu;
              },

              get loading() {
                return contentStatus.publishing;
              },

              onClick: e => contentStatus.publish(e),

              get disabled() {
                var _contentStatus$syncSt;

                return ((_contentStatus$syncSt = contentStatus.syncStatus.live) === null || _contentStatus$syncSt === void 0 ? void 0 : _contentStatus$syncSt.synced) || contentStatus.changesNotSavedToDraft;
              },

              get children() {
                var _contentStatus$syncSt2;

                return contentStatus.changesNotSavedToDraft ? 'Save draft before updating on live' : (_contentStatus$syncSt2 = contentStatus.syncStatus.live) !== null && _contentStatus$syncSt2 !== void 0 && _contentStatus$syncSt2.synced ? 'Updated on live site' : 'Update on live site';
              }

            });
          }

        }), createComponent(Show, {
          get when() {
            return !contentStatus.options.userHasPublicationRights;
          },

          get children() {
            return createComponent(Button, {
              get leftMargin() {
                return contentStatus.options.metaMenu;
              },

              get loading() {
                return contentStatus.publishing;
              },

              onClick: e => updatePublicationApproval('pending'),

              get disabled() {
                var _contentStatus$syncSt3;

                return ((_contentStatus$syncSt3 = contentStatus.syncStatus.live) === null || _contentStatus$syncSt3 === void 0 ? void 0 : _contentStatus$syncSt3.synced) || contentStatus.changesNotSavedToDraft;
              },

              get children() {
                var _contentStatus$syncSt4;

                return contentStatus.changesNotSavedToDraft ? 'Save draft before requesting publication approval' : (_contentStatus$syncSt4 = contentStatus.syncStatus.live) !== null && _contentStatus$syncSt4 !== void 0 && _contentStatus$syncSt4.synced ? 'Updated on live site' : 'Request approval to publish';
              }

            });
          }

        })];
      }

    }), createComponent(Show, {
      get when() {
        return contentStatus.approvalStatus === 'pending';
      },

      get children() {
        return [createComponent(Show, {
          get when() {
            return contentStatus.options.userHasPublicationRights;
          },

          get children() {
            return createComponent(AdminControls, {});
          }

        }), createComponent(Show, {
          get when() {
            return !contentStatus.options.userHasPublicationRights;
          },

          get children() {
            return createComponent(Button, {
              get leftMargin() {
                return contentStatus.options.metaMenu;
              },

              onClick: e => withdrawPublicationRequest(),
              disabled: false,
              children: "Withdraw publication request"
            });
          }

        })];
      }

    }), createComponent(Show, {
      get when() {
        return contentStatus.approvalStatus === 'approved';
      },

      get children() {
        return [createComponent(Show, {
          get when() {
            return contentStatus.options.userHasPublicationRights;
          },

          get children() {
            return createComponent(Button, {
              get leftMargin() {
                return contentStatus.options.metaMenu;
              },

              get loading() {
                return contentStatus.publishing;
              },

              onClick: e => contentStatus.publish(e),

              get disabled() {
                var _contentStatus$syncSt5;

                return ((_contentStatus$syncSt5 = contentStatus.syncStatus.live) === null || _contentStatus$syncSt5 === void 0 ? void 0 : _contentStatus$syncSt5.synced) || contentStatus.changesNotSavedToDraft;
              },

              get children() {
                var _contentStatus$syncSt6;

                return contentStatus.changesNotSavedToDraft ? 'Save draft before publishing to live' : (_contentStatus$syncSt6 = contentStatus.syncStatus.live) !== null && _contentStatus$syncSt6 !== void 0 && _contentStatus$syncSt6.synced ? 'Updated on live site' : 'Update on live site';
              }

            });
          }

        }), createComponent(Show, {
          get when() {
            return !contentStatus.options.userHasPublicationRights;
          },

          get children() {
            return createComponent(Button, {
              get leftMargin() {
                return contentStatus.options.metaMenu;
              },

              get loading() {
                return contentStatus.publishing;
              },

              onClick: e => contentStatus.publish(e),

              get disabled() {
                var _contentStatus$syncSt7;

                return ((_contentStatus$syncSt7 = contentStatus.syncStatus.live) === null || _contentStatus$syncSt7 === void 0 ? void 0 : _contentStatus$syncSt7.synced) || contentStatus.changesNotSavedToDraft;
              },

              get children() {
                var _contentStatus$syncSt8;

                return contentStatus.changesNotSavedToDraft ? 'Save to draft or discard unapproved changes to publish' : (_contentStatus$syncSt8 = contentStatus.syncStatus.live) !== null && _contentStatus$syncSt8 !== void 0 && _contentStatus$syncSt8.synced ? 'Updated on live site' : 'Update on live site';
              }

            });
          }

        })];
      }

    }), createComponent(Show, {
      get when() {
        return contentStatus.approvalStatus === 'rejected';
      },

      get children() {
        return createComponent(Show, {
          get when() {
            return !contentStatus.options.userHasPublicationRights;
          },

          get children() {
            return createComponent(Button, {
              get leftMargin() {
                return contentStatus.options.metaMenu;
              },

              onClick: e => null,
              disabled: true,

              get children() {
                return contentStatus.changesNotSavedToDraft ? 'Save draft before requesting publication approval' : 'Make changes before requesting approval to publish';
              }

            });
          }

        });
      }

    })];
  };

  const MetaBox = ({
    options
  }) => {
    const [status, setStatus] = createStore({});
    const [checking, setChecking] = createSignal(true);
    const [publishing, setPublishing] = createSignal(false);
    const [unpublishing, setUnpublishing] = createSignal(false);
    const [unsavedMenuDisplayLocations, setUnsavedMenuDisplayLocations] = createSignal(false);
    const [unsavedPageChanges, setUnsavedPageChanges] = createSignal(false);
    const [unsavedMenuChanges, setUnsavedMenuChanges] = createSignal(false);
    const [unsavedExternalChange, setUnsavedExternalChange] = createSignal(false);
    const [menuCreated, setMenuCreated] = createSignal(false);
    const [noContentFound, setNoContentFound] = createSignal(false);
    const [getLinkToPreview, setLinkToPreview] = createSignal(null);
    let payload = {
      permalink: options.permalink
    };
    let coreEditor;
    let saveMenuButton;
    const isPost = !options.metaMenu && !options.optionsMeta;
    onMount(() => {
      if (!isPost) {
        return;
      }

      if (options.requireApproval) {
        setContentStatus({
          options: options,
          setChecking: setChecking,
          syncStatus: status,
          publish: e => publish(e)
        });
      }

      const addPreviewButton = () => {
        const previewTarget = '_new';
        const linkToPreview = document.createElement('a');
        linkToPreview.classList.add('components-button');
        linkToPreview.classList.add('is-secondary');

        if (wp.data.select('core/editor').getCurrentPost().status === 'auto-draft') {
          linkToPreview.style.display = 'none';
        }

        linkToPreview.innerHTML = 'Preview';
        setLinkToPreview(linkToPreview);
        document.querySelector('.edit-post-header__settings').prepend(linkToPreview);
        linkToPreview.addEventListener('click', function (event) {
          const previewLink = wp.data.select('core/editor').getEditedPostPreviewLink();

          if (wp.data.select('core/editor').isEditedPostDirty()) {
            event.preventDefault();
            event.stopPropagation();
            wp.data.dispatch('core/editor').savePost({
              isPreview: true
            }).then(() => {
              window.open(previewLink, previewTarget);
            });
          } else {
            window.open(previewLink, previewTarget);
          }
        });
      }; // A temp fix, if we dont use a timeout .edit-post-header__settings is undefined.
      // And this whole button doesnt really belong in this meta-box.


      setTimeout(addPreviewButton, 700);
    });
    createEffect(() => {
      if (options.metaMenu) {
        saveMenuButton = document.querySelector('#save_menu_footer');
        menuChangeListener();
      } else {
        var _wp, _wp$data;

        if ((_wp = wp) !== null && _wp !== void 0 && (_wp$data = _wp.data) !== null && _wp$data !== void 0 && _wp$data.select) {
          coreEditor = wp.data.select('core/editor');
          wp.domReady(pageChangeListener);
        }
      }
    }); // Dont run this if its an older version of wp or not running gutenberg

    createEffect(() => {
      if (wp && wp.hooks && wp.hooks.addAction) {
        check();
        wp.hooks.addAction('dls.post-saved', 'dls', () => {
          var _status$draft, _coreEditor, _status$draft2;

          if (!(status !== null && status !== void 0 && (_status$draft = status.draft) !== null && _status$draft !== void 0 && _status$draft.exists) && (_coreEditor = coreEditor) !== null && _coreEditor !== void 0 && _coreEditor.isPublishingPost()) {
            /**
             * It's the first time content is being saved to draft  (disregarding wordpress' autosave),
             * so reload to get correct permalink (which is needed to e.g. unpublish)
             * 
             * NB: This wordpress' publishing - NOT the same as cerberus' publish to live database
             */
            let safetyCounter = 0;

            const getPermalink = () => {
              const regex = /http(s|):\/\/(.*?)(\/[\w\/-]*)\//gm;
              const permalink = coreEditor.getPermalink();
              const match = regex.exec(permalink);

              if (match) {
                return match[3];
              }

              return '';
            };

            const getNewPermalink = () => {
              if (coreEditor.getCurrentPost().status !== 'auto-draft') {
                payload = {
                  permalink: getPermalink()
                };
                setUnsavedPageChanges(false);
                setNoContentFound(false);
                check();
                getLinkToPreview().style.display = 'flex';
                return;
              }

              if (safetyCounter++ <= 50) {
                setTimeout(getNewPermalink, 100);
              }
            };

            getNewPermalink();
            return;
          }

          if (!(status !== null && status !== void 0 && (_status$draft2 = status.draft) !== null && _status$draft2 !== void 0 && _status$draft2.exists)) return; // Wordpress is autosaving content that doesn't yet exist 
          // Content has been updated on draft, listen for further changes

          pageChangeListener();
          check();
        });
      }
    });
    createEffect(() => {
      let saveContentButton;
      document.addEventListener("cerberusListenerEvent", payload => {
        var _payload$detail;

        if (payload !== null && payload !== void 0 && (_payload$detail = payload.detail) !== null && _payload$detail !== void 0 && _payload$detail.hasChange) {
          if (!saveContentButton) {
            // Add listener to save button, so that when it's clicked we can disable it
            saveContentButton = document.querySelector('.editor-post-publish-button');
            saveContentButton.addEventListener('click', () => {
              setUnsavedExternalChange(false);
              saveContentButton.setAttribute('disabled', true);
              window.onbeforeunload = null;
            });
          }

          if (saveContentButton) {
            // Enable save button
            setUnsavedExternalChange(true);
            saveContentButton.removeAttribute('disabled');

            window.onbeforeunload = () => true;
          }
        }
      });
    });

    const pageChangeListener = () => {
      let saveContentButton;
      const unsubscribe = wp.data.subscribe(_.debounce(() => {
        if (!saveContentButton) {
          saveContentButton = document.querySelector('.editor-post-publish-button');
        }

        const hasUnsavedChanges = coreEditor.isEditedPostDirty();
        const hasNonPostEntityChanges = coreEditor.hasNonPostEntityChanges();
        const hasUnsavedExternalChange = unsavedExternalChange();

        if (hasNonPostEntityChanges || hasUnsavedChanges || hasUnsavedExternalChange) {
          setUnsavedPageChanges(true);
          saveContentButton && saveContentButton.addEventListener('click', savingToDraftHandler);
          saveContentButton && saveContentButton.removeAttribute('disabled');
          unsubscribe();
        } else {
          setUnsavedPageChanges(false);
          saveContentButton && saveContentButton.removeEventListener('click', savingToDraftHandler);
          saveContentButton && saveContentButton.setAttribute('disabled', true);
        }
      }, 100));
    };

    const savingToDraftHandler = () => {
      if (contentStatus.approvalStatus === '') {
        return;
      }

      if (!isPost || !options.requireApproval) {
        return;
      }

      withdrawRequestOnNewDraft();
    };

    const menuChangeListener = () => {
      // Listens for changes to enable/disable saving button
      let menuHasChanged = false;
      let menuChangeDetectingInterval;
      saveMenuButton.setAttribute('disabled', true);

      let blurListener = () => {
        if (menuHasChanged) return;
        clearInterval(menuChangeDetectingInterval);
      };

      let focusListener = () => {
        if (menuHasChanged) return;
        menuChangeDetectingInterval = runInterval();
      };

      const runInterval = () => setInterval(() => {
        var _window, _window$wpNavMenu;

        if ((_window = window) !== null && _window !== void 0 && (_window$wpNavMenu = _window.wpNavMenu) !== null && _window$wpNavMenu !== void 0 && _window$wpNavMenu.menusChanged) {
          menuHasChanged = true;
          enableMenuSaveButton();
          clearInterval(menuChangeDetectingInterval);
          window.removeEventListener('blur', blurListener);
          window.removeEventListener('focus', focusListener);
        }
      }, 500);

      menuChangeDetectingInterval = runInterval();
      window.addEventListener('blur', blurListener);
      window.addEventListener('focus', focusListener);
    };

    const enableMenuSaveButton = () => {
      saveMenuButton.removeAttribute('disabled');
      setUnsavedMenuChanges(true);
    };

    const check = async (showChecking = true) => {
      if (showChecking) {
        setChecking(true);
        await new Promise(resolve => setTimeout(resolve, 1000));
      }

      try {
        var _result$data;

        const result = await wpAjaxAction('check_sync', { ...payload,
          api_path: payload.permalink
        });

        if (!(result !== null && result !== void 0 && (_result$data = result.data) !== null && _result$data !== void 0 && _result$data.resourceStatus)) {
          throw payload;
        }

        setStatus({
          draft: result.data.resourceStatus.find(itemStatus => itemStatus.target === 'draft' && itemStatus.comparedTo === '__original'),
          live: result.data.resourceStatus.find(itemStatus => itemStatus.target === 'live' && itemStatus.comparedTo === 'draft'),
          state: 'loaded'
        });
        console.log('status: ', status);
        setNoContentFound(false);

        if (isPost && options.requireApproval) {
          getPublicationRequest();
        }

        if (options.metaMenu) {
          menuCheck();
        }
      } catch (err) {
        console.log('--- meta-box --- Can\'t find any data with check-sync of payload: ', err);
        setNoContentFound(true);
        setChecking(false);
        setStatus({
          state: 'error'
        });
      }

      setChecking(false);
    };

    const menuCheck = async () => {
      var _status$draft3;

      /**
       * Orchestrates saving to draft/publishing when the menu is registered to a location (e.g. header_menu),
       * ensuring that content is saved correctly and making it more obvious for the editor about
       * what is saved/published (the "stand-alone" menu, and/or the menu registered to a location)
       */
      const displayLocations = document.querySelectorAll('.menu-theme-locations > .menu-settings-input');
      const fieldset = document.querySelector('.menu-settings-group.menu-theme-locations');
      const changesDisabledInfo = document.createElement('i');
      changesDisabledInfo.classList.add('changes-disabled-message');
      const existsInDraft = (_status$draft3 = status.draft) === null || _status$draft3 === void 0 ? void 0 : _status$draft3.exists;
      const isPublished = status.live && status.live.exists;

      if (!existsInDraft || isPublished) {
        fieldset.style.pointerEvents = 'none';
        fieldset.style.cursor = 'not-allowed';
        fieldset.style.opacity = 0.5;
      } else {
        fieldset.style.pointerEvents = 'auto';
        fieldset.style.cursor = 'default';
        fieldset.style.opacity = 1;
      }

      const changesDisabledDOM = document.querySelector('.changes-disabled-message');

      if (isPublished) {
        const publishedMessage = 'Menu must be unpublished before toggling location';

        if (changesDisabledDOM) {
          changesDisabledDOM.innerHTML = publishedMessage;
        } else {
          changesDisabledInfo.innerHTML = publishedMessage;
          fieldset.prepend(changesDisabledInfo);
        }
      } else {
        const notSavedMessage = 'Menu must be created before toggling location';

        if (!existsInDraft) {
          if (changesDisabledDOM) {
            changesDisabledDOM.innerHTML = notSavedMessage;
          } else {
            changesDisabledInfo.innerHTML = notSavedMessage;
            fieldset.prepend(changesDisabledInfo);
          }
        } else {
          if (changesDisabledDOM) changesDisabledDOM.parentNode.removeChild(changesDisabledDOM);
        }
      }

      let currentMenuIsRegisteredToLocation = false;
      let locationsSetToOtherMenus = false;

      for (let locationElement of displayLocations) {
        const input = locationElement.querySelector('input');
        input.addEventListener('change', () => {
          setUnsavedMenuDisplayLocations(true);
          enableMenuSaveButton();
        });
        const locationAlreadySet = locationElement.querySelector('.theme-location-set');

        if (locationAlreadySet) {
          input.setAttribute('disabled', true);
          locationElement.style.pointerEvents = 'none';
          locationElement.style.opacity = 0.5;
          locationsSetToOtherMenus = true;
        }

        if (input.getAttribute('checked')) {
          currentMenuIsRegisteredToLocation = true;
        }
      }

      if (locationsSetToOtherMenus && !isPublished && existsInDraft) {
        const changesDisabledMessageExists = document.querySelector('.changes-disabled-message');
        const locationsDisabledText = 'Some locations cannot be set because they are already set';

        if (changesDisabledMessageExists) {
          changesDisabledMessageExists.innerHTML = locationsDisabledText;
        } else {
          changesDisabledInfo.innerHTML = locationsDisabledText;
          fieldset.prepend(changesDisabledInfo);
        }
      }

      if (location.search.includes('menu=0')) return; // Menu has not yet been created and given a unique ID

      setMenuCreated(true);
      const deleteLink = document.querySelector('.submitdelete.deletion.menu-delete');
      let linkReplacement = document.querySelector('.delete-link-replacement');

      if (currentMenuIsRegisteredToLocation || isPublished) {
        deleteLink.style.display = 'none';

        if (!linkReplacement) {
          linkReplacement = document.createElement('span');
          linkReplacement.classList.add('delete-link-replacement');
          linkReplacement.innerHTML = 'To delete a menu it must be unpublished (and unregisterered from all display locations)';
          linkReplacement.style.color = '#a7aaad';
          linkReplacement.style.fontSize = '12px';
        } else {
          linkReplacement.style.display = 'inline';
        }

        deleteLink.parentNode.prepend(linkReplacement);
      } else {
        deleteLink.style.display = 'inline';
        if (linkReplacement) linkReplacement.style.display = 'none';
      }
    };

    const emitDomEvent = (detail = {}) => {
      if (document) {
        const domPublishEvent = new CustomEvent('cerberusChangeEvent', {
          detail
        });
        document.dispatchEvent(domPublishEvent);
      }
    };

    const publish = async e => {
      // If we dont stop the event, the options page in wp is saved by ACF
      e.preventDefault();
      e.stopPropagation();
      setPublishing(true);
      await updatePublicationApproval('approvedAndPublished');
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
      emitDomEvent({
        action: 'publish_to_live_done'
      });
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
      emitDomEvent({
        action: 'unpublish_from_live_done'
      });
    };

    createEffect(() => {
      if (isPost) {
        setContentStatus({
          changesNotSavedToDraft: changesNotSavedToDraft()
        });
      }
    });
    createEffect(() => {
      if (isPost) {
        setContentStatus({
          publishing: publishing()
        });
      }
    });
    createEffect(() => {
      if (isPost) {
        setContentStatus({
          publishing: publishing()
        });
      }
    });

    const changesNotSavedToDraft = () => {
      return unsavedPageChanges() || unsavedMenuChanges() || unsavedExternalChange();
    };

    const publishingControls = () => {
      if (isPost && options.requireApproval) {
        return createComponent(PublishingControls, {});
      }

      return createComponent(Button, {
        get leftMargin() {
          return options.metaMenu;
        },

        get loading() {
          return publishing();
        },

        onClick: e => publish(e),

        get disabled() {
          return changesNotSavedToDraft();
        },

        get children() {
          return changesNotSavedToDraft() ? 'Save draft before publishing to live' : 'Publish to live site';
        }

      });
    };

    const publishUpdateButtons = () => {
      if (isPost && !options.optionsMeta && options.requireApproval) {
        return createComponent(PublishingUpdateControls, {});
      }
      return createComponent(Button, {
        get leftMargin() {
          return options.metaMenu;
        },

        get loading() {
          return publishing();
        },

        onClick: e => publish(e),

        get disabled() {
          var _status$live;

          return ((_status$live = status.live) === null || _status$live === void 0 ? void 0 : _status$live.synced) || changesNotSavedToDraft();
        },

        get children() {
          var _status$live2;

          return changesNotSavedToDraft() ? 'Save draft before updating on live' : (_status$live2 = status.live) !== null && _status$live2 !== void 0 && _status$live2.synced ? 'Updated on live site' : 'Update on live site';
        }

      });
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
            return [createComponent(Show, {
              get when() {
                return noContentFound();
              },

              get children() {
                return createComponent(StyledChecking, {
                  get horizontal() {
                    return options.metaMenu;
                  },

                  get children() {
                    return createComponent(StyledStatusText, {
                      children: "Content must be saved before publishing"
                    });
                  }

                });
              }

            }), createComponent(Show, {
              get when() {
                var _status$draft4;

                return !unsavedMenuDisplayLocations() && ((_status$draft4 = status.draft) === null || _status$draft4 === void 0 ? void 0 : _status$draft4.exists);
              },

              get children() {
                return [createComponent(Show, {
                  get when() {
                    return isPost && options.requireApproval;
                  },

                  get children() {
                    return createComponent(ApprovalStatus, {});
                  }

                }), createComponent(Show, {
                  get when() {
                    return !options.requireApproval;
                  },

                  get children() {
                    return createComponent(StyledStatusText, {
                      get horizontal() {
                        return options.metaMenu;
                      },

                      children: "Publish content"
                    });
                  }

                }), createComponent(Show, {
                  get when() {
                    var _status$live3;

                    return !((_status$live3 = status.live) !== null && _status$live3 !== void 0 && _status$live3.exists);
                  },

                  get children() {
                    return [memo(() => publishingControls()), createComponent(Button, {
                      get leftMargin() {
                        return options.metaMenu;
                      },

                      disabled: true,
                      children: "Content not published"
                    }), createComponent(Show, {
                      when: isPost,

                      get children() {
                        return createComponent(WithdrawlWarning, {});
                      }

                    })];
                  }

                }), createComponent(Show, {
                  get when() {
                    var _status$live4;

                    return (_status$live4 = status.live) === null || _status$live4 === void 0 ? void 0 : _status$live4.exists;
                  },

                  get children() {
                    return [memo(() => publishUpdateButtons()), createComponent(Button, {
                      get leftMargin() {
                        return options.metaMenu;
                      },

                      get loading() {
                        return unpublishing();
                      },

                      onClick: e => unpublish(e),

                      get disabled() {
                        return unsavedExternalChange();
                      },

                      children: "Unpublish"
                    }), createComponent(Show, {
                      when: isPost,

                      get children() {
                        return createComponent(WithdrawlWarning, {});
                      }

                    })];
                  }

                })];
              }

            }), createComponent(Show, {
              get when() {
                return options.metaMenu;
              },

              get children() {
                return createComponent(StyledChecking, {
                  get horizontal() {
                    return options.metaMenu;
                  },

                  get children() {
                    return [createComponent(Show, {
                      get when() {
                        return !menuCreated();
                      },

                      get children() {
                        return createComponent(StyledStatusText, {
                          children: "Enter a 'Menu Name' above to create a new menu"
                        });
                      }

                    }), (() => {
                      const _c$ = memo(() => {
                        var _status$draft5;

                        return !!(!unsavedMenuDisplayLocations() && !((_status$draft5 = status.draft) !== null && _status$draft5 !== void 0 && _status$draft5.exists));
                      }, true);

                      return createComponent(Show, {
                        get when() {
                          return _c$() && menuCreated();
                        },

                        get children() {
                          return createComponent(StyledStatusText, {
                            children: "Save menu with menu items in order to publish"
                          });
                        }

                      });
                    })(), createComponent(Show, {
                      get when() {
                        return unsavedMenuDisplayLocations();
                      },

                      get children() {
                        return createComponent(StyledStatusText, {
                          children: "Save the changes before publishing"
                        });
                      }

                    })];
                  }

                });
              }

            })];
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
            return contentStatus.errorMessage;
          },

          get children() {
            return createComponent(StyledError, {
              get children() {
                return contentStatus.errorMessage;
              }

            });
          }

        })];
      }

    });
  };

  const StyledInput = styled('input')`
`;
  const StyledInputBox = styled('div')`
    display: flex;
    flex-direction: column;
    width: 100%;
    padding-right: 10px;
    box-sizing: border-box;
`;
  const StyledInputLabel = styled('label')`
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

    return createComponent(StyledInputBox, {
      get children() {
        return [createComponent(StyledInputLabel, {
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
  const StyledInputBox$1 = styled('div')`
    display: flex;
    flex-direction: column;
    width: 100%;
    padding-left: 10px;
    box-sizing: border-box;
`;
  const StyledInputLabel$1 = styled('label')`
    padding: 5px 5px 0px 5px;
    font-size: 10px;
    height: 18px;
`;

  const _tmpl$$5 = template(`<option></option>`);

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

    return createComponent(StyledInputBox$1, {
      get children() {
        return [createComponent(StyledInputLabel$1, {
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
                const _el$ = _tmpl$$5.cloneNode(true);

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
  const StyledContainer$2 = styled('div')`
     color: black;
     max-width: 1200px;
     margin: 0 auto;
`;
  const StyledTitle$1 = styled('div')`
`;
  const StyledParagraph$1 = styled('div')`
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
  const StyledError$1 = styled('div')`
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

  const _tmpl$$6 = template(`<thead><tr><th>Domain</th><th>Distribution ID</th><th>Target</th><th>SiteId</th><th></th></tr></thead>`),
        _tmpl$2 = template(`<tbody></tbody>`),
        _tmpl$3 = template(`<tr><td></td><td></td><td></td><td></td></tr>`);
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
    const [cloudfrontDistributionId, setCloudfrontDistributionId] = createSignal('');
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
          id,
          cloudfrontDistributionId: cloudfrontDistributionId()
        });
        await getDomainSettings();
        setTarget('draft');
        setDomain('');
        setCloudfrontDistributionId('');
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

      if (name === 'cloudfrontDistributionId') {
        setCloudfrontDistributionId(value);
      }
    };

    createEffect(() => {
      getDomainSettings();
    });
    return createComponent(StyledContainer$2, {
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
                    }), createComponent(Input, {
                      placeholder: "distribution id",
                      label: "Cloudfront Distribution ID:",
                      value: cloudfrontDistributionId,
                      onChange: value => updateValue('cloudfrontDistributionId', value)
                    }), createComponent(Select, {
                      options: targetOptions,
                      value: target,
                      onChange: value => updateValue('target', value)
                    })];
                  }

                }), createComponent(Show, {
                  when: errorMessage,

                  get children() {
                    return createComponent(StyledError$1, {
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
            return [_tmpl$$6.cloneNode(true), (() => {
              const _el$2 = _tmpl$2.cloneNode(true);

              insert(_el$2, createComponent(For, {
                get each() {
                  return state.list;
                },

                children: item => (() => {
                  const _el$3 = _tmpl$3.cloneNode(true),
                        _el$4 = _el$3.firstChild,
                        _el$5 = _el$4.nextSibling,
                        _el$6 = _el$5.nextSibling,
                        _el$7 = _el$6.nextSibling;

                  insert(_el$4, () => item.content.domain);

                  insert(_el$5, () => item.content.cloudfrontDistributionId);

                  insert(_el$6, () => item.content.target);

                  insert(_el$7, () => item.content.siteId);

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

  const _tmpl$$7 = template(`<span>, requested by <em></em></span>`),
        _tmpl$2$1 = template(`<span> - rejected by <em></em></span>`),
        _tmpl$3$1 = template(`<span> - approved by <em></em></span>`),
        _tmpl$4 = template(`<em></em>`);
  const StyledType$1 = styled('div')`
    text-transform: uppercase;
    font-size: 13px;
    margin-right: 0.5rem;
    background-color: rgba(0,0,0,0.1);
    padding: 0.2rem 0.35rem;
    min-width: 50px;
    display: flex;
    justify-content: center;
    align-self: flex-start;
`;
  const StyledTitle$2 = styled('a')`
    ${p => !p.href ? 'color: black;' : ''}
    font-weight: bold;
    text-transform: capitalize;
    text-decoration: none;
`;
  const StyledText = styled('p')`
    margin: 0;
    font-size: inherit;
    color: gray;
`;
  const StyledRejectionHeading = styled('h5')`
    margin: 0;
    margin-bottom: 0.3rem;
    text-decoration: underline;
`;
  const StyledPublicationRequestItem = styled('div')`
    margin-top: 0.8rem;
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    font-size: 15px;
`;
  const StyledWrappedButton = styled('div')`
    display: flex;
    align-items: flex-start;
    margin-top: -10px;
    padding-inline: 1rem;
`;
  const StyledRejectionPanel = styled('div')`
    padding-left: 1rem;
    margin-top: 0.5rem;
`;

  const PublicationRequestItem = props => {
    const formatDateAndTime = () => {
      const date = new Date(props.item.content.updated_on);
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const day = date.getDate().toString().padStart(2, "0");
      const hours = date.getHours().toString().padStart(2, "0");
      const minutes = date.getMinutes().toString().padStart(2, "0");
      const formattedDate = year + "-" + month + "-" + day + ", " + hours + ":" + minutes;
      return formattedDate;
    };

    const logData = () => {
      console.log('Request data: ', props.item);
    };

    return createComponent(StyledPublicationRequestItem, {
      get key() {
        return props.item.content.post_id;
      },

      get children() {
        return [createComponent(StyledType$1, {
          onClick: logData,

          get children() {
            return props.item.content.type;
          }

        }), createComponent(StyledText, {
          get children() {
            return [createComponent(StyledTitle$2, {
              get href() {
                return props.item.content.editorUrl;
              },

              target: "_blank",

              get children() {
                return props.item.content.post_title;
              }

            }), createComponent(Show, {
              get when() {
                return props.type === 'admin';
              },

              get children() {
                const _el$ = _tmpl$$7.cloneNode(true),
                      _el$2 = _el$.firstChild,
                      _el$3 = _el$2.nextSibling;

                insert(_el$3, () => props.item.content.requestedBy);

                return _el$;
              }

            }), createComponent(Show, {
              get when() {
                return props.item.content.status === 'rejected';
              },

              get children() {
                const _el$4 = _tmpl$2$1.cloneNode(true),
                      _el$5 = _el$4.firstChild,
                      _el$6 = _el$5.nextSibling;

                insert(_el$6, () => props.item.content.rejectedBy);

                return _el$4;
              }

            }), createComponent(Show, {
              get when() {
                return props.item.content.status === 'approved' || props.item.content.status === 'approvedAndPublished';
              },

              get children() {
                const _el$7 = _tmpl$3$1.cloneNode(true),
                      _el$8 = _el$7.firstChild,
                      _el$9 = _el$8.nextSibling;

                insert(_el$9, () => props.item.content.approvedBy);

                return _el$7;
              }

            }), memo(() => ` (${formatDateAndTime()})`), createComponent(Show, {
              get when() {
                return props.item.content.status === 'rejected';
              },

              get children() {
                return createComponent(StyledRejectionPanel, {
                  get children() {
                    return [createComponent(StyledRejectionHeading, {
                      children: "Rejection message:"
                    }), (() => {
                      const _el$10 = _tmpl$4.cloneNode(true);

                      insert(_el$10, () => props.item.content.rejectionReason);

                      return _el$10;
                    })()];
                  }

                });
              }

            })];
          }

        }), createComponent(StyledWrappedButton, {
          get children() {
            return createComponent(Button, {
              get onClick() {
                return props.manualDelete;
              },

              children: "Delete"
            });
          }

        })];
      }

    });
  };

  const _tmpl$$8 = template(`<p></p>`),
        _tmpl$2$2 = template(`<p>Reload page</p>`),
        _tmpl$3$2 = template(`<div></div>`);
  const StyledStatusList = styled('div')`
    margin-bottom: 3rem;
`;
  const StyledSiteList = styled('div')`
    margin-top: 1rem;
    margin-bottom: 2rem;
`;
  const StyledDomainHeading = styled('p')`
    font-size: 15px;
`;
  const StyledTabs = styled('div')`
    width: 100%;
    border-bottom: solid 2px #c3c4c7;
    height: 2rem;
    display: flex;
    align-items: flex-end;
`;
  const StyledContent = styled('div')`
    background-color: white;
    width: 100%;
    padding: 2rem 1rem;
    box-sizing: border-box;
    border: solid 2px #c3c4c7;
    border-top: none;
`;
  const StyledTab = styled('button')`
    padding: 1rem;
    border: solid 1px #c3c4c7;
    border-bottom: solid 2px #c3c4c7;
    margin-left: 4px;
    border-radius: 3px 3px 0 0;
    transition: all 0.3s ease-in-out;
    transform: translateY(2px);
    cursor: pointer;
    background-color: #f0f0f1;

    ${props => props.isActive && `
        border-bottom: solid 2px transparent;
        background-color: white;
    `}
`;
  const tabs = [{
    slug: 'pending',
    name: 'Pending'
  }, {
    slug: 'approved',
    name: 'Approved'
  }, {
    slug: 'approvedAndPublished',
    name: 'Published'
  }, {
    slug: 'rejected',
    name: 'Rejected'
  }];

  const PublicationApprovalDashboard = ({
    options
  }) => {
    const [approved, setApproved] = createSignal([]);
    const [approvedAndPublished, setApprovedAndPublished] = createSignal([]);
    const [pending, setPending] = createSignal([]);
    const [rejected, setRejected] = createSignal([]);
    const [loading, setLoading] = createSignal(false);
    const [errorMsg, setErrorMsg] = createSignal('');
    const [activeTab, setActiveTab] = createSignal('pending');
    onMount(() => {
      setLoading(true);
      getPublicationRequests();
    });

    const getPublicationRequests = async () => {
      try {
        var _result$data;

        const result = await wpAjax(`${options.api}/get-publication-requests.php`);
        sortRequests(result === null || result === void 0 ? void 0 : (_result$data = result.data) === null || _result$data === void 0 ? void 0 : _result$data.resources);
      } catch (err) {
        console.log('Error fetching all publication requests', err);
        setErrorMsg('Error fetching all publication requests');
      }
    };

    const deletePublicationRequest = async postId => {
      console.log('Deleting publication request: ' + postId);

      try {
        var _result$errors;

        const result = await wpAjax(`${options.api}/delete-publication-request.php`, {
          postId
        });
        console.log('Delete result', result);

        if (result !== null && result !== void 0 && (_result$errors = result.errors) !== null && _result$errors !== void 0 && _result$errors.length) {
          var _result$errors$;

          throw new Error((_result$errors$ = result.errors[0]) === null || _result$errors$ === void 0 ? void 0 : _result$errors$.message);
        }

        getPublicationRequests();
      } catch (err) {
        console.log('Error deleting publication request', err);
        setErrorMsg('Error deleting publication request');
      }
    };

    const sortRequests = (unsortedRequests = []) => {
      const listsByStatus = {
        pending: {},
        approved: {},
        approvedAndPublished: {},
        rejected: {}
      };
      console.log('Unsorted requests', unsortedRequests);
      const requests = unsortedRequests.sort((a, b) => {
        return new Date(b.content.updated_on) - new Date(a.content.updated_on);
      });
      requests.forEach(request => {
        const status = request.content.status;
        const domain = cleanDomain(request.content['wp-domain']);
        const siteTitleAndDomain = request.content.from_site_name + ' - ' + domain;

        if (!listsByStatus[status][siteTitleAndDomain]) {
          listsByStatus[status][siteTitleAndDomain] = [];
        }

        listsByStatus[status][siteTitleAndDomain].push(request);
      });
      console.log('Approved: ', listsByStatus.approved);
      console.log('Approved And Published: ', listsByStatus.approvedAndPublished);
      console.log('Pending: ', listsByStatus.pending);
      console.log('Rejected: ', listsByStatus.rejected);
      setApproved(listsByStatus.approved);
      setApprovedAndPublished(listsByStatus.approvedAndPublished);
      setRejected(listsByStatus.rejected);
      setPending(listsByStatus.pending);
      setLoading(false);
    };

    const cleanDomain = domain => {
      const index = domain.indexOf('://');
      return domain.slice(index + 3);
    };

    const createStatusList = ({
      title,
      siteRequests
    }) => {
      const siteSlugs = Object.keys(siteRequests);
      return createComponent(StyledStatusList, {
        get children() {
          return [createComponent(Heading3, {
            children: title
          }), createComponent(Show, {
            get when() {
              return siteSlugs.length !== 0;
            },

            get fallback() {
              return createComponent(StyledText, {
                children: "None to show"
              });
            },

            get children() {
              return createComponent(For, {
                each: siteSlugs,
                children: domain => createComponent(StyledSiteList, {
                  get children() {
                    return [createComponent(StyledDomainHeading, {
                      children: domain
                    }), createComponent(For, {
                      get each() {
                        return siteRequests[domain];
                      },

                      children: item => createComponent(PublicationRequestItem, {
                        item: item,
                        manualDelete: () => deletePublicationRequest(item.content.post_id),
                        type: 'admin'
                      })
                    })];
                  }

                })
              });
            }

          })];
        }

      });
    };

    return (() => {
      const _el$ = _tmpl$3$2.cloneNode(true);

      insert(_el$, createComponent(Heading1, {
        children: "Publication requests"
      }), null);

      insert(_el$, createComponent(StyledTabs, {
        get children() {
          return createComponent(For, {
            each: tabs,
            children: (tab, i) => createComponent(StyledTab, {
              get isActive() {
                return tab.slug === activeTab();
              },

              onClick: () => setActiveTab(tab.slug),

              get children() {
                return tab.name;
              }

            })
          });
        }

      }), null);

      insert(_el$, createComponent(StyledContent, {
        get children() {
          return [(() => {
            const _c$ = memo(() => !!loading(), true);

            return createComponent(Show, {
              get when() {
                return _c$() && !errorMsg();
              },

              get children() {
                return createComponent(StyledText, {
                  children: "Loading..."
                });
              }

            });
          })(), (() => {
            const _c$2 = memo(() => !!(activeTab() === 'pending' && !loading()), true);

            return createComponent(Show, {
              get when() {
                return _c$2() && !errorMsg();
              },

              get children() {
                return createStatusList({
                  title: 'Pending',
                  siteRequests: pending()
                });
              }

            });
          })(), (() => {
            const _c$3 = memo(() => !!(activeTab() === 'approved' && !loading()), true);

            return createComponent(Show, {
              get when() {
                return _c$3() && !errorMsg();
              },

              get children() {
                return createStatusList({
                  title: 'Approved',
                  siteRequests: approved()
                });
              }

            });
          })(), (() => {
            const _c$4 = memo(() => !!(activeTab() === 'approvedAndPublished' && !loading()), true);

            return createComponent(Show, {
              get when() {
                return _c$4() && !errorMsg();
              },

              get children() {
                return createStatusList({
                  title: 'Published',
                  siteRequests: approvedAndPublished()
                });
              }

            });
          })(), (() => {
            const _c$5 = memo(() => !!(activeTab() === 'rejected' && !loading()), true);

            return createComponent(Show, {
              get when() {
                return _c$5() && !errorMsg();
              },

              get children() {
                return createStatusList({
                  title: 'Rejected',
                  siteRequests: rejected()
                });
              }

            });
          })(), createComponent(Show, {
            get when() {
              return errorMsg();
            },

            get children() {
              return [(() => {
                const _el$2 = _tmpl$$8.cloneNode(true);

                insert(_el$2, errorMsg);

                return _el$2;
              })(), _tmpl$2$2.cloneNode(true)];
            }

          })];
        }

      }), null);

      return _el$;
    })();
  };

  const _tmpl$$9 = template(`<p></p>`),
        _tmpl$2$3 = template(`<p>Reload page</p>`),
        _tmpl$3$3 = template(`<div></div>`);
  const StyledStatusList$1 = styled('div')`
    margin-bottom: 3rem;
`;
  const StyledSiteList$1 = styled('div')`
    margin-top: 1rem;
    margin-bottom: 2rem;
`;
  const StyledDomainHeading$1 = styled('p')`
    font-size: 15px;
`;
  const tabs$1 = [{
    slug: 'pending',
    name: 'Pending'
  }, {
    slug: 'approved',
    name: 'Approved'
  }, {
    slug: 'approvedAndPublished',
    name: 'Published'
  }, {
    slug: 'rejected',
    name: 'Rejected'
  }];

  const PublicationRequestsDashboard = ({
    options
  }) => {
    const [approved, setApproved] = createSignal([]);
    const [approvedAndPublished, setApprovedAndPublished] = createSignal([]);
    const [pending, setPending] = createSignal([]);
    const [rejected, setRejected] = createSignal([]);
    const [activeTab, setActiveTab] = createSignal('pending');
    const [loading, setLoading] = createSignal(false);
    const [errorMsg, setErrorMsg] = createSignal('');
    onMount(() => {
      setLoading(true);
      getPublicationRequests();
    });

    const getPublicationRequests = async () => {
      try {
        var _result$data;

        const result = await wpAjax(`${options.api}/get-publication-requests.php`);
        sortRequests(result === null || result === void 0 ? void 0 : (_result$data = result.data) === null || _result$data === void 0 ? void 0 : _result$data.resources);
      } catch (err) {
        console.log('Error fetching all publication requests', err);
        setErrorMsg('Error fetching all publication requests');
      }
    };

    const deletePublicationRequest = async postId => {
      console.log('Deleting publication request: ' + postId);

      try {
        var _result$errors;

        const result = await wpAjax(`${options.api}/delete-publication-request.php`, {
          postId
        });
        console.log('Delete result', result);

        if (result !== null && result !== void 0 && (_result$errors = result.errors) !== null && _result$errors !== void 0 && _result$errors.length) {
          var _result$errors$;

          throw new Error((_result$errors$ = result.errors[0]) === null || _result$errors$ === void 0 ? void 0 : _result$errors$.message);
        }

        getPublicationRequests();
      } catch (err) {
        console.log('Error deleting publication request', err);
        setErrorMsg('Error deleting publication request');
      }
    };

    const sortRequests = (unsortedRequests = []) => {
      const listsByStatus = {
        pending: {},
        approved: {},
        approvedAndPublished: {},
        rejected: {}
      };
      console.log('Unsorted requests', unsortedRequests);
      const requests = unsortedRequests.filter(request => {
        return request.content.requestedBy === options.userName;
      }).sort((a, b) => {
        return new Date(b.content.updated_on) - new Date(a.content.updated_on);
      });
      requests.forEach(request => {
        const status = request.content.status;
        const domain = cleanDomain(request.content['wp-domain']);
        const siteTitleAndDomain = request.content.from_site_name + ' - ' + domain;

        if (!listsByStatus[status][siteTitleAndDomain]) {
          listsByStatus[status][siteTitleAndDomain] = [];
        }

        listsByStatus[status][siteTitleAndDomain].push(request);
      });
      console.log('Approved: ', listsByStatus.approved);
      console.log('Approved And Published:', listsByStatus.approvedAndPublished);
      console.log('Pending: ', listsByStatus.pending);
      console.log('Rejected: ', listsByStatus.rejected);
      setApproved(listsByStatus.approved);
      setApprovedAndPublished(listsByStatus.approvedAndPublished);
      setRejected(listsByStatus.rejected);
      setPending(listsByStatus.pending);
      setLoading(false);
    };

    const cleanDomain = domain => {
      const index = domain.indexOf('://');
      return domain.slice(index + 3);
    };

    const createStatusList = ({
      title,
      siteRequests
    }) => {
      const siteSlugs = Object.keys(siteRequests);
      return createComponent(StyledStatusList$1, {
        get children() {
          return [createComponent(Heading3, {
            children: title
          }), createComponent(Show, {
            get when() {
              return siteSlugs.length !== 0;
            },

            get fallback() {
              return createComponent(StyledText, {
                children: "None to show"
              });
            },

            get children() {
              return createComponent(For, {
                each: siteSlugs,
                children: domain => createComponent(StyledSiteList$1, {
                  get children() {
                    return [createComponent(StyledDomainHeading$1, {
                      children: domain
                    }), createComponent(For, {
                      get each() {
                        return siteRequests[domain];
                      },

                      children: item => createComponent(PublicationRequestItem, {
                        item: item,
                        manualDelete: () => deletePublicationRequest(item.content.post_id),
                        type: 'editor'
                      })
                    })];
                  }

                })
              });
            }

          })];
        }

      });
    };

    return (() => {
      const _el$ = _tmpl$3$3.cloneNode(true);

      insert(_el$, createComponent(Heading1, {
        children: "My publication requests"
      }), null);

      insert(_el$, createComponent(StyledTabs, {
        get children() {
          return createComponent(For, {
            each: tabs$1,
            children: (tab, i) => createComponent(StyledTab, {
              get isActive() {
                return tab.slug === activeTab();
              },

              onClick: () => setActiveTab(tab.slug),

              get children() {
                return tab.name;
              }

            })
          });
        }

      }), null);

      insert(_el$, createComponent(StyledContent, {
        get children() {
          return [(() => {
            const _c$ = memo(() => !!loading(), true);

            return createComponent(Show, {
              get when() {
                return _c$() && !errorMsg();
              },

              get children() {
                return createComponent(StyledText, {
                  children: "Loading..."
                });
              }

            });
          })(), (() => {
            const _c$2 = memo(() => !!(activeTab() === 'pending' && !loading()), true);

            return createComponent(Show, {
              get when() {
                return _c$2() && !errorMsg();
              },

              get children() {
                return createStatusList({
                  title: 'Pending',
                  siteRequests: pending()
                });
              }

            });
          })(), (() => {
            const _c$3 = memo(() => !!(activeTab() === 'approved' && !loading()), true);

            return createComponent(Show, {
              get when() {
                return _c$3() && !errorMsg();
              },

              get children() {
                return createStatusList({
                  title: 'Approved',
                  siteRequests: approved()
                });
              }

            });
          })(), (() => {
            const _c$4 = memo(() => !!(activeTab() === 'approvedAndPublished' && !loading()), true);

            return createComponent(Show, {
              get when() {
                return _c$4() && !errorMsg();
              },

              get children() {
                return createStatusList({
                  title: 'Published',
                  siteRequests: approvedAndPublished()
                });
              }

            });
          })(), (() => {
            const _c$5 = memo(() => !!(activeTab() === 'rejected' && !loading()), true);

            return createComponent(Show, {
              get when() {
                return _c$5() && !errorMsg();
              },

              get children() {
                return createStatusList({
                  title: 'Rejected',
                  siteRequests: rejected()
                });
              }

            });
          })(), createComponent(Show, {
            get when() {
              return errorMsg();
            },

            get children() {
              return [(() => {
                const _el$2 = _tmpl$$9.cloneNode(true);

                insert(_el$2, errorMsg);

                return _el$2;
              })(), _tmpl$2$3.cloneNode(true)];
            }

          })];
        }

      }), null);

      return _el$;
    })();
  };

  const getData = id => {
    try {
      return JSON.parse(document.getElementById(id).innerHTML); // eslint-disable-line
    } catch (err) {
      console.log('Error in getData', err);
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

  const renderPublicationApprovalDashboard = () => {
    const root = document.getElementById('dls-publication-approval-root');
    const data = getData('dls-data');
    render(() => createComponent(PublicationApprovalDashboard, {
      options: data
    }), root);
  };

  const renderPublicationRequests = () => {
    const root = document.getElementById('dls-publication-requests-root');
    const data = getData('dls-data');
    render(() => createComponent(PublicationRequestsDashboard, {
      options: data
    }), root);
  };

  jQuery(document).ready(function ($) {
    var _wp, _wp$data;

    // Turn off the pre publish dialog of pages using the Gutenberg editor
    const editor = (_wp = wp) === null || _wp === void 0 ? void 0 : (_wp$data = _wp.data) === null || _wp$data === void 0 ? void 0 : _wp$data.dispatch('core/editor');

    if (editor) {
      editor.disablePublishSidebar();
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
    } else if (hookData.hook.includes('toplevel_page_publication-approval')) {
      renderPublicationApprovalDashboard();
    } else if (hookData.hook.includes('toplevel_page_publication-requests')) {
      renderPublicationRequests();
    } else if (!hookData.hook.includes('.php')) {
      renderMetaBox();
    } // This make sure we can activate cerberus with a secret click


    const toggleCerberus = () => {
      const showCerberus = getCookie('cerberus-activated') === 'true';
      const cerberus = document.querySelector('#toplevel_page_draft-live-sync');

      if (showCerberus && cerberus) {
        cerberus.style.display = 'block';
      } else if (cerberus) {
        cerberus.style.display = 'none';
      }
    };

    toggleCerberus();
    const initiator = document.querySelector('#cerberus-initiator');

    if (initiator) {
      let counter = 0;
      initiator.addEventListener('click', () => {
        if (counter++ > 9) {
          const showCerberus = getCookie('cerberus-activated') === 'true';

          if (!showCerberus) {
            setCookie('cerberus-activated', true, 1000);
          } else {
            setCookie('cerberus-activated', false, 0);
          }

          toggleCerberus();
          counter = 0;
        }
      });
    }
  });

  const setCookie = (name, value, days) => {
    var expires = "";

    if (days) {
      var date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = "; expires=" + date.toUTCString();
    }

    document.cookie = name + "=" + (value || "") + expires + "; path=/";
  };

  const getCookie = name => {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');

    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];

      while (c.charAt(0) == ' ') c = c.substring(1, c.length);

      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }

    return null;
  };

}());
//# sourceMappingURL=draft-live-sync-boot-1.0.0.js.map
