/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
function t(t,s,i,e){for(var r,o=arguments.length,n=o<3?s:null===e?e=Object.getOwnPropertyDescriptor(s,i):e,h=t.length-1;h>=0;h--)(r=t[h])&&(n=(o<3?r(n):o>3?r(s,i,n):r(s,i))||n);return o>3&&n&&Object.defineProperty(s,i,n),n
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */}const s=globalThis,i=s.ShadowRoot&&(void 0===s.ShadyCSS||s.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,e=Symbol(),r=new WeakMap;let o=class{constructor(t,s,i){if(this._$cssResult$=!0,i!==e)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=s}get styleSheet(){let t=this.o;const s=this.t;if(i&&void 0===t){const i=void 0!==s&&1===s.length;i&&(t=r.get(s)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&r.set(s,t))}return t}toString(){return this.cssText}};const n=(t,...s)=>{const i=1===t.length?t[0]:s.reduce((s,i,e)=>s+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[e+1],t[0]);return new o(i,t,e)},h=i?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let s="";for(const i of t.cssRules)s+=i.cssText;return(t=>new o("string"==typeof t?t:t+"",void 0,e))(s)})(t):t,{is:a,defineProperty:c,getOwnPropertyDescriptor:l,getOwnPropertyNames:u,getOwnPropertySymbols:d,getPrototypeOf:f}=Object,m=globalThis,p=m.trustedTypes,v=p?p.emptyScript:"",g=m.reactiveElementPolyfillSupport,b=(t,s)=>t,y={toAttribute(t,s){switch(s){case Boolean:t=t?v:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,s){let i=t;switch(s){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},w=(t,s)=>!a(t,s),S={attribute:!0,type:String,converter:y,reflect:!1,useDefault:!1,hasChanged:w};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */Symbol.metadata??=Symbol("metadata"),m.litPropertyMetadata??=new WeakMap;let x=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,s=S){if(s.state&&(s.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((s=Object.create(s)).wrapped=!0),this.elementProperties.set(t,s),!s.noAccessor){const i=Symbol(),e=this.getPropertyDescriptor(t,i,s);void 0!==e&&c(this.prototype,t,e)}}static getPropertyDescriptor(t,s,i){const{get:e,set:r}=l(this.prototype,t)??{get(){return this[s]},set(t){this[s]=t}};return{get:e,set(s){const o=e?.call(this);r?.call(this,s),this.requestUpdate(t,o,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??S}static _$Ei(){if(this.hasOwnProperty(b("elementProperties")))return;const t=f(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(b("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(b("properties"))){const t=this.properties,s=[...u(t),...d(t)];for(const i of s)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const s=litPropertyMetadata.get(t);if(void 0!==s)for(const[t,i]of s)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,s]of this.elementProperties){const i=this._$Eu(t,s);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const s=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)s.unshift(h(t))}else void 0!==t&&s.push(h(t));return s}static _$Eu(t,s){const i=s.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,s=this.constructor.elementProperties;for(const i of s.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,e)=>{if(i)t.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const i of e){const e=document.createElement("style"),r=s.litNonce;void 0!==r&&e.setAttribute("nonce",r),e.textContent=i.cssText,t.appendChild(e)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,s,i){this._$AK(t,i)}_$ET(t,s){const i=this.constructor.elementProperties.get(t),e=this.constructor._$Eu(t,i);if(void 0!==e&&!0===i.reflect){const r=(void 0!==i.converter?.toAttribute?i.converter:y).toAttribute(s,i.type);this._$Em=t,null==r?this.removeAttribute(e):this.setAttribute(e,r),this._$Em=null}}_$AK(t,s){const i=this.constructor,e=i._$Eh.get(t);if(void 0!==e&&this._$Em!==e){const t=i.getPropertyOptions(e),r="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:y;this._$Em=e;const o=r.fromAttribute(s,t.type);this[e]=o??this._$Ej?.get(e)??o,this._$Em=null}}requestUpdate(t,s,i,e=!1,r){if(void 0!==t){const o=this.constructor;if(!1===e&&(r=this[t]),i??=o.getPropertyOptions(t),!((i.hasChanged??w)(r,s)||i.useDefault&&i.reflect&&r===this._$Ej?.get(t)&&!this.hasAttribute(o._$Eu(t,i))))return;this.C(t,s,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,s,{useDefault:i,reflect:e,wrapped:r},o){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,o??s??this[t]),!0!==r||void 0!==o)||(this._$AL.has(t)||(this.hasUpdated||i||(s=void 0),this._$AL.set(t,s)),!0===e&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,s]of this._$Ep)this[t]=s;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[s,i]of t){const{wrapped:t}=i,e=this[s];!0!==t||this._$AL.has(s)||void 0===e||this.C(s,void 0,i,e)}}let t=!1;const s=this._$AL;try{t=this.shouldUpdate(s),t?(this.willUpdate(s),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(s)):this._$EM()}catch(s){throw t=!1,this._$EM(),s}t&&this._$AE(s)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};x.elementStyles=[],x.shadowRootOptions={mode:"open"},x[b("elementProperties")]=new Map,x[b("finalized")]=new Map,g?.({ReactiveElement:x}),(m.reactiveElementVersions??=[]).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const $=globalThis,z=t=>t,A=$.trustedTypes,C=A?A.createPolicy("lit-html",{createHTML:t=>t}):void 0,_="$lit$",E=`lit$${Math.random().toFixed(9).slice(2)}$`,k="?"+E,M=`<${k}>`,O=document,U=()=>O.createComment(""),j=t=>null===t||"object"!=typeof t&&"function"!=typeof t,P=Array.isArray,T="[ \t\n\f\r]",N=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,R=/-->/g,I=/>/g,D=RegExp(`>|${T}(?:([^\\s"'>=/]+)(${T}*=${T}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),L=/'/g,H=/"/g,W=/^(?:script|style|textarea|title)$/i,B=(t=>(s,...i)=>({_$litType$:t,strings:s,values:i}))(1),J=Symbol.for("lit-noChange"),Z=Symbol.for("lit-nothing"),q=new WeakMap,K=O.createTreeWalker(O,129);function V(t,s){if(!P(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==C?C.createHTML(s):s}const F=(t,s)=>{const i=t.length-1,e=[];let r,o=2===s?"<svg>":3===s?"<math>":"",n=N;for(let s=0;s<i;s++){const i=t[s];let h,a,c=-1,l=0;for(;l<i.length&&(n.lastIndex=l,a=n.exec(i),null!==a);)l=n.lastIndex,n===N?"!--"===a[1]?n=R:void 0!==a[1]?n=I:void 0!==a[2]?(W.test(a[2])&&(r=RegExp("</"+a[2],"g")),n=D):void 0!==a[3]&&(n=D):n===D?">"===a[0]?(n=r??N,c=-1):void 0===a[1]?c=-2:(c=n.lastIndex-a[2].length,h=a[1],n=void 0===a[3]?D:'"'===a[3]?H:L):n===H||n===L?n=D:n===R||n===I?n=N:(n=D,r=void 0);const u=n===D&&t[s+1].startsWith("/>")?" ":"";o+=n===N?i+M:c>=0?(e.push(h),i.slice(0,c)+_+i.slice(c)+E+u):i+E+(-2===c?s:u)}return[V(t,o+(t[i]||"<?>")+(2===s?"</svg>":3===s?"</math>":"")),e]};class G{constructor({strings:t,_$litType$:s},i){let e;this.parts=[];let r=0,o=0;const n=t.length-1,h=this.parts,[a,c]=F(t,s);if(this.el=G.createElement(a,i),K.currentNode=this.el.content,2===s||3===s){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(e=K.nextNode())&&h.length<n;){if(1===e.nodeType){if(e.hasAttributes())for(const t of e.getAttributeNames())if(t.endsWith(_)){const s=c[o++],i=e.getAttribute(t).split(E),n=/([.?@])?(.*)/.exec(s);h.push({type:1,index:r,name:n[2],strings:i,ctor:"."===n[1]?st:"?"===n[1]?it:"@"===n[1]?et:tt}),e.removeAttribute(t)}else t.startsWith(E)&&(h.push({type:6,index:r}),e.removeAttribute(t));if(W.test(e.tagName)){const t=e.textContent.split(E),s=t.length-1;if(s>0){e.textContent=A?A.emptyScript:"";for(let i=0;i<s;i++)e.append(t[i],U()),K.nextNode(),h.push({type:2,index:++r});e.append(t[s],U())}}}else if(8===e.nodeType)if(e.data===k)h.push({type:2,index:r});else{let t=-1;for(;-1!==(t=e.data.indexOf(E,t+1));)h.push({type:7,index:r}),t+=E.length-1}r++}}static createElement(t,s){const i=O.createElement("template");return i.innerHTML=t,i}}function Q(t,s,i=t,e){if(s===J)return s;let r=void 0!==e?i._$Co?.[e]:i._$Cl;const o=j(s)?void 0:s._$litDirective$;return r?.constructor!==o&&(r?._$AO?.(!1),void 0===o?r=void 0:(r=new o(t),r._$AT(t,i,e)),void 0!==e?(i._$Co??=[])[e]=r:i._$Cl=r),void 0!==r&&(s=Q(t,r._$AS(t,s.values),r,e)),s}class X{constructor(t,s){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=s}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:s},parts:i}=this._$AD,e=(t?.creationScope??O).importNode(s,!0);K.currentNode=e;let r=K.nextNode(),o=0,n=0,h=i[0];for(;void 0!==h;){if(o===h.index){let s;2===h.type?s=new Y(r,r.nextSibling,this,t):1===h.type?s=new h.ctor(r,h.name,h.strings,this,t):6===h.type&&(s=new rt(r,this,t)),this._$AV.push(s),h=i[++n]}o!==h?.index&&(r=K.nextNode(),o++)}return K.currentNode=O,e}p(t){let s=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,s),s+=i.strings.length-2):i._$AI(t[s])),s++}}class Y{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,s,i,e){this.type=2,this._$AH=Z,this._$AN=void 0,this._$AA=t,this._$AB=s,this._$AM=i,this.options=e,this._$Cv=e?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const s=this._$AM;return void 0!==s&&11===t?.nodeType&&(t=s.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,s=this){t=Q(this,t,s),j(t)?t===Z||null==t||""===t?(this._$AH!==Z&&this._$AR(),this._$AH=Z):t!==this._$AH&&t!==J&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>P(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==Z&&j(this._$AH)?this._$AA.nextSibling.data=t:this.T(O.createTextNode(t)),this._$AH=t}$(t){const{values:s,_$litType$:i}=t,e="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=G.createElement(V(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===e)this._$AH.p(s);else{const t=new X(e,this),i=t.u(this.options);t.p(s),this.T(i),this._$AH=t}}_$AC(t){let s=q.get(t.strings);return void 0===s&&q.set(t.strings,s=new G(t)),s}k(t){P(this._$AH)||(this._$AH=[],this._$AR());const s=this._$AH;let i,e=0;for(const r of t)e===s.length?s.push(i=new Y(this.O(U()),this.O(U()),this,this.options)):i=s[e],i._$AI(r),e++;e<s.length&&(this._$AR(i&&i._$AB.nextSibling,e),s.length=e)}_$AR(t=this._$AA.nextSibling,s){for(this._$AP?.(!1,!0,s);t!==this._$AB;){const s=z(t).nextSibling;z(t).remove(),t=s}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class tt{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,s,i,e,r){this.type=1,this._$AH=Z,this._$AN=void 0,this.element=t,this.name=s,this._$AM=e,this.options=r,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=Z}_$AI(t,s=this,i,e){const r=this.strings;let o=!1;if(void 0===r)t=Q(this,t,s,0),o=!j(t)||t!==this._$AH&&t!==J,o&&(this._$AH=t);else{const e=t;let n,h;for(t=r[0],n=0;n<r.length-1;n++)h=Q(this,e[i+n],s,n),h===J&&(h=this._$AH[n]),o||=!j(h)||h!==this._$AH[n],h===Z?t=Z:t!==Z&&(t+=(h??"")+r[n+1]),this._$AH[n]=h}o&&!e&&this.j(t)}j(t){t===Z?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class st extends tt{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===Z?void 0:t}}class it extends tt{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==Z)}}class et extends tt{constructor(t,s,i,e,r){super(t,s,i,e,r),this.type=5}_$AI(t,s=this){if((t=Q(this,t,s,0)??Z)===J)return;const i=this._$AH,e=t===Z&&i!==Z||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,r=t!==Z&&(i===Z||e);e&&this.element.removeEventListener(this.name,this,i),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class rt{constructor(t,s,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=s,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){Q(this,t)}}const ot=$.litHtmlPolyfillSupport;ot?.(G,Y),($.litHtmlVersions??=[]).push("3.3.2");const nt=globalThis;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class ht extends x{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const s=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,s,i)=>{const e=i?.renderBefore??s;let r=e._$litPart$;if(void 0===r){const t=i?.renderBefore??null;e._$litPart$=r=new Y(s.insertBefore(U(),t),t,void 0,i??{})}return r._$AI(t),r})(s,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return J}}ht._$litElement$=!0,ht.finalized=!0,nt.litElementHydrateSupport?.({LitElement:ht});const at=nt.litElementPolyfillSupport;at?.({LitElement:ht}),(nt.litElementVersions??=[]).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ct=t=>(s,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(t,s)}):customElements.define(t,s)},lt={attribute:!0,type:String,converter:y,reflect:!1,hasChanged:w},ut=(t=lt,s,i)=>{const{kind:e,metadata:r}=i;let o=globalThis.litPropertyMetadata.get(r);if(void 0===o&&globalThis.litPropertyMetadata.set(r,o=new Map),"setter"===e&&((t=Object.create(t)).wrapped=!0),o.set(i.name,t),"accessor"===e){const{name:e}=i;return{set(i){const r=s.get.call(this);s.set.call(this,i),this.requestUpdate(e,r,t,!0,i)},init(s){return void 0!==s&&this.C(e,void 0,t,s),s}}}if("setter"===e){const{name:e}=i;return function(i){const r=this[e];s.call(this,i),this.requestUpdate(e,r,t,!0,i)}}throw Error("Unsupported decorator location: "+e)};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function dt(t){return(s,i)=>"object"==typeof i?ut(t,s,i):((t,s,i)=>{const e=s.hasOwnProperty(i);return s.constructor.createProperty(i,t),e?Object.getOwnPropertyDescriptor(s,i):void 0})(t,s,i)}const ft=n`
  :host {
    box-sizing: border-box;
    /* Typography */
    font-family: var(--mu-font-family, 'Roboto', 'Helvetica Neue', Arial, sans-serif);
    color: var(--mu-text-color, #212b36);
    background: var(--mu-bg-color, #fff);
    line-height: 1.5;
    font-size: 1rem;
    letter-spacing: 0.00938em;
    --mu-font-weight-regular: 400;
    --mu-font-weight-medium: 500;
    --mu-font-weight-bold: 700;
    --mu-h1-size: 2.125rem;
    --mu-h2-size: 1.5rem;
    --mu-h3-size: 1.25rem;
    --mu-h4-size: 1.125rem;
    --mu-h5-size: 1rem;
    --mu-h6-size: 0.875rem;
    --mu-body1-size: 1rem;
    --mu-body2-size: 0.875rem;
    --mu-caption-size: 0.75rem;
    --mu-overline-size: 0.75rem;
    --mu-button-size: 0.875rem;
    /* Color palette (MUI/Minimal defaults) */
    --mu-primary: #1976d2;
    --mu-primary-light: #42a5f5;
    --mu-primary-dark: #1565c0;
    --mu-primary-contrast: #fff;
    --mu-secondary: #9c27b0;
    --mu-secondary-light: #ba68c8;
    --mu-secondary-dark: #7b1fa2;
    --mu-secondary-contrast: #fff;
    --mu-error: #d32f2f;
    --mu-warning: #ed6c02;
    --mu-info: #0288d1;
    --mu-success: #2e7d32;
    --mu-bg-default: #f9fafb;
    --mu-bg-paper: #fff;
    --mu-divider: #e0e0e0;
    --mu-text-primary: #212b36;
    --mu-text-secondary: #637381;
    --mu-text-disabled: #919eab;
    /* Spacing & shape */
    --mu-spacing: 8px;
    --mu-radius: 8px;
    /* Shadows */
    --mu-shadow-1: 0px 1px 2px 0px rgba(145, 158, 171, 0.08);
    --mu-shadow-2: 0px 4px 8px 0px rgba(145, 158, 171, 0.16);
  }

  h1 {
    font-size: var(--mu-h1-size);
    font-weight: var(--mu-font-weight-bold);
    line-height: 1.2;
    margin: 0 0 calc(var(--mu-spacing) * 2) 0;
  }
  h2 {
    font-size: var(--mu-h2-size);
    font-weight: var(--mu-font-weight-bold);
    line-height: 1.3;
    margin: 0 0 calc(var(--mu-spacing) * 1.5) 0;
  }
  h3 {
    font-size: var(--mu-h3-size);
    font-weight: var(--mu-font-weight-medium);
    line-height: 1.4;
    margin: 0 0 var(--mu-spacing) 0;
  }
  h4,
  h5,
  h6 {
    font-weight: var(--mu-font-weight-medium);
    margin: 0 0 var(--mu-spacing) 0;
  }
  p {
    font-size: var(--mu-body1-size);
    margin: 0 0 var(--mu-spacing) 0;
  }
  small,
  .caption {
    font-size: var(--mu-caption-size);
    color: var(--mu-text-secondary);
  }
  .visually-hidden {
    position: absolute;
    width: 1px;
    height: 1px;
    margin: -1px;
    padding: 0;
    overflow: hidden;
    clip: rect(0 0 0 0);
    border: 0;
  }
`;let mt=class extends ht{render(){return B`
      <div class="header">
        <slot name="header"></slot>
      </div>
      <div class="content">
        <slot></slot>
      </div>
      <div class="actions">
        <slot name="actions"></slot>
      </div>
    `}};mt.styles=[ft,n`
      :host {
        display: block;
        background: var(--mu-bg-paper);
        border-radius: var(--mu-radius);
        box-shadow: var(--mu-shadow-1);
        padding: var(--mu-spacing);
        margin: var(--mu-spacing) 0;
      }
      .header {
        margin-bottom: var(--mu-spacing);
      }
      .actions {
        margin-top: var(--mu-spacing);
        display: flex;
        gap: var(--mu-spacing);
        justify-content: flex-end;
      }
    `],mt=t([ct("mu-card")],mt);let pt=class extends ht{constructor(){super(...arguments),this.title="",this.subtitle=""}render(){return B`
      <h2>${this.title}</h2>
      ${this.subtitle?B`<div class="subtitle">${this.subtitle}</div>`:""}
    `}};pt.styles=[ft,n`
      :host {
        display: block;
      }
      h2 {
        font-size: var(--mu-h3-size);
        font-weight: var(--mu-font-weight-bold);
        margin: 0;
      }
      .subtitle {
        color: var(--mu-text-secondary);
        font-size: var(--mu-body2-size);
        margin-top: 2px;
      }
    `],t([dt({type:String})],pt.prototype,"title",void 0),t([dt({type:String})],pt.prototype,"subtitle",void 0),pt=t([ct("mu-card-header")],pt);let vt=class extends ht{render(){return B`<slot></slot>`}};vt.styles=[ft,n`
      :host {
        display: block;
        font-size: var(--mu-body1-size);
        color: var(--mu-text-primary);
      }
    `],vt=t([ct("mu-card-content")],vt);let gt=class extends ht{render(){return B`<slot></slot>`}};gt.styles=[ft,n`
      :host {
        display: flex;
        gap: var(--mu-spacing);
        justify-content: flex-end;
      }
    `],gt=t([ct("mu-card-actions")],gt);export{mt as MuCard,gt as MuCardActions,vt as MuCardContent,pt as MuCardHeader};
