!function(){"use strict";const e=Symbol("solid-proxy"),t={equals:(e,t)=>e===t};let n=T;const r={},o={owned:null,cleanups:null,context:null,owner:null};var i=null;let l=null,a=null,s=null,c=null,d=null,u=0;function p(e,t){t&&(i=t);const n=a,r=i,l=0===e.length?o:{owned:null,cleanups:null,context:null,owner:r};let s;i=l,a=null;try{N((()=>s=e((()=>R(l)))),!0)}finally{a=n,i=r}return s}function g(e,n){n=n?Object.assign({},t,n):t;const o={value:e,observers:null,observerSlots:null,pending:r,comparator:n.equals||void 0};return[C.bind(o),e=>("function"==typeof e&&(e=e(o.pending!==r?o.pending:o.value)),j(o,e))]}function h(e,t,n){M(A(e,t,!1))}function f(e,t,r){n=D;const o=A(e,t,!1);o.user=!0,d&&d.push(o)}function v(e,n,o){o=o?Object.assign({},t,o):t;const i=A(e,n,!0);return i.pending=r,i.observers=null,i.observerSlots=null,i.state=0,i.comparator=o.equals||void 0,M(i),C.bind(i)}function b(e){if(s)return e();let t;const n=s=[];try{t=e()}finally{s=null}return N((()=>{for(let e=0;e<n.length;e+=1){const t=n[e];if(t.pending!==r){const e=t.pending;t.pending=r,j(t,e)}}}),!1),t}function m(e){let t,n=a;return a=null,t=e(),a=n,t}function y(e){f((()=>m(e)))}function w(){return a}function x(e){const t=Symbol("context");return{id:t,Provider:O(t),defaultValue:e}}function k(e){return $(i,e.id)||e.defaultValue}function S(e){const t=v(e);return v((()=>z(t())))}function C(){if(this.state&&this.sources){const e=c;c=null,1===this.state?M(this):q(this),c=e}if(a){const e=this.observers?this.observers.length:0;a.sources?(a.sources.push(this),a.sourceSlots.push(e)):(a.sources=[this],a.sourceSlots=[e]),this.observers?(this.observers.push(a),this.observerSlots.push(a.sources.length-1)):(this.observers=[a],this.observerSlots=[a.sources.length-1])}return this.value}function j(e,t,n){return e.comparator&&e.comparator(e.value,t)?t:s?(e.pending===r&&s.push(e),e.pending=t,t):(e.value=t,!e.observers||c&&!e.observers.length||N((()=>{for(let t=0;t<e.observers.length;t+=1){const n=e.observers[t];l,n.observers&&2!==n.state&&E(n),n.state=1,n.pure?c.push(n):d.push(n)}if(c.length>1e6)throw c=[],new Error}),!1),t)}function M(e){if(!e.fn)return;R(e);const t=i,n=a,r=u;a=i=e,function(e,t,n){let r;try{r=e.fn(t)}catch(e){L(e)}(!e.updatedAt||e.updatedAt<=n)&&(e.observers&&e.observers.length?j(e,r):e.value=r,e.updatedAt=n)}(e,e.value,r),a=n,i=t}function A(e,t,n,r){const l={fn:e,state:1,updatedAt:null,owned:null,sources:null,sourceSlots:null,cleanups:null,value:t,owner:i,context:null,pure:n};return null===i||i!==o&&(i.owned?i.owned.push(l):i.owned=[l]),l}function P(e){let t,n=1===e.state&&e;if(e.suspense&&m(e.suspense.inFallback))return e.suspense.effects.push(e);for(;e=e.owner;)2===e.state?t=e:1===e.state&&(n=e,t=void 0);if(t){const e=c;if(c=null,q(t),c=e,!n||1!==n.state)return}n&&M(n)}function N(e,t){if(c)return e();let r=!1;t||(c=[]),d?r=!0:d=[],u++;try{e()}catch(e){L(e)}finally{!function(e){c&&(T(c),c=null);if(e)return;d.length?b((()=>{n(d),d=null})):d=null}(r)}}function T(e){for(let t=0;t<e.length;t++)P(e[t])}function D(e){let t,n=0;for(t=0;t<e.length;t++){const r=e[t];r.user?e[n++]=r:P(r)}const r=e.length;for(t=0;t<n;t++)P(e[t]);for(t=r;t<e.length;t++)P(e[t])}function q(e){e.state=0;for(let t=0;t<e.sources.length;t+=1){const n=e.sources[t];n.sources&&(1===n.state?P(n):2===n.state&&q(n))}}function E(e){for(let t=0;t<e.observers.length;t+=1){const n=e.observers[t];n.state||(n.state=2,n.observers&&E(n))}}function R(e){let t;if(e.sources)for(;e.sources.length;){const t=e.sources.pop(),n=e.sourceSlots.pop(),r=t.observers;if(r&&r.length){const e=r.pop(),o=t.observerSlots.pop();n<r.length&&(e.sourceSlots[o]=n,r[n]=e,t.observerSlots[n]=o)}}if(e.owned){for(t=0;t<e.owned.length;t++)R(e.owned[t]);e.owned=null}if(e.cleanups){for(t=0;t<e.cleanups.length;t++)e.cleanups[t]();e.cleanups=null}e.state=0,e.context=null}function L(e){throw e}function $(e,t){return e&&(e.context&&e.context[t]||e.owner&&$(e.owner,t))}function z(e){if("function"==typeof e&&!e.length)return z(e());if(Array.isArray(e)){const t=[];for(let n=0;n<e.length;n++){const r=z(e[n]);Array.isArray(r)?t.push.apply(t,r):t.push(r)}return t}return e}function O(e){return function(t){let n;var r;return M(A((()=>n=m((()=>(i.context={[e]:t.value},S((()=>t.children)))))),r,!0)),n}}const B=Symbol("fallback");function H(e){for(let t=0;t<e.length;t++)e[t]()}function I(e,t,n={}){let r=[],o=[],l=[],a=0,s=t.length>1?[]:null;var c;return c=()=>H(l),null===i||(null===i.cleanups?i.cleanups=[c]:i.cleanups.push(c)),()=>{let i,c,d=e()||[];return m((()=>{let e,t,g,h,f,v,b,m,y,w=d.length;if(0===w)0!==a&&(H(l),l=[],r=[],o=[],a=0,s&&(s=[])),n.fallback&&(r=[B],o[0]=p((e=>(l[0]=e,n.fallback()))),a=1);else if(0===a){for(o=new Array(w),c=0;c<w;c++)r[c]=d[c],o[c]=p(u);a=w}else{for(g=new Array(w),h=new Array(w),s&&(f=new Array(w)),v=0,b=Math.min(a,w);v<b&&r[v]===d[v];v++);for(b=a-1,m=w-1;b>=v&&m>=v&&r[b]===d[m];b--,m--)g[m]=o[b],h[m]=l[b],s&&(f[m]=s[b]);for(e=new Map,t=new Array(m+1),c=m;c>=v;c--)y=d[c],i=e.get(y),t[c]=void 0===i?-1:i,e.set(y,c);for(i=v;i<=b;i++)y=r[i],c=e.get(y),void 0!==c&&-1!==c?(g[c]=o[i],h[c]=l[i],s&&(f[c]=s[i]),c=t[c],e.set(y,c)):l[i]();for(c=v;c<w;c++)c in g?(o[c]=g[c],l[c]=h[c],s&&(s[c]=f[c],s[c](c))):o[c]=p(u);o=o.slice(0,a=w),r=d.slice(0)}return o}));function u(e){if(l[c]=e,s){const[e,n]=g(c);return s[c]=n,t(d[c],e)}return t(d[c])}}}function U(e,t){return m((()=>e(t)))}function F(){return!0}const K={get:(t,n,r)=>n===e?r:t.get(n),has:(e,t)=>e.has(t),set:F,deleteProperty:F,getOwnPropertyDescriptor:(e,t)=>({configurable:!0,enumerable:!0,get:()=>e.get(t),set:F,deleteProperty:F}),ownKeys:e=>e.keys()};function J(...e){return new Proxy({get(t){for(let n=e.length-1;n>=0;n--){const r=e[n][t];if(void 0!==r)return r}},has(t){for(let n=e.length-1;n>=0;n--)if(t in e[n])return!0;return!1},keys(){const t=[];for(let n=0;n<e.length;n++)t.push(...Object.keys(e[n]));return[...new Set(t)]}},K)}function Q(e){const t="fallback"in e&&{fallback:()=>e.fallback};return v(I((()=>e.each),e.children,t||void 0))}function Y(e){let t=!1;const n=v((()=>e.when),void 0,{equals:(e,n)=>t?e===n:!e==!n});return v((()=>{const r=n();if(r){const n=e.children;return(t="function"==typeof n&&n.length>0)?m((()=>n(r))):n}return e.fallback}))}function V(e){let t=!1;const n=S((()=>e.children)),r=v((()=>{let e=n();Array.isArray(e)||(e=[e]);for(let t=0;t<e.length;t++){const n=e[t].when;if(n)return[t,n,e[t]]}return[-1]}),void 0,{equals:(e,n)=>e&&e[0]===n[0]&&(t?e[1]===n[1]:!e[1]==!n[1])&&e[2]===n[2]});return v((()=>{const[n,o,i]=r();if(n<0)return e.fallback;const l=i.children;return(t="function"==typeof l&&l.length>0)?m((()=>l(o))):l}))}function W(e){return e}const X=new Set(["className","indeterminate","value","allowfullscreen","allowpaymentrequest","async","autofocus","autoplay","checked","controls","default","disabled","formnovalidate","hidden","ismap","itemscope","loop","multiple","muted","nomodule","novalidate","open","playsinline","readonly","required","reversed","seamless","selected","truespeed"]),G=new Set(["innerHTML","textContent","innerText","children"]),Z={className:"class",htmlFor:"for"},ee=new Set(["beforeinput","click","dblclick","focusin","focusout","input","keydown","keyup","mousedown","mousemove","mouseout","mouseover","mouseup","pointerdown","pointermove","pointerout","pointerover","pointerup","touchend","touchmove","touchstart"]),te={xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace"};function ne(e,t){return v(e,void 0,t?void 0:{equals:t})}function re(e,t,n){let r=n.length,o=t.length,i=r,l=0,a=0,s=t[o-1].nextSibling,c=null;for(;l<o||a<i;)if(t[l]!==n[a]){for(;t[o-1]===n[i-1];)o--,i--;if(o===l){const t=i<r?a?n[a-1].nextSibling:n[i-a]:s;for(;a<i;)e.insertBefore(n[a++],t)}else if(i===a)for(;l<o;)c&&c.has(t[l])||e.removeChild(t[l]),l++;else if(t[l]===n[i-1]&&n[a]===t[o-1]){const r=t[--o].nextSibling;e.insertBefore(n[a++],t[l++].nextSibling),e.insertBefore(n[--i],r),t[o]=n[i]}else{if(!c){c=new Map;let e=a;for(;e<i;)c.set(n[e],e++)}const r=c.get(t[l]);if(null!=r)if(a<r&&r<i){let s,d=l,u=1;for(;++d<o&&d<i&&null!=(s=c.get(t[d]))&&s===r+u;)u++;if(u>r-a){const o=t[l];for(;a<r;)e.insertBefore(n[a++],o)}else e.replaceChild(n[a++],t[l++])}else l++;else e.removeChild(t[l++])}}else l++,a++}const oe="_$DX_DELEGATE";function ie(e,t,n){let r;return p((o=>{r=o,ge(t,e(),t.firstChild?null:void 0,n)})),()=>{r(),t.textContent=""}}function le(e,t,n){const r=document.createElement("template");r.innerHTML=e;let o=r.content.firstChild;return n&&(o=o.firstChild),o}function ae(e,t=window.document){const n=t[oe]||(t[oe]=new Set);for(let r=0,o=e.length;r<o;r++){const o=e[r];n.has(o)||(n.add(o),t.addEventListener(o,fe))}}function se(e,t,n){null==n?e.removeAttribute(t):e.setAttribute(t,n)}function ce(e,t,n,r){null==r?e.removeAttributeNS(t,n):e.setAttributeNS(t,n,r)}function de(e,t,n,r){r?Array.isArray(n)?(e[`$$${t}`]=n[0],e[`$$${t}Data`]=n[1]):e[`$$${t}`]=n:Array.isArray(n)?e.addEventListener(t,(e=>n[0](n[1],e))):e.addEventListener(t,n)}function ue(e,t,n={}){const r=Object.keys(t),o=Object.keys(n);let i,l;for(i=0,l=o.length;i<l;i++){const r=o[i];r&&"undefined"!==r&&!(r in t)&&(he(e,r,!1),delete n[r])}for(i=0,l=r.length;i<l;i++){const o=r[i],l=!!t[o];o&&"undefined"!==o&&n[o]!==l&&(he(e,o,l),n[o]=l)}return n}function pe(e,t,n={}){const r=e.style;if("string"==typeof t)return r.cssText=t;let o,i;for(i in"string"==typeof n&&(n={}),n)null==t[i]&&r.removeProperty(i),delete n[i];for(i in t)o=t[i],o!==n[i]&&(r.setProperty(i,o),n[i]=o);return n}function ge(e,t,n,r){if(void 0===n||r||(r=[]),"function"!=typeof t)return be(e,t,r,n);h((r=>be(e,t(),r,n)),r)}function he(e,t,n){const r=t.split(/\s+/);for(let t=0,o=r.length;t<o;t++)e.classList.toggle(r[t],n)}function fe(e){const t=`$$${e.type}`;let n=e.composedPath&&e.composedPath()[0]||e.target;for(e.target!==n&&Object.defineProperty(e,"target",{configurable:!0,value:n}),Object.defineProperty(e,"currentTarget",{configurable:!0,get:()=>n});null!==n;){const r=n[t];if(r&&!n.disabled){const o=n[`${t}Data`];if(void 0!==o?r(o,e):r(e),e.cancelBubble)return}n=n.host&&n.host!==n&&n.host instanceof Node?n.host:n.parentNode}}function ve(e,t,n={},r,o){return!o&&"children"in t&&h((()=>n.children=be(e,t.children,n.children))),h((()=>function(e,t,n,r,o={}){let i,l,a;for(const c in t){if("children"===c){r||be(e,t.children);continue}const d=t[c];if(d!==o[c]){if("style"===c)pe(e,d,o[c]);else if("class"!==c||n)if("classList"===c)ue(e,d,o[c]);else if("ref"===c)d(e);else if("on:"===c.slice(0,3))e.addEventListener(c.slice(3),d);else if("oncapture:"===c.slice(0,10))e.addEventListener(c.slice(10),d,!0);else if("on"===c.slice(0,2)){const t=c.slice(2).toLowerCase(),n=ee.has(t);de(e,t,d,n),n&&ae([t])}else if((a=G.has(c))||!n&&(l=X.has(c))||(i=e.nodeName.includes("-")))!i||l||a?e[c]=d:e[(s=c,s.toLowerCase().replace(/-([a-z])/g,((e,t)=>t.toUpperCase())))]=d;else{const t=n&&c.indexOf(":")>-1&&te[c.split(":")[0]];t?ce(e,t,c,d):se(e,Z[c]||c,d)}else e.className=d;o[c]=d}}var s}(e,t,r,!0,n))),n}function be(e,t,n,r,o){for(;"function"==typeof n;)n=n();if(t===n)return n;const i=typeof t,l=void 0!==r;if(e=l&&n[0]&&n[0].parentNode||e,"string"===i||"number"===i)if("number"===i&&(t=t.toString()),l){let o=n[0];o&&3===o.nodeType?o.data=t:o=document.createTextNode(t),n=we(e,n,r,o)}else n=""!==n&&"string"==typeof n?e.firstChild.data=t:e.textContent=t;else if(null==t||"boolean"===i)n=we(e,n,r);else{if("function"===i)return h((()=>{let o=t();for(;"function"==typeof o;)o=o();n=be(e,o,n,r)})),()=>n;if(Array.isArray(t)){const i=[];if(me(i,t,o))return h((()=>n=be(e,i,n,r,!0))),()=>n;if(0===i.length){if(n=we(e,n,r),l)return n}else Array.isArray(n)?0===n.length?ye(e,i,r):re(e,n,i):null==n||""===n?ye(e,i):re(e,l&&n||[e.firstChild],i);n=i}else if(t instanceof Node){if(Array.isArray(n)){if(l)return n=we(e,n,r,t);we(e,n,null,t)}else null!=n&&""!==n&&e.firstChild?e.replaceChild(t,e.firstChild):e.appendChild(t);n=t}}return n}function me(e,t,n){let r=!1;for(let o=0,i=t.length;o<i;o++){let i,l=t[o];if(l instanceof Node)e.push(l);else if(null==l||!0===l||!1===l);else if(Array.isArray(l))r=me(e,l)||r;else if("string"==(i=typeof l))e.push(document.createTextNode(l));else if("function"===i)if(n){for(;"function"==typeof l;)l=l();r=me(e,Array.isArray(l)?l:[l])||r}else e.push(l),r=!0;else e.push(document.createTextNode(l.toString()))}return r}function ye(e,t,n){for(let r=0,o=t.length;r<o;r++)e.insertBefore(t[r],n)}function we(e,t,n,r){if(void 0===n)return e.textContent="";const o=r||document.createTextNode("");if(t.length){let r=!1;for(let i=t.length-1;i>=0;i--){const l=t[i];if(o!==l){const t=l.parentNode===e;r||i?t&&e.removeChild(l):t?e.replaceChild(o,l):e.insertBefore(o,n)}else r=!0}}else e.insertBefore(o,n);return[o]}const xe=Symbol("store-raw"),ke=Symbol("store-node"),Se=Symbol("store-name");function Ce(t,n){let r=t[e];if(!r){Object.defineProperty(t,e,{value:r=new Proxy(t,Ne)});const n=Object.keys(t),o=Object.getOwnPropertyDescriptors(t);for(let e=0,i=n.length;e<i;e++){const i=n[e];if(o[i].get){const e=o[i].get.bind(r);Object.defineProperty(t,i,{get:e})}}}return r}function je(e){return null!=e&&"object"==typeof e&&(!e.__proto__||e.__proto__===Object.prototype||Array.isArray(e))}function Me(e,t=new Set){let n,r,o,i;if(n=null!=e&&e[xe])return n;if(!je(e)||t.has(e))return e;if(Array.isArray(e)){Object.isFrozen(e)?e=e.slice(0):t.add(e);for(let n=0,i=e.length;n<i;n++)o=e[n],(r=Me(o,t))!==o&&(e[n]=r)}else{Object.isFrozen(e)?e=Object.assign({},e):t.add(e);const n=Object.keys(e),l=Object.getOwnPropertyDescriptors(e);for(let a=0,s=n.length;a<s;a++)i=n[a],l[i].get||(o=e[i],(r=Me(o,t))!==o&&(e[i]=r))}return e}function Ae(e){let t=e[ke];return t||Object.defineProperty(e,ke,{value:t={}}),t}function Pe(){const[e,t]=g(void 0,{equals:!1});return e.$=t,e}const Ne={get(t,n,r){if(n===xe)return t;if(n===e)return r;const o=t[n];if(n===ke||"__proto__"===n)return o;const i=je(o);if(w()&&("function"!=typeof o||t.hasOwnProperty(n))){let e,r;i&&(e=Ae(o))&&(r=e._||(e._=Pe()),r()),e=Ae(t),r=e[n]||(e[n]=Pe()),r()}return i?Ce(o):o},set:()=>!0,deleteProperty:()=>!0,ownKeys:function(e){if(w()){const t=Ae(e);(t._||(t._=Pe()))()}return Reflect.ownKeys(e)},getOwnPropertyDescriptor:function(t,n){const r=Reflect.getOwnPropertyDescriptor(t,n);return!r||r.get||n===e||n===ke||n===Se||(delete r.value,delete r.writable,r.get=()=>t[e][n]),r}};function _e(e,t,n){if(e[t]===n)return;const r=Array.isArray(e),o=e.length,i=void 0===n,l=r||i===t in e;i?delete e[t]:e[t]=n;let a,s=Ae(e);(a=s[t])&&a.$(),r&&e.length!==o&&(a=s.length)&&a.$(a,void 0),l&&(a=s._)&&a.$(a,void 0)}function Te(e,t,n=[]){let r,o=e;if(t.length>1){r=t.shift();const i=typeof r,l=Array.isArray(e);if(Array.isArray(r)){for(let o=0;o<r.length;o++)Te(e,[r[o]].concat(t),[r[o]].concat(n));return}if(l&&"function"===i){for(let o=0;o<e.length;o++)r(e[o],o)&&Te(e,[o].concat(t),[o].concat(n));return}if(l&&"object"===i){const{from:o=0,to:i=e.length-1,by:l=1}=r;for(let r=o;r<=i;r+=l)Te(e,[r].concat(t),[r].concat(n));return}if(t.length>1)return void Te(e[r],t,[r].concat(n));o=e[r],n=[r].concat(n)}let i=t[0];"function"==typeof i&&(i=i(o,n),i===o)||void 0===r&&null==i||(i=Me(i),void 0===r||je(o)&&je(i)&&!Array.isArray(i)?function(e,t){const n=Object.keys(t);for(let r=0;r<n.length;r+=1){const o=n[r];_e(e,o,t[o])}}(o,i):_e(e,r,i))}function De(e,t){const n=Me(e||{});return[Ce(n),function(...e){b((()=>Te(n,e)))}]}const qe=x([{path:"start"},{}]);function Ee(e){const t=location.hash.replace(/#/,"")||"start",[n,r]=De({path:t});window.addEventListener("popstate",(e=>{const t=e.target.location.hash.replace(/#/,"");r({...n,path:t})}));const o=[n,{apiUrl:e.values.api}];return U(qe.Provider,{value:o,get children(){return e.children}})}let Re={data:""},Le=e=>"object"==typeof window?((e?e.querySelector("#_goober"):window._goober)||Object.assign((e||document.head).appendChild(document.createElement("style")),{innerHTML:" ",id:"_goober"})).firstChild:e||Re,$e=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(})/g,ze=/\/\*[^]*?\*\/|\s\s+|\n/g,Oe=(e,t)=>{let n,r="",o="",i="";for(let l in e){let a=e[l];"object"==typeof a?(n=t?t.replace(/([^,])+/g,(e=>l.replace(/([^,])+/g,(t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)))):l,o+="@"==l[0]?"f"==l[1]?Oe(a,l):l+"{"+Oe(a,"k"==l[1]?"":t)+"}":Oe(a,n)):"@"==l[0]&&"i"==l[1]?r=l+" "+a+";":(l=l.replace(/[A-Z]/g,"-$&").toLowerCase(),i+=Oe.p?Oe.p(l,a):l+":"+a+";")}return i[0]?(n=t?t+"{"+i+"}":i,r+n+o):r+o},Be={},He=e=>{let t="";for(let n in e)t+=n+("object"==typeof e[n]?He(e[n]):e[n]);return t},Ie=(e,t,n,r,o)=>{let i="object"==typeof e?He(e):e,l=Be[i]||(Be[i]=(e=>{let t=0,n=11;for(;t<e.length;)n=101*n+e.charCodeAt(t++)>>>0;return"go"+n})(i));if(!Be[l]){let t="object"==typeof e?e:(e=>{let t,n=[{}];for(;t=$e.exec(e.replace(ze,""));)t[4]&&n.shift(),t[3]?n.unshift(n[0][t[3]]=n[0][t[3]]||{}):t[4]||(n[0][t[1]]=t[2]);return n[0]})(e);Be[l]=Oe(o?{["@keyframes "+l]:t}:t,n?"":"."+l)}return((e,t,n)=>{-1==t.data.indexOf(e)&&(t.data=n?e+t.data:t.data+e)})(Be[l],t,r),l},Ue=(e,t,n)=>e.reduce(((e,r,o)=>{let i=t[o];if(i&&i.call){let e=i(n),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;i=t?"."+t:e&&"object"==typeof e?e.props?"":Oe(e,""):e}return e+r+(null==i?"":i)}),"");function Fe(e){let t=this||{},n=e.call?e(t.p):e;return Ie(n.unshift?n.raw?Ue(n,[].slice.call(arguments,1),t.p):n.reduce(((e,n)=>n?Object.assign(e,n.call?n(t.p):n):e),{}):n,Le(t.target),t.g,t.o,t.k)}Fe.bind({g:1});let Ke=Fe.bind({k:1});const Je=x();function Qe(e){let t=this||{};return(...n)=>{const r=r=>{const o=J(r,{theme:k(Je)}),i=J(o,{get className(){const e=o.className,r="className"in o&&/^go[0-9]+/.test(e);return[e,Fe.apply({target:t.target,o:r,p:o,g:t.g},n)].filter(Boolean).join(" ")}}),[l,a]=function(e,...t){const n=new Set(t.flat()),r=Object.getOwnPropertyDescriptors(e),o=t.map((t=>{const n={};for(let o=0;o<t.length;o++){const i=t[o];Object.defineProperty(n,i,r[i]?r[i]:{get:()=>e[i]})}return n}));return o.push(new Proxy({get:t=>n.has(t)?void 0:e[t],has:t=>!n.has(t)&&t in e,keys:()=>Object.keys(e).filter((e=>!n.has(e)))},K)),o}(i,["as"]),s=l.as||e;let c;var d,u,p,g;return"function"==typeof s?c=s(a):(c=document.createElement(s),d=c,"function"==typeof(u=a)?h((e=>ve(d,u(),e,p,g))):ve(d,u,void 0,p,g)),c};return r.className=e=>m((()=>Fe.apply({target:t.target,p:e,g:t.g},n))),r}}const Ye=Qe("nav")`
    color: black;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 2rem;
`,Ve=Qe("a")`
    font-size: 14px;
    display: block;
    padding: 0 1rem;
`,We=()=>(k(qe),U(Ye,{get children(){return[U(Ve,{href:"#start",children:"Start"}),U(Ve,{href:"#sync-check",children:"Sync Check"}),U(Ve,{href:"#sync-draft",children:"Sync Draft"}),U(Ve,{href:"#sync-live",children:"Sync Live"})]}})),Xe=async(e,t={})=>new Promise(((n,r)=>{jQuery.ajax({url:"/wp-admin/admin-ajax.php",type:"post",dataType:"json",data:{action:e,...t},success:function(e){n(e)},error:(e,t)=>{r(t)}})})),Ge=async(e,t)=>new Promise(((n,r)=>{jQuery.ajax({url:e,type:t?"post":"get",dataType:"json",data:t,success:function(e){n(e)},error:(e,t)=>{r(e.responseJSON)}})})),Ze=Qe("div")`
    background-color: white;
    padding: 1.0rem 2rem 2rem;
    border: 3px solid #ccc;
    border-radius: 3px;
    min-height: 50vh;
`,et=e=>U(Ze,{get children(){return e.children}}),tt=Qe("div")`
    display: flex;
`,nt=Qe("div")`
    flex: 1;
`,rt=Qe("div")`
    width: 220px;
    align-items: center;
    justify-content: center;
    display: flex;
`,ot=Qe("p")`
    font-size: 14px;
    padding-bottom: .5rem;
`,it=Qe("div")`
    font-size: 40px;
    font-weight: bold;
    text-align: center;
    width: 100%;
    padding: 3rem 0 2rem;
`,lt=Qe("h2")`
    font-size: 24px;
    margin-bottom: .5rem;
`,at=Qe("h3")`
    font-size: 18px;
    margin-bottom: .5rem;
    margin-top: 0px;
`,st=e=>U(tt,{get children(){return[U(nt,{get children(){return[U(lt,{get children(){return e.title}}),U(ot,{get children(){return e.description}})]}}),U(rt,{get children(){return e.actions}})]}});Qe("svg")`
    margin: auto; 
    background: white;
    display: block; 
    shape-rendering: auto;
    width: ${e=>e.width};
    height: ${e=>e.height};
`,Qe("svg")`
    margin: auto; 
    background: rgb(255, 255, 255); 
    display: block; 
    shape-rendering: auto;
`;const ct=le('<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="200px" height="200px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid"><circle cx="50" cy="50" r="32" stroke-width="8" stroke-dasharray="50.26548245743669 50.26548245743669" fill="none" stroke-linecap="round"><animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="2.0408163265306123s" keyTimes="0;1" values="0 50 50;360 50 50"></animateTransform></circle></svg>'),dt={small:"20px",medium:"30px",large:"50px",xlarge:"100px"},ut=({size:e="large",inverted:t=!1})=>{let n={display:"block","shape-rendering":"auto",width:dt[e],height:dt[e],stroke:"#006ba1"};return t&&(n.stroke="#fff"),(()=>{const e=ct.cloneNode(!0);return pe(e,n),e})()},pt=Qe("button")`
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

`,gt=Qe("div")`
    position: absolute;
    right: 7px;
`,ht=e=>U(pt,J(e,{get children(){return[ne((()=>e.children)),U(Y,{get when(){return e.loading},get children(){return U(gt,{get children(){return U(ut,{size:"small",get inverted(){return!e.disabled}})}})}})]}})),ft=Qe("div")`
    display: flex;
    margin-bottom: 2px;
`,vt=Qe("div")`
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
`,bt=Qe("div")`
    background-color: #2271b1;
    font-size: 10px;
    color: white;
    padding: 0px 4px 0px 4px;
    height: 16px;
    line-height: 15px;
    margin: 0 5px 0 0;
    border-radius: 2px;
    cursor: pointer;
`,mt=Qe("a")`
    display: block;
    color: grey;
    text-decoration: none;
`,yt=Qe("div")`
    padding: 0 5px 0 0;
    svg {
        fill: ${e=>e.color};
        transition: fill .2s ease-in;
    }
`,wt=le('<svg height="10" width="10"><circle cx="5" cy="5" r="5" stroke-width="0"></circle></svg>'),xt=({showCheckButton:e,showSyncButton:t,showDraft:n,showLive:r,item:o,onClick:i,onTypeClick:l})=>{const a=(e,t)=>{let n="#bbbbbb";return"error"===t?n="#da694b":""===t?n="#bbbbbb":e&&(n=e.synced?"#99da4b":"#e9da4e"),n};return U(ft,{get children(){return[U(Y,{when:n,get children(){return U(yt,{get color(){var e,t;return a(null===(e=o.status)||void 0===e?void 0:e.draft,null===(t=o.status)||void 0===t?void 0:t.state)},get children(){return wt.cloneNode(!0)}})}}),U(Y,{when:r,get children(){return U(yt,{get color(){var e,t;return a(null===(e=o.status)||void 0===e?void 0:e.live,null===(t=o.status)||void 0===t?void 0:t.state)},get children(){return wt.cloneNode(!0)}})}}),U(Y,{when:t,get children(){return U(bt,{onClick:i,children:"sync"})}}),U(Y,{when:e,get children(){return U(bt,{onClick:i,children:"check"})}}),U(vt,{onClick:()=>l(o.type),get children(){return o.type}}),U(mt,{target:"_new",get href(){return o.permalink},get children(){return o.permalink||"/"}})]}})},kt=({type:e})=>{const[t,{apiUrl:n}]=k(qe),[r,o]=De({list:[]}),[i,l]=g(!1);f((async()=>{const e=(await Xe("get_all_resources")).list.map(((e,t)=>({...e,index:t})));o({list:e})}));const a=async t=>{try{(await Ge(`${n}/sync.php`,{action:"sync",permalink:t.permalink,release:e,sync_check:!1})).data?o("list",t.index,"status",{[e]:{synced:!0},state:"loaded"}):o("list",t.index,"status",{state:"error"})}catch(e){o("list",t.index,"status",{state:"error"})}},s="draft"===e?"Begin to sync to Draft":"Publish everything to Live",c="draft"===e?"Sync Draft":"Sync Live",d="draft"===e?"This is where you can make sure that wordpress and the draft content is in sync":"This is where you can make sure that Draft and Live are in sync";return U(et,{get children(){return[U(st,{title:c,description:d,get actions(){return U(ht,{get loading(){return i()},onClick:()=>(async()=>{if(i())return;let t=!1;if(("live"===e&&confirm("Do you really which to publish everything?")||"draft"===e)&&(t=!0),t){l(!0),r.list.forEach(((e,t)=>{o("list",t,"status",{state:""}),t++}));for await(let e of r.list)await a(e);l(!1)}})(),children:s})}}),U(Q,{get each(){return r.list},children:t=>U(xt,{showDraft:"draft"===e,showLive:"live"===e,showSyncButton:!0,onClick:()=>(async e=>{l(!0),await a(e),l(!1)})(t),onTypeClick:()=>(async e=>{l(!0);const t=r.list.filter((t=>t.type===e));t.forEach(((e,t)=>{o("list",t,"status",{state:""}),t++}));for await(let e of t)await a(e);l(!1)})(t.type),item:t,get permalink(){return t.permalink}})})]}})},St=()=>{const[e,{apiUrl:t}]=k(qe),[n,r]=De({list:[]}),[o,i]=g(!1);console.log(t),f((async()=>{const e=(await Xe("get_all_resources")).list.map(((e,t)=>({...e,index:t})));r({list:e})}));const l=async e=>{try{const n=await Ge(`${t}/check-sync.php`,{permalink:e.permalink});r("list",e.index,"status",{draft:n.data.resourceStatus.find((e=>"draft"===e.target&&"__original"===e.comparedTo)),live:n.data.resourceStatus.find((e=>"live"===e.target&&"draft"===e.comparedTo)),state:"loaded"})}catch(t){r("list",e.index,"status",{state:"error"})}};return U(et,{get children(){return[U(st,{title:"Sync Check",description:"This is where you can check if all content is in sync",get actions(){return U(ht,{get loading(){return o()},onClick:()=>(async()=>{if(!o()){i(!0),n.list.forEach(((e,t)=>{r("list",t,"status",{state:""}),t++}));for await(let e of n.list)await l(e);i(!1)}})(),children:"Begin to check"})}}),U(Q,{get each(){return n.list},children:e=>U(xt,{showDraft:!0,showLive:!0,showCheckButton:!0,item:e,get permalink(){return e.permalink},onClick:()=>(async e=>{i(!0),await l(e),i(!1)})(e),onTypeClick:()=>(async e=>{i(!0);const t=n.list.filter((t=>t.type===e));t.forEach(((e,t)=>{r("list",t,"status",{state:""}),t++}));for await(let e of t)await l(e);i(!1)})(e.type)})})]}})},Ct=Qe("p")`
    font-size: 14px;
    padding-bottom: .5rem;
    background-color: #ffeaee;
    border: 2px solid #ffc0cb;
    border-radius: 3px;
    padding: 1rem 2rem;
    text-align: center;
`,jt=()=>U(et,{get children(){return[U(st,{title:"Start",description:"This plugin lets you control and debug content through the content service."}),U(Ct,{children:"This is mainly used while developing or by admins!"})]}}),Mt=Qe("div")`
     color: black;
     max-width: 1200px;
     margin: 0 auto;
`;Qe("div")`
`,Qe("div")`
    font-size: 1rem;
    padding: 1rem 0;
`;const At=()=>{const[e]=k(qe);return U(Mt,{get children(){return[U(it,{children:"Content Dashboard"}),U(We,{}),U(Y,{get when(){return"start"===e.path},get children(){return U(jt,{})}}),U(Y,{get when(){return"sync-check"===e.path},get children(){return U(St,{})}}),U(Y,{get when(){return"sync-draft"===e.path},get children(){return U(kt,{type:"draft"})}}),U(Y,{get when(){return"sync-live"===e.path},get children(){return U(kt,{type:"live"})}})]}})},Pt=Qe("div")`

    padding-top: 6px;

    ${e=>e.horizontal?"\n        display: flex;   \n        align-items: center;\n        border-bottom: 1px dotted grey;\n        padding: 0 10px 8px 10px;\n        margin-left: -10px;\n        margin-right: -10px;\n        justify-content: flex-end;\n    ":""} 

    ${e=>e.box?"\n        position: relative;\n        min-width: 255px;\n        border: 1px solid #ccd0d4;\n        box-shadow: 0 1px 1px rgb(0 0 0 / 4%);\n        background: #fff;\n        padding: 1rem;\n        box-sizing: border-box;\n        margin-bottom: 7px;\n    ":""}

`,Nt=Qe("div")`
    color: red;
    padding-top: 0.4rem;
`,_t=Qe("div")`
    color: darkgray;
    padding-top: 0.4rem;
`,Tt=Qe("div")`
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

`,Dt=Qe("div")`
    text-align: center;
    min-width: 100px;
    ${e=>e.horizontal?"\n        margin-top: 10px;\n    ":""}

`,[qt,Et]=De({options:{},setChecking:()=>!0,syncStatus:{},publish:()=>null,changesNotSavedToDraft:!1,showRejectionControls:!1,rejectionReason:"",approvalStatus:"",errorMessage:"",approvedBy:""}),Rt=e=>{Et({approvalStatus:e})},Lt=()=>{Et((e=>({showRejectionControls:!e.showRejectionControls})))},$t=async(e="",t)=>{qt.setChecking(!0);const n=await(async e=>{try{var t;return await Ge(`${qt.options.api}/upsert-publication-request.php`,{permalink:qt.options.permalink,status:e,editorUrl:null===(t=window)||void 0===t?void 0:t.location.href,approvedBy:"approved"===e?qt.options.userName:"",rejectedBy:"rejected"===e?qt.options.userName:"",rejectionReason:qt.rejectionReason}),{}}catch(e){return console.log("Error upserting publication request",e),{err:e}}})(e);n.err?(Et({errorMessage:"Error changing status to "+e}),console.log("Err upserting request",n.err)):Rt(e),qt.setChecking(!1)},zt=async()=>{qt.setChecking(!0);const e=await(async()=>{try{return await Ge(`${qt.options.api}/delete-publication-request.php`,{permalink:qt.options.permalink}),{}}catch(e){return console.log("Error deleting request",e),{err:e}}})();e.err?(Et({errorMessage:"Something went wrong withdrawing publication request"}),console.log("Err deleting request",e.err)):Rt(""),qt.setChecking(!1)},Ot=le("<em></em>"),Bt=Qe("div")`
    padding: 0.25rem;
    background: #fefbe6;

`,Ht=()=>U(V,{get children(){return[U(W,{get when(){return"pending"===qt.approvalStatus},get children(){return U(Dt,{get horizontal(){return qt.options.metaMenu},children:"Pending approval"})}}),U(W,{get when(){return"approved"===qt.approvalStatus},get children(){return U(Dt,{get horizontal(){return qt.options.metaMenu},get children(){return["Publication approved ",ne((()=>qt.approvedBy?" by "+qt.approvedBy:""))]}})}}),U(W,{get when(){return"rejected"===qt.approvalStatus},get children(){return[U(Dt,{get horizontal(){return qt.options.metaMenu},get children(){return["Publication rejected ",ne((()=>qt.rejectedBy?" by "+qt.rejectedBy:""))]}}),U(Y,{get when(){return qt.rejectionReason},get children(){return U(Bt,{get children(){const e=Ot.cloneNode(!0);return ge(e,(()=>qt.rejectionReason)),e}})}})]}})]}}),It=()=>U(ht,{get leftMargin(){return qt.options.metaMenu},get loading(){return qt.publishing},onClick:e=>qt.publish(e),get disabled(){return qt.changesNotSavedToDraft},get children(){var e,t,n;return qt.changesNotSavedToDraft?null!==(e=qt.syncStatus.live)&&void 0!==e&&e.exists?"Save draft before updating on live":"Save draft before publishing to live":null!==(t=qt.syncStatus.live)&&void 0!==t&&t.exists?null!==(n=qt.syncStatus.live)&&void 0!==n&&n.synced?"Updated on live site":"Update on live site":"Publish to live site"}}),Ut=le('<div><h4>Rejection reason</h4><textarea rows="4" placeholder="Message to the editor" maxlength="200"></textarea><div></div></div>'),Ft=()=>[U(ht,{get leftMargin(){return qt.options.metaMenu},onClick:e=>$t("approved"),get disabled(){return qt.showRejectionControls},children:"Approve "}),U(Y,{get when(){return qt.showRejectionControls},get children(){const e=Ut.cloneNode(!0),t=e.firstChild,n=t.nextSibling,r=n.nextSibling;return e.style.setProperty("margin-block","1.5rem"),t.style.setProperty("margin-bottom",0),n.addEventListener("change",(e=>{var t;t=e.target.value,Et({rejectionReason:t})})),n.style.setProperty("width","100%"),n.style.setProperty("margin-top","0.5rem"),r.style.setProperty("display","flex"),ge(r,U(ht,{get leftMargin(){return qt.options.metaMenu},onClick:e=>Lt(),disabled:!1,style:{"margin-top":0,"margin-right":"0.2rem"},children:"Cancel"}),null),ge(r,U(ht,{get leftMargin(){return qt.options.metaMenu},onClick:e=>{$t("rejected")},disabled:!1,style:{"margin-top":0},children:"Send rejection"}),null),e}}),U(Y,{get when(){return!qt.showRejectionControls},get children(){return U(ht,{get leftMargin(){return qt.options.metaMenu},onClick:e=>{Lt()},get disabled(){return qt.showRejectionControls},children:"Reject"})}}),U(Y,{get when(){return!qt.showRejectionControls},get children(){return U(It,{})}})],Kt=le("<div><h5>Dev mode</h5></div>"),Jt=()=>(()=>{const e=Kt.cloneNode(!0);return e.firstChild,e.style.setProperty("background","lightgray"),e.style.setProperty("padding","0.5rem"),ge(e,U(ht,{get leftMargin(){return qt.options.metaMenu},onClick:e=>$t("approved"),disabled:!1,children:"Approve"}),null),ge(e,U(ht,{get leftMargin(){return qt.options.metaMenu},onClick:e=>$t("rejected"),disabled:!1,children:"Reject"}),null),ge(e,U(ht,{get leftMargin(){return qt.options.metaMenu},onClick:e=>$t("pending"),get disabled(){return qt.changesNotSavedToDraft},children:"Set to pending"}),null),e})(),Qt=()=>[U(Y,{get when(){return""===qt.approvalStatus},get children(){return[U(Y,{get when(){return qt.options.userHasPublicationRights},get children(){return U(It,{})}}),U(Y,{get when(){return!qt.options.userHasPublicationRights},get children(){return U(ht,{get leftMargin(){return qt.options.metaMenu},onClick:e=>$t("pending"),get disabled(){return qt.changesNotSavedToDraft},get children(){return qt.changesNotSavedToDraft?"Save draft before publish request":"Request approval to publish"}})}})]}}),U(Y,{when:false,get children(){return U(Jt,{})}}),U(Y,{get when(){return"pending"===qt.approvalStatus},get children(){return[U(Y,{get when(){return qt.options.userHasPublicationRights},get children(){return U(Ft,{})}}),U(Y,{get when(){return!qt.options.userHasPublicationRights},get children(){return U(ht,{get leftMargin(){return qt.options.metaMenu},onClick:e=>zt(),disabled:!1,children:"Withdraw publication request"})}})]}}),U(Y,{get when(){return"approved"===qt.approvalStatus},get children(){return[U(Y,{get when(){return qt.options.userHasPublicationRights},get children(){return U(It,{})}}),U(Y,{get when(){return!qt.options.userHasPublicationRights},get children(){return U(ht,{get leftMargin(){return qt.options.metaMenu},get loading(){return qt.publishing},onClick:e=>qt.publish(e),get disabled(){return qt.changesNotSavedToDraft},get children(){return qt.changesNotSavedToDraft?"Discard unapproved changes to publish":"Publish to live site"}})}})]}}),U(Y,{get when(){return"rejected"===qt.approvalStatus},get children(){return U(Y,{get when(){return qt.options.userHasPublicationRights},get children(){return U(It,{})}})}})],Yt=()=>U(Y,{get when(){return"pending"===qt.approvalStatus&&qt.changesNotSavedToDraft},get children(){return U(_t,{children:"Saving a new draft will automatically withdraw the pending publication approval"})}}),Vt=()=>[U(Y,{get when(){return""===qt.approvalStatus},get children(){return[U(Y,{get when(){return qt.options.userHasPublicationRights},get children(){return U(ht,{get leftMargin(){return qt.options.metaMenu},get loading(){return qt.publishing},onClick:e=>qt.publish(e),get disabled(){var e;return(null===(e=qt.syncStatus.live)||void 0===e?void 0:e.synced)||qt.changesNotSavedToDraft},get children(){var e;return qt.changesNotSavedToDraft?"Save draft before updating on live":null!==(e=qt.syncStatus.live)&&void 0!==e&&e.synced?"Updated on live site":"Update on live site"}})}}),U(Y,{get when(){return!qt.options.userHasPublicationRights},get children(){return U(ht,{get leftMargin(){return qt.options.metaMenu},get loading(){return qt.publishing},onClick:e=>$t("pending"),get disabled(){var e;return(null===(e=qt.syncStatus.live)||void 0===e?void 0:e.synced)||qt.changesNotSavedToDraft},get children(){var e;return qt.changesNotSavedToDraft?"Save draft before requesting publication approval":null!==(e=qt.syncStatus.live)&&void 0!==e&&e.synced?"Updated on live site":"Request approval to publish"}})}})]}}),U(Y,{get when(){return"pending"===qt.approvalStatus},get children(){return[U(Y,{get when(){return qt.options.userHasPublicationRights},get children(){return U(Ft,{})}}),U(Y,{get when(){return!qt.options.userHasPublicationRights},get children(){return U(ht,{get leftMargin(){return qt.options.metaMenu},onClick:e=>zt(),disabled:!1,children:"Withdraw publication request"})}})]}}),U(Y,{get when(){return"approved"===qt.approvalStatus},get children(){return[U(Y,{get when(){return qt.options.userHasPublicationRights},get children(){return U(ht,{get leftMargin(){return qt.options.metaMenu},get loading(){return qt.publishing},onClick:e=>qt.publish(e),get disabled(){var e;return(null===(e=qt.syncStatus.live)||void 0===e?void 0:e.synced)||qt.changesNotSavedToDraft},get children(){var e;return qt.changesNotSavedToDraft?"Save draft before publishing to live":null!==(e=qt.syncStatus.live)&&void 0!==e&&e.synced?"Updated on live site":"Update on live site"}})}}),U(Y,{get when(){return!qt.options.userHasPublicationRights},get children(){return U(ht,{get leftMargin(){return qt.options.metaMenu},get loading(){return qt.publishing},onClick:e=>qt.publish(e),get disabled(){var e;return(null===(e=qt.syncStatus.live)||void 0===e?void 0:e.synced)||qt.changesNotSavedToDraft},get children(){var e;return qt.changesNotSavedToDraft?"Save to draft or discard unapproved changes to publish":null!==(e=qt.syncStatus.live)&&void 0!==e&&e.synced?"Updated on live site":"Update on live site"}})}})]}}),U(Y,{get when(){return"rejected"===qt.approvalStatus},get children(){return["hejhejehj",U(Y,{get when(){return!qt.options.userHasPublicationRights},get children(){return U(ht,{get leftMargin(){return qt.options.metaMenu},onClick:e=>null,disabled:!0,get children(){return qt.changesNotSavedToDraft?"Save draft before requesting publication approval":"Make changes before requesting approval to publish"}})}})]}})],Wt=({options:e})=>{const[t,n]=De({}),[r,o]=g(!0),[i,l]=g(!1),[a,s]=g(!1),[c,d]=g(!1),[u,p]=g(!1),[h,v]=g(!1),[b,m]=g(!1),[w,x]=g(!1),[k,S]=g(!1),C={permalink:e.permalink};let j,M;y((()=>{e.requireApproval&&Et({options:e,setChecking:o,syncStatus:t,publish:e=>R(e)})})),f((()=>{var t,n;e.metaMenu?(M=document.querySelector("#save_menu_footer"),N()):null!==(t=wp)&&void 0!==t&&null!==(n=t.data)&&void 0!==n&&n.select&&(j=wp.data.select("core/editor"),wp.domReady(A))})),f((()=>{wp&&wp.hooks&&wp.hooks.addAction&&(D(),wp.hooks.addAction("dls.post-saved","dls",(()=>{var e,n,r;if(null!=t&&null!==(e=t.draft)&&void 0!==e&&e.exists||null===(n=j)||void 0===n||!n.isPublishingPost())null!=t&&null!==(r=t.draft)&&void 0!==r&&r.exists&&(A(),D());else{const{isSavingPost:e}=j;let t=0;const n=setInterval((()=>{(!e()||t>=50)&&(location.reload(),clearInterval(n))}),100)}})))})),f((()=>{let e;document.addEventListener("cerberusListenerEvent",(t=>{var n;null!=t&&null!==(n=t.detail)&&void 0!==n&&n.hasChange&&(e||(e=document.querySelector(".editor-post-publish-button"),e.addEventListener("click",(()=>{m(!1),e.setAttribute("disabled",!0)}))),e&&(m(!0),e.removeAttribute("disabled")))}))}));const A=()=>{let e;const t=wp.data.subscribe(_.debounce((()=>{e||(e=document.querySelector(".editor-post-publish-button"));const n=j.isEditedPostDirty(),r=j.hasNonPostEntityChanges(),o=b();r||n||o?(p(!0),e.addEventListener("click",P),e.removeAttribute("disabled"),t()):(p(!1),e.removeEventListener("click",P),e.setAttribute("disabled",!0))}),100))},P=()=>{e.requireApproval&&qt.options.requireApproval&&zt()},N=()=>{let e,t=!1;M.setAttribute("disabled",!0);let n=()=>{t||clearInterval(e)},r=()=>{t||(e=o())};const o=()=>setInterval((()=>{var o,i;null!==(o=window)&&void 0!==o&&null!==(i=o.wpNavMenu)&&void 0!==i&&i.menusChanged&&(t=!0,T(),clearInterval(e),window.removeEventListener("blur",n),window.removeEventListener("focus",r))}),500);e=o(),window.addEventListener("blur",n),window.addEventListener("focus",r)},T=()=>{M.removeAttribute("disabled"),v(!0)},D=async(t=!0)=>{t&&(o(!0),await new Promise((e=>setTimeout(e,1e3))));try{var r;const t=await Xe("check_sync",{...C,api_path:C.permalink});if(null==t||null===(r=t.data)||void 0===r||!r.resourceStatus)throw C;n({draft:t.data.resourceStatus.find((e=>"draft"===e.target&&"__original"===e.comparedTo)),live:t.data.resourceStatus.find((e=>"live"===e.target&&"draft"===e.comparedTo)),state:"loaded"}),S(!1),e.requireApproval&&(async()=>{try{var e;const t=await Ge(`${qt.options.api}/get-publication-request.php`,{permalink:qt.options.permalink});if(null!==(e=t.data.resource)&&void 0!==e&&e.content){const e=t.data.resource.content;Et({approvalStatus:e.status,approvedBy:e.approvedBy,rejectedBy:e.rejectedBy,rejectionReason:e.rejectionReason||""})}else Rt("")}catch(e){console.log("Error fetching publication request",e)}})(),e.metaMenu&&q()}catch(e){console.log("--- meta-box --- Can't find any data with check-sync of payload: ",e),S(!0),o(!1),n({state:"error"})}o(!1)},q=async()=>{var e;const n=document.querySelectorAll(".menu-theme-locations > .menu-settings-input"),r=document.querySelector(".menu-settings-group.menu-theme-locations"),o=document.createElement("i");o.classList.add("changes-disabled-message");const i=null===(e=t.draft)||void 0===e?void 0:e.exists,l=t.live&&t.live.exists;!i||l?(r.style.pointerEvents="none",r.style.cursor="not-allowed",r.style.opacity=.5):(r.style.pointerEvents="auto",r.style.cursor="default",r.style.opacity=1);const a=document.querySelector(".changes-disabled-message");if(l){const e="Menu must be unpublished before toggling location";a?a.innerHTML=e:(o.innerHTML=e,r.prepend(o))}else{const e="Menu must be created before toggling location";i?a&&a.parentNode.removeChild(a):a?a.innerHTML=e:(o.innerHTML=e,r.prepend(o))}let s=!1,c=!1;for(let e of n){const t=e.querySelector("input");t.addEventListener("change",(()=>{d(!0),T()}));e.querySelector(".theme-location-set")&&(t.setAttribute("disabled",!0),e.style.pointerEvents="none",e.style.opacity=.5,c=!0),t.getAttribute("checked")&&(s=!0)}if(c&&!l&&i){const e=document.querySelector(".changes-disabled-message"),t="Some locations cannot be set because they are already set";e?e.innerHTML=t:(o.innerHTML=t,r.prepend(o))}if(location.search.includes("menu=0"))return;x(!0);const u=document.querySelector(".submitdelete.deletion.menu-delete");let p=document.querySelector(".delete-link-replacement");s||l?(u.style.display="none",p?p.style.display="inline":(p=document.createElement("span"),p.classList.add("delete-link-replacement"),p.innerHTML="To delete a menu it must be unpublished (and unregisterered from all display locations)",p.style.color="#a7aaad",p.style.fontSize="12px"),u.parentNode.prepend(p)):(u.style.display="inline",p&&(p.style.display="none"))},E=(e={})=>{if(document){const t=new CustomEvent("cerberusChangeEvent",{detail:e});document.dispatchEvent(t)}},R=async e=>{e.preventDefault(),e.stopPropagation(),l(!0);(await Xe("publish_to_live",C)).data?D(!1):n({state:"error"}),await new Promise((e=>setTimeout(e,1e3))),l(!1),zt(),E({action:"publish_to_live_done"})},L=async e=>{e.preventDefault(),e.stopPropagation(),s(!0);(await Xe("unpublish_from_live",C)).data?D(!1):n({state:"error"}),await new Promise((e=>setTimeout(e,1e3))),s(!1),E({action:"unpublish_from_live_done"})};f((()=>{Et({changesNotSavedToDraft:$()})})),f((()=>{Et({publishing:i()})})),f((()=>{Et({publishing:i()})}));const $=()=>u()||h()||b();return U(Pt,{get horizontal(){return e.metaMenu},get box(){return e.optionsMeta},get children(){return[U(Y,{get when(){return r()},get children(){return U(Tt,{get horizontal(){return e.metaMenu},get children(){return[U(ut,{get size(){return e.metaMenu?"small":"large"}}),U(Dt,{children:"Checking content in draft and live"})]}})}}),U(Y,{get when(){return!r()},get children(){return[U(Y,{get when(){return k()},get children(){return U(Tt,{get horizontal(){return e.metaMenu},get children(){return U(Dt,{children:"Content must be saved before publishing"})}})}}),U(Y,{get when(){var e;return!c()&&(null===(e=t.draft)||void 0===e?void 0:e.exists)},get children(){return[U(Y,{get when(){return e.requireApproval},get children(){return U(Ht,{})}}),U(Y,{get when(){return!e.requireApproval},get children(){return U(Dt,{get horizontal(){return e.metaMenu},children:"Publish content"})}}),U(Y,{get when(){var e;return!(null!==(e=t.live)&&void 0!==e&&e.exists)},get children(){return[ne((()=>e.requireApproval?U(Qt,{}):U(ht,{get leftMargin(){return e.metaMenu},get loading(){return i()},onClick:e=>R(e),get disabled(){return $()},get children(){return $()?"Save draft before publishing to live":"Publish to live site"}}))),U(ht,{get leftMargin(){return e.metaMenu},disabled:!0,children:"Content not published"}),U(Yt,{})]}}),U(Y,{get when(){var e;return null===(e=t.live)||void 0===e?void 0:e.exists},get children(){return[ne((()=>e.requireApproval?U(Vt,{}):U(ht,{get leftMargin(){return e.metaMenu},get loading(){return i()},onClick:e=>R(e),get disabled(){var e;return(null===(e=t.live)||void 0===e?void 0:e.synced)||$()},get children(){var e;return $()?"Save draft before updating on live":null!==(e=t.live)&&void 0!==e&&e.synced?"Updated on live site":"Update on live site"}}))),U(ht,{get leftMargin(){return e.metaMenu},get loading(){return a()},onClick:e=>L(e),get disabled(){return b()},children:"Unpublish"}),U(Yt,{})]}})]}}),U(Y,{get when(){return e.metaMenu},get children(){return U(Tt,{get horizontal(){return e.metaMenu},get children(){return[U(Y,{get when(){return!w()},get children(){return U(Dt,{children:"Enter a 'Menu Name' above to create a new menu"})}}),(()=>{const e=ne((()=>{var e;return!(c()||null!==(e=t.draft)&&void 0!==e&&e.exists)}),!0);return U(Y,{get when(){return e()&&w()},get children(){return U(Dt,{children:"Save menu with menu items in order to publish"})}})})(),U(Y,{get when(){return c()},get children(){return U(Dt,{children:"Save the changes before publishing"})}})]}})}})]}}),U(Y,{get when(){return e.enableTestContent},get children(){return U(ht,{get leftMargin(){return e.metaMenu},get loading(){return a()},onClick:e=>L(e),get disabled(){var e;return!(null!==(e=t.test)&&void 0!==e&&e.synced)},get children(){return t.test&&t.test.synced?"Unpublish from test target":"Publish to test target"}})}}),U(Y,{get when(){return e.enableDiffButton},get children(){return U(ht,{get leftMargin(){return e.metaMenu},children:"Show diff (raw)"})}}),U(Y,{get when(){return qt.errorMessage},get children(){return U(Nt,{get children(){return qt.errorMessage}})}})]}})},Xt=Qe("input")`
`,Gt=Qe("div")`
    display: flex;
    flex-direction: column;
    width: 100%;
    padding-right: 10px;
    box-sizing: border-box;
`,Zt=Qe("label")`
    padding: 5px 5px 0px 5px;
    font-size: 10px;
    height: 18px;
`,en=({placeholder:e="",label:t=" ",value:n,onChange:r=(()=>{})})=>{const o=e=>{r(e.target.value)};return U(Gt,{get children(){return[U(Zt,{children:t}),U(Xt,{type:"text",get value(){return n()},placeholder:e,onKeyup:o})]}})},tn=Qe("select")`
    max-width: 100% !important;
`,nn=Qe("div")`
    display: flex;
    flex-direction: column;
    width: 100%;
    padding-left: 10px;
    box-sizing: border-box;
`,rn=Qe("label")`
    padding: 5px 5px 0px 5px;
    font-size: 10px;
    height: 18px;
`,on=le("<option></option>"),ln=({options:e=[],placeholder:t="",label:n=" ",value:r,onChange:o=(()=>{})})=>{const i=e=>{console.log(e),o(e.target.value)};return U(nn,{get children(){return[U(rn,{children:n}),U(tn,{get value(){return r()},placeholder:t,onChange:i,get children(){return U(Q,{each:e,children:e=>(()=>{const t=on.cloneNode(!0);return ge(t,(()=>e.label)),h((n=>{const o=e.value,i=e.value===r();return o!==n._v$&&(t.value=n._v$=o),i!==n._v$2&&(t.selected=n._v$2=i),n}),{_v$:void 0,_v$2:void 0}),t})()})}})]}})},an={open:Ke`
    0% {
        max-height: 0;
    }
    100% {
        max-height: 300px;
    }
`,close:Ke`
    0% {
        max-height: 300px;
    }
    100% {
        max-height: 0;
    }
`,init:Ke`
    0% {
        max-height: 0;
    }
    100% {
        max-height: 0;
    }
`},sn=Qe("div")`
     color: black;
     max-width: 1200px;
     margin: 0 auto;
`;Qe("div")`
`,Qe("div")`
    font-size: 1rem;
    padding: 1rem 0;
`;const cn=Qe("div")`
    display: flex;
    justify-content: flex-end;
`,dn=Qe("div")`
    max-height: 0px;
    overflow: hidden;
    ${e=>`animation: ${an[e.state]} .4s ease-in-out forwards;`}
`,un=Qe("div")`
    background-color: #fff;
    border: 1px solid #aaa;
    border-radius: 3px;
    margin-top: 20px;
    padding: 20px;
`,pn=Qe("div")`
    width: 100%;
    display: flex;
    padding-bottom: 10px;
`,gn=Qe("div")`
    width: 100%;
    display: flex;
    justify-content: flex-end;
`,hn=Qe("div")`
    color red;
`,fn=Qe("div")`
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
`,vn=Qe("table")`
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
`,bn=Qe("td")`
    display: flex;
    justify-content: flex-end;
`,mn=le("<thead><tr><th>Domain</th><th>Distribution ID</th><th>Target</th><th>SiteId</th><th></th></tr></thead>"),yn=le("<tbody></tbody>"),wn=le("<tr><td></td><td></td><td></td><td></td></tr>"),xn=[{value:"draft",label:"Draft"},{value:"live",label:"Live"},{value:"test",label:"Test"}];const kn=({options:e})=>{const[t,n]=De({list:[]}),[r,o]=g(""),[i,l]=g(""),[a,s]=g("draft"),[c,d]=g("init"),[u,p]=g(""),[h,v]=g(!1),b=async()=>{const t=await Ge(`${e.api}/get-domain-settings.php`);n("list",t)},m=async(t=function(e){for(var t="",n="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",r=n.length,o=0;o<e;o++)t+=n.charAt(Math.floor(Math.random()*r));return t}(20))=>{try{if(p(""),h())return;v(!0),await Ge(`${e.api}/upsert-domain-setting.php`,{domain:r(),target:a(),id:t,cloudfrontDistributionId:i()}),await b(),s("draft"),o(""),l(""),v(!1),d("close")}catch(e){console.log("ee",e),"domain-already-exists"===e.error?p("Domain already exists"):p("Something caused an error"),v(!1)}},y=(e,t)=>{"domain"===e&&o(t),"target"===e&&s(t),"cloudfrontDistributionId"===e&&l(t)};return f((()=>{b()})),U(sn,{get children(){return[U(it,{children:"Domain Settings"}),U(ot,{children:"This is the list of domains and targets that will be used for this site. You can add as many as you need but the domains need to be pointed to the server to make it work."}),U(cn,{get children(){return U(ht,{onClick:()=>d("open"),children:"Add new domain and target"})}}),U(dn,{get state(){return c()},get children(){return U(un,{get children(){return[U(at,{children:"Add new domain and target"}),U(pn,{get children(){return[U(en,{placeholder:"domain",label:"Domain:",value:r,onChange:e=>y("domain",e)}),U(en,{placeholder:"distribution id",label:"Cloudfront Distribution ID:",value:i,onChange:e=>y("cloudfrontDistributionId",e)}),U(ln,{options:xn,value:a,onChange:e=>y("target",e)})]}}),U(Y,{when:u,get children(){return U(hn,{children:u})}}),U(gn,{get children(){return[U(ht,{onClick:()=>d("close"),children:"Cancel"}),U(ht,{get loading(){return h()},leftMargin:!0,get disabled(){return!r()||!a()},onClick:()=>m(),children:"Save"})]}})]}})}}),U(vn,{get children(){return[mn.cloneNode(!0),(()=>{const n=yn.cloneNode(!0);return ge(n,U(Q,{get each(){return t.list},children:t=>(()=>{const n=wn.cloneNode(!0),r=n.firstChild,o=r.nextSibling,i=o.nextSibling,l=i.nextSibling;return ge(r,(()=>t.content.domain)),ge(o,(()=>t.content.cloudfrontDistributionId)),ge(i,(()=>t.content.target)),ge(l,(()=>t.content.siteId)),ge(n,U(bn,{get children(){return U(fn,{onClick:()=>(async t=>{try{await Ge(`${e.api}/delete-domain-setting.php`,{id:t}),await b()}catch(e){console.log(e)}})(t.externalId),children:"delete"})}}),null),n})()})),n})()]}})]}})},Sn=le("<span>, requested by <em></em></span>"),Cn=le("<span> - rejected by <!> </span>"),jn=le("<em></em>"),Mn=Qe("div")`
    text-transform: uppercase;
    font-size: 13px;
    margin-right: 0.5rem;
    background-color: rgba(0,0,0,0.1);
    padding: 0.2rem 0.35rem;
    min-width: 50px;
    display: flex;
    justify-content: center;
    align-self: flex-start;
`,An=Qe("a")`
    ${e=>e.href?"":"color: black;"}
    font-weight: bold;
    text-transform: capitalize;
    text-decoration: none;
`,Pn=Qe("p")`
    margin: 0;
    font-size: inherit;
    color: gray;
`,Nn=Qe("h5")`
    margin: 0;
    margin-bottom: 0.3rem;
    text-decoration: underline;
`,_n=Qe("div")`
    margin-top: 0.8rem;
    display: flex;
    align-items: center;
    font-size: 15px;
`,Tn=Qe("div")`
    padding-left: 1rem;
    margin-top: 0.5rem;

`,Dn=e=>U(_n,{get key(){return e.item.post_id},get children(){return[U(Mn,{get children(){return e.item.type}}),U(Pn,{get children(){return[U(An,{get href(){return e.item.editorUrl},target:"_blank",get children(){return e.item.post_title}}),(()=>{const t=Sn.cloneNode(!0);return ge(t.firstChild.nextSibling,(()=>e.item.from_user_name)),t})(),U(Y,{get when(){return"rejected"===e.item.status},get children(){const t=Cn.cloneNode(!0),n=t.firstChild.nextSibling;return n.nextSibling,ge(t,(()=>e.item.rejectedBy),n),t}}),"(",ne((()=>(()=>{const t=new Date(e.item.updated_on);return t.getFullYear()+"-"+(t.getMonth()+1).toString().padStart(2,"0")+"-"+t.getDate().toString().padStart(2,"0")+", "+t.getHours().toString().padStart(2,"0")+":"+t.getMinutes().toString().padStart(2,"0")})())),")",U(Y,{get when(){return"rejected"===e.item.status},get children(){return U(Tn,{get children(){return[U(Nn,{children:"Rejection message:"}),(()=>{const t=jn.cloneNode(!0);return ge(t,(()=>e.item.rejectionReason)),t})()]}})}})]}})]}}),qn=le("<span></span>"),En=le("<div></div>"),Rn=Qe("div")`
    margin-bottom: 3rem;
`,Ln=Qe("div")`
    margin-top: 1rem;
    margin-bottom: 2rem;
`,$n=Qe("p")`
    font-size: 15px;
`,zn=({options:e})=>{const[t,n]=g([]),[r,o]=g([]),[i,l]=g([]),[a,s]=g(!1),[c,d]=g("");y((()=>{s(!0),u()}));const u=async()=>{try{var t;const n=await Ge(`${e.api}/get-publication-requests.php`);p(null==n||null===(t=n.data)||void 0===t?void 0:t.resources)}catch(e){console.log("Error fetching all publication requests",e),d("Error fetching all publication requests")}},p=(e=[])=>{const t={pending:{},approved:{},rejected:{}};e.sort(((e,t)=>new Date(t.content.updated_on)-new Date(e.content.updated_on))).forEach((e=>{const n=e.content.status,r=h(e.content["wp-domain"]),o=e.content.from_site_name+" - "+r;t[n][o]||(t[n][o]=[]),t[n][o].push(e.content)})),n(t.approved),l(t.rejected),o(t.pending),s(!1)},h=e=>{const t=e.indexOf("://");return e.slice(t+3)},f=({title:e,siteRequests:t})=>{const n=Object.keys(t);return U(Rn,{get children(){return[U(at,{children:e}),U(Y,{get when(){return 0!==n.length},get fallback(){return U(Pn,{children:"None to show"})},get children(){return U(Q,{each:n,children:e=>U(Ln,{get children(){return[U($n,{children:e}),U(Q,{get each(){return t[e]},children:e=>U(Dn,{item:e})})]}})})}})]}})};return(()=>{const e=En.cloneNode(!0);return ge(e,U(it,{children:"Publication requests"}),null),ge(e,(()=>{const e=ne((()=>!!a()),!0);return U(Y,{get when(){return e()&&!c()},get children(){return U(Pn,{children:"Loading..."})}})})(),null),ge(e,(()=>{const e=ne((()=>!a()),!0);return U(Y,{get when(){return e()&&!c()},get children(){return[ne((()=>f({title:"Pending",siteRequests:r()}))),ne((()=>f({title:"Approved",siteRequests:t()}))),ne((()=>f({title:"Rejected",siteRequests:i()})))]}})})(),null),ge(e,U(Y,{get when(){return c()},get children(){const e=qn.cloneNode(!0);return ge(e,c),e}}),null),e})()},On=e=>{try{return JSON.parse(document.getElementById(e).innerHTML)}catch(e){return console.log("Error in getData",e),{}}},Bn=()=>{let e=document.getElementById("dls-metabox-root");if(e){const t=On("dls-data");t.metaMenu="nav-menu"===e.getAttribute("data-type"),t.metaMenu&&(e=document.createElement("div"),e&&document.querySelector("#nav-menu-footer").prepend(e)),ie((()=>U(Wt,{options:t})),e)}};jQuery(document).ready((function(e){wp&&wp.data&&wp.data.dispatch&&wp.data.dispatch("core/editor").disablePublishSidebar(),(()=>{if(wp.data){let e=!1,t=!1;wp.data.subscribe((()=>{const n=wp.data.select("core/editor").isSavingPost(),r=wp.data.select("core/editor").isSavingNonPostEntityChanges&&wp.data.select("core/editor").isSavingNonPostEntityChanges();e!==n?(e=n,wp.data.select("core/editor").didPostSaveRequestSucceed()&&wp.hooks.doAction("dls.post-saved")):t!==r&&(t=r,wp.data.select("core/editor").didPostSaveRequestSucceed()&&wp.hooks.doAction("dls.post-saved"))}))}})();let t={};try{t=e("#dls-hooks").length>0?JSON.parse(e("#dls-hooks").html()):{hook:""}}catch(e){}console.log("Current hook",t&&t.hook),"post.php"===t.hook||"post-new.php"===t.hook||"nav-menus.php"===t.hook?Bn():t.hook.includes("toplevel_page_draft-live-sync")?(()=>{const e=On("dls-data");ie((()=>U(Ee,{values:e,get children(){return U(At,{})}})),document.getElementById("dls-root"))})():t.hook.includes("toplevel_page_cerberus-domain-settings")?(()=>{const e=document.getElementById("dls-domain-settings-root"),t=On("dls-data");ie((()=>U(kn,{options:t})),e)})():t.hook.includes("toplevel_page_publication-approval")?(()=>{const e=document.getElementById("dls-publication-approval-root"),t=On("dls-data");ie((()=>U(zn,{options:t})),e)})():t.hook.includes(".php")||Bn()}))}();
//# sourceMappingURL=draft-live-sync-boot-0.15.4-atos.js.map
