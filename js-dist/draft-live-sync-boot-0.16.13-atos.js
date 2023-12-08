!function(){"use strict";const e=Symbol("solid-proxy"),t={equals:(e,t)=>e===t};let n=N;const r={},o={owned:null,cleanups:null,context:null,owner:null};var i=null;let l=null,s=null,a=null,c=null,d=null,u=0;function p(e,t){t&&(i=t);const n=s,r=i,l=0===e.length?o:{owned:null,cleanups:null,context:null,owner:r};let a;i=l,s=null;try{A((()=>a=e((()=>R(l)))),!0)}finally{s=n,i=r}return a}function g(e,n){n=n?Object.assign({},t,n):t;const o={value:e,observers:null,observerSlots:null,pending:r,comparator:n.equals||void 0};return[C.bind(o),e=>("function"==typeof e&&(e=e(o.pending!==r?o.pending:o.value)),j(o,e))]}function h(e,t,n){M(q(e,t,!1))}function f(e,t,r){n=E;const o=q(e,t,!1);o.user=!0,d&&d.push(o)}function v(e,n,o){o=o?Object.assign({},t,o):t;const i=q(e,n,!0);return i.pending=r,i.observers=null,i.observerSlots=null,i.state=0,i.comparator=o.equals||void 0,M(i),C.bind(i)}function m(e){if(a)return e();let t;const n=a=[];try{t=e()}finally{a=null}return A((()=>{for(let e=0;e<n.length;e+=1){const t=n[e];if(t.pending!==r){const e=t.pending;t.pending=r,j(t,e)}}}),!1),t}function b(e){let t,n=s;return s=null,t=e(),s=n,t}function y(e){f((()=>b(e)))}function w(){return s}function x(e){const t=Symbol("context");return{id:t,Provider:B(t),defaultValue:e}}function k(e){return $(i,e.id)||e.defaultValue}function S(e){const t=v(e);return v((()=>z(t())))}function C(){if(this.state&&this.sources){const e=c;c=null,1===this.state?M(this):T(this),c=e}if(s){const e=this.observers?this.observers.length:0;s.sources?(s.sources.push(this),s.sourceSlots.push(e)):(s.sources=[this],s.sourceSlots=[e]),this.observers?(this.observers.push(s),this.observerSlots.push(s.sources.length-1)):(this.observers=[s],this.observerSlots=[s.sources.length-1])}return this.value}function j(e,t,n){return e.comparator&&e.comparator(e.value,t)?t:a?(e.pending===r&&a.push(e),e.pending=t,t):(e.value=t,!e.observers||c&&!e.observers.length||A((()=>{for(let t=0;t<e.observers.length;t+=1){const n=e.observers[t];l,n.observers&&2!==n.state&&D(n),n.state=1,n.pure?c.push(n):d.push(n)}if(c.length>1e6)throw c=[],new Error}),!1),t)}function M(e){if(!e.fn)return;R(e);const t=i,n=s,r=u;s=i=e,function(e,t,n){let r;try{r=e.fn(t)}catch(e){L(e)}(!e.updatedAt||e.updatedAt<=n)&&(e.observers&&e.observers.length?j(e,r):e.value=r,e.updatedAt=n)}(e,e.value,r),s=n,i=t}function q(e,t,n,r){const l={fn:e,state:1,updatedAt:null,owned:null,sources:null,sourceSlots:null,cleanups:null,value:t,owner:i,context:null,pure:n};return null===i||i!==o&&(i.owned?i.owned.push(l):i.owned=[l]),l}function P(e){let t,n=1===e.state&&e;if(e.suspense&&b(e.suspense.inFallback))return e.suspense.effects.push(e);for(;e=e.owner;)2===e.state?t=e:1===e.state&&(n=e,t=void 0);if(t){const e=c;if(c=null,T(t),c=e,!n||1!==n.state)return}n&&M(n)}function A(e,t){if(c)return e();let r=!1;t||(c=[]),d?r=!0:d=[],u++;try{e()}catch(e){L(e)}finally{!function(e){c&&(N(c),c=null);if(e)return;d.length?m((()=>{n(d),d=null})):d=null}(r)}}function N(e){for(let t=0;t<e.length;t++)P(e[t])}function E(e){let t,n=0;for(t=0;t<e.length;t++){const r=e[t];r.user?e[n++]=r:P(r)}const r=e.length;for(t=0;t<n;t++)P(e[t]);for(t=r;t<e.length;t++)P(e[t])}function T(e){e.state=0;for(let t=0;t<e.sources.length;t+=1){const n=e.sources[t];n.sources&&(1===n.state?P(n):2===n.state&&T(n))}}function D(e){for(let t=0;t<e.observers.length;t+=1){const n=e.observers[t];n.state||(n.state=2,n.observers&&D(n))}}function R(e){let t;if(e.sources)for(;e.sources.length;){const t=e.sources.pop(),n=e.sourceSlots.pop(),r=t.observers;if(r&&r.length){const e=r.pop(),o=t.observerSlots.pop();n<r.length&&(e.sourceSlots[o]=n,r[n]=e,t.observerSlots[n]=o)}}if(e.owned){for(t=0;t<e.owned.length;t++)R(e.owned[t]);e.owned=null}if(e.cleanups){for(t=0;t<e.cleanups.length;t++)e.cleanups[t]();e.cleanups=null}e.state=0,e.context=null}function L(e){throw e}function $(e,t){return e&&(e.context&&e.context[t]||e.owner&&$(e.owner,t))}function z(e){if("function"==typeof e&&!e.length)return z(e());if(Array.isArray(e)){const t=[];for(let n=0;n<e.length;n++){const r=z(e[n]);Array.isArray(r)?t.push.apply(t,r):t.push(r)}return t}return e}function B(e){return function(t){let n;var r;return M(q((()=>n=b((()=>(i.context={[e]:t.value},S((()=>t.children)))))),r,!0)),n}}const O=Symbol("fallback");function H(e){for(let t=0;t<e.length;t++)e[t]()}function I(e,t,n={}){let r=[],o=[],l=[],s=0,a=t.length>1?[]:null;var c;return c=()=>H(l),null===i||(null===i.cleanups?i.cleanups=[c]:i.cleanups.push(c)),()=>{let i,c,d=e()||[];return b((()=>{let e,t,g,h,f,v,m,b,y,w=d.length;if(0===w)0!==s&&(H(l),l=[],r=[],o=[],s=0,a&&(a=[])),n.fallback&&(r=[O],o[0]=p((e=>(l[0]=e,n.fallback()))),s=1);else if(0===s){for(o=new Array(w),c=0;c<w;c++)r[c]=d[c],o[c]=p(u);s=w}else{for(g=new Array(w),h=new Array(w),a&&(f=new Array(w)),v=0,m=Math.min(s,w);v<m&&r[v]===d[v];v++);for(m=s-1,b=w-1;m>=v&&b>=v&&r[m]===d[b];m--,b--)g[b]=o[m],h[b]=l[m],a&&(f[b]=a[m]);for(e=new Map,t=new Array(b+1),c=b;c>=v;c--)y=d[c],i=e.get(y),t[c]=void 0===i?-1:i,e.set(y,c);for(i=v;i<=m;i++)y=r[i],c=e.get(y),void 0!==c&&-1!==c?(g[c]=o[i],h[c]=l[i],a&&(f[c]=a[i]),c=t[c],e.set(y,c)):l[i]();for(c=v;c<w;c++)c in g?(o[c]=g[c],l[c]=h[c],a&&(a[c]=f[c],a[c](c))):o[c]=p(u);o=o.slice(0,s=w),r=d.slice(0)}return o}));function u(e){if(l[c]=e,a){const[e,n]=g(c);return a[c]=n,t(d[c],e)}return t(d[c])}}}function U(e,t){return b((()=>e(t)))}function F(){return!0}const K={get:(t,n,r)=>n===e?r:t.get(n),has:(e,t)=>e.has(t),set:F,deleteProperty:F,getOwnPropertyDescriptor:(e,t)=>({configurable:!0,enumerable:!0,get:()=>e.get(t),set:F,deleteProperty:F}),ownKeys:e=>e.keys()};function J(...e){return new Proxy({get(t){for(let n=e.length-1;n>=0;n--){const r=e[n][t];if(void 0!==r)return r}},has(t){for(let n=e.length-1;n>=0;n--)if(t in e[n])return!0;return!1},keys(){const t=[];for(let n=0;n<e.length;n++)t.push(...Object.keys(e[n]));return[...new Set(t)]}},K)}function Q(e){const t="fallback"in e&&{fallback:()=>e.fallback};return v(I((()=>e.each),e.children,t||void 0))}function Y(e){let t=!1;const n=v((()=>e.when),void 0,{equals:(e,n)=>t?e===n:!e==!n});return v((()=>{const r=n();if(r){const n=e.children;return(t="function"==typeof n&&n.length>0)?b((()=>n(r))):n}return e.fallback}))}function V(e){let t=!1;const n=S((()=>e.children)),r=v((()=>{let e=n();Array.isArray(e)||(e=[e]);for(let t=0;t<e.length;t++){const n=e[t].when;if(n)return[t,n,e[t]]}return[-1]}),void 0,{equals:(e,n)=>e&&e[0]===n[0]&&(t?e[1]===n[1]:!e[1]==!n[1])&&e[2]===n[2]});return v((()=>{const[n,o,i]=r();if(n<0)return e.fallback;const l=i.children;return(t="function"==typeof l&&l.length>0)?b((()=>l(o))):l}))}function W(e){return e}const X=new Set(["className","indeterminate","value","allowfullscreen","allowpaymentrequest","async","autofocus","autoplay","checked","controls","default","disabled","formnovalidate","hidden","ismap","itemscope","loop","multiple","muted","nomodule","novalidate","open","playsinline","readonly","required","reversed","seamless","selected","truespeed"]),G=new Set(["innerHTML","textContent","innerText","children"]),Z={className:"class",htmlFor:"for"},ee=new Set(["beforeinput","click","dblclick","focusin","focusout","input","keydown","keyup","mousedown","mousemove","mouseout","mouseover","mouseup","pointerdown","pointermove","pointerout","pointerover","pointerup","touchend","touchmove","touchstart"]),te={xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace"};function ne(e,t){return v(e,void 0,t?void 0:{equals:t})}function re(e,t,n){let r=n.length,o=t.length,i=r,l=0,s=0,a=t[o-1].nextSibling,c=null;for(;l<o||s<i;)if(t[l]!==n[s]){for(;t[o-1]===n[i-1];)o--,i--;if(o===l){const t=i<r?s?n[s-1].nextSibling:n[i-s]:a;for(;s<i;)e.insertBefore(n[s++],t)}else if(i===s)for(;l<o;)c&&c.has(t[l])||e.removeChild(t[l]),l++;else if(t[l]===n[i-1]&&n[s]===t[o-1]){const r=t[--o].nextSibling;e.insertBefore(n[s++],t[l++].nextSibling),e.insertBefore(n[--i],r),t[o]=n[i]}else{if(!c){c=new Map;let e=s;for(;e<i;)c.set(n[e],e++)}const r=c.get(t[l]);if(null!=r)if(s<r&&r<i){let a,d=l,u=1;for(;++d<o&&d<i&&null!=(a=c.get(t[d]))&&a===r+u;)u++;if(u>r-s){const o=t[l];for(;s<r;)e.insertBefore(n[s++],o)}else e.replaceChild(n[s++],t[l++])}else l++;else e.removeChild(t[l++])}}else l++,s++}const oe="_$DX_DELEGATE";function ie(e,t,n){let r;return p((o=>{r=o,ge(t,e(),t.firstChild?null:void 0,n)})),()=>{r(),t.textContent=""}}function le(e,t,n){const r=document.createElement("template");r.innerHTML=e;let o=r.content.firstChild;return n&&(o=o.firstChild),o}function se(e,t=window.document){const n=t[oe]||(t[oe]=new Set);for(let r=0,o=e.length;r<o;r++){const o=e[r];n.has(o)||(n.add(o),t.addEventListener(o,fe))}}function ae(e,t,n){null==n?e.removeAttribute(t):e.setAttribute(t,n)}function ce(e,t,n,r){null==r?e.removeAttributeNS(t,n):e.setAttributeNS(t,n,r)}function de(e,t,n,r){r?Array.isArray(n)?(e[`$$${t}`]=n[0],e[`$$${t}Data`]=n[1]):e[`$$${t}`]=n:Array.isArray(n)?e.addEventListener(t,(e=>n[0](n[1],e))):e.addEventListener(t,n)}function ue(e,t,n={}){const r=Object.keys(t),o=Object.keys(n);let i,l;for(i=0,l=o.length;i<l;i++){const r=o[i];r&&"undefined"!==r&&!(r in t)&&(he(e,r,!1),delete n[r])}for(i=0,l=r.length;i<l;i++){const o=r[i],l=!!t[o];o&&"undefined"!==o&&n[o]!==l&&(he(e,o,l),n[o]=l)}return n}function pe(e,t,n={}){const r=e.style;if("string"==typeof t)return r.cssText=t;let o,i;for(i in"string"==typeof n&&(n={}),n)null==t[i]&&r.removeProperty(i),delete n[i];for(i in t)o=t[i],o!==n[i]&&(r.setProperty(i,o),n[i]=o);return n}function ge(e,t,n,r){if(void 0===n||r||(r=[]),"function"!=typeof t)return me(e,t,r,n);h((r=>me(e,t(),r,n)),r)}function he(e,t,n){const r=t.split(/\s+/);for(let t=0,o=r.length;t<o;t++)e.classList.toggle(r[t],n)}function fe(e){const t=`$$${e.type}`;let n=e.composedPath&&e.composedPath()[0]||e.target;for(e.target!==n&&Object.defineProperty(e,"target",{configurable:!0,value:n}),Object.defineProperty(e,"currentTarget",{configurable:!0,get:()=>n});null!==n;){const r=n[t];if(r&&!n.disabled){const o=n[`${t}Data`];if(void 0!==o?r(o,e):r(e),e.cancelBubble)return}n=n.host&&n.host!==n&&n.host instanceof Node?n.host:n.parentNode}}function ve(e,t,n={},r,o){return!o&&"children"in t&&h((()=>n.children=me(e,t.children,n.children))),h((()=>function(e,t,n,r,o={}){let i,l,s;for(const c in t){if("children"===c){r||me(e,t.children);continue}const d=t[c];if(d!==o[c]){if("style"===c)pe(e,d,o[c]);else if("class"!==c||n)if("classList"===c)ue(e,d,o[c]);else if("ref"===c)d(e);else if("on:"===c.slice(0,3))e.addEventListener(c.slice(3),d);else if("oncapture:"===c.slice(0,10))e.addEventListener(c.slice(10),d,!0);else if("on"===c.slice(0,2)){const t=c.slice(2).toLowerCase(),n=ee.has(t);de(e,t,d,n),n&&se([t])}else if((s=G.has(c))||!n&&(l=X.has(c))||(i=e.nodeName.includes("-")))!i||l||s?e[c]=d:e[(a=c,a.toLowerCase().replace(/-([a-z])/g,((e,t)=>t.toUpperCase())))]=d;else{const t=n&&c.indexOf(":")>-1&&te[c.split(":")[0]];t?ce(e,t,c,d):ae(e,Z[c]||c,d)}else e.className=d;o[c]=d}}var a}(e,t,r,!0,n))),n}function me(e,t,n,r,o){for(;"function"==typeof n;)n=n();if(t===n)return n;const i=typeof t,l=void 0!==r;if(e=l&&n[0]&&n[0].parentNode||e,"string"===i||"number"===i)if("number"===i&&(t=t.toString()),l){let o=n[0];o&&3===o.nodeType?o.data=t:o=document.createTextNode(t),n=we(e,n,r,o)}else n=""!==n&&"string"==typeof n?e.firstChild.data=t:e.textContent=t;else if(null==t||"boolean"===i)n=we(e,n,r);else{if("function"===i)return h((()=>{let o=t();for(;"function"==typeof o;)o=o();n=me(e,o,n,r)})),()=>n;if(Array.isArray(t)){const i=[];if(be(i,t,o))return h((()=>n=me(e,i,n,r,!0))),()=>n;if(0===i.length){if(n=we(e,n,r),l)return n}else Array.isArray(n)?0===n.length?ye(e,i,r):re(e,n,i):null==n||""===n?ye(e,i):re(e,l&&n||[e.firstChild],i);n=i}else if(t instanceof Node){if(Array.isArray(n)){if(l)return n=we(e,n,r,t);we(e,n,null,t)}else null!=n&&""!==n&&e.firstChild?e.replaceChild(t,e.firstChild):e.appendChild(t);n=t}}return n}function be(e,t,n){let r=!1;for(let o=0,i=t.length;o<i;o++){let i,l=t[o];if(l instanceof Node)e.push(l);else if(null==l||!0===l||!1===l);else if(Array.isArray(l))r=be(e,l)||r;else if("string"==(i=typeof l))e.push(document.createTextNode(l));else if("function"===i)if(n){for(;"function"==typeof l;)l=l();r=be(e,Array.isArray(l)?l:[l])||r}else e.push(l),r=!0;else e.push(document.createTextNode(l.toString()))}return r}function ye(e,t,n){for(let r=0,o=t.length;r<o;r++)e.insertBefore(t[r],n)}function we(e,t,n,r){if(void 0===n)return e.textContent="";const o=r||document.createTextNode("");if(t.length){let r=!1;for(let i=t.length-1;i>=0;i--){const l=t[i];if(o!==l){const t=l.parentNode===e;r||i?t&&e.removeChild(l):t?e.replaceChild(o,l):e.insertBefore(o,n)}else r=!0}}else e.insertBefore(o,n);return[o]}const xe=Symbol("store-raw"),ke=Symbol("store-node"),Se=Symbol("store-name");function Ce(t,n){let r=t[e];if(!r){Object.defineProperty(t,e,{value:r=new Proxy(t,Ae)});const n=Object.keys(t),o=Object.getOwnPropertyDescriptors(t);for(let e=0,i=n.length;e<i;e++){const i=n[e];if(o[i].get){const e=o[i].get.bind(r);Object.defineProperty(t,i,{get:e})}}}return r}function je(e){return null!=e&&"object"==typeof e&&(!e.__proto__||e.__proto__===Object.prototype||Array.isArray(e))}function Me(e,t=new Set){let n,r,o,i;if(n=null!=e&&e[xe])return n;if(!je(e)||t.has(e))return e;if(Array.isArray(e)){Object.isFrozen(e)?e=e.slice(0):t.add(e);for(let n=0,i=e.length;n<i;n++)o=e[n],(r=Me(o,t))!==o&&(e[n]=r)}else{Object.isFrozen(e)?e=Object.assign({},e):t.add(e);const n=Object.keys(e),l=Object.getOwnPropertyDescriptors(e);for(let s=0,a=n.length;s<a;s++)i=n[s],l[i].get||(o=e[i],(r=Me(o,t))!==o&&(e[i]=r))}return e}function qe(e){let t=e[ke];return t||Object.defineProperty(e,ke,{value:t={}}),t}function Pe(){const[e,t]=g(void 0,{equals:!1});return e.$=t,e}const Ae={get(t,n,r){if(n===xe)return t;if(n===e)return r;const o=t[n];if(n===ke||"__proto__"===n)return o;const i=je(o);if(w()&&("function"!=typeof o||t.hasOwnProperty(n))){let e,r;i&&(e=qe(o))&&(r=e._||(e._=Pe()),r()),e=qe(t),r=e[n]||(e[n]=Pe()),r()}return i?Ce(o):o},set:()=>!0,deleteProperty:()=>!0,ownKeys:function(e){if(w()){const t=qe(e);(t._||(t._=Pe()))()}return Reflect.ownKeys(e)},getOwnPropertyDescriptor:function(t,n){const r=Reflect.getOwnPropertyDescriptor(t,n);return!r||r.get||n===e||n===ke||n===Se||(delete r.value,delete r.writable,r.get=()=>t[e][n]),r}};function _e(e,t,n){if(e[t]===n)return;const r=Array.isArray(e),o=e.length,i=void 0===n,l=r||i===t in e;i?delete e[t]:e[t]=n;let s,a=qe(e);(s=a[t])&&s.$(),r&&e.length!==o&&(s=a.length)&&s.$(s,void 0),l&&(s=a._)&&s.$(s,void 0)}function Ne(e,t,n=[]){let r,o=e;if(t.length>1){r=t.shift();const i=typeof r,l=Array.isArray(e);if(Array.isArray(r)){for(let o=0;o<r.length;o++)Ne(e,[r[o]].concat(t),[r[o]].concat(n));return}if(l&&"function"===i){for(let o=0;o<e.length;o++)r(e[o],o)&&Ne(e,[o].concat(t),[o].concat(n));return}if(l&&"object"===i){const{from:o=0,to:i=e.length-1,by:l=1}=r;for(let r=o;r<=i;r+=l)Ne(e,[r].concat(t),[r].concat(n));return}if(t.length>1)return void Ne(e[r],t,[r].concat(n));o=e[r],n=[r].concat(n)}let i=t[0];"function"==typeof i&&(i=i(o,n),i===o)||void 0===r&&null==i||(i=Me(i),void 0===r||je(o)&&je(i)&&!Array.isArray(i)?function(e,t){const n=Object.keys(t);for(let r=0;r<n.length;r+=1){const o=n[r];_e(e,o,t[o])}}(o,i):_e(e,r,i))}function Ee(e,t){const n=Me(e||{});return[Ce(n),function(...e){m((()=>Ne(n,e)))}]}const Te=x([{path:"start"},{}]);function De(e){const t=location.hash.replace(/#/,"")||"start",[n,r]=Ee({path:t});window.addEventListener("popstate",(e=>{const t=e.target.location.hash.replace(/#/,"");r({...n,path:t})}));const o=[n,{apiUrl:e.values.api}];return U(Te.Provider,{value:o,get children(){return e.children}})}let Re={data:""},Le=e=>"object"==typeof window?((e?e.querySelector("#_goober"):window._goober)||Object.assign((e||document.head).appendChild(document.createElement("style")),{innerHTML:" ",id:"_goober"})).firstChild:e||Re,$e=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(})/g,ze=/\/\*[^]*?\*\/|\s\s+|\n/g,Be=(e,t)=>{let n,r="",o="",i="";for(let l in e){let s=e[l];"object"==typeof s?(n=t?t.replace(/([^,])+/g,(e=>l.replace(/([^,])+/g,(t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)))):l,o+="@"==l[0]?"f"==l[1]?Be(s,l):l+"{"+Be(s,"k"==l[1]?"":t)+"}":Be(s,n)):"@"==l[0]&&"i"==l[1]?r=l+" "+s+";":(l=l.replace(/[A-Z]/g,"-$&").toLowerCase(),i+=Be.p?Be.p(l,s):l+":"+s+";")}return i[0]?(n=t?t+"{"+i+"}":i,r+n+o):r+o},Oe={},He=e=>{let t="";for(let n in e)t+=n+("object"==typeof e[n]?He(e[n]):e[n]);return t},Ie=(e,t,n,r,o)=>{let i="object"==typeof e?He(e):e,l=Oe[i]||(Oe[i]=(e=>{let t=0,n=11;for(;t<e.length;)n=101*n+e.charCodeAt(t++)>>>0;return"go"+n})(i));if(!Oe[l]){let t="object"==typeof e?e:(e=>{let t,n=[{}];for(;t=$e.exec(e.replace(ze,""));)t[4]&&n.shift(),t[3]?n.unshift(n[0][t[3]]=n[0][t[3]]||{}):t[4]||(n[0][t[1]]=t[2]);return n[0]})(e);Oe[l]=Be(o?{["@keyframes "+l]:t}:t,n?"":"."+l)}return((e,t,n)=>{-1==t.data.indexOf(e)&&(t.data=n?e+t.data:t.data+e)})(Oe[l],t,r),l},Ue=(e,t,n)=>e.reduce(((e,r,o)=>{let i=t[o];if(i&&i.call){let e=i(n),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;i=t?"."+t:e&&"object"==typeof e?e.props?"":Be(e,""):e}return e+r+(null==i?"":i)}),"");function Fe(e){let t=this||{},n=e.call?e(t.p):e;return Ie(n.unshift?n.raw?Ue(n,[].slice.call(arguments,1),t.p):n.reduce(((e,n)=>n?Object.assign(e,n.call?n(t.p):n):e),{}):n,Le(t.target),t.g,t.o,t.k)}Fe.bind({g:1});let Ke=Fe.bind({k:1});const Je=x();function Qe(e){let t=this||{};return(...n)=>{const r=r=>{const o=J(r,{theme:k(Je)}),i=J(o,{get className(){const e=o.className,r="className"in o&&/^go[0-9]+/.test(e);return[e,Fe.apply({target:t.target,o:r,p:o,g:t.g},n)].filter(Boolean).join(" ")}}),[l,s]=function(e,...t){const n=new Set(t.flat()),r=Object.getOwnPropertyDescriptors(e),o=t.map((t=>{const n={};for(let o=0;o<t.length;o++){const i=t[o];Object.defineProperty(n,i,r[i]?r[i]:{get:()=>e[i]})}return n}));return o.push(new Proxy({get:t=>n.has(t)?void 0:e[t],has:t=>!n.has(t)&&t in e,keys:()=>Object.keys(e).filter((e=>!n.has(e)))},K)),o}(i,["as"]),a=l.as||e;let c;var d,u,p,g;return"function"==typeof a?c=a(s):(c=document.createElement(a),d=c,"function"==typeof(u=s)?h((e=>ve(d,u(),e,p,g))):ve(d,u,void 0,p,g)),c};return r.className=e=>b((()=>Fe.apply({target:t.target,p:e,g:t.g},n))),r}}const Ye=Qe("nav")`
    color: black;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 2rem;
`,Ve=Qe("a")`
    font-size: 14px;
    display: block;
    padding: 0 1rem;
`,We=()=>(k(Te),U(Ye,{get children(){return[U(Ve,{href:"#start",children:"Start"}),U(Ve,{href:"#sync-check",children:"Sync Check"}),U(Ve,{href:"#sync-draft",children:"Sync Draft"}),U(Ve,{href:"#sync-live",children:"Sync Live"})]}})),Xe=async(e,t={})=>new Promise(((n,r)=>{jQuery.ajax({url:"/wp-admin/admin-ajax.php",type:"post",dataType:"json",data:{action:e,...t},success:function(e){n(e)},error:(e,t)=>{r(t)}})})),Ge=async(e,t)=>new Promise(((n,r)=>{jQuery.ajax({url:e,type:t?"post":"get",dataType:"json",data:t,success:function(e){n(e)},error:(e,t)=>{r(e.responseJSON||t)}})})),Ze=Qe("div")`
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
`,st=Qe("h3")`
    font-size: 18px;
    margin-bottom: .5rem;
    margin-top: 0px;
`,at=e=>U(tt,{get children(){return[U(nt,{get children(){return[U(lt,{get children(){return e.title}}),U(ot,{get children(){return e.description}})]}}),U(rt,{get children(){return e.actions}})]}});Qe("svg")`
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
`,mt=Qe("div")`
    background-color: #2271b1;
    font-size: 10px;
    color: white;
    padding: 0px 4px 0px 4px;
    height: 16px;
    line-height: 15px;
    margin: 0 5px 0 0;
    border-radius: 2px;
    cursor: pointer;
`,bt=Qe("a")`
    display: block;
    color: grey;
    text-decoration: none;
`,yt=Qe("div")`
    padding: 0 5px 0 0;
    svg {
        fill: ${e=>e.color};
        transition: fill .2s ease-in;
    }
`,wt=le('<svg height="10" width="10"><circle cx="5" cy="5" r="5" stroke-width="0"></circle></svg>'),xt=({showCheckButton:e,showSyncButton:t,showDraft:n,showLive:r,item:o,onClick:i,onTypeClick:l,getAllTargetsContent:s})=>{const a=(e,t)=>{let n="#bbbbbb";return"error"===t?n="#da694b":""===t?n="#bbbbbb":e&&(n=e.synced?"#99da4b":"#e9da4e"),n},c=async()=>{console.log("Item: ",o);try{const e=await s();console.log(e)}catch(e){console.log("Error logging diff: ",e)}};return U(ft,{get children(){return[U(Y,{when:n,get children(){return U(yt,{get color(){var e,t;return a(null===(e=o.status)||void 0===e?void 0:e.draft,null===(t=o.status)||void 0===t?void 0:t.state)},get children(){return wt.cloneNode(!0)}})}}),U(Y,{when:r,get children(){return U(yt,{get color(){var e,t;return a(null===(e=o.status)||void 0===e?void 0:e.live,null===(t=o.status)||void 0===t?void 0:t.state)},get children(){return wt.cloneNode(!0)}})}}),U(Y,{when:t,get children(){return U(mt,{onClick:i,children:"sync"})}}),U(Y,{when:e,get children(){return U(mt,{onClick:i,children:"check"})}}),U(Y,{when:e,get children(){return U(mt,{onClick:c,children:"log"})}}),U(vt,{onClick:l,get children(){return o.type}}),U(bt,{target:"_new",get href(){return o.permalink},get children(){return o.permalink||"/"}})]}})},kt=({type:e})=>{const[t,{apiUrl:n}]=k(Te),[r,o]=Ee({list:[]}),[i,l]=g(!1);f((async()=>{const e=(await Xe("get_all_resources")).list.map(((e,t)=>({...e,index:t})));o({list:e})}));const s=async t=>{try{(await Ge(`${n}/sync.php`,{action:"sync",permalink:t.permalink,release:e,sync_check:!1})).data?o("list",t.index,"status",{[e]:{synced:!0},state:"loaded"}):o("list",t.index,"status",{state:"error"})}catch(e){o("list",t.index,"status",{state:"error"})}},a="draft"===e?"Begin to sync to Draft":"Publish everything to Live",c="draft"===e?"Sync Draft":"Sync Live",d="draft"===e?"This is where you can make sure that wordpress and the draft content is in sync":"This is where you can make sure that Draft and Live are in sync";return U(et,{get children(){return[U(at,{title:c,description:d,get actions(){return U(ht,{get loading(){return i()},onClick:()=>(async()=>{if(i())return;let t=!1;if(("live"===e&&confirm("Do you really which to publish everything?")||"draft"===e)&&(t=!0),t){l(!0),r.list.forEach(((e,t)=>{o("list",t,"status",{state:""}),t++}));for await(let e of r.list)await s(e);l(!1)}})(),children:a})}}),U(Q,{get each(){return r.list},children:t=>U(xt,{showDraft:"draft"===e,showLive:"live"===e,showSyncButton:!0,onClick:()=>(async e=>{l(!0),await s(e),l(!1)})(t),onTypeClick:()=>(async e=>{l(!0);const t=r.list.filter((t=>t.type===e));t.forEach(((e,t)=>{o("list",t,"status",{state:""}),t++}));for await(let e of t)await s(e);l(!1)})(t.type),item:t,get permalink(){return t.permalink}})})]}})},St=()=>{const[e,{apiUrl:t}]=k(Te),[n,r]=Ee({list:[]}),[o,i]=g(!1);console.log(t),f((async()=>{const e=(await Xe("get_all_resources")).list.map(((e,t)=>({...e,index:t})));r({list:e})}));const l=async e=>{try{const n=await Ge(`${t}/check-sync.php`,{permalink:e.permalink});r("list",e.index,"status",{draft:n.data.resourceStatus.find((e=>"draft"===e.target&&"__original"===e.comparedTo)),live:n.data.resourceStatus.find((e=>"live"===e.target&&"draft"===e.comparedTo)),state:"loaded"})}catch(t){r("list",e.index,"status",{state:"error"})}};return U(et,{get children(){return[U(at,{title:"Sync Check",description:"This is where you can check if all content is in sync",get actions(){return U(ht,{get loading(){return o()},onClick:()=>(async()=>{if(!o()){i(!0),n.list.forEach(((e,t)=>{r("list",t,"status",{state:""}),t++}));for await(let e of n.list)await l(e);i(!1)}})(),children:"Begin to check"})}}),U(Q,{get each(){return n.list},children:e=>U(xt,{showDraft:!0,showLive:!0,showCheckButton:!0,item:e,getAllTargetsContent:()=>(async e=>await Ge(`${t}/get-all-targets-content.php`,{permalink:e}))(e.permalink),get permalink(){return e.permalink},onClick:()=>(async e=>{i(!0),await l(e),i(!1)})(e),onTypeClick:()=>(async e=>{i(!0);const t=n.list.filter((t=>t.type===e));t.forEach(((e,t)=>{r("list",t,"status",{state:""}),t++}));for await(let e of t)await l(e);i(!1)})(e.type)})})]}})},Ct=Qe("p")`
    font-size: 14px;
    padding-bottom: .5rem;
    background-color: #ffeaee;
    border: 2px solid #ffc0cb;
    border-radius: 3px;
    padding: 1rem 2rem;
    text-align: center;
`,jt=()=>U(et,{get children(){return[U(at,{title:"Start",description:"This plugin lets you control and debug content through the content service."}),U(Ct,{children:"This is mainly used while developing or by admins!"})]}}),Mt=Qe("div")`
     color: black;
     max-width: 1200px;
     margin: 0 auto;
`;Qe("div")`
`,Qe("div")`
    font-size: 1rem;
    padding: 1rem 0;
`;const qt=()=>{const[e]=k(Te);return U(Mt,{get children(){return[U(it,{children:"Content Dashboard"}),U(We,{}),U(Y,{get when(){return"start"===e.path},get children(){return U(jt,{})}}),U(Y,{get when(){return"sync-check"===e.path},get children(){return U(St,{})}}),U(Y,{get when(){return"sync-draft"===e.path},get children(){return U(kt,{type:"draft"})}}),U(Y,{get when(){return"sync-live"===e.path},get children(){return U(kt,{type:"live"})}})]}})},Pt=Qe("div")`

    padding-top: 6px;

    ${e=>e.horizontal?"\n        display: flex;   \n        align-items: center;\n        border-bottom: 1px dotted grey;\n        padding: 0 10px 8px 10px;\n        margin-left: -10px;\n        margin-right: -10px;\n        justify-content: flex-end;\n    ":""} 

    ${e=>e.box?"\n        position: relative;\n        min-width: 255px;\n        border: 1px solid #ccd0d4;\n        box-shadow: 0 1px 1px rgb(0 0 0 / 4%);\n        background: #fff;\n        padding: 1rem;\n        box-sizing: border-box;\n        margin-bottom: 7px;\n    ":""}

`,At=Qe("div")`
    color: red;
    padding-top: 0.4rem;
`,_t=Qe("div")`
    color: darkgray;
    padding-top: 0.4rem;
`,Nt=Qe("div")`
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

`,Et=Qe("div")`
    text-align: center;
    min-width: 100px;
    ${e=>e.horizontal?"\n        margin-top: 10px;\n    ":""}

`,[Tt,Dt]=Ee({options:{},setChecking:()=>!0,syncStatus:{},publish:()=>null,changesNotSavedToDraft:!1,showRejectionControls:!1,rejectionReason:"",approvalStatus:"",errorMessage:"",approvedBy:""}),Rt=e=>{Dt({approvalStatus:e})},Lt=()=>{Dt((e=>({showRejectionControls:!e.showRejectionControls})))},$t=async(e="")=>{Tt.setChecking(!0);const t=await(async e=>{try{var t;return await Ge(`${Tt.options.api}/upsert-publication-request.php`,{permalink:Tt.options.permalink,status:e,editorUrl:null===(t=window)||void 0===t?void 0:t.location.href,approvedBy:"approved"===e?Tt.options.userName:"",rejectedBy:"rejected"===e?Tt.options.userName:"",requestedBy:"pending"===e?Tt.options.userName:Tt.requestedBy,rejectionReason:Tt.rejectionReason}),{}}catch(e){return console.log("Error upserting publication request",e),{err:e}}})(e);t.err?(Dt({errorMessage:"Error changing status to "+e}),console.log("Err upserting request",t.err)):Rt(e),Tt.setChecking(!1),"approved"!==e&&"rejected"!==e||zt()},zt=async()=>{const{postTitle:e,rejectionReason:t,approvalStatus:n,editorEmail:r}=Tt,{userName:o,siteTitle:i}=Tt.options;try{var l;await Ge(`${Tt.options.api}/send-publication-approval-email.php`,{data:{useCustomMailSystem:Tt.options.useCustomSmtp,postTitle:e,rejectionReason:t,approvalStatus:n,admin:o,editorEmail:r,siteTitle:i,postUrl:null===(l=window)||void 0===l?void 0:l.location.href}})}catch(e){console.log("Error sending email")}},Bt=async()=>{Tt.setChecking(!0);const e=await(async()=>{console.log("Deleting pub request for "+Tt.options.permalink+": ",Tt);try{var e,t;const o=await Ge(`${Tt.options.api}/delete-publication-request.php`,{postId:Tt.options.postId});var n,r;return null!=o&&null!==(e=o.data)&&void 0!==e&&null!==(t=e.deleteResource)&&void 0!==t&&t.success||console.log("Unable to delete publication request because: ",null==o||null===(n=o.errors)||void 0===n||null===(r=n[0])||void 0===r?void 0:r.message),{}}catch(e){return console.log("Error deleting request",e),{err:e}}})();e.err?(Dt({errorMessage:"Something went wrong withdrawing publication request"}),console.log("Err deleting request",e.err)):Rt(""),Tt.setChecking(!1)},Ot=le("<em></em>"),Ht=Qe("div")`
    padding: 0.25rem;
    background: #fefbe6;
`,It=()=>U(V,{get children(){return[U(W,{get when(){return"pending"===Tt.approvalStatus},get children(){return U(Et,{get horizontal(){return Tt.options.metaMenu},children:"Pending approval"})}}),U(W,{get when(){return"approved"===Tt.approvalStatus},get children(){return U(Et,{get horizontal(){return Tt.options.metaMenu},get children(){return["Publication approved ",ne((()=>Tt.approvedBy?" by "+Tt.approvedBy:""))]}})}}),U(W,{get when(){return"rejected"===Tt.approvalStatus},get children(){return[U(Et,{get horizontal(){return Tt.options.metaMenu},get children(){return["Publication rejected ",ne((()=>Tt.rejectedBy?" by "+Tt.rejectedBy:""))]}}),U(Y,{get when(){return Tt.rejectionReason},get children(){return U(Ht,{get children(){const e=Ot.cloneNode(!0);return ge(e,(()=>Tt.rejectionReason)),e}})}})]}})]}}),Ut=()=>U(ht,{get leftMargin(){return Tt.options.metaMenu},get loading(){return Tt.publishing},onClick:e=>Tt.publish(e),get disabled(){return Tt.changesNotSavedToDraft},get children(){var e,t,n;return Tt.changesNotSavedToDraft?null!==(e=Tt.syncStatus.live)&&void 0!==e&&e.exists?"Save draft before updating on live":"Save draft before publishing to live":null!==(t=Tt.syncStatus.live)&&void 0!==t&&t.exists?null!==(n=Tt.syncStatus.live)&&void 0!==n&&n.synced?"Updated on live site":"Update on live site":"Publish to live site"}}),Ft=le('<div><h4>Rejection reason</h4><textarea rows="4" placeholder="Message to the editor" maxlength="200"></textarea><div></div></div>'),Kt=()=>[U(ht,{get leftMargin(){return Tt.options.metaMenu},onClick:e=>$t("approved"),get disabled(){return Tt.showRejectionControls},children:"Approve "}),U(Y,{get when(){return!Tt.showRejectionControls},get children(){return U(ht,{get leftMargin(){return Tt.options.metaMenu},onClick:e=>{Lt()},get disabled(){return Tt.showRejectionControls},children:"Reject"})}}),U(Y,{get when(){return Tt.showRejectionControls},get children(){const e=Ft.cloneNode(!0),t=e.firstChild,n=t.nextSibling,r=n.nextSibling;return e.style.setProperty("margin-block","1.5rem"),t.style.setProperty("margin-bottom",0),n.addEventListener("change",(e=>{var t;t=e.target.value,Dt({rejectionReason:t})})),n.style.setProperty("width","100%"),n.style.setProperty("margin-top","0.5rem"),r.style.setProperty("display","flex"),ge(r,U(ht,{get leftMargin(){return Tt.options.metaMenu},onClick:e=>Lt(),disabled:!1,style:{"margin-top":0,"margin-right":"0.2rem"},children:"Cancel"}),null),ge(r,U(ht,{get leftMargin(){return Tt.options.metaMenu},onClick:e=>$t("rejected"),disabled:!1,style:{"margin-top":0},children:"Send rejection"}),null),e}}),U(Y,{get when(){return!Tt.showRejectionControls},get children(){return U(Ut,{})}})],Jt=le("<div><h5>Dev mode</h5></div>"),Qt=()=>(()=>{const e=Jt.cloneNode(!0);return e.firstChild,e.style.setProperty("background","lightgray"),e.style.setProperty("padding","0.5rem"),ge(e,U(ht,{get leftMargin(){return Tt.options.metaMenu},onClick:e=>$t("approved"),disabled:!1,children:"Approve"}),null),ge(e,U(ht,{get leftMargin(){return Tt.options.metaMenu},onClick:e=>$t("rejected"),disabled:!1,children:"Reject"}),null),ge(e,U(ht,{get leftMargin(){return Tt.options.metaMenu},onClick:e=>$t("pending"),get disabled(){return Tt.changesNotSavedToDraft},children:"Set to pending"}),null),e})(),Yt=()=>[U(Y,{get when(){return""===Tt.approvalStatus},get children(){return[U(Y,{get when(){return Tt.options.userHasPublicationRights},get children(){return U(Ut,{})}}),U(Y,{get when(){return!Tt.options.userHasPublicationRights},get children(){return U(ht,{get leftMargin(){return Tt.options.metaMenu},onClick:e=>$t("pending"),get disabled(){return Tt.changesNotSavedToDraft},get children(){return Tt.changesNotSavedToDraft?"Save draft before publishing request":"Request approval to publish"}})}})]}}),U(Y,{when:false,get children(){return U(Qt,{})}}),U(Y,{get when(){return"pending"===Tt.approvalStatus},get children(){return[U(Y,{get when(){return Tt.options.userHasPublicationRights},get children(){return U(Kt,{})}}),U(Y,{get when(){return!Tt.options.userHasPublicationRights},get children(){return U(ht,{get leftMargin(){return Tt.options.metaMenu},onClick:e=>Bt(),disabled:!1,children:"Withdraw publication request"})}})]}}),U(Y,{get when(){return"approved"===Tt.approvalStatus},get children(){return[U(Y,{get when(){return Tt.options.userHasPublicationRights},get children(){return U(Ut,{})}}),U(Y,{get when(){return!Tt.options.userHasPublicationRights},get children(){return U(ht,{get leftMargin(){return Tt.options.metaMenu},get loading(){return Tt.publishing},onClick:e=>Tt.publish(e),get disabled(){return Tt.changesNotSavedToDraft},get children(){return Tt.changesNotSavedToDraft?"Discard unapproved changes to publish":"Publish to live site"}})}})]}}),U(Y,{get when(){return"rejected"===Tt.approvalStatus},get children(){return U(Y,{get when(){return Tt.options.userHasPublicationRights},get children(){return U(Ut,{})}})}})],Vt=()=>U(Y,{get when(){return"pending"===Tt.approvalStatus&&Tt.changesNotSavedToDraft},get children(){return U(_t,{children:"Saving a new draft will automatically withdraw the pending publication approval"})}}),Wt=()=>[U(Y,{get when(){return""===Tt.approvalStatus},get children(){return[U(Y,{get when(){return Tt.options.userHasPublicationRights},get children(){return U(ht,{get leftMargin(){return Tt.options.metaMenu},get loading(){return Tt.publishing},onClick:e=>Tt.publish(e),get disabled(){var e;return(null===(e=Tt.syncStatus.live)||void 0===e?void 0:e.synced)||Tt.changesNotSavedToDraft},get children(){var e;return Tt.changesNotSavedToDraft?"Save draft before updating on live":null!==(e=Tt.syncStatus.live)&&void 0!==e&&e.synced?"Updated on live site":"Update on live site"}})}}),U(Y,{get when(){return!Tt.options.userHasPublicationRights},get children(){return U(ht,{get leftMargin(){return Tt.options.metaMenu},get loading(){return Tt.publishing},onClick:e=>$t("pending"),get disabled(){var e;return(null===(e=Tt.syncStatus.live)||void 0===e?void 0:e.synced)||Tt.changesNotSavedToDraft},get children(){var e;return Tt.changesNotSavedToDraft?"Save draft before requesting publication approval":null!==(e=Tt.syncStatus.live)&&void 0!==e&&e.synced?"Updated on live site":"Request approval to publish"}})}})]}}),U(Y,{get when(){return"pending"===Tt.approvalStatus},get children(){return[U(Y,{get when(){return Tt.options.userHasPublicationRights},get children(){return U(Kt,{})}}),U(Y,{get when(){return!Tt.options.userHasPublicationRights},get children(){return U(ht,{get leftMargin(){return Tt.options.metaMenu},onClick:e=>Bt(),disabled:!1,children:"Withdraw publication request"})}})]}}),U(Y,{get when(){return"approved"===Tt.approvalStatus},get children(){return[U(Y,{get when(){return Tt.options.userHasPublicationRights},get children(){return U(ht,{get leftMargin(){return Tt.options.metaMenu},get loading(){return Tt.publishing},onClick:e=>Tt.publish(e),get disabled(){var e;return(null===(e=Tt.syncStatus.live)||void 0===e?void 0:e.synced)||Tt.changesNotSavedToDraft},get children(){var e;return Tt.changesNotSavedToDraft?"Save draft before publishing to live":null!==(e=Tt.syncStatus.live)&&void 0!==e&&e.synced?"Updated on live site":"Update on live site"}})}}),U(Y,{get when(){return!Tt.options.userHasPublicationRights},get children(){return U(ht,{get leftMargin(){return Tt.options.metaMenu},get loading(){return Tt.publishing},onClick:e=>Tt.publish(e),get disabled(){var e;return(null===(e=Tt.syncStatus.live)||void 0===e?void 0:e.synced)||Tt.changesNotSavedToDraft},get children(){var e;return Tt.changesNotSavedToDraft?"Save to draft or discard unapproved changes to publish":null!==(e=Tt.syncStatus.live)&&void 0!==e&&e.synced?"Updated on live site":"Update on live site"}})}})]}}),U(Y,{get when(){return"rejected"===Tt.approvalStatus},get children(){return U(Y,{get when(){return!Tt.options.userHasPublicationRights},get children(){return U(ht,{get leftMargin(){return Tt.options.metaMenu},onClick:e=>null,disabled:!0,get children(){return Tt.changesNotSavedToDraft?"Save draft before requesting publication approval":"Make changes before requesting approval to publish"}})}})}})],Xt=({options:e})=>{const[t,n]=Ee({}),[r,o]=g(!0),[i,l]=g(!1),[s,a]=g(!1),[c,d]=g(!1),[u,p]=g(!1),[h,v]=g(!1),[m,b]=g(!1),[w,x]=g(!1),[k,S]=g(!1),[C,j]=g(null);let M,q,P={permalink:e.permalink};const A=!e.metaMenu&&!e.optionsMeta;y((()=>{if(!A)return;e.requireApproval&&Dt({options:e,setChecking:o,syncStatus:t,publish:e=>z(e)});setTimeout((()=>{const e="_new",t=document.createElement("a");t.classList.add("components-button"),t.classList.add("is-secondary"),"auto-draft"===wp.data.select("core/editor").getCurrentPost().status&&(t.style.display="none"),t.innerHTML="Preview",j(t),document.querySelector(".edit-post-header__settings").prepend(t),t.addEventListener("click",(function(t){const n=wp.data.select("core/editor").getEditedPostPreviewLink();wp.data.select("core/editor").isEditedPostDirty()?(t.preventDefault(),t.stopPropagation(),wp.data.dispatch("core/editor").savePost({isPreview:!0}).then((()=>{window.open(n,e)}))):window.open(n,e)}))}),500)})),f((()=>{var t,n;e.metaMenu?(q=document.querySelector("#save_menu_footer"),T()):null!==(t=wp)&&void 0!==t&&null!==(n=t.data)&&void 0!==n&&n.select&&(M=wp.data.select("core/editor"),wp.domReady(N))})),f((()=>{wp&&wp.hooks&&wp.hooks.addAction&&(R(),wp.hooks.addAction("dls.post-saved","dls",(()=>{var e,n,r;if(null!=t&&null!==(e=t.draft)&&void 0!==e&&e.exists||null===(n=M)||void 0===n||!n.isPublishingPost())null!=t&&null!==(r=t.draft)&&void 0!==r&&r.exists&&(N(),R());else{let e=0;const t=()=>{const e=M.getPermalink(),t=/http(s|):\/\/(.*?)(\/[\w\/-]*)\//gm.exec(e);return t?t[3]:""},n=()=>{if("auto-draft"!==M.getCurrentPost().status)return P={permalink:t()},p(!1),C().style.display="flex",void R();e++<=50&&setTimeout(n,100)};n()}})))})),f((()=>{let e;document.addEventListener("cerberusListenerEvent",(t=>{var n;null!=t&&null!==(n=t.detail)&&void 0!==n&&n.hasChange&&(e||(e=document.querySelector(".editor-post-publish-button"),e.addEventListener("click",(()=>{b(!1),e.setAttribute("disabled",!0),window.onbeforeunload=null}))),e&&(b(!0),e.removeAttribute("disabled"),window.onbeforeunload=()=>!0))}))}));const N=()=>{let e;const t=wp.data.subscribe(_.debounce((()=>{e||(e=document.querySelector(".editor-post-publish-button"));const n=M.isEditedPostDirty(),r=M.hasNonPostEntityChanges(),o=m();r||n||o?(p(!0),e&&e.addEventListener("click",E),e&&e.removeAttribute("disabled"),t()):(p(!1),e&&e.removeEventListener("click",E),e&&e.setAttribute("disabled",!0))}),100))},E=()=>{""!==Tt.approvalStatus&&A&&e.requireApproval&&Tt.options.requireApproval&&Bt()},T=()=>{let e,t=!1;q.setAttribute("disabled",!0);let n=()=>{t||clearInterval(e)},r=()=>{t||(e=o())};const o=()=>setInterval((()=>{var o,i;null!==(o=window)&&void 0!==o&&null!==(i=o.wpNavMenu)&&void 0!==i&&i.menusChanged&&(t=!0,D(),clearInterval(e),window.removeEventListener("blur",n),window.removeEventListener("focus",r))}),500);e=o(),window.addEventListener("blur",n),window.addEventListener("focus",r)},D=()=>{q.removeAttribute("disabled"),v(!0)},R=async(r=!0)=>{r&&(o(!0),await new Promise((e=>setTimeout(e,1e3))));try{var i;const r=await Xe("check_sync",{...P,api_path:P.permalink});if(null==r||null===(i=r.data)||void 0===i||!i.resourceStatus)throw P;n({draft:r.data.resourceStatus.find((e=>"draft"===e.target&&"__original"===e.comparedTo)),live:r.data.resourceStatus.find((e=>"live"===e.target&&"draft"===e.comparedTo)),state:"loaded"}),console.log("status: ",t),S(!1),A&&e.requireApproval&&(async()=>{try{var e;const t=await Ge(`${Tt.options.api}/get-publication-request.php`,{postId:Tt.options.postId});if(null!==(e=t.data.resource)&&void 0!==e&&e.content){const e=t.data.resource.content;Dt({approvalStatus:e.status,approvedBy:e.approvedBy,rejectedBy:e.rejectedBy,rejectionReason:e.rejectionReason||"",requestedBy:e.requestedBy,editorEmail:e.from_user_email,postTitle:e.post_title,siteTitle:e.from_site_name}),console.log(`Publication request for ${Tt.options.permalink}: `,Tt)}else console.log("No publication request found for:",Tt.options.permalink),Rt("")}catch(e){console.log("Error fetching publication request",e)}})(),e.metaMenu&&L()}catch(e){console.log("--- meta-box --- Can't find any data with check-sync of payload: ",e),S(!0),o(!1),n({state:"error"})}o(!1)},L=async()=>{var e;const n=document.querySelectorAll(".menu-theme-locations > .menu-settings-input"),r=document.querySelector(".menu-settings-group.menu-theme-locations"),o=document.createElement("i");o.classList.add("changes-disabled-message");const i=null===(e=t.draft)||void 0===e?void 0:e.exists,l=t.live&&t.live.exists;!i||l?(r.style.pointerEvents="none",r.style.cursor="not-allowed",r.style.opacity=.5):(r.style.pointerEvents="auto",r.style.cursor="default",r.style.opacity=1);const s=document.querySelector(".changes-disabled-message");if(l){const e="Menu must be unpublished before toggling location";s?s.innerHTML=e:(o.innerHTML=e,r.prepend(o))}else{const e="Menu must be created before toggling location";i?s&&s.parentNode.removeChild(s):s?s.innerHTML=e:(o.innerHTML=e,r.prepend(o))}let a=!1,c=!1;for(let e of n){const t=e.querySelector("input");t.addEventListener("change",(()=>{d(!0),D()}));e.querySelector(".theme-location-set")&&(t.setAttribute("disabled",!0),e.style.pointerEvents="none",e.style.opacity=.5,c=!0),t.getAttribute("checked")&&(a=!0)}if(c&&!l&&i){const e=document.querySelector(".changes-disabled-message"),t="Some locations cannot be set because they are already set";e?e.innerHTML=t:(o.innerHTML=t,r.prepend(o))}if(location.search.includes("menu=0"))return;x(!0);const u=document.querySelector(".submitdelete.deletion.menu-delete");let p=document.querySelector(".delete-link-replacement");a||l?(u.style.display="none",p?p.style.display="inline":(p=document.createElement("span"),p.classList.add("delete-link-replacement"),p.innerHTML="To delete a menu it must be unpublished (and unregisterered from all display locations)",p.style.color="#a7aaad",p.style.fontSize="12px"),u.parentNode.prepend(p)):(u.style.display="inline",p&&(p.style.display="none"))},$=(e={})=>{if(document){const t=new CustomEvent("cerberusChangeEvent",{detail:e});document.dispatchEvent(t)}},z=async t=>{t.preventDefault(),t.stopPropagation(),l(!0);(await Xe("publish_to_live",P)).data?R(!1):n({state:"error"}),await new Promise((e=>setTimeout(e,1e3))),l(!1),A&&e.requireApproval&&""!==Tt.approvalStatus&&Bt(),$({action:"publish_to_live_done"})},B=async e=>{e.preventDefault(),e.stopPropagation(),a(!0);(await Xe("unpublish_from_live",P)).data?R(!1):n({state:"error"}),await new Promise((e=>setTimeout(e,1e3))),a(!1),$({action:"unpublish_from_live_done"})};f((()=>{A&&Dt({changesNotSavedToDraft:O()})})),f((()=>{A&&Dt({publishing:i()})})),f((()=>{A&&Dt({publishing:i()})}));const O=()=>u()||h()||m();return U(Pt,{get horizontal(){return e.metaMenu},get box(){return e.optionsMeta},get children(){return[U(Y,{get when(){return r()},get children(){return U(Nt,{get horizontal(){return e.metaMenu},get children(){return[U(ut,{get size(){return e.metaMenu?"small":"large"}}),U(Et,{children:"Checking content in draft and live"})]}})}}),U(Y,{get when(){return!r()},get children(){return[U(Y,{get when(){return k()},get children(){return U(Nt,{get horizontal(){return e.metaMenu},get children(){return U(Et,{children:"Content must be saved before publishing"})}})}}),U(Y,{get when(){var e;return!c()&&(null===(e=t.draft)||void 0===e?void 0:e.exists)},get children(){return[U(Y,{get when(){return A&&e.requireApproval},get children(){return U(It,{})}}),U(Y,{get when(){return!e.requireApproval},get children(){return U(Et,{get horizontal(){return e.metaMenu},children:"Publish content"})}}),U(Y,{get when(){var e;return!(null!==(e=t.live)&&void 0!==e&&e.exists)},get children(){return[ne((()=>A&&e.requireApproval?U(Yt,{}):U(ht,{get leftMargin(){return e.metaMenu},get loading(){return i()},onClick:e=>z(e),get disabled(){return O()},get children(){return O()?"Save draft before publishing to live":"Publish to live site"}}))),U(ht,{get leftMargin(){return e.metaMenu},disabled:!0,children:"Content not published"}),U(Y,{when:A,get children(){return U(Vt,{})}})]}}),U(Y,{get when(){var e;return null===(e=t.live)||void 0===e?void 0:e.exists},get children(){return[ne((()=>A&&!e.optionsMeta&&e.requireApproval?U(Wt,{}):U(ht,{get leftMargin(){return e.metaMenu},get loading(){return i()},onClick:e=>z(e),get disabled(){var e;return(null===(e=t.live)||void 0===e?void 0:e.synced)||O()},get children(){var e;return O()?"Save draft before updating on live":null!==(e=t.live)&&void 0!==e&&e.synced?"Updated on live site":"Update on live site"}}))),U(ht,{get leftMargin(){return e.metaMenu},get loading(){return s()},onClick:e=>B(e),get disabled(){return m()},children:"Unpublish"}),U(Y,{when:A,get children(){return U(Vt,{})}})]}})]}}),U(Y,{get when(){return e.metaMenu},get children(){return U(Nt,{get horizontal(){return e.metaMenu},get children(){return[U(Y,{get when(){return!w()},get children(){return U(Et,{children:"Enter a 'Menu Name' above to create a new menu"})}}),(()=>{const e=ne((()=>{var e;return!(c()||null!==(e=t.draft)&&void 0!==e&&e.exists)}),!0);return U(Y,{get when(){return e()&&w()},get children(){return U(Et,{children:"Save menu with menu items in order to publish"})}})})(),U(Y,{get when(){return c()},get children(){return U(Et,{children:"Save the changes before publishing"})}})]}})}})]}}),U(Y,{get when(){return e.enableTestContent},get children(){return U(ht,{get leftMargin(){return e.metaMenu},get loading(){return s()},onClick:e=>B(e),get disabled(){var e;return!(null!==(e=t.test)&&void 0!==e&&e.synced)},get children(){return t.test&&t.test.synced?"Unpublish from test target":"Publish to test target"}})}}),U(Y,{get when(){return Tt.errorMessage},get children(){return U(At,{get children(){return Tt.errorMessage}})}})]}})},Gt=Qe("input")`
`,Zt=Qe("div")`
    display: flex;
    flex-direction: column;
    width: 100%;
    padding-right: 10px;
    box-sizing: border-box;
`,en=Qe("label")`
    padding: 5px 5px 0px 5px;
    font-size: 10px;
    height: 18px;
`,tn=({placeholder:e="",label:t=" ",value:n,onChange:r=(()=>{})})=>{const o=e=>{r(e.target.value)};return U(Zt,{get children(){return[U(en,{children:t}),U(Gt,{type:"text",get value(){return n()},placeholder:e,onKeyup:o})]}})},nn=Qe("select")`
    max-width: 100% !important;
`,rn=Qe("div")`
    display: flex;
    flex-direction: column;
    width: 100%;
    padding-left: 10px;
    box-sizing: border-box;
`,on=Qe("label")`
    padding: 5px 5px 0px 5px;
    font-size: 10px;
    height: 18px;
`,ln=le("<option></option>"),sn=({options:e=[],placeholder:t="",label:n=" ",value:r,onChange:o=(()=>{})})=>{const i=e=>{console.log(e),o(e.target.value)};return U(rn,{get children(){return[U(on,{children:n}),U(nn,{get value(){return r()},placeholder:t,onChange:i,get children(){return U(Q,{each:e,children:e=>(()=>{const t=ln.cloneNode(!0);return ge(t,(()=>e.label)),h((n=>{const o=e.value,i=e.value===r();return o!==n._v$&&(t.value=n._v$=o),i!==n._v$2&&(t.selected=n._v$2=i),n}),{_v$:void 0,_v$2:void 0}),t})()})}})]}})},an={open:Ke`
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
`},cn=Qe("div")`
     color: black;
     max-width: 1200px;
     margin: 0 auto;
`;Qe("div")`
`,Qe("div")`
    font-size: 1rem;
    padding: 1rem 0;
`;const dn=Qe("div")`
    display: flex;
    justify-content: flex-end;
`,un=Qe("div")`
    max-height: 0px;
    overflow: hidden;
    ${e=>`animation: ${an[e.state]} .4s ease-in-out forwards;`}
`,pn=Qe("div")`
    background-color: #fff;
    border: 1px solid #aaa;
    border-radius: 3px;
    margin-top: 20px;
    padding: 20px;
`,gn=Qe("div")`
    width: 100%;
    display: flex;
    padding-bottom: 10px;
`,hn=Qe("div")`
    width: 100%;
    display: flex;
    justify-content: flex-end;
`,fn=Qe("div")`
    color red;
`,vn=Qe("div")`
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
`,mn=Qe("table")`
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
`,yn=le("<thead><tr><th>Domain</th><th>Distribution ID</th><th>Target</th><th>SiteId</th><th></th></tr></thead>"),wn=le("<tbody></tbody>"),xn=le("<tr><td></td><td></td><td></td><td></td></tr>"),kn=[{value:"draft",label:"Draft"},{value:"live",label:"Live"},{value:"test",label:"Test"}];const Sn=({options:e})=>{const[t,n]=Ee({list:[]}),[r,o]=g(""),[i,l]=g(""),[s,a]=g("draft"),[c,d]=g("init"),[u,p]=g(""),[h,v]=g(!1),m=async()=>{const t=await Ge(`${e.api}/get-domain-settings.php`);n("list",t)},b=async(t=function(e){for(var t="",n="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",r=n.length,o=0;o<e;o++)t+=n.charAt(Math.floor(Math.random()*r));return t}(20))=>{try{if(p(""),h())return;v(!0),await Ge(`${e.api}/upsert-domain-setting.php`,{domain:r(),target:s(),id:t,cloudfrontDistributionId:i()}),await m(),a("draft"),o(""),l(""),v(!1),d("close")}catch(e){console.log("ee",e),"domain-already-exists"===e.error?p("Domain already exists"):p("Something caused an error"),v(!1)}},y=(e,t)=>{"domain"===e&&o(t),"target"===e&&a(t),"cloudfrontDistributionId"===e&&l(t)};return f((()=>{m()})),U(cn,{get children(){return[U(it,{children:"Domain Settings"}),U(ot,{children:"This is the list of domains and targets that will be used for this site. You can add as many as you need but the domains need to be pointed to the server to make it work."}),U(dn,{get children(){return U(ht,{onClick:()=>d("open"),children:"Add new domain and target"})}}),U(un,{get state(){return c()},get children(){return U(pn,{get children(){return[U(st,{children:"Add new domain and target"}),U(gn,{get children(){return[U(tn,{placeholder:"domain",label:"Domain:",value:r,onChange:e=>y("domain",e)}),U(tn,{placeholder:"distribution id",label:"Cloudfront Distribution ID:",value:i,onChange:e=>y("cloudfrontDistributionId",e)}),U(sn,{options:kn,value:s,onChange:e=>y("target",e)})]}}),U(Y,{when:u,get children(){return U(fn,{children:u})}}),U(hn,{get children(){return[U(ht,{onClick:()=>d("close"),children:"Cancel"}),U(ht,{get loading(){return h()},leftMargin:!0,get disabled(){return!r()||!s()},onClick:()=>b(),children:"Save"})]}})]}})}}),U(mn,{get children(){return[yn.cloneNode(!0),(()=>{const n=wn.cloneNode(!0);return ge(n,U(Q,{get each(){return t.list},children:t=>(()=>{const n=xn.cloneNode(!0),r=n.firstChild,o=r.nextSibling,i=o.nextSibling,l=i.nextSibling;return ge(r,(()=>t.content.domain)),ge(o,(()=>t.content.cloudfrontDistributionId)),ge(i,(()=>t.content.target)),ge(l,(()=>t.content.siteId)),ge(n,U(bn,{get children(){return U(vn,{onClick:()=>(async t=>{try{await Ge(`${e.api}/delete-domain-setting.php`,{id:t}),await m()}catch(e){console.log(e)}})(t.externalId),children:"delete"})}}),null),n})()})),n})()]}})]}})},Cn=le("<span>, requested by <em></em></span>"),jn=le("<span> - rejected by <em></em></span>"),Mn=le("<span> - approved by <em></em></span>"),qn=le("<em></em>"),Pn=Qe("div")`
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
`,_n=Qe("p")`
    margin: 0;
    font-size: inherit;
    color: gray;
`,Nn=Qe("h5")`
    margin: 0;
    margin-bottom: 0.3rem;
    text-decoration: underline;
`,En=Qe("div")`
    margin-top: 0.8rem;
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    font-size: 15px;
`,Tn=Qe("div")`
    display: flex;
    align-items: flex-start;
    margin-top: -10px;
    padding-inline: 1rem;
`,Dn=Qe("div")`
    padding-left: 1rem;
    margin-top: 0.5rem;
`,Rn=e=>{const t=()=>{console.log("Request data: ",e.item)};return U(En,{get key(){return e.item.content.post_id},get children(){return[U(Pn,{onClick:t,get children(){return e.item.content.type}}),U(_n,{get children(){return[U(An,{get href(){return e.item.content.editorUrl},target:"_blank",get children(){return e.item.content.post_title}}),U(Y,{get when(){return"admin"===e.type},get children(){const t=Cn.cloneNode(!0);return ge(t.firstChild.nextSibling,(()=>e.item.content.requestedBy)),t}}),U(Y,{get when(){return"rejected"===e.item.content.status},get children(){const t=jn.cloneNode(!0);return ge(t.firstChild.nextSibling,(()=>e.item.content.rejectedBy)),t}}),U(Y,{get when(){return"approved"===e.item.content.status},get children(){const t=Mn.cloneNode(!0);return ge(t.firstChild.nextSibling,(()=>e.item.content.approvedBy)),t}}),ne((()=>` (${(()=>{const t=new Date(e.item.content.updated_on);return t.getFullYear()+"-"+(t.getMonth()+1).toString().padStart(2,"0")+"-"+t.getDate().toString().padStart(2,"0")+", "+t.getHours().toString().padStart(2,"0")+":"+t.getMinutes().toString().padStart(2,"0")})()})`)),U(Y,{get when(){return"rejected"===e.item.content.status},get children(){return U(Dn,{get children(){return[U(Nn,{children:"Rejection message:"}),(()=>{const t=qn.cloneNode(!0);return ge(t,(()=>e.item.content.rejectionReason)),t})()]}})}})]}}),U(Tn,{get children(){return U(ht,{get onClick(){return e.manualDelete},children:"Delete"})}})]}})},Ln=le("<p></p>"),$n=le("<p>Reload page</p>"),zn=le("<div></div>"),Bn=Qe("div")`
    margin-bottom: 3rem;
`,On=Qe("div")`
    margin-top: 1rem;
    margin-bottom: 2rem;
`,Hn=Qe("p")`
    font-size: 15px;
`,In=({options:e})=>{const[t,n]=g([]),[r,o]=g([]),[i,l]=g([]),[s,a]=g(!1),[c,d]=g("");y((()=>{a(!0),u()}));const u=async()=>{try{var t;const n=await Ge(`${e.api}/get-publication-requests.php`);p(null==n||null===(t=n.data)||void 0===t?void 0:t.resources)}catch(e){console.log("Error fetching all publication requests",e),d("Error fetching all publication requests")}},p=(e=[])=>{const t={pending:{},approved:{},rejected:{}};console.log("Unsorted requests",e);e.sort(((e,t)=>new Date(t.content.updated_on)-new Date(e.content.updated_on))).forEach((e=>{const n=e.content.status,r=h(e.content["wp-domain"]),o=e.content.from_site_name+" - "+r;t[n][o]||(t[n][o]=[]),t[n][o].push(e)})),console.log("Approved: ",t.approved),console.log("Pending: ",t.pending),console.log("Rejected: ",t.rejected),n(t.approved),l(t.rejected),o(t.pending),a(!1)},h=e=>{const t=e.indexOf("://");return e.slice(t+3)},f=({title:t,siteRequests:n})=>{const r=Object.keys(n);return U(Bn,{get children(){return[U(st,{children:t}),U(Y,{get when(){return 0!==r.length},get fallback(){return U(_n,{children:"None to show"})},get children(){return U(Q,{each:r,children:t=>U(On,{get children(){return[U(Hn,{children:t}),U(Q,{get each(){return n[t]},children:t=>U(Rn,{item:t,manualDelete:()=>(async t=>{console.log("Deleting publication request: "+t);try{var n;const o=await Ge(`${e.api}/delete-publication-request.php`,{postId:t});var r;if(console.log("Delete result",o),null!=o&&null!==(n=o.errors)&&void 0!==n&&n.length)throw new Error(null===(r=o.errors[0])||void 0===r?void 0:r.message);u()}catch(e){console.log("Error deleting publication request",e),d("Error deleting publication request")}})(t.content.post_id),type:"admin"})})]}})})}})]}})};return(()=>{const e=zn.cloneNode(!0);return ge(e,U(it,{children:"All Publication requests"}),null),ge(e,(()=>{const e=ne((()=>!!s()),!0);return U(Y,{get when(){return e()&&!c()},get children(){return U(_n,{children:"Loading..."})}})})(),null),ge(e,(()=>{const e=ne((()=>!s()),!0);return U(Y,{get when(){return e()&&!c()},get children(){return[ne((()=>f({title:"Pending",siteRequests:r()}))),ne((()=>f({title:"Approved",siteRequests:t()}))),ne((()=>f({title:"Rejected",siteRequests:i()})))]}})})(),null),ge(e,U(Y,{get when(){return c()},get children(){return[(()=>{const e=Ln.cloneNode(!0);return ge(e,c),e})(),$n.cloneNode(!0)]}}),null),e})()},Un=le("<p></p>"),Fn=le("<p>Reload page</p>"),Kn=le("<div></div>"),Jn=Qe("div")`
    margin-bottom: 3rem;
`,Qn=Qe("div")`
    margin-top: 1rem;
    margin-bottom: 2rem;
`,Yn=Qe("p")`
    font-size: 15px;
`,Vn=({options:e})=>{const[t,n]=g([]),[r,o]=g([]),[i,l]=g([]),[s,a]=g(!1),[c,d]=g("");y((()=>{a(!0),u()}));const u=async()=>{try{var t;const n=await Ge(`${e.api}/get-publication-requests.php`);p(null==n||null===(t=n.data)||void 0===t?void 0:t.resources)}catch(e){console.log("Error fetching all publication requests",e),d("Error fetching all publication requests")}},p=(t=[])=>{const r={pending:{},approved:{},rejected:{}};console.log("Unsorted requests",t);t.filter((t=>t.content.requestedBy===e.userName)).sort(((e,t)=>new Date(t.content.updated_on)-new Date(e.content.updated_on))).forEach((e=>{const t=e.content.status,n=h(e.content["wp-domain"]),o=e.content.from_site_name+" - "+n;r[t][o]||(r[t][o]=[]),r[t][o].push(e)})),console.log("Approved: ",r.approved),console.log("Pending: ",r.pending),console.log("Rejected: ",r.rejected),n(r.approved),l(r.rejected),o(r.pending),a(!1)},h=e=>{const t=e.indexOf("://");return e.slice(t+3)},f=({title:t,siteRequests:n})=>{const r=Object.keys(n);return U(Jn,{get children(){return[U(st,{children:t}),U(Y,{get when(){return 0!==r.length},get fallback(){return U(_n,{children:"None to show"})},get children(){return U(Q,{each:r,children:t=>U(Qn,{get children(){return[U(Yn,{children:t}),U(Q,{get each(){return n[t]},children:t=>U(Rn,{item:t,manualDelete:()=>(async t=>{console.log("Deleting publication request: "+t);try{var n;const o=await Ge(`${e.api}/delete-publication-request.php`,{postId:t});var r;if(console.log("Delete result",o),null!=o&&null!==(n=o.errors)&&void 0!==n&&n.length)throw new Error(null===(r=o.errors[0])||void 0===r?void 0:r.message);u()}catch(e){console.log("Error deleting publication request",e),d("Error deleting publication request")}})(t.content.post_id),type:"editor"})})]}})})}})]}})};return(()=>{const e=Kn.cloneNode(!0);return ge(e,U(it,{children:"Personal publication requests"}),null),ge(e,(()=>{const e=ne((()=>!!s()),!0);return U(Y,{get when(){return e()&&!c()},get children(){return U(_n,{children:"Loading..."})}})})(),null),ge(e,(()=>{const e=ne((()=>!s()),!0);return U(Y,{get when(){return e()&&!c()},get children(){return[ne((()=>f({title:"Pending",siteRequests:r()}))),ne((()=>f({title:"Approved",siteRequests:t()}))),ne((()=>f({title:"Rejected",siteRequests:i()})))]}})})(),null),ge(e,U(Y,{get when(){return c()},get children(){return[(()=>{const e=Un.cloneNode(!0);return ge(e,c),e})(),Fn.cloneNode(!0)]}}),null),e})()},Wn=e=>{try{return JSON.parse(document.getElementById(e).innerHTML)}catch(e){return console.log("Error in getData",e),{}}},Xn=()=>{let e=document.getElementById("dls-metabox-root");if(e){const t=Wn("dls-data");t.metaMenu="nav-menu"===e.getAttribute("data-type"),t.metaMenu&&(e=document.createElement("div"),e&&document.querySelector("#nav-menu-footer").prepend(e)),ie((()=>U(Xt,{options:t})),e)}};jQuery(document).ready((function(e){var t,n;const r=null===(t=wp)||void 0===t||null===(n=t.data)||void 0===n?void 0:n.dispatch("core/editor");r&&r.disablePublishSidebar(),(()=>{if(wp.data){let e=!1,t=!1;wp.data.subscribe((()=>{const n=wp.data.select("core/editor").isSavingPost(),r=wp.data.select("core/editor").isSavingNonPostEntityChanges&&wp.data.select("core/editor").isSavingNonPostEntityChanges();e!==n?(e=n,wp.data.select("core/editor").didPostSaveRequestSucceed()&&wp.hooks.doAction("dls.post-saved")):t!==r&&(t=r,wp.data.select("core/editor").didPostSaveRequestSucceed()&&wp.hooks.doAction("dls.post-saved"))}))}})();let o={};try{o=e("#dls-hooks").length>0?JSON.parse(e("#dls-hooks").html()):{hook:""}}catch(e){}console.log("Current hook",o&&o.hook),"post.php"===o.hook||"post-new.php"===o.hook||"nav-menus.php"===o.hook?Xn():o.hook.includes("toplevel_page_draft-live-sync")?(()=>{const e=Wn("dls-data");ie((()=>U(De,{values:e,get children(){return U(qt,{})}})),document.getElementById("dls-root"))})():o.hook.includes("toplevel_page_cerberus-domain-settings")?(()=>{const e=document.getElementById("dls-domain-settings-root"),t=Wn("dls-data");ie((()=>U(Sn,{options:t})),e)})():o.hook.includes("toplevel_page_publication-approval")?(()=>{const e=document.getElementById("dls-publication-approval-root"),t=Wn("dls-data");ie((()=>U(In,{options:t})),e)})():o.hook.includes("toplevel_page_publication-requests")?(()=>{const e=document.getElementById("dls-publication-requests-root"),t=Wn("dls-data");ie((()=>U(Vn,{options:t})),e)})():o.hook.includes(".php")||Xn()}))}();
//# sourceMappingURL=draft-live-sync-boot-0.16.13-atos.js.map
