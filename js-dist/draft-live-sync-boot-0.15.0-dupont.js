!function(){"use strict";const e=Symbol("solid-proxy"),t={equals:(e,t)=>e===t};let n=E;const r={},o={owned:null,cleanups:null,context:null,owner:null};var i=null;let l=null,a=null,s=null,d=null,c=null,u=0;function p(e,t){t&&(i=t);const n=a,r=i,l=0===e.length?o:{owned:null,cleanups:null,context:null,owner:r};let s;i=l,a=null;try{M((()=>s=e((()=>z(l)))),!0)}finally{a=n,i=r}return s}function g(e,n){n=n?Object.assign({},t,n):t;const o={value:e,observers:null,observerSlots:null,pending:r,comparator:n.equals||void 0};return[C.bind(o),e=>("function"==typeof e&&(e=e(o.pending!==r?o.pending:o.value)),A(o,e))]}function h(e,t,n){L($(e,t,!1))}function f(e,t,r){n=P;const o=$(e,t,!1);o.user=!0,c&&c.push(o)}function b(e,n,o){o=o?Object.assign({},t,o):t;const i=$(e,n,!0);return i.pending=r,i.observers=null,i.observerSlots=null,i.state=0,i.comparator=o.equals||void 0,L(i),C.bind(i)}function v(e){if(s)return e();let t;const n=s=[];try{t=e()}finally{s=null}return M((()=>{for(let e=0;e<n.length;e+=1){const t=n[e];if(t.pending!==r){const e=t.pending;t.pending=r,A(t,e)}}}),!1),t}function y(e){let t,n=a;return a=null,t=e(),a=n,t}function m(e){return null===i||(null===i.cleanups?i.cleanups=[e]:i.cleanups.push(e)),e}function x(){return a}function w(e){const t=Symbol("context");return{id:t,Provider:q(t),defaultValue:e}}function k(e){return O(i,e.id)||e.defaultValue}function S(e){const t=b(e);return b((()=>I(t())))}function C(){if(this.state&&this.sources){const e=d;d=null,1===this.state?L(this):j(this),d=e}if(a){const e=this.observers?this.observers.length:0;a.sources?(a.sources.push(this),a.sourceSlots.push(e)):(a.sources=[this],a.sourceSlots=[e]),this.observers?(this.observers.push(a),this.observerSlots.push(a.sources.length-1)):(this.observers=[a],this.observerSlots=[a.sources.length-1])}return this.value}function A(e,t,n){return e.comparator&&e.comparator(e.value,t)?t:s?(e.pending===r&&s.push(e),e.pending=t,t):(e.value=t,!e.observers||d&&!e.observers.length||M((()=>{for(let t=0;t<e.observers.length;t+=1){const n=e.observers[t];l,n.observers&&2!==n.state&&T(n),n.state=1,n.pure?d.push(n):c.push(n)}if(d.length>1e6)throw d=[],new Error}),!1),t)}function L(e){if(!e.fn)return;z(e);const t=i,n=a,r=u;a=i=e,function(e,t,n){let r;try{r=e.fn(t)}catch(e){D(e)}(!e.updatedAt||e.updatedAt<=n)&&(e.observers&&e.observers.length?A(e,r):e.value=r,e.updatedAt=n)}(e,e.value,r),a=n,i=t}function $(e,t,n,r){const l={fn:e,state:1,updatedAt:null,owned:null,sources:null,sourceSlots:null,cleanups:null,value:t,owner:i,context:null,pure:n};return null===i||i!==o&&(i.owned?i.owned.push(l):i.owned=[l]),l}function N(e){let t,n=1===e.state&&e;if(e.suspense&&y(e.suspense.inFallback))return e.suspense.effects.push(e);for(;e=e.owner;)2===e.state?t=e:1===e.state&&(n=e,t=void 0);if(t){const e=d;if(d=null,j(t),d=e,!n||1!==n.state)return}n&&L(n)}function M(e,t){if(d)return e();let r=!1;t||(d=[]),c?r=!0:c=[],u++;try{e()}catch(e){D(e)}finally{!function(e){d&&(E(d),d=null);if(e)return;c.length?v((()=>{n(c),c=null})):c=null}(r)}}function E(e){for(let t=0;t<e.length;t++)N(e[t])}function P(e){let t,n=0;for(t=0;t<e.length;t++){const r=e[t];r.user?e[n++]=r:N(r)}const r=e.length;for(t=0;t<n;t++)N(e[t]);for(t=r;t<e.length;t++)N(e[t])}function j(e){e.state=0;for(let t=0;t<e.sources.length;t+=1){const n=e.sources[t];n.sources&&(1===n.state?N(n):2===n.state&&j(n))}}function T(e){for(let t=0;t<e.observers.length;t+=1){const n=e.observers[t];n.state||(n.state=2,n.observers&&T(n))}}function z(e){let t;if(e.sources)for(;e.sources.length;){const t=e.sources.pop(),n=e.sourceSlots.pop(),r=t.observers;if(r&&r.length){const e=r.pop(),o=t.observerSlots.pop();n<r.length&&(e.sourceSlots[o]=n,r[n]=e,t.observerSlots[n]=o)}}if(e.owned){for(t=0;t<e.owned.length;t++)z(e.owned[t]);e.owned=null}if(e.cleanups){for(t=0;t<e.cleanups.length;t++)e.cleanups[t]();e.cleanups=null}e.state=0,e.context=null}function D(e){throw e}function O(e,t){return e&&(e.context&&e.context[t]||e.owner&&O(e.owner,t))}function I(e){if("function"==typeof e&&!e.length)return I(e());if(Array.isArray(e)){const t=[];for(let n=0;n<e.length;n++){const r=I(e[n]);Array.isArray(r)?t.push.apply(t,r):t.push(r)}return t}return e}function q(e){return function(t){let n;var r;return L($((()=>n=y((()=>(i.context={[e]:t.value},S((()=>t.children)))))),r,!0)),n}}const B=Symbol("fallback");function F(e){for(let t=0;t<e.length;t++)e[t]()}function H(e,t){return y((()=>e(t)))}function R(){return!0}const U={get:(t,n,r)=>n===e?r:t.get(n),has:(e,t)=>e.has(t),set:R,deleteProperty:R,getOwnPropertyDescriptor:(e,t)=>({configurable:!0,enumerable:!0,get:()=>e.get(t),set:R,deleteProperty:R}),ownKeys:e=>e.keys()};function K(...e){return new Proxy({get(t){for(let n=e.length-1;n>=0;n--){const r=e[n][t];if(void 0!==r)return r}},has(t){for(let n=e.length-1;n>=0;n--)if(t in e[n])return!0;return!1},keys(){const t=[];for(let n=0;n<e.length;n++)t.push(...Object.keys(e[n]));return[...new Set(t)]}},U)}function W(e){const t="fallback"in e&&{fallback:()=>e.fallback};return b(function(e,t,n={}){let r=[],o=[],i=[],l=0,a=t.length>1?[]:null;return m((()=>F(i))),()=>{let s,d,c=e()||[];return y((()=>{let e,t,g,h,f,b,v,y,m,x=c.length;if(0===x)0!==l&&(F(i),i=[],r=[],o=[],l=0,a&&(a=[])),n.fallback&&(r=[B],o[0]=p((e=>(i[0]=e,n.fallback()))),l=1);else if(0===l){for(o=new Array(x),d=0;d<x;d++)r[d]=c[d],o[d]=p(u);l=x}else{for(g=new Array(x),h=new Array(x),a&&(f=new Array(x)),b=0,v=Math.min(l,x);b<v&&r[b]===c[b];b++);for(v=l-1,y=x-1;v>=b&&y>=b&&r[v]===c[y];v--,y--)g[y]=o[v],h[y]=i[v],a&&(f[y]=a[v]);for(e=new Map,t=new Array(y+1),d=y;d>=b;d--)m=c[d],s=e.get(m),t[d]=void 0===s?-1:s,e.set(m,d);for(s=b;s<=v;s++)m=r[s],d=e.get(m),void 0!==d&&-1!==d?(g[d]=o[s],h[d]=i[s],a&&(f[d]=a[s]),d=t[d],e.set(m,d)):i[s]();for(d=b;d<x;d++)d in g?(o[d]=g[d],i[d]=h[d],a&&(a[d]=f[d],a[d](d))):o[d]=p(u);o=o.slice(0,l=x),r=c.slice(0)}return o}));function u(e){if(i[d]=e,a){const[e,n]=g(d);return a[d]=n,t(c[d],e)}return t(c[d])}}}((()=>e.each),e.children,t||void 0))}function J(e){let t=!1;const n=b((()=>e.when),void 0,{equals:(e,n)=>t?e===n:!e==!n});return b((()=>{const r=n();if(r){const n=e.children;return(t="function"==typeof n&&n.length>0)?y((()=>n(r))):n}return e.fallback}))}const Q=new Set(["className","indeterminate","value","allowfullscreen","allowpaymentrequest","async","autofocus","autoplay","checked","controls","default","disabled","formnovalidate","hidden","ismap","itemscope","loop","multiple","muted","nomodule","novalidate","open","playsinline","readonly","required","reversed","seamless","selected","truespeed"]),V=new Set(["innerHTML","textContent","innerText","children"]),X={className:"class",htmlFor:"for"},Y=new Set(["beforeinput","click","dblclick","focusin","focusout","input","keydown","keyup","mousedown","mousemove","mouseout","mouseover","mouseup","pointerdown","pointermove","pointerout","pointerover","pointerup","touchend","touchmove","touchstart"]),Z={xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace"};function G(e,t){return b(e,void 0,t?void 0:{equals:t})}function ee(e,t,n){let r=n.length,o=t.length,i=r,l=0,a=0,s=t[o-1].nextSibling,d=null;for(;l<o||a<i;)if(t[l]!==n[a]){for(;t[o-1]===n[i-1];)o--,i--;if(o===l){const t=i<r?a?n[a-1].nextSibling:n[i-a]:s;for(;a<i;)e.insertBefore(n[a++],t)}else if(i===a)for(;l<o;)d&&d.has(t[l])||e.removeChild(t[l]),l++;else if(t[l]===n[i-1]&&n[a]===t[o-1]){const r=t[--o].nextSibling;e.insertBefore(n[a++],t[l++].nextSibling),e.insertBefore(n[--i],r),t[o]=n[i]}else{if(!d){d=new Map;let e=a;for(;e<i;)d.set(n[e],e++)}const r=d.get(t[l]);if(null!=r)if(a<r&&r<i){let s,c=l,u=1;for(;++c<o&&c<i&&null!=(s=d.get(t[c]))&&s===r+u;)u++;if(u>r-a){const o=t[l];for(;a<r;)e.insertBefore(n[a++],o)}else e.replaceChild(n[a++],t[l++])}else l++;else e.removeChild(t[l++])}}else l++,a++}const te="_$DX_DELEGATE";function ne(e,t,n){let r;return p((o=>{r=o,ce(t,e(),t.firstChild?null:void 0,n)})),()=>{r(),t.textContent=""}}function re(e,t,n){const r=document.createElement("template");r.innerHTML=e;let o=r.content.firstChild;return n&&(o=o.firstChild),o}function oe(e,t=window.document){const n=t[te]||(t[te]=new Set);for(let r=0,o=e.length;r<o;r++){const o=e[r];n.has(o)||(n.add(o),t.addEventListener(o,pe))}}function ie(e,t,n){null==n?e.removeAttribute(t):e.setAttribute(t,n)}function le(e,t,n,r){null==r?e.removeAttributeNS(t,n):e.setAttributeNS(t,n,r)}function ae(e,t,n,r){r?Array.isArray(n)?(e[`$$${t}`]=n[0],e[`$$${t}Data`]=n[1]):e[`$$${t}`]=n:Array.isArray(n)?e.addEventListener(t,(e=>n[0](n[1],e))):e.addEventListener(t,n)}function se(e,t,n={}){const r=Object.keys(t),o=Object.keys(n);let i,l;for(i=0,l=o.length;i<l;i++){const r=o[i];r&&"undefined"!==r&&!(r in t)&&(ue(e,r,!1),delete n[r])}for(i=0,l=r.length;i<l;i++){const o=r[i],l=!!t[o];o&&"undefined"!==o&&n[o]!==l&&(ue(e,o,l),n[o]=l)}return n}function de(e,t,n={}){const r=e.style;if("string"==typeof t)return r.cssText=t;let o,i;for(i in"string"==typeof n&&(n={}),n)null==t[i]&&r.removeProperty(i),delete n[i];for(i in t)o=t[i],o!==n[i]&&(r.setProperty(i,o),n[i]=o);return n}function ce(e,t,n,r){if(void 0===n||r||(r=[]),"function"!=typeof t)return he(e,t,r,n);h((r=>he(e,t(),r,n)),r)}function ue(e,t,n){const r=t.split(/\s+/);for(let t=0,o=r.length;t<o;t++)e.classList.toggle(r[t],n)}function pe(e){const t=`$$${e.type}`;let n=e.composedPath&&e.composedPath()[0]||e.target;for(e.target!==n&&Object.defineProperty(e,"target",{configurable:!0,value:n}),Object.defineProperty(e,"currentTarget",{configurable:!0,get:()=>n});null!==n;){const r=n[t];if(r&&!n.disabled){const o=n[`${t}Data`];if(void 0!==o?r(o,e):r(e),e.cancelBubble)return}n=n.host&&n.host!==n&&n.host instanceof Node?n.host:n.parentNode}}function ge(e,t,n={},r,o){return!o&&"children"in t&&h((()=>n.children=he(e,t.children,n.children))),h((()=>function(e,t,n,r,o={}){let i,l,a;for(const d in t){if("children"===d){r||he(e,t.children);continue}const c=t[d];if(c!==o[d]){if("style"===d)de(e,c,o[d]);else if("class"!==d||n)if("classList"===d)se(e,c,o[d]);else if("ref"===d)c(e);else if("on:"===d.slice(0,3))e.addEventListener(d.slice(3),c);else if("oncapture:"===d.slice(0,10))e.addEventListener(d.slice(10),c,!0);else if("on"===d.slice(0,2)){const t=d.slice(2).toLowerCase(),n=Y.has(t);ae(e,t,c,n),n&&oe([t])}else if((a=V.has(d))||!n&&(l=Q.has(d))||(i=e.nodeName.includes("-")))!i||l||a?e[d]=c:e[(s=d,s.toLowerCase().replace(/-([a-z])/g,((e,t)=>t.toUpperCase())))]=c;else{const t=n&&d.indexOf(":")>-1&&Z[d.split(":")[0]];t?le(e,t,d,c):ie(e,X[d]||d,c)}else e.className=c;o[d]=c}}var s}(e,t,r,!0,n))),n}function he(e,t,n,r,o){for(;"function"==typeof n;)n=n();if(t===n)return n;const i=typeof t,l=void 0!==r;if(e=l&&n[0]&&n[0].parentNode||e,"string"===i||"number"===i)if("number"===i&&(t=t.toString()),l){let o=n[0];o&&3===o.nodeType?o.data=t:o=document.createTextNode(t),n=ve(e,n,r,o)}else n=""!==n&&"string"==typeof n?e.firstChild.data=t:e.textContent=t;else if(null==t||"boolean"===i)n=ve(e,n,r);else{if("function"===i)return h((()=>{let o=t();for(;"function"==typeof o;)o=o();n=he(e,o,n,r)})),()=>n;if(Array.isArray(t)){const i=[];if(fe(i,t,o))return h((()=>n=he(e,i,n,r,!0))),()=>n;if(0===i.length){if(n=ve(e,n,r),l)return n}else Array.isArray(n)?0===n.length?be(e,i,r):ee(e,n,i):null==n||""===n?be(e,i):ee(e,l&&n||[e.firstChild],i);n=i}else if(t instanceof Node){if(Array.isArray(n)){if(l)return n=ve(e,n,r,t);ve(e,n,null,t)}else null!=n&&""!==n&&e.firstChild?e.replaceChild(t,e.firstChild):e.appendChild(t);n=t}}return n}function fe(e,t,n){let r=!1;for(let o=0,i=t.length;o<i;o++){let i,l=t[o];if(l instanceof Node)e.push(l);else if(null==l||!0===l||!1===l);else if(Array.isArray(l))r=fe(e,l)||r;else if("string"==(i=typeof l))e.push(document.createTextNode(l));else if("function"===i)if(n){for(;"function"==typeof l;)l=l();r=fe(e,Array.isArray(l)?l:[l])||r}else e.push(l),r=!0;else e.push(document.createTextNode(l.toString()))}return r}function be(e,t,n){for(let r=0,o=t.length;r<o;r++)e.insertBefore(t[r],n)}function ve(e,t,n,r){if(void 0===n)return e.textContent="";const o=r||document.createTextNode("");if(t.length){let r=!1;for(let i=t.length-1;i>=0;i--){const l=t[i];if(o!==l){const t=l.parentNode===e;r||i?t&&e.removeChild(l):t?e.replaceChild(o,l):e.insertBefore(o,n)}else r=!0}}else e.insertBefore(o,n);return[o]}const ye=Symbol("store-raw"),me=Symbol("store-node"),xe=Symbol("store-name");function we(t,n){let r=t[e];if(!r){Object.defineProperty(t,e,{value:r=new Proxy(t,Ae)});const n=Object.keys(t),o=Object.getOwnPropertyDescriptors(t);for(let e=0,i=n.length;e<i;e++){const i=n[e];if(o[i].get){const e=o[i].get.bind(r);Object.defineProperty(t,i,{get:e})}}}return r}function ke(e){return null!=e&&"object"==typeof e&&(!e.__proto__||e.__proto__===Object.prototype||Array.isArray(e))}function _e(e,t=new Set){let n,r,o,i;if(n=null!=e&&e[ye])return n;if(!ke(e)||t.has(e))return e;if(Array.isArray(e)){Object.isFrozen(e)?e=e.slice(0):t.add(e);for(let n=0,i=e.length;n<i;n++)o=e[n],(r=_e(o,t))!==o&&(e[n]=r)}else{Object.isFrozen(e)?e=Object.assign({},e):t.add(e);const n=Object.keys(e),l=Object.getOwnPropertyDescriptors(e);for(let a=0,s=n.length;a<s;a++)i=n[a],l[i].get||(o=e[i],(r=_e(o,t))!==o&&(e[i]=r))}return e}function Se(e){let t=e[me];return t||Object.defineProperty(e,me,{value:t={}}),t}function Ce(){const[e,t]=g(void 0,{equals:!1});return e.$=t,e}const Ae={get(t,n,r){if(n===ye)return t;if(n===e)return r;const o=t[n];if(n===me||"__proto__"===n)return o;const i=ke(o);if(x()&&("function"!=typeof o||t.hasOwnProperty(n))){let e,r;i&&(e=Se(o))&&(r=e._||(e._=Ce()),r()),e=Se(t),r=e[n]||(e[n]=Ce()),r()}return i?we(o):o},set:()=>!0,deleteProperty:()=>!0,ownKeys:function(e){if(x()){const t=Se(e);(t._||(t._=Ce()))()}return Reflect.ownKeys(e)},getOwnPropertyDescriptor:function(t,n){const r=Reflect.getOwnPropertyDescriptor(t,n);return!r||r.get||n===e||n===me||n===xe||(delete r.value,delete r.writable,r.get=()=>t[e][n]),r}};function Le(e,t,n){if(e[t]===n)return;const r=Array.isArray(e),o=e.length,i=void 0===n,l=r||i===t in e;i?delete e[t]:e[t]=n;let a,s=Se(e);(a=s[t])&&a.$(),r&&e.length!==o&&(a=s.length)&&a.$(a,void 0),l&&(a=s._)&&a.$(a,void 0)}function $e(e,t,n=[]){let r,o=e;if(t.length>1){r=t.shift();const i=typeof r,l=Array.isArray(e);if(Array.isArray(r)){for(let o=0;o<r.length;o++)$e(e,[r[o]].concat(t),[r[o]].concat(n));return}if(l&&"function"===i){for(let o=0;o<e.length;o++)r(e[o],o)&&$e(e,[o].concat(t),[o].concat(n));return}if(l&&"object"===i){const{from:o=0,to:i=e.length-1,by:l=1}=r;for(let r=o;r<=i;r+=l)$e(e,[r].concat(t),[r].concat(n));return}if(t.length>1)return void $e(e[r],t,[r].concat(n));o=e[r],n=[r].concat(n)}let i=t[0];"function"==typeof i&&(i=i(o,n),i===o)||void 0===r&&null==i||(i=_e(i),void 0===r||ke(o)&&ke(i)&&!Array.isArray(i)?function(e,t){const n=Object.keys(t);for(let r=0;r<n.length;r+=1){const o=n[r];Le(e,o,t[o])}}(o,i):Le(e,r,i))}function Ne(e,t){const n=_e(e||{});return[we(n),function(...e){v((()=>$e(n,e)))}]}const Me=w([{path:"start"},{}]);function Ee(e){const t=location.hash.replace(/#/,"")||"start",[n,r]=Ne({path:t,allLanguages:!0});window.addEventListener("popstate",(e=>{const t=e.target.location.hash.replace(/#/,"");r({...n,path:t})}));const o=[n,{apiUrl:e.values.api,setAllLanguages:e=>r({allLanguages:e})}];return H(Me.Provider,{value:o,get children(){return e.children}})}let Pe={data:""},je=e=>"object"==typeof window?((e?e.querySelector("#_goober"):window._goober)||Object.assign((e||document.head).appendChild(document.createElement("style")),{innerHTML:" ",id:"_goober"})).firstChild:e||Pe,Te=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(})/g,ze=/\/\*[^]*?\*\/|\s\s+|\n/g,De=(e,t)=>{let n,r="",o="",i="";for(let l in e){let a=e[l];"object"==typeof a?(n=t?t.replace(/([^,])+/g,(e=>l.replace(/([^,])+/g,(t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)))):l,o+="@"==l[0]?"f"==l[1]?De(a,l):l+"{"+De(a,"k"==l[1]?"":t)+"}":De(a,n)):"@"==l[0]&&"i"==l[1]?r=l+" "+a+";":(l=l.replace(/[A-Z]/g,"-$&").toLowerCase(),i+=De.p?De.p(l,a):l+":"+a+";")}return i[0]?(n=t?t+"{"+i+"}":i,r+n+o):r+o},Oe={},Ie=e=>{let t="";for(let n in e)t+=n+("object"==typeof e[n]?Ie(e[n]):e[n]);return t},qe=(e,t,n,r,o)=>{let i="object"==typeof e?Ie(e):e,l=Oe[i]||(Oe[i]=(e=>{let t=0,n=11;for(;t<e.length;)n=101*n+e.charCodeAt(t++)>>>0;return"go"+n})(i));if(!Oe[l]){let t="object"==typeof e?e:(e=>{let t,n=[{}];for(;t=Te.exec(e.replace(ze,""));)t[4]&&n.shift(),t[3]?n.unshift(n[0][t[3]]=n[0][t[3]]||{}):t[4]||(n[0][t[1]]=t[2]);return n[0]})(e);Oe[l]=De(o?{["@keyframes "+l]:t}:t,n?"":"."+l)}return((e,t,n)=>{-1==t.data.indexOf(e)&&(t.data=n?e+t.data:t.data+e)})(Oe[l],t,r),l},Be=(e,t,n)=>e.reduce(((e,r,o)=>{let i=t[o];if(i&&i.call){let e=i(n),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;i=t?"."+t:e&&"object"==typeof e?e.props?"":De(e,""):e}return e+r+(null==i?"":i)}),"");function Fe(e){let t=this||{},n=e.call?e(t.p):e;return qe(n.unshift?n.raw?Be(n,[].slice.call(arguments,1),t.p):n.reduce(((e,n)=>n?Object.assign(e,n.call?n(t.p):n):e),{}):n,je(t.target),t.g,t.o,t.k)}Fe.bind({g:1});let He=Fe.bind({k:1});const Re=w();function Ue(e){let t=this||{};return(...n)=>{const r=r=>{const o=K(r,{theme:k(Re)}),i=K(o,{get className(){const e=o.className,r="className"in o&&/^go[0-9]+/.test(e);return[e,Fe.apply({target:t.target,o:r,p:o,g:t.g},n)].filter(Boolean).join(" ")}}),[l,a]=function(e,...t){const n=new Set(t.flat()),r=Object.getOwnPropertyDescriptors(e),o=t.map((t=>{const n={};for(let o=0;o<t.length;o++){const i=t[o];Object.defineProperty(n,i,r[i]?r[i]:{get:()=>e[i]})}return n}));return o.push(new Proxy({get:t=>n.has(t)?void 0:e[t],has:t=>!n.has(t)&&t in e,keys:()=>Object.keys(e).filter((e=>!n.has(e)))},U)),o}(i,["as"]),s=l.as||e;let d;var c,u,p,g;return"function"==typeof s?d=s(a):(d=document.createElement(s),c=d,"function"==typeof(u=a)?h((e=>ge(c,u(),e,p,g))):ge(c,u,void 0,p,g)),d};return r.className=e=>y((()=>Fe.apply({target:t.target,p:e,g:t.g},n))),r}}const Ke=Ue("nav")`
    color: black;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 2rem;
`,We=Ue("a")`
    font-size: 14px;
    display: block;
    padding: 0 1rem;
`,Je=()=>(k(Me),H(Ke,{get children(){return[H(We,{href:"#start",children:"Start"}),H(We,{href:"#sync-check",children:"Sync Check"}),H(We,{href:"#sync-draft",children:"Sync Draft"}),H(We,{href:"#sync-live",children:"Sync Live"}),H(We,{href:"#debug",children:"Menus Debug"})]}})),Qe=async(e,t={})=>new Promise(((n,r)=>{jQuery.ajax({url:"/wp-admin/admin-ajax.php",type:"post",dataType:"json",data:{action:e,...t},success:function(e){n(e)},error:(e,t)=>{r(t)}})})),Ve=async(e,t)=>new Promise(((n,r)=>{jQuery.ajax({url:e,type:t?"post":"get",dataType:"json",data:t,success:function(e){n(e)},error:(e,t)=>{r(e.responseJSON)}})})),Xe=Ue("div")`
    background-color: white;
    padding: 1.0rem 2rem 2rem;
    border: 3px solid #ccc;
    border-radius: 3px;
    min-height: 50vh;
`,Ye=e=>H(Xe,{get children(){return e.children}}),Ze=Ue("div")`
    display: flex;
`,Ge=Ue("div")`
    flex: 1;
`,et=Ue("div")`
    width: 220px;
    align-items: center;
    justify-content: center;
    display: flex;
`,tt=Ue("p")`
    font-size: 14px;
    padding-bottom: .5rem;
`,nt=Ue("div")`
    font-size: 40px;
    font-weight: bold;
    text-align: center;
    width: 100%;
    padding: 3rem 0 2rem;
`,rt=Ue("h2")`
    font-size: 24px;
    margin-bottom: .5rem;
`,ot=Ue("h3")`
    font-size: 18px;
    margin-bottom: .5rem;
    margin-top: 0px;
`,it=e=>H(Ze,{get children(){return[H(Ge,{get children(){return[H(rt,{get children(){return e.title}}),H(tt,{get children(){return e.description}})]}}),H(et,{get children(){return e.actions}})]}});Ue("svg")`
    margin: auto; 
    background: white;
    display: block; 
    shape-rendering: auto;
    width: ${e=>e.width};
    height: ${e=>e.height};
`,Ue("svg")`
    margin: auto; 
    background: rgb(255, 255, 255); 
    display: block; 
    shape-rendering: auto;
`;const lt=re('<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="200px" height="200px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid"><circle cx="50" cy="50" r="32" stroke-width="8" stroke-dasharray="50.26548245743669 50.26548245743669" fill="none" stroke-linecap="round"><animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="2.0408163265306123s" keyTimes="0;1" values="0 50 50;360 50 50"></animateTransform></circle></svg>'),at={small:"20px",medium:"30px",large:"50px",xlarge:"100px"},st=({size:e="large",inverted:t=!1})=>{let n={display:"block","shape-rendering":"auto",width:at[e],height:at[e],stroke:"#006ba1"};return t&&(n.stroke="#fff"),(()=>{const e=lt.cloneNode(!0);return de(e,n),e})()},dt=Ue("button")`
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

    ${e=>e.leftMargin?"\n        margin-left: 20px;\n    ":""};

    ${e=>e.disabled?"\n        cursor: default;\n        border: 1px solid rgb(220, 220, 222);\n        color: #a7aaad;\n        background-color: #f6f7f7;\n        &:hover {\n            background-color: #f6f7f7;\n            cursor: default;\n        }\n    ":""};

`,ct=Ue("div")`
    position: absolute;
    right: 7px;
`,ut=e=>H(dt,K(e,{get children(){return[G((()=>e.children)),H(J,{get when(){return e.loading},get children(){return H(ct,{get children(){return H(st,{size:"small",get inverted(){return!e.disabled}})}})}})]}})),pt=Ue("div")`
    display: flex;
    margin-bottom: 2px;
`,gt=Ue("div")`
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
`,ht=Ue("div")`
    background-color: #2271b1;
    font-size: 10px;
    color: white;
    padding: 0px 4px 0px 4px;
    height: 16px;
    line-height: 15px;
    margin: 0 5px 0 0;
    border-radius: 2px;
    cursor: pointer;
`,ft=Ue("a")`
    display: block;
    color: grey;
    text-decoration: none;
`,bt=Ue("div")`
    padding: 0 5px 0 0;
    svg {
        fill: ${e=>e.color};
        transition: fill .2s ease-in;
    }
`,vt=re('<svg height="10" width="10"><circle cx="5" cy="5" r="5" stroke-width="0"></circle></svg>'),yt=({showCheckButton:e,showSyncButton:t,showDraft:n,showLive:r,item:o,onClick:i,onTypeClick:l})=>{const a=(e,t)=>{let n="#bbbbbb";return"error"===t?n="#da694b":""===t?n="#bbbbbb":e&&(n=e.synced?"#99da4b":"#e9da4e"),n};return H(pt,{get children(){return[H(J,{when:n,get children(){return H(bt,{get color(){var e,t;return a(null===(e=o.status)||void 0===e?void 0:e.draft,null===(t=o.status)||void 0===t?void 0:t.state)},get children(){return vt.cloneNode(!0)}})}}),H(J,{when:r,get children(){return H(bt,{get color(){var e,t;return a(null===(e=o.status)||void 0===e?void 0:e.live,null===(t=o.status)||void 0===t?void 0:t.state)},get children(){return vt.cloneNode(!0)}})}}),H(J,{when:t,get children(){return H(ht,{onClick:i,children:"sync"})}}),H(J,{when:e,get children(){return H(ht,{onClick:i,children:"check"})}}),H(gt,{onClick:()=>l(o.type),get children(){return o.type}}),H(ft,{target:"_new",get href(){return o.permalink},get children(){return o.permalink||"/"}})]}})},mt=re('<div style="padding-bottom:10px;"><label for="filter">Filter</label><input type="text" name="filter"><label for="all-languages" style="margin-left:20px;"><input type="checkbox" id="all-languages">All Languages</label></div>'),xt=re("<div></div>"),wt=({type:e})=>{const[t,{apiUrl:n,setAllLanguages:r}]=k(Me),[o,i]=Ne({list:[]}),[l,a]=Ne({list:[]}),[s,d]=g(!1),[c,u]=g(!1);f((async()=>{const e=(await Qe("get_all_resources",{all_languages:t.allLanguages})).list.map(((e,t)=>({...e,index:t})));i({list:e}),a({list:e})}));const p=async(t,{syncTreeAndCache:r=!0})=>{try{(await Ve(`${n}/sync.php`,{action:"sync",permalink:t.permalink,release:e,sync_check:!1,sync_tree:r})).data?i("list",t.index,"status",{[e]:{synced:!0},state:"loaded"}):i("list",t.index,"status",{state:"error"})}catch(e){i("list",t.index,"status",{state:"error"})}},b=e=>{(e=>{if(""===e)return void a({list:o.list});const t=o.list.filter((t=>t.permalink.startsWith(e)));a({list:t})})(e.target.value)},v="draft"===e?"Begin to sync to Draft":"Publish list to Live",y="draft"===e?"Sync Draft":"Sync Live",m="draft"===e?"This is where you can make sure that wordpress and the draft content is in sync":"This is where you can make sure that Draft and Live are in sync";return H(Ye,{get children(){return[H(it,{title:y,description:m,get actions(){return(()=>{const t=xt.cloneNode(!0);return ce(t,H(ut,{get loading(){return s()},onClick:()=>(async t=>{if(s())return;let n=!1;if(("live"===e&&confirm("Do you really want to publish the list?")||"draft"===e)&&(n=!0),n){d(!0),l.list.forEach(((e,t)=>{a("list",t,"status",{state:""}),t++}));for await(let e of l.list)await p(e,t);d(!1)}})({syncTreeAndCache:!1}),children:v}),null),ce(t,H(ut,{get loading(){return c()},onClick:()=>(async()=>{try{u(!0);const t=await Ve(`${n}/recreate-tree.php`,{action:"recreate_tree",release:e});u(!1),window&&console.log(t),window&&window.alert("Recreating tree done - check console.log for response")}catch(e){window&&window.alert("Error recreating tree - check console.log")}})(),children:"Recreate tree, required after type/all syncs"}),null),t})()}}),(()=>{const e=mt.cloneNode(!0),n=e.firstChild.nextSibling,o=n.nextSibling.firstChild;return n.$$input=b,o.addEventListener("change",(e=>r(e.target.checked))),h((e=>{const r=s(),i=t.allLanguages,l=s();return r!==e._v$&&(n.disabled=e._v$=r),i!==e._v$2&&(o.checked=e._v$2=i),l!==e._v$3&&(o.disabled=e._v$3=l),e}),{_v$:void 0,_v$2:void 0,_v$3:void 0}),e})(),H(W,{get each(){return l.list},children:t=>H(yt,{showDraft:"draft"===e,showLive:"live"===e,showSyncButton:!0,onClick:()=>(async(e,t)=>{d(!0),await p(e,t),d(!1)})(t,{syncTreeAndCache:!0}),onTypeClick:()=>(async(e,t)=>{d(!0);const n=l.list.filter((t=>t.type===e));n.forEach(((e,t)=>{a("list",t,"status",{state:""}),t++}));for await(let e of n)await p(e,t);d(!1)})(t.type,{syncTreeAndCache:!1}),item:t,get permalink(){return t.permalink}})})]}})};oe(["input"]);const kt=re('<div style="padding-bottom:10px;"><label for="all-languages"><input type="checkbox" id="all-languages">All Languages</label></div>'),_t=()=>{const[e,{apiUrl:t,setAllLanguages:n}]=k(Me),[r,o]=Ne({list:[]}),[i,l]=g(!1);f((async()=>{const t=(await Qe("get_all_resources",{all_languages:e.allLanguages})).list.map(((e,t)=>({...e,index:t})));o({list:t})}));const a=async e=>{try{const n=await Ve(`${t}/check-sync.php`,{permalink:e.permalink});o("list",e.index,"status",{draft:n.data.resourceStatus.find((e=>"draft"===e.target&&"__original"===e.comparedTo)),live:n.data.resourceStatus.find((e=>"live"===e.target&&"draft"===e.comparedTo)),state:"loaded"})}catch(t){o("list",e.index,"status",{state:"error"})}};return H(Ye,{get children(){return[H(it,{title:"Sync Check",description:"This is where you can check if all content is in sync",get actions(){return H(ut,{get loading(){return i()},onClick:()=>(async()=>{if(!i()){l(!0),r.list.forEach(((e,t)=>{o("list",t,"status",{state:""}),t++}));for await(let e of r.list)await a(e);l(!1)}})(),children:"Begin to check"})}}),(()=>{const t=kt.cloneNode(!0),r=t.firstChild.firstChild;return r.addEventListener("change",(e=>n(e.target.checked))),h((t=>{const n=e.allLanguages,o=i();return n!==t._v$&&(r.checked=t._v$=n),o!==t._v$2&&(r.disabled=t._v$2=o),t}),{_v$:void 0,_v$2:void 0}),t})(),H(W,{get each(){return r.list},children:e=>H(yt,{showDraft:!0,showLive:!0,showCheckButton:!0,item:e,get permalink(){return e.permalink},onClick:()=>(async e=>{l(!0),await a(e),l(!1)})(e),onTypeClick:()=>(async e=>{l(!0);const t=r.list.filter((t=>t.type===e));t.forEach(((e,t)=>{o("list",t,"status",{state:""}),t++}));for await(let e of t)await a(e);l(!1)})(e.type)})})]}})},St=Ue("p")`
    font-size: 14px;
    padding-bottom: .5rem;
    background-color: #ffeaee;
    border: 2px solid #ffc0cb;
    border-radius: 3px;
    padding: 1rem 2rem;
    text-align: center;
`,Ct=()=>H(Ye,{get children(){return[H(it,{title:"Start",description:"This plugin lets you control and debug content through the content service."}),H(St,{children:"This is mainly used while developing or by admins!"})]}}),At=re('<tr><td colspan="8" style="padding: 20px; text-align: center; color: #999; font-style: italic;"></td></tr>'),Lt=re('<div style="overflow-x: auto;"><table style="width: 100%; background: white; border-collapse: collapse; font-size: 13px;"><thead><tr style="background: #f8f8f8; border-bottom: 2px solid #ddd;"><th style="padding: 12px; text-align: left; font-weight: 600;">Language</th><th style="padding: 12px; text-align: left; font-weight: 600;">WP Menu ID</th><th style="padding: 12px; text-align: left; font-weight: 600;">WP Menu Name</th><th style="padding: 12px; text-align: left; font-weight: 600;">WP Permalink</th><th style="padding: 12px; text-align: left; font-weight: 600;">Draft ExternalId</th><th style="padding: 12px; text-align: left; font-weight: 600;">Draft Key</th><th style="padding: 12px; text-align: left; font-weight: 600;">Live ExternalId</th><th style="padding: 12px; text-align: left; font-weight: 600;">Live Key</th></tr></thead><tbody></tbody></table></div>'),$t=re('<tr style="border-bottom: 1px solid #eee;"><td style="padding: 10px; font-weight: 500;"></td><td style="padding: 10px; font-family: monospace;"></td><td style="padding: 10px;"></td><td style="padding: 10px; font-family: monospace; font-size: 11px; color: #666;"></td><td style="padding: 10px; font-family: monospace; font-size: 11px;"></td><td style="padding: 10px; font-family: monospace; font-size: 11px; color: #666;"></td><td style="padding: 10px; font-family: monospace; font-size: 11px;"></td><td style="padding: 10px; font-family: monospace; font-size: 11px; color: #666;"></td></tr>'),Nt=re('<span style="color: #999; font-style: italic;">NULL</span>'),Mt=re('<div style="padding: 20px; text-align: center; background: white; border: 1px solid #ddd; border-radius: 4px;">Loading debug data...</div>'),Et=re('<div style="padding: 20px; text-align: center; background: #fff3cd; border: 1px solid #ffc107; border-radius: 4px;"><strong>⚠️ Failed to load debug data</strong><p style="margin: 5px 0 0 0; font-size: 12px;"></p></div>'),Pt=re('<div style="padding: 20px; background: #f0f0f0; border: 1px solid #ccc; border-radius: 4px; margin-bottom: 20px;"><h3 style="margin-top: 0; font-size: 14px; font-weight: bold;">🔍 Current Header Menu Assignments (Language-Specific)</h3><p style="margin: 0 0 15px 0; font-size: 12px; color: #666;">Menus stored in cerberus_nav_menus_[lang] options with language suffix</p></div>'),jt=re('<div style="padding: 20px; text-align: center; background: white; border: 1px solid #ddd; border-radius: 4px;">Loading legacy data...</div>'),Tt=re('<div style="padding: 20px; text-align: center; background: white; border: 1px solid #ddd; border-radius: 4px;"><span style="color: #999; font-style: italic;">Failed to load legacy data</span></div>'),zt=re('<div style="padding: 20px; background: #fff3cd; border: 1px solid #ffc107; border-radius: 4px;"><h3 style="margin-top: 0; font-size: 14px; font-weight: bold;">⚠️ Legacy Header Menu Assignments (Pre-WPML FIXES)</h3><p style="margin: 0 0 15px 0; font-size: 12px; color: #856404;"><strong>LEGACY:</strong> Menus stored in theme_mods_rawb option WITHOUT language suffix. This was used before language-specific storage was implemented.</p></div>'),Dt=()=>{const[e,t]=g(null),[n,r]=g(null),[o,i]=g(!1),[l,a]=g(null);f((async()=>{await s()}));const s=async()=>{i(!0),a(null);try{const e=await Qe("get_header_menus_debug",{});t(e),console.log("Header menu debug data:",e);const n=await Qe("get_header_menus_legacy_debug",{});r(n),console.log("Legacy header menu debug data:",n)}catch(e){console.error("Failed to load header menu debug data:",e),a((null==e?void 0:e.message)||"Failed to load data"),t(null),r(null)}finally{i(!1)}},d=e=>(()=>{const t=Lt.cloneNode(!0),n=t.firstChild.firstChild.nextSibling;return ce(n,H(W,{get each(){return e.menus||[]},children:e=>(()=>{const t=$t.cloneNode(!0),n=t.firstChild,r=n.nextSibling,o=r.nextSibling,i=o.nextSibling,l=i.nextSibling,a=l.nextSibling,s=a.nextSibling,d=s.nextSibling;return ce(n,(()=>e.language)),ce(r,(()=>e.wp_menu_id)),ce(o,(()=>e.wp_menu_name)),ce(i,(()=>e.wp_permalink)),ce(l,(()=>e.draft_external_id||Nt.cloneNode(!0))),ce(a,(()=>e.draft_key||Nt.cloneNode(!0))),ce(s,(()=>e.live_external_id||Nt.cloneNode(!0))),ce(d,(()=>e.live_key||Nt.cloneNode(!0))),t})()}),null),ce(n,H(J,{get when(){var t;return 0===(null===(t=e.menus)||void 0===t?void 0:t.length)},get children(){const t=At.cloneNode(!0);return ce(t.firstChild,(()=>e.emptyMessage||"No header_menu assignments found")),t}}),null),t})();return H(Ye,{get children(){return[H(it,{title:"Menus Debug",description:"View all header_menu assignments and their sync status in draft/live",get actions(){return H(ut,{onClick:s,get loading(){return o()},children:"Refresh Data"})}}),(()=>{const t=Pt.cloneNode(!0);return t.firstChild.nextSibling,ce(t,H(J,{get when(){return o()},get children(){return Mt.cloneNode(!0)}}),null),ce(t,(()=>{const t=G((()=>!o()),!0);return H(J,{get when(){return t()&&e()},get children(){return H(d,{get menus(){var t;return null===(t=e())||void 0===t?void 0:t.menus}})}})})(),null),ce(t,(()=>{const t=G((()=>!o()),!0);return H(J,{get when(){return t()&&(l()||!e())},get children(){const e=Et.cloneNode(!0);return ce(e.firstChild.nextSibling,(()=>l()||"Check browser console for errors")),e}})})(),null),t})(),(()=>{const e=zt.cloneNode(!0);return e.firstChild.nextSibling,ce(e,H(J,{get when(){return o()},get children(){return jt.cloneNode(!0)}}),null),ce(e,(()=>{const e=G((()=>!o()),!0);return H(J,{get when(){return e()&&n()},get children(){return H(d,{get menus(){var e;return null===(e=n())||void 0===e?void 0:e.menus},emptyMessage:"No legacy header_menu assignments found"})}})})(),null),ce(e,(()=>{const e=G((()=>!o()),!0);return H(J,{get when(){return e()&&(l()||!n())},get children(){return Tt.cloneNode(!0)}})})(),null),e})()]}})},Ot=Ue("div")`
     color: black;
     max-width: 1200px;
     margin: 0 auto;
`;Ue("div")`
`,Ue("div")`
    font-size: 1rem;
    padding: 1rem 0;
`;const It=()=>{const[e]=k(Me);return H(Ot,{get children(){return[H(nt,{children:"Content Dashboard"}),H(Je,{}),H(J,{get when(){return"start"===e.path},get children(){return H(Ct,{})}}),H(J,{get when(){return"sync-check"===e.path},get children(){return H(_t,{})}}),H(J,{get when(){return"sync-draft"===e.path},get children(){return H(wt,{type:"draft"})}}),H(J,{get when(){return"sync-live"===e.path},get children(){return H(wt,{type:"live"})}}),H(J,{get when(){return"debug"===e.path},get children(){return H(Dt,{})}})]}})},qt=Ue("div")`

    padding-top: 6px;

    ${e=>e.horizontal?"\n        display: flex;   \n        align-items: center;\n        border-bottom: 1px dotted grey;\n        padding: 0 10px 8px 10px;\n        margin-left: -10px;\n        margin-right: -10px;\n        justify-content: flex-end;\n    ":""} 

    ${e=>e.box?"\n        position: relative;\n        min-width: 255px;\n        border: 1px solid #ccd0d4;\n        box-shadow: 0 1px 1px rgb(0 0 0 / 4%);\n        background: #fff;\n        padding: 1rem;\n        box-sizing: border-box;\n        margin-bottom: 7px;\n    ":""}

`,Bt=Ue("div")`
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

`,Ft=Ue("div")`
    text-align: center;
    min-width: 100px;
    ${e=>e.horizontal?"\n        margin-top: 10px;\n    ":""}

`,Ht=({options:e})=>{const[t,n]=Ne({}),[r,o]=g(!0),[i,l]=g(!1),[a,s]=g(!1),[d,c]=g(!1),[u,p]=g(!1),[h,b]=g(!1),[v,y]=g(!1),[x,w]=g(!1),[k,S]=g(!1),C={permalink:e.permalink};let A,L;f((()=>{if(e.metaMenu){L=document.querySelector("#save_menu_footer");const e=N();m((()=>{e&&e()}))}else{var t,n;null!==(t=wp)&&void 0!==t&&null!==(n=t.data)&&void 0!==n&&n.select&&(A=wp.data.select("core/editor"),wp.domReady($))}})),f((()=>{wp&&wp.hooks&&wp.hooks.addAction&&(P(),wp.hooks.addAction("dls.post-saved","dls",(()=>{var e,n,r;if(null!=t&&null!==(e=t.draft)&&void 0!==e&&e.exists||null===(n=A)||void 0===n||!n.isPublishingPost())null!=t&&null!==(r=t.draft)&&void 0!==r&&r.exists&&($(),P());else{const{isSavingPost:e}=A;let t=0;const n=setInterval((()=>{(!e()||t>=50)&&(location.reload(),clearInterval(n))}),100)}})))})),f((()=>{let e,t;const n=n=>{var r;if(null!=n&&null!==(r=n.detail)&&void 0!==r&&r.hasChange){if(!e){if(e=document.querySelector(".editor-post-publish-button"),!e)return;t=()=>{y(!1),e.setAttribute("disabled",!0)},e.addEventListener("click",t)}e&&(y(!0),e.removeAttribute("disabled"))}};document.addEventListener("cerberusListenerEvent",n),m((()=>{document.removeEventListener("cerberusListenerEvent",n),e&&t&&e.removeEventListener("click",t)}))}));const $=()=>{let e;const t=wp.data.subscribe(_.debounce((()=>{if(e||(e=document.querySelector(".editor-post-publish-button")),!e)return;const n=A.isEditedPostDirty(),r=A.hasNonPostEntityChanges(),o=v();r||n||o?(p(!0),e.removeAttribute("disabled"),t()):(p(!1),e.setAttribute("disabled",!0))}),100))},N=()=>{let e,t=!1;L.setAttribute("disabled",!0);let n=()=>{t||clearInterval(e)},r=()=>{t||(e=o())};const o=()=>setInterval((()=>{var o,i;null!==(o=window)&&void 0!==o&&null!==(i=o.wpNavMenu)&&void 0!==i&&i.menusChanged&&(t=!0,M(),clearInterval(e),window.removeEventListener("blur",n),window.removeEventListener("focus",r))}),500);return e=o(),window.addEventListener("blur",n),window.addEventListener("focus",r),()=>{clearInterval(e),window.removeEventListener("blur",n),window.removeEventListener("focus",r)}},M=()=>{L.removeAttribute("disabled"),b(!0)},E=(e,t)=>{let n=document.querySelector(".changes-disabled-message");t?n?n.innerHTML=t:(n=document.createElement("i"),n.classList.add("changes-disabled-message"),n.innerHTML=t,e.prepend(n)):n&&n.parentNode.removeChild(n)},P=async(t=!0)=>{t&&o(!0);try{var r;const t=await Qe("check_sync",{...C,api_path:C.permalink});if(null==t||null===(r=t.data)||void 0===r||!r.resourceStatus)throw C;n({draft:t.data.resourceStatus.find((e=>"draft"===e.target&&"__original"===e.comparedTo)),live:t.data.resourceStatus.find((e=>"live"===e.target&&"draft"===e.comparedTo)),state:"loaded"}),S(!1),e.metaMenu&&j()}catch(e){console.log("--- meta-box --- Can't find any data with check-sync of payload: ",e),S(!0),o(!1),n({state:"error"})}o(!1)},j=async()=>{var n;const r=document.querySelectorAll(".menu-theme-locations > .menu-settings-input"),o=document.querySelector(".menu-settings-group.menu-theme-locations"),i=null===(n=t.draft)||void 0===n?void 0:n.exists,l=t.live&&t.live.exists;((e,t)=>{t?(e.style.pointerEvents="none",e.style.cursor="not-allowed",e.style.opacity=.5):(e.style.pointerEvents="auto",e.style.cursor="default",e.style.opacity=1)})(o,!i||l),E(o,l?"Menu must be unpublished before toggling location":i?null:"Menu must be created before toggling location");const{currentMenuIsRegisteredToLocation:a,locationsSetToOtherMenus:s}=(t=>{let n=!1,r=!1;for(let i of t){const t=i.querySelector("input");if(t.dataset.cerberusListenerAdded||(t.addEventListener("change",(()=>{c(!0),M()})),t.dataset.cerberusListenerAdded="true"),i.querySelector(".theme-location-set")){var o;const n=null===(o=t.name.match(/menu-locations\[([^\]]+)\]/))||void 0===o?void 0:o[1];e.locationLanguages&&n&&e.locationLanguages[n]===e.currentLanguage?(t.setAttribute("disabled",!0),i.style.pointerEvents="none",i.style.opacity=.5,r=!0):(t.removeAttribute("disabled"),i.style.pointerEvents="auto",i.style.opacity=1)}t.getAttribute("checked")&&(n=!0)}return{currentMenuIsRegisteredToLocation:n,locationsSetToOtherMenus:r}})(r);s&&!l&&i&&E(o,"Some locations cannot be set because they are already set"),location.search.includes("menu=0")||(w(!0),(e=>{const t=document.querySelector(".submitdelete.deletion.menu-delete");if(!t)return;let n=document.querySelector(".delete-link-replacement");e?(t.style.display="none",n?n.style.display="inline":(n=document.createElement("span"),n.classList.add("delete-link-replacement"),n.innerHTML="To delete a menu it must be unpublished (and unregisterered from all display locations)",n.style.color="#a7aaad",n.style.fontSize="12px",t.parentNode.prepend(n))):(t.style.display="inline",n&&(n.style.display="none"))})(a||l))},T=(e={})=>{if(document){const t=new CustomEvent("cerberusChangeEvent",{detail:e});document.dispatchEvent(t)}},z=async e=>{e.preventDefault(),e.stopPropagation(),l(!0);(await Qe("publish_to_live",C)).data?P(!1):n({state:"error"}),l(!1),T({action:"publish_to_live_done"})},D=async e=>{e.preventDefault(),e.stopPropagation(),s(!0);(await Qe("unpublish_from_live",C)).data?P(!1):n({state:"error"}),s(!1),T({action:"unpublish_from_live_done"})};return H(qt,{get horizontal(){return e.metaMenu},get box(){return e.optionsMeta},get children(){return[H(J,{get when(){return r()},get children(){return H(Bt,{get horizontal(){return e.metaMenu},get children(){return[H(st,{get size(){return e.metaMenu?"small":"large"}}),H(Ft,{children:"Checking content in draft and live"})]}})}}),H(J,{get when(){return!r()},get children(){return[H(J,{get when(){return k()},get children(){return H(Bt,{get horizontal(){return e.metaMenu},get children(){return H(Ft,{children:"Content must be saved before publishing"})}})}}),H(J,{get when(){var e;return!d()&&(null===(e=t.draft)||void 0===e?void 0:e.exists)},get children(){return[H(Ft,{get horizontal(){return e.metaMenu},children:"Publish content"}),H(J,{get when(){var e;return!(null!==(e=t.live)&&void 0!==e&&e.exists)},get children(){return[H(ut,{get leftMargin(){return e.metaMenu},get loading(){return i()},onClick:e=>z(e),get disabled(){return u()||h()||v()},get children(){return u()||h()||v()?"Save draft before publishing to live":"Publish to live site"}}),H(ut,{get leftMargin(){return e.metaMenu},get disabled(){var e;return!(null!==(e=t.live)&&void 0!==e&&e.synced)},children:"Content not published"})]}}),H(J,{get when(){var e;return null===(e=t.live)||void 0===e?void 0:e.exists},get children(){return[H(ut,{get leftMargin(){return e.metaMenu},get loading(){return i()},onClick:e=>z(e),get disabled(){var e;return(null===(e=t.live)||void 0===e?void 0:e.synced)||u()||h()||v()},get children(){var e;return u()||h()||v()?"Save draft before updating on live":null!==(e=t.live)&&void 0!==e&&e.synced?"Updated on live site":"Update on live site"}}),H(ut,{get leftMargin(){return e.metaMenu},get loading(){return a()},onClick:e=>D(e),get disabled(){return v()},children:"Unpublish"})]}})]}}),H(J,{get when(){return e.metaMenu},get children(){return H(Bt,{get horizontal(){return e.metaMenu},get children(){return[H(J,{get when(){return!x()},get children(){return H(Ft,{children:"Enter a 'Menu Name' above to create a new menu"})}}),(()=>{const e=G((()=>{var e;return!(d()||null!==(e=t.draft)&&void 0!==e&&e.exists)}),!0);return H(J,{get when(){return e()&&x()},get children(){return H(Ft,{children:"Save menu with menu items in order to publish"})}})})(),H(J,{get when(){return d()},get children(){return H(Ft,{children:"Save the changes before publishing"})}})]}})}})]}}),H(J,{get when(){return e.enableTestContent},get children(){return H(ut,{get leftMargin(){return e.metaMenu},get loading(){return a()},onClick:e=>D(e),get disabled(){var e;return!(null!==(e=t.test)&&void 0!==e&&e.synced)},get children(){return t.test&&t.test.synced?"Unpublish from test target":"Publish to test target"}})}}),H(J,{get when(){return e.enableDiffButton},get children(){return H(ut,{get leftMargin(){return e.metaMenu},children:"Show diff (raw)"})}})]}})},Rt=Ue("input")`
`,Ut=Ue("div")`
    display: flex;
    flex-direction: column;
    width: 100%;
    padding-right: 10px;
    box-sizing: border-box;
`,Kt=Ue("label")`
    padding: 5px 5px 0px 5px;
    font-size: 10px;
    height: 18px;
`,Wt=({placeholder:e="",label:t=" ",value:n,onChange:r=(()=>{})})=>{const o=e=>{r(e.target.value)};return H(Ut,{get children(){return[H(Kt,{children:t}),H(Rt,{type:"text",get value(){return n()},placeholder:e,onKeyup:o})]}})},Jt=Ue("select")`
    max-width: 100% !important;
`,Qt=Ue("div")`
    display: flex;
    flex-direction: column;
    width: 100%;
    padding-left: 10px;
    box-sizing: border-box;
`,Vt=Ue("label")`
    padding: 5px 5px 0px 5px;
    font-size: 10px;
    height: 18px;
`,Xt=re("<option></option>"),Yt=({options:e=[],placeholder:t="",label:n=" ",value:r,onChange:o=(()=>{})})=>{const i=e=>{console.log(e),o(e.target.value)};return H(Qt,{get children(){return[H(Vt,{children:n}),H(Jt,{get value(){return r()},placeholder:t,onChange:i,get children(){return H(W,{each:e,children:e=>(()=>{const t=Xt.cloneNode(!0);return ce(t,(()=>e.label)),h((n=>{const o=e.value,i=e.value===r();return o!==n._v$&&(t.value=n._v$=o),i!==n._v$2&&(t.selected=n._v$2=i),n}),{_v$:void 0,_v$2:void 0}),t})()})}})]}})},Zt={open:He`
    0% {
        max-height: 0;
    }
    100% {
        max-height: 300px;
    }
`,close:He`
    0% {
        max-height: 300px;
    }
    100% {
        max-height: 0;
    }
`,init:He`
    0% {
        max-height: 0;
    }
    100% {
        max-height: 0;
    }
`},Gt=Ue("div")`
     color: black;
     max-width: 1200px;
     margin: 0 auto;
`;Ue("div")`
`,Ue("div")`
    font-size: 1rem;
    padding: 1rem 0;
`;const en=Ue("div")`
    display: flex;
    justify-content: flex-end;
`,tn=Ue("div")`
    max-height: 0px;
    overflow: hidden;
    ${e=>`animation: ${Zt[e.state]} .4s ease-in-out forwards;`}
`,nn=Ue("div")`
    background-color: #fff;
    border: 1px solid #aaa;
    border-radius: 3px;
    margin-top: 20px;
    padding: 20px;
`,rn=Ue("div")`
    width: 100%;
    display: flex;
    padding-bottom: 10px;
`,on=Ue("div")`
    width: 100%;
    display: flex;
    justify-content: flex-end;
`,ln=Ue("div")`
    color red;
`,an=Ue("div")`
    background-color: red;
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
`;Ue("div")`
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
`;const sn=Ue("table")`
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
`,dn=Ue("td")`
    display: flex;
    justify-content: flex-start;
`,cn=Ue("div")`
    margin-left: 2rem;
`,un=re("<thead><tr><th>Domain</th><th>Distribution ID</th><th>Target</th><th>SiteId</th><th>Delete</th><th>Do not index</th></tr></thead>"),pn=re("<tbody></tbody>"),gn=re('<input type="checkbox">'),hn=re("<tr><td></td><td></td><td></td><td></td><td></td></tr>"),fn=[{value:"draft",label:"Draft"},{value:"live",label:"Live"},{value:"test",label:"Test"}];const bn=({options:e})=>{const[t,n]=Ne({list:[]}),[r,o]=g(""),[i,l]=g(""),[a,s]=g("draft"),[d,c]=g("init"),[u,p]=g(""),[b,v]=g(!1),y=async()=>{const t=await Ve(`${e.api}/get-domain-settings.php`);t.sort(((e,t)=>e.key.localeCompare(t.key))),n("list",t)},m=async(t=function(e){for(var t="",n="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",r=n.length,o=0;o<e;o++)t+=n.charAt(Math.floor(Math.random()*r));return t}(20))=>{try{const n=function(e){const t=e.match(/^(?:https?:\/\/)?(?:www\.)?([^\/\n]+)/);if(t){const e=t[1];return/^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(e)?e:null}return null}(r());if(null===n)return void p("Invalid domain. Please enter a valid domain without http(s):// or path.");if(p(""),b())return;v(!0),await Ve(`${e.api}/upsert-domain-setting.php`,{domain:n,target:a(),id:t,cloudfrontDistributionId:i()}),await y(),s("draft"),o(""),l(""),v(!1),c("close")}catch(e){console.log("ee",e),"domain-already-exists"===e.error?p("Domain already exists"):p("Something caused an error"),v(!1)}},x=(e,t)=>{"domain"===e&&o(t),"target"===e&&s(t),"cloudfrontDistributionId"===e&&l(t)};f((()=>{y()}));const w=async(n,r)=>{const o=t.list.find((e=>e.externalId===n));o&&(await Ve(`${e.api}/upsert-domain-setting.php`,{domain:o.content.domain,target:o.content.target,id:o.externalId,cloudfrontDistributionId:o.content.cloudfrontDistributionId,doNotIndex:r.doNotIndex}),await y())};return H(Gt,{get children(){return[H(nt,{children:"Domain Settings"}),H(tt,{children:"This is the list of domains and targets that will be used for this site. You can add as many as you need but the domains need to be pointed to the server to make it work."}),H(en,{get children(){return H(ut,{onClick:()=>c("open"),children:"Add new domain and target"})}}),H(tn,{get state(){return d()},get children(){return H(nn,{get children(){return[H(ot,{children:"Add new domain and target"}),H(rn,{get children(){return[H(Wt,{placeholder:"domain",label:"Domain:",value:r,onChange:e=>x("domain",e)}),H(Wt,{placeholder:"distribution id",label:"Cloudfront Distribution ID:",value:i,onChange:e=>x("cloudfrontDistributionId",e)}),H(Yt,{options:fn,value:a,onChange:e=>x("target",e)})]}}),H(J,{when:u,get children(){return H(ln,{children:u})}}),H(on,{get children(){return[H(ut,{onClick:()=>c("close"),children:"Cancel"}),H(ut,{get loading(){return b()},leftMargin:!0,get disabled(){return!r()||!a()},onClick:()=>m(),children:"Save"})]}})]}})}}),H(sn,{get children(){return[un.cloneNode(!0),(()=>{const r=pn.cloneNode(!0);return ce(r,H(W,{get each(){return t.list},children:(r,o)=>(()=>{const i=hn.cloneNode(!0),l=i.firstChild,a=l.nextSibling,s=a.nextSibling,d=s.nextSibling,c=d.nextSibling;return ce(l,(()=>r.content.domain)),ce(a,(()=>r.content.cloudfrontDistributionId)),ce(s,(()=>r.content.target)),ce(d,(()=>r.content.siteId)),ce(i,H(dn,{get children(){return H(an,{onClick:()=>(async t=>{try{await Ve(`${e.api}/delete-domain-setting.php`,{id:t}),await y()}catch(e){console.log(e)}})(r.externalId),children:"delete"})}}),c),ce(c,H(cn,{get children(){const e=gn.cloneNode(!0);return e.addEventListener("change",(e=>{const r=e.target.checked;(async(e,r)=>{v(!0),n("list",e,"content","doNotIndex",r);const o=t.list[e];await w(o.externalId,{...o.content,doNotIndex:r}),v(!1)})(o(),r)})),h((t=>{const n=r.content.doNotIndex,o=b();return n!==t._v$&&(e.checked=t._v$=n),o!==t._v$2&&(e.disabled=t._v$2=o),t}),{_v$:void 0,_v$2:void 0}),e}})),i})()})),r})()]}})]}})},vn=e=>{try{return JSON.parse(document.getElementById(e).innerHTML)}catch(e){return{}}},yn=()=>{let e=document.getElementById("dls-metabox-root");if(e){const t=vn("dls-data");t.metaMenu="nav-menu"===e.getAttribute("data-type"),t.metaMenu&&(e=document.createElement("div"),e&&document.querySelector("#nav-menu-footer").prepend(e)),ne((()=>H(Ht,{options:t})),e)}};jQuery(document).ready((function(e){wp&&wp.data&&wp.data.dispatch&&wp.data.dispatch("core/editor").disablePublishSidebar(),(()=>{if(wp.data){let e=!1,t=!1;wp.data.subscribe((()=>{const n=wp.data.select("core/editor").isSavingPost(),r=wp.data.select("core/editor").isSavingNonPostEntityChanges&&wp.data.select("core/editor").isSavingNonPostEntityChanges();e!==n?(e=n,wp.data.select("core/editor").didPostSaveRequestSucceed()&&wp.hooks.doAction("dls.post-saved")):t!==r&&(t=r,wp.data.select("core/editor").didPostSaveRequestSucceed()&&wp.hooks.doAction("dls.post-saved"))}))}})();let t={};try{t=e("#dls-hooks").length>0?JSON.parse(e("#dls-hooks").html()):{hook:""}}catch(e){}console.log("Current hook",t&&t.hook),"post.php"===t.hook||"post-new.php"===t.hook||"nav-menus.php"===t.hook?yn():t.hook.includes("toplevel_page_draft-live-sync")?(()=>{const e=vn("dls-data");ne((()=>H(Ee,{values:e,get children(){return H(It,{})}})),document.getElementById("dls-root"))})():t.hook.includes("toplevel_page_cerberus-domain-settings")?(()=>{const e=document.getElementById("dls-domain-settings-root"),t=vn("dls-data");ne((()=>H(bn,{options:t})),e)})():t.hook.includes(".php")||yn()}))}();
//# sourceMappingURL=draft-live-sync-boot-0.15.0-dupont.js.map
