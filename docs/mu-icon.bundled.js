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
function t(t,i,s,e){for(var o,r=arguments.length,n=r<3?i:e,h=t.length-1;h>=0;h--)(o=t[h])&&(n=(r<3?o(n):r>3?o(i,s,n):o(i,s))||n);return r>3&&n&&Object.defineProperty(i,s,n),n
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */}const i=globalThis,s=i.ShadowRoot&&(void 0===i.ShadyCSS||i.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,e=Symbol(),o=new WeakMap;let r=class{constructor(t,i,s){if(this._$cssResult$=!0,s!==e)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=i}get styleSheet(){let t=this.o;const i=this.t;if(s&&void 0===t){const s=void 0!==i&&1===i.length;s&&(t=o.get(i)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&o.set(i,t))}return t}toString(){return this.cssText}};const n=(t,...i)=>{const s=1===t.length?t[0]:i.reduce((i,s,e)=>i+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+t[e+1],t[0]);return new r(s,t,e)},h=s?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let i="";for(const s of t.cssRules)i+=s.cssText;return(t=>new r("string"==typeof t?t:t+"",void 0,e))(i)})(t):t,{is:a,defineProperty:c,getOwnPropertyDescriptor:l,getOwnPropertyNames:u,getOwnPropertySymbols:d,getPrototypeOf:f}=Object,m=globalThis,p=m.trustedTypes,g=p?p.emptyScript:"",v=m.reactiveElementPolyfillSupport,y=(t,i)=>t,b={toAttribute(t,i){switch(i){case Boolean:t=t?g:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,i){let s=t;switch(i){case Boolean:s=null!==t;break;case Number:s=null===t?null:Number(t);break;case Object:case Array:try{s=JSON.parse(t)}catch(t){s=null}}return s}},w=(t,i)=>!a(t,i),S={attribute:!0,type:String,converter:b,reflect:!1,useDefault:!1,hasChanged:w};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */Symbol.metadata??=Symbol("metadata"),m.litPropertyMetadata??=new WeakMap;let x=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,i=S){if(i.state&&(i.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((i=Object.create(i)).wrapped=!0),this.elementProperties.set(t,i),!i.noAccessor){const s=Symbol(),e=this.getPropertyDescriptor(t,s,i);void 0!==e&&c(this.prototype,t,e)}}static getPropertyDescriptor(t,i,s){const{get:e,set:o}=l(this.prototype,t)??{get(){return this[i]},set(t){this[i]=t}};return{get:e,set(i){const r=e?.call(this);o?.call(this,i),this.requestUpdate(t,r,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??S}static _$Ei(){if(this.hasOwnProperty(y("elementProperties")))return;const t=f(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(y("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(y("properties"))){const t=this.properties,i=[...u(t),...d(t)];for(const s of i)this.createProperty(s,t[s])}const t=this[Symbol.metadata];if(null!==t){const i=litPropertyMetadata.get(t);if(void 0!==i)for(const[t,s]of i)this.elementProperties.set(t,s)}this._$Eh=new Map;for(const[t,i]of this.elementProperties){const s=this._$Eu(t,i);void 0!==s&&this._$Eh.set(s,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const i=[];if(Array.isArray(t)){const s=new Set(t.flat(1/0).reverse());for(const t of s)i.unshift(h(t))}else void 0!==t&&i.push(h(t));return i}static _$Eu(t,i){const s=i.attribute;return!1===s?void 0:"string"==typeof s?s:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,i=this.constructor.elementProperties;for(const s of i.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,e)=>{if(s)t.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const s of e){const e=document.createElement("style"),o=i.litNonce;void 0!==o&&e.setAttribute("nonce",o),e.textContent=s.cssText,t.appendChild(e)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,i,s){this._$AK(t,s)}_$ET(t,i){const s=this.constructor.elementProperties.get(t),e=this.constructor._$Eu(t,s);if(void 0!==e&&!0===s.reflect){const o=(void 0!==s.converter?.toAttribute?s.converter:b).toAttribute(i,s.type);this._$Em=t,null==o?this.removeAttribute(e):this.setAttribute(e,o),this._$Em=null}}_$AK(t,i){const s=this.constructor,e=s._$Eh.get(t);if(void 0!==e&&this._$Em!==e){const t=s.getPropertyOptions(e),o="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:b;this._$Em=e;const r=o.fromAttribute(i,t.type);this[e]=r??this._$Ej?.get(e)??r,this._$Em=null}}requestUpdate(t,i,s,e=!1,o){if(void 0!==t){const r=this.constructor;if(!1===e&&(o=this[t]),s??=r.getPropertyOptions(t),!((s.hasChanged??w)(o,i)||s.useDefault&&s.reflect&&o===this._$Ej?.get(t)&&!this.hasAttribute(r._$Eu(t,s))))return;this.C(t,i,s)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,i,{useDefault:s,reflect:e,wrapped:o},r){s&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,r??i??this[t]),!0!==o||void 0!==r)||(this._$AL.has(t)||(this.hasUpdated||s||(i=void 0),this._$AL.set(t,i)),!0===e&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,i]of this._$Ep)this[t]=i;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[i,s]of t){const{wrapped:t}=s,e=this[i];!0!==t||this._$AL.has(i)||void 0===e||this.C(i,void 0,s,e)}}let t=!1;const i=this._$AL;try{t=this.shouldUpdate(i),t?(this.willUpdate(i),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(i)):this._$EM()}catch(i){throw t=!1,this._$EM(),i}t&&this._$AE(i)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};x.elementStyles=[],x.shadowRootOptions={mode:"open"},x[y("elementProperties")]=new Map,x[y("finalized")]=new Map,v?.({ReactiveElement:x}),(m.reactiveElementVersions??=[]).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const $=globalThis,z=t=>t,A=$.trustedTypes,C=A?A.createPolicy("lit-html",{createHTML:t=>t}):void 0,_="$lit$",E=`lit$${Math.random().toFixed(9).slice(2)}$`,k="?"+E,M=`<${k}>`,U=document,O=()=>U.createComment(""),P=t=>null===t||"object"!=typeof t&&"function"!=typeof t,T=Array.isArray,j="[ \t\n\f\r]",N=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,R=/-->/g,I=/>/g,D=RegExp(`>|${j}(?:([^\\s"'>=/]+)(${j}*=${j}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),L=/'/g,H=/"/g,W=/^(?:script|style|textarea|title)$/i,B=(t=>(i,...s)=>({_$litType$:t,strings:i,values:s}))(1),J=Symbol.for("lit-noChange"),Z=Symbol.for("lit-nothing"),q=new WeakMap,K=U.createTreeWalker(U,129);function V(t,i){if(!T(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==C?C.createHTML(i):i}const F=(t,i)=>{const s=t.length-1,e=[];let o,r=2===i?"<svg>":3===i?"<math>":"",n=N;for(let i=0;i<s;i++){const s=t[i];let h,a,c=-1,l=0;for(;l<s.length&&(n.lastIndex=l,a=n.exec(s),null!==a);)l=n.lastIndex,n===N?"!--"===a[1]?n=R:void 0!==a[1]?n=I:void 0!==a[2]?(W.test(a[2])&&(o=RegExp("</"+a[2],"g")),n=D):void 0!==a[3]&&(n=D):n===D?">"===a[0]?(n=o??N,c=-1):void 0===a[1]?c=-2:(c=n.lastIndex-a[2].length,h=a[1],n=void 0===a[3]?D:'"'===a[3]?H:L):n===H||n===L?n=D:n===R||n===I?n=N:(n=D,o=void 0);const u=n===D&&t[i+1].startsWith("/>")?" ":"";r+=n===N?s+M:c>=0?(e.push(h),s.slice(0,c)+_+s.slice(c)+E+u):s+E+(-2===c?i:u)}return[V(t,r+(t[s]||"<?>")+(2===i?"</svg>":3===i?"</math>":"")),e]};class G{constructor({strings:t,_$litType$:i},s){let e;this.parts=[];let o=0,r=0;const n=t.length-1,h=this.parts,[a,c]=F(t,i);if(this.el=G.createElement(a,s),K.currentNode=this.el.content,2===i||3===i){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(e=K.nextNode())&&h.length<n;){if(1===e.nodeType){if(e.hasAttributes())for(const t of e.getAttributeNames())if(t.endsWith(_)){const i=c[r++],s=e.getAttribute(t).split(E),n=/([.?@])?(.*)/.exec(i);h.push({type:1,index:o,name:n[2],strings:s,ctor:"."===n[1]?it:"?"===n[1]?st:"@"===n[1]?et:tt}),e.removeAttribute(t)}else t.startsWith(E)&&(h.push({type:6,index:o}),e.removeAttribute(t));if(W.test(e.tagName)){const t=e.textContent.split(E),i=t.length-1;if(i>0){e.textContent=A?A.emptyScript:"";for(let s=0;s<i;s++)e.append(t[s],O()),K.nextNode(),h.push({type:2,index:++o});e.append(t[i],O())}}}else if(8===e.nodeType)if(e.data===k)h.push({type:2,index:o});else{let t=-1;for(;-1!==(t=e.data.indexOf(E,t+1));)h.push({type:7,index:o}),t+=E.length-1}o++}}static createElement(t,i){const s=U.createElement("template");return s.innerHTML=t,s}}function Q(t,i,s=t,e){if(i===J)return i;let o=void 0!==e?s._$Co?.[e]:s._$Cl;const r=P(i)?void 0:i._$litDirective$;return o?.constructor!==r&&(o?._$AO?.(!1),void 0===r?o=void 0:(o=new r(t),o._$AT(t,s,e)),void 0!==e?(s._$Co??=[])[e]=o:s._$Cl=o),void 0!==o&&(i=Q(t,o._$AS(t,i.values),o,e)),i}class X{constructor(t,i){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=i}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:i},parts:s}=this._$AD,e=(t?.creationScope??U).importNode(i,!0);K.currentNode=e;let o=K.nextNode(),r=0,n=0,h=s[0];for(;void 0!==h;){if(r===h.index){let i;2===h.type?i=new Y(o,o.nextSibling,this,t):1===h.type?i=new h.ctor(o,h.name,h.strings,this,t):6===h.type&&(i=new ot(o,this,t)),this._$AV.push(i),h=s[++n]}r!==h?.index&&(o=K.nextNode(),r++)}return K.currentNode=U,e}p(t){let i=0;for(const s of this._$AV)void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,i),i+=s.strings.length-2):s._$AI(t[i])),i++}}class Y{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,i,s,e){this.type=2,this._$AH=Z,this._$AN=void 0,this._$AA=t,this._$AB=i,this._$AM=s,this.options=e,this._$Cv=e?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const i=this._$AM;return void 0!==i&&11===t?.nodeType&&(t=i.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,i=this){t=Q(this,t,i),P(t)?t===Z||null==t||""===t?(this._$AH!==Z&&this._$AR(),this._$AH=Z):t!==this._$AH&&t!==J&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>T(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==Z&&P(this._$AH)?this._$AA.nextSibling.data=t:this.T(U.createTextNode(t)),this._$AH=t}$(t){const{values:i,_$litType$:s}=t,e="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=G.createElement(V(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===e)this._$AH.p(i);else{const t=new X(e,this),s=t.u(this.options);t.p(i),this.T(s),this._$AH=t}}_$AC(t){let i=q.get(t.strings);return void 0===i&&q.set(t.strings,i=new G(t)),i}k(t){T(this._$AH)||(this._$AH=[],this._$AR());const i=this._$AH;let s,e=0;for(const o of t)e===i.length?i.push(s=new Y(this.O(O()),this.O(O()),this,this.options)):s=i[e],s._$AI(o),e++;e<i.length&&(this._$AR(s&&s._$AB.nextSibling,e),i.length=e)}_$AR(t=this._$AA.nextSibling,i){for(this._$AP?.(!1,!0,i);t!==this._$AB;){const i=z(t).nextSibling;z(t).remove(),t=i}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class tt{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,i,s,e,o){this.type=1,this._$AH=Z,this._$AN=void 0,this.element=t,this.name=i,this._$AM=e,this.options=o,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=Z}_$AI(t,i=this,s,e){const o=this.strings;let r=!1;if(void 0===o)t=Q(this,t,i,0),r=!P(t)||t!==this._$AH&&t!==J,r&&(this._$AH=t);else{const e=t;let n,h;for(t=o[0],n=0;n<o.length-1;n++)h=Q(this,e[s+n],i,n),h===J&&(h=this._$AH[n]),r||=!P(h)||h!==this._$AH[n],h===Z?t=Z:t!==Z&&(t+=(h??"")+o[n+1]),this._$AH[n]=h}r&&!e&&this.j(t)}j(t){t===Z?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class it extends tt{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===Z?void 0:t}}class st extends tt{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==Z)}}class et extends tt{constructor(t,i,s,e,o){super(t,i,s,e,o),this.type=5}_$AI(t,i=this){if((t=Q(this,t,i,0)??Z)===J)return;const s=this._$AH,e=t===Z&&s!==Z||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,o=t!==Z&&(s===Z||e);e&&this.element.removeEventListener(this.name,this,s),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class ot{constructor(t,i,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=i,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){Q(this,t)}}const rt=$.litHtmlPolyfillSupport;rt?.(G,Y),($.litHtmlVersions??=[]).push("3.3.2");const nt=globalThis;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class ht extends x{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const i=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,i,s)=>{const e=s?.renderBefore??i;let o=e._$litPart$;if(void 0===o){const t=s?.renderBefore??null;e._$litPart$=o=new Y(i.insertBefore(O(),t),t,void 0,s??{})}return o._$AI(t),o})(i,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return J}}ht._$litElement$=!0,ht.finalized=!0,nt.litElementHydrateSupport?.({LitElement:ht});const at=nt.litElementPolyfillSupport;at?.({LitElement:ht}),(nt.litElementVersions??=[]).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ct={attribute:!0,type:String,converter:b,reflect:!1,hasChanged:w},lt=(t=ct,i,s)=>{const{kind:e,metadata:o}=s;let r=globalThis.litPropertyMetadata.get(o);if(void 0===r&&globalThis.litPropertyMetadata.set(o,r=new Map),"setter"===e&&((t=Object.create(t)).wrapped=!0),r.set(s.name,t),"accessor"===e){const{name:e}=s;return{set(s){const o=i.get.call(this);i.set.call(this,s),this.requestUpdate(e,o,t,!0,s)},init(i){return void 0!==i&&this.C(e,void 0,t,i),i}}}if("setter"===e){const{name:e}=s;return function(s){const o=this[e];i.call(this,s),this.requestUpdate(e,o,t,!0,s)}}throw Error("Unsupported decorator location: "+e)};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function ut(t){return(i,s)=>"object"==typeof s?lt(t,i,s):((t,i,s)=>{const e=i.hasOwnProperty(s);return i.constructor.createProperty(s,t),e?Object.getOwnPropertyDescriptor(i,s):void 0})(t,i,s)}const dt=n`
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
`;let ft=class extends ht{constructor(){super(...arguments),this.name="",this.size="medium",this.color="primary"}render(){return B`
      <span
        class="material-icons"
        part="icon"
        aria-hidden="true"
      >
        <slot>${this.name}</slot>
      </span>
    `}};ft.styles=[dt,n`
      :host {
        display: inline-flex;
        vertical-align: middle;
      }
      .material-icons {
        font-family: 'Material Icons';
        font-style: normal;
        font-weight: normal;
        font-size: 24px;
        line-height: 1;
        letter-spacing: normal;
        text-transform: none;
        display: inline-block;
        direction: ltr;
        -webkit-font-feature-settings: 'liga';
        -webkit-font-smoothing: antialiased;
        user-select: none;
        color: var(--mu-primary, #1976d2);
      }
      :host([size='small']) .material-icons {
        font-size: 20px;
      }
      :host([size='large']) .material-icons {
        font-size: 32px;
      }
      :host([color='secondary']) .material-icons {
        color: var(--mu-secondary, #9c27b0);
      }
      :host([color='info']) .material-icons {
        color: var(--mu-info, #0288d1);
      }
      :host([color='success']) .material-icons {
        color: var(--mu-success, #2e7d32);
      }
      :host([color='warning']) .material-icons {
        color: var(--mu-warning, #ed6c02);
      }
      :host([color='error']) .material-icons {
        color: var(--mu-error, #d32f2f);
      }
    `],t([ut({type:String})],ft.prototype,"name",void 0),t([ut({type:String})],ft.prototype,"size",void 0),t([ut({type:String})],ft.prototype,"color",void 0),ft=t([(t=>(i,s)=>{void 0!==s?s.addInitializer(()=>{customElements.define(t,i)}):customElements.define(t,i)})("mu-icon")],ft);export{ft as MuIcon};
