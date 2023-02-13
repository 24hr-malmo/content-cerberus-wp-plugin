!function(){"use strict";const e=Symbol("solid-proxy"),t={equals:(e,t)=>e===t};let n=q;const r={},o=1,i=2,l={owned:null,cleanups:null,context:null,owner:null};var a=null;let s=null,c=null,d=null,u=null,p=null,h=0;function g(e,t){t&&(a=t);const n=c,r=a,o=0===e.length?l:{owned:null,cleanups:null,context:null,owner:r};let i;a=o,c=null;try{j((()=>i=e((()=>z(o)))),!0)}finally{c=n,a=r}return i}function f(e,n){n=n?Object.assign({},t,n):t;const o={value:e,observers:null,observerSlots:null,pending:r,comparator:n.equals||void 0};return[A.bind(o),e=>("function"==typeof e&&(e=e(o.pending!==r?o.pending:o.value)),P(o,e))]}function v(e,t,n){T(N(e,t,!1))}function b(e,t,r){n=E;const o=N(e,t,!1);o.user=!0,p&&p.push(o)}function m(e,n,o){o=o?Object.assign({},t,o):t;const i=N(e,n,!0);return i.pending=r,i.observers=null,i.observerSlots=null,i.state=0,i.comparator=o.equals||void 0,T(i),A.bind(i)}function y(e){if(d)return e();let t;const n=d=[];try{t=e()}finally{d=null}return j((()=>{for(let e=0;e<n.length;e+=1){const t=n[e];if(t.pending!==r){const e=t.pending;t.pending=r,P(t,e)}}}),!1),t}function w(e){let t,n=c;return c=null,t=e(),c=n,t}function x(e){b((()=>w(e)))}function k(){return c}function S(e){const t=Symbol("context");return{id:t,Provider:H(t),defaultValue:e}}function C(e){return R(a,e.id)||e.defaultValue}function M(e){const t=m(e);return m((()=>B(t())))}function A(){if(this.state&&this.sources){const e=u;u=null,this.state===o?T(this):L(this),u=e}if(c){const e=this.observers?this.observers.length:0;c.sources?(c.sources.push(this),c.sourceSlots.push(e)):(c.sources=[this],c.sourceSlots=[e]),this.observers?(this.observers.push(c),this.observerSlots.push(c.sources.length-1)):(this.observers=[c],this.observerSlots=[c.sources.length-1])}return this.value}function P(e,t,n){return e.comparator&&e.comparator(e.value,t)?t:d?(e.pending===r&&d.push(e),e.pending=t,t):(e.value=t,!e.observers||u&&!e.observers.length||j((()=>{for(let t=0;t<e.observers.length;t+=1){const n=e.observers[t];s&&s.running&&s.disposed.has(n),n.observers&&n.state!==i&&$(n),n.state=o,n.pure?u.push(n):p.push(n)}if(u.length>1e6)throw u=[],new Error}),!1),t)}function T(e){if(!e.fn)return;z(e);const t=a,n=c,r=h;c=a=e,function(e,t,n){let r;try{r=e.fn(t)}catch(e){O(e)}(!e.updatedAt||e.updatedAt<=n)&&(e.observers&&e.observers.length?P(e,r):e.value=r,e.updatedAt=n)}(e,e.value,r),c=n,a=t}function N(e,t,n,r){const i={fn:e,state:o,updatedAt:null,owned:null,sources:null,sourceSlots:null,cleanups:null,value:t,owner:a,context:null,pure:n};return null===a||a!==l&&(a.owned?a.owned.push(i):a.owned=[i]),i}function D(e){let t,n=e.state===o&&e;if(e.suspense&&w(e.suspense.inFallback))return e.suspense.effects.push(e);for(;e=e.owner;)e.state===i?t=e:e.state===o&&(n=e,t=void 0);if(t){const e=u;if(u=null,L(t),u=e,!n||n.state!==o)return}n&&T(n)}function j(e,t){if(u)return e();let r=!1;t||(u=[]),p?r=!0:p=[],h++;try{e()}catch(e){O(e)}finally{!function(e){u&&(q(u),u=null);if(e)return;p.length?y((()=>{n(p),p=null})):p=null}(r)}}function q(e){for(let t=0;t<e.length;t++)D(e[t])}function E(e){let t,n=0;for(t=0;t<e.length;t++){const r=e[t];r.user?e[n++]=r:D(r)}const r=e.length;for(t=0;t<n;t++)D(e[t]);for(t=r;t<e.length;t++)D(e[t])}function L(e){e.state=0;for(let t=0;t<e.sources.length;t+=1){const n=e.sources[t];n.sources&&(n.state===o?D(n):n.state===i&&L(n))}}function $(e){for(let t=0;t<e.observers.length;t+=1){const n=e.observers[t];n.state||(n.state=i,n.observers&&$(n))}}function z(e){let t;if(e.sources)for(;e.sources.length;){const t=e.sources.pop(),n=e.sourceSlots.pop(),r=t.observers;if(r&&r.length){const e=r.pop(),o=t.observerSlots.pop();n<r.length&&(e.sourceSlots[o]=n,r[n]=e,t.observerSlots[n]=o)}}if(e.owned){for(t=0;t<e.owned.length;t++)z(e.owned[t]);e.owned=null}if(e.cleanups){for(t=0;t<e.cleanups.length;t++)e.cleanups[t]();e.cleanups=null}e.state=0,e.context=null}function O(e){throw e}function R(e,t){return e&&(e.context&&e.context[t]||e.owner&&R(e.owner,t))}function B(e){if("function"==typeof e&&!e.length)return B(e());if(Array.isArray(e)){const t=[];for(let n=0;n<e.length;n++){const r=B(e[n]);Array.isArray(r)?t.push.apply(t,r):t.push(r)}return t}return e}function H(e){return function(t){let n;var r;return T(N((()=>n=w((()=>(a.context={[e]:t.value},M((()=>t.children)))))),r,!0)),n}}const I=Symbol("fallback");function U(e){for(let t=0;t<e.length;t++)e[t]()}function F(e,t,n={}){let r=[],o=[],i=[],l=0,s=t.length>1?[]:null;var c;return c=()=>U(i),null===a||(null===a.cleanups?a.cleanups=[c]:a.cleanups.push(c)),()=>{let a,c,d=e()||[];return w((()=>{let e,t,p,h,f,v,b,m,y,w=d.length;if(0===w)0!==l&&(U(i),i=[],r=[],o=[],l=0,s&&(s=[])),n.fallback&&(r=[I],o[0]=g((e=>(i[0]=e,n.fallback()))),l=1);else if(0===l){for(o=new Array(w),c=0;c<w;c++)r[c]=d[c],o[c]=g(u);l=w}else{for(p=new Array(w),h=new Array(w),s&&(f=new Array(w)),v=0,b=Math.min(l,w);v<b&&r[v]===d[v];v++);for(b=l-1,m=w-1;b>=v&&m>=v&&r[b]===d[m];b--,m--)p[m]=o[b],h[m]=i[b],s&&(f[m]=s[b]);for(e=new Map,t=new Array(m+1),c=m;c>=v;c--)y=d[c],a=e.get(y),t[c]=void 0===a?-1:a,e.set(y,c);for(a=v;a<=b;a++)y=r[a],c=e.get(y),void 0!==c&&-1!==c?(p[c]=o[a],h[c]=i[a],s&&(f[c]=s[a]),c=t[c],e.set(y,c)):i[a]();for(c=v;c<w;c++)c in p?(o[c]=p[c],i[c]=h[c],s&&(s[c]=f[c],s[c](c))):o[c]=g(u);o=o.slice(0,l=w),r=d.slice(0)}return o}));function u(e){if(i[c]=e,s){const[e,n]=f(c);return s[c]=n,t(d[c],e)}return t(d[c])}}}function K(e,t){return w((()=>e(t)))}function J(){return!0}const Q={get:(t,n,r)=>n===e?r:t.get(n),has:(e,t)=>e.has(t),set:J,deleteProperty:J,getOwnPropertyDescriptor:(e,t)=>({configurable:!0,enumerable:!0,get:()=>e.get(t),set:J,deleteProperty:J}),ownKeys:e=>e.keys()};function Y(...e){return new Proxy({get(t){for(let n=e.length-1;n>=0;n--){const r=e[n][t];if(void 0!==r)return r}},has(t){for(let n=e.length-1;n>=0;n--)if(t in e[n])return!0;return!1},keys(){const t=[];for(let n=0;n<e.length;n++)t.push(...Object.keys(e[n]));return[...new Set(t)]}},Q)}function V(e){const t="fallback"in e&&{fallback:()=>e.fallback};return m(F((()=>e.each),e.children,t||void 0))}function W(e){let t=!1;const n=m((()=>e.when),void 0,{equals:(e,n)=>t?e===n:!e==!n});return m((()=>{const r=n();if(r){const n=e.children;return(t="function"==typeof n&&n.length>0)?w((()=>n(r))):n}return e.fallback}))}function X(e){let t=!1;const n=M((()=>e.children)),r=m((()=>{let e=n();Array.isArray(e)||(e=[e]);for(let t=0;t<e.length;t++){const n=e[t].when;if(n)return[t,n,e[t]]}return[-1]}),void 0,{equals:(e,n)=>e&&e[0]===n[0]&&(t?e[1]===n[1]:!e[1]==!n[1])&&e[2]===n[2]});return m((()=>{const[n,o,i]=r();if(n<0)return e.fallback;const l=i.children;return(t="function"==typeof l&&l.length>0)?w((()=>l(o))):l}))}function G(e){return e}const Z=new Set(["className","indeterminate","value","allowfullscreen","allowpaymentrequest","async","autofocus","autoplay","checked","controls","default","disabled","formnovalidate","hidden","ismap","itemscope","loop","multiple","muted","nomodule","novalidate","open","playsinline","readonly","required","reversed","seamless","selected","truespeed"]),ee=new Set(["innerHTML","textContent","innerText","children"]),te={className:"class",htmlFor:"for"},ne=new Set(["beforeinput","click","dblclick","focusin","focusout","input","keydown","keyup","mousedown","mousemove","mouseout","mouseover","mouseup","pointerdown","pointermove","pointerout","pointerover","pointerup","touchend","touchmove","touchstart"]),re={xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace"};function oe(e,t){return m(e,void 0,t?void 0:{equals:t})}function ie(e,t,n){let r=n.length,o=t.length,i=r,l=0,a=0,s=t[o-1].nextSibling,c=null;for(;l<o||a<i;)if(t[l]!==n[a]){for(;t[o-1]===n[i-1];)o--,i--;if(o===l){const t=i<r?a?n[a-1].nextSibling:n[i-a]:s;for(;a<i;)e.insertBefore(n[a++],t)}else if(i===a)for(;l<o;)c&&c.has(t[l])||e.removeChild(t[l]),l++;else if(t[l]===n[i-1]&&n[a]===t[o-1]){const r=t[--o].nextSibling;e.insertBefore(n[a++],t[l++].nextSibling),e.insertBefore(n[--i],r),t[o]=n[i]}else{if(!c){c=new Map;let e=a;for(;e<i;)c.set(n[e],e++)}const r=c.get(t[l]);if(null!=r)if(a<r&&r<i){let s,d=l,u=1;for(;++d<o&&d<i&&null!=(s=c.get(t[d]))&&s===r+u;)u++;if(u>r-a){const o=t[l];for(;a<r;)e.insertBefore(n[a++],o)}else e.replaceChild(n[a++],t[l++])}else l++;else e.removeChild(t[l++])}}else l++,a++}const le="_$DX_DELEGATE";function ae(e,t,n){let r;return g((o=>{r=o,fe(t,e(),t.firstChild?null:void 0,n)})),()=>{r(),t.textContent=""}}function se(e,t,n){const r=document.createElement("template");r.innerHTML=e;let o=r.content.firstChild;return n&&(o=o.firstChild),o}function ce(e,t=window.document){const n=t[le]||(t[le]=new Set);for(let r=0,o=e.length;r<o;r++){const o=e[r];n.has(o)||(n.add(o),t.addEventListener(o,be))}}function de(e,t,n){null==n?e.removeAttribute(t):e.setAttribute(t,n)}function ue(e,t,n,r){null==r?e.removeAttributeNS(t,n):e.setAttributeNS(t,n,r)}function pe(e,t,n,r){r?Array.isArray(n)?(e[`$$${t}`]=n[0],e[`$$${t}Data`]=n[1]):e[`$$${t}`]=n:Array.isArray(n)?e.addEventListener(t,(e=>n[0](n[1],e))):e.addEventListener(t,n)}function he(e,t,n={}){const r=Object.keys(t),o=Object.keys(n);let i,l;for(i=0,l=o.length;i<l;i++){const r=o[i];r&&"undefined"!==r&&!(r in t)&&(ve(e,r,!1),delete n[r])}for(i=0,l=r.length;i<l;i++){const o=r[i],l=!!t[o];o&&"undefined"!==o&&n[o]!==l&&(ve(e,o,l),n[o]=l)}return n}function ge(e,t,n={}){const r=e.style;if("string"==typeof t)return r.cssText=t;let o,i;for(i in"string"==typeof n&&(n={}),n)null==t[i]&&r.removeProperty(i),delete n[i];for(i in t)o=t[i],o!==n[i]&&(r.setProperty(i,o),n[i]=o);return n}function fe(e,t,n,r){if(void 0===n||r||(r=[]),"function"!=typeof t)return ye(e,t,r,n);v((r=>ye(e,t(),r,n)),r)}function ve(e,t,n){const r=t.split(/\s+/);for(let t=0,o=r.length;t<o;t++)e.classList.toggle(r[t],n)}function be(e){const t=`$$${e.type}`;let n=e.composedPath&&e.composedPath()[0]||e.target;for(e.target!==n&&Object.defineProperty(e,"target",{configurable:!0,value:n}),Object.defineProperty(e,"currentTarget",{configurable:!0,get:()=>n});null!==n;){const r=n[t];if(r&&!n.disabled){const o=n[`${t}Data`];if(void 0!==o?r(o,e):r(e),e.cancelBubble)return}n=n.host&&n.host!==n&&n.host instanceof Node?n.host:n.parentNode}}function me(e,t,n={},r,o){return!o&&"children"in t&&v((()=>n.children=ye(e,t.children,n.children))),v((()=>function(e,t,n,r,o={}){let i,l,a;for(const c in t){if("children"===c){r||ye(e,t.children);continue}const d=t[c];if(d!==o[c]){if("style"===c)ge(e,d,o[c]);else if("class"!==c||n)if("classList"===c)he(e,d,o[c]);else if("ref"===c)d(e);else if("on:"===c.slice(0,3))e.addEventListener(c.slice(3),d);else if("oncapture:"===c.slice(0,10))e.addEventListener(c.slice(10),d,!0);else if("on"===c.slice(0,2)){const t=c.slice(2).toLowerCase(),n=ne.has(t);pe(e,t,d,n),n&&ce([t])}else if((a=ee.has(c))||!n&&(l=Z.has(c))||(i=e.nodeName.includes("-")))!i||l||a?e[c]=d:e[(s=c,s.toLowerCase().replace(/-([a-z])/g,((e,t)=>t.toUpperCase())))]=d;else{const t=n&&c.indexOf(":")>-1&&re[c.split(":")[0]];t?ue(e,t,c,d):de(e,te[c]||c,d)}else e.className=d;o[c]=d}}var s}(e,t,r,!0,n))),n}function ye(e,t,n,r,o){for(;"function"==typeof n;)n=n();if(t===n)return n;const i=typeof t,l=void 0!==r;if(e=l&&n[0]&&n[0].parentNode||e,"string"===i||"number"===i)if("number"===i&&(t=t.toString()),l){let o=n[0];o&&3===o.nodeType?o.data=t:o=document.createTextNode(t),n=ke(e,n,r,o)}else n=""!==n&&"string"==typeof n?e.firstChild.data=t:e.textContent=t;else if(null==t||"boolean"===i)n=ke(e,n,r);else{if("function"===i)return v((()=>{let o=t();for(;"function"==typeof o;)o=o();n=ye(e,o,n,r)})),()=>n;if(Array.isArray(t)){const i=[];if(we(i,t,o))return v((()=>n=ye(e,i,n,r,!0))),()=>n;if(0===i.length){if(n=ke(e,n,r),l)return n}else Array.isArray(n)?0===n.length?xe(e,i,r):ie(e,n,i):null==n||""===n?xe(e,i):ie(e,l&&n||[e.firstChild],i);n=i}else if(t instanceof Node){if(Array.isArray(n)){if(l)return n=ke(e,n,r,t);ke(e,n,null,t)}else null!=n&&""!==n&&e.firstChild?e.replaceChild(t,e.firstChild):e.appendChild(t);n=t}}return n}function we(e,t,n){let r=!1;for(let o=0,i=t.length;o<i;o++){let i,l=t[o];if(l instanceof Node)e.push(l);else if(null==l||!0===l||!1===l);else if(Array.isArray(l))r=we(e,l)||r;else if("string"==(i=typeof l))e.push(document.createTextNode(l));else if("function"===i)if(n){for(;"function"==typeof l;)l=l();r=we(e,Array.isArray(l)?l:[l])||r}else e.push(l),r=!0;else e.push(document.createTextNode(l.toString()))}return r}function xe(e,t,n){for(let r=0,o=t.length;r<o;r++)e.insertBefore(t[r],n)}function ke(e,t,n,r){if(void 0===n)return e.textContent="";const o=r||document.createTextNode("");if(t.length){let r=!1;for(let i=t.length-1;i>=0;i--){const l=t[i];if(o!==l){const t=l.parentNode===e;r||i?t&&e.removeChild(l):t?e.replaceChild(o,l):e.insertBefore(o,n)}else r=!0}}else e.insertBefore(o,n);return[o]}const Se=Symbol("store-raw"),Ce=Symbol("store-node"),Me=Symbol("store-name");function Ae(t,n){let r=t[e];if(!r){Object.defineProperty(t,e,{value:r=new Proxy(t,De)});const n=Object.keys(t),o=Object.getOwnPropertyDescriptors(t);for(let e=0,i=n.length;e<i;e++){const i=n[e];if(o[i].get){const e=o[i].get.bind(r);Object.defineProperty(t,i,{get:e})}}}return r}function Pe(e){return null!=e&&"object"==typeof e&&(!e.__proto__||e.__proto__===Object.prototype||Array.isArray(e))}function _e(e,t=new Set){let n,r,o,i;if(n=null!=e&&e[Se])return n;if(!Pe(e)||t.has(e))return e;if(Array.isArray(e)){Object.isFrozen(e)?e=e.slice(0):t.add(e);for(let n=0,i=e.length;n<i;n++)o=e[n],(r=_e(o,t))!==o&&(e[n]=r)}else{Object.isFrozen(e)?e=Object.assign({},e):t.add(e);const n=Object.keys(e),l=Object.getOwnPropertyDescriptors(e);for(let a=0,s=n.length;a<s;a++)i=n[a],l[i].get||(o=e[i],(r=_e(o,t))!==o&&(e[i]=r))}return e}function Te(e){let t=e[Ce];return t||Object.defineProperty(e,Ce,{value:t={}}),t}function Ne(){const[e,t]=f(void 0,{equals:!1});return e.$=t,e}const De={get(t,n,r){if(n===Se)return t;if(n===e)return r;const o=t[n];if(n===Ce||"__proto__"===n)return o;const i=Pe(o);if(k()&&("function"!=typeof o||t.hasOwnProperty(n))){let e,r;i&&(e=Te(o))&&(r=e._||(e._=Ne()),r()),e=Te(t),r=e[n]||(e[n]=Ne()),r()}return i?Ae(o):o},set:()=>!0,deleteProperty:()=>!0,ownKeys:function(e){if(k()){const t=Te(e);(t._||(t._=Ne()))()}return Reflect.ownKeys(e)},getOwnPropertyDescriptor:function(t,n){const r=Reflect.getOwnPropertyDescriptor(t,n);return!r||r.get||n===e||n===Ce||n===Me||(delete r.value,delete r.writable,r.get=()=>t[e][n]),r}};function je(e,t,n){if(e[t]===n)return;const r=Array.isArray(e),o=e.length,i=void 0===n,l=r||i===t in e;i?delete e[t]:e[t]=n;let a,s=Te(e);(a=s[t])&&a.$(),r&&e.length!==o&&(a=s.length)&&a.$(a,void 0),l&&(a=s._)&&a.$(a,void 0)}function qe(e,t,n=[]){let r,o=e;if(t.length>1){r=t.shift();const i=typeof r,l=Array.isArray(e);if(Array.isArray(r)){for(let o=0;o<r.length;o++)qe(e,[r[o]].concat(t),[r[o]].concat(n));return}if(l&&"function"===i){for(let o=0;o<e.length;o++)r(e[o],o)&&qe(e,[o].concat(t),[o].concat(n));return}if(l&&"object"===i){const{from:o=0,to:i=e.length-1,by:l=1}=r;for(let r=o;r<=i;r+=l)qe(e,[r].concat(t),[r].concat(n));return}if(t.length>1)return void qe(e[r],t,[r].concat(n));o=e[r],n=[r].concat(n)}let i=t[0];"function"==typeof i&&(i=i(o,n),i===o)||void 0===r&&null==i||(i=_e(i),void 0===r||Pe(o)&&Pe(i)&&!Array.isArray(i)?function(e,t){const n=Object.keys(t);for(let r=0;r<n.length;r+=1){const o=n[r];je(e,o,t[o])}}(o,i):je(e,r,i))}function Ee(e,t){const n=_e(e||{});return[Ae(n),function(...e){y((()=>qe(n,e)))}]}const Le=S([{path:"start"},{}]);function $e(e){const t=location.hash.replace(/#/,"")||"start",[n,r]=Ee({path:t});window.addEventListener("popstate",(e=>{const t=e.target.location.hash.replace(/#/,"");r({...n,path:t})}));const o=[n,{apiUrl:e.values.api}];return K(Le.Provider,{value:o,get children(){return e.children}})}let ze={data:""},Oe=e=>"object"==typeof window?((e?e.querySelector("#_goober"):window._goober)||Object.assign((e||document.head).appendChild(document.createElement("style")),{innerHTML:" ",id:"_goober"})).firstChild:e||ze,Re=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(})/g,Be=/\/\*[^]*?\*\/|\s\s+|\n/g,He=(e,t)=>{let n,r="",o="",i="";for(let l in e){let a=e[l];"object"==typeof a?(n=t?t.replace(/([^,])+/g,(e=>l.replace(/([^,])+/g,(t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)))):l,o+="@"==l[0]?"f"==l[1]?He(a,l):l+"{"+He(a,"k"==l[1]?"":t)+"}":He(a,n)):"@"==l[0]&&"i"==l[1]?r=l+" "+a+";":(l=l.replace(/[A-Z]/g,"-$&").toLowerCase(),i+=He.p?He.p(l,a):l+":"+a+";")}return i[0]?(n=t?t+"{"+i+"}":i,r+n+o):r+o},Ie={},Ue=e=>{let t="";for(let n in e)t+=n+("object"==typeof e[n]?Ue(e[n]):e[n]);return t},Fe=(e,t,n,r,o)=>{let i="object"==typeof e?Ue(e):e,l=Ie[i]||(Ie[i]=(e=>{let t=0,n=11;for(;t<e.length;)n=101*n+e.charCodeAt(t++)>>>0;return"go"+n})(i));if(!Ie[l]){let t="object"==typeof e?e:(e=>{let t,n=[{}];for(;t=Re.exec(e.replace(Be,""));)t[4]&&n.shift(),t[3]?n.unshift(n[0][t[3]]=n[0][t[3]]||{}):t[4]||(n[0][t[1]]=t[2]);return n[0]})(e);Ie[l]=He(o?{["@keyframes "+l]:t}:t,n?"":"."+l)}return((e,t,n)=>{-1==t.data.indexOf(e)&&(t.data=n?e+t.data:t.data+e)})(Ie[l],t,r),l},Ke=(e,t,n)=>e.reduce(((e,r,o)=>{let i=t[o];if(i&&i.call){let e=i(n),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;i=t?"."+t:e&&"object"==typeof e?e.props?"":He(e,""):e}return e+r+(null==i?"":i)}),"");function Je(e){let t=this||{},n=e.call?e(t.p):e;return Fe(n.unshift?n.raw?Ke(n,[].slice.call(arguments,1),t.p):n.reduce(((e,n)=>n?Object.assign(e,n.call?n(t.p):n):e),{}):n,Oe(t.target),t.g,t.o,t.k)}Je.bind({g:1});let Qe=Je.bind({k:1});const Ye=S();function Ve(e){let t=this||{};return(...n)=>{const r=r=>{const o=Y(r,{theme:C(Ye)}),i=Y(o,{get className(){const e=o.className,r="className"in o&&/^go[0-9]+/.test(e);return[e,Je.apply({target:t.target,o:r,p:o,g:t.g},n)].filter(Boolean).join(" ")}}),[l,a]=function(e,...t){const n=new Set(t.flat()),r=Object.getOwnPropertyDescriptors(e),o=t.map((t=>{const n={};for(let o=0;o<t.length;o++){const i=t[o];Object.defineProperty(n,i,r[i]?r[i]:{get:()=>e[i]})}return n}));return o.push(new Proxy({get:t=>n.has(t)?void 0:e[t],has:t=>!n.has(t)&&t in e,keys:()=>Object.keys(e).filter((e=>!n.has(e)))},Q)),o}(i,["as"]),s=l.as||e;let c;var d,u,p,h;return"function"==typeof s?c=s(a):(c=document.createElement(s),d=c,"function"==typeof(u=a)?v((e=>me(d,u(),e,p,h))):me(d,u,void 0,p,h)),c};return r.className=e=>w((()=>Je.apply({target:t.target,p:e,g:t.g},n))),r}}const We=Ve("nav")`
    color: black;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 2rem;
`,Xe=Ve("a")`
    font-size: 14px;
    display: block;
    padding: 0 1rem;
`,Ge=()=>(C(Le),K(We,{get children(){return[K(Xe,{href:"#start",children:"Start"}),K(Xe,{href:"#sync-check",children:"Sync Check"}),K(Xe,{href:"#sync-draft",children:"Sync Draft"}),K(Xe,{href:"#sync-live",children:"Sync Live"})]}})),Ze=async(e,t={})=>new Promise(((n,r)=>{jQuery.ajax({url:"/wp-admin/admin-ajax.php",type:"post",dataType:"json",data:{action:e,...t},success:function(e){n(e)},error:(e,t)=>{r(t)}})})),et=async(e,t)=>new Promise(((n,r)=>{jQuery.ajax({url:e,type:t?"post":"get",dataType:"json",data:t,success:function(e){n(e)},error:(e,t)=>{r(e.responseJSON)}})})),tt=Ve("div")`
    background-color: white;
    padding: 1.0rem 2rem 2rem;
    border: 3px solid #ccc;
    border-radius: 3px;
    min-height: 50vh;
`,nt=e=>K(tt,{get children(){return e.children}}),rt=Ve("div")`
    display: flex;
`,ot=Ve("div")`
    flex: 1;
`,it=Ve("div")`
    width: 220px;
    align-items: center;
    justify-content: center;
    display: flex;
`,lt=Ve("p")`
    font-size: 14px;
    padding-bottom: .5rem;
`,at=Ve("div")`
    font-size: 40px;
    font-weight: bold;
    text-align: center;
    width: 100%;
    padding: 3rem 0 2rem;
`,st=Ve("h2")`
    font-size: 24px;
    margin-bottom: .5rem;
`,ct=Ve("h3")`
    font-size: 18px;
    margin-bottom: .5rem;
    margin-top: 0px;
`,dt=e=>K(rt,{get children(){return[K(ot,{get children(){return[K(st,{get children(){return e.title}}),K(lt,{get children(){return e.description}})]}}),K(it,{get children(){return e.actions}})]}});Ve("svg")`
    margin: auto; 
    background: white;
    display: block; 
    shape-rendering: auto;
    width: ${e=>e.width};
    height: ${e=>e.height};
`,Ve("svg")`
    margin: auto; 
    background: rgb(255, 255, 255); 
    display: block; 
    shape-rendering: auto;
`;const ut=se('<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="200px" height="200px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid"><circle cx="50" cy="50" r="32" stroke-width="8" stroke-dasharray="50.26548245743669 50.26548245743669" fill="none" stroke-linecap="round"><animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="2.0408163265306123s" keyTimes="0;1" values="0 50 50;360 50 50"></animateTransform></circle></svg>'),pt={small:"20px",medium:"30px",large:"50px",xlarge:"100px"},ht=({size:e="large",inverted:t=!1})=>{let n={display:"block","shape-rendering":"auto",width:pt[e],height:pt[e],stroke:"#006ba1"};return t&&(n.stroke="#fff"),(()=>{const e=ut.cloneNode(!0);return ge(e,n),e})()},gt=Ve("button")`
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

    ${e=>e.leftMargin?"\n        margin-left: 20px;\n    ":""};

    ${e=>e.disabled?"\n        cursor: default;\n        border: 1px solid rgb(220, 220, 222);\n        color: #a7aaad;\n        background-color: #f6f7f7;\n        &:hover {\n            background-color: #f6f7f7;\n            cursor: default;\n        }\n    ":""};

`,ft=Ve("div")`
    position: absolute;
    right: 7px;
`,vt=e=>K(gt,Y(e,{get children(){return[oe((()=>e.children)),K(W,{get when(){return e.loading},get children(){return K(ft,{get children(){return K(ht,{size:"small",get inverted(){return!e.disabled}})}})}})]}})),bt=Ve("div")`
    display: flex;
    margin-bottom: 2px;
`,mt=Ve("div")`
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
`,yt=Ve("div")`
    background-color: #2271b1;
    font-size: 10px;
    color: white;
    padding: 0px 4px 0px 4px;
    height: 16px;
    line-height: 15px;
    margin: 0 5px 0 0;
    border-radius: 2px;
    cursor: pointer;
`,wt=Ve("a")`
    display: block;
    color: grey;
    text-decoration: none;
`,xt=Ve("div")`
    padding: 0 5px 0 0;
    svg {
        fill: ${e=>e.color};
        transition: fill .2s ease-in;
    }
`,kt=se('<svg height="10" width="10"><circle cx="5" cy="5" r="5" stroke-width="0"></circle></svg>'),St=({showCheckButton:e,showSyncButton:t,showDraft:n,showLive:r,item:o,onClick:i,onTypeClick:l})=>{const a=(e,t)=>{let n="#bbbbbb";return"error"===t?n="#da694b":""===t?n="#bbbbbb":e&&(n=e.synced?"#99da4b":"#e9da4e"),n};return K(bt,{get children(){return[K(W,{when:n,get children(){return K(xt,{get color(){var e,t;return a(null===(e=o.status)||void 0===e?void 0:e.draft,null===(t=o.status)||void 0===t?void 0:t.state)},get children(){return kt.cloneNode(!0)}})}}),K(W,{when:r,get children(){return K(xt,{get color(){var e,t;return a(null===(e=o.status)||void 0===e?void 0:e.live,null===(t=o.status)||void 0===t?void 0:t.state)},get children(){return kt.cloneNode(!0)}})}}),K(W,{when:t,get children(){return K(yt,{onClick:i,children:"sync"})}}),K(W,{when:e,get children(){return K(yt,{onClick:i,children:"check"})}}),K(mt,{onClick:()=>l(o.type),get children(){return o.type}}),K(wt,{target:"_new",get href(){return o.permalink},get children(){return o.permalink||"/"}})]}})},Ct=({type:e})=>{const[t,{apiUrl:n}]=C(Le),[r,o]=Ee({list:[]}),[i,l]=f(!1);b((async()=>{const e=(await Ze("get_all_resources")).list.map(((e,t)=>({...e,index:t})));o({list:e})}));const a=async t=>{try{(await et(`${n}/sync.php`,{action:"sync",permalink:t.permalink,release:e,sync_check:!1})).data?o("list",t.index,"status",{[e]:{synced:!0},state:"loaded"}):o("list",t.index,"status",{state:"error"})}catch(e){o("list",t.index,"status",{state:"error"})}},s="draft"===e?"Begin to sync to Draft":"Publish everything to Live",c="draft"===e?"Sync Draft":"Sync Live",d="draft"===e?"This is where you can make sure that wordpress and the draft content is in sync":"This is where you can make sure that Draft and Live are in sync";return K(nt,{get children(){return[K(dt,{title:c,description:d,get actions(){return K(vt,{get loading(){return i()},onClick:()=>(async()=>{if(i())return;let t=!1;if(("live"===e&&confirm("Do you really which to publish everything?")||"draft"===e)&&(t=!0),t){l(!0),r.list.forEach(((e,t)=>{o("list",t,"status",{state:""}),t++}));for await(let e of r.list)await a(e);l(!1)}})(),children:s})}}),K(V,{get each(){return r.list},children:t=>K(St,{showDraft:"draft"===e,showLive:"live"===e,showSyncButton:!0,onClick:()=>(async e=>{l(!0),await a(e),l(!1)})(t),onTypeClick:()=>(async e=>{l(!0);const t=r.list.filter((t=>t.type===e));t.forEach(((e,t)=>{o("list",t,"status",{state:""}),t++}));for await(let e of t)await a(e);l(!1)})(t.type),item:t,get permalink(){return t.permalink}})})]}})},Mt=()=>{const[e,{apiUrl:t}]=C(Le),[n,r]=Ee({list:[]}),[o,i]=f(!1);console.log(t),b((async()=>{const e=(await Ze("get_all_resources")).list.map(((e,t)=>({...e,index:t})));r({list:e})}));const l=async e=>{try{const n=await et(`${t}/check-sync.php`,{permalink:e.permalink});r("list",e.index,"status",{draft:n.data.resourceStatus.find((e=>"draft"===e.target&&"__original"===e.comparedTo)),live:n.data.resourceStatus.find((e=>"live"===e.target&&"draft"===e.comparedTo)),state:"loaded"})}catch(t){r("list",e.index,"status",{state:"error"})}};return K(nt,{get children(){return[K(dt,{title:"Sync Check",description:"This is where you can check if all content is in sync",get actions(){return K(vt,{get loading(){return o()},onClick:()=>(async()=>{if(!o()){i(!0),n.list.forEach(((e,t)=>{r("list",t,"status",{state:""}),t++}));for await(let e of n.list)await l(e);i(!1)}})(),children:"Begin to check"})}}),K(V,{get each(){return n.list},children:e=>K(St,{showDraft:!0,showLive:!0,showCheckButton:!0,item:e,get permalink(){return e.permalink},onClick:()=>(async e=>{i(!0),await l(e),i(!1)})(e),onTypeClick:()=>(async e=>{i(!0);const t=n.list.filter((t=>t.type===e));t.forEach(((e,t)=>{r("list",t,"status",{state:""}),t++}));for await(let e of t)await l(e);i(!1)})(e.type)})})]}})},At=Ve("p")`
    font-size: 14px;
    padding-bottom: .5rem;
    background-color: #ffeaee;
    border: 2px solid #ffc0cb;
    border-radius: 3px;
    padding: 1rem 2rem;
    text-align: center;
`,Pt=()=>K(nt,{get children(){return[K(dt,{title:"Start",description:"This plugin lets you control and debug content through the content service."}),K(At,{children:"This is mainly used while developing or by admins!"})]}}),_t=Ve("div")`
     color: black;
     max-width: 1200px;
     margin: 0 auto;
`;Ve("div")`
`,Ve("div")`
    font-size: 1rem;
    padding: 1rem 0;
`;const Tt=()=>{const[e]=C(Le);return K(_t,{get children(){return[K(at,{children:"Content Dashboard"}),K(Ge,{}),K(W,{get when(){return"start"===e.path},get children(){return K(Pt,{})}}),K(W,{get when(){return"sync-check"===e.path},get children(){return K(Mt,{})}}),K(W,{get when(){return"sync-draft"===e.path},get children(){return K(Ct,{type:"draft"})}}),K(W,{get when(){return"sync-live"===e.path},get children(){return K(Ct,{type:"live"})}})]}})},Nt=Ve("div")`

    padding-top: 6px;

    ${e=>e.horizontal?"\n        display: flex;   \n        align-items: center;\n        border-bottom: 1px dotted grey;\n        padding: 0 10px 8px 10px;\n        margin-left: -10px;\n        margin-right: -10px;\n        justify-content: flex-end;\n    ":""} 

    ${e=>e.box?"\n        position: relative;\n        min-width: 255px;\n        border: 1px solid #ccd0d4;\n        box-shadow: 0 1px 1px rgb(0 0 0 / 4%);\n        background: #fff;\n        padding: 1rem;\n        box-sizing: border-box;\n        margin-bottom: 7px;\n    ":""}

`,Dt=Ve("div")`
    color: red;
    padding-top: 0.4rem;
`,jt=Ve("div")`
    color: darkgray;
    padding-top: 0.4rem;
`,qt=Ve("div")`
    color: #a7aaad;
    border: 1px solid rgb(220, 220, 222);
    background: #f6f7f7;
    padding: .75rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 3px;

    ${e=>e.horizontal?"\n        padding: 0px;\n        border: 0px;\n        padding: 4px 10px 5px 10px;\n        background: transparent;\n        flex-direction: row;\n        align-items: center;\n        margin-top: 10px;\n    ":""} 

`,Et=Ve("div")`
    text-align: center;
    min-width: 100px;
    ${e=>e.horizontal?"\n        margin-top: 10px;\n    ":""}

`,[Lt,$t]=Ee({options:{},setChecking:()=>!0,syncStatus:{},publish:()=>null,changesNotSavedToDraft:!1,approvalStatus:"",errorMessage:"",approvedBy:""}),zt=e=>{$t({approvalStatus:e})},Ot=e=>{$t({errorMessage:e})},Rt=async()=>{try{var e;const n=await et(`${Lt.options.api}/get-publication-request.php`,{permalink:Lt.options.permalink});if(null!==(e=n.data.resource)&&void 0!==e&&e.content){const e=n.data.resource.content;e.approvedBy&&(t=" by "+e.approvedBy,$t({approvedBy:t})),zt(e.status)}else zt("")}catch(e){console.log("Error fetching publication request",e)}var t},Bt=async(e="")=>{Lt.setChecking(!0);const t=await(async e=>{try{var t;return await et(`${Lt.options.api}/upsert-publication-request.php`,{permalink:Lt.options.permalink,status:e,editorUrl:null===(t=window)||void 0===t?void 0:t.location.href,approvedBy:"approved"===e?Lt.options.userName:""}),{}}catch(e){return console.log("Error upserting publication request",e),{err:e}}})(e);t.err?Ot("Error changing status to "+e):zt(e),Lt.setChecking(!1)},Ht=async()=>{Lt.setChecking(!0);const e=await(async()=>{try{return await et(`${Lt.options.api}/delete-publication-request.php`,{permalink:Lt.options.permalink}),{}}catch(e){return console.log("Error deleting request",e),{err:e}}})();e.err?Ot("Something went wrong withdrawing publication request",e.err):zt(""),Lt.setChecking(!1)},It=()=>K(X,{get children(){return[K(G,{get when(){return"pending"===Lt.approvalStatus},get children(){return K(Et,{get horizontal(){return Lt.options.metaMenu},children:"Pending approval"})}}),K(G,{get when(){return"approved"===Lt.approvalStatus},get children(){return K(Et,{get horizontal(){return Lt.options.metaMenu},get children(){return["Publication approved ",oe((()=>Lt.approvedBy))]}})}}),K(G,{get when(){return"rejected"===Lt.approvalStatus},get children(){return K(Et,{get horizontal(){return Lt.options.metaMenu},children:"Publication rejected"})}})]}}),Ut=()=>{const e=()=>K(vt,{get leftMargin(){return Lt.options.metaMenu},get loading(){return Lt.publishing},onClick:e=>Lt.publish(e),get disabled(){return Lt.changesNotSavedToDraft},get children(){return Lt.changesNotSavedToDraft?"Save draft before publishing to live":"Publish to live site"}});return[K(W,{get when(){return""===Lt.approvalStatus},get children(){return[K(W,{get when(){return Lt.options.userHasPublicationRights},get children(){return e()}}),K(W,{get when(){return!Lt.options.userHasPublicationRights},get children(){return K(vt,{get leftMargin(){return Lt.options.metaMenu},onClick:e=>Bt("pending"),get disabled(){return Lt.changesNotSavedToDraft},get children(){return Lt.changesNotSavedToDraft?"Save draft before publish request":"Request approval to publish"}})}})]}}),K(W,{get when(){return"pending"===Lt.approvalStatus},get children(){return[K(W,{get when(){return Lt.options.userHasPublicationRights},get children(){return[K(vt,{get leftMargin(){return Lt.options.metaMenu},onClick:e=>Bt("approved"),disabled:!1,children:"Approve"}),K(vt,{get leftMargin(){return Lt.options.metaMenu},onClick:e=>Bt("rejected"),disabled:!1,children:"Reject"}),oe((()=>e()))]}}),K(W,{get when(){return!Lt.options.userHasPublicationRights},get children(){return K(vt,{get leftMargin(){return Lt.options.metaMenu},onClick:e=>Ht(),disabled:!1,children:"Withdraw publication request"})}})]}}),K(W,{get when(){return"approved"===Lt.approvalStatus},get children(){return[K(W,{get when(){return Lt.options.userHasPublicationRights},get children(){return e()}}),K(W,{get when(){return!Lt.options.userHasPublicationRights},get children(){return K(vt,{get leftMargin(){return Lt.options.metaMenu},get loading(){return Lt.publishing},onClick:e=>Lt.publish(e),get disabled(){return Lt.changesNotSavedToDraft},get children(){return Lt.changesNotSavedToDraft?"Discard unapproved changes to publish":"Publish to live site"}})}})]}})]},Ft=()=>K(W,{get when(){return"pending"===Lt.approvalStatus&&Lt.changesNotSavedToDraft},get children(){return K(jt,{children:"Saving a new draft will automatically withdraw the pending publication approval"})}}),Kt=()=>[K(W,{get when(){return""===Lt.approvalStatus},get children(){return[K(W,{get when(){return Lt.options.userHasPublicationRights},get children(){return K(vt,{get leftMargin(){return Lt.options.metaMenu},get loading(){return Lt.publishing},onClick:e=>Lt.publish(e),get disabled(){var e;return(null===(e=Lt.syncStatus.live)||void 0===e?void 0:e.synced)||Lt.changesNotSavedToDraft},get children(){var e;return Lt.changesNotSavedToDraft?"Save draft before updating on live":null!==(e=Lt.syncStatus.live)&&void 0!==e&&e.synced?"Updated on live site":"Update on live site"}})}}),K(W,{get when(){return!Lt.options.userHasPublicationRights},get children(){return K(vt,{get leftMargin(){return Lt.options.metaMenu},get loading(){return Lt.publishing},onClick:e=>Bt("pending"),get disabled(){var e;return(null===(e=Lt.syncStatus.live)||void 0===e?void 0:e.synced)||Lt.changesNotSavedToDraft},get children(){var e;return Lt.changesNotSavedToDraft?"Save draft before requesting publication approval":null!==(e=Lt.syncStatus.live)&&void 0!==e&&e.synced?"Updated on live site":"Request approval to publish"}})}})]}}),K(W,{get when(){return"pending"===Lt.approvalStatus},get children(){return[K(W,{get when(){return Lt.options.userHasPublicationRights},get children(){return[K(vt,{get leftMargin(){return Lt.options.metaMenu},onClick:e=>Bt("approved"),disabled:!1,children:"Approve "}),K(vt,{get leftMargin(){return Lt.options.metaMenu},onClick:e=>Bt("rejected"),disabled:!1,children:"Reject"}),K(vt,{get leftMargin(){return Lt.options.metaMenu},get loading(){return Lt.publishing},onClick:e=>Lt.publish(e),get disabled(){return Lt.changesNotSavedToDraft},get children(){var e;return Lt.changesNotSavedToDraft?"Save draft before updating on live":null!==(e=Lt.syncStatus.live)&&void 0!==e&&e.synced?"Updated on live site":"Update on live site"}})]}}),K(W,{get when(){return!Lt.options.userHasPublicationRights},get children(){return K(vt,{get leftMargin(){return Lt.options.metaMenu},onClick:e=>Ht(),disabled:!1,children:"Withdraw publication request"})}})]}}),K(W,{get when(){return"approved"===Lt.approvalStatus},get children(){return[K(W,{get when(){return Lt.options.userHasPublicationRights},get children(){return K(vt,{get leftMargin(){return Lt.options.metaMenu},get loading(){return Lt.publishing},onClick:e=>Lt.publish(e),get disabled(){var e;return(null===(e=Lt.syncStatus.live)||void 0===e?void 0:e.synced)||Lt.changesNotSavedToDraft},get children(){var e;return Lt.changesNotSavedToDraft?"Save draft before publishing to live":null!==(e=Lt.syncStatus.live)&&void 0!==e&&e.synced?"Updated on live site":"Update on live site"}})}}),K(W,{get when(){return!Lt.options.userHasPublicationRights},get children(){return K(vt,{get leftMargin(){return Lt.options.metaMenu},get loading(){return Lt.publishing},onClick:e=>Lt.publish(e),get disabled(){var e;return(null===(e=Lt.syncStatus.live)||void 0===e?void 0:e.synced)||Lt.changesNotSavedToDraft},get children(){var e;return Lt.changesNotSavedToDraft?"Save to draft or discard unapproved changes to publish":null!==(e=Lt.syncStatus.live)&&void 0!==e&&e.synced?"Updated on live site":"Update on live site"}})}})]}}),K(W,{get when(){return"rejected"===Lt.approvalStatus},get children(){return K(W,{get when(){return!Lt.options.userHasPublicationRights},get children(){return K(vt,{get leftMargin(){return Lt.options.metaMenu},onClick:e=>null,disabled:!0,get children(){return Lt.changesNotSavedToDraft?"Save draft before requesting publication approval":"Make changes before requesting approval to publish"}})}})}})],Jt=({options:e})=>{const[t,n]=Ee({}),[r,o]=f(!0),[i,l]=f(!1),[a,s]=f(!1),[c,d]=f(!1),[u,p]=f(!1),[h,g]=f(!1),[v,m]=f(!1),[y,w]=f(!1),[k,S]=f(!1),C={permalink:e.permalink};let M,A;x((()=>{e.requireApproval&&$t({options:e,setChecking:o,syncStatus:t,publish:e=>L(e)})})),b((()=>{var t,n;e.metaMenu?(A=document.querySelector("#save_menu_footer"),N()):null!==(t=wp)&&void 0!==t&&null!==(n=t.data)&&void 0!==n&&n.select&&(M=wp.data.select("core/editor"),wp.domReady(P))})),b((()=>{wp&&wp.hooks&&wp.hooks.addAction&&(j(),wp.hooks.addAction("dls.post-saved","dls",(()=>{var e,n,r;if(null!=t&&null!==(e=t.draft)&&void 0!==e&&e.exists||null===(n=M)||void 0===n||!n.isPublishingPost())null!=t&&null!==(r=t.draft)&&void 0!==r&&r.exists&&(P(),j());else{const{isSavingPost:e}=M;let t=0;const n=setInterval((()=>{(!e()||t>=50)&&(location.reload(),clearInterval(n))}),100)}})))})),b((()=>{let e;document.addEventListener("cerberusListenerEvent",(t=>{var n;null!=t&&null!==(n=t.detail)&&void 0!==n&&n.hasChange&&(e||(e=document.querySelector(".editor-post-publish-button"),e.addEventListener("click",(()=>{m(!1),e.setAttribute("disabled",!0)}))),e&&(m(!0),e.removeAttribute("disabled")))}))}));const P=()=>{let e;const t=wp.data.subscribe(_.debounce((()=>{e||(e=document.querySelector(".editor-post-publish-button"));const n=M.isEditedPostDirty(),r=M.hasNonPostEntityChanges(),o=v();r||n||o?(p(!0),e.addEventListener("click",T),e.removeAttribute("disabled"),t()):(p(!1),e.removeEventListener("click",T),e.setAttribute("disabled",!0))}),100))},T=()=>{e.requireApproval&&Lt.options.requireApproval&&!Lt.options.userHasPublicationRights&&Ht()},N=()=>{let e,t=!1;A.setAttribute("disabled",!0);let n=()=>{t||clearInterval(e)},r=()=>{t||(e=o())};const o=()=>setInterval((()=>{var o,i;null!==(o=window)&&void 0!==o&&null!==(i=o.wpNavMenu)&&void 0!==i&&i.menusChanged&&(t=!0,D(),clearInterval(e),window.removeEventListener("blur",n),window.removeEventListener("focus",r))}),500);e=o(),window.addEventListener("blur",n),window.addEventListener("focus",r)},D=()=>{A.removeAttribute("disabled"),g(!0)},j=async(t=!0)=>{t&&(o(!0),await new Promise((e=>setTimeout(e,1e3))));try{var r;const t=await Ze("check_sync",{...C,api_path:C.permalink});if(null==t||null===(r=t.data)||void 0===r||!r.resourceStatus)throw C;n({draft:t.data.resourceStatus.find((e=>"draft"===e.target&&"__original"===e.comparedTo)),live:t.data.resourceStatus.find((e=>"live"===e.target&&"draft"===e.comparedTo)),state:"loaded"}),S(!1),e.requireApproval&&Rt(),e.metaMenu&&q()}catch(e){console.log("--- meta-box --- Can't find any data with check-sync of payload: ",e),S(!0),o(!1),n({state:"error"})}o(!1)},q=async()=>{var e;const n=document.querySelectorAll(".menu-theme-locations > .menu-settings-input"),r=document.querySelector(".menu-settings-group.menu-theme-locations"),o=document.createElement("i");o.classList.add("changes-disabled-message");const i=null===(e=t.draft)||void 0===e?void 0:e.exists,l=t.live&&t.live.exists;!i||l?(r.style.pointerEvents="none",r.style.cursor="not-allowed",r.style.opacity=.5):(r.style.pointerEvents="auto",r.style.cursor="default",r.style.opacity=1);const a=document.querySelector(".changes-disabled-message");if(l){const e="Menu must be unpublished before toggling location";a?a.innerHTML=e:(o.innerHTML=e,r.prepend(o))}else{const e="Menu must be created before toggling location";i?a&&a.parentNode.removeChild(a):a?a.innerHTML=e:(o.innerHTML=e,r.prepend(o))}let s=!1,c=!1;for(let e of n){const t=e.querySelector("input");t.addEventListener("change",(()=>{d(!0),D()}));e.querySelector(".theme-location-set")&&(t.setAttribute("disabled",!0),e.style.pointerEvents="none",e.style.opacity=.5,c=!0),t.getAttribute("checked")&&(s=!0)}if(c&&!l&&i){const e=document.querySelector(".changes-disabled-message"),t="Some locations cannot be set because they are already set";e?e.innerHTML=t:(o.innerHTML=t,r.prepend(o))}if(location.search.includes("menu=0"))return;w(!0);const u=document.querySelector(".submitdelete.deletion.menu-delete");let p=document.querySelector(".delete-link-replacement");s||l?(u.style.display="none",p?p.style.display="inline":(p=document.createElement("span"),p.classList.add("delete-link-replacement"),p.innerHTML="To delete a menu it must be unpublished (and unregisterered from all display locations)",p.style.color="#a7aaad",p.style.fontSize="12px"),u.parentNode.prepend(p)):(u.style.display="inline",p&&(p.style.display="none"))},E=(e={})=>{if(document){const t=new CustomEvent("cerberusChangeEvent",{detail:e});document.dispatchEvent(t)}},L=async e=>{e.preventDefault(),e.stopPropagation(),l(!0);(await Ze("publish_to_live",C)).data?j(!1):n({state:"error"}),await new Promise((e=>setTimeout(e,1e3))),l(!1),Ht(),E({action:"publish_to_live_done"})},$=async e=>{e.preventDefault(),e.stopPropagation(),s(!0);(await Ze("unpublish_from_live",C)).data?j(!1):n({state:"error"}),await new Promise((e=>setTimeout(e,1e3))),s(!1),E({action:"unpublish_from_live_done"})};b((()=>{$t({changesNotSavedToDraft:z()})})),b((()=>{$t({publishing:i()})})),b((()=>{$t({publishing:i()})}));const z=()=>u()||h()||v();return K(Nt,{get horizontal(){return e.metaMenu},get box(){return e.optionsMeta},get children(){return[K(W,{get when(){return r()},get children(){return K(qt,{get horizontal(){return e.metaMenu},get children(){return[K(ht,{get size(){return e.metaMenu?"small":"large"}}),K(Et,{children:"Checking content in draft and live"})]}})}}),K(W,{get when(){return!r()},get children(){return[K(W,{get when(){return k()},get children(){return K(qt,{get horizontal(){return e.metaMenu},get children(){return K(Et,{children:"Content must be saved before publishing"})}})}}),K(W,{get when(){var e;return!c()&&(null===(e=t.draft)||void 0===e?void 0:e.exists)},get children(){return[K(W,{get when(){return e.requireApproval},get children(){return K(It,{})}}),K(W,{get when(){return!e.requireApproval},get children(){return K(Et,{get horizontal(){return e.metaMenu},children:"Publish content"})}}),K(W,{get when(){var e;return!(null!==(e=t.live)&&void 0!==e&&e.exists)},get children(){return[oe((()=>e.requireApproval?K(Ut,{}):K(vt,{get leftMargin(){return e.metaMenu},get loading(){return i()},onClick:e=>L(e),get disabled(){return z()},get children(){return z()?"Save draft before publishing to live":"Publish to live site"}}))),K(vt,{get leftMargin(){return e.metaMenu},disabled:!0,children:"Content not published"}),K(Ft,{})]}}),K(W,{get when(){var e;return null===(e=t.live)||void 0===e?void 0:e.exists},get children(){return[oe((()=>e.requireApproval?K(Kt,{}):K(vt,{get leftMargin(){return e.metaMenu},get loading(){return i()},onClick:e=>L(e),get disabled(){var e;return(null===(e=t.live)||void 0===e?void 0:e.synced)||z()},get children(){var e;return z()?"Save draft before updating on live":null!==(e=t.live)&&void 0!==e&&e.synced?"Updated on live site":"Update on live site"}}))),K(vt,{get leftMargin(){return e.metaMenu},get loading(){return a()},onClick:e=>$(e),get disabled(){return v()},children:"Unpublish"}),K(Ft,{})]}})]}}),K(W,{get when(){return e.metaMenu},get children(){return K(qt,{get horizontal(){return e.metaMenu},get children(){return[K(W,{get when(){return!y()},get children(){return K(Et,{children:"Enter a 'Menu Name' above to create a new menu"})}}),(()=>{const e=oe((()=>{var e;return!(c()||null!==(e=t.draft)&&void 0!==e&&e.exists)}),!0);return K(W,{get when(){return e()&&y()},get children(){return K(Et,{children:"Save menu with menu items in order to publish"})}})})(),K(W,{get when(){return c()},get children(){return K(Et,{children:"Save the changes before publishing"})}})]}})}})]}}),K(W,{get when(){return e.enableTestContent},get children(){return K(vt,{get leftMargin(){return e.metaMenu},get loading(){return a()},onClick:e=>$(e),get disabled(){var e;return!(null!==(e=t.test)&&void 0!==e&&e.synced)},get children(){return t.test&&t.test.synced?"Unpublish from test target":"Publish to test target"}})}}),K(W,{get when(){return e.enableDiffButton},get children(){return K(vt,{get leftMargin(){return e.metaMenu},children:"Show diff (raw)"})}}),K(W,{get when(){return Lt.errorMessage},get children(){return K(Dt,{get children(){return Lt.errorMessage}})}})]}})},Qt=Ve("input")`
`,Yt=Ve("div")`
    display: flex;
    flex-direction: column;
    width: 100%;
    padding-right: 10px;
    box-sizing: border-box;
`,Vt=Ve("label")`
    padding: 5px 5px 0px 5px;
    font-size: 10px;
    height: 18px;
`,Wt=({placeholder:e="",label:t=" ",value:n,onChange:r=(()=>{})})=>{const o=e=>{r(e.target.value)};return K(Yt,{get children(){return[K(Vt,{children:t}),K(Qt,{type:"text",get value(){return n()},placeholder:e,onKeyup:o})]}})},Xt=Ve("select")`
    max-width: 100% !important;
`,Gt=Ve("div")`
    display: flex;
    flex-direction: column;
    width: 100%;
    padding-left: 10px;
    box-sizing: border-box;
`,Zt=Ve("label")`
    padding: 5px 5px 0px 5px;
    font-size: 10px;
    height: 18px;
`,en=se("<option></option>"),tn=({options:e=[],placeholder:t="",label:n=" ",value:r,onChange:o=(()=>{})})=>{const i=e=>{console.log(e),o(e.target.value)};return K(Gt,{get children(){return[K(Zt,{children:n}),K(Xt,{get value(){return r()},placeholder:t,onChange:i,get children(){return K(V,{each:e,children:e=>(()=>{const t=en.cloneNode(!0);return fe(t,(()=>e.label)),v((n=>{const o=e.value,i=e.value===r();return o!==n._v$&&(t.value=n._v$=o),i!==n._v$2&&(t.selected=n._v$2=i),n}),{_v$:void 0,_v$2:void 0}),t})()})}})]}})},nn={open:Qe`
    0% {
        max-height: 0;
    }
    100% {
        max-height: 300px;
    }
`,close:Qe`
    0% {
        max-height: 300px;
    }
    100% {
        max-height: 0;
    }
`,init:Qe`
    0% {
        max-height: 0;
    }
    100% {
        max-height: 0;
    }
`},rn=Ve("div")`
     color: black;
     max-width: 1200px;
     margin: 0 auto;
`;Ve("div")`
`,Ve("div")`
    font-size: 1rem;
    padding: 1rem 0;
`;const on=Ve("div")`
    display: flex;
    justify-content: flex-end;
`,ln=Ve("div")`
    max-height: 0px;
    overflow: hidden;
    ${e=>`animation: ${nn[e.state]} .4s ease-in-out forwards;`}
`,an=Ve("div")`
    background-color: #fff;
    border: 1px solid #aaa;
    border-radius: 3px;
    margin-top: 20px;
    padding: 20px;
`,sn=Ve("div")`
    width: 100%;
    display: flex;
    padding-bottom: 10px;
`,cn=Ve("div")`
    width: 100%;
    display: flex;
    justify-content: flex-end;
`,dn=Ve("div")`
    color red;
`,un=Ve("div")`
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
`,pn=Ve("table")`
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
`,hn=Ve("td")`
    display: flex;
    justify-content: flex-end;
`,gn=se("<thead><tr><th>Domain</th><th>Distribution ID</th><th>Target</th><th>SiteId</th><th></th></tr></thead>"),fn=se("<tbody></tbody>"),vn=se("<tr><td></td><td></td><td></td><td></td></tr>"),bn=[{value:"draft",label:"Draft"},{value:"live",label:"Live"},{value:"test",label:"Test"}];const mn=({options:e})=>{const[t,n]=Ee({list:[]}),[r,o]=f(""),[i,l]=f(""),[a,s]=f("draft"),[c,d]=f("init"),[u,p]=f(""),[h,g]=f(!1),v=async()=>{const t=await et(`${e.api}/get-domain-settings.php`);n("list",t)},m=async(t=function(e){for(var t="",n="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",r=n.length,o=0;o<e;o++)t+=n.charAt(Math.floor(Math.random()*r));return t}(20))=>{try{if(p(""),h())return;g(!0),await et(`${e.api}/upsert-domain-setting.php`,{domain:r(),target:a(),id:t,cloudfrontDistributionId:i()}),await v(),s("draft"),o(""),l(""),g(!1),d("close")}catch(e){console.log("ee",e),"domain-already-exists"===e.error?p("Domain already exists"):p("Something caused an error"),g(!1)}},y=(e,t)=>{"domain"===e&&o(t),"target"===e&&s(t),"cloudfrontDistributionId"===e&&l(t)};return b((()=>{v()})),K(rn,{get children(){return[K(at,{children:"Domain Settings"}),K(lt,{children:"This is the list of domains and targets that will be used for this site. You can add as many as you need but the domains need to be pointed to the server to make it work."}),K(on,{get children(){return K(vt,{onClick:()=>d("open"),children:"Add new domain and target"})}}),K(ln,{get state(){return c()},get children(){return K(an,{get children(){return[K(ct,{children:"Add new domain and target"}),K(sn,{get children(){return[K(Wt,{placeholder:"domain",label:"Domain:",value:r,onChange:e=>y("domain",e)}),K(Wt,{placeholder:"distribution id",label:"Cloudfront Distribution ID:",value:i,onChange:e=>y("cloudfrontDistributionId",e)}),K(tn,{options:bn,value:a,onChange:e=>y("target",e)})]}}),K(W,{when:u,get children(){return K(dn,{children:u})}}),K(cn,{get children(){return[K(vt,{onClick:()=>d("close"),children:"Cancel"}),K(vt,{get loading(){return h()},leftMargin:!0,get disabled(){return!r()||!a()},onClick:()=>m(),children:"Save"})]}})]}})}}),K(pn,{get children(){return[gn.cloneNode(!0),(()=>{const n=fn.cloneNode(!0);return fe(n,K(V,{get each(){return t.list},children:t=>(()=>{const n=vn.cloneNode(!0),r=n.firstChild,o=r.nextSibling,i=o.nextSibling,l=i.nextSibling;return fe(r,(()=>t.content.domain)),fe(o,(()=>t.content.cloudfrontDistributionId)),fe(i,(()=>t.content.target)),fe(l,(()=>t.content.siteId)),fe(n,K(hn,{get children(){return K(un,{onClick:()=>(async t=>{try{await et(`${e.api}/delete-domain-setting.php`,{id:t}),await v()}catch(e){console.log(e)}})(t.externalId),children:"delete"})}}),null),n})()})),n})()]}})]}})},yn=se("<em></em>"),wn=Ve("div")`
    text-transform: uppercase;
    font-size: 13px;
    margin-right: 0.5rem;
    background-color: rgba(0,0,0,0.1);
    padding: 0.2rem 0.35rem;
    min-width: 50px;
    display: flex;
    justify-content: center;
`,xn=Ve("a")`
    ${e=>e.href?"":"color: black;"}
    font-weight: bold;
    text-transform: capitalize;
    text-decoration: none;
`,kn=Ve("p")`
    margin: 0;
    font-size: inherit;
    color: gray;
`,Sn=Ve("div")`
    margin-top: 0.8rem;
    display: flex;
    align-items: center;
    font-size: 15px;
`,Cn=e=>K(Sn,{get key(){return e.item.post_id},get children(){return[K(wn,{get children(){return e.item.type}}),K(kn,{get children(){return[K(xn,{get href(){return e.item.editorUrl},target:"_blank",get children(){return e.item.post_title}}),", requested by ",(()=>{const t=yn.cloneNode(!0);return fe(t,(()=>e.item.from_user_name)),t})()," (",oe((()=>(()=>{const t=new Date(e.item.updated_on);return t.getFullYear()+"-"+(t.getMonth()+1).toString().padStart(2,"0")+"-"+t.getDate().toString().padStart(2,"0")+", "+t.getHours().toString().padStart(2,"0")+":"+t.getMinutes().toString().padStart(2,"0")})())),")"]}})]}}),Mn=se("<span></span>"),An=se("<div></div>"),Pn=Ve("div")`
    margin-bottom: 3rem;
`,_n=Ve("div")`
    margin-top: 1rem;
    margin-bottom: 2rem;
`,Tn=Ve("p")`
    font-size: 15px;
`,Nn=({options:e})=>{const[t,n]=f([]),[r,o]=f([]),[i,l]=f([]),[a,s]=f(!1),[c,d]=f("");x((()=>{s(!0),u()}));const u=async()=>{try{var t;const n=await et(`${e.api}/get-publication-requests.php`);p(null==n||null===(t=n.data)||void 0===t?void 0:t.resources)}catch(e){console.log("Error fetching all publication requests",e),d("Error fetching all publication requests")}},p=(e=[])=>{const t={pending:{},approved:{},rejected:{}},r=e.sort(((e,t)=>new Date(t.content.updated_on)-new Date(e.content.updated_on)));r.forEach((e=>{const n=e.content.status,r=h(e.content["wp-domain"]),o=e.content.from_site_name+" - "+r;t[n][o]||(t[n][o]=[]),t[n][o].push(e.content)})),n(t.approved),l(t.rejected),o(t.pending),s(!1)},h=e=>{const t=e.indexOf("://");return e.slice(t+3)},g=({title:e,siteRequests:t})=>{const n=Object.keys(t);return K(Pn,{get children(){return[K(ct,{children:e}),K(W,{get when(){return 0!==n.length},get fallback(){return K(kn,{children:"None to show"})},get children(){return K(V,{each:n,children:e=>K(_n,{get children(){return[K(Tn,{children:e}),K(V,{get each(){return t[e]},children:e=>K(Cn,{item:e})})]}})})}})]}})};return(()=>{const e=An.cloneNode(!0);return fe(e,K(at,{children:"Publication requests"}),null),fe(e,(()=>{const e=oe((()=>!!a()),!0);return K(W,{get when(){return e()&&!c()},get children(){return K(kn,{children:"Loading..."})}})})(),null),fe(e,(()=>{const e=oe((()=>!a()),!0);return K(W,{get when(){return e()&&!c()},get children(){return[oe((()=>g({title:"Pending",siteRequests:r()}))),oe((()=>g({title:"Approved",siteRequests:t()}))),oe((()=>g({title:"Rejected",siteRequests:i()})))]}})})(),null),fe(e,K(W,{get when(){return c()},get children(){const e=Mn.cloneNode(!0);return fe(e,c),e}}),null),e})()},Dn=e=>{try{return JSON.parse(document.getElementById(e).innerHTML)}catch(e){return console.log("Error in getData",e),{}}},jn=()=>{let e=document.getElementById("dls-metabox-root");if(e){const t=Dn("dls-data");t.metaMenu="nav-menu"===e.getAttribute("data-type"),t.metaMenu&&(e=document.createElement("div"),e&&document.querySelector("#nav-menu-footer").prepend(e)),ae((()=>K(Jt,{options:t})),e)}};jQuery(document).ready((function(e){wp&&wp.data&&wp.data.dispatch&&wp.data.dispatch("core/editor").disablePublishSidebar(),(()=>{if(wp.data){let e=!1,t=!1;wp.data.subscribe((()=>{const n=wp.data.select("core/editor").isSavingPost(),r=wp.data.select("core/editor").isSavingNonPostEntityChanges&&wp.data.select("core/editor").isSavingNonPostEntityChanges();e!==n?(e=n,wp.data.select("core/editor").didPostSaveRequestSucceed()&&wp.hooks.doAction("dls.post-saved")):t!==r&&(t=r,wp.data.select("core/editor").didPostSaveRequestSucceed()&&wp.hooks.doAction("dls.post-saved"))}))}})();let t={};try{t=e("#dls-hooks").length>0?JSON.parse(e("#dls-hooks").html()):{hook:""}}catch(e){}console.log("Current hook",t&&t.hook),"post.php"===t.hook||"post-new.php"===t.hook||"nav-menus.php"===t.hook?jn():t.hook.includes("toplevel_page_draft-live-sync")?(()=>{const e=Dn("dls-data");ae((()=>K($e,{values:e,get children(){return K(Tt,{})}})),document.getElementById("dls-root"))})():t.hook.includes("toplevel_page_cerberus-domain-settings")?(()=>{const e=document.getElementById("dls-domain-settings-root"),t=Dn("dls-data");ae((()=>K(mn,{options:t})),e)})():t.hook.includes("toplevel_page_publication-approval")?(()=>{const e=document.getElementById("dls-publication-approval-root"),t=Dn("dls-data");ae((()=>K(Nn,{options:t})),e)})():t.hook.includes(".php")||jn()}))}();
//# sourceMappingURL=draft-live-sync-boot-0.15.2-atos.js.map
