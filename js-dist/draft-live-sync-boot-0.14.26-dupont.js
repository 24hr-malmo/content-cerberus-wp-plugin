!function(){"use strict";const e=Symbol("solid-proxy"),t={equals:(e,t)=>e===t};let n=M;const r={},o={owned:null,cleanups:null,context:null,owner:null};var i=null;let l=null,s=null,a=null,c=null,d=null,u=0;function p(e,t){t&&(i=t);const n=s,r=i,l=0===e.length?o:{owned:null,cleanups:null,context:null,owner:r};let a;i=l,s=null;try{j((()=>a=e((()=>D(l)))),!0)}finally{s=n,i=r}return a}function h(e,n){n=n?Object.assign({},t,n):t;const o={value:e,observers:null,observerSlots:null,pending:r,comparator:n.equals||void 0};return[C.bind(o),e=>("function"==typeof e&&(e=e(o.pending!==r?o.pending:o.value)),A(o,e))]}function f(e,t,n){E(L(e,t,!1))}function g(e,t,r){n=N;const o=L(e,t,!1);o.user=!0,d&&d.push(o)}function v(e,n,o){o=o?Object.assign({},t,o):t;const i=L(e,n,!0);return i.pending=r,i.observers=null,i.observerSlots=null,i.state=0,i.comparator=o.equals||void 0,E(i),C.bind(i)}function b(e){if(a)return e();let t;const n=a=[];try{t=e()}finally{a=null}return j((()=>{for(let e=0;e<n.length;e+=1){const t=n[e];if(t.pending!==r){const e=t.pending;t.pending=r,A(t,e)}}}),!1),t}function m(e){let t,n=s;return s=null,t=e(),s=n,t}function y(e){return null===i||(null===i.cleanups?i.cleanups=[e]:i.cleanups.push(e)),e}function x(){return s}function w(e){const t=Symbol("context");return{id:t,Provider:q(t),defaultValue:e}}function k(e){return z(i,e.id)||e.defaultValue}function S(e){const t=v(e);return v((()=>I(t())))}function C(){if(this.state&&this.sources){const e=c;c=null,1===this.state?E(this):T(this),c=e}if(s){const e=this.observers?this.observers.length:0;s.sources?(s.sources.push(this),s.sourceSlots.push(e)):(s.sources=[this],s.sourceSlots=[e]),this.observers?(this.observers.push(s),this.observerSlots.push(s.sources.length-1)):(this.observers=[s],this.observerSlots=[s.sources.length-1])}return this.value}function A(e,t,n){return e.comparator&&e.comparator(e.value,t)?t:a?(e.pending===r&&a.push(e),e.pending=t,t):(e.value=t,!e.observers||c&&!e.observers.length||j((()=>{for(let t=0;t<e.observers.length;t+=1){const n=e.observers[t];l,n.observers&&2!==n.state&&P(n),n.state=1,n.pure?c.push(n):d.push(n)}if(c.length>1e6)throw c=[],new Error}),!1),t)}function E(e){if(!e.fn)return;D(e);const t=i,n=s,r=u;s=i=e,function(e,t,n){let r;try{r=e.fn(t)}catch(e){O(e)}(!e.updatedAt||e.updatedAt<=n)&&(e.observers&&e.observers.length?A(e,r):e.value=r,e.updatedAt=n)}(e,e.value,r),s=n,i=t}function L(e,t,n,r){const l={fn:e,state:1,updatedAt:null,owned:null,sources:null,sourceSlots:null,cleanups:null,value:t,owner:i,context:null,pure:n};return null===i||i!==o&&(i.owned?i.owned.push(l):i.owned=[l]),l}function $(e){let t,n=1===e.state&&e;if(e.suspense&&m(e.suspense.inFallback))return e.suspense.effects.push(e);for(;e=e.owner;)2===e.state?t=e:1===e.state&&(n=e,t=void 0);if(t){const e=c;if(c=null,T(t),c=e,!n||1!==n.state)return}n&&E(n)}function j(e,t){if(c)return e();let r=!1;t||(c=[]),d?r=!0:d=[],u++;try{e()}catch(e){O(e)}finally{!function(e){c&&(M(c),c=null);if(e)return;d.length?b((()=>{n(d),d=null})):d=null}(r)}}function M(e){for(let t=0;t<e.length;t++)$(e[t])}function N(e){let t,n=0;for(t=0;t<e.length;t++){const r=e[t];r.user?e[n++]=r:$(r)}const r=e.length;for(t=0;t<n;t++)$(e[t]);for(t=r;t<e.length;t++)$(e[t])}function T(e){e.state=0;for(let t=0;t<e.sources.length;t+=1){const n=e.sources[t];n.sources&&(1===n.state?$(n):2===n.state&&T(n))}}function P(e){for(let t=0;t<e.observers.length;t+=1){const n=e.observers[t];n.state||(n.state=2,n.observers&&P(n))}}function D(e){let t;if(e.sources)for(;e.sources.length;){const t=e.sources.pop(),n=e.sourceSlots.pop(),r=t.observers;if(r&&r.length){const e=r.pop(),o=t.observerSlots.pop();n<r.length&&(e.sourceSlots[o]=n,r[n]=e,t.observerSlots[n]=o)}}if(e.owned){for(t=0;t<e.owned.length;t++)D(e.owned[t]);e.owned=null}if(e.cleanups){for(t=0;t<e.cleanups.length;t++)e.cleanups[t]();e.cleanups=null}e.state=0,e.context=null}function O(e){throw e}function z(e,t){return e&&(e.context&&e.context[t]||e.owner&&z(e.owner,t))}function I(e){if("function"==typeof e&&!e.length)return I(e());if(Array.isArray(e)){const t=[];for(let n=0;n<e.length;n++){const r=I(e[n]);Array.isArray(r)?t.push.apply(t,r):t.push(r)}return t}return e}function q(e){return function(t){let n;var r;return E(L((()=>n=m((()=>(i.context={[e]:t.value},S((()=>t.children)))))),r,!0)),n}}const B=Symbol("fallback");function R(e){for(let t=0;t<e.length;t++)e[t]()}function F(e,t){return m((()=>e(t)))}function U(){return!0}const H={get:(t,n,r)=>n===e?r:t.get(n),has:(e,t)=>e.has(t),set:U,deleteProperty:U,getOwnPropertyDescriptor:(e,t)=>({configurable:!0,enumerable:!0,get:()=>e.get(t),set:U,deleteProperty:U}),ownKeys:e=>e.keys()};function K(...e){return new Proxy({get(t){for(let n=e.length-1;n>=0;n--){const r=e[n][t];if(void 0!==r)return r}},has(t){for(let n=e.length-1;n>=0;n--)if(t in e[n])return!0;return!1},keys(){const t=[];for(let n=0;n<e.length;n++)t.push(...Object.keys(e[n]));return[...new Set(t)]}},H)}function J(e){const t="fallback"in e&&{fallback:()=>e.fallback};return v(function(e,t,n={}){let r=[],o=[],i=[],l=0,s=t.length>1?[]:null;return y((()=>R(i))),()=>{let a,c,d=e()||[];return m((()=>{let e,t,h,f,g,v,b,m,y,x=d.length;if(0===x)0!==l&&(R(i),i=[],r=[],o=[],l=0,s&&(s=[])),n.fallback&&(r=[B],o[0]=p((e=>(i[0]=e,n.fallback()))),l=1);else if(0===l){for(o=new Array(x),c=0;c<x;c++)r[c]=d[c],o[c]=p(u);l=x}else{for(h=new Array(x),f=new Array(x),s&&(g=new Array(x)),v=0,b=Math.min(l,x);v<b&&r[v]===d[v];v++);for(b=l-1,m=x-1;b>=v&&m>=v&&r[b]===d[m];b--,m--)h[m]=o[b],f[m]=i[b],s&&(g[m]=s[b]);for(e=new Map,t=new Array(m+1),c=m;c>=v;c--)y=d[c],a=e.get(y),t[c]=void 0===a?-1:a,e.set(y,c);for(a=v;a<=b;a++)y=r[a],c=e.get(y),void 0!==c&&-1!==c?(h[c]=o[a],f[c]=i[a],s&&(g[c]=s[a]),c=t[c],e.set(y,c)):i[a]();for(c=v;c<x;c++)c in h?(o[c]=h[c],i[c]=f[c],s&&(s[c]=g[c],s[c](c))):o[c]=p(u);o=o.slice(0,l=x),r=d.slice(0)}return o}));function u(e){if(i[c]=e,s){const[e,n]=h(c);return s[c]=n,t(d[c],e)}return t(d[c])}}}((()=>e.each),e.children,t||void 0))}function Q(e){let t=!1;const n=v((()=>e.when),void 0,{equals:(e,n)=>t?e===n:!e==!n});return v((()=>{const r=n();if(r){const n=e.children;return(t="function"==typeof n&&n.length>0)?m((()=>n(r))):n}return e.fallback}))}const Z=new Set(["className","indeterminate","value","allowfullscreen","allowpaymentrequest","async","autofocus","autoplay","checked","controls","default","disabled","formnovalidate","hidden","ismap","itemscope","loop","multiple","muted","nomodule","novalidate","open","playsinline","readonly","required","reversed","seamless","selected","truespeed"]),V=new Set(["innerHTML","textContent","innerText","children"]),X={className:"class",htmlFor:"for"},Y=new Set(["beforeinput","click","dblclick","focusin","focusout","input","keydown","keyup","mousedown","mousemove","mouseout","mouseover","mouseup","pointerdown","pointermove","pointerout","pointerover","pointerup","touchend","touchmove","touchstart"]),G={xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace"};function W(e,t){return v(e,void 0,t?void 0:{equals:t})}function ee(e,t,n){let r=n.length,o=t.length,i=r,l=0,s=0,a=t[o-1].nextSibling,c=null;for(;l<o||s<i;)if(t[l]!==n[s]){for(;t[o-1]===n[i-1];)o--,i--;if(o===l){const t=i<r?s?n[s-1].nextSibling:n[i-s]:a;for(;s<i;)e.insertBefore(n[s++],t)}else if(i===s)for(;l<o;)c&&c.has(t[l])||e.removeChild(t[l]),l++;else if(t[l]===n[i-1]&&n[s]===t[o-1]){const r=t[--o].nextSibling;e.insertBefore(n[s++],t[l++].nextSibling),e.insertBefore(n[--i],r),t[o]=n[i]}else{if(!c){c=new Map;let e=s;for(;e<i;)c.set(n[e],e++)}const r=c.get(t[l]);if(null!=r)if(s<r&&r<i){let a,d=l,u=1;for(;++d<o&&d<i&&null!=(a=c.get(t[d]))&&a===r+u;)u++;if(u>r-s){const o=t[l];for(;s<r;)e.insertBefore(n[s++],o)}else e.replaceChild(n[s++],t[l++])}else l++;else e.removeChild(t[l++])}}else l++,s++}const te="_$DX_DELEGATE";function ne(e,t,n){let r;return p((o=>{r=o,de(t,e(),t.firstChild?null:void 0,n)})),()=>{r(),t.textContent=""}}function re(e,t,n){const r=document.createElement("template");r.innerHTML=e;let o=r.content.firstChild;return n&&(o=o.firstChild),o}function oe(e,t=window.document){const n=t[te]||(t[te]=new Set);for(let r=0,o=e.length;r<o;r++){const o=e[r];n.has(o)||(n.add(o),t.addEventListener(o,pe))}}function ie(e,t,n){null==n?e.removeAttribute(t):e.setAttribute(t,n)}function le(e,t,n,r){null==r?e.removeAttributeNS(t,n):e.setAttributeNS(t,n,r)}function se(e,t,n,r){r?Array.isArray(n)?(e[`$$${t}`]=n[0],e[`$$${t}Data`]=n[1]):e[`$$${t}`]=n:Array.isArray(n)?e.addEventListener(t,(e=>n[0](n[1],e))):e.addEventListener(t,n)}function ae(e,t,n={}){const r=Object.keys(t),o=Object.keys(n);let i,l;for(i=0,l=o.length;i<l;i++){const r=o[i];r&&"undefined"!==r&&!(r in t)&&(ue(e,r,!1),delete n[r])}for(i=0,l=r.length;i<l;i++){const o=r[i],l=!!t[o];o&&"undefined"!==o&&n[o]!==l&&(ue(e,o,l),n[o]=l)}return n}function ce(e,t,n={}){const r=e.style;if("string"==typeof t)return r.cssText=t;let o,i;for(i in"string"==typeof n&&(n={}),n)null==t[i]&&r.removeProperty(i),delete n[i];for(i in t)o=t[i],o!==n[i]&&(r.setProperty(i,o),n[i]=o);return n}function de(e,t,n,r){if(void 0===n||r||(r=[]),"function"!=typeof t)return fe(e,t,r,n);f((r=>fe(e,t(),r,n)),r)}function ue(e,t,n){const r=t.split(/\s+/);for(let t=0,o=r.length;t<o;t++)e.classList.toggle(r[t],n)}function pe(e){const t=`$$${e.type}`;let n=e.composedPath&&e.composedPath()[0]||e.target;for(e.target!==n&&Object.defineProperty(e,"target",{configurable:!0,value:n}),Object.defineProperty(e,"currentTarget",{configurable:!0,get:()=>n});null!==n;){const r=n[t];if(r&&!n.disabled){const o=n[`${t}Data`];if(void 0!==o?r(o,e):r(e),e.cancelBubble)return}n=n.host&&n.host!==n&&n.host instanceof Node?n.host:n.parentNode}}function he(e,t,n={},r,o){return!o&&"children"in t&&f((()=>n.children=fe(e,t.children,n.children))),f((()=>function(e,t,n,r,o={}){let i,l,s;for(const c in t){if("children"===c){r||fe(e,t.children);continue}const d=t[c];if(d!==o[c]){if("style"===c)ce(e,d,o[c]);else if("class"!==c||n)if("classList"===c)ae(e,d,o[c]);else if("ref"===c)d(e);else if("on:"===c.slice(0,3))e.addEventListener(c.slice(3),d);else if("oncapture:"===c.slice(0,10))e.addEventListener(c.slice(10),d,!0);else if("on"===c.slice(0,2)){const t=c.slice(2).toLowerCase(),n=Y.has(t);se(e,t,d,n),n&&oe([t])}else if((s=V.has(c))||!n&&(l=Z.has(c))||(i=e.nodeName.includes("-")))!i||l||s?e[c]=d:e[(a=c,a.toLowerCase().replace(/-([a-z])/g,((e,t)=>t.toUpperCase())))]=d;else{const t=n&&c.indexOf(":")>-1&&G[c.split(":")[0]];t?le(e,t,c,d):ie(e,X[c]||c,d)}else e.className=d;o[c]=d}}var a}(e,t,r,!0,n))),n}function fe(e,t,n,r,o){for(;"function"==typeof n;)n=n();if(t===n)return n;const i=typeof t,l=void 0!==r;if(e=l&&n[0]&&n[0].parentNode||e,"string"===i||"number"===i)if("number"===i&&(t=t.toString()),l){let o=n[0];o&&3===o.nodeType?o.data=t:o=document.createTextNode(t),n=be(e,n,r,o)}else n=""!==n&&"string"==typeof n?e.firstChild.data=t:e.textContent=t;else if(null==t||"boolean"===i)n=be(e,n,r);else{if("function"===i)return f((()=>{let o=t();for(;"function"==typeof o;)o=o();n=fe(e,o,n,r)})),()=>n;if(Array.isArray(t)){const i=[];if(ge(i,t,o))return f((()=>n=fe(e,i,n,r,!0))),()=>n;if(0===i.length){if(n=be(e,n,r),l)return n}else Array.isArray(n)?0===n.length?ve(e,i,r):ee(e,n,i):null==n||""===n?ve(e,i):ee(e,l&&n||[e.firstChild],i);n=i}else if(t instanceof Node){if(Array.isArray(n)){if(l)return n=be(e,n,r,t);be(e,n,null,t)}else null!=n&&""!==n&&e.firstChild?e.replaceChild(t,e.firstChild):e.appendChild(t);n=t}}return n}function ge(e,t,n){let r=!1;for(let o=0,i=t.length;o<i;o++){let i,l=t[o];if(l instanceof Node)e.push(l);else if(null==l||!0===l||!1===l);else if(Array.isArray(l))r=ge(e,l)||r;else if("string"==(i=typeof l))e.push(document.createTextNode(l));else if("function"===i)if(n){for(;"function"==typeof l;)l=l();r=ge(e,Array.isArray(l)?l:[l])||r}else e.push(l),r=!0;else e.push(document.createTextNode(l.toString()))}return r}function ve(e,t,n){for(let r=0,o=t.length;r<o;r++)e.insertBefore(t[r],n)}function be(e,t,n,r){if(void 0===n)return e.textContent="";const o=r||document.createTextNode("");if(t.length){let r=!1;for(let i=t.length-1;i>=0;i--){const l=t[i];if(o!==l){const t=l.parentNode===e;r||i?t&&e.removeChild(l):t?e.replaceChild(o,l):e.insertBefore(o,n)}else r=!0}}else e.insertBefore(o,n);return[o]}const me=Symbol("store-raw"),ye=Symbol("store-node"),xe=Symbol("store-name");function we(t,n){let r=t[e];if(!r){Object.defineProperty(t,e,{value:r=new Proxy(t,_e)});const n=Object.keys(t),o=Object.getOwnPropertyDescriptors(t);for(let e=0,i=n.length;e<i;e++){const i=n[e];if(o[i].get){const e=o[i].get.bind(r);Object.defineProperty(t,i,{get:e})}}}return r}function ke(e){return null!=e&&"object"==typeof e&&(!e.__proto__||e.__proto__===Object.prototype||Array.isArray(e))}function Se(e,t=new Set){let n,r,o,i;if(n=null!=e&&e[me])return n;if(!ke(e)||t.has(e))return e;if(Array.isArray(e)){Object.isFrozen(e)?e=e.slice(0):t.add(e);for(let n=0,i=e.length;n<i;n++)o=e[n],(r=Se(o,t))!==o&&(e[n]=r)}else{Object.isFrozen(e)?e=Object.assign({},e):t.add(e);const n=Object.keys(e),l=Object.getOwnPropertyDescriptors(e);for(let s=0,a=n.length;s<a;s++)i=n[s],l[i].get||(o=e[i],(r=Se(o,t))!==o&&(e[i]=r))}return e}function Ce(e){let t=e[ye];return t||Object.defineProperty(e,ye,{value:t={}}),t}function Ae(){const[e,t]=h(void 0,{equals:!1});return e.$=t,e}const _e={get(t,n,r){if(n===me)return t;if(n===e)return r;const o=t[n];if(n===ye||"__proto__"===n)return o;const i=ke(o);if(x()&&("function"!=typeof o||t.hasOwnProperty(n))){let e,r;i&&(e=Ce(o))&&(r=e._||(e._=Ae()),r()),e=Ce(t),r=e[n]||(e[n]=Ae()),r()}return i?we(o):o},set:()=>!0,deleteProperty:()=>!0,ownKeys:function(e){if(x()){const t=Ce(e);(t._||(t._=Ae()))()}return Reflect.ownKeys(e)},getOwnPropertyDescriptor:function(t,n){const r=Reflect.getOwnPropertyDescriptor(t,n);return!r||r.get||n===e||n===ye||n===xe||(delete r.value,delete r.writable,r.get=()=>t[e][n]),r}};function Ee(e,t,n){if(e[t]===n)return;const r=Array.isArray(e),o=e.length,i=void 0===n,l=r||i===t in e;i?delete e[t]:e[t]=n;let s,a=Ce(e);(s=a[t])&&s.$(),r&&e.length!==o&&(s=a.length)&&s.$(s,void 0),l&&(s=a._)&&s.$(s,void 0)}function Le(e,t,n=[]){let r,o=e;if(t.length>1){r=t.shift();const i=typeof r,l=Array.isArray(e);if(Array.isArray(r)){for(let o=0;o<r.length;o++)Le(e,[r[o]].concat(t),[r[o]].concat(n));return}if(l&&"function"===i){for(let o=0;o<e.length;o++)r(e[o],o)&&Le(e,[o].concat(t),[o].concat(n));return}if(l&&"object"===i){const{from:o=0,to:i=e.length-1,by:l=1}=r;for(let r=o;r<=i;r+=l)Le(e,[r].concat(t),[r].concat(n));return}if(t.length>1)return void Le(e[r],t,[r].concat(n));o=e[r],n=[r].concat(n)}let i=t[0];"function"==typeof i&&(i=i(o,n),i===o)||void 0===r&&null==i||(i=Se(i),void 0===r||ke(o)&&ke(i)&&!Array.isArray(i)?function(e,t){const n=Object.keys(t);for(let r=0;r<n.length;r+=1){const o=n[r];Ee(e,o,t[o])}}(o,i):Ee(e,r,i))}function $e(e,t){const n=Se(e||{});return[we(n),function(...e){b((()=>Le(n,e)))}]}const je=w([{path:"start"},{}]);function Me(e){const t=location.hash.replace(/#/,"")||"start",[n,r]=$e({path:t});window.addEventListener("popstate",(e=>{const t=e.target.location.hash.replace(/#/,"");r({...n,path:t})}));const o=[n,{apiUrl:e.values.api}];return F(je.Provider,{value:o,get children(){return e.children}})}let Ne={data:""},Te=e=>"object"==typeof window?((e?e.querySelector("#_goober"):window._goober)||Object.assign((e||document.head).appendChild(document.createElement("style")),{innerHTML:" ",id:"_goober"})).firstChild:e||Ne,Pe=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(})/g,De=/\/\*[^]*?\*\/|\s\s+|\n/g,Oe=(e,t)=>{let n,r="",o="",i="";for(let l in e){let s=e[l];"object"==typeof s?(n=t?t.replace(/([^,])+/g,(e=>l.replace(/([^,])+/g,(t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)))):l,o+="@"==l[0]?"f"==l[1]?Oe(s,l):l+"{"+Oe(s,"k"==l[1]?"":t)+"}":Oe(s,n)):"@"==l[0]&&"i"==l[1]?r=l+" "+s+";":(l=l.replace(/[A-Z]/g,"-$&").toLowerCase(),i+=Oe.p?Oe.p(l,s):l+":"+s+";")}return i[0]?(n=t?t+"{"+i+"}":i,r+n+o):r+o},ze={},Ie=e=>{let t="";for(let n in e)t+=n+("object"==typeof e[n]?Ie(e[n]):e[n]);return t},qe=(e,t,n,r,o)=>{let i="object"==typeof e?Ie(e):e,l=ze[i]||(ze[i]=(e=>{let t=0,n=11;for(;t<e.length;)n=101*n+e.charCodeAt(t++)>>>0;return"go"+n})(i));if(!ze[l]){let t="object"==typeof e?e:(e=>{let t,n=[{}];for(;t=Pe.exec(e.replace(De,""));)t[4]&&n.shift(),t[3]?n.unshift(n[0][t[3]]=n[0][t[3]]||{}):t[4]||(n[0][t[1]]=t[2]);return n[0]})(e);ze[l]=Oe(o?{["@keyframes "+l]:t}:t,n?"":"."+l)}return((e,t,n)=>{-1==t.data.indexOf(e)&&(t.data=n?e+t.data:t.data+e)})(ze[l],t,r),l},Be=(e,t,n)=>e.reduce(((e,r,o)=>{let i=t[o];if(i&&i.call){let e=i(n),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;i=t?"."+t:e&&"object"==typeof e?e.props?"":Oe(e,""):e}return e+r+(null==i?"":i)}),"");function Re(e){let t=this||{},n=e.call?e(t.p):e;return qe(n.unshift?n.raw?Be(n,[].slice.call(arguments,1),t.p):n.reduce(((e,n)=>n?Object.assign(e,n.call?n(t.p):n):e),{}):n,Te(t.target),t.g,t.o,t.k)}Re.bind({g:1});let Fe=Re.bind({k:1});const Ue=w();function He(e){let t=this||{};return(...n)=>{const r=r=>{const o=K(r,{theme:k(Ue)}),i=K(o,{get className(){const e=o.className,r="className"in o&&/^go[0-9]+/.test(e);return[e,Re.apply({target:t.target,o:r,p:o,g:t.g},n)].filter(Boolean).join(" ")}}),[l,s]=function(e,...t){const n=new Set(t.flat()),r=Object.getOwnPropertyDescriptors(e),o=t.map((t=>{const n={};for(let o=0;o<t.length;o++){const i=t[o];Object.defineProperty(n,i,r[i]?r[i]:{get:()=>e[i]})}return n}));return o.push(new Proxy({get:t=>n.has(t)?void 0:e[t],has:t=>!n.has(t)&&t in e,keys:()=>Object.keys(e).filter((e=>!n.has(e)))},H)),o}(i,["as"]),a=l.as||e;let c;var d,u,p,h;return"function"==typeof a?c=a(s):(c=document.createElement(a),d=c,"function"==typeof(u=s)?f((e=>he(d,u(),e,p,h))):he(d,u,void 0,p,h)),c};return r.className=e=>m((()=>Re.apply({target:t.target,p:e,g:t.g},n))),r}}const Ke=He("nav")`
    color: black;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 2rem;
`,Je=He("a")`
    font-size: 14px;
    display: block;
    padding: 0 1rem;
`,Qe=()=>(k(je),F(Ke,{get children(){return[F(Je,{href:"#start",children:"Start"}),F(Je,{href:"#sync-check",children:"Sync Check"}),F(Je,{href:"#sync-draft",children:"Sync Draft"}),F(Je,{href:"#sync-live",children:"Sync Live"})]}})),Ze=async(e,t={})=>new Promise(((n,r)=>{jQuery.ajax({url:"/wp-admin/admin-ajax.php",type:"post",dataType:"json",data:{action:e,...t},success:function(e){n(e)},error:(e,t)=>{r(t)}})})),Ve=async(e,t)=>new Promise(((n,r)=>{jQuery.ajax({url:e,type:t?"post":"get",dataType:"json",data:t,success:function(e){n(e)},error:(e,t)=>{r(e.responseJSON)}})})),Xe=He("div")`
    background-color: white;
    padding: 1.0rem 2rem 2rem;
    border: 3px solid #ccc;
    border-radius: 3px;
    min-height: 50vh;
`,Ye=e=>F(Xe,{get children(){return e.children}}),Ge=He("div")`
    display: flex;
`,We=He("div")`
    flex: 1;
`,et=He("div")`
    width: 220px;
    align-items: center;
    justify-content: center;
    display: flex;
`,tt=He("p")`
    font-size: 14px;
    padding-bottom: .5rem;
`,nt=He("div")`
    font-size: 40px;
    font-weight: bold;
    text-align: center;
    width: 100%;
    padding: 3rem 0 2rem;
`,rt=He("h2")`
    font-size: 24px;
    margin-bottom: .5rem;
`,ot=He("h3")`
    font-size: 18px;
    margin-bottom: .5rem;
    margin-top: 0px;
`,it=e=>F(Ge,{get children(){return[F(We,{get children(){return[F(rt,{get children(){return e.title}}),F(tt,{get children(){return e.description}})]}}),F(et,{get children(){return e.actions}})]}});He("svg")`
    margin: auto; 
    background: white;
    display: block; 
    shape-rendering: auto;
    width: ${e=>e.width};
    height: ${e=>e.height};
`,He("svg")`
    margin: auto; 
    background: rgb(255, 255, 255); 
    display: block; 
    shape-rendering: auto;
`;const lt=re('<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="200px" height="200px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid"><circle cx="50" cy="50" r="32" stroke-width="8" stroke-dasharray="50.26548245743669 50.26548245743669" fill="none" stroke-linecap="round"><animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="2.0408163265306123s" keyTimes="0;1" values="0 50 50;360 50 50"></animateTransform></circle></svg>'),st={small:"20px",medium:"30px",large:"50px",xlarge:"100px"},at=({size:e="large",inverted:t=!1})=>{let n={display:"block","shape-rendering":"auto",width:st[e],height:st[e],stroke:"#006ba1"};return t&&(n.stroke="#fff"),(()=>{const e=lt.cloneNode(!0);return ce(e,n),e})()},ct=He("button")`
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

`,dt=He("div")`
    position: absolute;
    right: 7px;
`,ut=e=>F(ct,K(e,{get children(){return[W((()=>e.children)),F(Q,{get when(){return e.loading},get children(){return F(dt,{get children(){return F(at,{size:"small",get inverted(){return!e.disabled}})}})}})]}})),pt=He("div")`
    display: flex;
    margin-bottom: 2px;
`,ht=He("div")`
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
`,ft=He("div")`
    background-color: #2271b1;
    font-size: 10px;
    color: white;
    padding: 0px 4px 0px 4px;
    height: 16px;
    line-height: 15px;
    margin: 0 5px 0 0;
    border-radius: 2px;
    cursor: pointer;
`,gt=He("a")`
    display: block;
    color: grey;
    text-decoration: none;
`,vt=He("div")`
    padding: 0 5px 0 0;
    svg {
        fill: ${e=>e.color};
        transition: fill .2s ease-in;
    }
`,bt=re('<svg height="10" width="10"><circle cx="5" cy="5" r="5" stroke-width="0"></circle></svg>'),mt=({showCheckButton:e,showSyncButton:t,showDraft:n,showLive:r,item:o,onClick:i,onTypeClick:l})=>{const s=(e,t)=>{let n="#bbbbbb";return"error"===t?n="#da694b":""===t?n="#bbbbbb":e&&(n=e.synced?"#99da4b":"#e9da4e"),n};return F(pt,{get children(){return[F(Q,{when:n,get children(){return F(vt,{get color(){var e,t;return s(null===(e=o.status)||void 0===e?void 0:e.draft,null===(t=o.status)||void 0===t?void 0:t.state)},get children(){return bt.cloneNode(!0)}})}}),F(Q,{when:r,get children(){return F(vt,{get color(){var e,t;return s(null===(e=o.status)||void 0===e?void 0:e.live,null===(t=o.status)||void 0===t?void 0:t.state)},get children(){return bt.cloneNode(!0)}})}}),F(Q,{when:t,get children(){return F(ft,{onClick:i,children:"sync"})}}),F(Q,{when:e,get children(){return F(ft,{onClick:i,children:"check"})}}),F(ht,{onClick:()=>l(o.type),get children(){return o.type}}),F(gt,{target:"_new",get href(){return o.permalink},get children(){return o.permalink||"/"}})]}})},yt=re('<div style="padding-bottom:10px;"><label for="filter">Filter</label><input type="text" name="filter"></div>'),xt=re("<div></div>"),wt=({type:e})=>{const[t,{apiUrl:n}]=k(je),[r,o]=$e({list:[]}),[i,l]=$e({list:[]}),[s,a]=h(!1),[c,d]=h(!1);g((async()=>{const e=(await Ze("get_all_resources")).list.map(((e,t)=>({...e,index:t})));o({list:e}),l({list:e})}));const u=async(t,{syncTreeAndCache:r=!0})=>{try{(await Ve(`${n}/sync.php`,{action:"sync",permalink:t.permalink,release:e,sync_check:!1,sync_tree:r})).data?o("list",t.index,"status",{[e]:{synced:!0},state:"loaded"}):o("list",t.index,"status",{state:"error"})}catch(e){o("list",t.index,"status",{state:"error"})}},p=e=>{(e=>{if(""===e)return void l({list:r.list});const t=r.list.filter((t=>t.permalink.startsWith(e)));l({list:t})})(e.target.value)},f="draft"===e?"Begin to sync to Draft":"Publish list to Live",v="draft"===e?"Sync Draft":"Sync Live",b="draft"===e?"This is where you can make sure that wordpress and the draft content is in sync":"This is where you can make sure that Draft and Live are in sync";return F(Ye,{get children(){return[F(it,{title:v,description:b,get actions(){return(()=>{const t=xt.cloneNode(!0);return de(t,F(ut,{get loading(){return s()},onClick:()=>(async t=>{if(s())return;let n=!1;if(("live"===e&&confirm("Do you really want to publish the list?")||"draft"===e)&&(n=!0),n){a(!0),i.list.forEach(((e,t)=>{l("list",t,"status",{state:""}),t++}));for await(let e of i.list)await u(e,t);a(!1)}})({syncTreeAndCache:!1}),children:f}),null),de(t,F(ut,{get loading(){return c()},onClick:()=>(async()=>{try{d(!0);const t=await Ve(`${n}/recreate-tree.php`,{action:"recreate_tree",release:e});d(!1),window&&console.log(t),window&&window.alert("Recreating tree done - check console.log for response")}catch(e){window&&window.alert("Error recreating tree - check console.log")}})(),children:"Recreate tree, required after type/all syncs"}),null),t})()}}),(()=>{const e=yt.cloneNode(!0);return e.firstChild.nextSibling.$$input=p,e})(),F(J,{get each(){return i.list},children:t=>F(mt,{showDraft:"draft"===e,showLive:"live"===e,showSyncButton:!0,onClick:()=>(async(e,t)=>{a(!0),await u(e,t),a(!1)})(t,{syncTreeAndCache:!0}),onTypeClick:()=>(async(e,t)=>{a(!0);const n=i.list.filter((t=>t.type===e));n.forEach(((e,t)=>{l("list",t,"status",{state:""}),t++}));for await(let e of n)await u(e,t);a(!1)})(t.type,{syncTreeAndCache:!1}),item:t,get permalink(){return t.permalink}})})]}})};oe(["input"]);const kt=()=>{const[e,{apiUrl:t}]=k(je),[n,r]=$e({list:[]}),[o,i]=h(!1);g((async()=>{const e=(await Ze("get_all_resources")).list.map(((e,t)=>({...e,index:t})));r({list:e})}));const l=async e=>{try{const n=await Ve(`${t}/check-sync.php`,{permalink:e.permalink});r("list",e.index,"status",{draft:n.data.resourceStatus.find((e=>"draft"===e.target&&"__original"===e.comparedTo)),live:n.data.resourceStatus.find((e=>"live"===e.target&&"draft"===e.comparedTo)),state:"loaded"})}catch(t){r("list",e.index,"status",{state:"error"})}};return F(Ye,{get children(){return[F(it,{title:"Sync Check",description:"This is where you can check if all content is in sync",get actions(){return F(ut,{get loading(){return o()},onClick:()=>(async()=>{if(!o()){i(!0),n.list.forEach(((e,t)=>{r("list",t,"status",{state:""}),t++}));for await(let e of n.list)await l(e);i(!1)}})(),children:"Begin to check"})}}),F(J,{get each(){return n.list},children:e=>F(mt,{showDraft:!0,showLive:!0,showCheckButton:!0,item:e,get permalink(){return e.permalink},onClick:()=>(async e=>{i(!0),await l(e),i(!1)})(e),onTypeClick:()=>(async e=>{i(!0);const t=n.list.filter((t=>t.type===e));t.forEach(((e,t)=>{r("list",t,"status",{state:""}),t++}));for await(let e of t)await l(e);i(!1)})(e.type)})})]}})},St=He("p")`
    font-size: 14px;
    padding-bottom: .5rem;
    background-color: #ffeaee;
    border: 2px solid #ffc0cb;
    border-radius: 3px;
    padding: 1rem 2rem;
    text-align: center;
`,Ct=()=>F(Ye,{get children(){return[F(it,{title:"Start",description:"This plugin lets you control and debug content through the content service."}),F(St,{children:"This is mainly used while developing or by admins!"})]}}),At=He("div")`
     color: black;
     max-width: 1200px;
     margin: 0 auto;
`;He("div")`
`,He("div")`
    font-size: 1rem;
    padding: 1rem 0;
`;const _t=()=>{const[e]=k(je);return F(At,{get children(){return[F(nt,{children:"Content Dashboard"}),F(Qe,{}),F(Q,{get when(){return"start"===e.path},get children(){return F(Ct,{})}}),F(Q,{get when(){return"sync-check"===e.path},get children(){return F(kt,{})}}),F(Q,{get when(){return"sync-draft"===e.path},get children(){return F(wt,{type:"draft"})}}),F(Q,{get when(){return"sync-live"===e.path},get children(){return F(wt,{type:"live"})}})]}})},Et=He("div")`

    padding-top: 6px;

    ${e=>e.horizontal?"\n        display: flex;   \n        align-items: center;\n        border-bottom: 1px dotted grey;\n        padding: 0 10px 8px 10px;\n        margin-left: -10px;\n        margin-right: -10px;\n        justify-content: flex-end;\n    ":""} 

    ${e=>e.box?"\n        position: relative;\n        min-width: 255px;\n        border: 1px solid #ccd0d4;\n        box-shadow: 0 1px 1px rgb(0 0 0 / 4%);\n        background: #fff;\n        padding: 1rem;\n        box-sizing: border-box;\n        margin-bottom: 7px;\n    ":""}

`,Lt=He("div")`
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

`,$t=He("div")`
    text-align: center;
    min-width: 100px;
    ${e=>e.horizontal?"\n        margin-top: 10px;\n    ":""}

`,jt=({options:e})=>{const[t,n]=$e({}),[r,o]=h(!0),[i,l]=h(!1),[s,a]=h(!1),[c,d]=h(!1),[u,p]=h(!1),[f,v]=h(!1),[b,m]=h(!1),[x,w]=h(!1),[k,S]=h(!1),C={permalink:e.permalink};let A,E;g((()=>{if(e.metaMenu){E=document.querySelector("#save_menu_footer");const e=$();y((()=>{e&&e()}))}else{var t,n;null!==(t=wp)&&void 0!==t&&null!==(n=t.data)&&void 0!==n&&n.select&&(A=wp.data.select("core/editor"),wp.domReady(L))}})),g((()=>{wp&&wp.hooks&&wp.hooks.addAction&&(N(),wp.hooks.addAction("dls.post-saved","dls",(()=>{var e,n,r;if(null!=t&&null!==(e=t.draft)&&void 0!==e&&e.exists||null===(n=A)||void 0===n||!n.isPublishingPost())null!=t&&null!==(r=t.draft)&&void 0!==r&&r.exists&&(L(),N());else{const{isSavingPost:e}=A;let t=0;const n=setInterval((()=>{(!e()||t>=50)&&(location.reload(),clearInterval(n))}),100)}})))})),g((()=>{let e,t;const n=n=>{var r;if(null!=n&&null!==(r=n.detail)&&void 0!==r&&r.hasChange){if(!e){if(e=document.querySelector(".editor-post-publish-button"),!e)return;t=()=>{m(!1),e.setAttribute("disabled",!0)},e.addEventListener("click",t)}e&&(m(!0),e.removeAttribute("disabled"))}};document.addEventListener("cerberusListenerEvent",n),y((()=>{document.removeEventListener("cerberusListenerEvent",n),e&&t&&e.removeEventListener("click",t)}))}));const L=()=>{let e;const t=wp.data.subscribe(_.debounce((()=>{if(e||(e=document.querySelector(".editor-post-publish-button")),!e)return;const n=A.isEditedPostDirty(),r=A.hasNonPostEntityChanges(),o=b();r||n||o?(p(!0),e.removeAttribute("disabled"),t()):(p(!1),e.setAttribute("disabled",!0))}),100))},$=()=>{let e,t=!1;E.setAttribute("disabled",!0);let n=()=>{t||clearInterval(e)},r=()=>{t||(e=o())};const o=()=>setInterval((()=>{var o,i;null!==(o=window)&&void 0!==o&&null!==(i=o.wpNavMenu)&&void 0!==i&&i.menusChanged&&(t=!0,j(),clearInterval(e),window.removeEventListener("blur",n),window.removeEventListener("focus",r))}),500);return e=o(),window.addEventListener("blur",n),window.addEventListener("focus",r),()=>{clearInterval(e),window.removeEventListener("blur",n),window.removeEventListener("focus",r)}},j=()=>{E.removeAttribute("disabled"),v(!0)},M=(e,t)=>{let n=document.querySelector(".changes-disabled-message");t?n?n.innerHTML=t:(n=document.createElement("i"),n.classList.add("changes-disabled-message"),n.innerHTML=t,e.prepend(n)):n&&n.parentNode.removeChild(n)},N=async(t=!0)=>{t&&o(!0);try{var r;const t=await Ze("check_sync",{...C,api_path:C.permalink});if(null==t||null===(r=t.data)||void 0===r||!r.resourceStatus)throw C;n({draft:t.data.resourceStatus.find((e=>"draft"===e.target&&"__original"===e.comparedTo)),live:t.data.resourceStatus.find((e=>"live"===e.target&&"draft"===e.comparedTo)),state:"loaded"}),S(!1),e.metaMenu&&T()}catch(e){console.log("--- meta-box --- Can't find any data with check-sync of payload: ",e),S(!0),o(!1),n({state:"error"})}o(!1)},T=async()=>{var n;const r=document.querySelectorAll(".menu-theme-locations > .menu-settings-input"),o=document.querySelector(".menu-settings-group.menu-theme-locations"),i=null===(n=t.draft)||void 0===n?void 0:n.exists,l=t.live&&t.live.exists;((e,t)=>{t?(e.style.pointerEvents="none",e.style.cursor="not-allowed",e.style.opacity=.5):(e.style.pointerEvents="auto",e.style.cursor="default",e.style.opacity=1)})(o,!i||l),M(o,l?"Menu must be unpublished before toggling location":i?null:"Menu must be created before toggling location");const{currentMenuIsRegisteredToLocation:s,locationsSetToOtherMenus:a}=(t=>{let n=!1,r=!1;for(let i of t){const t=i.querySelector("input");if(t.dataset.cerberusListenerAdded||(t.addEventListener("change",(()=>{d(!0),j()})),t.dataset.cerberusListenerAdded="true"),i.querySelector(".theme-location-set")){var o;const n=null===(o=t.name.match(/menu-locations\[([^\]]+)\]/))||void 0===o?void 0:o[1];e.locationLanguages&&n&&e.locationLanguages[n]===e.currentLanguage?(t.setAttribute("disabled",!0),i.style.pointerEvents="none",i.style.opacity=.5,r=!0):(t.removeAttribute("disabled"),i.style.pointerEvents="auto",i.style.opacity=1)}t.getAttribute("checked")&&(n=!0)}return{currentMenuIsRegisteredToLocation:n,locationsSetToOtherMenus:r}})(r);a&&!l&&i&&M(o,"Some locations cannot be set because they are already set"),location.search.includes("menu=0")||(w(!0),(e=>{const t=document.querySelector(".submitdelete.deletion.menu-delete");if(!t)return;let n=document.querySelector(".delete-link-replacement");e?(t.style.display="none",n?n.style.display="inline":(n=document.createElement("span"),n.classList.add("delete-link-replacement"),n.innerHTML="To delete a menu it must be unpublished (and unregisterered from all display locations)",n.style.color="#a7aaad",n.style.fontSize="12px",t.parentNode.prepend(n))):(t.style.display="inline",n&&(n.style.display="none"))})(s||l))},P=(e={})=>{if(document){const t=new CustomEvent("cerberusChangeEvent",{detail:e});document.dispatchEvent(t)}},D=async e=>{e.preventDefault(),e.stopPropagation(),l(!0);(await Ze("publish_to_live",C)).data?N(!1):n({state:"error"}),l(!1),P({action:"publish_to_live_done"})},O=async e=>{e.preventDefault(),e.stopPropagation(),a(!0);(await Ze("unpublish_from_live",C)).data?N(!1):n({state:"error"}),a(!1),P({action:"unpublish_from_live_done"})};return F(Et,{get horizontal(){return e.metaMenu},get box(){return e.optionsMeta},get children(){return[F(Q,{get when(){return r()},get children(){return F(Lt,{get horizontal(){return e.metaMenu},get children(){return[F(at,{get size(){return e.metaMenu?"small":"large"}}),F($t,{children:"Checking content in draft and live"})]}})}}),F(Q,{get when(){return!r()},get children(){return[F(Q,{get when(){return k()},get children(){return F(Lt,{get horizontal(){return e.metaMenu},get children(){return F($t,{children:"Content must be saved before publishing"})}})}}),F(Q,{get when(){var e;return!c()&&(null===(e=t.draft)||void 0===e?void 0:e.exists)},get children(){return[F($t,{get horizontal(){return e.metaMenu},children:"Publish content"}),F(Q,{get when(){var e;return!(null!==(e=t.live)&&void 0!==e&&e.exists)},get children(){return[F(ut,{get leftMargin(){return e.metaMenu},get loading(){return i()},onClick:e=>D(e),get disabled(){return u()||f()||b()},get children(){return u()||f()||b()?"Save draft before publishing to live":"Publish to live site"}}),F(ut,{get leftMargin(){return e.metaMenu},get disabled(){var e;return!(null!==(e=t.live)&&void 0!==e&&e.synced)},children:"Content not published"})]}}),F(Q,{get when(){var e;return null===(e=t.live)||void 0===e?void 0:e.exists},get children(){return[F(ut,{get leftMargin(){return e.metaMenu},get loading(){return i()},onClick:e=>D(e),get disabled(){var e;return(null===(e=t.live)||void 0===e?void 0:e.synced)||u()||f()||b()},get children(){var e;return u()||f()||b()?"Save draft before updating on live":null!==(e=t.live)&&void 0!==e&&e.synced?"Updated on live site":"Update on live site"}}),F(ut,{get leftMargin(){return e.metaMenu},get loading(){return s()},onClick:e=>O(e),get disabled(){return b()},children:"Unpublish"})]}})]}}),F(Q,{get when(){return e.metaMenu},get children(){return F(Lt,{get horizontal(){return e.metaMenu},get children(){return[F(Q,{get when(){return!x()},get children(){return F($t,{children:"Enter a 'Menu Name' above to create a new menu"})}}),(()=>{const e=W((()=>{var e;return!(c()||null!==(e=t.draft)&&void 0!==e&&e.exists)}),!0);return F(Q,{get when(){return e()&&x()},get children(){return F($t,{children:"Save menu with menu items in order to publish"})}})})(),F(Q,{get when(){return c()},get children(){return F($t,{children:"Save the changes before publishing"})}})]}})}})]}}),F(Q,{get when(){return e.enableTestContent},get children(){return F(ut,{get leftMargin(){return e.metaMenu},get loading(){return s()},onClick:e=>O(e),get disabled(){var e;return!(null!==(e=t.test)&&void 0!==e&&e.synced)},get children(){return t.test&&t.test.synced?"Unpublish from test target":"Publish to test target"}})}}),F(Q,{get when(){return e.enableDiffButton},get children(){return F(ut,{get leftMargin(){return e.metaMenu},children:"Show diff (raw)"})}})]}})},Mt=He("input")`
`,Nt=He("div")`
    display: flex;
    flex-direction: column;
    width: 100%;
    padding-right: 10px;
    box-sizing: border-box;
`,Tt=He("label")`
    padding: 5px 5px 0px 5px;
    font-size: 10px;
    height: 18px;
`,Pt=({placeholder:e="",label:t=" ",value:n,onChange:r=(()=>{})})=>{const o=e=>{r(e.target.value)};return F(Nt,{get children(){return[F(Tt,{children:t}),F(Mt,{type:"text",get value(){return n()},placeholder:e,onKeyup:o})]}})},Dt=He("select")`
    max-width: 100% !important;
`,Ot=He("div")`
    display: flex;
    flex-direction: column;
    width: 100%;
    padding-left: 10px;
    box-sizing: border-box;
`,zt=He("label")`
    padding: 5px 5px 0px 5px;
    font-size: 10px;
    height: 18px;
`,It=re("<option></option>"),qt=({options:e=[],placeholder:t="",label:n=" ",value:r,onChange:o=(()=>{})})=>{const i=e=>{console.log(e),o(e.target.value)};return F(Ot,{get children(){return[F(zt,{children:n}),F(Dt,{get value(){return r()},placeholder:t,onChange:i,get children(){return F(J,{each:e,children:e=>(()=>{const t=It.cloneNode(!0);return de(t,(()=>e.label)),f((n=>{const o=e.value,i=e.value===r();return o!==n._v$&&(t.value=n._v$=o),i!==n._v$2&&(t.selected=n._v$2=i),n}),{_v$:void 0,_v$2:void 0}),t})()})}})]}})},Bt={open:Fe`
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
`},Rt=He("div")`
     color: black;
     max-width: 1200px;
     margin: 0 auto;
`;He("div")`
`,He("div")`
    font-size: 1rem;
    padding: 1rem 0;
`;const Ft=He("div")`
    display: flex;
    justify-content: flex-end;
`,Ut=He("div")`
    max-height: 0px;
    overflow: hidden;
    ${e=>`animation: ${Bt[e.state]} .4s ease-in-out forwards;`}
`,Ht=He("div")`
    background-color: #fff;
    border: 1px solid #aaa;
    border-radius: 3px;
    margin-top: 20px;
    padding: 20px;
`,Kt=He("div")`
    width: 100%;
    display: flex;
    padding-bottom: 10px;
`,Jt=He("div")`
    width: 100%;
    display: flex;
    justify-content: flex-end;
`,Qt=He("div")`
    color red;
`,Zt=He("div")`
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
`;He("div")`
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
`;const Vt=He("table")`
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
`,Xt=He("td")`
    display: flex;
    justify-content: flex-start;
`,Yt=He("div")`
    margin-left: 2rem;
`,Gt=re("<thead><tr><th>Domain</th><th>Distribution ID</th><th>Target</th><th>SiteId</th><th>Delete</th><th>Do not index</th></tr></thead>"),Wt=re("<tbody></tbody>"),en=re('<input type="checkbox">'),tn=re("<tr><td></td><td></td><td></td><td></td><td></td></tr>"),nn=[{value:"draft",label:"Draft"},{value:"live",label:"Live"},{value:"test",label:"Test"}];const rn=({options:e})=>{const[t,n]=$e({list:[]}),[r,o]=h(""),[i,l]=h(""),[s,a]=h("draft"),[c,d]=h("init"),[u,p]=h(""),[v,b]=h(!1),m=async()=>{const t=await Ve(`${e.api}/get-domain-settings.php`);t.sort(((e,t)=>e.key.localeCompare(t.key))),n("list",t)},y=async(t=function(e){for(var t="",n="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",r=n.length,o=0;o<e;o++)t+=n.charAt(Math.floor(Math.random()*r));return t}(20))=>{try{const n=function(e){const t=e.match(/^(?:https?:\/\/)?(?:www\.)?([^\/\n]+)/);if(t){const e=t[1];return/^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(e)?e:null}return null}(r());if(null===n)return void p("Invalid domain. Please enter a valid domain without http(s):// or path.");if(p(""),v())return;b(!0),await Ve(`${e.api}/upsert-domain-setting.php`,{domain:n,target:s(),id:t,cloudfrontDistributionId:i()}),await m(),a("draft"),o(""),l(""),b(!1),d("close")}catch(e){console.log("ee",e),"domain-already-exists"===e.error?p("Domain already exists"):p("Something caused an error"),b(!1)}},x=(e,t)=>{"domain"===e&&o(t),"target"===e&&a(t),"cloudfrontDistributionId"===e&&l(t)};g((()=>{m()}));const w=async(n,r)=>{const o=t.list.find((e=>e.externalId===n));o&&(await Ve(`${e.api}/upsert-domain-setting.php`,{domain:o.content.domain,target:o.content.target,id:o.externalId,cloudfrontDistributionId:o.content.cloudfrontDistributionId,doNotIndex:r.doNotIndex}),await m())};return F(Rt,{get children(){return[F(nt,{children:"Domain Settings"}),F(tt,{children:"This is the list of domains and targets that will be used for this site. You can add as many as you need but the domains need to be pointed to the server to make it work."}),F(Ft,{get children(){return F(ut,{onClick:()=>d("open"),children:"Add new domain and target"})}}),F(Ut,{get state(){return c()},get children(){return F(Ht,{get children(){return[F(ot,{children:"Add new domain and target"}),F(Kt,{get children(){return[F(Pt,{placeholder:"domain",label:"Domain:",value:r,onChange:e=>x("domain",e)}),F(Pt,{placeholder:"distribution id",label:"Cloudfront Distribution ID:",value:i,onChange:e=>x("cloudfrontDistributionId",e)}),F(qt,{options:nn,value:s,onChange:e=>x("target",e)})]}}),F(Q,{when:u,get children(){return F(Qt,{children:u})}}),F(Jt,{get children(){return[F(ut,{onClick:()=>d("close"),children:"Cancel"}),F(ut,{get loading(){return v()},leftMargin:!0,get disabled(){return!r()||!s()},onClick:()=>y(),children:"Save"})]}})]}})}}),F(Vt,{get children(){return[Gt.cloneNode(!0),(()=>{const r=Wt.cloneNode(!0);return de(r,F(J,{get each(){return t.list},children:(r,o)=>(()=>{const i=tn.cloneNode(!0),l=i.firstChild,s=l.nextSibling,a=s.nextSibling,c=a.nextSibling,d=c.nextSibling;return de(l,(()=>r.content.domain)),de(s,(()=>r.content.cloudfrontDistributionId)),de(a,(()=>r.content.target)),de(c,(()=>r.content.siteId)),de(i,F(Xt,{get children(){return F(Zt,{onClick:()=>(async t=>{try{await Ve(`${e.api}/delete-domain-setting.php`,{id:t}),await m()}catch(e){console.log(e)}})(r.externalId),children:"delete"})}}),d),de(d,F(Yt,{get children(){const e=en.cloneNode(!0);return e.addEventListener("change",(e=>{const r=e.target.checked;(async(e,r)=>{b(!0),n("list",e,"content","doNotIndex",r);const o=t.list[e];await w(o.externalId,{...o.content,doNotIndex:r}),b(!1)})(o(),r)})),f((t=>{const n=r.content.doNotIndex,o=v();return n!==t._v$&&(e.checked=t._v$=n),o!==t._v$2&&(e.disabled=t._v$2=o),t}),{_v$:void 0,_v$2:void 0}),e}})),i})()})),r})()]}})]}})},on=e=>{try{return JSON.parse(document.getElementById(e).innerHTML)}catch(e){return{}}},ln=()=>{let e=document.getElementById("dls-metabox-root");if(e){const t=on("dls-data");t.metaMenu="nav-menu"===e.getAttribute("data-type"),t.metaMenu&&(e=document.createElement("div"),e&&document.querySelector("#nav-menu-footer").prepend(e)),ne((()=>F(jt,{options:t})),e)}};jQuery(document).ready((function(e){wp&&wp.data&&wp.data.dispatch&&wp.data.dispatch("core/editor").disablePublishSidebar(),(()=>{if(wp.data){let e=!1,t=!1;wp.data.subscribe((()=>{const n=wp.data.select("core/editor").isSavingPost(),r=wp.data.select("core/editor").isSavingNonPostEntityChanges&&wp.data.select("core/editor").isSavingNonPostEntityChanges();e!==n?(e=n,wp.data.select("core/editor").didPostSaveRequestSucceed()&&wp.hooks.doAction("dls.post-saved")):t!==r&&(t=r,wp.data.select("core/editor").didPostSaveRequestSucceed()&&wp.hooks.doAction("dls.post-saved"))}))}})();let t={};try{t=e("#dls-hooks").length>0?JSON.parse(e("#dls-hooks").html()):{hook:""}}catch(e){}console.log("Current hook",t&&t.hook),"post.php"===t.hook||"post-new.php"===t.hook||"nav-menus.php"===t.hook?ln():t.hook.includes("toplevel_page_draft-live-sync")?(()=>{const e=on("dls-data");ne((()=>F(Me,{values:e,get children(){return F(_t,{})}})),document.getElementById("dls-root"))})():t.hook.includes("toplevel_page_cerberus-domain-settings")?(()=>{const e=document.getElementById("dls-domain-settings-root"),t=on("dls-data");ne((()=>F(rn,{options:t})),e)})():t.hook.includes(".php")||ln()}))}();
//# sourceMappingURL=draft-live-sync-boot-0.14.26-dupont.js.map
