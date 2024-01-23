!function(){"use strict";const e=Symbol("solid-proxy"),t={equals:(e,t)=>e===t};let n=E;const r={},o=1,i=2,l={owned:null,cleanups:null,context:null,owner:null};var s=null;let a=null,d=null,c=null,u=null,p=null,g=0;function h(e,t){t&&(s=t);const n=d,r=s,o=0===e.length?l:{owned:null,cleanups:null,context:null,owner:r};let i;s=o,d=null;try{T((()=>i=e((()=>L(o)))),!0)}finally{d=n,s=r}return i}function f(e,n){n=n?Object.assign({},t,n):t;const o={value:e,observers:null,observerSlots:null,pending:r,comparator:n.equals||void 0};return[j.bind(o),e=>("function"==typeof e&&(e=e(o.pending!==r?o.pending:o.value)),A(o,e))]}function v(e,t,n){M(q(e,t,!1))}function m(e,t,r){n=D;const o=q(e,t,!1);o.user=!0,p&&p.push(o)}function b(e,n,o){o=o?Object.assign({},t,o):t;const i=q(e,n,!0);return i.pending=r,i.observers=null,i.observerSlots=null,i.state=0,i.comparator=o.equals||void 0,M(i),j.bind(i)}function y(e){if(c)return e();let t;const n=c=[];try{t=e()}finally{c=null}return T((()=>{for(let e=0;e<n.length;e+=1){const t=n[e];if(t.pending!==r){const e=t.pending;t.pending=r,A(t,e)}}}),!1),t}function w(e){let t,n=d;return d=null,t=e(),d=n,t}function x(e){m((()=>w(e)))}function k(){return d}function S(e){const t=Symbol("context");return{id:t,Provider:H(t),defaultValue:e}}function C(e){return B(s,e.id)||e.defaultValue}function P(e){const t=b(e);return b((()=>O(t())))}function j(){if(this.state&&this.sources){const e=u;u=null,this.state===o?M(this):R(this),u=e}if(d){const e=this.observers?this.observers.length:0;d.sources?(d.sources.push(this),d.sourceSlots.push(e)):(d.sources=[this],d.sourceSlots=[e]),this.observers?(this.observers.push(d),this.observerSlots.push(d.sources.length-1)):(this.observers=[d],this.observerSlots=[d.sources.length-1])}return this.value}function A(e,t,n){return e.comparator&&e.comparator(e.value,t)?t:c?(e.pending===r&&c.push(e),e.pending=t,t):(e.value=t,!e.observers||u&&!e.observers.length||T((()=>{for(let t=0;t<e.observers.length;t+=1){const n=e.observers[t];a&&a.running&&a.disposed.has(n),n.observers&&n.state!==i&&$(n),n.state=o,n.pure?u.push(n):p.push(n)}if(u.length>1e6)throw u=[],new Error}),!1),t)}function M(e){if(!e.fn)return;L(e);const t=s,n=d,r=g;d=s=e,function(e,t,n){let r;try{r=e.fn(t)}catch(e){z(e)}(!e.updatedAt||e.updatedAt<=n)&&(e.observers&&e.observers.length?A(e,r):e.value=r,e.updatedAt=n)}(e,e.value,r),d=n,s=t}function q(e,t,n,r){const i={fn:e,state:o,updatedAt:null,owned:null,sources:null,sourceSlots:null,cleanups:null,value:t,owner:s,context:null,pure:n};return null===s||s!==l&&(s.owned?s.owned.push(i):s.owned=[i]),i}function N(e){let t,n=e.state===o&&e;if(e.suspense&&w(e.suspense.inFallback))return e.suspense.effects.push(e);for(;e=e.owner;)e.state===i?t=e:e.state===o&&(n=e,t=void 0);if(t){const e=u;if(u=null,R(t),u=e,!n||n.state!==o)return}n&&M(n)}function T(e,t){if(u)return e();let r=!1;t||(u=[]),p?r=!0:p=[],g++;try{e()}catch(e){z(e)}finally{!function(e){u&&(E(u),u=null);if(e)return;p.length?y((()=>{n(p),p=null})):p=null}(r)}}function E(e){for(let t=0;t<e.length;t++)N(e[t])}function D(e){let t,n=0;for(t=0;t<e.length;t++){const r=e[t];r.user?e[n++]=r:N(r)}const r=e.length;for(t=0;t<n;t++)N(e[t]);for(t=r;t<e.length;t++)N(e[t])}function R(e){e.state=0;for(let t=0;t<e.sources.length;t+=1){const n=e.sources[t];n.sources&&(n.state===o?N(n):n.state===i&&R(n))}}function $(e){for(let t=0;t<e.observers.length;t+=1){const n=e.observers[t];n.state||(n.state=i,n.observers&&$(n))}}function L(e){let t;if(e.sources)for(;e.sources.length;){const t=e.sources.pop(),n=e.sourceSlots.pop(),r=t.observers;if(r&&r.length){const e=r.pop(),o=t.observerSlots.pop();n<r.length&&(e.sourceSlots[o]=n,r[n]=e,t.observerSlots[n]=o)}}if(e.owned){for(t=0;t<e.owned.length;t++)L(e.owned[t]);e.owned=null}if(e.cleanups){for(t=0;t<e.cleanups.length;t++)e.cleanups[t]();e.cleanups=null}e.state=0,e.context=null}function z(e){throw e}function B(e,t){return e&&(e.context&&e.context[t]||e.owner&&B(e.owner,t))}function O(e){if("function"==typeof e&&!e.length)return O(e());if(Array.isArray(e)){const t=[];for(let n=0;n<e.length;n++){const r=O(e[n]);Array.isArray(r)?t.push.apply(t,r):t.push(r)}return t}return e}function H(e){return function(t){let n;var r;return M(q((()=>n=w((()=>(s.context={[e]:t.value},P((()=>t.children)))))),r,!0)),n}}const U=Symbol("fallback");function I(e){for(let t=0;t<e.length;t++)e[t]()}function F(e,t,n={}){let r=[],o=[],i=[],l=0,a=t.length>1?[]:null;var d;return d=()=>I(i),null===s||(null===s.cleanups?s.cleanups=[d]:s.cleanups.push(d)),()=>{let s,d,c=e()||[];return w((()=>{let e,t,p,g,f,v,m,b,y,w=c.length;if(0===w)0!==l&&(I(i),i=[],r=[],o=[],l=0,a&&(a=[])),n.fallback&&(r=[U],o[0]=h((e=>(i[0]=e,n.fallback()))),l=1);else if(0===l){for(o=new Array(w),d=0;d<w;d++)r[d]=c[d],o[d]=h(u);l=w}else{for(p=new Array(w),g=new Array(w),a&&(f=new Array(w)),v=0,m=Math.min(l,w);v<m&&r[v]===c[v];v++);for(m=l-1,b=w-1;m>=v&&b>=v&&r[m]===c[b];m--,b--)p[b]=o[m],g[b]=i[m],a&&(f[b]=a[m]);for(e=new Map,t=new Array(b+1),d=b;d>=v;d--)y=c[d],s=e.get(y),t[d]=void 0===s?-1:s,e.set(y,d);for(s=v;s<=m;s++)y=r[s],d=e.get(y),void 0!==d&&-1!==d?(p[d]=o[s],g[d]=i[s],a&&(f[d]=a[s]),d=t[d],e.set(y,d)):i[s]();for(d=v;d<w;d++)d in p?(o[d]=p[d],i[d]=g[d],a&&(a[d]=f[d],a[d](d))):o[d]=h(u);o=o.slice(0,l=w),r=c.slice(0)}return o}));function u(e){if(i[d]=e,a){const[e,n]=f(d);return a[d]=n,t(c[d],e)}return t(c[d])}}}function K(e,t){return w((()=>e(t)))}function Y(){return!0}const J={get:(t,n,r)=>n===e?r:t.get(n),has:(e,t)=>e.has(t),set:Y,deleteProperty:Y,getOwnPropertyDescriptor:(e,t)=>({configurable:!0,enumerable:!0,get:()=>e.get(t),set:Y,deleteProperty:Y}),ownKeys:e=>e.keys()};function Q(...e){return new Proxy({get(t){for(let n=e.length-1;n>=0;n--){const r=e[n][t];if(void 0!==r)return r}},has(t){for(let n=e.length-1;n>=0;n--)if(t in e[n])return!0;return!1},keys(){const t=[];for(let n=0;n<e.length;n++)t.push(...Object.keys(e[n]));return[...new Set(t)]}},J)}function V(e){const t="fallback"in e&&{fallback:()=>e.fallback};return b(F((()=>e.each),e.children,t||void 0))}function W(e){let t=!1;const n=b((()=>e.when),void 0,{equals:(e,n)=>t?e===n:!e==!n});return b((()=>{const r=n();if(r){const n=e.children;return(t="function"==typeof n&&n.length>0)?w((()=>n(r))):n}return e.fallback}))}function X(e){let t=!1;const n=P((()=>e.children)),r=b((()=>{let e=n();Array.isArray(e)||(e=[e]);for(let t=0;t<e.length;t++){const n=e[t].when;if(n)return[t,n,e[t]]}return[-1]}),void 0,{equals:(e,n)=>e&&e[0]===n[0]&&(t?e[1]===n[1]:!e[1]==!n[1])&&e[2]===n[2]});return b((()=>{const[n,o,i]=r();if(n<0)return e.fallback;const l=i.children;return(t="function"==typeof l&&l.length>0)?w((()=>l(o))):l}))}function G(e){return e}const Z=new Set(["className","indeterminate","value","allowfullscreen","allowpaymentrequest","async","autofocus","autoplay","checked","controls","default","disabled","formnovalidate","hidden","ismap","itemscope","loop","multiple","muted","nomodule","novalidate","open","playsinline","readonly","required","reversed","seamless","selected","truespeed"]),ee=new Set(["innerHTML","textContent","innerText","children"]),te={className:"class",htmlFor:"for"},ne=new Set(["beforeinput","click","dblclick","focusin","focusout","input","keydown","keyup","mousedown","mousemove","mouseout","mouseover","mouseup","pointerdown","pointermove","pointerout","pointerover","pointerup","touchend","touchmove","touchstart"]),re={xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace"};function oe(e,t){return b(e,void 0,t?void 0:{equals:t})}function ie(e,t,n){let r=n.length,o=t.length,i=r,l=0,s=0,a=t[o-1].nextSibling,d=null;for(;l<o||s<i;)if(t[l]!==n[s]){for(;t[o-1]===n[i-1];)o--,i--;if(o===l){const t=i<r?s?n[s-1].nextSibling:n[i-s]:a;for(;s<i;)e.insertBefore(n[s++],t)}else if(i===s)for(;l<o;)d&&d.has(t[l])||e.removeChild(t[l]),l++;else if(t[l]===n[i-1]&&n[s]===t[o-1]){const r=t[--o].nextSibling;e.insertBefore(n[s++],t[l++].nextSibling),e.insertBefore(n[--i],r),t[o]=n[i]}else{if(!d){d=new Map;let e=s;for(;e<i;)d.set(n[e],e++)}const r=d.get(t[l]);if(null!=r)if(s<r&&r<i){let a,c=l,u=1;for(;++c<o&&c<i&&null!=(a=d.get(t[c]))&&a===r+u;)u++;if(u>r-s){const o=t[l];for(;s<r;)e.insertBefore(n[s++],o)}else e.replaceChild(n[s++],t[l++])}else l++;else e.removeChild(t[l++])}}else l++,s++}const le="_$DX_DELEGATE";function se(e,t,n){let r;return h((o=>{r=o,fe(t,e(),t.firstChild?null:void 0,n)})),()=>{r(),t.textContent=""}}function ae(e,t,n){const r=document.createElement("template");r.innerHTML=e;let o=r.content.firstChild;return n&&(o=o.firstChild),o}function de(e,t=window.document){const n=t[le]||(t[le]=new Set);for(let r=0,o=e.length;r<o;r++){const o=e[r];n.has(o)||(n.add(o),t.addEventListener(o,me))}}function ce(e,t,n){null==n?e.removeAttribute(t):e.setAttribute(t,n)}function ue(e,t,n,r){null==r?e.removeAttributeNS(t,n):e.setAttributeNS(t,n,r)}function pe(e,t,n,r){r?Array.isArray(n)?(e[`$$${t}`]=n[0],e[`$$${t}Data`]=n[1]):e[`$$${t}`]=n:Array.isArray(n)?e.addEventListener(t,(e=>n[0](n[1],e))):e.addEventListener(t,n)}function ge(e,t,n={}){const r=Object.keys(t),o=Object.keys(n);let i,l;for(i=0,l=o.length;i<l;i++){const r=o[i];r&&"undefined"!==r&&!(r in t)&&(ve(e,r,!1),delete n[r])}for(i=0,l=r.length;i<l;i++){const o=r[i],l=!!t[o];o&&"undefined"!==o&&n[o]!==l&&(ve(e,o,l),n[o]=l)}return n}function he(e,t,n={}){const r=e.style;if("string"==typeof t)return r.cssText=t;let o,i;for(i in"string"==typeof n&&(n={}),n)null==t[i]&&r.removeProperty(i),delete n[i];for(i in t)o=t[i],o!==n[i]&&(r.setProperty(i,o),n[i]=o);return n}function fe(e,t,n,r){if(void 0===n||r||(r=[]),"function"!=typeof t)return ye(e,t,r,n);v((r=>ye(e,t(),r,n)),r)}function ve(e,t,n){const r=t.split(/\s+/);for(let t=0,o=r.length;t<o;t++)e.classList.toggle(r[t],n)}function me(e){const t=`$$${e.type}`;let n=e.composedPath&&e.composedPath()[0]||e.target;for(e.target!==n&&Object.defineProperty(e,"target",{configurable:!0,value:n}),Object.defineProperty(e,"currentTarget",{configurable:!0,get:()=>n});null!==n;){const r=n[t];if(r&&!n.disabled){const o=n[`${t}Data`];if(void 0!==o?r(o,e):r(e),e.cancelBubble)return}n=n.host&&n.host!==n&&n.host instanceof Node?n.host:n.parentNode}}function be(e,t,n={},r,o){return!o&&"children"in t&&v((()=>n.children=ye(e,t.children,n.children))),v((()=>function(e,t,n,r,o={}){let i,l,s;for(const d in t){if("children"===d){r||ye(e,t.children);continue}const c=t[d];if(c!==o[d]){if("style"===d)he(e,c,o[d]);else if("class"!==d||n)if("classList"===d)ge(e,c,o[d]);else if("ref"===d)c(e);else if("on:"===d.slice(0,3))e.addEventListener(d.slice(3),c);else if("oncapture:"===d.slice(0,10))e.addEventListener(d.slice(10),c,!0);else if("on"===d.slice(0,2)){const t=d.slice(2).toLowerCase(),n=ne.has(t);pe(e,t,c,n),n&&de([t])}else if((s=ee.has(d))||!n&&(l=Z.has(d))||(i=e.nodeName.includes("-")))!i||l||s?e[d]=c:e[(a=d,a.toLowerCase().replace(/-([a-z])/g,((e,t)=>t.toUpperCase())))]=c;else{const t=n&&d.indexOf(":")>-1&&re[d.split(":")[0]];t?ue(e,t,d,c):ce(e,te[d]||d,c)}else e.className=c;o[d]=c}}var a}(e,t,r,!0,n))),n}function ye(e,t,n,r,o){for(;"function"==typeof n;)n=n();if(t===n)return n;const i=typeof t,l=void 0!==r;if(e=l&&n[0]&&n[0].parentNode||e,"string"===i||"number"===i)if("number"===i&&(t=t.toString()),l){let o=n[0];o&&3===o.nodeType?o.data=t:o=document.createTextNode(t),n=ke(e,n,r,o)}else n=""!==n&&"string"==typeof n?e.firstChild.data=t:e.textContent=t;else if(null==t||"boolean"===i)n=ke(e,n,r);else{if("function"===i)return v((()=>{let o=t();for(;"function"==typeof o;)o=o();n=ye(e,o,n,r)})),()=>n;if(Array.isArray(t)){const i=[];if(we(i,t,o))return v((()=>n=ye(e,i,n,r,!0))),()=>n;if(0===i.length){if(n=ke(e,n,r),l)return n}else Array.isArray(n)?0===n.length?xe(e,i,r):ie(e,n,i):null==n||""===n?xe(e,i):ie(e,l&&n||[e.firstChild],i);n=i}else if(t instanceof Node){if(Array.isArray(n)){if(l)return n=ke(e,n,r,t);ke(e,n,null,t)}else null!=n&&""!==n&&e.firstChild?e.replaceChild(t,e.firstChild):e.appendChild(t);n=t}}return n}function we(e,t,n){let r=!1;for(let o=0,i=t.length;o<i;o++){let i,l=t[o];if(l instanceof Node)e.push(l);else if(null==l||!0===l||!1===l);else if(Array.isArray(l))r=we(e,l)||r;else if("string"==(i=typeof l))e.push(document.createTextNode(l));else if("function"===i)if(n){for(;"function"==typeof l;)l=l();r=we(e,Array.isArray(l)?l:[l])||r}else e.push(l),r=!0;else e.push(document.createTextNode(l.toString()))}return r}function xe(e,t,n){for(let r=0,o=t.length;r<o;r++)e.insertBefore(t[r],n)}function ke(e,t,n,r){if(void 0===n)return e.textContent="";const o=r||document.createTextNode("");if(t.length){let r=!1;for(let i=t.length-1;i>=0;i--){const l=t[i];if(o!==l){const t=l.parentNode===e;r||i?t&&e.removeChild(l):t?e.replaceChild(o,l):e.insertBefore(o,n)}else r=!0}}else e.insertBefore(o,n);return[o]}const Se=Symbol("store-raw"),Ce=Symbol("store-node"),Pe=Symbol("store-name");function je(t,n){let r=t[e];if(!r){Object.defineProperty(t,e,{value:r=new Proxy(t,Ne)});const n=Object.keys(t),o=Object.getOwnPropertyDescriptors(t);for(let e=0,i=n.length;e<i;e++){const i=n[e];if(o[i].get){const e=o[i].get.bind(r);Object.defineProperty(t,i,{get:e})}}}return r}function Ae(e){return null!=e&&"object"==typeof e&&(!e.__proto__||e.__proto__===Object.prototype||Array.isArray(e))}function Me(e,t=new Set){let n,r,o,i;if(n=null!=e&&e[Se])return n;if(!Ae(e)||t.has(e))return e;if(Array.isArray(e)){Object.isFrozen(e)?e=e.slice(0):t.add(e);for(let n=0,i=e.length;n<i;n++)o=e[n],(r=Me(o,t))!==o&&(e[n]=r)}else{Object.isFrozen(e)?e=Object.assign({},e):t.add(e);const n=Object.keys(e),l=Object.getOwnPropertyDescriptors(e);for(let s=0,a=n.length;s<a;s++)i=n[s],l[i].get||(o=e[i],(r=Me(o,t))!==o&&(e[i]=r))}return e}function qe(e){let t=e[Ce];return t||Object.defineProperty(e,Ce,{value:t={}}),t}function _e(){const[e,t]=f(void 0,{equals:!1});return e.$=t,e}const Ne={get(t,n,r){if(n===Se)return t;if(n===e)return r;const o=t[n];if(n===Ce||"__proto__"===n)return o;const i=Ae(o);if(k()&&("function"!=typeof o||t.hasOwnProperty(n))){let e,r;i&&(e=qe(o))&&(r=e._||(e._=_e()),r()),e=qe(t),r=e[n]||(e[n]=_e()),r()}return i?je(o):o},set:()=>!0,deleteProperty:()=>!0,ownKeys:function(e){if(k()){const t=qe(e);(t._||(t._=_e()))()}return Reflect.ownKeys(e)},getOwnPropertyDescriptor:function(t,n){const r=Reflect.getOwnPropertyDescriptor(t,n);return!r||r.get||n===e||n===Ce||n===Pe||(delete r.value,delete r.writable,r.get=()=>t[e][n]),r}};function Te(e,t,n){if(e[t]===n)return;const r=Array.isArray(e),o=e.length,i=void 0===n,l=r||i===t in e;i?delete e[t]:e[t]=n;let s,a=qe(e);(s=a[t])&&s.$(),r&&e.length!==o&&(s=a.length)&&s.$(s,void 0),l&&(s=a._)&&s.$(s,void 0)}function Ee(e,t,n=[]){let r,o=e;if(t.length>1){r=t.shift();const i=typeof r,l=Array.isArray(e);if(Array.isArray(r)){for(let o=0;o<r.length;o++)Ee(e,[r[o]].concat(t),[r[o]].concat(n));return}if(l&&"function"===i){for(let o=0;o<e.length;o++)r(e[o],o)&&Ee(e,[o].concat(t),[o].concat(n));return}if(l&&"object"===i){const{from:o=0,to:i=e.length-1,by:l=1}=r;for(let r=o;r<=i;r+=l)Ee(e,[r].concat(t),[r].concat(n));return}if(t.length>1)return void Ee(e[r],t,[r].concat(n));o=e[r],n=[r].concat(n)}let i=t[0];"function"==typeof i&&(i=i(o,n),i===o)||void 0===r&&null==i||(i=Me(i),void 0===r||Ae(o)&&Ae(i)&&!Array.isArray(i)?function(e,t){const n=Object.keys(t);for(let r=0;r<n.length;r+=1){const o=n[r];Te(e,o,t[o])}}(o,i):Te(e,r,i))}function De(e,t){const n=Me(e||{});return[je(n),function(...e){y((()=>Ee(n,e)))}]}const Re=S([{path:"start"},{}]);function $e(e){const t=location.hash.replace(/#/,"")||"start",[n,r]=De({path:t});window.addEventListener("popstate",(e=>{const t=e.target.location.hash.replace(/#/,"");r({...n,path:t})}));const o=[n,{apiUrl:e.values.api}];return K(Re.Provider,{value:o,get children(){return e.children}})}let Le={data:""},ze=e=>"object"==typeof window?((e?e.querySelector("#_goober"):window._goober)||Object.assign((e||document.head).appendChild(document.createElement("style")),{innerHTML:" ",id:"_goober"})).firstChild:e||Le,Be=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(})/g,Oe=/\/\*[^]*?\*\/|\s\s+|\n/g,He=(e,t)=>{let n,r="",o="",i="";for(let l in e){let s=e[l];"object"==typeof s?(n=t?t.replace(/([^,])+/g,(e=>l.replace(/([^,])+/g,(t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)))):l,o+="@"==l[0]?"f"==l[1]?He(s,l):l+"{"+He(s,"k"==l[1]?"":t)+"}":He(s,n)):"@"==l[0]&&"i"==l[1]?r=l+" "+s+";":(l=l.replace(/[A-Z]/g,"-$&").toLowerCase(),i+=He.p?He.p(l,s):l+":"+s+";")}return i[0]?(n=t?t+"{"+i+"}":i,r+n+o):r+o},Ue={},Ie=e=>{let t="";for(let n in e)t+=n+("object"==typeof e[n]?Ie(e[n]):e[n]);return t},Fe=(e,t,n,r,o)=>{let i="object"==typeof e?Ie(e):e,l=Ue[i]||(Ue[i]=(e=>{let t=0,n=11;for(;t<e.length;)n=101*n+e.charCodeAt(t++)>>>0;return"go"+n})(i));if(!Ue[l]){let t="object"==typeof e?e:(e=>{let t,n=[{}];for(;t=Be.exec(e.replace(Oe,""));)t[4]&&n.shift(),t[3]?n.unshift(n[0][t[3]]=n[0][t[3]]||{}):t[4]||(n[0][t[1]]=t[2]);return n[0]})(e);Ue[l]=He(o?{["@keyframes "+l]:t}:t,n?"":"."+l)}return((e,t,n)=>{-1==t.data.indexOf(e)&&(t.data=n?e+t.data:t.data+e)})(Ue[l],t,r),l},Ke=(e,t,n)=>e.reduce(((e,r,o)=>{let i=t[o];if(i&&i.call){let e=i(n),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;i=t?"."+t:e&&"object"==typeof e?e.props?"":He(e,""):e}return e+r+(null==i?"":i)}),"");function Ye(e){let t=this||{},n=e.call?e(t.p):e;return Fe(n.unshift?n.raw?Ke(n,[].slice.call(arguments,1),t.p):n.reduce(((e,n)=>n?Object.assign(e,n.call?n(t.p):n):e),{}):n,ze(t.target),t.g,t.o,t.k)}Ye.bind({g:1});let Je=Ye.bind({k:1});const Qe=S();function Ve(e){let t=this||{};return(...n)=>{const r=r=>{const o=Q(r,{theme:C(Qe)}),i=Q(o,{get className(){const e=o.className,r="className"in o&&/^go[0-9]+/.test(e);return[e,Ye.apply({target:t.target,o:r,p:o,g:t.g},n)].filter(Boolean).join(" ")}}),[l,s]=function(e,...t){const n=new Set(t.flat()),r=Object.getOwnPropertyDescriptors(e),o=t.map((t=>{const n={};for(let o=0;o<t.length;o++){const i=t[o];Object.defineProperty(n,i,r[i]?r[i]:{get:()=>e[i]})}return n}));return o.push(new Proxy({get:t=>n.has(t)?void 0:e[t],has:t=>!n.has(t)&&t in e,keys:()=>Object.keys(e).filter((e=>!n.has(e)))},J)),o}(i,["as"]),a=l.as||e;let d;var c,u,p,g;return"function"==typeof a?d=a(s):(d=document.createElement(a),c=d,"function"==typeof(u=s)?v((e=>be(c,u(),e,p,g))):be(c,u,void 0,p,g)),d};return r.className=e=>w((()=>Ye.apply({target:t.target,p:e,g:t.g},n))),r}}const We=Ve("nav")`
    color: black;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 2rem;
`,Xe=Ve("a")`
    font-size: 14px;
    display: block;
    padding: 0 1rem;
`,Ge=()=>{const[e,{navigate:t}]=C(Re);return K(We,{get children(){return[K(Xe,{href:"#start",children:"Start"}),K(Xe,{href:"#sync-check",children:"Sync Check"}),K(Xe,{href:"#sync-draft",children:"Sync Draft"}),K(Xe,{href:"#sync-live",children:"Sync Live"})]}})},Ze=async(e,t={})=>new Promise(((n,r)=>{jQuery.ajax({url:"/wp-admin/admin-ajax.php",type:"post",dataType:"json",data:{action:e,...t},success:function(e){n(e)},error:(e,t)=>{r(t)}})})),et=async(e,t)=>new Promise(((n,r)=>{jQuery.ajax({url:e,type:t?"post":"get",dataType:"json",data:t,success:function(e){n(e)},error:(e,t)=>{r(e.responseJSON||t)}})})),tt=Ve("div")`
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
`,st=Ve("div")`
    font-size: 40px;
    font-weight: bold;
    text-align: center;
    width: 100%;
    margin: 2rem 0 4rem;
    line-height: 1.2;
    display: block;
`,at=Ve("h2")`
    font-size: 24px;
    margin-bottom: .5rem;
`,dt=Ve("h3")`
    font-size: 18px;
    margin-bottom: .5rem;
    margin-top: 0px;
`,ct=e=>K(rt,{get children(){return[K(ot,{get children(){return[K(at,{get children(){return e.title}}),K(lt,{get children(){return e.description}})]}}),K(it,{get children(){return e.actions}})]}}),ut=(Ve("svg")`
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
`,ae('<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="200px" height="200px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid"><circle cx="50" cy="50" r="32" stroke-width="8" stroke-dasharray="50.26548245743669 50.26548245743669" fill="none" stroke-linecap="round"><animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="2.0408163265306123s" keyTimes="0;1" values="0 50 50;360 50 50"></animateTransform></circle></svg>')),pt={small:"20px",medium:"30px",large:"50px",xlarge:"100px"},gt=({size:e="large",inverted:t=!1})=>{let n={display:"block","shape-rendering":"auto",width:pt[e],height:pt[e],stroke:"#006ba1"};return t&&(n.stroke="#fff"),(()=>{const e=ut.cloneNode(!0);return he(e,n),e})()},ht=Ve("button")`
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
`,vt=e=>K(ht,Q(e,{get children(){return[oe((()=>e.children)),K(W,{get when(){return e.loading},get children(){return K(ft,{get children(){return K(gt,{size:"small",get inverted(){return!e.disabled}})}})}})]}})),mt=Ve("div")`
    display: flex;
    margin-bottom: 2px;
`,bt=Ve("div")`
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
`,kt=ae('<svg height="10" width="10"><circle cx="5" cy="5" r="5" stroke-width="0"></circle></svg>'),St=({showCheckButton:e,showSyncButton:t,showDraft:n,showLive:r,item:o,onClick:i,onTypeClick:l,getAllTargetsContent:s})=>{const a=(e,t)=>{let n="#bbbbbb";return"error"===t?n="#da694b":""===t?n="#bbbbbb":e&&(n=e.synced?"#99da4b":"#e9da4e"),n},d=async()=>{console.log("Item: ",o);try{const e=await s();console.log(e)}catch(e){console.log("Error logging diff: ",e)}};return K(mt,{get children(){return[K(W,{when:n,get children(){return K(xt,{get color(){var e,t;return a(null===(e=o.status)||void 0===e?void 0:e.draft,null===(t=o.status)||void 0===t?void 0:t.state)},get children(){return kt.cloneNode(!0)}})}}),K(W,{when:r,get children(){return K(xt,{get color(){var e,t;return a(null===(e=o.status)||void 0===e?void 0:e.live,null===(t=o.status)||void 0===t?void 0:t.state)},get children(){return kt.cloneNode(!0)}})}}),K(W,{when:t,get children(){return K(yt,{onClick:i,children:"sync"})}}),K(W,{when:e,get children(){return K(yt,{onClick:i,children:"check"})}}),K(W,{when:e,get children(){return K(yt,{onClick:d,children:"log"})}}),K(bt,{onClick:l,get children(){return o.type}}),K(wt,{target:"_new",get href(){return o.permalink},get children(){return o.permalink||"/"}})]}})},Ct=({type:e})=>{const[t,{apiUrl:n}]=C(Re),[r,o]=De({list:[]}),[i,l]=f(!1);m((async()=>{const e=(await Ze("get_all_resources")).list.map(((e,t)=>({...e,index:t})));o({list:e})}));const s=async t=>{try{(await et(`${n}/sync.php`,{action:"sync",permalink:t.permalink,release:e,sync_check:!1})).data?o("list",t.index,"status",{[e]:{synced:!0},state:"loaded"}):o("list",t.index,"status",{state:"error"})}catch(e){o("list",t.index,"status",{state:"error"})}},a="draft"===e?"Begin to sync to Draft":"Publish everything to Live",d="draft"===e?"Sync Draft":"Sync Live",c="draft"===e?"This is where you can make sure that wordpress and the draft content is in sync":"This is where you can make sure that Draft and Live are in sync";return K(nt,{get children(){return[K(ct,{title:d,description:c,get actions(){return K(vt,{get loading(){return i()},onClick:()=>(async()=>{if(i())return;let t=!1;if(("live"===e&&confirm("Do you really which to publish everything?")||"draft"===e)&&(t=!0),t){l(!0),r.list.forEach(((e,t)=>{o("list",t,"status",{state:""}),t++}));for await(let e of r.list)await s(e);l(!1)}})(),children:a})}}),K(V,{get each(){return r.list},children:t=>K(St,{showDraft:"draft"===e,showLive:"live"===e,showSyncButton:!0,onClick:()=>(async e=>{l(!0),await s(e),l(!1)})(t),onTypeClick:()=>(async e=>{l(!0);const t=r.list.filter((t=>t.type===e));t.forEach(((e,t)=>{o("list",t,"status",{state:""}),t++}));for await(let e of t)await s(e);l(!1)})(t.type),item:t,get permalink(){return t.permalink}})})]}})},Pt=()=>{const[e,{apiUrl:t}]=C(Re),[n,r]=De({list:[]}),[o,i]=f(!1);console.log(t),m((async()=>{const e=(await Ze("get_all_resources")).list.map(((e,t)=>({...e,index:t})));r({list:e})}));const l=async e=>{try{const n=await et(`${t}/check-sync.php`,{permalink:e.permalink});r("list",e.index,"status",{draft:n.data.resourceStatus.find((e=>"draft"===e.target&&"__original"===e.comparedTo)),live:n.data.resourceStatus.find((e=>"live"===e.target&&"draft"===e.comparedTo)),state:"loaded"})}catch(t){r("list",e.index,"status",{state:"error"})}};return K(nt,{get children(){return[K(ct,{title:"Sync Check",description:"This is where you can check if all content is in sync",get actions(){return K(vt,{get loading(){return o()},onClick:()=>(async()=>{if(!o()){i(!0),n.list.forEach(((e,t)=>{r("list",t,"status",{state:""}),t++}));for await(let e of n.list)await l(e);i(!1)}})(),children:"Begin to check"})}}),K(V,{get each(){return n.list},children:e=>K(St,{showDraft:!0,showLive:!0,showCheckButton:!0,item:e,getAllTargetsContent:()=>(async e=>await et(`${t}/get-all-targets-content.php`,{permalink:e}))(e.permalink),get permalink(){return e.permalink},onClick:()=>(async e=>{i(!0),await l(e),i(!1)})(e),onTypeClick:()=>(async e=>{i(!0);const t=n.list.filter((t=>t.type===e));t.forEach(((e,t)=>{r("list",t,"status",{state:""}),t++}));for await(let e of t)await l(e);i(!1)})(e.type)})})]}})},jt=Ve("p")`
    font-size: 14px;
    padding-bottom: .5rem;
    background-color: #ffeaee;
    border: 2px solid #ffc0cb;
    border-radius: 3px;
    padding: 1rem 2rem;
    text-align: center;
`,At=()=>K(nt,{get children(){return[K(ct,{title:"Start",description:"This plugin lets you control and debug content through the content service."}),K(jt,{children:"This is mainly used while developing or by admins!"})]}}),Mt=Ve("div")`
     color: black;
     max-width: 1200px;
     margin: 0 auto;
`,qt=(Ve("div")`
`,Ve("div")`
    font-size: 1rem;
    padding: 1rem 0;
`,()=>{const[e]=C(Re);return K(Mt,{get children(){return[K(st,{children:"Content Dashboard"}),K(Ge,{}),K(W,{get when(){return"start"===e.path},get children(){return K(At,{})}}),K(W,{get when(){return"sync-check"===e.path},get children(){return K(Pt,{})}}),K(W,{get when(){return"sync-draft"===e.path},get children(){return K(Ct,{type:"draft"})}}),K(W,{get when(){return"sync-live"===e.path},get children(){return K(Ct,{type:"live"})}})]}})}),_t=Ve("div")`

    padding-top: 6px;
    box-sizing: border-box !important;

    ${e=>e.horizontal?"\n        display: flex;   \n        align-items: center;\n        border-bottom: 1px dotted grey;\n        padding: 0 10px 8px 10px;\n        margin-left: -10px;\n        margin-right: -10px;\n        justify-content: flex-end;\n    ":""} 

    ${e=>e.box?"\n        position: relative;\n        min-width: 255px;\n        border: 1px solid #ccd0d4;\n        box-shadow: 0 1px 1px rgb(0 0 0 / 4%);\n        background: #fff;\n        padding: 1rem;\n        box-sizing: border-box;\n        margin-bottom: 7px;\n    ":""}

`,Nt=Ve("div")`
    color: red;
    padding-top: 0.4rem;
`,Tt=Ve("div")`
    color: darkgray;
    padding-top: 0.4rem;
`,Et=Ve("div")`
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

`,Dt=Ve("div")`
    text-align: center;
    min-width: 100px;
    ${e=>e.horizontal?"\n        margin-top: 10px;\n    ":""}

`,[Rt,$t]=De({options:{},setChecking:()=>!0,syncStatus:{},publish:()=>null,changesNotSavedToDraft:!1,showRejectionControls:!1,rejectionReason:"",approvalStatus:"",errorMessage:"",approvedBy:""}),Lt=e=>{$t({approvalStatus:e})},zt=()=>{$t((e=>({showRejectionControls:!e.showRejectionControls})))},Bt=async(e="")=>{Rt.setChecking(!0);const t=await(async e=>{try{var t;return await et(`${Rt.options.api}/upsert-publication-request.php`,{permalink:Rt.options.permalink,status:e,editorUrl:null===(t=window)||void 0===t?void 0:t.location.href,approvedBy:"approved"===e||"approvedAndPublished"===e?Rt.options.userName:"",rejectedBy:"rejected"===e?Rt.options.userName:"",requestedBy:"pending"===e?Rt.options.userName:Rt.requestedBy,rejectionReason:Rt.rejectionReason}),{}}catch(e){return console.log("Error upserting publication request",e),{err:e}}})(e);t.err?($t({errorMessage:"Error changing status to "+e}),console.log("Err upserting request",t.err)):Lt(e),Rt.setChecking(!1),Ot()},Ot=async()=>{const{postTitle:e,rejectionReason:t,approvalStatus:n,editorEmail:r}=Rt,{userName:o,siteTitle:i}=Rt.options;try{var l;await et(`${Rt.options.api}/send-publication-approval-email.php`,{data:{useCustomMailSystem:Rt.options.useCustomSmtp,postTitle:e,rejectionReason:t,approvalStatus:n,admin:o,editorEmail:r,siteTitle:i,postUrl:null===(l=window)||void 0===l?void 0:l.location.href}})}catch(e){console.log("Error sending email")}},Ht=async()=>{Rt.setChecking(!0);const e=await(async()=>{console.log("Deleting pub request for "+Rt.options.permalink+": ",Rt);try{var e,t;const o=await et(`${Rt.options.api}/delete-publication-request.php`,{postId:Rt.options.postId});var n,r;return null!=o&&null!==(e=o.data)&&void 0!==e&&null!==(t=e.deleteResource)&&void 0!==t&&t.success||console.log("Unable to delete publication request because: ",null==o||null===(n=o.errors)||void 0===n||null===(r=n[0])||void 0===r?void 0:r.message),{}}catch(e){return console.log("Error deleting request",e),{err:e}}})();e.err?($t({errorMessage:"Something went wrong withdrawing publication request"}),console.log("Err deleting request",e.err)):Lt(""),Rt.setChecking(!1)},Ut=ae("<em></em>"),It=Ve("div")`
    padding: 0.25rem;
    background: #fefbe6;
`,Ft=()=>K(X,{get children(){return[K(G,{get when(){return"pending"===Rt.approvalStatus},get children(){return K(Dt,{get horizontal(){return Rt.options.metaMenu},children:"Pending approval"})}}),K(G,{get when(){return"approved"===Rt.approvalStatus},get children(){return K(Dt,{get horizontal(){return Rt.options.metaMenu},get children(){return["Publication approved ",oe((()=>Rt.approvedBy?" by "+Rt.approvedBy:""))]}})}}),K(G,{get when(){return"rejected"===Rt.approvalStatus},get children(){return[K(Dt,{get horizontal(){return Rt.options.metaMenu},get children(){return["Publication rejected ",oe((()=>Rt.rejectedBy?" by "+Rt.rejectedBy:""))]}}),K(W,{get when(){return Rt.rejectionReason},get children(){return K(It,{get children(){const e=Ut.cloneNode(!0);return fe(e,(()=>Rt.rejectionReason)),e}})}})]}})]}}),Kt=()=>K(vt,{get leftMargin(){return Rt.options.metaMenu},get loading(){return Rt.publishing},onClick:e=>Rt.publish(e),get disabled(){return Rt.changesNotSavedToDraft},get children(){var e,t,n;return Rt.changesNotSavedToDraft?null!==(e=Rt.syncStatus.live)&&void 0!==e&&e.exists?"Save draft before updating on live":"Save draft before publishing to live":null!==(t=Rt.syncStatus.live)&&void 0!==t&&t.exists?null!==(n=Rt.syncStatus.live)&&void 0!==n&&n.synced?"Updated on live site":"Update on live site":"Publish to live site"}}),Yt=ae('<div><h4>Rejection reason</h4><textarea rows="4" placeholder="Message to the editor" maxlength="200"></textarea><div></div></div>'),Jt=()=>[K(vt,{get leftMargin(){return Rt.options.metaMenu},onClick:e=>Bt("approved"),get disabled(){return Rt.showRejectionControls},children:"Approve"}),K(W,{get when(){return!Rt.showRejectionControls},get children(){return K(vt,{get leftMargin(){return Rt.options.metaMenu},onClick:e=>{zt()},get disabled(){return Rt.showRejectionControls},children:"Reject"})}}),K(W,{get when(){return Rt.showRejectionControls},get children(){const e=Yt.cloneNode(!0),t=e.firstChild,n=t.nextSibling,r=n.nextSibling;return e.style.setProperty("margin-block","1.5rem"),t.style.setProperty("margin-bottom",0),n.addEventListener("change",(e=>{var t;t=e.target.value,$t({rejectionReason:t})})),n.style.setProperty("width","100%"),n.style.setProperty("margin-top","0.5rem"),r.style.setProperty("display","flex"),fe(r,K(vt,{get leftMargin(){return Rt.options.metaMenu},onClick:e=>zt(),disabled:!1,style:{"margin-top":0,"margin-right":"0.2rem"},children:"Cancel"}),null),fe(r,K(vt,{get leftMargin(){return Rt.options.metaMenu},onClick:e=>Bt("rejected"),disabled:!1,style:{"margin-top":0},children:"Send rejection"}),null),e}}),K(W,{get when(){return!Rt.showRejectionControls},get children(){return K(Kt,{})}})],Qt=ae("<div><h5>Dev mode</h5></div>"),Vt=()=>(()=>{const e=Qt.cloneNode(!0);e.firstChild;return e.style.setProperty("background","lightgray"),e.style.setProperty("padding","0.5rem"),fe(e,K(vt,{get leftMargin(){return Rt.options.metaMenu},onClick:e=>Bt("approved"),disabled:!1,children:"Approve"}),null),fe(e,K(vt,{get leftMargin(){return Rt.options.metaMenu},onClick:e=>Bt("rejected"),disabled:!1,children:"Reject"}),null),fe(e,K(vt,{get leftMargin(){return Rt.options.metaMenu},onClick:e=>Bt("pending"),get disabled(){return Rt.changesNotSavedToDraft},children:"Set to pending"}),null),e})(),Wt=()=>[K(W,{get when(){return""===Rt.approvalStatus},get children(){return[K(W,{get when(){return Rt.options.userHasPublicationRights},get children(){return K(Kt,{})}}),K(W,{get when(){return!Rt.options.userHasPublicationRights},get children(){return K(vt,{get leftMargin(){return Rt.options.metaMenu},onClick:e=>Bt("pending"),get disabled(){return Rt.changesNotSavedToDraft},get children(){return Rt.changesNotSavedToDraft?"Save draft before publishing request":"Request approval to publish"}})}})]}}),K(W,{when:false,get children(){return K(Vt,{})}}),K(W,{get when(){return"pending"===Rt.approvalStatus},get children(){return[K(W,{get when(){return Rt.options.userHasPublicationRights},get children(){return K(Jt,{})}}),K(W,{get when(){return!Rt.options.userHasPublicationRights},get children(){return K(vt,{get leftMargin(){return Rt.options.metaMenu},onClick:e=>Ht(),disabled:!1,children:"Withdraw publication request"})}})]}}),K(W,{get when(){return"approved"===Rt.approvalStatus},get children(){return[K(W,{get when(){return Rt.options.userHasPublicationRights},get children(){return K(Kt,{})}}),K(W,{get when(){return!Rt.options.userHasPublicationRights},get children(){return K(vt,{get leftMargin(){return Rt.options.metaMenu},get loading(){return Rt.publishing},onClick:e=>Rt.publish(e),get disabled(){return Rt.changesNotSavedToDraft},get children(){return Rt.changesNotSavedToDraft?"Discard unapproved changes to publish":"Publish to live site"}})}})]}}),K(W,{get when(){return"rejected"===Rt.approvalStatus},get children(){return K(W,{get when(){return Rt.options.userHasPublicationRights},get children(){return K(Kt,{})}})}})],Xt=()=>K(W,{get when(){return"pending"===Rt.approvalStatus&&Rt.changesNotSavedToDraft},get children(){return K(Tt,{children:"Saving a new draft will automatically withdraw the pending publication approval"})}}),Gt=()=>[K(W,{get when(){return""===Rt.approvalStatus},get children(){return[K(W,{get when(){return Rt.options.userHasPublicationRights},get children(){return K(vt,{get leftMargin(){return Rt.options.metaMenu},get loading(){return Rt.publishing},onClick:e=>Rt.publish(e),get disabled(){var e;return(null===(e=Rt.syncStatus.live)||void 0===e?void 0:e.synced)||Rt.changesNotSavedToDraft},get children(){var e;return Rt.changesNotSavedToDraft?"Save draft before updating on live":null!==(e=Rt.syncStatus.live)&&void 0!==e&&e.synced?"Updated on live site":"Update on live site"}})}}),K(W,{get when(){return!Rt.options.userHasPublicationRights},get children(){return K(vt,{get leftMargin(){return Rt.options.metaMenu},get loading(){return Rt.publishing},onClick:e=>Bt("pending"),get disabled(){var e;return(null===(e=Rt.syncStatus.live)||void 0===e?void 0:e.synced)||Rt.changesNotSavedToDraft},get children(){var e;return Rt.changesNotSavedToDraft?"Save draft before requesting publication approval":null!==(e=Rt.syncStatus.live)&&void 0!==e&&e.synced?"Updated on live site":"Request approval to publish"}})}})]}}),K(W,{get when(){return"pending"===Rt.approvalStatus},get children(){return[K(W,{get when(){return Rt.options.userHasPublicationRights},get children(){return K(Jt,{})}}),K(W,{get when(){return!Rt.options.userHasPublicationRights},get children(){return K(vt,{get leftMargin(){return Rt.options.metaMenu},onClick:e=>Ht(),disabled:!1,children:"Withdraw publication request"})}})]}}),K(W,{get when(){return"approved"===Rt.approvalStatus},get children(){return[K(W,{get when(){return Rt.options.userHasPublicationRights},get children(){return K(vt,{get leftMargin(){return Rt.options.metaMenu},get loading(){return Rt.publishing},onClick:e=>Rt.publish(e),get disabled(){var e;return(null===(e=Rt.syncStatus.live)||void 0===e?void 0:e.synced)||Rt.changesNotSavedToDraft},get children(){var e;return Rt.changesNotSavedToDraft?"Save draft before publishing to live":null!==(e=Rt.syncStatus.live)&&void 0!==e&&e.synced?"Updated on live site":"Update on live site"}})}}),K(W,{get when(){return!Rt.options.userHasPublicationRights},get children(){return K(vt,{get leftMargin(){return Rt.options.metaMenu},get loading(){return Rt.publishing},onClick:e=>Rt.publish(e),get disabled(){var e;return(null===(e=Rt.syncStatus.live)||void 0===e?void 0:e.synced)||Rt.changesNotSavedToDraft},get children(){var e;return Rt.changesNotSavedToDraft?"Save to draft or discard unapproved changes to publish":null!==(e=Rt.syncStatus.live)&&void 0!==e&&e.synced?"Updated on live site":"Update on live site"}})}})]}}),K(W,{get when(){return"rejected"===Rt.approvalStatus},get children(){return K(W,{get when(){return!Rt.options.userHasPublicationRights},get children(){return K(vt,{get leftMargin(){return Rt.options.metaMenu},onClick:e=>null,disabled:!0,get children(){return Rt.changesNotSavedToDraft?"Save draft before requesting publication approval":"Make changes before requesting approval to publish"}})}})}})],Zt=({options:e})=>{const[t,n]=De({}),[r,o]=f(!0),[i,l]=f(!1),[s,a]=f(!1),[d,c]=f(!1),[u,p]=f(!1),[g,h]=f(!1),[v,b]=f(!1),[y,w]=f(!1),[k,S]=f(!1),[C,P]=f(null);let j,A,M={permalink:e.permalink};const q=!e.metaMenu&&!e.optionsMeta;x((()=>{if(!q)return;e.requireApproval&&$t({options:e,setChecking:o,syncStatus:t,publish:e=>z(e)});setTimeout((()=>{const e="_new",t=document.createElement("a");t.classList.add("components-button"),t.classList.add("is-secondary"),"auto-draft"===wp.data.select("core/editor").getCurrentPost().status&&(t.style.display="none"),t.innerHTML="Preview",P(t),document.querySelector(".edit-post-header__settings").prepend(t),t.addEventListener("click",(function(t){const n=wp.data.select("core/editor").getEditedPostPreviewLink();wp.data.select("core/editor").isEditedPostDirty()?(t.preventDefault(),t.stopPropagation(),wp.data.dispatch("core/editor").savePost({isPreview:!0}).then((()=>{window.open(n,e)}))):window.open(n,e)}))}),700)})),m((()=>{var t,n;e.metaMenu?(A=document.querySelector("#save_menu_footer"),E()):null!==(t=wp)&&void 0!==t&&null!==(n=t.data)&&void 0!==n&&n.select&&(j=wp.data.select("core/editor"),wp.domReady(N))})),m((()=>{wp&&wp.hooks&&wp.hooks.addAction&&(R(),wp.hooks.addAction("dls.post-saved","dls",(()=>{var e,n,r;if(null!=t&&null!==(e=t.draft)&&void 0!==e&&e.exists||null===(n=j)||void 0===n||!n.isPublishingPost())null!=t&&null!==(r=t.draft)&&void 0!==r&&r.exists&&(N(),R());else{let e=0;const t=()=>{const e=j.getPermalink(),t=/http(s|):\/\/(.*?)(\/[\w\/-]*)\//gm.exec(e);return t?t[3]:""},n=()=>{if("auto-draft"!==j.getCurrentPost().status)return M={permalink:t()},p(!1),S(!1),R(),void(C().style.display="flex");e++<=50&&setTimeout(n,100)};n()}})))})),m((()=>{let e;document.addEventListener("cerberusListenerEvent",(t=>{var n;null!=t&&null!==(n=t.detail)&&void 0!==n&&n.hasChange&&(e||(e=document.querySelector(".editor-post-publish-button"),e.addEventListener("click",(()=>{b(!1),e.setAttribute("disabled",!0),window.onbeforeunload=null}))),e&&(b(!0),e.removeAttribute("disabled"),window.onbeforeunload=()=>!0))}))}));const N=()=>{let e;const t=wp.data.subscribe(_.debounce((()=>{e||(e=document.querySelector(".editor-post-publish-button"));const n=j.isEditedPostDirty(),r=j.hasNonPostEntityChanges(),o=v();r||n||o?(p(!0),e&&e.addEventListener("click",T),e&&e.removeAttribute("disabled"),t()):(p(!1),e&&e.removeEventListener("click",T),e&&e.setAttribute("disabled",!0))}),100))},T=()=>{""!==Rt.approvalStatus&&q&&e.requireApproval&&Rt.options.requireApproval&&Ht()},E=()=>{let e,t=!1;A.setAttribute("disabled",!0);let n=()=>{t||clearInterval(e)},r=()=>{t||(e=o())};const o=()=>setInterval((()=>{var o,i;null!==(o=window)&&void 0!==o&&null!==(i=o.wpNavMenu)&&void 0!==i&&i.menusChanged&&(t=!0,D(),clearInterval(e),window.removeEventListener("blur",n),window.removeEventListener("focus",r))}),500);e=o(),window.addEventListener("blur",n),window.addEventListener("focus",r)},D=()=>{A.removeAttribute("disabled"),h(!0)},R=async(r=!0)=>{r&&(o(!0),await new Promise((e=>setTimeout(e,1e3))));try{var i;const r=await Ze("check_sync",{...M,api_path:M.permalink});if(null==r||null===(i=r.data)||void 0===i||!i.resourceStatus)throw M;n({draft:r.data.resourceStatus.find((e=>"draft"===e.target&&"__original"===e.comparedTo)),live:r.data.resourceStatus.find((e=>"live"===e.target&&"draft"===e.comparedTo)),state:"loaded"}),console.log("status: ",t),S(!1),q&&e.requireApproval&&(async()=>{try{var e;const t=await et(`${Rt.options.api}/get-publication-request.php`,{postId:Rt.options.postId});if(null!==(e=t.data.resource)&&void 0!==e&&e.content){const e=t.data.resource.content;$t({approvalStatus:e.status,approvedBy:e.approvedBy,rejectedBy:e.rejectedBy,rejectionReason:e.rejectionReason||"",requestedBy:e.requestedBy,editorEmail:e.from_user_email,postTitle:e.post_title,siteTitle:e.from_site_name}),console.log(`Publication request for ${Rt.options.permalink}: `,Rt)}else console.log("No publication request found for:",Rt.options.permalink),Lt("")}catch(e){console.log("Error fetching publication request",e)}})(),e.metaMenu&&$()}catch(e){console.log("--- meta-box --- Can't find any data with check-sync of payload: ",e),S(!0),o(!1),n({state:"error"})}o(!1)},$=async()=>{var e;const n=document.querySelectorAll(".menu-theme-locations > .menu-settings-input"),r=document.querySelector(".menu-settings-group.menu-theme-locations"),o=document.createElement("i");o.classList.add("changes-disabled-message");const i=null===(e=t.draft)||void 0===e?void 0:e.exists,l=t.live&&t.live.exists;!i||l?(r.style.pointerEvents="none",r.style.cursor="not-allowed",r.style.opacity=.5):(r.style.pointerEvents="auto",r.style.cursor="default",r.style.opacity=1);const s=document.querySelector(".changes-disabled-message");if(l){const e="Menu must be unpublished before toggling location";s?s.innerHTML=e:(o.innerHTML=e,r.prepend(o))}else{const e="Menu must be created before toggling location";i?s&&s.parentNode.removeChild(s):s?s.innerHTML=e:(o.innerHTML=e,r.prepend(o))}let a=!1,d=!1;for(let e of n){const t=e.querySelector("input");t.addEventListener("change",(()=>{c(!0),D()}));e.querySelector(".theme-location-set")&&(t.setAttribute("disabled",!0),e.style.pointerEvents="none",e.style.opacity=.5,d=!0),t.getAttribute("checked")&&(a=!0)}if(d&&!l&&i){const e=document.querySelector(".changes-disabled-message"),t="Some locations cannot be set because they are already set";e?e.innerHTML=t:(o.innerHTML=t,r.prepend(o))}if(location.search.includes("menu=0"))return;w(!0);const u=document.querySelector(".submitdelete.deletion.menu-delete");let p=document.querySelector(".delete-link-replacement");a||l?(u.style.display="none",p?p.style.display="inline":(p=document.createElement("span"),p.classList.add("delete-link-replacement"),p.innerHTML="To delete a menu it must be unpublished (and unregisterered from all display locations)",p.style.color="#a7aaad",p.style.fontSize="12px"),u.parentNode.prepend(p)):(u.style.display="inline",p&&(p.style.display="none"))},L=(e={})=>{if(document){const t=new CustomEvent("cerberusChangeEvent",{detail:e});document.dispatchEvent(t)}},z=async t=>{t.preventDefault(),t.stopPropagation(),l(!0),!0!==e.requireApproval||"pending"!==(null==Rt?void 0:Rt.approvalStatus)&&"approved"!==(null==Rt?void 0:Rt.approvalStatus)||await Bt("approvedAndPublished");(await Ze("publish_to_live",M)).data?R(!1):n({state:"error"}),await new Promise((e=>setTimeout(e,1e3))),l(!1),L({action:"publish_to_live_done"})},B=async e=>{e.preventDefault(),e.stopPropagation(),a(!0);(await Ze("unpublish_from_live",M)).data?R(!1):n({state:"error"}),await new Promise((e=>setTimeout(e,1e3))),a(!1),L({action:"unpublish_from_live_done"})};m((()=>{q&&$t({changesNotSavedToDraft:O()})})),m((()=>{q&&$t({publishing:i()})})),m((()=>{q&&$t({publishing:i()})}));const O=()=>u()||g()||v();return K(_t,{get horizontal(){return e.metaMenu},get box(){return e.optionsMeta},get children(){return[K(W,{get when(){return r()},get children(){return K(Et,{get horizontal(){return e.metaMenu},get children(){return[K(gt,{get size(){return e.metaMenu?"small":"large"}}),K(Dt,{children:"Checking content in draft and live"})]}})}}),K(W,{get when(){return!r()},get children(){return[K(W,{get when(){return k()},get children(){return K(Et,{get horizontal(){return e.metaMenu},get children(){return K(Dt,{children:"Content must be saved before publishing"})}})}}),K(W,{get when(){var e;return!d()&&(null===(e=t.draft)||void 0===e?void 0:e.exists)},get children(){return[K(W,{get when(){return q&&e.requireApproval},get children(){return K(Ft,{})}}),K(W,{get when(){return!e.requireApproval},get children(){return K(Dt,{get horizontal(){return e.metaMenu},children:"Publish content"})}}),K(W,{get when(){var e;return!(null!==(e=t.live)&&void 0!==e&&e.exists)},get children(){return[oe((()=>q&&e.requireApproval?K(Wt,{}):K(vt,{get leftMargin(){return e.metaMenu},get loading(){return i()},onClick:e=>z(e),get disabled(){return O()},get children(){return O()?"Save draft before publishing to live":"Publish to live site"}}))),K(vt,{get leftMargin(){return e.metaMenu},disabled:!0,children:"Content not published"}),K(W,{when:q,get children(){return K(Xt,{})}})]}}),K(W,{get when(){var e;return null===(e=t.live)||void 0===e?void 0:e.exists},get children(){return[oe((()=>q&&!e.optionsMeta&&e.requireApproval?K(Gt,{}):K(vt,{get leftMargin(){return e.metaMenu},get loading(){return i()},onClick:e=>z(e),get disabled(){var e;return(null===(e=t.live)||void 0===e?void 0:e.synced)||O()},get children(){var e;return O()?"Save draft before updating on live":null!==(e=t.live)&&void 0!==e&&e.synced?"Updated on live site":"Update on live site"}}))),K(vt,{get leftMargin(){return e.metaMenu},get loading(){return s()},onClick:e=>B(e),get disabled(){return v()},children:"Unpublish"}),K(W,{when:q,get children(){return K(Xt,{})}})]}})]}}),K(W,{get when(){return e.metaMenu},get children(){return K(Et,{get horizontal(){return e.metaMenu},get children(){return[K(W,{get when(){return!y()},get children(){return K(Dt,{children:"Enter a 'Menu Name' above to create a new menu"})}}),(()=>{const e=oe((()=>{var e;return!(d()||null!==(e=t.draft)&&void 0!==e&&e.exists)}),!0);return K(W,{get when(){return e()&&y()},get children(){return K(Dt,{children:"Save menu with menu items in order to publish"})}})})(),K(W,{get when(){return d()},get children(){return K(Dt,{children:"Save the changes before publishing"})}})]}})}})]}}),K(W,{get when(){return e.enableTestContent},get children(){return K(vt,{get leftMargin(){return e.metaMenu},get loading(){return s()},onClick:e=>B(e),get disabled(){var e;return!(null!==(e=t.test)&&void 0!==e&&e.synced)},get children(){return t.test&&t.test.synced?"Unpublish from test target":"Publish to test target"}})}}),K(W,{get when(){return Rt.errorMessage},get children(){return K(Nt,{get children(){return Rt.errorMessage}})}})]}})},en=Ve("input")`
`,tn=Ve("div")`
    display: flex;
    flex-direction: column;
    width: 100%;
    padding-right: 10px;
    box-sizing: border-box;
`,nn=Ve("label")`
    padding: 5px 5px 0px 5px;
    font-size: 10px;
    height: 18px;
`,rn=({placeholder:e="",label:t=" ",value:n,onChange:r=(()=>{})})=>{const o=e=>{r(e.target.value)};return K(tn,{get children(){return[K(nn,{children:t}),K(en,{type:"text",get value(){return n()},placeholder:e,onKeyup:o})]}})},on=Ve("select")`
    max-width: 100% !important;
`,ln=Ve("div")`
    display: flex;
    flex-direction: column;
    width: 100%;
    padding-left: 10px;
    box-sizing: border-box;
`,sn=Ve("label")`
    padding: 5px 5px 0px 5px;
    font-size: 10px;
    height: 18px;
`,an=ae("<option></option>"),dn=({options:e=[],placeholder:t="",label:n=" ",value:r,onChange:o=(()=>{})})=>{const i=e=>{console.log(e),o(e.target.value)};return K(ln,{get children(){return[K(sn,{children:n}),K(on,{get value(){return r()},placeholder:t,onChange:i,get children(){return K(V,{each:e,children:e=>(()=>{const t=an.cloneNode(!0);return fe(t,(()=>e.label)),v((n=>{const o=e.value,i=e.value===r();return o!==n._v$&&(t.value=n._v$=o),i!==n._v$2&&(t.selected=n._v$2=i),n}),{_v$:void 0,_v$2:void 0}),t})()})}})]}})},cn={open:Je`
    0% {
        max-height: 0;
    }
    100% {
        max-height: 300px;
    }
`,close:Je`
    0% {
        max-height: 300px;
    }
    100% {
        max-height: 0;
    }
`,init:Je`
    0% {
        max-height: 0;
    }
    100% {
        max-height: 0;
    }
`},un=Ve("div")`
     color: black;
     max-width: 1200px;
     margin: 0 auto;
`,pn=(Ve("div")`
`,Ve("div")`
    font-size: 1rem;
    padding: 1rem 0;
`,Ve("div")`
    display: flex;
    justify-content: flex-end;
`),gn=Ve("div")`
    max-height: 0px;
    overflow: hidden;
    ${e=>`animation: ${cn[e.state]} .4s ease-in-out forwards;`}
`,hn=Ve("div")`
    background-color: #fff;
    border: 1px solid #aaa;
    border-radius: 3px;
    margin-top: 20px;
    padding: 20px;
`,fn=Ve("div")`
    width: 100%;
    display: flex;
    padding-bottom: 10px;
`,vn=Ve("div")`
    width: 100%;
    display: flex;
    justify-content: flex-end;
`,mn=Ve("div")`
    color red;
`,bn=Ve("div")`
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
`,yn=Ve("table")`
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
`,wn=Ve("td")`
    display: flex;
    justify-content: flex-end;
`,xn=ae("<thead><tr><th>Domain</th><th>Distribution ID</th><th>Target</th><th>SiteId</th><th></th></tr></thead>"),kn=ae("<tbody></tbody>"),Sn=ae("<tr><td></td><td></td><td></td><td></td></tr>"),Cn=[{value:"draft",label:"Draft"},{value:"live",label:"Live"},{value:"test",label:"Test"}];const Pn=({options:e})=>{const[t,n]=De({list:[]}),[r,o]=f(""),[i,l]=f(""),[s,a]=f("draft"),[d,c]=f("init"),[u,p]=f(""),[g,h]=f(!1),v=async()=>{const t=await et(`${e.api}/get-domain-settings.php`);n("list",t)},b=async(t=function(e){for(var t="",n="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",r=n.length,o=0;o<e;o++)t+=n.charAt(Math.floor(Math.random()*r));return t}(20))=>{try{if(p(""),g())return;h(!0),await et(`${e.api}/upsert-domain-setting.php`,{domain:r(),target:s(),id:t,cloudfrontDistributionId:i()}),await v(),a("draft"),o(""),l(""),h(!1),c("close")}catch(e){console.log("ee",e),"domain-already-exists"===e.error?p("Domain already exists"):p("Something caused an error"),h(!1)}},y=(e,t)=>{"domain"===e&&o(t),"target"===e&&a(t),"cloudfrontDistributionId"===e&&l(t)};return m((()=>{v()})),K(un,{get children(){return[K(st,{children:"Domain Settings"}),K(lt,{children:"This is the list of domains and targets that will be used for this site. You can add as many as you need but the domains need to be pointed to the server to make it work."}),K(pn,{get children(){return K(vt,{onClick:()=>c("open"),children:"Add new domain and target"})}}),K(gn,{get state(){return d()},get children(){return K(hn,{get children(){return[K(dt,{children:"Add new domain and target"}),K(fn,{get children(){return[K(rn,{placeholder:"domain",label:"Domain:",value:r,onChange:e=>y("domain",e)}),K(rn,{placeholder:"distribution id",label:"Cloudfront Distribution ID:",value:i,onChange:e=>y("cloudfrontDistributionId",e)}),K(dn,{options:Cn,value:s,onChange:e=>y("target",e)})]}}),K(W,{when:u,get children(){return K(mn,{children:u})}}),K(vn,{get children(){return[K(vt,{onClick:()=>c("close"),children:"Cancel"}),K(vt,{get loading(){return g()},leftMargin:!0,get disabled(){return!r()||!s()},onClick:()=>b(),children:"Save"})]}})]}})}}),K(yn,{get children(){return[xn.cloneNode(!0),(()=>{const n=kn.cloneNode(!0);return fe(n,K(V,{get each(){return t.list},children:t=>(()=>{const n=Sn.cloneNode(!0),r=n.firstChild,o=r.nextSibling,i=o.nextSibling,l=i.nextSibling;return fe(r,(()=>t.content.domain)),fe(o,(()=>t.content.cloudfrontDistributionId)),fe(i,(()=>t.content.target)),fe(l,(()=>t.content.siteId)),fe(n,K(wn,{get children(){return K(bn,{onClick:()=>(async t=>{try{await et(`${e.api}/delete-domain-setting.php`,{id:t}),await v()}catch(e){console.log(e)}})(t.externalId),children:"delete"})}}),null),n})()})),n})()]}})]}})},jn=ae("<span>, requested by <em></em></span>"),An=ae("<span> - rejected by <em></em></span>"),Mn=ae("<span> - approved by <em></em></span>"),qn=ae("<em></em>"),_n=Ve("div")`
    text-transform: uppercase;
    font-size: 13px;
    margin-right: 0.5rem;
    background-color: rgba(0,0,0,0.1);
    padding: 0.2rem 0.35rem;
    min-width: 50px;
    display: flex;
    justify-content: center;
    align-self: flex-start;
`,Nn=Ve("a")`
    ${e=>e.href?"":"color: black;"}
    font-weight: bold;
    text-transform: capitalize;
    text-decoration: none;
`,Tn=Ve("p")`
    margin: 0;
    font-size: inherit;
    color: gray;
`,En=Ve("h5")`
    margin: 0;
    margin-bottom: 0.3rem;
    text-decoration: underline;
`,Dn=Ve("div")`
    margin-top: 0.8rem;
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    font-size: 15px;
`,Rn=Ve("div")`
    display: flex;
    align-items: flex-start;
    margin-top: -10px;
    padding-inline: 1rem;
`,$n=Ve("div")`
    padding-left: 1rem;
    margin-top: 0.5rem;
`,Ln=e=>{const t=()=>{console.log("Request data: ",e.item)};return K(Dn,{get key(){return e.item.content.post_id},get children(){return[K(_n,{onClick:t,get children(){return e.item.content.type}}),K(Tn,{get children(){return[K(Nn,{get href(){return(()=>{const t=e.item.content["wp-domain"];return e.item.content.editorUrl.includes(t)?e.item.content.editorUrl:`${e.item.content["wp-domain"]}${e.item.content.editorUrl}`})()},target:"_blank",get children(){return e.item.content.post_title}}),K(W,{get when(){return"admin"===e.type},get children(){const t=jn.cloneNode(!0);return fe(t.firstChild.nextSibling,(()=>e.item.content.requestedBy)),t}}),K(W,{get when(){return"rejected"===e.item.content.status},get children(){const t=An.cloneNode(!0);return fe(t.firstChild.nextSibling,(()=>e.item.content.rejectedBy)),t}}),K(W,{get when(){return"approved"===e.item.content.status||"approvedAndPublished"===e.item.content.status},get children(){const t=Mn.cloneNode(!0);return fe(t.firstChild.nextSibling,(()=>e.item.content.approvedBy)),t}}),oe((()=>` (${(()=>{const t=new Date(e.item.content.updated_on);return t.getFullYear()+"-"+(t.getMonth()+1).toString().padStart(2,"0")+"-"+t.getDate().toString().padStart(2,"0")+", "+t.getHours().toString().padStart(2,"0")+":"+t.getMinutes().toString().padStart(2,"0")})()})`)),K(W,{get when(){return"rejected"===e.item.content.status},get children(){return K($n,{get children(){return[K(En,{children:"Rejection message:"}),(()=>{const t=qn.cloneNode(!0);return fe(t,(()=>e.item.content.rejectionReason)),t})()]}})}})]}}),K(Rn,{get children(){return K(vt,{get onClick(){return e.manualDelete},children:"Delete"})}})]}})},zn=ae("<p></p>"),Bn=ae("<p>Reload page</p>"),On=ae("<div></div>"),Hn=Ve("div")`
    margin-bottom: 3rem;
`,Un=Ve("div")`
    margin-top: 1rem;
    margin-bottom: 2rem;
`,In=Ve("p")`
    font-size: 15px;
`,Fn=Ve("div")`
    width: 100%;
    border-bottom: solid 2px #c3c4c7;
    height: 2rem;
    display: flex;
    align-items: flex-end;
`,Kn=Ve("div")`
    background-color: white;
    width: 100%;
    padding: 2rem 1rem;
    box-sizing: border-box;
    border: solid 2px #c3c4c7;
    border-top: none;
`,Yn=Ve("button")`
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
`,Jn=[{slug:"pending",name:"Pending"},{slug:"approved",name:"Approved"},{slug:"approvedAndPublished",name:"Published"},{slug:"rejected",name:"Rejected"}],Qn=({options:e})=>{const[t,n]=f([]),[r,o]=f([]),[i,l]=f([]),[s,a]=f([]),[d,c]=f(!1),[u,p]=f(""),[g,h]=f("pending");x((()=>{c(!0),v()}));const v=async()=>{try{var t;const n=await et(`${e.api}/get-publication-requests.php`);m(null==n||null===(t=n.data)||void 0===t?void 0:t.resources)}catch(e){console.log("Error fetching all publication requests",e),p("Error fetching all publication requests")}},m=(e=[])=>{const t={pending:{},approved:{},approvedAndPublished:{},rejected:{}};console.log("Unsorted requests",e);const r=e.sort(((e,t)=>new Date(t.content.updated_on)-new Date(e.content.updated_on)));r.forEach((e=>{const n=e.content.status,r=b(e.content["wp-domain"]),o=e.content.from_site_name+" - "+r;t[n][o]||(t[n][o]=[]),t[n][o].push(e)})),console.log("Approved: ",t.approved),console.log("Approved And Published: ",t.approvedAndPublished),console.log("Pending: ",t.pending),console.log("Rejected: ",t.rejected),n(t.approved),o(t.approvedAndPublished),a(t.rejected),l(t.pending),c(!1)},b=e=>{const t=e.indexOf("://");return e.slice(t+3)},y=({title:t,siteRequests:n})=>{const r=Object.keys(n);return K(Hn,{get children(){return[K(dt,{children:t}),K(W,{get when(){return 0!==r.length},get fallback(){return K(Tn,{children:"None to show"})},get children(){return K(V,{each:r,children:t=>K(Un,{get children(){return[K(In,{children:t}),K(V,{get each(){return n[t]},children:t=>K(Ln,{item:t,manualDelete:()=>(async t=>{console.log("Deleting publication request: "+t);try{var n;const o=await et(`${e.api}/delete-publication-request.php`,{postId:t});var r;if(console.log("Delete result",o),null!=o&&null!==(n=o.errors)&&void 0!==n&&n.length)throw new Error(null===(r=o.errors[0])||void 0===r?void 0:r.message);v()}catch(e){console.log("Error deleting publication request",e),p("Error deleting publication request")}})(t.content.post_id),type:"admin"})})]}})})}})]}})};return(()=>{const e=On.cloneNode(!0);return fe(e,K(st,{children:"Publication requests"}),null),fe(e,K(Fn,{get children(){return K(V,{each:Jn,children:(e,t)=>K(Yn,{get isActive(){return e.slug===g()},onClick:()=>h(e.slug),get children(){return e.name}})})}}),null),fe(e,K(Kn,{get children(){return[(()=>{const e=oe((()=>!!d()),!0);return K(W,{get when(){return e()&&!u()},get children(){return K(Tn,{children:"Loading..."})}})})(),(()=>{const e=oe((()=>!("pending"!==g()||d())),!0);return K(W,{get when(){return e()&&!u()},get children(){return y({title:"Pending",siteRequests:i()})}})})(),(()=>{const e=oe((()=>!("approved"!==g()||d())),!0);return K(W,{get when(){return e()&&!u()},get children(){return y({title:"Approved",siteRequests:t()})}})})(),(()=>{const e=oe((()=>!("approvedAndPublished"!==g()||d())),!0);return K(W,{get when(){return e()&&!u()},get children(){return y({title:"Published",siteRequests:r()})}})})(),(()=>{const e=oe((()=>!("rejected"!==g()||d())),!0);return K(W,{get when(){return e()&&!u()},get children(){return y({title:"Rejected",siteRequests:s()})}})})(),K(W,{get when(){return u()},get children(){return[(()=>{const e=zn.cloneNode(!0);return fe(e,u),e})(),Bn.cloneNode(!0)]}})]}}),null),e})()},Vn=ae("<p></p>"),Wn=ae("<p>Reload page</p>"),Xn=ae("<div></div>"),Gn=Ve("div")`
    margin-bottom: 3rem;
`,Zn=Ve("div")`
    margin-top: 1rem;
    margin-bottom: 2rem;
`,er=Ve("p")`
    font-size: 15px;
`,tr=[{slug:"pending",name:"Pending"},{slug:"approved",name:"Approved"},{slug:"approvedAndPublished",name:"Published"},{slug:"rejected",name:"Rejected"}],nr=({options:e})=>{const[t,n]=f([]),[r,o]=f([]),[i,l]=f([]),[s,a]=f([]),[d,c]=f("pending"),[u,p]=f(!1),[g,h]=f("");x((()=>{p(!0),v()}));const v=async()=>{try{var t;const n=await et(`${e.api}/get-publication-requests.php`);m(null==n||null===(t=n.data)||void 0===t?void 0:t.resources)}catch(e){console.log("Error fetching all publication requests",e),h("Error fetching all publication requests")}},m=(t=[])=>{const r={pending:{},approved:{},approvedAndPublished:{},rejected:{}};console.log("Unsorted requests",t);const i=t.filter((t=>t.content.requestedBy===e.userName)).sort(((e,t)=>new Date(t.content.updated_on)-new Date(e.content.updated_on)));i.forEach((e=>{const t=e.content.status,n=b(e.content["wp-domain"]),o=e.content.from_site_name+" - "+n;r[t][o]||(r[t][o]=[]),r[t][o].push(e)})),console.log("Approved: ",r.approved),console.log("Approved And Published:",r.approvedAndPublished),console.log("Pending: ",r.pending),console.log("Rejected: ",r.rejected),n(r.approved),o(r.approvedAndPublished),a(r.rejected),l(r.pending),p(!1)},b=e=>{const t=e.indexOf("://");return e.slice(t+3)},y=({title:t,siteRequests:n})=>{const r=Object.keys(n);return K(Gn,{get children(){return[K(dt,{children:t}),K(W,{get when(){return 0!==r.length},get fallback(){return K(Tn,{children:"None to show"})},get children(){return K(V,{each:r,children:t=>K(Zn,{get children(){return[K(er,{children:t}),K(V,{get each(){return n[t]},children:t=>K(Ln,{item:t,manualDelete:()=>(async t=>{console.log("Deleting publication request: "+t);try{var n;const o=await et(`${e.api}/delete-publication-request.php`,{postId:t});var r;if(console.log("Delete result",o),null!=o&&null!==(n=o.errors)&&void 0!==n&&n.length)throw new Error(null===(r=o.errors[0])||void 0===r?void 0:r.message);v()}catch(e){console.log("Error deleting publication request",e),h("Error deleting publication request")}})(t.content.post_id),type:"editor"})})]}})})}})]}})};return(()=>{const e=Xn.cloneNode(!0);return fe(e,K(st,{children:"My publication requests"}),null),fe(e,K(Fn,{get children(){return K(V,{each:tr,children:(e,t)=>K(Yn,{get isActive(){return e.slug===d()},onClick:()=>c(e.slug),get children(){return e.name}})})}}),null),fe(e,K(Kn,{get children(){return[(()=>{const e=oe((()=>!!u()),!0);return K(W,{get when(){return e()&&!g()},get children(){return K(Tn,{children:"Loading..."})}})})(),(()=>{const e=oe((()=>!("pending"!==d()||u())),!0);return K(W,{get when(){return e()&&!g()},get children(){return y({title:"Pending",siteRequests:i()})}})})(),(()=>{const e=oe((()=>!("approved"!==d()||u())),!0);return K(W,{get when(){return e()&&!g()},get children(){return y({title:"Approved",siteRequests:t()})}})})(),(()=>{const e=oe((()=>!("approvedAndPublished"!==d()||u())),!0);return K(W,{get when(){return e()&&!g()},get children(){return y({title:"Published",siteRequests:r()})}})})(),(()=>{const e=oe((()=>!("rejected"!==d()||u())),!0);return K(W,{get when(){return e()&&!g()},get children(){return y({title:"Rejected",siteRequests:s()})}})})(),K(W,{get when(){return g()},get children(){return[(()=>{const e=Vn.cloneNode(!0);return fe(e,g),e})(),Wn.cloneNode(!0)]}})]}}),null),e})()},rr=e=>{try{return JSON.parse(document.getElementById(e).innerHTML)}catch(e){return console.log("Error in getData",e),{}}},or=()=>{let e=document.getElementById("dls-metabox-root");if(e){const t=rr("dls-data");t.metaMenu="nav-menu"===e.getAttribute("data-type"),t.metaMenu&&(e=document.createElement("div"),e&&document.querySelector("#nav-menu-footer").prepend(e)),se((()=>K(Zt,{options:t})),e)}};jQuery(document).ready((function(e){var t,n;const r=null===(t=wp)||void 0===t||null===(n=t.data)||void 0===n?void 0:n.dispatch("core/editor");r&&r.disablePublishSidebar(),(()=>{if(wp.data){let e=!1,t=!1;wp.data.subscribe((()=>{const n=wp.data.select("core/editor").isSavingPost(),r=wp.data.select("core/editor").isSavingNonPostEntityChanges&&wp.data.select("core/editor").isSavingNonPostEntityChanges();e!==n?(e=n,wp.data.select("core/editor").didPostSaveRequestSucceed()&&wp.hooks.doAction("dls.post-saved")):t!==r&&(t=r,wp.data.select("core/editor").didPostSaveRequestSucceed()&&wp.hooks.doAction("dls.post-saved"))}))}})();let o={};try{o=e("#dls-hooks").length>0?JSON.parse(e("#dls-hooks").html()):{hook:""}}catch(e){}console.log("Current hook",o&&o.hook),"post.php"===o.hook||"post-new.php"===o.hook||"nav-menus.php"===o.hook?or():o.hook.includes("toplevel_page_draft-live-sync")?(()=>{const e=rr("dls-data");se((()=>K($e,{values:e,get children(){return K(qt,{})}})),document.getElementById("dls-root"))})():o.hook.includes("toplevel_page_cerberus-domain-settings")?(()=>{const e=document.getElementById("dls-domain-settings-root"),t=rr("dls-data");se((()=>K(Pn,{options:t})),e)})():o.hook.includes("toplevel_page_publication-approval")?(()=>{const e=document.getElementById("dls-publication-approval-root"),t=rr("dls-data");se((()=>K(Qn,{options:t})),e)})():o.hook.includes("toplevel_page_publication-requests")?(()=>{const e=document.getElementById("dls-publication-requests-root"),t=rr("dls-data");se((()=>K(nr,{options:t})),e)})():o.hook.includes(".php")||or();const i=()=>{const e="true"===lr("cerberus-activated"),t=document.querySelector("#toplevel_page_draft-live-sync");e&&t?t.style.display="block":t&&(t.style.display="none")};i();const l=document.querySelector("#cerberus-initiator");if(l){let e=0;l.addEventListener("click",(()=>{if(e++>9){"true"===lr("cerberus-activated")?ir("cerberus-activated",!1,0):ir("cerberus-activated",!0,1e3),i(),e=0}}))}}));const ir=(e,t,n)=>{var r="";if(n){var o=new Date;o.setTime(o.getTime()+24*n*60*60*1e3),r="; expires="+o.toUTCString()}document.cookie=e+"="+(t||"")+r+"; path=/"},lr=e=>{for(var t=e+"=",n=document.cookie.split(";"),r=0;r<n.length;r++){for(var o=n[r];" "==o.charAt(0);)o=o.substring(1,o.length);if(0==o.indexOf(t))return o.substring(t.length,o.length)}return null}}();
//# sourceMappingURL=draft-live-sync-boot-1.1.5.js.map
