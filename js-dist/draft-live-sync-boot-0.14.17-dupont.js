!function(){"use strict";const e=Symbol("solid-proxy"),t={equals:(e,t)=>e===t};let n=P;const r={},o={owned:null,cleanups:null,context:null,owner:null};var i=null;let l=null,s=null,a=null,c=null,d=null,u=0;function p(e,t){t&&(i=t);const n=s,r=i,l=0===e.length?o:{owned:null,cleanups:null,context:null,owner:r};let a;i=l,s=null;try{T((()=>a=e((()=>N(l)))),!0)}finally{s=n,i=r}return a}function h(e,n){n=n?Object.assign({},t,n):t;const o={value:e,observers:null,observerSlots:null,pending:r,comparator:n.equals||void 0};return[S.bind(o),e=>("function"==typeof e&&(e=e(o.pending!==r?o.pending:o.value)),C(o,e))]}function f(e,t,n){A(j(e,t,!1))}function g(e,t,r){n=E;const o=j(e,t,!1);o.user=!0,d&&d.push(o)}function m(e,n,o){o=o?Object.assign({},t,o):t;const i=j(e,n,!0);return i.pending=r,i.observers=null,i.observerSlots=null,i.state=0,i.comparator=o.equals||void 0,A(i),S.bind(i)}function b(e){if(a)return e();let t;const n=a=[];try{t=e()}finally{a=null}return T((()=>{for(let e=0;e<n.length;e+=1){const t=n[e];if(t.pending!==r){const e=t.pending;t.pending=r,C(t,e)}}}),!1),t}function y(e){let t,n=s;return s=null,t=e(),s=n,t}function v(){return s}function w(e){const t=Symbol("context");return{id:t,Provider:q(t),defaultValue:e}}function x(e){return D(i,e.id)||e.defaultValue}function k(e){const t=m(e);return m((()=>O(t())))}function S(){if(this.state&&this.sources){const e=c;c=null,1===this.state?A(this):$(this),c=e}if(s){const e=this.observers?this.observers.length:0;s.sources?(s.sources.push(this),s.sourceSlots.push(e)):(s.sources=[this],s.sourceSlots=[e]),this.observers?(this.observers.push(s),this.observerSlots.push(s.sources.length-1)):(this.observers=[s],this.observerSlots=[s.sources.length-1])}return this.value}function C(e,t,n){return e.comparator&&e.comparator(e.value,t)?t:a?(e.pending===r&&a.push(e),e.pending=t,t):(e.value=t,!e.observers||c&&!e.observers.length||T((()=>{for(let t=0;t<e.observers.length;t+=1){const n=e.observers[t];l,n.observers&&2!==n.state&&L(n),n.state=1,n.pure?c.push(n):d.push(n)}if(c.length>1e6)throw c=[],new Error}),!1),t)}function A(e){if(!e.fn)return;N(e);const t=i,n=s,r=u;s=i=e,function(e,t,n){let r;try{r=e.fn(t)}catch(e){z(e)}(!e.updatedAt||e.updatedAt<=n)&&(e.observers&&e.observers.length?C(e,r):e.value=r,e.updatedAt=n)}(e,e.value,r),s=n,i=t}function j(e,t,n,r){const l={fn:e,state:1,updatedAt:null,owned:null,sources:null,sourceSlots:null,cleanups:null,value:t,owner:i,context:null,pure:n};return null===i||i!==o&&(i.owned?i.owned.push(l):i.owned=[l]),l}function M(e){let t,n=1===e.state&&e;if(e.suspense&&y(e.suspense.inFallback))return e.suspense.effects.push(e);for(;e=e.owner;)2===e.state?t=e:1===e.state&&(n=e,t=void 0);if(t){const e=c;if(c=null,$(t),c=e,!n||1!==n.state)return}n&&A(n)}function T(e,t){if(c)return e();let r=!1;t||(c=[]),d?r=!0:d=[],u++;try{e()}catch(e){z(e)}finally{!function(e){c&&(P(c),c=null);if(e)return;d.length?b((()=>{n(d),d=null})):d=null}(r)}}function P(e){for(let t=0;t<e.length;t++)M(e[t])}function E(e){let t,n=0;for(t=0;t<e.length;t++){const r=e[t];r.user?e[n++]=r:M(r)}const r=e.length;for(t=0;t<n;t++)M(e[t]);for(t=r;t<e.length;t++)M(e[t])}function $(e){e.state=0;for(let t=0;t<e.sources.length;t+=1){const n=e.sources[t];n.sources&&(1===n.state?M(n):2===n.state&&$(n))}}function L(e){for(let t=0;t<e.observers.length;t+=1){const n=e.observers[t];n.state||(n.state=2,n.observers&&L(n))}}function N(e){let t;if(e.sources)for(;e.sources.length;){const t=e.sources.pop(),n=e.sourceSlots.pop(),r=t.observers;if(r&&r.length){const e=r.pop(),o=t.observerSlots.pop();n<r.length&&(e.sourceSlots[o]=n,r[n]=e,t.observerSlots[n]=o)}}if(e.owned){for(t=0;t<e.owned.length;t++)N(e.owned[t]);e.owned=null}if(e.cleanups){for(t=0;t<e.cleanups.length;t++)e.cleanups[t]();e.cleanups=null}e.state=0,e.context=null}function z(e){throw e}function D(e,t){return e&&(e.context&&e.context[t]||e.owner&&D(e.owner,t))}function O(e){if("function"==typeof e&&!e.length)return O(e());if(Array.isArray(e)){const t=[];for(let n=0;n<e.length;n++){const r=O(e[n]);Array.isArray(r)?t.push.apply(t,r):t.push(r)}return t}return e}function q(e){return function(t){let n;var r;return A(j((()=>n=y((()=>(i.context={[e]:t.value},k((()=>t.children)))))),r,!0)),n}}const B=Symbol("fallback");function I(e){for(let t=0;t<e.length;t++)e[t]()}function H(e,t,n={}){let r=[],o=[],l=[],s=0,a=t.length>1?[]:null;var c;return c=()=>I(l),null===i||(null===i.cleanups?i.cleanups=[c]:i.cleanups.push(c)),()=>{let i,c,d=e()||[];return y((()=>{let e,t,h,f,g,m,b,y,v,w=d.length;if(0===w)0!==s&&(I(l),l=[],r=[],o=[],s=0,a&&(a=[])),n.fallback&&(r=[B],o[0]=p((e=>(l[0]=e,n.fallback()))),s=1);else if(0===s){for(o=new Array(w),c=0;c<w;c++)r[c]=d[c],o[c]=p(u);s=w}else{for(h=new Array(w),f=new Array(w),a&&(g=new Array(w)),m=0,b=Math.min(s,w);m<b&&r[m]===d[m];m++);for(b=s-1,y=w-1;b>=m&&y>=m&&r[b]===d[y];b--,y--)h[y]=o[b],f[y]=l[b],a&&(g[y]=a[b]);for(e=new Map,t=new Array(y+1),c=y;c>=m;c--)v=d[c],i=e.get(v),t[c]=void 0===i?-1:i,e.set(v,c);for(i=m;i<=b;i++)v=r[i],c=e.get(v),void 0!==c&&-1!==c?(h[c]=o[i],f[c]=l[i],a&&(g[c]=a[i]),c=t[c],e.set(v,c)):l[i]();for(c=m;c<w;c++)c in h?(o[c]=h[c],l[c]=f[c],a&&(a[c]=g[c],a[c](c))):o[c]=p(u);o=o.slice(0,s=w),r=d.slice(0)}return o}));function u(e){if(l[c]=e,a){const[e,n]=h(c);return a[c]=n,t(d[c],e)}return t(d[c])}}}function F(e,t){return y((()=>e(t)))}function R(){return!0}const U={get:(t,n,r)=>n===e?r:t.get(n),has:(e,t)=>e.has(t),set:R,deleteProperty:R,getOwnPropertyDescriptor:(e,t)=>({configurable:!0,enumerable:!0,get:()=>e.get(t),set:R,deleteProperty:R}),ownKeys:e=>e.keys()};function K(...e){return new Proxy({get(t){for(let n=e.length-1;n>=0;n--){const r=e[n][t];if(void 0!==r)return r}},has(t){for(let n=e.length-1;n>=0;n--)if(t in e[n])return!0;return!1},keys(){const t=[];for(let n=0;n<e.length;n++)t.push(...Object.keys(e[n]));return[...new Set(t)]}},U)}function J(e){const t="fallback"in e&&{fallback:()=>e.fallback};return m(H((()=>e.each),e.children,t||void 0))}function Q(e){let t=!1;const n=m((()=>e.when),void 0,{equals:(e,n)=>t?e===n:!e==!n});return m((()=>{const r=n();if(r){const n=e.children;return(t="function"==typeof n&&n.length>0)?y((()=>n(r))):n}return e.fallback}))}const Z=new Set(["className","indeterminate","value","allowfullscreen","allowpaymentrequest","async","autofocus","autoplay","checked","controls","default","disabled","formnovalidate","hidden","ismap","itemscope","loop","multiple","muted","nomodule","novalidate","open","playsinline","readonly","required","reversed","seamless","selected","truespeed"]),V=new Set(["innerHTML","textContent","innerText","children"]),X={className:"class",htmlFor:"for"},Y=new Set(["beforeinput","click","dblclick","focusin","focusout","input","keydown","keyup","mousedown","mousemove","mouseout","mouseover","mouseup","pointerdown","pointermove","pointerout","pointerover","pointerup","touchend","touchmove","touchstart"]),G={xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace"};function W(e,t){return m(e,void 0,t?void 0:{equals:t})}function ee(e,t,n){let r=n.length,o=t.length,i=r,l=0,s=0,a=t[o-1].nextSibling,c=null;for(;l<o||s<i;)if(t[l]!==n[s]){for(;t[o-1]===n[i-1];)o--,i--;if(o===l){const t=i<r?s?n[s-1].nextSibling:n[i-s]:a;for(;s<i;)e.insertBefore(n[s++],t)}else if(i===s)for(;l<o;)c&&c.has(t[l])||e.removeChild(t[l]),l++;else if(t[l]===n[i-1]&&n[s]===t[o-1]){const r=t[--o].nextSibling;e.insertBefore(n[s++],t[l++].nextSibling),e.insertBefore(n[--i],r),t[o]=n[i]}else{if(!c){c=new Map;let e=s;for(;e<i;)c.set(n[e],e++)}const r=c.get(t[l]);if(null!=r)if(s<r&&r<i){let a,d=l,u=1;for(;++d<o&&d<i&&null!=(a=c.get(t[d]))&&a===r+u;)u++;if(u>r-s){const o=t[l];for(;s<r;)e.insertBefore(n[s++],o)}else e.replaceChild(n[s++],t[l++])}else l++;else e.removeChild(t[l++])}}else l++,s++}const te="_$DX_DELEGATE";function ne(e,t,n){let r;return p((o=>{r=o,de(t,e(),t.firstChild?null:void 0,n)})),()=>{r(),t.textContent=""}}function re(e,t,n){const r=document.createElement("template");r.innerHTML=e;let o=r.content.firstChild;return n&&(o=o.firstChild),o}function oe(e,t=window.document){const n=t[te]||(t[te]=new Set);for(let r=0,o=e.length;r<o;r++){const o=e[r];n.has(o)||(n.add(o),t.addEventListener(o,pe))}}function ie(e,t,n){null==n?e.removeAttribute(t):e.setAttribute(t,n)}function le(e,t,n,r){null==r?e.removeAttributeNS(t,n):e.setAttributeNS(t,n,r)}function se(e,t,n,r){r?Array.isArray(n)?(e[`$$${t}`]=n[0],e[`$$${t}Data`]=n[1]):e[`$$${t}`]=n:Array.isArray(n)?e.addEventListener(t,(e=>n[0](n[1],e))):e.addEventListener(t,n)}function ae(e,t,n={}){const r=Object.keys(t),o=Object.keys(n);let i,l;for(i=0,l=o.length;i<l;i++){const r=o[i];r&&"undefined"!==r&&!(r in t)&&(ue(e,r,!1),delete n[r])}for(i=0,l=r.length;i<l;i++){const o=r[i],l=!!t[o];o&&"undefined"!==o&&n[o]!==l&&(ue(e,o,l),n[o]=l)}return n}function ce(e,t,n={}){const r=e.style;if("string"==typeof t)return r.cssText=t;let o,i;for(i in"string"==typeof n&&(n={}),n)null==t[i]&&r.removeProperty(i),delete n[i];for(i in t)o=t[i],o!==n[i]&&(r.setProperty(i,o),n[i]=o);return n}function de(e,t,n,r){if(void 0===n||r||(r=[]),"function"!=typeof t)return fe(e,t,r,n);f((r=>fe(e,t(),r,n)),r)}function ue(e,t,n){const r=t.split(/\s+/);for(let t=0,o=r.length;t<o;t++)e.classList.toggle(r[t],n)}function pe(e){const t=`$$${e.type}`;let n=e.composedPath&&e.composedPath()[0]||e.target;for(e.target!==n&&Object.defineProperty(e,"target",{configurable:!0,value:n}),Object.defineProperty(e,"currentTarget",{configurable:!0,get:()=>n});null!==n;){const r=n[t];if(r&&!n.disabled){const o=n[`${t}Data`];if(void 0!==o?r(o,e):r(e),e.cancelBubble)return}n=n.host&&n.host!==n&&n.host instanceof Node?n.host:n.parentNode}}function he(e,t,n={},r,o){return!o&&"children"in t&&f((()=>n.children=fe(e,t.children,n.children))),f((()=>function(e,t,n,r,o={}){let i,l,s;for(const c in t){if("children"===c){r||fe(e,t.children);continue}const d=t[c];if(d!==o[c]){if("style"===c)ce(e,d,o[c]);else if("class"!==c||n)if("classList"===c)ae(e,d,o[c]);else if("ref"===c)d(e);else if("on:"===c.slice(0,3))e.addEventListener(c.slice(3),d);else if("oncapture:"===c.slice(0,10))e.addEventListener(c.slice(10),d,!0);else if("on"===c.slice(0,2)){const t=c.slice(2).toLowerCase(),n=Y.has(t);se(e,t,d,n),n&&oe([t])}else if((s=V.has(c))||!n&&(l=Z.has(c))||(i=e.nodeName.includes("-")))!i||l||s?e[c]=d:e[(a=c,a.toLowerCase().replace(/-([a-z])/g,((e,t)=>t.toUpperCase())))]=d;else{const t=n&&c.indexOf(":")>-1&&G[c.split(":")[0]];t?le(e,t,c,d):ie(e,X[c]||c,d)}else e.className=d;o[c]=d}}var a}(e,t,r,!0,n))),n}function fe(e,t,n,r,o){for(;"function"==typeof n;)n=n();if(t===n)return n;const i=typeof t,l=void 0!==r;if(e=l&&n[0]&&n[0].parentNode||e,"string"===i||"number"===i)if("number"===i&&(t=t.toString()),l){let o=n[0];o&&3===o.nodeType?o.data=t:o=document.createTextNode(t),n=be(e,n,r,o)}else n=""!==n&&"string"==typeof n?e.firstChild.data=t:e.textContent=t;else if(null==t||"boolean"===i)n=be(e,n,r);else{if("function"===i)return f((()=>{let o=t();for(;"function"==typeof o;)o=o();n=fe(e,o,n,r)})),()=>n;if(Array.isArray(t)){const i=[];if(ge(i,t,o))return f((()=>n=fe(e,i,n,r,!0))),()=>n;if(0===i.length){if(n=be(e,n,r),l)return n}else Array.isArray(n)?0===n.length?me(e,i,r):ee(e,n,i):null==n||""===n?me(e,i):ee(e,l&&n||[e.firstChild],i);n=i}else if(t instanceof Node){if(Array.isArray(n)){if(l)return n=be(e,n,r,t);be(e,n,null,t)}else null!=n&&""!==n&&e.firstChild?e.replaceChild(t,e.firstChild):e.appendChild(t);n=t}}return n}function ge(e,t,n){let r=!1;for(let o=0,i=t.length;o<i;o++){let i,l=t[o];if(l instanceof Node)e.push(l);else if(null==l||!0===l||!1===l);else if(Array.isArray(l))r=ge(e,l)||r;else if("string"==(i=typeof l))e.push(document.createTextNode(l));else if("function"===i)if(n){for(;"function"==typeof l;)l=l();r=ge(e,Array.isArray(l)?l:[l])||r}else e.push(l),r=!0;else e.push(document.createTextNode(l.toString()))}return r}function me(e,t,n){for(let r=0,o=t.length;r<o;r++)e.insertBefore(t[r],n)}function be(e,t,n,r){if(void 0===n)return e.textContent="";const o=r||document.createTextNode("");if(t.length){let r=!1;for(let i=t.length-1;i>=0;i--){const l=t[i];if(o!==l){const t=l.parentNode===e;r||i?t&&e.removeChild(l):t?e.replaceChild(o,l):e.insertBefore(o,n)}else r=!0}}else e.insertBefore(o,n);return[o]}const ye=Symbol("store-raw"),ve=Symbol("store-node"),we=Symbol("store-name");function xe(t,n){let r=t[e];if(!r){Object.defineProperty(t,e,{value:r=new Proxy(t,_e)});const n=Object.keys(t),o=Object.getOwnPropertyDescriptors(t);for(let e=0,i=n.length;e<i;e++){const i=n[e];if(o[i].get){const e=o[i].get.bind(r);Object.defineProperty(t,i,{get:e})}}}return r}function ke(e){return null!=e&&"object"==typeof e&&(!e.__proto__||e.__proto__===Object.prototype||Array.isArray(e))}function Se(e,t=new Set){let n,r,o,i;if(n=null!=e&&e[ye])return n;if(!ke(e)||t.has(e))return e;if(Array.isArray(e)){Object.isFrozen(e)?e=e.slice(0):t.add(e);for(let n=0,i=e.length;n<i;n++)o=e[n],(r=Se(o,t))!==o&&(e[n]=r)}else{Object.isFrozen(e)?e=Object.assign({},e):t.add(e);const n=Object.keys(e),l=Object.getOwnPropertyDescriptors(e);for(let s=0,a=n.length;s<a;s++)i=n[s],l[i].get||(o=e[i],(r=Se(o,t))!==o&&(e[i]=r))}return e}function Ce(e){let t=e[ve];return t||Object.defineProperty(e,ve,{value:t={}}),t}function Ae(){const[e,t]=h(void 0,{equals:!1});return e.$=t,e}const _e={get(t,n,r){if(n===ye)return t;if(n===e)return r;const o=t[n];if(n===ve||"__proto__"===n)return o;const i=ke(o);if(v()&&("function"!=typeof o||t.hasOwnProperty(n))){let e,r;i&&(e=Ce(o))&&(r=e._||(e._=Ae()),r()),e=Ce(t),r=e[n]||(e[n]=Ae()),r()}return i?xe(o):o},set:()=>!0,deleteProperty:()=>!0,ownKeys:function(e){if(v()){const t=Ce(e);(t._||(t._=Ae()))()}return Reflect.ownKeys(e)},getOwnPropertyDescriptor:function(t,n){const r=Reflect.getOwnPropertyDescriptor(t,n);return!r||r.get||n===e||n===ve||n===we||(delete r.value,delete r.writable,r.get=()=>t[e][n]),r}};function je(e,t,n){if(e[t]===n)return;const r=Array.isArray(e),o=e.length,i=void 0===n,l=r||i===t in e;i?delete e[t]:e[t]=n;let s,a=Ce(e);(s=a[t])&&s.$(),r&&e.length!==o&&(s=a.length)&&s.$(s,void 0),l&&(s=a._)&&s.$(s,void 0)}function Me(e,t,n=[]){let r,o=e;if(t.length>1){r=t.shift();const i=typeof r,l=Array.isArray(e);if(Array.isArray(r)){for(let o=0;o<r.length;o++)Me(e,[r[o]].concat(t),[r[o]].concat(n));return}if(l&&"function"===i){for(let o=0;o<e.length;o++)r(e[o],o)&&Me(e,[o].concat(t),[o].concat(n));return}if(l&&"object"===i){const{from:o=0,to:i=e.length-1,by:l=1}=r;for(let r=o;r<=i;r+=l)Me(e,[r].concat(t),[r].concat(n));return}if(t.length>1)return void Me(e[r],t,[r].concat(n));o=e[r],n=[r].concat(n)}let i=t[0];"function"==typeof i&&(i=i(o,n),i===o)||void 0===r&&null==i||(i=Se(i),void 0===r||ke(o)&&ke(i)&&!Array.isArray(i)?function(e,t){const n=Object.keys(t);for(let r=0;r<n.length;r+=1){const o=n[r];je(e,o,t[o])}}(o,i):je(e,r,i))}function Te(e,t){const n=Se(e||{});return[xe(n),function(...e){b((()=>Me(n,e)))}]}const Pe=w([{path:"start"},{}]);function Ee(e){const t=location.hash.replace(/#/,"")||"start",[n,r]=Te({path:t});window.addEventListener("popstate",(e=>{const t=e.target.location.hash.replace(/#/,"");r({...n,path:t})}));const o=[n,{apiUrl:e.values.api}];return F(Pe.Provider,{value:o,get children(){return e.children}})}let $e={data:""},Le=e=>"object"==typeof window?((e?e.querySelector("#_goober"):window._goober)||Object.assign((e||document.head).appendChild(document.createElement("style")),{innerHTML:" ",id:"_goober"})).firstChild:e||$e,Ne=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(})/g,ze=/\/\*[^]*?\*\/|\s\s+|\n/g,De=(e,t)=>{let n,r="",o="",i="";for(let l in e){let s=e[l];"object"==typeof s?(n=t?t.replace(/([^,])+/g,(e=>l.replace(/([^,])+/g,(t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)))):l,o+="@"==l[0]?"f"==l[1]?De(s,l):l+"{"+De(s,"k"==l[1]?"":t)+"}":De(s,n)):"@"==l[0]&&"i"==l[1]?r=l+" "+s+";":(l=l.replace(/[A-Z]/g,"-$&").toLowerCase(),i+=De.p?De.p(l,s):l+":"+s+";")}return i[0]?(n=t?t+"{"+i+"}":i,r+n+o):r+o},Oe={},qe=e=>{let t="";for(let n in e)t+=n+("object"==typeof e[n]?qe(e[n]):e[n]);return t},Be=(e,t,n,r,o)=>{let i="object"==typeof e?qe(e):e,l=Oe[i]||(Oe[i]=(e=>{let t=0,n=11;for(;t<e.length;)n=101*n+e.charCodeAt(t++)>>>0;return"go"+n})(i));if(!Oe[l]){let t="object"==typeof e?e:(e=>{let t,n=[{}];for(;t=Ne.exec(e.replace(ze,""));)t[4]&&n.shift(),t[3]?n.unshift(n[0][t[3]]=n[0][t[3]]||{}):t[4]||(n[0][t[1]]=t[2]);return n[0]})(e);Oe[l]=De(o?{["@keyframes "+l]:t}:t,n?"":"."+l)}return((e,t,n)=>{-1==t.data.indexOf(e)&&(t.data=n?e+t.data:t.data+e)})(Oe[l],t,r),l},Ie=(e,t,n)=>e.reduce(((e,r,o)=>{let i=t[o];if(i&&i.call){let e=i(n),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;i=t?"."+t:e&&"object"==typeof e?e.props?"":De(e,""):e}return e+r+(null==i?"":i)}),"");function He(e){let t=this||{},n=e.call?e(t.p):e;return Be(n.unshift?n.raw?Ie(n,[].slice.call(arguments,1),t.p):n.reduce(((e,n)=>n?Object.assign(e,n.call?n(t.p):n):e),{}):n,Le(t.target),t.g,t.o,t.k)}He.bind({g:1});let Fe=He.bind({k:1});const Re=w();function Ue(e){let t=this||{};return(...n)=>{const r=r=>{const o=K(r,{theme:x(Re)}),i=K(o,{get className(){const e=o.className,r="className"in o&&/^go[0-9]+/.test(e);return[e,He.apply({target:t.target,o:r,p:o,g:t.g},n)].filter(Boolean).join(" ")}}),[l,s]=function(e,...t){const n=new Set(t.flat()),r=Object.getOwnPropertyDescriptors(e),o=t.map((t=>{const n={};for(let o=0;o<t.length;o++){const i=t[o];Object.defineProperty(n,i,r[i]?r[i]:{get:()=>e[i]})}return n}));return o.push(new Proxy({get:t=>n.has(t)?void 0:e[t],has:t=>!n.has(t)&&t in e,keys:()=>Object.keys(e).filter((e=>!n.has(e)))},U)),o}(i,["as"]),a=l.as||e;let c;var d,u,p,h;return"function"==typeof a?c=a(s):(c=document.createElement(a),d=c,"function"==typeof(u=s)?f((e=>he(d,u(),e,p,h))):he(d,u,void 0,p,h)),c};return r.className=e=>y((()=>He.apply({target:t.target,p:e,g:t.g},n))),r}}const Ke=Ue("nav")`
    color: black;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 2rem;
`,Je=Ue("a")`
    font-size: 14px;
    display: block;
    padding: 0 1rem;
`,Qe=()=>(x(Pe),F(Ke,{get children(){return[F(Je,{href:"#start",children:"Start"}),F(Je,{href:"#sync-check",children:"Sync Check"}),F(Je,{href:"#sync-draft",children:"Sync Draft"}),F(Je,{href:"#sync-live",children:"Sync Live"})]}})),Ze=async(e,t={})=>new Promise(((n,r)=>{jQuery.ajax({url:"/wp-admin/admin-ajax.php",type:"post",dataType:"json",data:{action:e,...t},success:function(e){n(e)},error:(e,t)=>{r(t)}})})),Ve=async(e,t)=>new Promise(((n,r)=>{jQuery.ajax({url:e,type:t?"post":"get",dataType:"json",data:t,success:function(e){n(e)},error:(e,t)=>{r(e.responseJSON)}})})),Xe=Ue("div")`
    background-color: white;
    padding: 1.0rem 2rem 2rem;
    border: 3px solid #ccc;
    border-radius: 3px;
    min-height: 50vh;
`,Ye=e=>F(Xe,{get children(){return e.children}}),Ge=Ue("div")`
    display: flex;
`,We=Ue("div")`
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
`,it=e=>F(Ge,{get children(){return[F(We,{get children(){return[F(rt,{get children(){return e.title}}),F(tt,{get children(){return e.description}})]}}),F(et,{get children(){return e.actions}})]}});Ue("svg")`
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
`;const lt=re('<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="200px" height="200px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid"><circle cx="50" cy="50" r="32" stroke-width="8" stroke-dasharray="50.26548245743669 50.26548245743669" fill="none" stroke-linecap="round"><animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="2.0408163265306123s" keyTimes="0;1" values="0 50 50;360 50 50"></animateTransform></circle></svg>'),st={small:"20px",medium:"30px",large:"50px",xlarge:"100px"},at=({size:e="large",inverted:t=!1})=>{let n={display:"block","shape-rendering":"auto",width:st[e],height:st[e],stroke:"#006ba1"};return t&&(n.stroke="#fff"),(()=>{const e=lt.cloneNode(!0);return ce(e,n),e})()},ct=Ue("button")`
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

`,dt=Ue("div")`
    position: absolute;
    right: 7px;
`,ut=e=>F(ct,K(e,{get children(){return[W((()=>e.children)),F(Q,{get when(){return e.loading},get children(){return F(dt,{get children(){return F(at,{size:"small",get inverted(){return!e.disabled}})}})}})]}})),pt=Ue("div")`
    display: flex;
    margin-bottom: 2px;
`,ht=Ue("div")`
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
`,ft=Ue("div")`
    background-color: #2271b1;
    font-size: 10px;
    color: white;
    padding: 0px 4px 0px 4px;
    height: 16px;
    line-height: 15px;
    margin: 0 5px 0 0;
    border-radius: 2px;
    cursor: pointer;
`,gt=Ue("a")`
    display: block;
    color: grey;
    text-decoration: none;
`,mt=Ue("div")`
    padding: 0 5px 0 0;
    svg {
        fill: ${e=>e.color};
        transition: fill .2s ease-in;
    }
`,bt=re('<svg height="10" width="10"><circle cx="5" cy="5" r="5" stroke-width="0"></circle></svg>'),yt=({showCheckButton:e,showSyncButton:t,showDraft:n,showLive:r,item:o,onClick:i,onTypeClick:l})=>{const s=(e,t)=>{let n="#bbbbbb";return"error"===t?n="#da694b":""===t?n="#bbbbbb":e&&(n=e.synced?"#99da4b":"#e9da4e"),n};return F(pt,{get children(){return[F(Q,{when:n,get children(){return F(mt,{get color(){var e,t;return s(null===(e=o.status)||void 0===e?void 0:e.draft,null===(t=o.status)||void 0===t?void 0:t.state)},get children(){return bt.cloneNode(!0)}})}}),F(Q,{when:r,get children(){return F(mt,{get color(){var e,t;return s(null===(e=o.status)||void 0===e?void 0:e.live,null===(t=o.status)||void 0===t?void 0:t.state)},get children(){return bt.cloneNode(!0)}})}}),F(Q,{when:t,get children(){return F(ft,{onClick:i,children:"sync"})}}),F(Q,{when:e,get children(){return F(ft,{onClick:i,children:"check"})}}),F(ht,{onClick:()=>l(o.type),get children(){return o.type}}),F(gt,{target:"_new",get href(){return o.permalink},get children(){return o.permalink||"/"}})]}})},vt=re('<div style="padding-bottom:10px;"><label for="filter">Filter</label><input type="text" name="filter"></div>'),wt=re("<div></div>"),xt=({type:e})=>{const[t,{apiUrl:n}]=x(Pe),[r,o]=Te({list:[]}),[i,l]=Te({list:[]}),[s,a]=h(!1),[c,d]=h(!1);g((async()=>{const e=(await Ze("get_all_resources")).list.map(((e,t)=>({...e,index:t})));o({list:e}),l({list:e})}));const u=async(t,{syncTreeAndCache:r=!0})=>{try{(await Ve(`${n}/sync.php`,{action:"sync",permalink:t.permalink,release:e,sync_check:!1,sync_tree:r})).data?o("list",t.index,"status",{[e]:{synced:!0},state:"loaded"}):o("list",t.index,"status",{state:"error"})}catch(e){o("list",t.index,"status",{state:"error"})}},p=e=>{(e=>{if(""===e)return void l({list:r.list});const t=r.list.filter((t=>t.permalink.startsWith(e)));l({list:t})})(e.target.value)},f="draft"===e?"Begin to sync to Draft":"Publish list to Live",m="draft"===e?"Sync Draft":"Sync Live",b="draft"===e?"This is where you can make sure that wordpress and the draft content is in sync":"This is where you can make sure that Draft and Live are in sync";return F(Ye,{get children(){return[F(it,{title:m,description:b,get actions(){return(()=>{const t=wt.cloneNode(!0);return de(t,F(ut,{get loading(){return s()},onClick:()=>(async t=>{if(s())return;let n=!1;if(("live"===e&&confirm("Do you really want to publish the list?")||"draft"===e)&&(n=!0),n){a(!0),i.list.forEach(((e,t)=>{l("list",t,"status",{state:""}),t++}));for await(let e of i.list)await u(e,t);a(!1)}})({syncTreeAndCache:!1}),children:f}),null),de(t,F(ut,{get loading(){return c()},onClick:()=>(async()=>{try{d(!0);const t=await Ve(`${n}/recreate-tree.php`,{action:"recreate_tree",release:e});d(!1),window&&console.log(t),window&&window.alert("Recreating tree done - check console.log for response")}catch(e){window&&window.alert("Error recreating tree - check console.log")}})(),children:"Recreate tree, required after type/all syncs"}),null),t})()}}),(()=>{const e=vt.cloneNode(!0);return e.firstChild.nextSibling.$$input=p,e})(),F(J,{get each(){return i.list},children:t=>F(yt,{showDraft:"draft"===e,showLive:"live"===e,showSyncButton:!0,onClick:()=>(async(e,t)=>{a(!0),await u(e,t),a(!1)})(t,{syncTreeAndCache:!0}),onTypeClick:()=>(async(e,t)=>{a(!0);const n=i.list.filter((t=>t.type===e));n.forEach(((e,t)=>{l("list",t,"status",{state:""}),t++}));for await(let e of n)await u(e,t);a(!1)})(t.type,{syncTreeAndCache:!1}),item:t,get permalink(){return t.permalink}})})]}})};oe(["input"]);const kt=()=>{const[e,{apiUrl:t}]=x(Pe),[n,r]=Te({list:[]}),[o,i]=h(!1);g((async()=>{const e=(await Ze("get_all_resources")).list.map(((e,t)=>({...e,index:t})));r({list:e})}));const l=async e=>{try{const n=await Ve(`${t}/check-sync.php`,{permalink:e.permalink});r("list",e.index,"status",{draft:n.data.resourceStatus.find((e=>"draft"===e.target&&"__original"===e.comparedTo)),live:n.data.resourceStatus.find((e=>"live"===e.target&&"draft"===e.comparedTo)),state:"loaded"})}catch(t){r("list",e.index,"status",{state:"error"})}};return F(Ye,{get children(){return[F(it,{title:"Sync Check",description:"This is where you can check if all content is in sync",get actions(){return F(ut,{get loading(){return o()},onClick:()=>(async()=>{if(!o()){i(!0),n.list.forEach(((e,t)=>{r("list",t,"status",{state:""}),t++}));for await(let e of n.list)await l(e);i(!1)}})(),children:"Begin to check"})}}),F(J,{get each(){return n.list},children:e=>F(yt,{showDraft:!0,showLive:!0,showCheckButton:!0,item:e,get permalink(){return e.permalink},onClick:()=>(async e=>{i(!0),await l(e),i(!1)})(e),onTypeClick:()=>(async e=>{i(!0);const t=n.list.filter((t=>t.type===e));t.forEach(((e,t)=>{r("list",t,"status",{state:""}),t++}));for await(let e of t)await l(e);i(!1)})(e.type)})})]}})},St=Ue("p")`
    font-size: 14px;
    padding-bottom: .5rem;
    background-color: #ffeaee;
    border: 2px solid #ffc0cb;
    border-radius: 3px;
    padding: 1rem 2rem;
    text-align: center;
`,Ct=()=>F(Ye,{get children(){return[F(it,{title:"Start",description:"This plugin lets you control and debug content through the content service."}),F(St,{children:"This is mainly used while developing or by admins!"})]}}),At=Ue("div")`
     color: black;
     max-width: 1200px;
     margin: 0 auto;
`;Ue("div")`
`,Ue("div")`
    font-size: 1rem;
    padding: 1rem 0;
`;const _t=()=>{const[e]=x(Pe);return F(At,{get children(){return[F(nt,{children:"Content Dashboard"}),F(Qe,{}),F(Q,{get when(){return"start"===e.path},get children(){return F(Ct,{})}}),F(Q,{get when(){return"sync-check"===e.path},get children(){return F(kt,{})}}),F(Q,{get when(){return"sync-draft"===e.path},get children(){return F(xt,{type:"draft"})}}),F(Q,{get when(){return"sync-live"===e.path},get children(){return F(xt,{type:"live"})}})]}})},jt=Ue("div")`

    padding-top: 6px;

    ${e=>e.horizontal?"\n        display: flex;   \n        align-items: center;\n        border-bottom: 1px dotted grey;\n        padding: 0 10px 8px 10px;\n        margin-left: -10px;\n        margin-right: -10px;\n        justify-content: flex-end;\n    ":""} 

    ${e=>e.box?"\n        position: relative;\n        min-width: 255px;\n        border: 1px solid #ccd0d4;\n        box-shadow: 0 1px 1px rgb(0 0 0 / 4%);\n        background: #fff;\n        padding: 1rem;\n        box-sizing: border-box;\n        margin-bottom: 7px;\n    ":""}

`,Mt=Ue("div")`
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

`,Tt=Ue("div")`
    text-align: center;
    min-width: 100px;
    ${e=>e.horizontal?"\n        margin-top: 10px;\n    ":""}

`,Pt=({options:e})=>{const[t,n]=Te({}),[r,o]=h(!0),[i,l]=h(!1),[s,a]=h(!1),[c,d]=h(!1),[u,p]=h(!1),[f,m]=h(!1),[b,y]=h(!1),[v,w]=h(!1),[x,k]=h(!1),S={permalink:e.permalink};let C,A;g((()=>{var t,n;e.metaMenu?(A=document.querySelector("#save_menu_footer"),M()):null!==(t=wp)&&void 0!==t&&null!==(n=t.data)&&void 0!==n&&n.select&&(C=wp.data.select("core/editor"),wp.domReady(j))})),g((()=>{wp&&wp.hooks&&wp.hooks.addAction&&(P(),wp.hooks.addAction("dls.post-saved","dls",(()=>{var e,n,r;if(null!=t&&null!==(e=t.draft)&&void 0!==e&&e.exists||null===(n=C)||void 0===n||!n.isPublishingPost())null!=t&&null!==(r=t.draft)&&void 0!==r&&r.exists&&(j(),P());else{const{isSavingPost:e}=C;let t=0;const n=setInterval((()=>{(!e()||t>=50)&&(location.reload(),clearInterval(n))}),100)}})))})),g((()=>{let e;document.addEventListener("cerberusListenerEvent",(t=>{var n;null!=t&&null!==(n=t.detail)&&void 0!==n&&n.hasChange&&(e||(e=document.querySelector(".editor-post-publish-button"),e.addEventListener("click",(()=>{y(!1),e.setAttribute("disabled",!0)}))),e&&(y(!0),e.removeAttribute("disabled")))}))}));const j=()=>{let e;const t=wp.data.subscribe(_.debounce((()=>{e||(e=document.querySelector(".editor-post-publish-button"));const n=C.isEditedPostDirty(),r=C.hasNonPostEntityChanges(),o=b();r||n||o?(p(!0),e.removeAttribute("disabled"),t()):(p(!1),e.setAttribute("disabled",!0))}),100))},M=()=>{let e,t=!1;A.setAttribute("disabled",!0);let n=()=>{t||clearInterval(e)},r=()=>{t||(e=o())};const o=()=>setInterval((()=>{var o,i;null!==(o=window)&&void 0!==o&&null!==(i=o.wpNavMenu)&&void 0!==i&&i.menusChanged&&(t=!0,T(),clearInterval(e),window.removeEventListener("blur",n),window.removeEventListener("focus",r))}),500);e=o(),window.addEventListener("blur",n),window.addEventListener("focus",r)},T=()=>{A.removeAttribute("disabled"),m(!0)},P=async(t=!0)=>{t&&(o(!0),await new Promise((e=>setTimeout(e,1e3))));try{var r;const t=await Ze("check_sync",{...S,api_path:S.permalink});if(null==t||null===(r=t.data)||void 0===r||!r.resourceStatus)throw S;n({draft:t.data.resourceStatus.find((e=>"draft"===e.target&&"__original"===e.comparedTo)),live:t.data.resourceStatus.find((e=>"live"===e.target&&"draft"===e.comparedTo)),state:"loaded"}),k(!1),e.metaMenu&&E()}catch(e){console.log("--- meta-box --- Can't find any data with check-sync of payload: ",e),k(!0),o(!1),n({state:"error"})}o(!1)},E=async()=>{var e;const n=document.querySelectorAll(".menu-theme-locations > .menu-settings-input"),r=document.querySelector(".menu-settings-group.menu-theme-locations"),o=document.createElement("i");o.classList.add("changes-disabled-message");const i=null===(e=t.draft)||void 0===e?void 0:e.exists,l=t.live&&t.live.exists;!i||l?(r.style.pointerEvents="none",r.style.cursor="not-allowed",r.style.opacity=.5):(r.style.pointerEvents="auto",r.style.cursor="default",r.style.opacity=1);const s=document.querySelector(".changes-disabled-message");if(l){const e="Menu must be unpublished before toggling location";s?s.innerHTML=e:(o.innerHTML=e,r.prepend(o))}else{const e="Menu must be created before toggling location";i?s&&s.parentNode.removeChild(s):s?s.innerHTML=e:(o.innerHTML=e,r.prepend(o))}let a=!1,c=!1;for(let e of n){const t=e.querySelector("input");t.addEventListener("change",(()=>{d(!0),T()}));e.querySelector(".theme-location-set")&&(t.setAttribute("disabled",!0),e.style.pointerEvents="none",e.style.opacity=.5,c=!0),t.getAttribute("checked")&&(a=!0)}if(c&&!l&&i){const e=document.querySelector(".changes-disabled-message"),t="Some locations cannot be set because they are already set";e?e.innerHTML=t:(o.innerHTML=t,r.prepend(o))}if(location.search.includes("menu=0"))return;w(!0);const u=document.querySelector(".submitdelete.deletion.menu-delete");let p=document.querySelector(".delete-link-replacement");a||l?(u.style.display="none",p?p.style.display="inline":(p=document.createElement("span"),p.classList.add("delete-link-replacement"),p.innerHTML="To delete a menu it must be unpublished (and unregisterered from all display locations)",p.style.color="#a7aaad",p.style.fontSize="12px"),u.parentNode.prepend(p)):(u.style.display="inline",p&&(p.style.display="none"))},$=(e={})=>{if(document){const t=new CustomEvent("cerberusChangeEvent",{detail:e});document.dispatchEvent(t)}},L=async e=>{e.preventDefault(),e.stopPropagation(),l(!0);(await Ze("publish_to_live",S)).data?P(!1):n({state:"error"}),await new Promise((e=>setTimeout(e,1e3))),l(!1),$({action:"publish_to_live_done"})},N=async e=>{e.preventDefault(),e.stopPropagation(),a(!0);(await Ze("unpublish_from_live",S)).data?P(!1):n({state:"error"}),await new Promise((e=>setTimeout(e,1e3))),a(!1),$({action:"unpublish_from_live_done"})};return F(jt,{get horizontal(){return e.metaMenu},get box(){return e.optionsMeta},get children(){return[F(Q,{get when(){return r()},get children(){return F(Mt,{get horizontal(){return e.metaMenu},get children(){return[F(at,{get size(){return e.metaMenu?"small":"large"}}),F(Tt,{children:"Checking content in draft and live"})]}})}}),F(Q,{get when(){return!r()},get children(){return[F(Q,{get when(){return x()},get children(){return F(Mt,{get horizontal(){return e.metaMenu},get children(){return F(Tt,{children:"Content must be saved before publishing"})}})}}),F(Q,{get when(){var e;return!c()&&(null===(e=t.draft)||void 0===e?void 0:e.exists)},get children(){return[F(Tt,{get horizontal(){return e.metaMenu},children:"Publish content"}),F(Q,{get when(){var e;return!(null!==(e=t.live)&&void 0!==e&&e.exists)},get children(){return[F(ut,{get leftMargin(){return e.metaMenu},get loading(){return i()},onClick:e=>L(e),get disabled(){return u()||f()||b()},get children(){return u()||f()||b()?"Save draft before publishing to live":"Publish to live site"}}),F(ut,{get leftMargin(){return e.metaMenu},get disabled(){var e;return!(null!==(e=t.live)&&void 0!==e&&e.synced)},children:"Content not published"})]}}),F(Q,{get when(){var e;return null===(e=t.live)||void 0===e?void 0:e.exists},get children(){return[F(ut,{get leftMargin(){return e.metaMenu},get loading(){return i()},onClick:e=>L(e),get disabled(){var e;return(null===(e=t.live)||void 0===e?void 0:e.synced)||u()||f()||b()},get children(){var e;return u()||f()||b()?"Save draft before updating on live":null!==(e=t.live)&&void 0!==e&&e.synced?"Updated on live site":"Update on live site"}}),F(ut,{get leftMargin(){return e.metaMenu},get loading(){return s()},onClick:e=>N(e),get disabled(){return b()},children:"Unpublish"})]}})]}}),F(Q,{get when(){return e.metaMenu},get children(){return F(Mt,{get horizontal(){return e.metaMenu},get children(){return[F(Q,{get when(){return!v()},get children(){return F(Tt,{children:"Enter a 'Menu Name' above to create a new menu"})}}),(()=>{const e=W((()=>{var e;return!(c()||null!==(e=t.draft)&&void 0!==e&&e.exists)}),!0);return F(Q,{get when(){return e()&&v()},get children(){return F(Tt,{children:"Save menu with menu items in order to publish"})}})})(),F(Q,{get when(){return c()},get children(){return F(Tt,{children:"Save the changes before publishing"})}})]}})}})]}}),F(Q,{get when(){return e.enableTestContent},get children(){return F(ut,{get leftMargin(){return e.metaMenu},get loading(){return s()},onClick:e=>N(e),get disabled(){var e;return!(null!==(e=t.test)&&void 0!==e&&e.synced)},get children(){return t.test&&t.test.synced?"Unpublish from test target":"Publish to test target"}})}}),F(Q,{get when(){return e.enableDiffButton},get children(){return F(ut,{get leftMargin(){return e.metaMenu},children:"Show diff (raw)"})}})]}})},Et=Ue("input")`
`,$t=Ue("div")`
    display: flex;
    flex-direction: column;
    width: 100%;
    padding-right: 10px;
    box-sizing: border-box;
`,Lt=Ue("label")`
    padding: 5px 5px 0px 5px;
    font-size: 10px;
    height: 18px;
`,Nt=({placeholder:e="",label:t=" ",value:n,onChange:r=(()=>{})})=>{const o=e=>{r(e.target.value)};return F($t,{get children(){return[F(Lt,{children:t}),F(Et,{type:"text",get value(){return n()},placeholder:e,onKeyup:o})]}})},zt=Ue("select")`
    max-width: 100% !important;
`,Dt=Ue("div")`
    display: flex;
    flex-direction: column;
    width: 100%;
    padding-left: 10px;
    box-sizing: border-box;
`,Ot=Ue("label")`
    padding: 5px 5px 0px 5px;
    font-size: 10px;
    height: 18px;
`,qt=re("<option></option>"),Bt=({options:e=[],placeholder:t="",label:n=" ",value:r,onChange:o=(()=>{})})=>{const i=e=>{console.log(e),o(e.target.value)};return F(Dt,{get children(){return[F(Ot,{children:n}),F(zt,{get value(){return r()},placeholder:t,onChange:i,get children(){return F(J,{each:e,children:e=>(()=>{const t=qt.cloneNode(!0);return de(t,(()=>e.label)),f((n=>{const o=e.value,i=e.value===r();return o!==n._v$&&(t.value=n._v$=o),i!==n._v$2&&(t.selected=n._v$2=i),n}),{_v$:void 0,_v$2:void 0}),t})()})}})]}})},It={open:Fe`
    0% {
        max-height: 0;
    }
    100% {
        max-height: 300px;
    }
`,close:Fe`
    0% {
        max-height: 300px;
    }
    100% {
        max-height: 0;
    }
`,init:Fe`
    0% {
        max-height: 0;
    }
    100% {
        max-height: 0;
    }
`},Ht=Ue("div")`
     color: black;
     max-width: 1200px;
     margin: 0 auto;
`;Ue("div")`
`,Ue("div")`
    font-size: 1rem;
    padding: 1rem 0;
`;const Ft=Ue("div")`
    display: flex;
    justify-content: flex-end;
`,Rt=Ue("div")`
    max-height: 0px;
    overflow: hidden;
    ${e=>`animation: ${It[e.state]} .4s ease-in-out forwards;`}
`,Ut=Ue("div")`
    background-color: #fff;
    border: 1px solid #aaa;
    border-radius: 3px;
    margin-top: 20px;
    padding: 20px;
`,Kt=Ue("div")`
    width: 100%;
    display: flex;
    padding-bottom: 10px;
`,Jt=Ue("div")`
    width: 100%;
    display: flex;
    justify-content: flex-end;
`,Qt=Ue("div")`
    color red;
`,Zt=Ue("div")`
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
`,Vt=Ue("table")`
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
`,Xt=Ue("td")`
    display: flex;
    justify-content: flex-end;
`,Yt=re("<thead><tr><th>Domain</th><th>Distribution ID</th><th>Target</th><th>SiteId</th><th></th></tr></thead>"),Gt=re("<tbody></tbody>"),Wt=re("<tr><td></td><td></td><td></td><td></td></tr>"),en=[{value:"draft",label:"Draft"},{value:"live",label:"Live"},{value:"test",label:"Test"}];const tn=({options:e})=>{const[t,n]=Te({list:[]}),[r,o]=h(""),[i,l]=h(""),[s,a]=h("draft"),[c,d]=h("init"),[u,p]=h(""),[f,m]=h(!1),b=async()=>{const t=await Ve(`${e.api}/get-domain-settings.php`);n("list",t)},y=async(t=function(e){for(var t="",n="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",r=n.length,o=0;o<e;o++)t+=n.charAt(Math.floor(Math.random()*r));return t}(20))=>{try{const n=function(e){const t=e.match(/^(?:https?:\/\/)?(?:www\.)?([^\/\n]+)/);if(t){const e=t[1];return/^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(e)?e:null}return null}(r());if(null===n)return void p("Invalid domain. Please enter a valid domain without http(s):// or path.");if(p(""),f())return;m(!0),await Ve(`${e.api}/upsert-domain-setting.php`,{domain:n,target:s(),id:t,cloudfrontDistributionId:i()}),await b(),a("draft"),o(""),l(""),m(!1),d("close")}catch(e){console.log("ee",e),"domain-already-exists"===e.error?p("Domain already exists"):p("Something caused an error"),m(!1)}},v=(e,t)=>{"domain"===e&&o(t),"target"===e&&a(t),"cloudfrontDistributionId"===e&&l(t)};return g((()=>{b()})),F(Ht,{get children(){return[F(nt,{children:"Domain Settings"}),F(tt,{children:"This is the list of domains and targets that will be used for this site. You can add as many as you need but the domains need to be pointed to the server to make it work."}),F(Ft,{get children(){return F(ut,{onClick:()=>d("open"),children:"Add new domain and target"})}}),F(Rt,{get state(){return c()},get children(){return F(Ut,{get children(){return[F(ot,{children:"Add new domain and target"}),F(Kt,{get children(){return[F(Nt,{placeholder:"domain",label:"Domain:",value:r,onChange:e=>v("domain",e)}),F(Nt,{placeholder:"distribution id",label:"Cloudfront Distribution ID:",value:i,onChange:e=>v("cloudfrontDistributionId",e)}),F(Bt,{options:en,value:s,onChange:e=>v("target",e)})]}}),F(Q,{when:u,get children(){return F(Qt,{children:u})}}),F(Jt,{get children(){return[F(ut,{onClick:()=>d("close"),children:"Cancel"}),F(ut,{get loading(){return f()},leftMargin:!0,get disabled(){return!r()||!s()},onClick:()=>y(),children:"Save"})]}})]}})}}),F(Vt,{get children(){return[Yt.cloneNode(!0),(()=>{const n=Gt.cloneNode(!0);return de(n,F(J,{get each(){return t.list},children:t=>(()=>{const n=Wt.cloneNode(!0),r=n.firstChild,o=r.nextSibling,i=o.nextSibling,l=i.nextSibling;return de(r,(()=>t.content.domain)),de(o,(()=>t.content.cloudfrontDistributionId)),de(i,(()=>t.content.target)),de(l,(()=>t.content.siteId)),de(n,F(Xt,{get children(){return F(Zt,{onClick:()=>(async t=>{try{await Ve(`${e.api}/delete-domain-setting.php`,{id:t}),await b()}catch(e){console.log(e)}})(t.externalId),children:"delete"})}}),null),n})()})),n})()]}})]}})},nn=e=>{try{return JSON.parse(document.getElementById(e).innerHTML)}catch(e){return{}}},rn=()=>{let e=document.getElementById("dls-metabox-root");if(e){const t=nn("dls-data");t.metaMenu="nav-menu"===e.getAttribute("data-type"),t.metaMenu&&(e=document.createElement("div"),e&&document.querySelector("#nav-menu-footer").prepend(e)),ne((()=>F(Pt,{options:t})),e)}};jQuery(document).ready((function(e){wp&&wp.data&&wp.data.dispatch&&wp.data.dispatch("core/editor").disablePublishSidebar(),(()=>{if(wp.data){let e=!1,t=!1;wp.data.subscribe((()=>{const n=wp.data.select("core/editor").isSavingPost(),r=wp.data.select("core/editor").isSavingNonPostEntityChanges&&wp.data.select("core/editor").isSavingNonPostEntityChanges();e!==n?(e=n,wp.data.select("core/editor").didPostSaveRequestSucceed()&&wp.hooks.doAction("dls.post-saved")):t!==r&&(t=r,wp.data.select("core/editor").didPostSaveRequestSucceed()&&wp.hooks.doAction("dls.post-saved"))}))}})();let t={};try{t=e("#dls-hooks").length>0?JSON.parse(e("#dls-hooks").html()):{hook:""}}catch(e){}console.log("Current hook",t&&t.hook),"post.php"===t.hook||"post-new.php"===t.hook||"nav-menus.php"===t.hook?rn():t.hook.includes("toplevel_page_draft-live-sync")?(()=>{const e=nn("dls-data");ne((()=>F(Ee,{values:e,get children(){return F(_t,{})}})),document.getElementById("dls-root"))})():t.hook.includes("toplevel_page_cerberus-domain-settings")?(()=>{const e=document.getElementById("dls-domain-settings-root"),t=nn("dls-data");ne((()=>F(tn,{options:t})),e)})():t.hook.includes(".php")||rn()}))}();
//# sourceMappingURL=draft-live-sync-boot-0.14.17-dupont.js.map
