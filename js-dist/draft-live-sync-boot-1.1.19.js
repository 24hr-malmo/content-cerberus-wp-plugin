!function(){"use strict";const e=Symbol("solid-proxy"),t={equals:(e,t)=>e===t};let n=E;const r={},o={owned:null,cleanups:null,context:null,owner:null};var i=null;let l=null,s=null,a=null,c=null,d=null,u=0;function p(e,t){t&&(i=t);const n=s,r=i,l=0===e.length?o:{owned:null,cleanups:null,context:null,owner:r};let a;i=l,s=null;try{M((()=>a=e((()=>$(l)))),!0)}finally{s=n,i=r}return a}function g(e,n){n=n?Object.assign({},t,n):t;const o={value:e,observers:null,observerSlots:null,pending:r,comparator:n.equals||void 0};return[C.bind(o),e=>("function"==typeof e&&(e=e(o.pending!==r?o.pending:o.value)),j(o,e))]}function h(e,t,n){A(P(e,t,!1))}function f(e,t,r){n=N;const o=P(e,t,!1);o.user=!0,d&&d.push(o)}function m(e,n,o){o=o?Object.assign({},t,o):t;const i=P(e,n,!0);return i.pending=r,i.observers=null,i.observerSlots=null,i.state=0,i.comparator=o.equals||void 0,A(i),C.bind(i)}function v(e){if(a)return e();let t;const n=a=[];try{t=e()}finally{a=null}return M((()=>{for(let e=0;e<n.length;e+=1){const t=n[e];if(t.pending!==r){const e=t.pending;t.pending=r,j(t,e)}}}),!1),t}function b(e){let t,n=s;return s=null,t=e(),s=n,t}function y(e){f((()=>b(e)))}function w(){return s}function x(e){const t=Symbol("context");return{id:t,Provider:B(t),defaultValue:e}}function k(e){return R(i,e.id)||e.defaultValue}function S(e){const t=m(e);return m((()=>z(t())))}function C(){if(this.state&&this.sources){const e=c;c=null,1===this.state?A(this):T(this),c=e}if(s){const e=this.observers?this.observers.length:0;s.sources?(s.sources.push(this),s.sourceSlots.push(e)):(s.sources=[this],s.sourceSlots=[e]),this.observers?(this.observers.push(s),this.observerSlots.push(s.sources.length-1)):(this.observers=[s],this.observerSlots=[s.sources.length-1])}return this.value}function j(e,t,n){return e.comparator&&e.comparator(e.value,t)?t:a?(e.pending===r&&a.push(e),e.pending=t,t):(e.value=t,!e.observers||c&&!e.observers.length||M((()=>{for(let t=0;t<e.observers.length;t+=1){const n=e.observers[t];l,n.observers&&2!==n.state&&D(n),n.state=1,n.pure?c.push(n):d.push(n)}if(c.length>1e6)throw c=[],new Error}),!1),t)}function A(e){if(!e.fn)return;$(e);const t=i,n=s,r=u;s=i=e,function(e,t,n){let r;try{r=e.fn(t)}catch(e){L(e)}(!e.updatedAt||e.updatedAt<=n)&&(e.observers&&e.observers.length?j(e,r):e.value=r,e.updatedAt=n)}(e,e.value,r),s=n,i=t}function P(e,t,n,r){const l={fn:e,state:1,updatedAt:null,owned:null,sources:null,sourceSlots:null,cleanups:null,value:t,owner:i,context:null,pure:n};return null===i||i!==o&&(i.owned?i.owned.push(l):i.owned=[l]),l}function q(e){let t,n=1===e.state&&e;if(e.suspense&&b(e.suspense.inFallback))return e.suspense.effects.push(e);for(;e=e.owner;)2===e.state?t=e:1===e.state&&(n=e,t=void 0);if(t){const e=c;if(c=null,T(t),c=e,!n||1!==n.state)return}n&&A(n)}function M(e,t){if(c)return e();let r=!1;t||(c=[]),d?r=!0:d=[],u++;try{e()}catch(e){L(e)}finally{!function(e){c&&(E(c),c=null);if(e)return;d.length?v((()=>{n(d),d=null})):d=null}(r)}}function E(e){for(let t=0;t<e.length;t++)q(e[t])}function N(e){let t,n=0;for(t=0;t<e.length;t++){const r=e[t];r.user?e[n++]=r:q(r)}const r=e.length;for(t=0;t<n;t++)q(e[t]);for(t=r;t<e.length;t++)q(e[t])}function T(e){e.state=0;for(let t=0;t<e.sources.length;t+=1){const n=e.sources[t];n.sources&&(1===n.state?q(n):2===n.state&&T(n))}}function D(e){for(let t=0;t<e.observers.length;t+=1){const n=e.observers[t];n.state||(n.state=2,n.observers&&D(n))}}function $(e){let t;if(e.sources)for(;e.sources.length;){const t=e.sources.pop(),n=e.sourceSlots.pop(),r=t.observers;if(r&&r.length){const e=r.pop(),o=t.observerSlots.pop();n<r.length&&(e.sourceSlots[o]=n,r[n]=e,t.observerSlots[n]=o)}}if(e.owned){for(t=0;t<e.owned.length;t++)$(e.owned[t]);e.owned=null}if(e.cleanups){for(t=0;t<e.cleanups.length;t++)e.cleanups[t]();e.cleanups=null}e.state=0,e.context=null}function L(e){throw e}function R(e,t){return e&&(e.context&&e.context[t]||e.owner&&R(e.owner,t))}function z(e){if("function"==typeof e&&!e.length)return z(e());if(Array.isArray(e)){const t=[];for(let n=0;n<e.length;n++){const r=z(e[n]);Array.isArray(r)?t.push.apply(t,r):t.push(r)}return t}return e}function B(e){return function(t){let n;var r;return A(P((()=>n=b((()=>(i.context={[e]:t.value},S((()=>t.children)))))),r,!0)),n}}const O=Symbol("fallback");function I(e){for(let t=0;t<e.length;t++)e[t]()}function U(e,t,n={}){let r=[],o=[],l=[],s=0,a=t.length>1?[]:null;var c;return c=()=>I(l),null===i||(null===i.cleanups?i.cleanups=[c]:i.cleanups.push(c)),()=>{let i,c,d=e()||[];return b((()=>{let e,t,g,h,f,m,v,b,y,w=d.length;if(0===w)0!==s&&(I(l),l=[],r=[],o=[],s=0,a&&(a=[])),n.fallback&&(r=[O],o[0]=p((e=>(l[0]=e,n.fallback()))),s=1);else if(0===s){for(o=new Array(w),c=0;c<w;c++)r[c]=d[c],o[c]=p(u);s=w}else{for(g=new Array(w),h=new Array(w),a&&(f=new Array(w)),m=0,v=Math.min(s,w);m<v&&r[m]===d[m];m++);for(v=s-1,b=w-1;v>=m&&b>=m&&r[v]===d[b];v--,b--)g[b]=o[v],h[b]=l[v],a&&(f[b]=a[v]);for(e=new Map,t=new Array(b+1),c=b;c>=m;c--)y=d[c],i=e.get(y),t[c]=void 0===i?-1:i,e.set(y,c);for(i=m;i<=v;i++)y=r[i],c=e.get(y),void 0!==c&&-1!==c?(g[c]=o[i],h[c]=l[i],a&&(f[c]=a[i]),c=t[c],e.set(y,c)):l[i]();for(c=m;c<w;c++)c in g?(o[c]=g[c],l[c]=h[c],a&&(a[c]=f[c],a[c](c))):o[c]=p(u);o=o.slice(0,s=w),r=d.slice(0)}return o}));function u(e){if(l[c]=e,a){const[e,n]=g(c);return a[c]=n,t(d[c],e)}return t(d[c])}}}function H(e,t){return b((()=>e(t)))}function F(){return!0}const K={get:(t,n,r)=>n===e?r:t.get(n),has:(e,t)=>e.has(t),set:F,deleteProperty:F,getOwnPropertyDescriptor:(e,t)=>({configurable:!0,enumerable:!0,get:()=>e.get(t),set:F,deleteProperty:F}),ownKeys:e=>e.keys()};function Y(...e){return new Proxy({get(t){for(let n=e.length-1;n>=0;n--){const r=e[n][t];if(void 0!==r)return r}},has(t){for(let n=e.length-1;n>=0;n--)if(t in e[n])return!0;return!1},keys(){const t=[];for(let n=0;n<e.length;n++)t.push(...Object.keys(e[n]));return[...new Set(t)]}},K)}function J(e){const t="fallback"in e&&{fallback:()=>e.fallback};return m(U((()=>e.each),e.children,t||void 0))}function Q(e){let t=!1;const n=m((()=>e.when),void 0,{equals:(e,n)=>t?e===n:!e==!n});return m((()=>{const r=n();if(r){const n=e.children;return(t="function"==typeof n&&n.length>0)?b((()=>n(r))):n}return e.fallback}))}function V(e){let t=!1;const n=S((()=>e.children)),r=m((()=>{let e=n();Array.isArray(e)||(e=[e]);for(let t=0;t<e.length;t++){const n=e[t].when;if(n)return[t,n,e[t]]}return[-1]}),void 0,{equals:(e,n)=>e&&e[0]===n[0]&&(t?e[1]===n[1]:!e[1]==!n[1])&&e[2]===n[2]});return m((()=>{const[n,o,i]=r();if(n<0)return e.fallback;const l=i.children;return(t="function"==typeof l&&l.length>0)?b((()=>l(o))):l}))}function X(e){return e}const G=new Set(["className","indeterminate","value","allowfullscreen","allowpaymentrequest","async","autofocus","autoplay","checked","controls","default","disabled","formnovalidate","hidden","ismap","itemscope","loop","multiple","muted","nomodule","novalidate","open","playsinline","readonly","required","reversed","seamless","selected","truespeed"]),W=new Set(["innerHTML","textContent","innerText","children"]),Z={className:"class",htmlFor:"for"},ee=new Set(["beforeinput","click","dblclick","focusin","focusout","input","keydown","keyup","mousedown","mousemove","mouseout","mouseover","mouseup","pointerdown","pointermove","pointerout","pointerover","pointerup","touchend","touchmove","touchstart"]),te={xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace"};function ne(e,t){return m(e,void 0,t?void 0:{equals:t})}function re(e,t,n){let r=n.length,o=t.length,i=r,l=0,s=0,a=t[o-1].nextSibling,c=null;for(;l<o||s<i;)if(t[l]!==n[s]){for(;t[o-1]===n[i-1];)o--,i--;if(o===l){const t=i<r?s?n[s-1].nextSibling:n[i-s]:a;for(;s<i;)e.insertBefore(n[s++],t)}else if(i===s)for(;l<o;)c&&c.has(t[l])||e.removeChild(t[l]),l++;else if(t[l]===n[i-1]&&n[s]===t[o-1]){const r=t[--o].nextSibling;e.insertBefore(n[s++],t[l++].nextSibling),e.insertBefore(n[--i],r),t[o]=n[i]}else{if(!c){c=new Map;let e=s;for(;e<i;)c.set(n[e],e++)}const r=c.get(t[l]);if(null!=r)if(s<r&&r<i){let a,d=l,u=1;for(;++d<o&&d<i&&null!=(a=c.get(t[d]))&&a===r+u;)u++;if(u>r-s){const o=t[l];for(;s<r;)e.insertBefore(n[s++],o)}else e.replaceChild(n[s++],t[l++])}else l++;else e.removeChild(t[l++])}}else l++,s++}const oe="_$DX_DELEGATE";function ie(e,t,n){let r;return p((o=>{r=o,ge(t,e(),t.firstChild?null:void 0,n)})),()=>{r(),t.textContent=""}}function le(e,t,n){const r=document.createElement("template");r.innerHTML=e;let o=r.content.firstChild;return n&&(o=o.firstChild),o}function se(e,t=window.document){const n=t[oe]||(t[oe]=new Set);for(let r=0,o=e.length;r<o;r++){const o=e[r];n.has(o)||(n.add(o),t.addEventListener(o,fe))}}function ae(e,t,n){null==n?e.removeAttribute(t):e.setAttribute(t,n)}function ce(e,t,n,r){null==r?e.removeAttributeNS(t,n):e.setAttributeNS(t,n,r)}function de(e,t,n,r){r?Array.isArray(n)?(e[`$$${t}`]=n[0],e[`$$${t}Data`]=n[1]):e[`$$${t}`]=n:Array.isArray(n)?e.addEventListener(t,(e=>n[0](n[1],e))):e.addEventListener(t,n)}function ue(e,t,n={}){const r=Object.keys(t),o=Object.keys(n);let i,l;for(i=0,l=o.length;i<l;i++){const r=o[i];r&&"undefined"!==r&&!(r in t)&&(he(e,r,!1),delete n[r])}for(i=0,l=r.length;i<l;i++){const o=r[i],l=!!t[o];o&&"undefined"!==o&&n[o]!==l&&(he(e,o,l),n[o]=l)}return n}function pe(e,t,n={}){const r=e.style;if("string"==typeof t)return r.cssText=t;let o,i;for(i in"string"==typeof n&&(n={}),n)null==t[i]&&r.removeProperty(i),delete n[i];for(i in t)o=t[i],o!==n[i]&&(r.setProperty(i,o),n[i]=o);return n}function ge(e,t,n,r){if(void 0===n||r||(r=[]),"function"!=typeof t)return ve(e,t,r,n);h((r=>ve(e,t(),r,n)),r)}function he(e,t,n){const r=t.split(/\s+/);for(let t=0,o=r.length;t<o;t++)e.classList.toggle(r[t],n)}function fe(e){const t=`$$${e.type}`;let n=e.composedPath&&e.composedPath()[0]||e.target;for(e.target!==n&&Object.defineProperty(e,"target",{configurable:!0,value:n}),Object.defineProperty(e,"currentTarget",{configurable:!0,get:()=>n});null!==n;){const r=n[t];if(r&&!n.disabled){const o=n[`${t}Data`];if(void 0!==o?r(o,e):r(e),e.cancelBubble)return}n=n.host&&n.host!==n&&n.host instanceof Node?n.host:n.parentNode}}function me(e,t,n={},r,o){return!o&&"children"in t&&h((()=>n.children=ve(e,t.children,n.children))),h((()=>function(e,t,n,r,o={}){let i,l,s;for(const c in t){if("children"===c){r||ve(e,t.children);continue}const d=t[c];if(d!==o[c]){if("style"===c)pe(e,d,o[c]);else if("class"!==c||n)if("classList"===c)ue(e,d,o[c]);else if("ref"===c)d(e);else if("on:"===c.slice(0,3))e.addEventListener(c.slice(3),d);else if("oncapture:"===c.slice(0,10))e.addEventListener(c.slice(10),d,!0);else if("on"===c.slice(0,2)){const t=c.slice(2).toLowerCase(),n=ee.has(t);de(e,t,d,n),n&&se([t])}else if((s=W.has(c))||!n&&(l=G.has(c))||(i=e.nodeName.includes("-")))!i||l||s?e[c]=d:e[(a=c,a.toLowerCase().replace(/-([a-z])/g,((e,t)=>t.toUpperCase())))]=d;else{const t=n&&c.indexOf(":")>-1&&te[c.split(":")[0]];t?ce(e,t,c,d):ae(e,Z[c]||c,d)}else e.className=d;o[c]=d}}var a}(e,t,r,!0,n))),n}function ve(e,t,n,r,o){for(;"function"==typeof n;)n=n();if(t===n)return n;const i=typeof t,l=void 0!==r;if(e=l&&n[0]&&n[0].parentNode||e,"string"===i||"number"===i)if("number"===i&&(t=t.toString()),l){let o=n[0];o&&3===o.nodeType?o.data=t:o=document.createTextNode(t),n=we(e,n,r,o)}else n=""!==n&&"string"==typeof n?e.firstChild.data=t:e.textContent=t;else if(null==t||"boolean"===i)n=we(e,n,r);else{if("function"===i)return h((()=>{let o=t();for(;"function"==typeof o;)o=o();n=ve(e,o,n,r)})),()=>n;if(Array.isArray(t)){const i=[];if(be(i,t,o))return h((()=>n=ve(e,i,n,r,!0))),()=>n;if(0===i.length){if(n=we(e,n,r),l)return n}else Array.isArray(n)?0===n.length?ye(e,i,r):re(e,n,i):null==n||""===n?ye(e,i):re(e,l&&n||[e.firstChild],i);n=i}else if(t instanceof Node){if(Array.isArray(n)){if(l)return n=we(e,n,r,t);we(e,n,null,t)}else null!=n&&""!==n&&e.firstChild?e.replaceChild(t,e.firstChild):e.appendChild(t);n=t}}return n}function be(e,t,n){let r=!1;for(let o=0,i=t.length;o<i;o++){let i,l=t[o];if(l instanceof Node)e.push(l);else if(null==l||!0===l||!1===l);else if(Array.isArray(l))r=be(e,l)||r;else if("string"==(i=typeof l))e.push(document.createTextNode(l));else if("function"===i)if(n){for(;"function"==typeof l;)l=l();r=be(e,Array.isArray(l)?l:[l])||r}else e.push(l),r=!0;else e.push(document.createTextNode(l.toString()))}return r}function ye(e,t,n){for(let r=0,o=t.length;r<o;r++)e.insertBefore(t[r],n)}function we(e,t,n,r){if(void 0===n)return e.textContent="";const o=r||document.createTextNode("");if(t.length){let r=!1;for(let i=t.length-1;i>=0;i--){const l=t[i];if(o!==l){const t=l.parentNode===e;r||i?t&&e.removeChild(l):t?e.replaceChild(o,l):e.insertBefore(o,n)}else r=!0}}else e.insertBefore(o,n);return[o]}const xe=Symbol("store-raw"),ke=Symbol("store-node"),Se=Symbol("store-name");function Ce(t,n){let r=t[e];if(!r){Object.defineProperty(t,e,{value:r=new Proxy(t,_e)});const n=Object.keys(t),o=Object.getOwnPropertyDescriptors(t);for(let e=0,i=n.length;e<i;e++){const i=n[e];if(o[i].get){const e=o[i].get.bind(r);Object.defineProperty(t,i,{get:e})}}}return r}function je(e){return null!=e&&"object"==typeof e&&(!e.__proto__||e.__proto__===Object.prototype||Array.isArray(e))}function Ae(e,t=new Set){let n,r,o,i;if(n=null!=e&&e[xe])return n;if(!je(e)||t.has(e))return e;if(Array.isArray(e)){Object.isFrozen(e)?e=e.slice(0):t.add(e);for(let n=0,i=e.length;n<i;n++)o=e[n],(r=Ae(o,t))!==o&&(e[n]=r)}else{Object.isFrozen(e)?e=Object.assign({},e):t.add(e);const n=Object.keys(e),l=Object.getOwnPropertyDescriptors(e);for(let s=0,a=n.length;s<a;s++)i=n[s],l[i].get||(o=e[i],(r=Ae(o,t))!==o&&(e[i]=r))}return e}function Pe(e){let t=e[ke];return t||Object.defineProperty(e,ke,{value:t={}}),t}function qe(){const[e,t]=g(void 0,{equals:!1});return e.$=t,e}const _e={get(t,n,r){if(n===xe)return t;if(n===e)return r;const o=t[n];if(n===ke||"__proto__"===n)return o;const i=je(o);if(w()&&("function"!=typeof o||t.hasOwnProperty(n))){let e,r;i&&(e=Pe(o))&&(r=e._||(e._=qe()),r()),e=Pe(t),r=e[n]||(e[n]=qe()),r()}return i?Ce(o):o},set:()=>!0,deleteProperty:()=>!0,ownKeys:function(e){if(w()){const t=Pe(e);(t._||(t._=qe()))()}return Reflect.ownKeys(e)},getOwnPropertyDescriptor:function(t,n){const r=Reflect.getOwnPropertyDescriptor(t,n);return!r||r.get||n===e||n===ke||n===Se||(delete r.value,delete r.writable,r.get=()=>t[e][n]),r}};function Me(e,t,n){if(e[t]===n)return;const r=Array.isArray(e),o=e.length,i=void 0===n,l=r||i===t in e;i?delete e[t]:e[t]=n;let s,a=Pe(e);(s=a[t])&&s.$(),r&&e.length!==o&&(s=a.length)&&s.$(s,void 0),l&&(s=a._)&&s.$(s,void 0)}function Ee(e,t,n=[]){let r,o=e;if(t.length>1){r=t.shift();const i=typeof r,l=Array.isArray(e);if(Array.isArray(r)){for(let o=0;o<r.length;o++)Ee(e,[r[o]].concat(t),[r[o]].concat(n));return}if(l&&"function"===i){for(let o=0;o<e.length;o++)r(e[o],o)&&Ee(e,[o].concat(t),[o].concat(n));return}if(l&&"object"===i){const{from:o=0,to:i=e.length-1,by:l=1}=r;for(let r=o;r<=i;r+=l)Ee(e,[r].concat(t),[r].concat(n));return}if(t.length>1)return void Ee(e[r],t,[r].concat(n));o=e[r],n=[r].concat(n)}let i=t[0];"function"==typeof i&&(i=i(o,n),i===o)||void 0===r&&null==i||(i=Ae(i),void 0===r||je(o)&&je(i)&&!Array.isArray(i)?function(e,t){const n=Object.keys(t);for(let r=0;r<n.length;r+=1){const o=n[r];Me(e,o,t[o])}}(o,i):Me(e,r,i))}function Ne(e,t){const n=Ae(e||{});return[Ce(n),function(...e){v((()=>Ee(n,e)))}]}const Te=x([{path:"start"},{}]);function De(e){const t=location.hash.replace(/#/,"")||"start",[n,r]=Ne({path:t});window.addEventListener("popstate",(e=>{const t=e.target.location.hash.replace(/#/,"");r({...n,path:t})}));const o=[n,{apiUrl:e.values.api}];return H(Te.Provider,{value:o,get children(){return e.children}})}let $e={data:""},Le=e=>"object"==typeof window?((e?e.querySelector("#_goober"):window._goober)||Object.assign((e||document.head).appendChild(document.createElement("style")),{innerHTML:" ",id:"_goober"})).firstChild:e||$e,Re=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(})/g,ze=/\/\*[^]*?\*\/|\s\s+|\n/g,Be=(e,t)=>{let n,r="",o="",i="";for(let l in e){let s=e[l];"object"==typeof s?(n=t?t.replace(/([^,])+/g,(e=>l.replace(/([^,])+/g,(t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)))):l,o+="@"==l[0]?"f"==l[1]?Be(s,l):l+"{"+Be(s,"k"==l[1]?"":t)+"}":Be(s,n)):"@"==l[0]&&"i"==l[1]?r=l+" "+s+";":(l=l.replace(/[A-Z]/g,"-$&").toLowerCase(),i+=Be.p?Be.p(l,s):l+":"+s+";")}return i[0]?(n=t?t+"{"+i+"}":i,r+n+o):r+o},Oe={},Ie=e=>{let t="";for(let n in e)t+=n+("object"==typeof e[n]?Ie(e[n]):e[n]);return t},Ue=(e,t,n,r,o)=>{let i="object"==typeof e?Ie(e):e,l=Oe[i]||(Oe[i]=(e=>{let t=0,n=11;for(;t<e.length;)n=101*n+e.charCodeAt(t++)>>>0;return"go"+n})(i));if(!Oe[l]){let t="object"==typeof e?e:(e=>{let t,n=[{}];for(;t=Re.exec(e.replace(ze,""));)t[4]&&n.shift(),t[3]?n.unshift(n[0][t[3]]=n[0][t[3]]||{}):t[4]||(n[0][t[1]]=t[2]);return n[0]})(e);Oe[l]=Be(o?{["@keyframes "+l]:t}:t,n?"":"."+l)}return((e,t,n)=>{-1==t.data.indexOf(e)&&(t.data=n?e+t.data:t.data+e)})(Oe[l],t,r),l},He=(e,t,n)=>e.reduce(((e,r,o)=>{let i=t[o];if(i&&i.call){let e=i(n),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;i=t?"."+t:e&&"object"==typeof e?e.props?"":Be(e,""):e}return e+r+(null==i?"":i)}),"");function Fe(e){let t=this||{},n=e.call?e(t.p):e;return Ue(n.unshift?n.raw?He(n,[].slice.call(arguments,1),t.p):n.reduce(((e,n)=>n?Object.assign(e,n.call?n(t.p):n):e),{}):n,Le(t.target),t.g,t.o,t.k)}Fe.bind({g:1});let Ke=Fe.bind({k:1});const Ye=x();function Je(e){let t=this||{};return(...n)=>{const r=r=>{const o=Y(r,{theme:k(Ye)}),i=Y(o,{get className(){const e=o.className,r="className"in o&&/^go[0-9]+/.test(e);return[e,Fe.apply({target:t.target,o:r,p:o,g:t.g},n)].filter(Boolean).join(" ")}}),[l,s]=function(e,...t){const n=new Set(t.flat()),r=Object.getOwnPropertyDescriptors(e),o=t.map((t=>{const n={};for(let o=0;o<t.length;o++){const i=t[o];Object.defineProperty(n,i,r[i]?r[i]:{get:()=>e[i]})}return n}));return o.push(new Proxy({get:t=>n.has(t)?void 0:e[t],has:t=>!n.has(t)&&t in e,keys:()=>Object.keys(e).filter((e=>!n.has(e)))},K)),o}(i,["as"]),a=l.as||e;let c;var d,u,p,g;return"function"==typeof a?c=a(s):(c=document.createElement(a),d=c,"function"==typeof(u=s)?h((e=>me(d,u(),e,p,g))):me(d,u,void 0,p,g)),c};return r.className=e=>b((()=>Fe.apply({target:t.target,p:e,g:t.g},n))),r}}const Qe=Je("nav")`
    color: black;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 2rem;
`,Ve=Je("a")`
    font-size: 14px;
    display: block;
    padding: 0 1rem;
`,Xe=()=>(k(Te),H(Qe,{get children(){return[H(Ve,{href:"#start",children:"Start"}),H(Ve,{href:"#sync-check",children:"Sync Check"}),H(Ve,{href:"#sync-draft",children:"Sync Draft"}),H(Ve,{href:"#sync-live",children:"Sync Live"})]}})),Ge=async(e,t={})=>new Promise(((n,r)=>{jQuery.ajax({url:"/wp-admin/admin-ajax.php",type:"post",dataType:"json",data:{action:e,...t},success:function(e){n(e)},error:(e,t)=>{r(t)}})})),We=async(e,t)=>new Promise(((n,r)=>{jQuery.ajax({url:e,type:t?"post":"get",dataType:"json",data:t,success:function(e){n(e)},error:(e,t)=>{r(e.responseJSON||t)}})})),Ze=Je("div")`
    background-color: white;
    padding: 1.0rem 2rem 2rem;
    border: 3px solid #ccc;
    border-radius: 3px;
    min-height: 50vh;
`,et=e=>H(Ze,{get children(){return e.children}}),tt=Je("div")`
    display: flex;
`,nt=Je("div")`
    flex: 1;
`,rt=Je("div")`
    width: 220px;
    align-items: center;
    justify-content: center;
    display: flex;
`,ot=Je("p")`
    font-size: 14px;
    padding-bottom: .5rem;
`,it=Je("div")`
    font-size: 40px;
    font-weight: bold;
    text-align: center;
    width: 100%;
    margin: 2rem 0 4rem;
    line-height: 1.2;
    display: block;
`,lt=Je("h2")`
    font-size: 24px;
    margin-bottom: .5rem;
`,st=Je("h3")`
    font-size: 18px;
    margin-bottom: .5rem;
    margin-top: 0px;
`,at=e=>H(tt,{get children(){return[H(nt,{get children(){return[H(lt,{get children(){return e.title}}),H(ot,{get children(){return e.description}})]}}),H(rt,{get children(){return e.actions}})]}});Je("svg")`
    margin: auto; 
    background: white;
    display: block; 
    shape-rendering: auto;
    width: ${e=>e.width};
    height: ${e=>e.height};
`,Je("svg")`
    margin: auto; 
    background: rgb(255, 255, 255); 
    display: block; 
    shape-rendering: auto;
`;const ct=le('<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="200px" height="200px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid"><circle cx="50" cy="50" r="32" stroke-width="8" stroke-dasharray="50.26548245743669 50.26548245743669" fill="none" stroke-linecap="round"><animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="2.0408163265306123s" keyTimes="0;1" values="0 50 50;360 50 50"></animateTransform></circle></svg>'),dt={small:"20px",medium:"30px",large:"50px",xlarge:"100px"},ut=({size:e="large",inverted:t=!1})=>{let n={display:"block","shape-rendering":"auto",width:dt[e],height:dt[e],stroke:"#006ba1"};return t&&(n.stroke="#fff"),(()=>{const e=ct.cloneNode(!0);return pe(e,n),e})()},pt=Je("button")`
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

`,gt=Je("div")`
    position: absolute;
    right: 7px;
`,ht=e=>H(pt,Y(e,{get children(){return[ne((()=>e.children)),H(Q,{get when(){return e.loading},get children(){return H(gt,{get children(){return H(ut,{size:"small",get inverted(){return!e.disabled}})}})}})]}})),ft=Je("div")`
    display: flex;
    margin-bottom: 2px;
`,mt=Je("div")`
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
`,vt=Je("div")`
    background-color: #2271b1;
    font-size: 10px;
    color: white;
    padding: 0px 4px 0px 4px;
    height: 16px;
    line-height: 15px;
    margin: 0 5px 0 0;
    border-radius: 2px;
    cursor: pointer;
`,bt=Je("a")`
    display: block;
    color: grey;
    text-decoration: none;
`,yt=Je("div")`
    padding: 0 5px 0 0;
    svg {
        fill: ${e=>e.color};
        transition: fill .2s ease-in;
    }
`,wt=le('<svg height="10" width="10"><circle cx="5" cy="5" r="5" stroke-width="0"></circle></svg>'),xt=({showCheckButton:e,showSyncButton:t,showDraft:n,showLive:r,item:o,onClick:i,onTypeClick:l,getAllTargetsContent:s})=>{const a=(e,t)=>{let n="#bbbbbb";return"error"===t?n="#da694b":""===t?n="#bbbbbb":e&&(n=e.synced?"#99da4b":"#e9da4e"),n},c=async()=>{console.log("Item: ",o);try{const e=await s();console.log(e)}catch(e){console.log("Error logging diff: ",e)}};return H(ft,{get children(){return[H(Q,{when:n,get children(){return H(yt,{get color(){var e,t;return a(null===(e=o.status)||void 0===e?void 0:e.draft,null===(t=o.status)||void 0===t?void 0:t.state)},get children(){return wt.cloneNode(!0)}})}}),H(Q,{when:r,get children(){return H(yt,{get color(){var e,t;return a(null===(e=o.status)||void 0===e?void 0:e.live,null===(t=o.status)||void 0===t?void 0:t.state)},get children(){return wt.cloneNode(!0)}})}}),H(Q,{when:t,get children(){return H(vt,{onClick:i,children:"sync"})}}),H(Q,{when:e,get children(){return H(vt,{onClick:i,children:"check"})}}),H(Q,{when:e,get children(){return H(vt,{onClick:c,children:"log"})}}),H(mt,{onClick:l,get children(){return o.type}}),H(bt,{target:"_new",get href(){return o.permalink},get children(){return o.permalink||"/"}})]}})},kt=({type:e})=>{const[t,{apiUrl:n}]=k(Te),[r,o]=Ne({list:[]}),[i,l]=g(!1);f((async()=>{const e=(await Ge("get_all_resources")).list.map(((e,t)=>({...e,index:t})));o({list:e})}));const s=async t=>{try{(await We(`${n}/sync.php`,{action:"sync",permalink:t.permalink,release:e,sync_check:!1})).data?o("list",t.index,"status",{[e]:{synced:!0},state:"loaded"}):o("list",t.index,"status",{state:"error"})}catch(e){o("list",t.index,"status",{state:"error"})}},a="draft"===e?"Begin to sync to Draft":"Publish everything to Live",c="draft"===e?"Sync Draft":"Sync Live",d="draft"===e?"This is where you can make sure that wordpress and the draft content is in sync":"This is where you can make sure that Draft and Live are in sync";return H(et,{get children(){return[H(at,{title:c,description:d,get actions(){return H(ht,{get loading(){return i()},onClick:()=>(async()=>{if(i())return;let t=!1;if(("live"===e&&confirm("Do you really which to publish everything?")||"draft"===e)&&(t=!0),t){l(!0),r.list.forEach(((e,t)=>{o("list",t,"status",{state:""}),t++}));for await(let e of r.list)await s(e);l(!1)}})(),children:a})}}),H(J,{get each(){return r.list},children:t=>H(xt,{showDraft:"draft"===e,showLive:"live"===e,showSyncButton:!0,onClick:()=>(async e=>{l(!0),await s(e),l(!1)})(t),onTypeClick:()=>(async e=>{l(!0);const t=r.list.filter((t=>t.type===e));t.forEach(((e,t)=>{o("list",t,"status",{state:""}),t++}));for await(let e of t)await s(e);l(!1)})(t.type),item:t,get permalink(){return t.permalink}})})]}})},St=()=>{const[e,{apiUrl:t}]=k(Te),[n,r]=Ne({list:[]}),[o,i]=g(!1);console.log(t),f((async()=>{const e=(await Ge("get_all_resources")).list.map(((e,t)=>({...e,index:t})));r({list:e})}));const l=async e=>{try{const n=await We(`${t}/check-sync.php`,{permalink:e.permalink});r("list",e.index,"status",{draft:n.data.resourceStatus.find((e=>"draft"===e.target&&"__original"===e.comparedTo)),live:n.data.resourceStatus.find((e=>"live"===e.target&&"draft"===e.comparedTo)),state:"loaded"})}catch(t){r("list",e.index,"status",{state:"error"})}};return H(et,{get children(){return[H(at,{title:"Sync Check",description:"This is where you can check if all content is in sync",get actions(){return H(ht,{get loading(){return o()},onClick:()=>(async()=>{if(!o()){i(!0),n.list.forEach(((e,t)=>{r("list",t,"status",{state:""}),t++}));for await(let e of n.list)await l(e);i(!1)}})(),children:"Begin to check"})}}),H(J,{get each(){return n.list},children:e=>H(xt,{showDraft:!0,showLive:!0,showCheckButton:!0,item:e,getAllTargetsContent:()=>(async e=>await We(`${t}/get-all-targets-content.php`,{permalink:e}))(e.permalink),get permalink(){return e.permalink},onClick:()=>(async e=>{i(!0),await l(e),i(!1)})(e),onTypeClick:()=>(async e=>{i(!0);const t=n.list.filter((t=>t.type===e));t.forEach(((e,t)=>{r("list",t,"status",{state:""}),t++}));for await(let e of t)await l(e);i(!1)})(e.type)})})]}})},Ct=Je("p")`
    font-size: 14px;
    padding-bottom: .5rem;
    background-color: #ffeaee;
    border: 2px solid #ffc0cb;
    border-radius: 3px;
    padding: 1rem 2rem;
    text-align: center;
`,jt=()=>H(et,{get children(){return[H(at,{title:"Start",description:"This plugin lets you control and debug content through the content service."}),H(Ct,{children:"This is mainly used while developing or by admins!"})]}}),At=Je("div")`
     color: black;
     max-width: 1200px;
     margin: 0 auto;
`;Je("div")`
`,Je("div")`
    font-size: 1rem;
    padding: 1rem 0;
`;const Pt=()=>{const[e]=k(Te);return H(At,{get children(){return[H(it,{children:"Content Dashboard"}),H(Xe,{}),H(Q,{get when(){return"start"===e.path},get children(){return H(jt,{})}}),H(Q,{get when(){return"sync-check"===e.path},get children(){return H(St,{})}}),H(Q,{get when(){return"sync-draft"===e.path},get children(){return H(kt,{type:"draft"})}}),H(Q,{get when(){return"sync-live"===e.path},get children(){return H(kt,{type:"live"})}})]}})},qt=Je("div")`

    padding-top: 6px;
    box-sizing: border-box !important;

    ${e=>e.horizontal?"\n        display: flex;   \n        align-items: center;\n        border-bottom: 1px dotted grey;\n        padding: 0 10px 8px 10px;\n        margin-left: -10px;\n        margin-right: -10px;\n        justify-content: flex-end;\n    ":""} 

    ${e=>e.box?"\n        position: relative;\n        min-width: 255px;\n        border: 1px solid #ccd0d4;\n        box-shadow: 0 1px 1px rgb(0 0 0 / 4%);\n        background: #fff;\n        padding: 1rem;\n        box-sizing: border-box;\n        margin-bottom: 7px;\n    ":""}

`,_t=Je("div")`
    color: red;
    padding-top: 0.4rem;
`,Mt=Je("div")`
    color: darkgray;
    padding-top: 0.4rem;
`,Et=Je("div")`
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

`,Nt=Je("div")`
    text-align: center;
    min-width: 100px;
    ${e=>e.horizontal?"\n        margin-top: 10px;\n    ":""}

`,[Tt,Dt]=Ne({options:{},setChecking:()=>!0,syncStatus:{},publish:()=>null,changesNotSavedToDraft:!1,showRejectionControls:!1,rejectionReason:"",approvalStatus:"",errorMessage:"",approvedBy:""}),$t=e=>{Dt({approvalStatus:e})},Lt=()=>{Dt((e=>({showRejectionControls:!e.showRejectionControls})))},Rt=async(e="")=>{Tt.setChecking(!0);const t=await(async e=>{try{var t;return await We(`${Tt.options.api}/upsert-publication-request.php`,{permalink:Tt.options.permalink,status:e,editorUrl:null===(t=window)||void 0===t?void 0:t.location.href,approvedBy:"approved"===e||"approvedAndPublished"===e?Tt.options.userName:"",rejectedBy:"rejected"===e?Tt.options.userName:"",requestedBy:"pending"===e?Tt.options.userName:Tt.requestedBy,rejectionReason:Tt.rejectionReason}),{}}catch(e){return console.log("Error upserting publication request",e),{err:e}}})(e);t.err?(Dt({errorMessage:"Error changing status to "+e}),console.log("Err upserting request",t.err)):$t(e),Tt.setChecking(!1),zt()},zt=async()=>{const{postTitle:e,rejectionReason:t,approvalStatus:n,editorEmail:r}=Tt,{userName:o,siteTitle:i}=Tt.options;try{var l;await We(`${Tt.options.api}/send-publication-approval-email.php`,{data:{useCustomMailSystem:Tt.options.useCustomSmtp,postTitle:e,rejectionReason:t,approvalStatus:n,admin:o,editorEmail:r,siteTitle:i,postUrl:null===(l=window)||void 0===l?void 0:l.location.href}})}catch(e){console.log("Error sending email")}},Bt=async()=>{Tt.setChecking(!0);const e=await(async()=>{console.log("Deleting pub request for "+Tt.options.permalink+": ",Tt);try{var e,t;const o=await We(`${Tt.options.api}/delete-publication-request.php`,{postId:Tt.options.postId});var n,r;return null!=o&&null!==(e=o.data)&&void 0!==e&&null!==(t=e.deleteResource)&&void 0!==t&&t.success||console.log("Unable to delete publication request because: ",null==o||null===(n=o.errors)||void 0===n||null===(r=n[0])||void 0===r?void 0:r.message),{}}catch(e){return console.log("Error deleting request",e),{err:e}}})();e.err?(Dt({errorMessage:"Something went wrong withdrawing publication request"}),console.log("Err deleting request",e.err)):$t(""),Tt.setChecking(!1)},Ot=le("<em></em>"),It=Je("div")`
    padding: 0.25rem;
    background: #fefbe6;
`,Ut=()=>H(V,{get children(){return[H(X,{get when(){return"pending"===Tt.approvalStatus},get children(){return H(Nt,{get horizontal(){return Tt.options.metaMenu},children:"Pending approval"})}}),H(X,{get when(){return"approved"===Tt.approvalStatus},get children(){return H(Nt,{get horizontal(){return Tt.options.metaMenu},get children(){return["Publication approved ",ne((()=>Tt.approvedBy?" by "+Tt.approvedBy:""))]}})}}),H(X,{get when(){return"rejected"===Tt.approvalStatus},get children(){return[H(Nt,{get horizontal(){return Tt.options.metaMenu},get children(){return["Publication rejected ",ne((()=>Tt.rejectedBy?" by "+Tt.rejectedBy:""))]}}),H(Q,{get when(){return Tt.rejectionReason},get children(){return H(It,{get children(){const e=Ot.cloneNode(!0);return ge(e,(()=>Tt.rejectionReason)),e}})}})]}})]}}),Ht=()=>H(ht,{get leftMargin(){return Tt.options.metaMenu},get loading(){return Tt.publishing},onClick:e=>Tt.publish(e),get disabled(){var e;return Tt.changesNotSavedToDraft||(null===(e=Tt.syncStatus.live)||void 0===e?void 0:e.synced)},get children(){var e,t,n;return Tt.changesNotSavedToDraft?null!==(e=Tt.syncStatus.live)&&void 0!==e&&e.exists?"Save draft before updating on live":"Save draft before publishing to live":null!==(t=Tt.syncStatus.live)&&void 0!==t&&t.exists?null!==(n=Tt.syncStatus.live)&&void 0!==n&&n.synced?"Updated on live site":"Update on live site":"Publish to live site"}}),Ft=le('<div><h4>Rejection reason</h4><textarea rows="4" placeholder="Message to the editor" maxlength="200"></textarea><div></div></div>'),Kt=()=>[H(ht,{get leftMargin(){return Tt.options.metaMenu},onClick:e=>Rt("approved"),get disabled(){return Tt.showRejectionControls},children:"Approve"}),H(Q,{get when(){return!Tt.showRejectionControls},get children(){return H(ht,{get leftMargin(){return Tt.options.metaMenu},onClick:e=>{Lt()},get disabled(){return Tt.showRejectionControls},children:"Reject"})}}),H(Q,{get when(){return Tt.showRejectionControls},get children(){const e=Ft.cloneNode(!0),t=e.firstChild,n=t.nextSibling,r=n.nextSibling;return e.style.setProperty("margin-block","1.5rem"),t.style.setProperty("margin-bottom",0),n.addEventListener("change",(e=>{var t;t=e.target.value,Dt({rejectionReason:t})})),n.style.setProperty("width","100%"),n.style.setProperty("margin-top","0.5rem"),r.style.setProperty("display","flex"),ge(r,H(ht,{get leftMargin(){return Tt.options.metaMenu},onClick:e=>Lt(),disabled:!1,style:{"margin-top":0,"margin-right":"0.2rem"},children:"Cancel"}),null),ge(r,H(ht,{get leftMargin(){return Tt.options.metaMenu},onClick:e=>Rt("rejected"),disabled:!1,style:{"margin-top":0},children:"Send rejection"}),null),e}}),H(Q,{get when(){return!Tt.showRejectionControls},get children(){return H(Ht,{})}})],Yt=le("<div><h5>Debug Panel</h5></div>"),Jt=()=>(()=>{const e=Yt.cloneNode(!0),t=e.firstChild;return e.style.setProperty("background","lightgray"),e.style.setProperty("padding","0.5rem"),e.style.setProperty("margin","0.5rem"),t.style.setProperty("text-align","center"),ge(e,H(ht,{get leftMargin(){return Tt.options.metaMenu},onClick:e=>Rt("approved"),disabled:!1,children:"Approve"}),null),ge(e,H(ht,{get leftMargin(){return Tt.options.metaMenu},onClick:e=>Rt("rejected"),disabled:!1,children:"Reject"}),null),ge(e,H(ht,{get leftMargin(){return Tt.options.metaMenu},onClick:e=>Rt("pending"),get disabled(){return Tt.changesNotSavedToDraft},children:"Set to pending"}),null),e})(),Qt=()=>[H(Q,{when:false,get children(){return H(Jt,{})}}),H(Q,{get when(){return Tt.options.userHasPublicationRights},get children(){return H(Q,{get fallback(){return H(Ht,{})},get when(){return"pending"===Tt.approvalStatus},get children(){return H(Kt,{})}})}}),H(Q,{get when(){return!Tt.options.userHasPublicationRights},get children(){return[H(Q,{get when(){return""===Tt.approvalStatus||"rejected"===Tt.approvalStatus||"approvedAndPublished"===Tt.approvalStatus},get children(){return H(ht,{get leftMargin(){return Tt.options.metaMenu},onClick:e=>Rt("pending"),get disabled(){return Tt.changesNotSavedToDraft},get children(){return Tt.changesNotSavedToDraft?"Save draft before publishing request":"Request approval to publish"}})}}),H(Q,{get when(){return"pending"===Tt.approvalStatus},get children(){return H(ht,{get leftMargin(){return Tt.options.metaMenu},onClick:e=>Bt(),disabled:!1,children:"Withdraw publication request"})}}),H(Q,{get when(){return"approved"===Tt.approvalStatus},get children(){return H(ht,{get leftMargin(){return Tt.options.metaMenu},get loading(){return Tt.publishing},onClick:e=>Tt.publish(e),get disabled(){return Tt.changesNotSavedToDraft},get children(){return Tt.changesNotSavedToDraft?"Discard unapproved changes to publish":"Publish to live site"}})}})]}})],Vt=()=>H(Q,{get when(){return"pending"===Tt.approvalStatus&&Tt.changesNotSavedToDraft},get children(){return H(Mt,{children:"Saving a new draft will automatically withdraw the pending publication approval"})}}),Xt=({options:e})=>{const[t,n]=Ne({}),[r,o]=g(!0),[i,l]=g(!1),[s,a]=g(!1),[c,d]=g(!1),[u,p]=g(!1),[h,m]=g(!1),[v,b]=g(!1),[w,x]=g(!1),[k,S]=g(!1),[C,j]=g(null);let A,P,q={permalink:e.permalink};const M=!e.metaMenu&&!e.optionsMeta;y((()=>{if(!M)return;e.requireApproval&&Dt({options:e,setChecking:o,syncStatus:t,publish:e=>z(e)});setTimeout((()=>{const e="_new",t=document.createElement("a");t.classList.add("components-button"),t.classList.add("is-secondary"),"auto-draft"===wp.data.select("core/editor").getCurrentPost().status&&(t.style.display="none"),t.innerHTML="Preview",j(t),document.querySelector(".edit-post-header__settings").prepend(t),t.addEventListener("click",(function(t){const n=wp.data.select("core/editor").getEditedPostPreviewLink();wp.data.select("core/editor").isEditedPostDirty()?(t.preventDefault(),t.stopPropagation(),wp.data.dispatch("core/editor").savePost({isPreview:!0}).then((()=>{window.open(n,e)}))):window.open(n,e)}))}),700)})),f((()=>{var t,n;e.metaMenu?(P=document.querySelector("#save_menu_footer"),T()):null!==(t=wp)&&void 0!==t&&null!==(n=t.data)&&void 0!==n&&n.select&&(A=wp.data.select("core/editor"),wp.domReady(E))})),f((()=>{wp&&wp.hooks&&wp.hooks.addAction&&($(),wp.hooks.addAction("dls.post-saved","dls",(()=>{var e,n,r;if(null!=t&&null!==(e=t.draft)&&void 0!==e&&e.exists||null===(n=A)||void 0===n||!n.isPublishingPost())null!=t&&null!==(r=t.draft)&&void 0!==r&&r.exists&&(E(),$());else{let e=0;const t=()=>{const e=A.getPermalink(),t=/http(s|):\/\/(.*?)(\/[\w\/-]*)\//gm.exec(e);return t?t[3]:""},n=()=>{if("auto-draft"!==A.getCurrentPost().status)return q={permalink:t()},p(!1),S(!1),$(),void(C().style.display="flex");e++<=50&&setTimeout(n,100)};n()}})))})),f((()=>{let e;document.addEventListener("cerberusListenerEvent",(t=>{var n;null!=t&&null!==(n=t.detail)&&void 0!==n&&n.hasChange&&(e||(e=document.querySelector(".editor-post-publish-button"),e.addEventListener("click",(()=>{b(!1),e.setAttribute("disabled",!0),window.onbeforeunload=null}))),e&&(b(!0),e.removeAttribute("disabled"),window.onbeforeunload=()=>!0))}))}));const E=()=>{let e;const t=wp.data.subscribe(_.debounce((()=>{e||(e=document.querySelector(".editor-post-publish-button"));const n=A.isEditedPostDirty(),r=A.hasNonPostEntityChanges(),o=v();r||n||o?(p(!0),e&&e.addEventListener("click",N),e&&e.removeAttribute("disabled"),t()):(p(!1),e&&e.removeEventListener("click",N),e&&e.setAttribute("disabled",!0))}),100))},N=()=>{""!==Tt.approvalStatus&&M&&e.requireApproval&&Tt.options.requireApproval&&Bt()},T=()=>{let e,t=!1;P.setAttribute("disabled",!0);let n=()=>{t||clearInterval(e)},r=()=>{t||(e=o())};const o=()=>setInterval((()=>{var o,i;null!==(o=window)&&void 0!==o&&null!==(i=o.wpNavMenu)&&void 0!==i&&i.menusChanged&&(t=!0,D(),clearInterval(e),window.removeEventListener("blur",n),window.removeEventListener("focus",r))}),500);e=o(),window.addEventListener("blur",n),window.addEventListener("focus",r)},D=()=>{P.removeAttribute("disabled"),m(!0)},$=async(r=!0)=>{r&&(o(!0),await new Promise((e=>setTimeout(e,1e3))));try{var i;const r=await Ge("check_sync",{...q,api_path:q.permalink});if(null==r||null===(i=r.data)||void 0===i||!i.resourceStatus)throw q;n({draft:r.data.resourceStatus.find((e=>"draft"===e.target&&"__original"===e.comparedTo)),live:r.data.resourceStatus.find((e=>"live"===e.target&&"draft"===e.comparedTo)),state:"loaded"}),console.log("status: ",t),S(!1),M&&e.requireApproval&&(async()=>{try{var e;const t=await We(`${Tt.options.api}/get-publication-request.php`,{postId:Tt.options.postId});if(null!==(e=t.data.resource)&&void 0!==e&&e.content){const e=t.data.resource.content;Dt({approvalStatus:e.status,approvedBy:e.approvedBy,rejectedBy:e.rejectedBy,rejectionReason:e.rejectionReason||"",requestedBy:e.requestedBy,editorEmail:e.from_user_email,postTitle:e.post_title,siteTitle:e.from_site_name}),console.log(`Publication request for ${Tt.options.permalink}: `,Tt)}else console.log("No publication request found for:",Tt.options.permalink),$t("")}catch(e){console.log("Error fetching publication request",e)}})(),e.metaMenu&&L()}catch(e){console.log("--- meta-box --- Can't find any data with check-sync of payload: ",e),S(!0),o(!1),n({state:"error"})}o(!1)},L=async()=>{var e;const n=document.querySelectorAll(".menu-theme-locations > .menu-settings-input"),r=document.querySelector(".menu-settings-group.menu-theme-locations"),o=document.createElement("i");o.classList.add("changes-disabled-message");const i=null===(e=t.draft)||void 0===e?void 0:e.exists,l=t.live&&t.live.exists;!i||l?(r.style.pointerEvents="none",r.style.cursor="not-allowed",r.style.opacity=.5):(r.style.pointerEvents="auto",r.style.cursor="default",r.style.opacity=1);const s=document.querySelector(".changes-disabled-message");if(l){const e="Menu must be unpublished before toggling location";s?s.innerHTML=e:(o.innerHTML=e,r.prepend(o))}else{const e="Menu must be created before toggling location";i?s&&s.parentNode.removeChild(s):s?s.innerHTML=e:(o.innerHTML=e,r.prepend(o))}let a=!1,c=!1;for(let e of n){const t=e.querySelector("input");t.addEventListener("change",(()=>{d(!0),D()}));e.querySelector(".theme-location-set")&&(t.setAttribute("disabled",!0),e.style.pointerEvents="none",e.style.opacity=.5,c=!0),t.getAttribute("checked")&&(a=!0)}if(c&&!l&&i){const e=document.querySelector(".changes-disabled-message"),t="Some locations cannot be set because they are already set";e?e.innerHTML=t:(o.innerHTML=t,r.prepend(o))}if(location.search.includes("menu=0"))return;x(!0);const u=document.querySelector(".submitdelete.deletion.menu-delete");let p=document.querySelector(".delete-link-replacement");a||l?(u.style.display="none",p?p.style.display="inline":(p=document.createElement("span"),p.classList.add("delete-link-replacement"),p.innerHTML="To delete a menu it must be unpublished (and unregisterered from all display locations)",p.style.color="#a7aaad",p.style.fontSize="12px"),u.parentNode.prepend(p)):(u.style.display="inline",p&&(p.style.display="none"))},R=(e={})=>{if(document){const t=new CustomEvent("cerberusChangeEvent",{detail:e});document.dispatchEvent(t)}},z=async t=>{t.preventDefault(),t.stopPropagation(),l(!0),!0===e.requireApproval&&""!==Tt.approvalStatus&&await Rt("approvedAndPublished");(await Ge("publish_to_live",q)).data?$(!1):n({state:"error"}),await new Promise((e=>setTimeout(e,1e3))),l(!1),R({action:"publish_to_live_done"})},B=async e=>{e.preventDefault(),e.stopPropagation(),a(!0);(await Ge("unpublish_from_live",q)).data?$(!1):n({state:"error"}),await new Promise((e=>setTimeout(e,1e3))),a(!1),R({action:"unpublish_from_live_done"})};f((()=>{M&&Dt({changesNotSavedToDraft:O()})})),f((()=>{M&&Dt({publishing:i()})}));const O=()=>u()||h()||v();return H(qt,{get horizontal(){return e.metaMenu},get box(){return e.optionsMeta},get children(){return[H(Q,{get when(){return r()},get children(){return H(Et,{get horizontal(){return e.metaMenu},get children(){return[H(ut,{get size(){return e.metaMenu?"small":"large"}}),H(Nt,{children:"Checking content in draft and live"})]}})}}),H(Q,{get when(){return!r()},get children(){return[H(Q,{get when(){return k()},get children(){return H(Et,{get horizontal(){return e.metaMenu},get children(){return H(Nt,{children:"Content must be saved before publishing"})}})}}),H(Q,{get when(){var e;return!c()&&(null===(e=t.draft)||void 0===e?void 0:e.exists)},get children(){return[H(Q,{get when(){return M&&e.requireApproval},get children(){return H(Ut,{})}}),H(Q,{get when(){return!e.requireApproval},get children(){return H(Nt,{get horizontal(){return e.metaMenu},children:"Publish content"})}}),ne((()=>M&&e.requireApproval?H(Qt,{}):H(ht,{get leftMargin(){return e.metaMenu},get loading(){return i()},onClick:e=>z(e),get disabled(){return O()},get children(){return O()?"Save draft before publishing to live":"Publish to live site"}}))),H(Q,{get when(){var e;return!(null!==(e=t.live)&&void 0!==e&&e.exists)},get children(){return[H(ht,{get leftMargin(){return e.metaMenu},disabled:!0,children:"Content not published"}),H(Q,{when:M,get children(){return H(Vt,{})}})]}}),H(Q,{get when(){var e;return null===(e=t.live)||void 0===e?void 0:e.exists},get children(){return[H(ht,{get leftMargin(){return e.metaMenu},get loading(){return s()},onClick:e=>B(e),get disabled(){return v()},children:"Unpublish"}),H(Q,{when:M,get children(){return H(Vt,{})}})]}})]}}),H(Q,{get when(){return e.metaMenu},get children(){return H(Et,{get horizontal(){return e.metaMenu},get children(){return[H(Q,{get when(){return!w()},get children(){return H(Nt,{children:"Enter a 'Menu Name' above to create a new menu"})}}),(()=>{const e=ne((()=>{var e;return!(c()||null!==(e=t.draft)&&void 0!==e&&e.exists)}),!0);return H(Q,{get when(){return e()&&w()},get children(){return H(Nt,{children:"Save menu with menu items in order to publish"})}})})(),H(Q,{get when(){return c()},get children(){return H(Nt,{children:"Save the changes before publishing"})}})]}})}})]}}),H(Q,{get when(){return e.enableTestContent},get children(){return H(ht,{get leftMargin(){return e.metaMenu},get loading(){return s()},onClick:e=>B(e),get disabled(){var e;return!(null!==(e=t.test)&&void 0!==e&&e.synced)},get children(){return t.test&&t.test.synced?"Unpublish from test target":"Publish to test target"}})}}),H(Q,{get when(){return Tt.errorMessage},get children(){return H(_t,{get children(){return Tt.errorMessage}})}})]}})},Gt=Je("input")`
`,Wt=Je("div")`
    display: flex;
    flex-direction: column;
    width: 100%;
    padding-right: 10px;
    box-sizing: border-box;
`,Zt=Je("label")`
    padding: 5px 5px 0px 5px;
    font-size: 10px;
    height: 18px;
`,en=({placeholder:e="",label:t=" ",value:n,onChange:r=(()=>{})})=>{const o=e=>{r(e.target.value)};return H(Wt,{get children(){return[H(Zt,{children:t}),H(Gt,{type:"text",get value(){return n()},placeholder:e,onKeyup:o})]}})},tn=Je("select")`
    max-width: 100% !important;
`,nn=Je("div")`
    display: flex;
    flex-direction: column;
    width: 100%;
    padding-left: 10px;
    box-sizing: border-box;
`,rn=Je("label")`
    padding: 5px 5px 0px 5px;
    font-size: 10px;
    height: 18px;
`,on=le("<option></option>"),ln=({options:e=[],placeholder:t="",label:n=" ",value:r,onChange:o=(()=>{})})=>{const i=e=>{console.log(e),o(e.target.value)};return H(nn,{get children(){return[H(rn,{children:n}),H(tn,{get value(){return r()},placeholder:t,onChange:i,get children(){return H(J,{each:e,children:e=>(()=>{const t=on.cloneNode(!0);return ge(t,(()=>e.label)),h((n=>{const o=e.value,i=e.value===r();return o!==n._v$&&(t.value=n._v$=o),i!==n._v$2&&(t.selected=n._v$2=i),n}),{_v$:void 0,_v$2:void 0}),t})()})}})]}})},sn={open:Ke`
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
`},an=Je("div")`
     color: black;
     max-width: 1200px;
     margin: 0 auto;
`;Je("div")`
`,Je("div")`
    font-size: 1rem;
    padding: 1rem 0;
`;const cn=Je("div")`
    display: flex;
    justify-content: flex-end;
`,dn=Je("div")`
    max-height: 0px;
    overflow: hidden;
    ${e=>`animation: ${sn[e.state]} .4s ease-in-out forwards;`}
`,un=Je("div")`
    background-color: #fff;
    border: 1px solid #aaa;
    border-radius: 3px;
    margin-top: 20px;
    padding: 20px;
`,pn=Je("div")`
    width: 100%;
    display: flex;
    padding-bottom: 10px;
`,gn=Je("div")`
    width: 100%;
    display: flex;
    justify-content: flex-end;
`,hn=Je("div")`
    color red;
`,fn=Je("div")`
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
`,mn=Je("table")`
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
`,vn=Je("td")`
    display: flex;
    justify-content: flex-end;
`,bn=le("<thead><tr><th>Domain</th><th>Distribution ID</th><th>Target</th><th>SiteId</th><th></th></tr></thead>"),yn=le("<tbody></tbody>"),wn=le("<tr><td></td><td></td><td></td><td></td></tr>"),xn=[{value:"draft",label:"Draft"},{value:"live",label:"Live"},{value:"test",label:"Test"}];const kn=({options:e})=>{const[t,n]=Ne({list:[]}),[r,o]=g(""),[i,l]=g(""),[s,a]=g("draft"),[c,d]=g("init"),[u,p]=g(""),[h,m]=g(!1),v=async()=>{const t=await We(`${e.api}/get-domain-settings.php`);n("list",t)},b=async(t=function(e){for(var t="",n="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",r=n.length,o=0;o<e;o++)t+=n.charAt(Math.floor(Math.random()*r));return t}(20))=>{try{if(p(""),h())return;m(!0),await We(`${e.api}/upsert-domain-setting.php`,{domain:r(),target:s(),id:t,cloudfrontDistributionId:i()}),await v(),a("draft"),o(""),l(""),m(!1),d("close")}catch(e){console.log("ee",e),"domain-already-exists"===e.error?p("Domain already exists"):p("Something caused an error"),m(!1)}},y=(e,t)=>{"domain"===e&&o(t),"target"===e&&a(t),"cloudfrontDistributionId"===e&&l(t)};return f((()=>{v()})),H(an,{get children(){return[H(it,{children:"Domain Settings"}),H(ot,{children:"This is the list of domains and targets that will be used for this site. You can add as many as you need but the domains need to be pointed to the server to make it work."}),H(cn,{get children(){return H(ht,{onClick:()=>d("open"),children:"Add new domain and target"})}}),H(dn,{get state(){return c()},get children(){return H(un,{get children(){return[H(st,{children:"Add new domain and target"}),H(pn,{get children(){return[H(en,{placeholder:"domain",label:"Domain:",value:r,onChange:e=>y("domain",e)}),H(en,{placeholder:"distribution id",label:"Cloudfront Distribution ID:",value:i,onChange:e=>y("cloudfrontDistributionId",e)}),H(ln,{options:xn,value:s,onChange:e=>y("target",e)})]}}),H(Q,{when:u,get children(){return H(hn,{children:u})}}),H(gn,{get children(){return[H(ht,{onClick:()=>d("close"),children:"Cancel"}),H(ht,{get loading(){return h()},leftMargin:!0,get disabled(){return!r()||!s()},onClick:()=>b(),children:"Save"})]}})]}})}}),H(mn,{get children(){return[bn.cloneNode(!0),(()=>{const n=yn.cloneNode(!0);return ge(n,H(J,{get each(){return t.list},children:t=>(()=>{const n=wn.cloneNode(!0),r=n.firstChild,o=r.nextSibling,i=o.nextSibling,l=i.nextSibling;return ge(r,(()=>t.content.domain)),ge(o,(()=>t.content.cloudfrontDistributionId)),ge(i,(()=>t.content.target)),ge(l,(()=>t.content.siteId)),ge(n,H(vn,{get children(){return H(fn,{onClick:()=>(async t=>{try{await We(`${e.api}/delete-domain-setting.php`,{id:t}),await v()}catch(e){console.log(e)}})(t.externalId),children:"delete"})}}),null),n})()})),n})()]}})]}})},Sn=le("<span>, requested by <em></em></span>"),Cn=le("<span> - rejected by <em></em></span>"),jn=le("<span> - approved by <em></em></span>"),An=le("<em></em>"),Pn=Je("div")`
    text-transform: uppercase;
    font-size: 13px;
    margin-right: 0.5rem;
    background-color: rgba(0,0,0,0.1);
    padding: 0.2rem 0.35rem;
    min-width: 50px;
    display: flex;
    justify-content: center;
    align-self: flex-start;
`,qn=Je("a")`
    ${e=>e.href?"":"color: black;"}
    font-weight: bold;
    text-transform: capitalize;
    text-decoration: none;
`,_n=Je("p")`
    margin: 0;
    font-size: inherit;
    color: gray;
`,Mn=Je("h5")`
    margin: 0;
    margin-bottom: 0.3rem;
    text-decoration: underline;
`,En=Je("div")`
    margin-top: 0.8rem;
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    font-size: 15px;
`,Nn=Je("div")`
    display: flex;
    align-items: flex-start;
    margin-top: -10px;
    padding-inline: 1rem;
`,Tn=Je("div")`
    padding-left: 1rem;
    margin-top: 0.5rem;
`,Dn=e=>{const t=()=>{console.log("Request data: ",e.item)};return H(En,{get key(){return e.item.content.post_id},get children(){return[H(Pn,{onClick:t,get children(){return e.item.content.type}}),H(_n,{get children(){return[H(qn,{get href(){return(()=>{const t=e.item.content["wp-domain"];return e.item.content.editorUrl.includes(t)?e.item.content.editorUrl:`${e.item.content["wp-domain"]}${e.item.content.editorUrl}`})()},target:"_blank",get children(){return e.item.content.post_title}}),H(Q,{get when(){return"admin"===e.type},get children(){const t=Sn.cloneNode(!0);return ge(t.firstChild.nextSibling,(()=>e.item.content.requestedBy)),t}}),H(Q,{get when(){return"rejected"===e.item.content.status},get children(){const t=Cn.cloneNode(!0);return ge(t.firstChild.nextSibling,(()=>e.item.content.rejectedBy)),t}}),H(Q,{get when(){return"approved"===e.item.content.status||"approvedAndPublished"===e.item.content.status},get children(){const t=jn.cloneNode(!0);return ge(t.firstChild.nextSibling,(()=>e.item.content.approvedBy)),t}}),ne((()=>` (${(()=>{const t=new Date(e.item.content.updated_on);return t.getFullYear()+"-"+(t.getMonth()+1).toString().padStart(2,"0")+"-"+t.getDate().toString().padStart(2,"0")+", "+t.getHours().toString().padStart(2,"0")+":"+t.getMinutes().toString().padStart(2,"0")})()})`)),H(Q,{get when(){return"rejected"===e.item.content.status},get children(){return H(Tn,{get children(){return[H(Mn,{children:"Rejection message:"}),(()=>{const t=An.cloneNode(!0);return ge(t,(()=>e.item.content.rejectionReason)),t})()]}})}})]}}),H(Nn,{get children(){return H(ht,{get onClick(){return e.manualDelete},children:"Delete"})}})]}})},$n=le("<p></p>"),Ln=le("<p>Reload page</p>"),Rn=le("<div></div>"),zn=Je("div")`
    margin-bottom: 3rem;
`,Bn=Je("div")`
    margin-top: 1rem;
    margin-bottom: 2rem;
`,On=Je("p")`
    font-size: 15px;
`,In=Je("div")`
    width: 100%;
    border-bottom: solid 2px #c3c4c7;
    height: 2rem;
    display: flex;
    align-items: flex-end;
`,Un=Je("div")`
    background-color: white;
    width: 100%;
    padding: 2rem 1rem;
    box-sizing: border-box;
    border: solid 2px #c3c4c7;
    border-top: none;
`,Hn=Je("button")`
    padding: 1rem;
    border: solid 1px #c3c4c7;
    border-bottom: solid 2px #c3c4c7;
    margin-left: 4px;
    border-radius: 3px 3px 0 0;
    transition: all 0.3s ease-in-out;
    transform: translateY(2px);
    cursor: pointer;
    background-color: #f0f0f1;

    ${e=>e.isActive&&"\n        border-bottom: solid 2px transparent;\n        background-color: white;\n    "}
`,Fn=[{slug:"pending",name:"Pending"},{slug:"approved",name:"Approved"},{slug:"approvedAndPublished",name:"Published"},{slug:"rejected",name:"Rejected"}],Kn=({options:e})=>{const[t,n]=g([]),[r,o]=g([]),[i,l]=g([]),[s,a]=g([]),[c,d]=g(!1),[u,p]=g(""),[h,f]=g("pending");y((()=>{d(!0),m()}));const m=async()=>{try{var t;const n=await We(`${e.api}/get-publication-requests.php`);v(null==n||null===(t=n.data)||void 0===t?void 0:t.resources)}catch(e){console.log("Error fetching all publication requests",e),p("Error fetching all publication requests")}},v=(e=[])=>{const t={pending:{},approved:{},approvedAndPublished:{},rejected:{}};console.log("Unsorted requests",e);e.sort(((e,t)=>new Date(t.content.updated_on)-new Date(e.content.updated_on))).forEach((e=>{const n=e.content.status,r=b(e.content["wp-domain"]),o=e.content.from_site_name+" - "+r;t[n][o]||(t[n][o]=[]),t[n][o].push(e)})),console.log("Approved: ",t.approved),console.log("Approved And Published: ",t.approvedAndPublished),console.log("Pending: ",t.pending),console.log("Rejected: ",t.rejected),n(t.approved),o(t.approvedAndPublished),a(t.rejected),l(t.pending),d(!1)},b=e=>{const t=e.indexOf("://");return e.slice(t+3)},w=({title:t,siteRequests:n})=>{const r=Object.keys(n);return H(zn,{get children(){return[H(st,{children:t}),H(Q,{get when(){return 0!==r.length},get fallback(){return H(_n,{children:"None to show"})},get children(){return H(J,{each:r,children:t=>H(Bn,{get children(){return[H(On,{children:t}),H(J,{get each(){return n[t]},children:t=>H(Dn,{item:t,manualDelete:()=>(async t=>{console.log("Deleting publication request: "+t);try{var n;const o=await We(`${e.api}/delete-publication-request.php`,{postId:t});var r;if(console.log("Delete result",o),null!=o&&null!==(n=o.errors)&&void 0!==n&&n.length)throw new Error(null===(r=o.errors[0])||void 0===r?void 0:r.message);m()}catch(e){console.log("Error deleting publication request",e),p("Error deleting publication request")}})(t.content.post_id),type:"admin"})})]}})})}})]}})};return(()=>{const e=Rn.cloneNode(!0);return ge(e,H(it,{children:"Publication requests"}),null),ge(e,H(In,{get children(){return H(J,{each:Fn,children:(e,t)=>H(Hn,{get isActive(){return e.slug===h()},onClick:()=>f(e.slug),get children(){return e.name}})})}}),null),ge(e,H(Un,{get children(){return[(()=>{const e=ne((()=>!!c()),!0);return H(Q,{get when(){return e()&&!u()},get children(){return H(_n,{children:"Loading..."})}})})(),(()=>{const e=ne((()=>!("pending"!==h()||c())),!0);return H(Q,{get when(){return e()&&!u()},get children(){return w({title:"Pending",siteRequests:i()})}})})(),(()=>{const e=ne((()=>!("approved"!==h()||c())),!0);return H(Q,{get when(){return e()&&!u()},get children(){return w({title:"Approved",siteRequests:t()})}})})(),(()=>{const e=ne((()=>!("approvedAndPublished"!==h()||c())),!0);return H(Q,{get when(){return e()&&!u()},get children(){return w({title:"Published",siteRequests:r()})}})})(),(()=>{const e=ne((()=>!("rejected"!==h()||c())),!0);return H(Q,{get when(){return e()&&!u()},get children(){return w({title:"Rejected",siteRequests:s()})}})})(),H(Q,{get when(){return u()},get children(){return[(()=>{const e=$n.cloneNode(!0);return ge(e,u),e})(),Ln.cloneNode(!0)]}})]}}),null),e})()},Yn=le("<p></p>"),Jn=le("<p>Reload page</p>"),Qn=le("<div></div>"),Vn=Je("div")`
    margin-bottom: 3rem;
`,Xn=Je("div")`
    margin-top: 1rem;
    margin-bottom: 2rem;
`,Gn=Je("p")`
    font-size: 15px;
`,Wn=[{slug:"pending",name:"Pending"},{slug:"approved",name:"Approved"},{slug:"approvedAndPublished",name:"Published"},{slug:"rejected",name:"Rejected"}],Zn=({options:e})=>{const[t,n]=g([]),[r,o]=g([]),[i,l]=g([]),[s,a]=g([]),[c,d]=g("pending"),[u,p]=g(!1),[h,f]=g("");y((()=>{p(!0),m()}));const m=async()=>{try{var t;const n=await We(`${e.api}/get-publication-requests.php`);v(null==n||null===(t=n.data)||void 0===t?void 0:t.resources)}catch(e){console.log("Error fetching all publication requests",e),f("Error fetching all publication requests")}},v=(t=[])=>{const r={pending:{},approved:{},approvedAndPublished:{},rejected:{}};console.log("Unsorted requests",t);t.filter((t=>t.content.requestedBy===e.userName)).sort(((e,t)=>new Date(t.content.updated_on)-new Date(e.content.updated_on))).forEach((e=>{const t=e.content.status,n=b(e.content["wp-domain"]),o=e.content.from_site_name+" - "+n;r[t][o]||(r[t][o]=[]),r[t][o].push(e)})),console.log("Approved: ",r.approved),console.log("Approved And Published:",r.approvedAndPublished),console.log("Pending: ",r.pending),console.log("Rejected: ",r.rejected),n(r.approved),o(r.approvedAndPublished),a(r.rejected),l(r.pending),p(!1)},b=e=>{const t=e.indexOf("://");return e.slice(t+3)},w=({title:t,siteRequests:n})=>{const r=Object.keys(n);return H(Vn,{get children(){return[H(st,{children:t}),H(Q,{get when(){return 0!==r.length},get fallback(){return H(_n,{children:"None to show"})},get children(){return H(J,{each:r,children:t=>H(Xn,{get children(){return[H(Gn,{children:t}),H(J,{get each(){return n[t]},children:t=>H(Dn,{item:t,manualDelete:()=>(async t=>{console.log("Deleting publication request: "+t);try{var n;const o=await We(`${e.api}/delete-publication-request.php`,{postId:t});var r;if(console.log("Delete result",o),null!=o&&null!==(n=o.errors)&&void 0!==n&&n.length)throw new Error(null===(r=o.errors[0])||void 0===r?void 0:r.message);m()}catch(e){console.log("Error deleting publication request",e),f("Error deleting publication request")}})(t.content.post_id),type:"editor"})})]}})})}})]}})};return(()=>{const e=Qn.cloneNode(!0);return ge(e,H(it,{children:"My publication requests"}),null),ge(e,H(In,{get children(){return H(J,{each:Wn,children:(e,t)=>H(Hn,{get isActive(){return e.slug===c()},onClick:()=>d(e.slug),get children(){return e.name}})})}}),null),ge(e,H(Un,{get children(){return[(()=>{const e=ne((()=>!!u()),!0);return H(Q,{get when(){return e()&&!h()},get children(){return H(_n,{children:"Loading..."})}})})(),(()=>{const e=ne((()=>!("pending"!==c()||u())),!0);return H(Q,{get when(){return e()&&!h()},get children(){return w({title:"Pending",siteRequests:i()})}})})(),(()=>{const e=ne((()=>!("approved"!==c()||u())),!0);return H(Q,{get when(){return e()&&!h()},get children(){return w({title:"Approved",siteRequests:t()})}})})(),(()=>{const e=ne((()=>!("approvedAndPublished"!==c()||u())),!0);return H(Q,{get when(){return e()&&!h()},get children(){return w({title:"Published",siteRequests:r()})}})})(),(()=>{const e=ne((()=>!("rejected"!==c()||u())),!0);return H(Q,{get when(){return e()&&!h()},get children(){return w({title:"Rejected",siteRequests:s()})}})})(),H(Q,{get when(){return h()},get children(){return[(()=>{const e=Yn.cloneNode(!0);return ge(e,h),e})(),Jn.cloneNode(!0)]}})]}}),null),e})()},er=e=>{try{return JSON.parse(document.getElementById(e).innerHTML)}catch(e){return console.log("Error in getData",e),{}}},tr=()=>{let e=document.getElementById("dls-metabox-root");if(e){const t=er("dls-data");t.metaMenu="nav-menu"===e.getAttribute("data-type"),t.metaMenu&&(e=document.createElement("div"),e&&document.querySelector("#nav-menu-footer").prepend(e)),ie((()=>H(Xt,{options:t})),e)}};jQuery(document).ready((function(e){var t,n;const r=null===(t=wp)||void 0===t||null===(n=t.data)||void 0===n?void 0:n.dispatch("core/editor");r&&r.disablePublishSidebar(),(()=>{if(wp.data){let e=!1,t=!1;wp.data.subscribe((()=>{const n=wp.data.select("core/editor").isSavingPost(),r=wp.data.select("core/editor").isSavingNonPostEntityChanges&&wp.data.select("core/editor").isSavingNonPostEntityChanges();e!==n?(e=n,wp.data.select("core/editor").didPostSaveRequestSucceed()&&wp.hooks.doAction("dls.post-saved")):t!==r&&(t=r,wp.data.select("core/editor").didPostSaveRequestSucceed()&&wp.hooks.doAction("dls.post-saved"))}))}})();let o={};try{o=e("#dls-hooks").length>0?JSON.parse(e("#dls-hooks").html()):{hook:""}}catch(e){}console.log("Current hook",o&&o.hook),"post.php"===o.hook||"post-new.php"===o.hook||"nav-menus.php"===o.hook?tr():o.hook.includes("toplevel_page_draft-live-sync")?(()=>{const e=er("dls-data");ie((()=>H(De,{values:e,get children(){return H(Pt,{})}})),document.getElementById("dls-root"))})():o.hook.includes("toplevel_page_cerberus-domain-settings")?(()=>{const e=document.getElementById("dls-domain-settings-root"),t=er("dls-data");ie((()=>H(kn,{options:t})),e)})():o.hook.includes("toplevel_page_publication-approval")?(()=>{const e=document.getElementById("dls-publication-approval-root"),t=er("dls-data");ie((()=>H(Kn,{options:t})),e)})():o.hook.includes("toplevel_page_publication-requests")?(()=>{const e=document.getElementById("dls-publication-requests-root"),t=er("dls-data");ie((()=>H(Zn,{options:t})),e)})():o.hook.includes(".php")||tr();const i=()=>{const e="true"===rr("cerberus-activated"),t=document.querySelector("#toplevel_page_draft-live-sync");e&&t?t.style.display="block":t&&(t.style.display="none")};i();const l=document.querySelector("#cerberus-initiator");if(l){let e=0;l.addEventListener("click",(()=>{if(e++>9){"true"===rr("cerberus-activated")?nr("cerberus-activated",!1,0):nr("cerberus-activated",!0,1e3),i(),e=0}}))}}));const nr=(e,t,n)=>{var r="";if(n){var o=new Date;o.setTime(o.getTime()+24*n*60*60*1e3),r="; expires="+o.toUTCString()}document.cookie=e+"="+(t||"")+r+"; path=/"},rr=e=>{for(var t=e+"=",n=document.cookie.split(";"),r=0;r<n.length;r++){for(var o=n[r];" "==o.charAt(0);)o=o.substring(1,o.length);if(0==o.indexOf(t))return o.substring(t.length,o.length)}return null}}();
//# sourceMappingURL=draft-live-sync-boot-1.1.19.js.map
