!function(){"use strict";const e=Symbol("solid-proxy"),t={equals:(e,t)=>e===t};let n=N;const r={},o={owned:null,cleanups:null,context:null,owner:null};var i=null;let l=null,s=null,a=null,d=null,c=null,u=0;function p(e,t){t&&(i=t);const n=s,r=i,l=0===e.length?o:{owned:null,cleanups:null,context:null,owner:r};let a;i=l,s=null;try{q((()=>a=e((()=>R(l)))),!0)}finally{s=n,i=r}return a}function g(e,n){n=n?Object.assign({},t,n):t;const o={value:e,observers:null,observerSlots:null,pending:r,comparator:n.equals||void 0};return[C.bind(o),e=>("function"==typeof e&&(e=e(o.pending!==r?o.pending:o.value)),P(o,e))]}function h(e,t,n){j(A(e,t,!1))}function f(e,t,r){n=T;const o=A(e,t,!1);o.user=!0,c&&c.push(o)}function v(e,n,o){o=o?Object.assign({},t,o):t;const i=A(e,n,!0);return i.pending=r,i.observers=null,i.observerSlots=null,i.state=0,i.comparator=o.equals||void 0,j(i),C.bind(i)}function m(e){if(a)return e();let t;const n=a=[];try{t=e()}finally{a=null}return q((()=>{for(let e=0;e<n.length;e+=1){const t=n[e];if(t.pending!==r){const e=t.pending;t.pending=r,P(t,e)}}}),!1),t}function b(e){let t,n=s;return s=null,t=e(),s=n,t}function y(e){f((()=>b(e)))}function w(){return s}function x(e){const t=Symbol("context");return{id:t,Provider:B(t),defaultValue:e}}function k(e){return L(i,e.id)||e.defaultValue}function S(e){const t=v(e);return v((()=>z(t())))}function C(){if(this.state&&this.sources){const e=d;d=null,1===this.state?j(this):E(this),d=e}if(s){const e=this.observers?this.observers.length:0;s.sources?(s.sources.push(this),s.sourceSlots.push(e)):(s.sources=[this],s.sourceSlots=[e]),this.observers?(this.observers.push(s),this.observerSlots.push(s.sources.length-1)):(this.observers=[s],this.observerSlots=[s.sources.length-1])}return this.value}function P(e,t,n){return e.comparator&&e.comparator(e.value,t)?t:a?(e.pending===r&&a.push(e),e.pending=t,t):(e.value=t,!e.observers||d&&!e.observers.length||q((()=>{for(let t=0;t<e.observers.length;t+=1){const n=e.observers[t];l,n.observers&&2!==n.state&&D(n),n.state=1,n.pure?d.push(n):c.push(n)}if(d.length>1e6)throw d=[],new Error}),!1),t)}function j(e){if(!e.fn)return;R(e);const t=i,n=s,r=u;s=i=e,function(e,t,n){let r;try{r=e.fn(t)}catch(e){$(e)}(!e.updatedAt||e.updatedAt<=n)&&(e.observers&&e.observers.length?P(e,r):e.value=r,e.updatedAt=n)}(e,e.value,r),s=n,i=t}function A(e,t,n,r){const l={fn:e,state:1,updatedAt:null,owned:null,sources:null,sourceSlots:null,cleanups:null,value:t,owner:i,context:null,pure:n};return null===i||i!==o&&(i.owned?i.owned.push(l):i.owned=[l]),l}function M(e){let t,n=1===e.state&&e;if(e.suspense&&b(e.suspense.inFallback))return e.suspense.effects.push(e);for(;e=e.owner;)2===e.state?t=e:1===e.state&&(n=e,t=void 0);if(t){const e=d;if(d=null,E(t),d=e,!n||1!==n.state)return}n&&j(n)}function q(e,t){if(d)return e();let r=!1;t||(d=[]),c?r=!0:c=[],u++;try{e()}catch(e){$(e)}finally{!function(e){d&&(N(d),d=null);if(e)return;c.length?m((()=>{n(c),c=null})):c=null}(r)}}function N(e){for(let t=0;t<e.length;t++)M(e[t])}function T(e){let t,n=0;for(t=0;t<e.length;t++){const r=e[t];r.user?e[n++]=r:M(r)}const r=e.length;for(t=0;t<n;t++)M(e[t]);for(t=r;t<e.length;t++)M(e[t])}function E(e){e.state=0;for(let t=0;t<e.sources.length;t+=1){const n=e.sources[t];n.sources&&(1===n.state?M(n):2===n.state&&E(n))}}function D(e){for(let t=0;t<e.observers.length;t+=1){const n=e.observers[t];n.state||(n.state=2,n.observers&&D(n))}}function R(e){let t;if(e.sources)for(;e.sources.length;){const t=e.sources.pop(),n=e.sourceSlots.pop(),r=t.observers;if(r&&r.length){const e=r.pop(),o=t.observerSlots.pop();n<r.length&&(e.sourceSlots[o]=n,r[n]=e,t.observerSlots[n]=o)}}if(e.owned){for(t=0;t<e.owned.length;t++)R(e.owned[t]);e.owned=null}if(e.cleanups){for(t=0;t<e.cleanups.length;t++)e.cleanups[t]();e.cleanups=null}e.state=0,e.context=null}function $(e){throw e}function L(e,t){return e&&(e.context&&e.context[t]||e.owner&&L(e.owner,t))}function z(e){if("function"==typeof e&&!e.length)return z(e());if(Array.isArray(e)){const t=[];for(let n=0;n<e.length;n++){const r=z(e[n]);Array.isArray(r)?t.push.apply(t,r):t.push(r)}return t}return e}function B(e){return function(t){let n;var r;return j(A((()=>n=b((()=>(i.context={[e]:t.value},S((()=>t.children)))))),r,!0)),n}}const O=Symbol("fallback");function H(e){for(let t=0;t<e.length;t++)e[t]()}function U(e,t,n={}){let r=[],o=[],l=[],s=0,a=t.length>1?[]:null;var d;return d=()=>H(l),null===i||(null===i.cleanups?i.cleanups=[d]:i.cleanups.push(d)),()=>{let i,d,c=e()||[];return b((()=>{let e,t,g,h,f,v,m,b,y,w=c.length;if(0===w)0!==s&&(H(l),l=[],r=[],o=[],s=0,a&&(a=[])),n.fallback&&(r=[O],o[0]=p((e=>(l[0]=e,n.fallback()))),s=1);else if(0===s){for(o=new Array(w),d=0;d<w;d++)r[d]=c[d],o[d]=p(u);s=w}else{for(g=new Array(w),h=new Array(w),a&&(f=new Array(w)),v=0,m=Math.min(s,w);v<m&&r[v]===c[v];v++);for(m=s-1,b=w-1;m>=v&&b>=v&&r[m]===c[b];m--,b--)g[b]=o[m],h[b]=l[m],a&&(f[b]=a[m]);for(e=new Map,t=new Array(b+1),d=b;d>=v;d--)y=c[d],i=e.get(y),t[d]=void 0===i?-1:i,e.set(y,d);for(i=v;i<=m;i++)y=r[i],d=e.get(y),void 0!==d&&-1!==d?(g[d]=o[i],h[d]=l[i],a&&(f[d]=a[i]),d=t[d],e.set(y,d)):l[i]();for(d=v;d<w;d++)d in g?(o[d]=g[d],l[d]=h[d],a&&(a[d]=f[d],a[d](d))):o[d]=p(u);o=o.slice(0,s=w),r=c.slice(0)}return o}));function u(e){if(l[d]=e,a){const[e,n]=g(d);return a[d]=n,t(c[d],e)}return t(c[d])}}}function I(e,t){return b((()=>e(t)))}function F(){return!0}const K={get:(t,n,r)=>n===e?r:t.get(n),has:(e,t)=>e.has(t),set:F,deleteProperty:F,getOwnPropertyDescriptor:(e,t)=>({configurable:!0,enumerable:!0,get:()=>e.get(t),set:F,deleteProperty:F}),ownKeys:e=>e.keys()};function Y(...e){return new Proxy({get(t){for(let n=e.length-1;n>=0;n--){const r=e[n][t];if(void 0!==r)return r}},has(t){for(let n=e.length-1;n>=0;n--)if(t in e[n])return!0;return!1},keys(){const t=[];for(let n=0;n<e.length;n++)t.push(...Object.keys(e[n]));return[...new Set(t)]}},K)}function J(e){const t="fallback"in e&&{fallback:()=>e.fallback};return v(U((()=>e.each),e.children,t||void 0))}function Q(e){let t=!1;const n=v((()=>e.when),void 0,{equals:(e,n)=>t?e===n:!e==!n});return v((()=>{const r=n();if(r){const n=e.children;return(t="function"==typeof n&&n.length>0)?b((()=>n(r))):n}return e.fallback}))}function V(e){let t=!1;const n=S((()=>e.children)),r=v((()=>{let e=n();Array.isArray(e)||(e=[e]);for(let t=0;t<e.length;t++){const n=e[t].when;if(n)return[t,n,e[t]]}return[-1]}),void 0,{equals:(e,n)=>e&&e[0]===n[0]&&(t?e[1]===n[1]:!e[1]==!n[1])&&e[2]===n[2]});return v((()=>{const[n,o,i]=r();if(n<0)return e.fallback;const l=i.children;return(t="function"==typeof l&&l.length>0)?b((()=>l(o))):l}))}function W(e){return e}const X=new Set(["className","indeterminate","value","allowfullscreen","allowpaymentrequest","async","autofocus","autoplay","checked","controls","default","disabled","formnovalidate","hidden","ismap","itemscope","loop","multiple","muted","nomodule","novalidate","open","playsinline","readonly","required","reversed","seamless","selected","truespeed"]),G=new Set(["innerHTML","textContent","innerText","children"]),Z={className:"class",htmlFor:"for"},ee=new Set(["beforeinput","click","dblclick","focusin","focusout","input","keydown","keyup","mousedown","mousemove","mouseout","mouseover","mouseup","pointerdown","pointermove","pointerout","pointerover","pointerup","touchend","touchmove","touchstart"]),te={xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace"};function ne(e,t){return v(e,void 0,t?void 0:{equals:t})}function re(e,t,n){let r=n.length,o=t.length,i=r,l=0,s=0,a=t[o-1].nextSibling,d=null;for(;l<o||s<i;)if(t[l]!==n[s]){for(;t[o-1]===n[i-1];)o--,i--;if(o===l){const t=i<r?s?n[s-1].nextSibling:n[i-s]:a;for(;s<i;)e.insertBefore(n[s++],t)}else if(i===s)for(;l<o;)d&&d.has(t[l])||e.removeChild(t[l]),l++;else if(t[l]===n[i-1]&&n[s]===t[o-1]){const r=t[--o].nextSibling;e.insertBefore(n[s++],t[l++].nextSibling),e.insertBefore(n[--i],r),t[o]=n[i]}else{if(!d){d=new Map;let e=s;for(;e<i;)d.set(n[e],e++)}const r=d.get(t[l]);if(null!=r)if(s<r&&r<i){let a,c=l,u=1;for(;++c<o&&c<i&&null!=(a=d.get(t[c]))&&a===r+u;)u++;if(u>r-s){const o=t[l];for(;s<r;)e.insertBefore(n[s++],o)}else e.replaceChild(n[s++],t[l++])}else l++;else e.removeChild(t[l++])}}else l++,s++}const oe="_$DX_DELEGATE";function ie(e,t,n){let r;return p((o=>{r=o,ge(t,e(),t.firstChild?null:void 0,n)})),()=>{r(),t.textContent=""}}function le(e,t,n){const r=document.createElement("template");r.innerHTML=e;let o=r.content.firstChild;return n&&(o=o.firstChild),o}function se(e,t=window.document){const n=t[oe]||(t[oe]=new Set);for(let r=0,o=e.length;r<o;r++){const o=e[r];n.has(o)||(n.add(o),t.addEventListener(o,fe))}}function ae(e,t,n){null==n?e.removeAttribute(t):e.setAttribute(t,n)}function de(e,t,n,r){null==r?e.removeAttributeNS(t,n):e.setAttributeNS(t,n,r)}function ce(e,t,n,r){r?Array.isArray(n)?(e[`$$${t}`]=n[0],e[`$$${t}Data`]=n[1]):e[`$$${t}`]=n:Array.isArray(n)?e.addEventListener(t,(e=>n[0](n[1],e))):e.addEventListener(t,n)}function ue(e,t,n={}){const r=Object.keys(t),o=Object.keys(n);let i,l;for(i=0,l=o.length;i<l;i++){const r=o[i];r&&"undefined"!==r&&!(r in t)&&(he(e,r,!1),delete n[r])}for(i=0,l=r.length;i<l;i++){const o=r[i],l=!!t[o];o&&"undefined"!==o&&n[o]!==l&&(he(e,o,l),n[o]=l)}return n}function pe(e,t,n={}){const r=e.style;if("string"==typeof t)return r.cssText=t;let o,i;for(i in"string"==typeof n&&(n={}),n)null==t[i]&&r.removeProperty(i),delete n[i];for(i in t)o=t[i],o!==n[i]&&(r.setProperty(i,o),n[i]=o);return n}function ge(e,t,n,r){if(void 0===n||r||(r=[]),"function"!=typeof t)return me(e,t,r,n);h((r=>me(e,t(),r,n)),r)}function he(e,t,n){const r=t.split(/\s+/);for(let t=0,o=r.length;t<o;t++)e.classList.toggle(r[t],n)}function fe(e){const t=`$$${e.type}`;let n=e.composedPath&&e.composedPath()[0]||e.target;for(e.target!==n&&Object.defineProperty(e,"target",{configurable:!0,value:n}),Object.defineProperty(e,"currentTarget",{configurable:!0,get:()=>n});null!==n;){const r=n[t];if(r&&!n.disabled){const o=n[`${t}Data`];if(void 0!==o?r(o,e):r(e),e.cancelBubble)return}n=n.host&&n.host!==n&&n.host instanceof Node?n.host:n.parentNode}}function ve(e,t,n={},r,o){return!o&&"children"in t&&h((()=>n.children=me(e,t.children,n.children))),h((()=>function(e,t,n,r,o={}){let i,l,s;for(const d in t){if("children"===d){r||me(e,t.children);continue}const c=t[d];if(c!==o[d]){if("style"===d)pe(e,c,o[d]);else if("class"!==d||n)if("classList"===d)ue(e,c,o[d]);else if("ref"===d)c(e);else if("on:"===d.slice(0,3))e.addEventListener(d.slice(3),c);else if("oncapture:"===d.slice(0,10))e.addEventListener(d.slice(10),c,!0);else if("on"===d.slice(0,2)){const t=d.slice(2).toLowerCase(),n=ee.has(t);ce(e,t,c,n),n&&se([t])}else if((s=G.has(d))||!n&&(l=X.has(d))||(i=e.nodeName.includes("-")))!i||l||s?e[d]=c:e[(a=d,a.toLowerCase().replace(/-([a-z])/g,((e,t)=>t.toUpperCase())))]=c;else{const t=n&&d.indexOf(":")>-1&&te[d.split(":")[0]];t?de(e,t,d,c):ae(e,Z[d]||d,c)}else e.className=c;o[d]=c}}var a}(e,t,r,!0,n))),n}function me(e,t,n,r,o){for(;"function"==typeof n;)n=n();if(t===n)return n;const i=typeof t,l=void 0!==r;if(e=l&&n[0]&&n[0].parentNode||e,"string"===i||"number"===i)if("number"===i&&(t=t.toString()),l){let o=n[0];o&&3===o.nodeType?o.data=t:o=document.createTextNode(t),n=we(e,n,r,o)}else n=""!==n&&"string"==typeof n?e.firstChild.data=t:e.textContent=t;else if(null==t||"boolean"===i)n=we(e,n,r);else{if("function"===i)return h((()=>{let o=t();for(;"function"==typeof o;)o=o();n=me(e,o,n,r)})),()=>n;if(Array.isArray(t)){const i=[];if(be(i,t,o))return h((()=>n=me(e,i,n,r,!0))),()=>n;if(0===i.length){if(n=we(e,n,r),l)return n}else Array.isArray(n)?0===n.length?ye(e,i,r):re(e,n,i):null==n||""===n?ye(e,i):re(e,l&&n||[e.firstChild],i);n=i}else if(t instanceof Node){if(Array.isArray(n)){if(l)return n=we(e,n,r,t);we(e,n,null,t)}else null!=n&&""!==n&&e.firstChild?e.replaceChild(t,e.firstChild):e.appendChild(t);n=t}}return n}function be(e,t,n){let r=!1;for(let o=0,i=t.length;o<i;o++){let i,l=t[o];if(l instanceof Node)e.push(l);else if(null==l||!0===l||!1===l);else if(Array.isArray(l))r=be(e,l)||r;else if("string"==(i=typeof l))e.push(document.createTextNode(l));else if("function"===i)if(n){for(;"function"==typeof l;)l=l();r=be(e,Array.isArray(l)?l:[l])||r}else e.push(l),r=!0;else e.push(document.createTextNode(l.toString()))}return r}function ye(e,t,n){for(let r=0,o=t.length;r<o;r++)e.insertBefore(t[r],n)}function we(e,t,n,r){if(void 0===n)return e.textContent="";const o=r||document.createTextNode("");if(t.length){let r=!1;for(let i=t.length-1;i>=0;i--){const l=t[i];if(o!==l){const t=l.parentNode===e;r||i?t&&e.removeChild(l):t?e.replaceChild(o,l):e.insertBefore(o,n)}else r=!0}}else e.insertBefore(o,n);return[o]}const xe=Symbol("store-raw"),ke=Symbol("store-node"),Se=Symbol("store-name");function Ce(t,n){let r=t[e];if(!r){Object.defineProperty(t,e,{value:r=new Proxy(t,qe)});const n=Object.keys(t),o=Object.getOwnPropertyDescriptors(t);for(let e=0,i=n.length;e<i;e++){const i=n[e];if(o[i].get){const e=o[i].get.bind(r);Object.defineProperty(t,i,{get:e})}}}return r}function Pe(e){return null!=e&&"object"==typeof e&&(!e.__proto__||e.__proto__===Object.prototype||Array.isArray(e))}function je(e,t=new Set){let n,r,o,i;if(n=null!=e&&e[xe])return n;if(!Pe(e)||t.has(e))return e;if(Array.isArray(e)){Object.isFrozen(e)?e=e.slice(0):t.add(e);for(let n=0,i=e.length;n<i;n++)o=e[n],(r=je(o,t))!==o&&(e[n]=r)}else{Object.isFrozen(e)?e=Object.assign({},e):t.add(e);const n=Object.keys(e),l=Object.getOwnPropertyDescriptors(e);for(let s=0,a=n.length;s<a;s++)i=n[s],l[i].get||(o=e[i],(r=je(o,t))!==o&&(e[i]=r))}return e}function Ae(e){let t=e[ke];return t||Object.defineProperty(e,ke,{value:t={}}),t}function Me(){const[e,t]=g(void 0,{equals:!1});return e.$=t,e}const qe={get(t,n,r){if(n===xe)return t;if(n===e)return r;const o=t[n];if(n===ke||"__proto__"===n)return o;const i=Pe(o);if(w()&&("function"!=typeof o||t.hasOwnProperty(n))){let e,r;i&&(e=Ae(o))&&(r=e._||(e._=Me()),r()),e=Ae(t),r=e[n]||(e[n]=Me()),r()}return i?Ce(o):o},set:()=>!0,deleteProperty:()=>!0,ownKeys:function(e){if(w()){const t=Ae(e);(t._||(t._=Me()))()}return Reflect.ownKeys(e)},getOwnPropertyDescriptor:function(t,n){const r=Reflect.getOwnPropertyDescriptor(t,n);return!r||r.get||n===e||n===ke||n===Se||(delete r.value,delete r.writable,r.get=()=>t[e][n]),r}};function _e(e,t,n){if(e[t]===n)return;const r=Array.isArray(e),o=e.length,i=void 0===n,l=r||i===t in e;i?delete e[t]:e[t]=n;let s,a=Ae(e);(s=a[t])&&s.$(),r&&e.length!==o&&(s=a.length)&&s.$(s,void 0),l&&(s=a._)&&s.$(s,void 0)}function Ne(e,t,n=[]){let r,o=e;if(t.length>1){r=t.shift();const i=typeof r,l=Array.isArray(e);if(Array.isArray(r)){for(let o=0;o<r.length;o++)Ne(e,[r[o]].concat(t),[r[o]].concat(n));return}if(l&&"function"===i){for(let o=0;o<e.length;o++)r(e[o],o)&&Ne(e,[o].concat(t),[o].concat(n));return}if(l&&"object"===i){const{from:o=0,to:i=e.length-1,by:l=1}=r;for(let r=o;r<=i;r+=l)Ne(e,[r].concat(t),[r].concat(n));return}if(t.length>1)return void Ne(e[r],t,[r].concat(n));o=e[r],n=[r].concat(n)}let i=t[0];"function"==typeof i&&(i=i(o,n),i===o)||void 0===r&&null==i||(i=je(i),void 0===r||Pe(o)&&Pe(i)&&!Array.isArray(i)?function(e,t){const n=Object.keys(t);for(let r=0;r<n.length;r+=1){const o=n[r];_e(e,o,t[o])}}(o,i):_e(e,r,i))}function Te(e,t){const n=je(e||{});return[Ce(n),function(...e){m((()=>Ne(n,e)))}]}const Ee=x([{path:"start"},{}]);function De(e){const t=location.hash.replace(/#/,"")||"start",[n,r]=Te({path:t});window.addEventListener("popstate",(e=>{const t=e.target.location.hash.replace(/#/,"");r({...n,path:t})}));const o=[n,{apiUrl:e.values.api}];return I(Ee.Provider,{value:o,get children(){return e.children}})}let Re={data:""},$e=e=>"object"==typeof window?((e?e.querySelector("#_goober"):window._goober)||Object.assign((e||document.head).appendChild(document.createElement("style")),{innerHTML:" ",id:"_goober"})).firstChild:e||Re,Le=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(})/g,ze=/\/\*[^]*?\*\/|\s\s+|\n/g,Be=(e,t)=>{let n,r="",o="",i="";for(let l in e){let s=e[l];"object"==typeof s?(n=t?t.replace(/([^,])+/g,(e=>l.replace(/([^,])+/g,(t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)))):l,o+="@"==l[0]?"f"==l[1]?Be(s,l):l+"{"+Be(s,"k"==l[1]?"":t)+"}":Be(s,n)):"@"==l[0]&&"i"==l[1]?r=l+" "+s+";":(l=l.replace(/[A-Z]/g,"-$&").toLowerCase(),i+=Be.p?Be.p(l,s):l+":"+s+";")}return i[0]?(n=t?t+"{"+i+"}":i,r+n+o):r+o},Oe={},He=e=>{let t="";for(let n in e)t+=n+("object"==typeof e[n]?He(e[n]):e[n]);return t},Ue=(e,t,n,r,o)=>{let i="object"==typeof e?He(e):e,l=Oe[i]||(Oe[i]=(e=>{let t=0,n=11;for(;t<e.length;)n=101*n+e.charCodeAt(t++)>>>0;return"go"+n})(i));if(!Oe[l]){let t="object"==typeof e?e:(e=>{let t,n=[{}];for(;t=Le.exec(e.replace(ze,""));)t[4]&&n.shift(),t[3]?n.unshift(n[0][t[3]]=n[0][t[3]]||{}):t[4]||(n[0][t[1]]=t[2]);return n[0]})(e);Oe[l]=Be(o?{["@keyframes "+l]:t}:t,n?"":"."+l)}return((e,t,n)=>{-1==t.data.indexOf(e)&&(t.data=n?e+t.data:t.data+e)})(Oe[l],t,r),l},Ie=(e,t,n)=>e.reduce(((e,r,o)=>{let i=t[o];if(i&&i.call){let e=i(n),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;i=t?"."+t:e&&"object"==typeof e?e.props?"":Be(e,""):e}return e+r+(null==i?"":i)}),"");function Fe(e){let t=this||{},n=e.call?e(t.p):e;return Ue(n.unshift?n.raw?Ie(n,[].slice.call(arguments,1),t.p):n.reduce(((e,n)=>n?Object.assign(e,n.call?n(t.p):n):e),{}):n,$e(t.target),t.g,t.o,t.k)}Fe.bind({g:1});let Ke=Fe.bind({k:1});const Ye=x();function Je(e){let t=this||{};return(...n)=>{const r=r=>{const o=Y(r,{theme:k(Ye)}),i=Y(o,{get className(){const e=o.className,r="className"in o&&/^go[0-9]+/.test(e);return[e,Fe.apply({target:t.target,o:r,p:o,g:t.g},n)].filter(Boolean).join(" ")}}),[l,s]=function(e,...t){const n=new Set(t.flat()),r=Object.getOwnPropertyDescriptors(e),o=t.map((t=>{const n={};for(let o=0;o<t.length;o++){const i=t[o];Object.defineProperty(n,i,r[i]?r[i]:{get:()=>e[i]})}return n}));return o.push(new Proxy({get:t=>n.has(t)?void 0:e[t],has:t=>!n.has(t)&&t in e,keys:()=>Object.keys(e).filter((e=>!n.has(e)))},K)),o}(i,["as"]),a=l.as||e;let d;var c,u,p,g;return"function"==typeof a?d=a(s):(d=document.createElement(a),c=d,"function"==typeof(u=s)?h((e=>ve(c,u(),e,p,g))):ve(c,u,void 0,p,g)),d};return r.className=e=>b((()=>Fe.apply({target:t.target,p:e,g:t.g},n))),r}}const Qe=Je("nav")`
    color: black;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 2rem;
`,Ve=Je("a")`
    font-size: 14px;
    display: block;
    padding: 0 1rem;
`,We=()=>(k(Ee),I(Qe,{get children(){return[I(Ve,{href:"#start",children:"Start"}),I(Ve,{href:"#sync-check",children:"Sync Check"}),I(Ve,{href:"#sync-draft",children:"Sync Draft"}),I(Ve,{href:"#sync-live",children:"Sync Live"})]}})),Xe=async(e,t={})=>new Promise(((n,r)=>{jQuery.ajax({url:"/wp-admin/admin-ajax.php",type:"post",dataType:"json",data:{action:e,...t},success:function(e){n(e)},error:(e,t)=>{r(t)}})})),Ge=async(e,t)=>new Promise(((n,r)=>{jQuery.ajax({url:e,type:t?"post":"get",dataType:"json",data:t,success:function(e){n(e)},error:(e,t)=>{r(e.responseJSON||t)}})})),Ze=Je("div")`
    background-color: white;
    padding: 1.0rem 2rem 2rem;
    border: 3px solid #ccc;
    border-radius: 3px;
    min-height: 50vh;
`,et=e=>I(Ze,{get children(){return e.children}}),tt=Je("div")`
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
`,at=e=>I(tt,{get children(){return[I(nt,{get children(){return[I(lt,{get children(){return e.title}}),I(ot,{get children(){return e.description}})]}}),I(rt,{get children(){return e.actions}})]}});Je("svg")`
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
`;const dt=le('<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="200px" height="200px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid"><circle cx="50" cy="50" r="32" stroke-width="8" stroke-dasharray="50.26548245743669 50.26548245743669" fill="none" stroke-linecap="round"><animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="2.0408163265306123s" keyTimes="0;1" values="0 50 50;360 50 50"></animateTransform></circle></svg>'),ct={small:"20px",medium:"30px",large:"50px",xlarge:"100px"},ut=({size:e="large",inverted:t=!1})=>{let n={display:"block","shape-rendering":"auto",width:ct[e],height:ct[e],stroke:"#006ba1"};return t&&(n.stroke="#fff"),(()=>{const e=dt.cloneNode(!0);return pe(e,n),e})()},pt=Je("button")`
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
`,ht=e=>I(pt,Y(e,{get children(){return[ne((()=>e.children)),I(Q,{get when(){return e.loading},get children(){return I(gt,{get children(){return I(ut,{size:"small",get inverted(){return!e.disabled}})}})}})]}})),ft=Je("div")`
    display: flex;
    margin-bottom: 2px;
`,vt=Je("div")`
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
`,mt=Je("div")`
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
`,wt=le('<svg height="10" width="10"><circle cx="5" cy="5" r="5" stroke-width="0"></circle></svg>'),xt=({showCheckButton:e,showSyncButton:t,showDraft:n,showLive:r,item:o,onClick:i,onTypeClick:l,getAllTargetsContent:s})=>{const a=(e,t)=>{let n="#bbbbbb";return"error"===t?n="#da694b":""===t?n="#bbbbbb":e&&(n=e.synced?"#99da4b":"#e9da4e"),n},d=async()=>{console.log("Item: ",o);try{const e=await s();console.log(e)}catch(e){console.log("Error logging diff: ",e)}};return I(ft,{get children(){return[I(Q,{when:n,get children(){return I(yt,{get color(){var e,t;return a(null===(e=o.status)||void 0===e?void 0:e.draft,null===(t=o.status)||void 0===t?void 0:t.state)},get children(){return wt.cloneNode(!0)}})}}),I(Q,{when:r,get children(){return I(yt,{get color(){var e,t;return a(null===(e=o.status)||void 0===e?void 0:e.live,null===(t=o.status)||void 0===t?void 0:t.state)},get children(){return wt.cloneNode(!0)}})}}),I(Q,{when:t,get children(){return I(mt,{onClick:i,children:"sync"})}}),I(Q,{when:e,get children(){return I(mt,{onClick:i,children:"check"})}}),I(Q,{when:e,get children(){return I(mt,{onClick:d,children:"log"})}}),I(vt,{onClick:l,get children(){return o.type}}),I(bt,{target:"_new",get href(){return o.permalink},get children(){return o.permalink||"/"}})]}})},kt=({type:e})=>{const[t,{apiUrl:n}]=k(Ee),[r,o]=Te({list:[]}),[i,l]=g(!1);f((async()=>{const e=(await Xe("get_all_resources")).list.map(((e,t)=>({...e,index:t})));o({list:e})}));const s=async t=>{try{(await Ge(`${n}/sync.php`,{action:"sync",permalink:t.permalink,release:e,sync_check:!1})).data?o("list",t.index,"status",{[e]:{synced:!0},state:"loaded"}):o("list",t.index,"status",{state:"error"})}catch(e){o("list",t.index,"status",{state:"error"})}},a="draft"===e?"Begin to sync to Draft":"Publish everything to Live",d="draft"===e?"Sync Draft":"Sync Live",c="draft"===e?"This is where you can make sure that wordpress and the draft content is in sync":"This is where you can make sure that Draft and Live are in sync";return I(et,{get children(){return[I(at,{title:d,description:c,get actions(){return I(ht,{get loading(){return i()},onClick:()=>(async()=>{if(i())return;let t=!1;if(("live"===e&&confirm("Do you really which to publish everything?")||"draft"===e)&&(t=!0),t){l(!0),r.list.forEach(((e,t)=>{o("list",t,"status",{state:""}),t++}));for await(let e of r.list)await s(e);l(!1)}})(),children:a})}}),I(J,{get each(){return r.list},children:t=>I(xt,{showDraft:"draft"===e,showLive:"live"===e,showSyncButton:!0,onClick:()=>(async e=>{l(!0),await s(e),l(!1)})(t),onTypeClick:()=>(async e=>{l(!0);const t=r.list.filter((t=>t.type===e));t.forEach(((e,t)=>{o("list",t,"status",{state:""}),t++}));for await(let e of t)await s(e);l(!1)})(t.type),item:t,get permalink(){return t.permalink}})})]}})},St=()=>{const[e,{apiUrl:t}]=k(Ee),[n,r]=Te({list:[]}),[o,i]=g(!1);console.log(t),f((async()=>{const e=(await Xe("get_all_resources")).list.map(((e,t)=>({...e,index:t})));r({list:e})}));const l=async e=>{try{const n=await Ge(`${t}/check-sync.php`,{permalink:e.permalink});r("list",e.index,"status",{draft:n.data.resourceStatus.find((e=>"draft"===e.target&&"__original"===e.comparedTo)),live:n.data.resourceStatus.find((e=>"live"===e.target&&"draft"===e.comparedTo)),state:"loaded"})}catch(t){r("list",e.index,"status",{state:"error"})}};return I(et,{get children(){return[I(at,{title:"Sync Check",description:"This is where you can check if all content is in sync",get actions(){return I(ht,{get loading(){return o()},onClick:()=>(async()=>{if(!o()){i(!0),n.list.forEach(((e,t)=>{r("list",t,"status",{state:""}),t++}));for await(let e of n.list)await l(e);i(!1)}})(),children:"Begin to check"})}}),I(J,{get each(){return n.list},children:e=>I(xt,{showDraft:!0,showLive:!0,showCheckButton:!0,item:e,getAllTargetsContent:()=>(async e=>await Ge(`${t}/get-all-targets-content.php`,{permalink:e}))(e.permalink),get permalink(){return e.permalink},onClick:()=>(async e=>{i(!0),await l(e),i(!1)})(e),onTypeClick:()=>(async e=>{i(!0);const t=n.list.filter((t=>t.type===e));t.forEach(((e,t)=>{r("list",t,"status",{state:""}),t++}));for await(let e of t)await l(e);i(!1)})(e.type)})})]}})},Ct=Je("p")`
    font-size: 14px;
    padding-bottom: .5rem;
    background-color: #ffeaee;
    border: 2px solid #ffc0cb;
    border-radius: 3px;
    padding: 1rem 2rem;
    text-align: center;
`,Pt=()=>I(et,{get children(){return[I(at,{title:"Start",description:"This plugin lets you control and debug content through the content service."}),I(Ct,{children:"This is mainly used while developing or by admins!"})]}}),jt=Je("div")`
     color: black;
     max-width: 1200px;
     margin: 0 auto;
`;Je("div")`
`,Je("div")`
    font-size: 1rem;
    padding: 1rem 0;
`;const At=()=>{const[e]=k(Ee);return I(jt,{get children(){return[I(it,{children:"Content Dashboard"}),I(We,{}),I(Q,{get when(){return"start"===e.path},get children(){return I(Pt,{})}}),I(Q,{get when(){return"sync-check"===e.path},get children(){return I(St,{})}}),I(Q,{get when(){return"sync-draft"===e.path},get children(){return I(kt,{type:"draft"})}}),I(Q,{get when(){return"sync-live"===e.path},get children(){return I(kt,{type:"live"})}})]}})},Mt=Je("div")`

    padding-top: 6px;
    box-sizing: border-box !important;

    ${e=>e.horizontal?"\n        display: flex;   \n        align-items: center;\n        border-bottom: 1px dotted grey;\n        padding: 0 10px 8px 10px;\n        margin-left: -10px;\n        margin-right: -10px;\n        justify-content: flex-end;\n    ":""} 

    ${e=>e.box?"\n        position: relative;\n        min-width: 255px;\n        border: 1px solid #ccd0d4;\n        box-shadow: 0 1px 1px rgb(0 0 0 / 4%);\n        background: #fff;\n        padding: 1rem;\n        box-sizing: border-box;\n        margin-bottom: 7px;\n    ":""}

`,qt=Je("div")`
    color: red;
    padding-top: 0.4rem;
`,_t=Je("div")`
    color: darkgray;
    padding-top: 0.4rem;
`,Nt=Je("div")`
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

`,Tt=Je("div")`
    text-align: center;
    min-width: 100px;
    ${e=>e.horizontal?"\n        margin-top: 10px;\n    ":""}

`,[Et,Dt]=Te({options:{},setChecking:()=>!0,syncStatus:{},publish:()=>null,changesNotSavedToDraft:!1,showRejectionControls:!1,rejectionReason:"",approvalStatus:"",errorMessage:"",approvedBy:""}),Rt=e=>{Dt({approvalStatus:e})},$t=()=>{Dt((e=>({showRejectionControls:!e.showRejectionControls})))},Lt=async(e="")=>{Et.setChecking(!0);const t=await(async e=>{try{var t;return await Ge(`${Et.options.api}/upsert-publication-request.php`,{permalink:Et.options.permalink,status:e,editorUrl:null===(t=window)||void 0===t?void 0:t.location.href,approvedBy:"approved"===e||"approvedAndPublished"===e?Et.options.userName:"",rejectedBy:"rejected"===e?Et.options.userName:"",requestedBy:"pending"===e?Et.options.userName:Et.requestedBy,rejectionReason:Et.rejectionReason}),{}}catch(e){return console.log("Error upserting publication request",e),{err:e}}})(e);t.err?(Dt({errorMessage:"Error changing status to "+e}),console.log("Err upserting request",t.err)):Rt(e),Et.setChecking(!1),zt()},zt=async()=>{const{postTitle:e,rejectionReason:t,approvalStatus:n,editorEmail:r}=Et,{userName:o,siteTitle:i}=Et.options;try{var l;await Ge(`${Et.options.api}/send-publication-approval-email.php`,{data:{useCustomMailSystem:Et.options.useCustomSmtp,postTitle:e,rejectionReason:t,approvalStatus:n,admin:o,editorEmail:r,siteTitle:i,postUrl:null===(l=window)||void 0===l?void 0:l.location.href}})}catch(e){console.log("Error sending email")}},Bt=async()=>{Et.setChecking(!0);const e=await(async()=>{console.log("Deleting pub request for "+Et.options.permalink+": ",Et);try{var e,t;const o=await Ge(`${Et.options.api}/delete-publication-request.php`,{postId:Et.options.postId});var n,r;return null!=o&&null!==(e=o.data)&&void 0!==e&&null!==(t=e.deleteResource)&&void 0!==t&&t.success||console.log("Unable to delete publication request because: ",null==o||null===(n=o.errors)||void 0===n||null===(r=n[0])||void 0===r?void 0:r.message),{}}catch(e){return console.log("Error deleting request",e),{err:e}}})();e.err?(Dt({errorMessage:"Something went wrong withdrawing publication request"}),console.log("Err deleting request",e.err)):Rt(""),Et.setChecking(!1)},Ot=le("<em></em>"),Ht=Je("div")`
    padding: 0.25rem;
    background: #fefbe6;
`,Ut=()=>I(V,{get children(){return[I(W,{get when(){return"pending"===Et.approvalStatus},get children(){return I(Tt,{get horizontal(){return Et.options.metaMenu},children:"Pending approval"})}}),I(W,{get when(){return"approved"===Et.approvalStatus},get children(){return I(Tt,{get horizontal(){return Et.options.metaMenu},get children(){return["Publication approved ",ne((()=>Et.approvedBy?" by "+Et.approvedBy:""))]}})}}),I(W,{get when(){return"rejected"===Et.approvalStatus},get children(){return[I(Tt,{get horizontal(){return Et.options.metaMenu},get children(){return["Publication rejected ",ne((()=>Et.rejectedBy?" by "+Et.rejectedBy:""))]}}),I(Q,{get when(){return Et.rejectionReason},get children(){return I(Ht,{get children(){const e=Ot.cloneNode(!0);return ge(e,(()=>Et.rejectionReason)),e}})}})]}})]}}),It=()=>I(ht,{get leftMargin(){return Et.options.metaMenu},get loading(){return Et.publishing},onClick:e=>Et.publish(e),get disabled(){return Et.changesNotSavedToDraft},get children(){var e,t,n;return Et.changesNotSavedToDraft?null!==(e=Et.syncStatus.live)&&void 0!==e&&e.exists?"Save draft before updating on live":"Save draft before publishing to live":null!==(t=Et.syncStatus.live)&&void 0!==t&&t.exists?null!==(n=Et.syncStatus.live)&&void 0!==n&&n.synced?"Updated on live site":"Update on live site":"Publish to live site"}}),Ft=le('<div><h4>Rejection reason</h4><textarea rows="4" placeholder="Message to the editor" maxlength="200"></textarea><div></div></div>'),Kt=()=>[I(ht,{get leftMargin(){return Et.options.metaMenu},onClick:e=>Lt("approved"),get disabled(){return Et.showRejectionControls},children:"Approve"}),I(Q,{get when(){return!Et.showRejectionControls},get children(){return I(ht,{get leftMargin(){return Et.options.metaMenu},onClick:e=>{$t()},get disabled(){return Et.showRejectionControls},children:"Reject"})}}),I(Q,{get when(){return Et.showRejectionControls},get children(){const e=Ft.cloneNode(!0),t=e.firstChild,n=t.nextSibling,r=n.nextSibling;return e.style.setProperty("margin-block","1.5rem"),t.style.setProperty("margin-bottom",0),n.addEventListener("change",(e=>{var t;t=e.target.value,Dt({rejectionReason:t})})),n.style.setProperty("width","100%"),n.style.setProperty("margin-top","0.5rem"),r.style.setProperty("display","flex"),ge(r,I(ht,{get leftMargin(){return Et.options.metaMenu},onClick:e=>$t(),disabled:!1,style:{"margin-top":0,"margin-right":"0.2rem"},children:"Cancel"}),null),ge(r,I(ht,{get leftMargin(){return Et.options.metaMenu},onClick:e=>Lt("rejected"),disabled:!1,style:{"margin-top":0},children:"Send rejection"}),null),e}}),I(Q,{get when(){return!Et.showRejectionControls},get children(){return I(It,{})}})],Yt=le("<div><h5>Dev mode</h5></div>"),Jt=()=>(()=>{const e=Yt.cloneNode(!0);return e.firstChild,e.style.setProperty("background","lightgray"),e.style.setProperty("padding","0.5rem"),ge(e,I(ht,{get leftMargin(){return Et.options.metaMenu},onClick:e=>Lt("approved"),disabled:!1,children:"Approve"}),null),ge(e,I(ht,{get leftMargin(){return Et.options.metaMenu},onClick:e=>Lt("rejected"),disabled:!1,children:"Reject"}),null),ge(e,I(ht,{get leftMargin(){return Et.options.metaMenu},onClick:e=>Lt("pending"),get disabled(){return Et.changesNotSavedToDraft},children:"Set to pending"}),null),e})(),Qt=()=>[I(Q,{get when(){return""===Et.approvalStatus},get children(){return[I(Q,{get when(){return Et.options.userHasPublicationRights},get children(){return I(It,{})}}),I(Q,{get when(){return!Et.options.userHasPublicationRights},get children(){return I(ht,{get leftMargin(){return Et.options.metaMenu},onClick:e=>Lt("pending"),get disabled(){return Et.changesNotSavedToDraft},get children(){return Et.changesNotSavedToDraft?"Save draft before publishing request":"Request approval to publish"}})}})]}}),I(Q,{when:false,get children(){return I(Jt,{})}}),I(Q,{get when(){return"pending"===Et.approvalStatus},get children(){return[I(Q,{get when(){return Et.options.userHasPublicationRights},get children(){return I(Kt,{})}}),I(Q,{get when(){return!Et.options.userHasPublicationRights},get children(){return I(ht,{get leftMargin(){return Et.options.metaMenu},onClick:e=>Bt(),disabled:!1,children:"Withdraw publication request"})}})]}}),I(Q,{get when(){return"approved"===Et.approvalStatus},get children(){return[I(Q,{get when(){return Et.options.userHasPublicationRights},get children(){return I(It,{})}}),I(Q,{get when(){return!Et.options.userHasPublicationRights},get children(){return I(ht,{get leftMargin(){return Et.options.metaMenu},get loading(){return Et.publishing},onClick:e=>Et.publish(e),get disabled(){return Et.changesNotSavedToDraft},get children(){return Et.changesNotSavedToDraft?"Discard unapproved changes to publish":"Publish to live site"}})}})]}}),I(Q,{get when(){return"rejected"===Et.approvalStatus},get children(){return I(Q,{get when(){return Et.options.userHasPublicationRights},get children(){return I(It,{})}})}})],Vt=()=>I(Q,{get when(){return"pending"===Et.approvalStatus&&Et.changesNotSavedToDraft},get children(){return I(_t,{children:"Saving a new draft will automatically withdraw the pending publication approval"})}}),Wt=()=>[I(Q,{get when(){return""===Et.approvalStatus},get children(){return[I(Q,{get when(){return Et.options.userHasPublicationRights},get children(){return I(ht,{get leftMargin(){return Et.options.metaMenu},get loading(){return Et.publishing},onClick:e=>Et.publish(e),get disabled(){var e;return(null===(e=Et.syncStatus.live)||void 0===e?void 0:e.synced)||Et.changesNotSavedToDraft},get children(){var e;return Et.changesNotSavedToDraft?"Save draft before updating on live":null!==(e=Et.syncStatus.live)&&void 0!==e&&e.synced?"Updated on live site":"Update on live site"}})}}),I(Q,{get when(){return!Et.options.userHasPublicationRights},get children(){return I(ht,{get leftMargin(){return Et.options.metaMenu},get loading(){return Et.publishing},onClick:e=>Lt("pending"),get disabled(){var e;return(null===(e=Et.syncStatus.live)||void 0===e?void 0:e.synced)||Et.changesNotSavedToDraft},get children(){var e;return Et.changesNotSavedToDraft?"Save draft before requesting publication approval":null!==(e=Et.syncStatus.live)&&void 0!==e&&e.synced?"Updated on live site":"Request approval to publish"}})}})]}}),I(Q,{get when(){return"pending"===Et.approvalStatus},get children(){return[I(Q,{get when(){return Et.options.userHasPublicationRights},get children(){return I(Kt,{})}}),I(Q,{get when(){return!Et.options.userHasPublicationRights},get children(){return I(ht,{get leftMargin(){return Et.options.metaMenu},onClick:e=>Bt(),disabled:!1,children:"Withdraw publication request"})}})]}}),I(Q,{get when(){return"approved"===Et.approvalStatus},get children(){return[I(Q,{get when(){return Et.options.userHasPublicationRights},get children(){return I(ht,{get leftMargin(){return Et.options.metaMenu},get loading(){return Et.publishing},onClick:e=>Et.publish(e),get disabled(){var e;return(null===(e=Et.syncStatus.live)||void 0===e?void 0:e.synced)||Et.changesNotSavedToDraft},get children(){var e;return Et.changesNotSavedToDraft?"Save draft before publishing to live":null!==(e=Et.syncStatus.live)&&void 0!==e&&e.synced?"Updated on live site":"Update on live site"}})}}),I(Q,{get when(){return!Et.options.userHasPublicationRights},get children(){return I(ht,{get leftMargin(){return Et.options.metaMenu},get loading(){return Et.publishing},onClick:e=>Et.publish(e),get disabled(){var e;return(null===(e=Et.syncStatus.live)||void 0===e?void 0:e.synced)||Et.changesNotSavedToDraft},get children(){var e;return Et.changesNotSavedToDraft?"Save to draft or discard unapproved changes to publish":null!==(e=Et.syncStatus.live)&&void 0!==e&&e.synced?"Updated on live site":"Update on live site"}})}})]}}),I(Q,{get when(){return"rejected"===Et.approvalStatus},get children(){return I(Q,{get when(){return!Et.options.userHasPublicationRights},get children(){return I(ht,{get leftMargin(){return Et.options.metaMenu},onClick:e=>null,disabled:!0,get children(){return Et.changesNotSavedToDraft?"Save draft before requesting publication approval":"Make changes before requesting approval to publish"}})}})}})],Xt=({options:e})=>{const[t,n]=Te({}),[r,o]=g(!0),[i,l]=g(!1),[s,a]=g(!1),[d,c]=g(!1),[u,p]=g(!1),[h,v]=g(!1),[m,b]=g(!1),[w,x]=g(!1),[k,S]=g(!1),[C,P]=g(null);let j,A,M={permalink:e.permalink};const q=!e.metaMenu&&!e.optionsMeta;y((()=>{if(!q)return;e.requireApproval&&Dt({options:e,setChecking:o,syncStatus:t,publish:e=>z(e)});setTimeout((()=>{const e="_new",t=document.createElement("a");t.classList.add("components-button"),t.classList.add("is-secondary"),"auto-draft"===wp.data.select("core/editor").getCurrentPost().status&&(t.style.display="none"),t.innerHTML="Preview",P(t),document.querySelector(".edit-post-header__settings").prepend(t),t.addEventListener("click",(function(t){const n=wp.data.select("core/editor").getEditedPostPreviewLink();wp.data.select("core/editor").isEditedPostDirty()?(t.preventDefault(),t.stopPropagation(),wp.data.dispatch("core/editor").savePost({isPreview:!0}).then((()=>{window.open(n,e)}))):window.open(n,e)}))}),700)})),f((()=>{var t,n;e.metaMenu?(A=document.querySelector("#save_menu_footer"),E()):null!==(t=wp)&&void 0!==t&&null!==(n=t.data)&&void 0!==n&&n.select&&(j=wp.data.select("core/editor"),wp.domReady(N))})),f((()=>{wp&&wp.hooks&&wp.hooks.addAction&&(R(),wp.hooks.addAction("dls.post-saved","dls",(()=>{var e,n,r;if(null!=t&&null!==(e=t.draft)&&void 0!==e&&e.exists||null===(n=j)||void 0===n||!n.isPublishingPost())null!=t&&null!==(r=t.draft)&&void 0!==r&&r.exists&&(N(),R());else{let e=0;const t=()=>{const e=j.getPermalink(),t=/http(s|):\/\/(.*?)(\/[\w\/-]*)\//gm.exec(e);return t?t[3]:""},n=()=>{if("auto-draft"!==j.getCurrentPost().status)return M={permalink:t()},p(!1),S(!1),R(),void(C().style.display="flex");e++<=50&&setTimeout(n,100)};n()}})))})),f((()=>{let e;document.addEventListener("cerberusListenerEvent",(t=>{var n;null!=t&&null!==(n=t.detail)&&void 0!==n&&n.hasChange&&(e||(e=document.querySelector(".editor-post-publish-button"),e.addEventListener("click",(()=>{b(!1),e.setAttribute("disabled",!0),window.onbeforeunload=null}))),e&&(b(!0),e.removeAttribute("disabled"),window.onbeforeunload=()=>!0))}))}));const N=()=>{let e;const t=wp.data.subscribe(_.debounce((()=>{e||(e=document.querySelector(".editor-post-publish-button"));const n=j.isEditedPostDirty(),r=j.hasNonPostEntityChanges(),o=m();r||n||o?(p(!0),e&&e.addEventListener("click",T),e&&e.removeAttribute("disabled"),t()):(p(!1),e&&e.removeEventListener("click",T),e&&e.setAttribute("disabled",!0))}),100))},T=()=>{""!==Et.approvalStatus&&q&&e.requireApproval&&Et.options.requireApproval&&Bt()},E=()=>{let e,t=!1;A.setAttribute("disabled",!0);let n=()=>{t||clearInterval(e)},r=()=>{t||(e=o())};const o=()=>setInterval((()=>{var o,i;null!==(o=window)&&void 0!==o&&null!==(i=o.wpNavMenu)&&void 0!==i&&i.menusChanged&&(t=!0,D(),clearInterval(e),window.removeEventListener("blur",n),window.removeEventListener("focus",r))}),500);e=o(),window.addEventListener("blur",n),window.addEventListener("focus",r)},D=()=>{A.removeAttribute("disabled"),v(!0)},R=async(r=!0)=>{r&&(o(!0),await new Promise((e=>setTimeout(e,1e3))));try{var i;const r=await Xe("check_sync",{...M,api_path:M.permalink});if(null==r||null===(i=r.data)||void 0===i||!i.resourceStatus)throw M;n({draft:r.data.resourceStatus.find((e=>"draft"===e.target&&"__original"===e.comparedTo)),live:r.data.resourceStatus.find((e=>"live"===e.target&&"draft"===e.comparedTo)),state:"loaded"}),console.log("status: ",t),S(!1),q&&e.requireApproval&&(async()=>{try{var e;const t=await Ge(`${Et.options.api}/get-publication-request.php`,{postId:Et.options.postId});if(null!==(e=t.data.resource)&&void 0!==e&&e.content){const e=t.data.resource.content;Dt({approvalStatus:e.status,approvedBy:e.approvedBy,rejectedBy:e.rejectedBy,rejectionReason:e.rejectionReason||"",requestedBy:e.requestedBy,editorEmail:e.from_user_email,postTitle:e.post_title,siteTitle:e.from_site_name}),console.log(`Publication request for ${Et.options.permalink}: `,Et)}else console.log("No publication request found for:",Et.options.permalink),Rt("")}catch(e){console.log("Error fetching publication request",e)}})(),e.metaMenu&&$()}catch(e){console.log("--- meta-box --- Can't find any data with check-sync of payload: ",e),S(!0),o(!1),n({state:"error"})}o(!1)},$=async()=>{var e;const n=document.querySelectorAll(".menu-theme-locations > .menu-settings-input"),r=document.querySelector(".menu-settings-group.menu-theme-locations"),o=document.createElement("i");o.classList.add("changes-disabled-message");const i=null===(e=t.draft)||void 0===e?void 0:e.exists,l=t.live&&t.live.exists;!i||l?(r.style.pointerEvents="none",r.style.cursor="not-allowed",r.style.opacity=.5):(r.style.pointerEvents="auto",r.style.cursor="default",r.style.opacity=1);const s=document.querySelector(".changes-disabled-message");if(l){const e="Menu must be unpublished before toggling location";s?s.innerHTML=e:(o.innerHTML=e,r.prepend(o))}else{const e="Menu must be created before toggling location";i?s&&s.parentNode.removeChild(s):s?s.innerHTML=e:(o.innerHTML=e,r.prepend(o))}let a=!1,d=!1;for(let e of n){const t=e.querySelector("input");t.addEventListener("change",(()=>{c(!0),D()}));e.querySelector(".theme-location-set")&&(t.setAttribute("disabled",!0),e.style.pointerEvents="none",e.style.opacity=.5,d=!0),t.getAttribute("checked")&&(a=!0)}if(d&&!l&&i){const e=document.querySelector(".changes-disabled-message"),t="Some locations cannot be set because they are already set";e?e.innerHTML=t:(o.innerHTML=t,r.prepend(o))}if(location.search.includes("menu=0"))return;x(!0);const u=document.querySelector(".submitdelete.deletion.menu-delete");let p=document.querySelector(".delete-link-replacement");a||l?(u.style.display="none",p?p.style.display="inline":(p=document.createElement("span"),p.classList.add("delete-link-replacement"),p.innerHTML="To delete a menu it must be unpublished (and unregisterered from all display locations)",p.style.color="#a7aaad",p.style.fontSize="12px"),u.parentNode.prepend(p)):(u.style.display="inline",p&&(p.style.display="none"))},L=(e={})=>{if(document){const t=new CustomEvent("cerberusChangeEvent",{detail:e});document.dispatchEvent(t)}},z=async t=>{t.preventDefault(),t.stopPropagation(),l(!0),!0!==e.requireApproval||"pending"!==(null==Et?void 0:Et.approvalStatus)&&"approved"!==(null==Et?void 0:Et.approvalStatus)||await Lt("approvedAndPublished");(await Xe("publish_to_live",M)).data?R(!1):n({state:"error"}),await new Promise((e=>setTimeout(e,1e3))),l(!1),L({action:"publish_to_live_done"})},B=async e=>{e.preventDefault(),e.stopPropagation(),a(!0);(await Xe("unpublish_from_live",M)).data?R(!1):n({state:"error"}),await new Promise((e=>setTimeout(e,1e3))),a(!1),L({action:"unpublish_from_live_done"})};f((()=>{q&&Dt({changesNotSavedToDraft:O()})})),f((()=>{q&&Dt({publishing:i()})})),f((()=>{q&&Dt({publishing:i()})}));const O=()=>u()||h()||m();return I(Mt,{get horizontal(){return e.metaMenu},get box(){return e.optionsMeta},get children(){return[I(Q,{get when(){return r()},get children(){return I(Nt,{get horizontal(){return e.metaMenu},get children(){return[I(ut,{get size(){return e.metaMenu?"small":"large"}}),I(Tt,{children:"Checking content in draft and live"})]}})}}),I(Q,{get when(){return!r()},get children(){return[I(Q,{get when(){return k()},get children(){return I(Nt,{get horizontal(){return e.metaMenu},get children(){return I(Tt,{children:"Content must be saved before publishing"})}})}}),I(Q,{get when(){var e;return!d()&&(null===(e=t.draft)||void 0===e?void 0:e.exists)},get children(){return[I(Q,{get when(){return q&&e.requireApproval},get children(){return I(Ut,{})}}),I(Q,{get when(){return!e.requireApproval},get children(){return I(Tt,{get horizontal(){return e.metaMenu},children:"Publish content"})}}),I(Q,{get when(){var e;return!(null!==(e=t.live)&&void 0!==e&&e.exists)},get children(){return[ne((()=>q&&e.requireApproval?I(Qt,{}):I(ht,{get leftMargin(){return e.metaMenu},get loading(){return i()},onClick:e=>z(e),get disabled(){return O()},get children(){return O()?"Save draft before publishing to live":"Publish to live site"}}))),I(ht,{get leftMargin(){return e.metaMenu},disabled:!0,children:"Content not published"}),I(Q,{when:q,get children(){return I(Vt,{})}})]}}),I(Q,{get when(){var e;return null===(e=t.live)||void 0===e?void 0:e.exists},get children(){return[ne((()=>q&&!e.optionsMeta&&e.requireApproval?I(Wt,{}):I(ht,{get leftMargin(){return e.metaMenu},get loading(){return i()},onClick:e=>z(e),get disabled(){var e;return(null===(e=t.live)||void 0===e?void 0:e.synced)||O()},get children(){var e;return O()?"Save draft before updating on live":null!==(e=t.live)&&void 0!==e&&e.synced?"Updated on live site":"Update on live site"}}))),I(ht,{get leftMargin(){return e.metaMenu},get loading(){return s()},onClick:e=>B(e),get disabled(){return m()},children:"Unpublish"}),I(Q,{when:q,get children(){return I(Vt,{})}})]}})]}}),I(Q,{get when(){return e.metaMenu},get children(){return I(Nt,{get horizontal(){return e.metaMenu},get children(){return[I(Q,{get when(){return!w()},get children(){return I(Tt,{children:"Enter a 'Menu Name' above to create a new menu"})}}),(()=>{const e=ne((()=>{var e;return!(d()||null!==(e=t.draft)&&void 0!==e&&e.exists)}),!0);return I(Q,{get when(){return e()&&w()},get children(){return I(Tt,{children:"Save menu with menu items in order to publish"})}})})(),I(Q,{get when(){return d()},get children(){return I(Tt,{children:"Save the changes before publishing"})}})]}})}})]}}),I(Q,{get when(){return e.enableTestContent},get children(){return I(ht,{get leftMargin(){return e.metaMenu},get loading(){return s()},onClick:e=>B(e),get disabled(){var e;return!(null!==(e=t.test)&&void 0!==e&&e.synced)},get children(){return t.test&&t.test.synced?"Unpublish from test target":"Publish to test target"}})}}),I(Q,{get when(){return Et.errorMessage},get children(){return I(qt,{get children(){return Et.errorMessage}})}})]}})},Gt=Je("input")`
`,Zt=Je("div")`
    display: flex;
    flex-direction: column;
    width: 100%;
    padding-right: 10px;
    box-sizing: border-box;
`,en=Je("label")`
    padding: 5px 5px 0px 5px;
    font-size: 10px;
    height: 18px;
`,tn=({placeholder:e="",label:t=" ",value:n,onChange:r=(()=>{})})=>{const o=e=>{r(e.target.value)};return I(Zt,{get children(){return[I(en,{children:t}),I(Gt,{type:"text",get value(){return n()},placeholder:e,onKeyup:o})]}})},nn=Je("select")`
    max-width: 100% !important;
`,rn=Je("div")`
    display: flex;
    flex-direction: column;
    width: 100%;
    padding-left: 10px;
    box-sizing: border-box;
`,on=Je("label")`
    padding: 5px 5px 0px 5px;
    font-size: 10px;
    height: 18px;
`,ln=le("<option></option>"),sn=({options:e=[],placeholder:t="",label:n=" ",value:r,onChange:o=(()=>{})})=>{const i=e=>{console.log(e),o(e.target.value)};return I(rn,{get children(){return[I(on,{children:n}),I(nn,{get value(){return r()},placeholder:t,onChange:i,get children(){return I(J,{each:e,children:e=>(()=>{const t=ln.cloneNode(!0);return ge(t,(()=>e.label)),h((n=>{const o=e.value,i=e.value===r();return o!==n._v$&&(t.value=n._v$=o),i!==n._v$2&&(t.selected=n._v$2=i),n}),{_v$:void 0,_v$2:void 0}),t})()})}})]}})},an={open:Ke`
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
`},dn=Je("div")`
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
`,un=Je("div")`
    max-height: 0px;
    overflow: hidden;
    ${e=>`animation: ${an[e.state]} .4s ease-in-out forwards;`}
`,pn=Je("div")`
    background-color: #fff;
    border: 1px solid #aaa;
    border-radius: 3px;
    margin-top: 20px;
    padding: 20px;
`,gn=Je("div")`
    width: 100%;
    display: flex;
    padding-bottom: 10px;
`,hn=Je("div")`
    width: 100%;
    display: flex;
    justify-content: flex-end;
`,fn=Je("div")`
    color red;
`,vn=Je("div")`
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
`,bn=Je("td")`
    display: flex;
    justify-content: flex-end;
`,yn=le("<thead><tr><th>Domain</th><th>Distribution ID</th><th>Target</th><th>SiteId</th><th></th></tr></thead>"),wn=le("<tbody></tbody>"),xn=le("<tr><td></td><td></td><td></td><td></td></tr>"),kn=[{value:"draft",label:"Draft"},{value:"live",label:"Live"},{value:"test",label:"Test"}];const Sn=({options:e})=>{const[t,n]=Te({list:[]}),[r,o]=g(""),[i,l]=g(""),[s,a]=g("draft"),[d,c]=g("init"),[u,p]=g(""),[h,v]=g(!1),m=async()=>{const t=await Ge(`${e.api}/get-domain-settings.php`);n("list",t)},b=async(t=function(e){for(var t="",n="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",r=n.length,o=0;o<e;o++)t+=n.charAt(Math.floor(Math.random()*r));return t}(20))=>{try{if(p(""),h())return;v(!0),await Ge(`${e.api}/upsert-domain-setting.php`,{domain:r(),target:s(),id:t,cloudfrontDistributionId:i()}),await m(),a("draft"),o(""),l(""),v(!1),c("close")}catch(e){console.log("ee",e),"domain-already-exists"===e.error?p("Domain already exists"):p("Something caused an error"),v(!1)}},y=(e,t)=>{"domain"===e&&o(t),"target"===e&&a(t),"cloudfrontDistributionId"===e&&l(t)};return f((()=>{m()})),I(dn,{get children(){return[I(it,{children:"Domain Settings"}),I(ot,{children:"This is the list of domains and targets that will be used for this site. You can add as many as you need but the domains need to be pointed to the server to make it work."}),I(cn,{get children(){return I(ht,{onClick:()=>c("open"),children:"Add new domain and target"})}}),I(un,{get state(){return d()},get children(){return I(pn,{get children(){return[I(st,{children:"Add new domain and target"}),I(gn,{get children(){return[I(tn,{placeholder:"domain",label:"Domain:",value:r,onChange:e=>y("domain",e)}),I(tn,{placeholder:"distribution id",label:"Cloudfront Distribution ID:",value:i,onChange:e=>y("cloudfrontDistributionId",e)}),I(sn,{options:kn,value:s,onChange:e=>y("target",e)})]}}),I(Q,{when:u,get children(){return I(fn,{children:u})}}),I(hn,{get children(){return[I(ht,{onClick:()=>c("close"),children:"Cancel"}),I(ht,{get loading(){return h()},leftMargin:!0,get disabled(){return!r()||!s()},onClick:()=>b(),children:"Save"})]}})]}})}}),I(mn,{get children(){return[yn.cloneNode(!0),(()=>{const n=wn.cloneNode(!0);return ge(n,I(J,{get each(){return t.list},children:t=>(()=>{const n=xn.cloneNode(!0),r=n.firstChild,o=r.nextSibling,i=o.nextSibling,l=i.nextSibling;return ge(r,(()=>t.content.domain)),ge(o,(()=>t.content.cloudfrontDistributionId)),ge(i,(()=>t.content.target)),ge(l,(()=>t.content.siteId)),ge(n,I(bn,{get children(){return I(vn,{onClick:()=>(async t=>{try{await Ge(`${e.api}/delete-domain-setting.php`,{id:t}),await m()}catch(e){console.log(e)}})(t.externalId),children:"delete"})}}),null),n})()})),n})()]}})]}})},Cn=le("<span>, requested by <em></em></span>"),Pn=le("<span> - rejected by <em></em></span>"),jn=le("<span> - approved by <em></em></span>"),An=le("<em></em>"),Mn=Je("div")`
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
`,Nn=Je("h5")`
    margin: 0;
    margin-bottom: 0.3rem;
    text-decoration: underline;
`,Tn=Je("div")`
    margin-top: 0.8rem;
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    font-size: 15px;
`,En=Je("div")`
    display: flex;
    align-items: flex-start;
    margin-top: -10px;
    padding-inline: 1rem;
`,Dn=Je("div")`
    padding-left: 1rem;
    margin-top: 0.5rem;
`,Rn=e=>{const t=()=>{console.log("Request data: ",e.item)};return I(Tn,{get key(){return e.item.content.post_id},get children(){return[I(Mn,{onClick:t,get children(){return e.item.content.type}}),I(_n,{get children(){return[I(qn,{get href(){return(()=>{const t=e.item.content["wp-domain"];return e.item.content.editorUrl.includes(t)?e.item.content.editorUrl:`${e.item.content["wp-domain"]}${e.item.content.editorUrl}`})()},target:"_blank",get children(){return e.item.content.post_title}}),I(Q,{get when(){return"admin"===e.type},get children(){const t=Cn.cloneNode(!0);return ge(t.firstChild.nextSibling,(()=>e.item.content.requestedBy)),t}}),I(Q,{get when(){return"rejected"===e.item.content.status},get children(){const t=Pn.cloneNode(!0);return ge(t.firstChild.nextSibling,(()=>e.item.content.rejectedBy)),t}}),I(Q,{get when(){return"approved"===e.item.content.status||"approvedAndPublished"===e.item.content.status},get children(){const t=jn.cloneNode(!0);return ge(t.firstChild.nextSibling,(()=>e.item.content.approvedBy)),t}}),ne((()=>` (${(()=>{const t=new Date(e.item.content.updated_on);return t.getFullYear()+"-"+(t.getMonth()+1).toString().padStart(2,"0")+"-"+t.getDate().toString().padStart(2,"0")+", "+t.getHours().toString().padStart(2,"0")+":"+t.getMinutes().toString().padStart(2,"0")})()})`)),I(Q,{get when(){return"rejected"===e.item.content.status},get children(){return I(Dn,{get children(){return[I(Nn,{children:"Rejection message:"}),(()=>{const t=An.cloneNode(!0);return ge(t,(()=>e.item.content.rejectionReason)),t})()]}})}})]}}),I(En,{get children(){return I(ht,{get onClick(){return e.manualDelete},children:"Delete"})}})]}})},$n=le("<p></p>"),Ln=le("<p>Reload page</p>"),zn=le("<div></div>"),Bn=Je("div")`
    margin-bottom: 3rem;
`,On=Je("div")`
    margin-top: 1rem;
    margin-bottom: 2rem;
`,Hn=Je("p")`
    font-size: 15px;
`,Un=Je("div")`
    width: 100%;
    border-bottom: solid 2px #c3c4c7;
    height: 2rem;
    display: flex;
    align-items: flex-end;
`,In=Je("div")`
    background-color: white;
    width: 100%;
    padding: 2rem 1rem;
    box-sizing: border-box;
    border: solid 2px #c3c4c7;
    border-top: none;
`,Fn=Je("button")`
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
`,Kn=[{slug:"pending",name:"Pending"},{slug:"approved",name:"Approved"},{slug:"approvedAndPublished",name:"Published"},{slug:"rejected",name:"Rejected"}],Yn=({options:e})=>{const[t,n]=g([]),[r,o]=g([]),[i,l]=g([]),[s,a]=g([]),[d,c]=g(!1),[u,p]=g(""),[h,f]=g("pending");y((()=>{c(!0),v()}));const v=async()=>{try{var t;const n=await Ge(`${e.api}/get-publication-requests.php`);m(null==n||null===(t=n.data)||void 0===t?void 0:t.resources)}catch(e){console.log("Error fetching all publication requests",e),p("Error fetching all publication requests")}},m=(e=[])=>{const t={pending:{},approved:{},approvedAndPublished:{},rejected:{}};console.log("Unsorted requests",e);e.sort(((e,t)=>new Date(t.content.updated_on)-new Date(e.content.updated_on))).forEach((e=>{const n=e.content.status,r=b(e.content["wp-domain"]),o=e.content.from_site_name+" - "+r;t[n][o]||(t[n][o]=[]),t[n][o].push(e)})),console.log("Approved: ",t.approved),console.log("Approved And Published: ",t.approvedAndPublished),console.log("Pending: ",t.pending),console.log("Rejected: ",t.rejected),n(t.approved),o(t.approvedAndPublished),a(t.rejected),l(t.pending),c(!1)},b=e=>{const t=e.indexOf("://");return e.slice(t+3)},w=({title:t,siteRequests:n})=>{const r=Object.keys(n);return I(Bn,{get children(){return[I(st,{children:t}),I(Q,{get when(){return 0!==r.length},get fallback(){return I(_n,{children:"None to show"})},get children(){return I(J,{each:r,children:t=>I(On,{get children(){return[I(Hn,{children:t}),I(J,{get each(){return n[t]},children:t=>I(Rn,{item:t,manualDelete:()=>(async t=>{console.log("Deleting publication request: "+t);try{var n;const o=await Ge(`${e.api}/delete-publication-request.php`,{postId:t});var r;if(console.log("Delete result",o),null!=o&&null!==(n=o.errors)&&void 0!==n&&n.length)throw new Error(null===(r=o.errors[0])||void 0===r?void 0:r.message);v()}catch(e){console.log("Error deleting publication request",e),p("Error deleting publication request")}})(t.content.post_id),type:"admin"})})]}})})}})]}})};return(()=>{const e=zn.cloneNode(!0);return ge(e,I(it,{children:"Publication requests"}),null),ge(e,I(Un,{get children(){return I(J,{each:Kn,children:(e,t)=>I(Fn,{get isActive(){return e.slug===h()},onClick:()=>f(e.slug),get children(){return e.name}})})}}),null),ge(e,I(In,{get children(){return[(()=>{const e=ne((()=>!!d()),!0);return I(Q,{get when(){return e()&&!u()},get children(){return I(_n,{children:"Loading..."})}})})(),(()=>{const e=ne((()=>!("pending"!==h()||d())),!0);return I(Q,{get when(){return e()&&!u()},get children(){return w({title:"Pending",siteRequests:i()})}})})(),(()=>{const e=ne((()=>!("approved"!==h()||d())),!0);return I(Q,{get when(){return e()&&!u()},get children(){return w({title:"Approved",siteRequests:t()})}})})(),(()=>{const e=ne((()=>!("approvedAndPublished"!==h()||d())),!0);return I(Q,{get when(){return e()&&!u()},get children(){return w({title:"Published",siteRequests:r()})}})})(),(()=>{const e=ne((()=>!("rejected"!==h()||d())),!0);return I(Q,{get when(){return e()&&!u()},get children(){return w({title:"Rejected",siteRequests:s()})}})})(),I(Q,{get when(){return u()},get children(){return[(()=>{const e=$n.cloneNode(!0);return ge(e,u),e})(),Ln.cloneNode(!0)]}})]}}),null),e})()},Jn=le("<p></p>"),Qn=le("<p>Reload page</p>"),Vn=le("<div></div>"),Wn=Je("div")`
    margin-bottom: 3rem;
`,Xn=Je("div")`
    margin-top: 1rem;
    margin-bottom: 2rem;
`,Gn=Je("p")`
    font-size: 15px;
`,Zn=[{slug:"pending",name:"Pending"},{slug:"approved",name:"Approved"},{slug:"approvedAndPublished",name:"Published"},{slug:"rejected",name:"Rejected"}],er=({options:e})=>{const[t,n]=g([]),[r,o]=g([]),[i,l]=g([]),[s,a]=g([]),[d,c]=g("pending"),[u,p]=g(!1),[h,f]=g("");y((()=>{p(!0),v()}));const v=async()=>{try{var t;const n=await Ge(`${e.api}/get-publication-requests.php`);m(null==n||null===(t=n.data)||void 0===t?void 0:t.resources)}catch(e){console.log("Error fetching all publication requests",e),f("Error fetching all publication requests")}},m=(t=[])=>{const r={pending:{},approved:{},approvedAndPublished:{},rejected:{}};console.log("Unsorted requests",t);t.filter((t=>t.content.requestedBy===e.userName)).sort(((e,t)=>new Date(t.content.updated_on)-new Date(e.content.updated_on))).forEach((e=>{const t=e.content.status,n=b(e.content["wp-domain"]),o=e.content.from_site_name+" - "+n;r[t][o]||(r[t][o]=[]),r[t][o].push(e)})),console.log("Approved: ",r.approved),console.log("Approved And Published:",r.approvedAndPublished),console.log("Pending: ",r.pending),console.log("Rejected: ",r.rejected),n(r.approved),o(r.approvedAndPublished),a(r.rejected),l(r.pending),p(!1)},b=e=>{const t=e.indexOf("://");return e.slice(t+3)},w=({title:t,siteRequests:n})=>{const r=Object.keys(n);return I(Wn,{get children(){return[I(st,{children:t}),I(Q,{get when(){return 0!==r.length},get fallback(){return I(_n,{children:"None to show"})},get children(){return I(J,{each:r,children:t=>I(Xn,{get children(){return[I(Gn,{children:t}),I(J,{get each(){return n[t]},children:t=>I(Rn,{item:t,manualDelete:()=>(async t=>{console.log("Deleting publication request: "+t);try{var n;const o=await Ge(`${e.api}/delete-publication-request.php`,{postId:t});var r;if(console.log("Delete result",o),null!=o&&null!==(n=o.errors)&&void 0!==n&&n.length)throw new Error(null===(r=o.errors[0])||void 0===r?void 0:r.message);v()}catch(e){console.log("Error deleting publication request",e),f("Error deleting publication request")}})(t.content.post_id),type:"editor"})})]}})})}})]}})};return(()=>{const e=Vn.cloneNode(!0);return ge(e,I(it,{children:"My publication requests"}),null),ge(e,I(Un,{get children(){return I(J,{each:Zn,children:(e,t)=>I(Fn,{get isActive(){return e.slug===d()},onClick:()=>c(e.slug),get children(){return e.name}})})}}),null),ge(e,I(In,{get children(){return[(()=>{const e=ne((()=>!!u()),!0);return I(Q,{get when(){return e()&&!h()},get children(){return I(_n,{children:"Loading..."})}})})(),(()=>{const e=ne((()=>!("pending"!==d()||u())),!0);return I(Q,{get when(){return e()&&!h()},get children(){return w({title:"Pending",siteRequests:i()})}})})(),(()=>{const e=ne((()=>!("approved"!==d()||u())),!0);return I(Q,{get when(){return e()&&!h()},get children(){return w({title:"Approved",siteRequests:t()})}})})(),(()=>{const e=ne((()=>!("approvedAndPublished"!==d()||u())),!0);return I(Q,{get when(){return e()&&!h()},get children(){return w({title:"Published",siteRequests:r()})}})})(),(()=>{const e=ne((()=>!("rejected"!==d()||u())),!0);return I(Q,{get when(){return e()&&!h()},get children(){return w({title:"Rejected",siteRequests:s()})}})})(),I(Q,{get when(){return h()},get children(){return[(()=>{const e=Jn.cloneNode(!0);return ge(e,h),e})(),Qn.cloneNode(!0)]}})]}}),null),e})()},tr=e=>{try{return JSON.parse(document.getElementById(e).innerHTML)}catch(e){return console.log("Error in getData",e),{}}},nr=()=>{let e=document.getElementById("dls-metabox-root");if(e){const t=tr("dls-data");t.metaMenu="nav-menu"===e.getAttribute("data-type"),t.metaMenu&&(e=document.createElement("div"),e&&document.querySelector("#nav-menu-footer").prepend(e)),ie((()=>I(Xt,{options:t})),e)}};jQuery(document).ready((function(e){var t,n;const r=null===(t=wp)||void 0===t||null===(n=t.data)||void 0===n?void 0:n.dispatch("core/editor");r&&r.disablePublishSidebar(),(()=>{if(wp.data){let e=!1,t=!1;wp.data.subscribe((()=>{const n=wp.data.select("core/editor").isSavingPost(),r=wp.data.select("core/editor").isSavingNonPostEntityChanges&&wp.data.select("core/editor").isSavingNonPostEntityChanges();e!==n?(e=n,wp.data.select("core/editor").didPostSaveRequestSucceed()&&wp.hooks.doAction("dls.post-saved")):t!==r&&(t=r,wp.data.select("core/editor").didPostSaveRequestSucceed()&&wp.hooks.doAction("dls.post-saved"))}))}})();let o={};try{o=e("#dls-hooks").length>0?JSON.parse(e("#dls-hooks").html()):{hook:""}}catch(e){}console.log("Current hook",o&&o.hook),"post.php"===o.hook||"post-new.php"===o.hook||"nav-menus.php"===o.hook?nr():o.hook.includes("toplevel_page_draft-live-sync")?(()=>{const e=tr("dls-data");ie((()=>I(De,{values:e,get children(){return I(At,{})}})),document.getElementById("dls-root"))})():o.hook.includes("toplevel_page_cerberus-domain-settings")?(()=>{const e=document.getElementById("dls-domain-settings-root"),t=tr("dls-data");ie((()=>I(Sn,{options:t})),e)})():o.hook.includes("toplevel_page_publication-approval")?(()=>{const e=document.getElementById("dls-publication-approval-root"),t=tr("dls-data");ie((()=>I(Yn,{options:t})),e)})():o.hook.includes("toplevel_page_publication-requests")?(()=>{const e=document.getElementById("dls-publication-requests-root"),t=tr("dls-data");ie((()=>I(er,{options:t})),e)})():o.hook.includes(".php")||nr();const i=()=>{const e="true"===or("cerberus-activated"),t=document.querySelector("#toplevel_page_draft-live-sync");e&&t?t.style.display="block":t&&(t.style.display="none")};i();const l=document.querySelector("#cerberus-initiator");if(l){let e=0;l.addEventListener("click",(()=>{if(e++>9){"true"===or("cerberus-activated")?rr("cerberus-activated",!1,0):rr("cerberus-activated",!0,1e3),i(),e=0}}))}}));const rr=(e,t,n)=>{var r="";if(n){var o=new Date;o.setTime(o.getTime()+24*n*60*60*1e3),r="; expires="+o.toUTCString()}document.cookie=e+"="+(t||"")+r+"; path=/"},or=e=>{for(var t=e+"=",n=document.cookie.split(";"),r=0;r<n.length;r++){for(var o=n[r];" "==o.charAt(0);)o=o.substring(1,o.length);if(0==o.indexOf(t))return o.substring(t.length,o.length)}return null}}();
//# sourceMappingURL=draft-live-sync-boot-1.1.6.js.map
