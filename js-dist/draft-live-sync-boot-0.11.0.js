!function(){"use strict";const e=Symbol("solid-proxy"),t={equals:(e,t)=>e===t};let n=$;const r={},o={owned:null,cleanups:null,context:null,owner:null};var i=null;let l=null,s=null,a=null,c=null,d=null,u=0;function h(e,t){t&&(i=t);const n=s,r=i,l=0===e.length?o:{owned:null,cleanups:null,context:null,owner:r};let a;i=l,s=null;try{P((()=>a=e((()=>L(l)))),!0)}finally{s=n,i=r}return a}function p(e,n){n=n?Object.assign({},t,n):t;const o={value:e,observers:null,observerSlots:null,pending:r,comparator:n.equals||void 0};return[C.bind(o),e=>("function"==typeof e&&(e=e(o.pending!==r?o.pending:o.value)),S(o,e))]}function f(e,t,n){A(j(e,t,!1))}function g(e,t,r){n=T;const o=j(e,t,!1);o.user=!0,d&&d.push(o)}function y(e,n,o){o=o?Object.assign({},t,o):t;const i=j(e,n,!0);return i.pending=r,i.observers=null,i.observerSlots=null,i.state=0,i.comparator=o.equals||void 0,A(i),C.bind(i)}function b(e){if(a)return e();let t;const n=a=[];try{t=e()}finally{a=null}return P((()=>{for(let e=0;e<n.length;e+=1){const t=n[e];if(t.pending!==r){const e=t.pending;t.pending=r,S(t,e)}}}),!1),t}function v(e){let t,n=s;return s=null,t=e(),s=n,t}function m(){return s}function x(e){const t=Symbol("context");return{id:t,Provider:E(t),defaultValue:e}}function w(e){return z(i,e.id)||e.defaultValue}function k(e){const t=y(e);return y((()=>B(t())))}function C(){if(this.state&&this.sources){const e=c;c=null,1===this.state?A(this):O(this),c=e}if(s){const e=this.observers?this.observers.length:0;s.sources?(s.sources.push(this),s.sourceSlots.push(e)):(s.sources=[this],s.sourceSlots=[e]),this.observers?(this.observers.push(s),this.observerSlots.push(s.sources.length-1)):(this.observers=[s],this.observerSlots=[s.sources.length-1])}return this.value}function S(e,t,n){return e.comparator&&e.comparator(e.value,t)?t:a?(e.pending===r&&a.push(e),e.pending=t,t):(e.value=t,!e.observers||c&&!e.observers.length||P((()=>{for(let t=0;t<e.observers.length;t+=1){const n=e.observers[t];l,n.observers&&2!==n.state&&N(n),n.state=1,n.pure?c.push(n):d.push(n)}if(c.length>1e6)throw c=[],new Error}),!1),t)}function A(e){if(!e.fn)return;L(e);const t=i,n=s,r=u;s=i=e,function(e,t,n){let r;try{r=e.fn(t)}catch(e){D(e)}(!e.updatedAt||e.updatedAt<=n)&&(e.observers&&e.observers.length?S(e,r):e.value=r,e.updatedAt=n)}(e,e.value,r),s=n,i=t}function j(e,t,n,r){const l={fn:e,state:1,updatedAt:null,owned:null,sources:null,sourceSlots:null,cleanups:null,value:t,owner:i,context:null,pure:n};return null===i||i!==o&&(i.owned?i.owned.push(l):i.owned=[l]),l}function _(e){let t,n=1===e.state&&e;if(e.suspense&&v(e.suspense.inFallback))return e.suspense.effects.push(e);for(;e=e.owner;)2===e.state?t=e:1===e.state&&(n=e,t=void 0);if(t){const e=c;if(c=null,O(t),c=e,!n||1!==n.state)return}n&&A(n)}function P(e,t){if(c)return e();let r=!1;t||(c=[]),d?r=!0:d=[],u++;try{e()}catch(e){D(e)}finally{!function(e){c&&($(c),c=null);if(e)return;d.length?b((()=>{n(d),d=null})):d=null}(r)}}function $(e){for(let t=0;t<e.length;t++)_(e[t])}function T(e){let t,n=0;for(t=0;t<e.length;t++){const r=e[t];r.user?e[n++]=r:_(r)}const r=e.length;for(t=0;t<n;t++)_(e[t]);for(t=r;t<e.length;t++)_(e[t])}function O(e){e.state=0;for(let t=0;t<e.sources.length;t+=1){const n=e.sources[t];n.sources&&(1===n.state?_(n):2===n.state&&O(n))}}function N(e){for(let t=0;t<e.observers.length;t+=1){const n=e.observers[t];n.state||(n.state=2,n.observers&&N(n))}}function L(e){let t;if(e.sources)for(;e.sources.length;){const t=e.sources.pop(),n=e.sourceSlots.pop(),r=t.observers;if(r&&r.length){const e=r.pop(),o=t.observerSlots.pop();n<r.length&&(e.sourceSlots[o]=n,r[n]=e,t.observerSlots[n]=o)}}if(e.owned){for(t=0;t<e.owned.length;t++)L(e.owned[t]);e.owned=null}if(e.cleanups){for(t=0;t<e.cleanups.length;t++)e.cleanups[t]();e.cleanups=null}e.state=0,e.context=null}function D(e){throw e}function z(e,t){return e&&(e.context&&e.context[t]||e.owner&&z(e.owner,t))}function B(e){if("function"==typeof e&&!e.length)return B(e());if(Array.isArray(e)){const t=[];for(let n=0;n<e.length;n++){const r=B(e[n]);Array.isArray(r)?t.push.apply(t,r):t.push(r)}return t}return e}function E(e){return function(t){let n;var r;return A(j((()=>n=v((()=>(i.context={[e]:t.value},k((()=>t.children)))))),r,!0)),n}}const M=Symbol("fallback");function q(e){for(let t=0;t<e.length;t++)e[t]()}function F(e,t,n={}){let r=[],o=[],l=[],s=0,a=t.length>1?[]:null;var c;return c=()=>q(l),null===i||(null===i.cleanups?i.cleanups=[c]:i.cleanups.push(c)),()=>{let i,c,d=e()||[];return v((()=>{let e,t,p,f,g,y,b,v,m,x=d.length;if(0===x)0!==s&&(q(l),l=[],r=[],o=[],s=0,a&&(a=[])),n.fallback&&(r=[M],o[0]=h((e=>(l[0]=e,n.fallback()))),s=1);else if(0===s){for(o=new Array(x),c=0;c<x;c++)r[c]=d[c],o[c]=h(u);s=x}else{for(p=new Array(x),f=new Array(x),a&&(g=new Array(x)),y=0,b=Math.min(s,x);y<b&&r[y]===d[y];y++);for(b=s-1,v=x-1;b>=y&&v>=y&&r[b]===d[v];b--,v--)p[v]=o[b],f[v]=l[b],a&&(g[v]=a[b]);for(e=new Map,t=new Array(v+1),c=v;c>=y;c--)m=d[c],i=e.get(m),t[c]=void 0===i?-1:i,e.set(m,c);for(i=y;i<=b;i++)m=r[i],c=e.get(m),void 0!==c&&-1!==c?(p[c]=o[i],f[c]=l[i],a&&(g[c]=a[i]),c=t[c],e.set(m,c)):l[i]();for(c=y;c<x;c++)c in p?(o[c]=p[c],l[c]=f[c],a&&(a[c]=g[c],a[c](c))):o[c]=h(u);o=o.slice(0,s=x),r=d.slice(0)}return o}));function u(e){if(l[c]=e,a){const[e,n]=p(c);return a[c]=n,t(d[c],e)}return t(d[c])}}}function I(e,t){return v((()=>e(t)))}function U(){return!0}const H={get:(t,n,r)=>n===e?r:t.get(n),has:(e,t)=>e.has(t),set:U,deleteProperty:U,getOwnPropertyDescriptor:(e,t)=>({configurable:!0,enumerable:!0,get:()=>e.get(t),set:U,deleteProperty:U}),ownKeys:e=>e.keys()};function K(...e){return new Proxy({get(t){for(let n=e.length-1;n>=0;n--){const r=e[n][t];if(void 0!==r)return r}},has(t){for(let n=e.length-1;n>=0;n--)if(t in e[n])return!0;return!1},keys(){const t=[];for(let n=0;n<e.length;n++)t.push(...Object.keys(e[n]));return[...new Set(t)]}},H)}function R(e){const t="fallback"in e&&{fallback:()=>e.fallback};return y(F((()=>e.each),e.children,t||void 0))}function Q(e){let t=!1;const n=y((()=>e.when),void 0,{equals:(e,n)=>t?e===n:!e==!n});return y((()=>{const r=n();if(r){const n=e.children;return(t="function"==typeof n&&n.length>0)?v((()=>n(r))):n}return e.fallback}))}const J=new Set(["className","indeterminate","value","allowfullscreen","allowpaymentrequest","async","autofocus","autoplay","checked","controls","default","disabled","formnovalidate","hidden","ismap","itemscope","loop","multiple","muted","nomodule","novalidate","open","playsinline","readonly","required","reversed","seamless","selected","truespeed"]),V=new Set(["innerHTML","textContent","innerText","children"]),X={className:"class",htmlFor:"for"},Y=new Set(["beforeinput","click","dblclick","focusin","focusout","input","keydown","keyup","mousedown","mousemove","mouseout","mouseover","mouseup","pointerdown","pointermove","pointerout","pointerover","pointerup","touchend","touchmove","touchstart"]),G={xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace"};function Z(e,t,n){let r=n.length,o=t.length,i=r,l=0,s=0,a=t[o-1].nextSibling,c=null;for(;l<o||s<i;)if(t[l]!==n[s]){for(;t[o-1]===n[i-1];)o--,i--;if(o===l){const t=i<r?s?n[s-1].nextSibling:n[i-s]:a;for(;s<i;)e.insertBefore(n[s++],t)}else if(i===s)for(;l<o;)c&&c.has(t[l])||e.removeChild(t[l]),l++;else if(t[l]===n[i-1]&&n[s]===t[o-1]){const r=t[--o].nextSibling;e.insertBefore(n[s++],t[l++].nextSibling),e.insertBefore(n[--i],r),t[o]=n[i]}else{if(!c){c=new Map;let e=s;for(;e<i;)c.set(n[e],e++)}const r=c.get(t[l]);if(null!=r)if(s<r&&r<i){let a,d=l,u=1;for(;++d<o&&d<i&&null!=(a=c.get(t[d]))&&a===r+u;)u++;if(u>r-s){const o=t[l];for(;s<r;)e.insertBefore(n[s++],o)}else e.replaceChild(n[s++],t[l++])}else l++;else e.removeChild(t[l++])}}else l++,s++}const W="_$DX_DELEGATE";function ee(e,t,n){let r;return h((o=>{r=o,ae(t,e(),t.firstChild?null:void 0,n)})),()=>{r(),t.textContent=""}}function te(e,t,n){const r=document.createElement("template");r.innerHTML=e;let o=r.content.firstChild;return n&&(o=o.firstChild),o}function ne(e,t=window.document){const n=t[W]||(t[W]=new Set);for(let r=0,o=e.length;r<o;r++){const o=e[r];n.has(o)||(n.add(o),t.addEventListener(o,de))}}function re(e,t,n){null==n?e.removeAttribute(t):e.setAttribute(t,n)}function oe(e,t,n,r){null==r?e.removeAttributeNS(t,n):e.setAttributeNS(t,n,r)}function ie(e,t,n,r){r?Array.isArray(n)?(e[`$$${t}`]=n[0],e[`$$${t}Data`]=n[1]):e[`$$${t}`]=n:Array.isArray(n)?e.addEventListener(t,(e=>n[0](n[1],e))):e.addEventListener(t,n)}function le(e,t,n={}){const r=Object.keys(t),o=Object.keys(n);let i,l;for(i=0,l=o.length;i<l;i++){const r=o[i];r&&"undefined"!==r&&!(r in t)&&(ce(e,r,!1),delete n[r])}for(i=0,l=r.length;i<l;i++){const o=r[i],l=!!t[o];o&&"undefined"!==o&&n[o]!==l&&(ce(e,o,l),n[o]=l)}return n}function se(e,t,n={}){const r=e.style;if("string"==typeof t)return r.cssText=t;let o,i;for(i in"string"==typeof n&&(n={}),n)null==t[i]&&r.removeProperty(i),delete n[i];for(i in t)o=t[i],o!==n[i]&&(r.setProperty(i,o),n[i]=o);return n}function ae(e,t,n,r){if(void 0===n||r||(r=[]),"function"!=typeof t)return he(e,t,r,n);f((r=>he(e,t(),r,n)),r)}function ce(e,t,n){const r=t.split(/\s+/);for(let t=0,o=r.length;t<o;t++)e.classList.toggle(r[t],n)}function de(e){const t=`$$${e.type}`;let n=e.composedPath&&e.composedPath()[0]||e.target;for(e.target!==n&&Object.defineProperty(e,"target",{configurable:!0,value:n}),Object.defineProperty(e,"currentTarget",{configurable:!0,get:()=>n});null!==n;){const r=n[t];if(r&&!n.disabled){const o=n[`${t}Data`];if(void 0!==o?r(o,e):r(e),e.cancelBubble)return}n=n.host&&n.host!==n&&n.host instanceof Node?n.host:n.parentNode}}function ue(e,t,n={},r,o){return!o&&"children"in t&&f((()=>n.children=he(e,t.children,n.children))),f((()=>function(e,t,n,r,o={}){let i,l,s;for(const c in t){if("children"===c){r||he(e,t.children);continue}const d=t[c];if(d!==o[c]){if("style"===c)se(e,d,o[c]);else if("class"!==c||n)if("classList"===c)le(e,d,o[c]);else if("ref"===c)d(e);else if("on:"===c.slice(0,3))e.addEventListener(c.slice(3),d);else if("oncapture:"===c.slice(0,10))e.addEventListener(c.slice(10),d,!0);else if("on"===c.slice(0,2)){const t=c.slice(2).toLowerCase(),n=Y.has(t);ie(e,t,d,n),n&&ne([t])}else if((s=V.has(c))||!n&&(l=J.has(c))||(i=e.nodeName.includes("-")))!i||l||s?e[c]=d:e[(a=c,a.toLowerCase().replace(/-([a-z])/g,((e,t)=>t.toUpperCase())))]=d;else{const t=n&&c.indexOf(":")>-1&&G[c.split(":")[0]];t?oe(e,t,c,d):re(e,X[c]||c,d)}else e.className=d;o[c]=d}}var a}(e,t,r,!0,n))),n}function he(e,t,n,r,o){for(;"function"==typeof n;)n=n();if(t===n)return n;const i=typeof t,l=void 0!==r;if(e=l&&n[0]&&n[0].parentNode||e,"string"===i||"number"===i)if("number"===i&&(t=t.toString()),l){let o=n[0];o&&3===o.nodeType?o.data=t:o=document.createTextNode(t),n=ge(e,n,r,o)}else n=""!==n&&"string"==typeof n?e.firstChild.data=t:e.textContent=t;else if(null==t||"boolean"===i)n=ge(e,n,r);else{if("function"===i)return f((()=>{let o=t();for(;"function"==typeof o;)o=o();n=he(e,o,n,r)})),()=>n;if(Array.isArray(t)){const i=[];if(pe(i,t,o))return f((()=>n=he(e,i,n,r,!0))),()=>n;if(0===i.length){if(n=ge(e,n,r),l)return n}else Array.isArray(n)?0===n.length?fe(e,i,r):Z(e,n,i):null==n||""===n?fe(e,i):Z(e,l&&n||[e.firstChild],i);n=i}else if(t instanceof Node){if(Array.isArray(n)){if(l)return n=ge(e,n,r,t);ge(e,n,null,t)}else null!=n&&""!==n&&e.firstChild?e.replaceChild(t,e.firstChild):e.appendChild(t);n=t}}return n}function pe(e,t,n){let r=!1;for(let o=0,i=t.length;o<i;o++){let i,l=t[o];if(l instanceof Node)e.push(l);else if(null==l||!0===l||!1===l);else if(Array.isArray(l))r=pe(e,l)||r;else if("string"==(i=typeof l))e.push(document.createTextNode(l));else if("function"===i)if(n){for(;"function"==typeof l;)l=l();r=pe(e,Array.isArray(l)?l:[l])||r}else e.push(l),r=!0;else e.push(document.createTextNode(l.toString()))}return r}function fe(e,t,n){for(let r=0,o=t.length;r<o;r++)e.insertBefore(t[r],n)}function ge(e,t,n,r){if(void 0===n)return e.textContent="";const o=r||document.createTextNode("");if(t.length){let r=!1;for(let i=t.length-1;i>=0;i--){const l=t[i];if(o!==l){const t=l.parentNode===e;r||i?t&&e.removeChild(l):t?e.replaceChild(o,l):e.insertBefore(o,n)}else r=!0}}else e.insertBefore(o,n);return[o]}const ye=Symbol("store-raw"),be=Symbol("store-node"),ve=Symbol("store-name");function me(t,n){let r=t[e];if(!r){Object.defineProperty(t,e,{value:r=new Proxy(t,Se)});const n=Object.keys(t),o=Object.getOwnPropertyDescriptors(t);for(let e=0,i=n.length;e<i;e++){const i=n[e];if(o[i].get){const e=o[i].get.bind(r);Object.defineProperty(t,i,{get:e})}}}return r}function xe(e){return null!=e&&"object"==typeof e&&(!e.__proto__||e.__proto__===Object.prototype||Array.isArray(e))}function we(e,t=new Set){let n,r,o,i;if(n=null!=e&&e[ye])return n;if(!xe(e)||t.has(e))return e;if(Array.isArray(e)){Object.isFrozen(e)?e=e.slice(0):t.add(e);for(let n=0,i=e.length;n<i;n++)o=e[n],(r=we(o,t))!==o&&(e[n]=r)}else{Object.isFrozen(e)?e=Object.assign({},e):t.add(e);const n=Object.keys(e),l=Object.getOwnPropertyDescriptors(e);for(let s=0,a=n.length;s<a;s++)i=n[s],l[i].get||(o=e[i],(r=we(o,t))!==o&&(e[i]=r))}return e}function ke(e){let t=e[be];return t||Object.defineProperty(e,be,{value:t={}}),t}function Ce(){const[e,t]=p(void 0,{equals:!1});return e.$=t,e}const Se={get(t,n,r){if(n===ye)return t;if(n===e)return r;const o=t[n];if(n===be||"__proto__"===n)return o;const i=xe(o);if(m()&&("function"!=typeof o||t.hasOwnProperty(n))){let e,r;i&&(e=ke(o))&&(r=e._||(e._=Ce()),r()),e=ke(t),r=e[n]||(e[n]=Ce()),r()}return i?me(o):o},set:()=>!0,deleteProperty:()=>!0,ownKeys:function(e){if(m()){const t=ke(e);(t._||(t._=Ce()))()}return Reflect.ownKeys(e)},getOwnPropertyDescriptor:function(t,n){const r=Reflect.getOwnPropertyDescriptor(t,n);return!r||r.get||n===e||n===be||n===ve||(delete r.value,delete r.writable,r.get=()=>t[e][n]),r}};function Ae(e,t,n){if(e[t]===n)return;const r=Array.isArray(e),o=e.length,i=void 0===n,l=r||i===t in e;i?delete e[t]:e[t]=n;let s,a=ke(e);(s=a[t])&&s.$(),r&&e.length!==o&&(s=a.length)&&s.$(s,void 0),l&&(s=a._)&&s.$(s,void 0)}function je(e,t,n=[]){let r,o=e;if(t.length>1){r=t.shift();const i=typeof r,l=Array.isArray(e);if(Array.isArray(r)){for(let o=0;o<r.length;o++)je(e,[r[o]].concat(t),[r[o]].concat(n));return}if(l&&"function"===i){for(let o=0;o<e.length;o++)r(e[o],o)&&je(e,[o].concat(t),[o].concat(n));return}if(l&&"object"===i){const{from:o=0,to:i=e.length-1,by:l=1}=r;for(let r=o;r<=i;r+=l)je(e,[r].concat(t),[r].concat(n));return}if(t.length>1)return void je(e[r],t,[r].concat(n));o=e[r],n=[r].concat(n)}let i=t[0];"function"==typeof i&&(i=i(o,n),i===o)||void 0===r&&null==i||(i=we(i),void 0===r||xe(o)&&xe(i)&&!Array.isArray(i)?function(e,t){const n=Object.keys(t);for(let r=0;r<n.length;r+=1){const o=n[r];Ae(e,o,t[o])}}(o,i):Ae(e,r,i))}function _e(e,t){const n=we(e||{});return[me(n),function(...e){b((()=>je(n,e)))}]}const Pe=x([{path:"start"},{}]);function $e(e){const t=location.hash.replace(/#/,"")||"start",[n,r]=_e({path:t});window.addEventListener("popstate",(e=>{const t=e.target.location.hash.replace(/#/,"");r({...n,path:t})}));const o=[n,{apiUrl:e.values.api}];return I(Pe.Provider,{value:o,get children(){return e.children}})}let Te={data:""},Oe=e=>"object"==typeof window?((e?e.querySelector("#_goober"):window._goober)||Object.assign((e||document.head).appendChild(document.createElement("style")),{innerHTML:" ",id:"_goober"})).firstChild:e||Te,Ne=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(})/g,Le=/\/\*[^]*?\*\/|\s\s+|\n/g,De=(e,t)=>{let n,r="",o="",i="";for(let l in e){let s=e[l];"object"==typeof s?(n=t?t.replace(/([^,])+/g,(e=>l.replace(/([^,])+/g,(t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)))):l,o+="@"==l[0]?"f"==l[1]?De(s,l):l+"{"+De(s,"k"==l[1]?"":t)+"}":De(s,n)):"@"==l[0]&&"i"==l[1]?r=l+" "+s+";":(l=l.replace(/[A-Z]/g,"-$&").toLowerCase(),i+=De.p?De.p(l,s):l+":"+s+";")}return i[0]?(n=t?t+"{"+i+"}":i,r+n+o):r+o},ze={},Be=e=>{let t="";for(let n in e)t+=n+("object"==typeof e[n]?Be(e[n]):e[n]);return t},Ee=(e,t,n,r,o)=>{let i="object"==typeof e?Be(e):e,l=ze[i]||(ze[i]=(e=>{let t=0,n=11;for(;t<e.length;)n=101*n+e.charCodeAt(t++)>>>0;return"go"+n})(i));if(!ze[l]){let t="object"==typeof e?e:(e=>{let t,n=[{}];for(;t=Ne.exec(e.replace(Le,""));)t[4]&&n.shift(),t[3]?n.unshift(n[0][t[3]]=n[0][t[3]]||{}):t[4]||(n[0][t[1]]=t[2]);return n[0]})(e);ze[l]=De(o?{["@keyframes "+l]:t}:t,n?"":"."+l)}return((e,t,n)=>{-1==t.data.indexOf(e)&&(t.data=n?e+t.data:t.data+e)})(ze[l],t,r),l},Me=(e,t,n)=>e.reduce(((e,r,o)=>{let i=t[o];if(i&&i.call){let e=i(n),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;i=t?"."+t:e&&"object"==typeof e?e.props?"":De(e,""):e}return e+r+(null==i?"":i)}),"");function qe(e){let t=this||{},n=e.call?e(t.p):e;return Ee(n.unshift?n.raw?Me(n,[].slice.call(arguments,1),t.p):n.reduce(((e,n)=>n?Object.assign(e,n.call?n(t.p):n):e),{}):n,Oe(t.target),t.g,t.o,t.k)}qe.bind({g:1});let Fe=qe.bind({k:1});const Ie=x();function Ue(e){let t=this||{};return(...n)=>{const r=r=>{const o=K(r,{theme:w(Ie)}),i=K(o,{get className(){const e=o.className,r="className"in o&&/^go[0-9]+/.test(e);return[e,qe.apply({target:t.target,o:r,p:o,g:t.g},n)].filter(Boolean).join(" ")}}),[l,s]=function(e,...t){const n=new Set(t.flat()),r=Object.getOwnPropertyDescriptors(e),o=t.map((t=>{const n={};for(let o=0;o<t.length;o++){const i=t[o];Object.defineProperty(n,i,r[i]?r[i]:{get:()=>e[i]})}return n}));return o.push(new Proxy({get:t=>n.has(t)?void 0:e[t],has:t=>!n.has(t)&&t in e,keys:()=>Object.keys(e).filter((e=>!n.has(e)))},H)),o}(i,["as"]),a=l.as||e;let c;var d,u,h,p;return"function"==typeof a?c=a(s):(c=document.createElement(a),d=c,"function"==typeof(u=s)?f((e=>ue(d,u(),e,h,p))):ue(d,u,void 0,h,p)),c};return r.className=e=>v((()=>qe.apply({target:t.target,p:e,g:t.g},n))),r}}const He=Ue("nav")`
    color: black;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 2rem;
`,Ke=Ue("a")`
    font-size: 14px;
    display: block;
    padding: 0 1rem;
`,Re=()=>(w(Pe),I(He,{get children(){return[I(Ke,{href:"#start",children:"Start"}),I(Ke,{href:"#sync-check",children:"Sync Check"}),I(Ke,{href:"#sync-draft",children:"Sync Draft"}),I(Ke,{href:"#sync-live",children:"Sync Live"})]}})),Qe=async(e,t={})=>new Promise(((n,r)=>{jQuery.ajax({url:"/wp-admin/admin-ajax.php",type:"post",dataType:"json",data:{action:e,...t},success:function(e){n(e)},error:(e,t)=>{r(t)}})})),Je=async(e,t)=>new Promise(((n,r)=>{jQuery.ajax({url:e,type:t?"post":"get",dataType:"json",data:t,success:function(e){n(e)},error:(e,t)=>{r(t)}})})),Ve=Ue("div")`
    background-color: white;
    padding: 1.0rem 2rem 2rem;
    border: 3px solid #ccc;
    border-radius: 3px;
    min-height: 50vh;
`,Xe=e=>I(Ve,{get children(){return e.children}}),Ye=Ue("div")`
    display: flex;
`,Ge=Ue("div")`
    flex: 1;
`,Ze=Ue("div")`
    width: 220px;
    align-items: center;
    justify-content: center;
    display: flex;
`,We=Ue("p")`
    font-size: 14px;
    padding-bottom: .5rem;
`,et=Ue("div")`
    font-size: 40px;
    font-weight: bold;
    text-align: center;
    width: 100%;
    padding: 3rem 0 2rem;
`,tt=Ue("h2")`
    font-size: 24px;
    margin-bottom: .5rem;
`,nt=Ue("h3")`
    font-size: 18px;
    margin-bottom: .5rem;
    margin-top: 0px;
`,rt=e=>I(Ye,{get children(){return[I(Ge,{get children(){return[I(tt,{get children(){return e.title}}),I(We,{get children(){return e.description}})]}}),I(Ze,{get children(){return e.actions}})]}});Ue("svg")`
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
`;const ot=te('<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="200px" height="200px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid"><circle cx="50" cy="50" r="32" stroke-width="8" stroke-dasharray="50.26548245743669 50.26548245743669" fill="none" stroke-linecap="round"><animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="2.0408163265306123s" keyTimes="0;1" values="0 50 50;360 50 50"></animateTransform></circle></svg>'),it={small:"20px",medium:"30px",large:"50px",xlarge:"100px"},lt=({size:e="large",inverted:t=!1})=>{let n={display:"block","shape-rendering":"auto",width:it[e],height:it[e],stroke:"#006ba1"};return t&&(n.stroke="#fff"),(()=>{const e=ot.cloneNode(!0);return se(e,n),e})()},st=Ue("button")`
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

`,at=Ue("div")`
    position: absolute;
    right: 7px;
`,ct=e=>I(st,K(e,{get children(){return[(t=()=>e.children,y(t,void 0,n?void 0:{equals:n})),I(Q,{get when(){return e.loading},get children(){return I(at,{get children(){return I(lt,{size:"small",get inverted(){return!e.disabled}})}})}})];var t,n}})),dt=Ue("div")`
    display: flex;
    margin-bottom: 2px;
`,ut=Ue("div")`
    background-color: #ddd;
    font-size: 10px;
    color: #999;
    padding: 0px 4px 0px 4px;
    height: 16px;
    line-height: 15px;
    margin: 0 5px 0 0;
    border-radius: 2px;
    width: 40px;
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
`,pt=Ue("a")`
    display: block;
    color: grey;
    text-decoration: none;
`,ft=Ue("div")`
    padding: 0 5px 0 0;
    svg {
        fill: ${e=>e.color};
        transition: fill .2s ease-in;
    }
`,gt=te('<svg height="10" width="10"><circle cx="5" cy="5" r="5" stroke-width="0"></circle></svg>'),yt=({showCheckButton:e,showSyncButton:t,showDraft:n,showLive:r,item:o,onClick:i,onTypeClick:l})=>{const s=(e,t)=>{let n="#bbbbbb";return"error"===t?n="#da694b":""===t?n="#bbbbbb":e&&(n=e.synced?"#99da4b":"#e9da4e"),n};return I(dt,{get children(){return[I(Q,{when:n,get children(){return I(ft,{get color(){var e,t;return s(null===(e=o.status)||void 0===e?void 0:e.draft,null===(t=o.status)||void 0===t?void 0:t.state)},get children(){return gt.cloneNode(!0)}})}}),I(Q,{when:r,get children(){return I(ft,{get color(){var e,t;return s(null===(e=o.status)||void 0===e?void 0:e.live,null===(t=o.status)||void 0===t?void 0:t.state)},get children(){return gt.cloneNode(!0)}})}}),I(Q,{when:t,get children(){return I(ht,{onClick:i,children:"sync"})}}),I(Q,{when:e,get children(){return I(ht,{onClick:i,children:"check"})}}),I(ut,{onClick:()=>l(o.type),get children(){return o.type}}),I(pt,{target:"_new",get href(){return o.permalink},get children(){return o.permalink}})]}})},bt=({type:e})=>{const[t,{apiUrl:n}]=w(Pe),[r,o]=_e({list:[]}),[i,l]=p(!1);g((async()=>{const e=(await Qe("get_all_resources")).list.map(((e,t)=>({...e,index:t})));o({list:e})}));const s=async t=>{try{(await Je(`${n}/sync.php`,{action:"sync",permalink:t.permalink,release:e,sync_check:!1})).data?o("list",t.index,"status",{[e]:{synced:!0},state:"loaded"}):o("list",t.index,"status",{state:"error"})}catch(e){o("list",t.index,"status",{state:"error"})}},a="draft"===e?"Begin to sync to Draft":"Publish everything to Live",c="draft"===e?"Sync Draft":"Sync Live",d="draft"===e?"This is where you can make sure that wordpress and the draft content is in sync":"This is where you can make sure that Draft and Live are in sync";return I(Xe,{get children(){return[I(rt,{title:c,description:d,get actions(){return I(ct,{get loading(){return i()},onClick:()=>(async()=>{if(i())return;let t=!1;if(("live"===e&&confirm("Do you really which to publish everything?")||"draft"===e)&&(t=!0),t){l(!0),r.list.forEach(((e,t)=>{o("list",t,"status",{state:""}),t++}));for await(let e of r.list)await s(e);l(!1)}})(),children:a})}}),I(R,{get each(){return r.list},children:t=>I(yt,{showDraft:"draft"===e,showLive:"live"===e,showSyncButton:!0,onClick:()=>(async e=>{l(!0),await s(e),l(!1)})(t),onTypeClick:()=>(async e=>{l(!0);const t=r.list.filter((t=>t.type===e));t.forEach(((e,t)=>{o("list",t,"status",{state:""}),t++}));for await(let e of t)await s(e);l(!1)})(t.type),item:t,get permalink(){return t.permalink}})})]}})},vt=()=>{const[e,{apiUrl:t}]=w(Pe),[n,r]=_e({list:[]}),[o,i]=p(!1);console.log(t),g((async()=>{const e=(await Qe("get_all_resources")).list.map(((e,t)=>({...e,index:t})));r({list:e})}));const l=async e=>{try{const n=await Je(`${t}/check-sync.php`,{permalink:e.permalink});r("list",e.index,"status",{draft:n.data.resourceStatus.find((e=>"draft"===e.target&&"__original"===e.comparedTo)),live:n.data.resourceStatus.find((e=>"live"===e.target&&"draft"===e.comparedTo)),state:"loaded"})}catch(t){r("list",e.index,"status",{state:"error"})}};return I(Xe,{get children(){return[I(rt,{title:"Sync Check",description:"This is where you can check if all content is in sync",get actions(){return I(ct,{get loading(){return o()},onClick:()=>(async()=>{if(!o()){i(!0),n.list.forEach(((e,t)=>{r("list",t,"status",{state:""}),t++}));for await(let e of n.list)await l(e);i(!1)}})(),children:"Begin to check"})}}),I(R,{get each(){return n.list},children:e=>I(yt,{showDraft:!0,showLive:!0,showCheckButton:!0,item:e,get permalink(){return e.permalink},onClick:()=>(async e=>{i(!0),await l(e),i(!1)})(e),onTypeClick:()=>(async e=>{i(!0);const t=n.list.filter((t=>t.type===e));t.forEach(((e,t)=>{r("list",t,"status",{state:""}),t++}));for await(let e of t)await l(e);i(!1)})(e.type)})})]}})},mt=()=>I(Xe,{get children(){return I(rt,{title:"Start",description:"This plugin lets you control and debug content through the content service"})}}),xt=Ue("div")`
     color: black;
     max-width: 1200px;
     margin: 0 auto;
`;Ue("div")`
`,Ue("div")`
    font-size: 1rem;
    padding: 1rem 0;
`;const wt=()=>{const[e]=w(Pe);return I(xt,{get children(){return[I(et,{children:"Cerberus (Content Next) Dashboard"}),I(Re,{}),I(Q,{get when(){return"start"===e.path},get children(){return I(mt,{})}}),I(Q,{get when(){return"sync-check"===e.path},get children(){return I(vt,{})}}),I(Q,{get when(){return"sync-draft"===e.path},get children(){return I(bt,{type:"draft"})}}),I(Q,{get when(){return"sync-live"===e.path},get children(){return I(bt,{type:"live"})}})]}})},kt=Ue("div")`
    padding-top: 6px;

    ${e=>e.box?"\n        position: relative;\n        min-width: 255px;\n        border: 1px solid #ccd0d4;\n        box-shadow: 0 1px 1px rgb(0 0 0 / 4%);\n        background: #fff;\n        padding: 1rem;\n        box-sizing: border-box;\n        margin-bottom: 7px;\n    ":""}

`,Ct=Ue("div")`
    color: #a7aaad;
    border: 1px solid rgb(220, 220, 222);
    background: #f6f7f7;
    padding: .75rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 3px;
`,St=Ue("div")`
    text-align: center;
`,At=({options:e})=>{console.log(e);const[t,n]=_e({}),[r,o]=p(!0),[i,l]=p(!1),[s,a]=p(!1),c={permalink:e.permalink};g((()=>{wp&&wp.hooks&&wp.hooks.addAction&&(d(),wp.hooks.addAction("dls.post-saved","dls",(()=>{d(!1)})))}));const d=async(t=!0)=>{t&&(o(!0),await new Promise((e=>setTimeout(e,500))));try{const t=await Je(`${e.api}/check-sync.php`,c);n({draft:t.data.resourceStatus.find((e=>"draft"===e.target&&"__original"===e.comparedTo)),live:t.data.resourceStatus.find((e=>"live"===e.target&&"draft"===e.comparedTo)),state:"loaded"})}catch(e){console.log("ee",e),n({state:"error"})}o(!1)},u=async()=>{a(!0);(await Qe("unpublish_from_live",c)).data?d(!1):n({state:"error"}),await new Promise((e=>setTimeout(e,1e3))),a(!1)};return I(kt,{get box(){return e.optionsMeta},get children(){return[I(Q,{get when(){return r()},get children(){return I(Ct,{get children(){return[I(lt,{}),I(St,{children:"Checking content in draft and live"})]}})}}),I(Q,{get when(){return!r()},get children(){return[I(St,{children:"Publish content"}),I(ct,{get loading(){return i()},onClick:()=>(async()=>{l(!0),(await Qe("publish_to_live",c)).data?d(!1):n({state:"error"}),await new Promise((e=>setTimeout(e,1e3))),l(!1)})(),get disabled(){var e;return null===(e=t.live)||void 0===e?void 0:e.synced},get children(){var e;return null!==(e=t.live)&&void 0!==e&&e.synced?"Published to live site":"Publish to live site"}}),I(ct,{get loading(){return s()},onClick:()=>u(),get disabled(){var e;return!(null!==(e=t.live)&&void 0!==e&&e.synced)},get children(){return t.live&&t.live.synced?"Unpublish from live site":"Content not published"}}),I(Q,{get when(){return e.enableTestContent},get children(){return I(ct,{get loading(){return s()},onClick:()=>u(),get disabled(){var e;return!(null!==(e=t.test)&&void 0!==e&&e.synced)},get children(){return t.test&&t.test.synced?"Unpublish from test target":"Publish to test target"}})}}),I(Q,{get when(){return e.enableDiffButton},get children(){return I(ct,{children:"Show diff (raw)"})}})]}})]}})},jt=Ue("input")`
`,_t=Ue("div")`
    display: flex;
    flex-direction: column;
    width: 100%;
    padding-right: 10px;
    box-sizing: border-box;
`,Pt=Ue("label")`
    padding: 5px 5px 0px 5px;
    font-size: 10px;
    height: 18px;
`,$t=({placeholder:e="",label:t=" ",value:n,onChange:r=(()=>{})})=>{const o=e=>{r(e.target.value)};return I(_t,{get children(){return[I(Pt,{children:t}),I(jt,{type:"text",get value(){return n()},placeholder:e,onKeyup:o})]}})},Tt=Ue("select")`
    max-width: 100% !important;
`,Ot=Ue("div")`
    display: flex;
    flex-direction: column;
    width: 100%;
    padding-left: 10px;
    box-sizing: border-box;
`,Nt=Ue("label")`
    padding: 5px 5px 0px 5px;
    font-size: 10px;
    height: 18px;
`,Lt=te("<option></option>"),Dt=({options:e=[],placeholder:t="",label:n=" ",value:r,onChange:o=(()=>{})})=>{const[i,l]=p(!1),s=e=>{console.log(e),o(e.target.value),l(!0)};return I(Ot,{get children(){return[I(Nt,{children:n}),I(Tt,{get value(){return r()},placeholder:t,onChange:s,get children(){return I(R,{each:e,children:e=>(()=>{const t=Lt.cloneNode(!0);return ae(t,(()=>e.label)),f((n=>{const o=e.value,l=e.value===r()&&!i();return o!==n._v$&&(t.value=n._v$=o),l!==n._v$2&&(t.selected=n._v$2=l),n}),{_v$:void 0,_v$2:void 0}),t})()})}})]}})},zt={open:Fe`
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
`},Bt=Ue("div")`
     color: black;
     max-width: 1200px;
     margin: 0 auto;
`;Ue("div")`
`,Ue("div")`
    font-size: 1rem;
    padding: 1rem 0;
`;const Et=Ue("div")`
    display: flex;
    justify-content: flex-end;
`,Mt=Ue("div")`
    max-height: 0px;
    overflow: hidden;
    ${e=>`animation: ${zt[e.state]} .4s ease-in-out forwards;`}
`,qt=Ue("div")`
    background-color: #fff;
    border: 1px solid #aaa;
    border-radius: 3px;
    margin-top: 20px;
    padding: 20px;
`,Ft=Ue("div")`
    width: 100%;
    display: flex;
    padding-bottom: 10px;
`,It=Ue("div")`
    width: 100%;
    display: flex;
    justify-content: flex-end;
`,Ut=Ue("div")`
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
`,Ht=Ue("table")`
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
`,Kt=Ue("td")`
    display: flex;
    justify-content: flex-end;
`,Rt=te("<thead><tr><th>Domain</th><th>Target</th><th>SiteId</th><th></th></tr></thead>"),Qt=te("<tbody></tbody>"),Jt=te("<tr><td></td><td></td><td></td></tr>"),Vt=[{value:"draft",label:"Draft"},{value:"live",label:"Live"},{value:"test",label:"Test"}];const Xt=({options:e})=>{const[t,n]=_e({list:[]}),[r,o]=p(""),[i,l]=p("draft"),[s,a]=p("init"),[c,d]=p(!1),u=async()=>{const t=await Je(`${e.api}/get-domain-settings.php`);n("list",t.data.resources)},h=async(t=function(e){for(var t="",n="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",r=n.length,o=0;o<e;o++)t+=n.charAt(Math.floor(Math.random()*r));return t}(20))=>{try{if(c())return;d(!0),await Je(`${e.api}/upsert-domain-setting.php`,{domain:r(),target:i(),id:t}),await u(),l("draft"),o(""),d(!1),a("close")}catch(e){console.log(e)}},f=(e,t)=>{"domain"===e&&o(t),"target"===e&&l(t)};return g((()=>{u()})),I(Bt,{get children(){return[I(et,{children:"Domain Settings"}),I(We,{children:"This is the list of domains and targets that will be used for this site. You can add as many as you need but the domains need to be pointed to the server to make it work."}),I(Et,{get children(){return I(ct,{onClick:()=>a("open"),children:"Add new domain and target"})}}),I(Mt,{get state(){return s()},get children(){return I(qt,{get children(){return[I(nt,{children:"Add new domain and target"}),I(Ft,{get children(){return[I($t,{placeholder:"domain",label:"Domain:",value:r,onChange:e=>f("domain",e)}),I(Dt,{options:Vt,value:i,onChange:e=>f("target",e)})]}}),I(It,{get children(){return[I(ct,{onClick:()=>a("close"),children:"Cancel"}),I(ct,{get loading(){return c()},leftMargin:!0,get disabled(){return!r()||!i()},onClick:()=>h(),children:"Save"})]}})]}})}}),I(Ht,{get children(){return[Rt.cloneNode(!0),(()=>{const n=Qt.cloneNode(!0);return ae(n,I(R,{get each(){return t.list},children:t=>(()=>{const n=Jt.cloneNode(!0),r=n.firstChild,o=r.nextSibling,i=o.nextSibling;return ae(r,(()=>t.content.domain)),ae(o,(()=>t.content.target)),ae(i,(()=>t.content.siteId)),ae(n,I(Kt,{get children(){return I(Ut,{onClick:()=>(async t=>{try{await Je(`${e.api}/delete-domain-setting.php`,{id:t}),await u()}catch(e){console.log(e)}})(t.externalId),children:"delete"})}}),null),n})()})),n})()]}})]}})},Yt=e=>{try{return JSON.parse(document.getElementById(e).innerHTML)}catch(e){return{}}},Gt=()=>{const e=document.getElementById("dls-metabox-root");if(e){const t=Yt("dls-data");ee((()=>I(At,{options:t})),e)}};jQuery(document).ready((function(e){wp&&wp.data&&wp.data.dispatch&&wp.data.dispatch("core/editor").disablePublishSidebar(),(()=>{if(wp.data){let e=!1;wp.data.subscribe((()=>{const t=wp.data.select("core/editor").isSavingPost();e!==t&&(e=t,wp.data.select("core/editor").didPostSaveRequestSucceed()&&wp.hooks.doAction("dls.post-saved"))}))}})();let t={};try{t=e("#dls-hooks").length>0?JSON.parse(e("#dls-hooks").html()):{hook:""}}catch(e){}console.log("Current hook",t&&t.hook),"post.php"===t.hook||"nav-menus.php"===t.hook?Gt():t.hook.includes("toplevel_page_draft-live-sync")?(()=>{const e=Yt("dls-data");ee((()=>I($e,{values:e,get children(){return I(wt,{})}})),document.getElementById("dls-root"))})():t.hook.includes("toplevel_page_cerberus-domain-settings")?(()=>{const e=document.getElementById("dls-domain-settings-root"),t=Yt("dls-data");console.log(t),ee((()=>I(Xt,{options:t})),e)})():t.hook.includes(".php")||Gt()}))}();
//# sourceMappingURL=draft-live-sync-boot-0.11.0.js.map
