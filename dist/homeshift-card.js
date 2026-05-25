function t(t,e,i,s){var o,n=arguments.length,r=n<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,i,s);else for(var a=t.length-1;a>=0;a--)(o=t[a])&&(r=(n<3?o(r):n>3?o(e,i,r):o(e,i))||r);return n>3&&r&&Object.defineProperty(e,i,r),r}"function"==typeof SuppressedError&&SuppressedError;
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const e=globalThis,i=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s=Symbol(),o=new WeakMap;let n=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==s)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(i&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=o.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&o.set(e,t))}return t}toString(){return this.cssText}};const r=(t,...e)=>{const i=1===t.length?t[0]:e.reduce((e,i,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1],t[0]);return new n(i,t,s)},a=i?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new n("string"==typeof t?t:t+"",void 0,s))(e)})(t):t,{is:h,defineProperty:c,getOwnPropertyDescriptor:l,getOwnPropertyNames:d,getOwnPropertySymbols:p,getPrototypeOf:u}=Object,_=globalThis,f=_.trustedTypes,m=f?f.emptyScript:"",g=_.reactiveElementPolyfillSupport,y=(t,e)=>t,v={toAttribute(t,e){switch(e){case Boolean:t=t?m:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},$=(t,e)=>!h(t,e),b={attribute:!0,type:String,converter:v,reflect:!1,useDefault:!1,hasChanged:$};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */Symbol.metadata??=Symbol("metadata"),_.litPropertyMetadata??=new WeakMap;let x=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=b){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(t,i,e);void 0!==s&&c(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){const{get:s,set:o}=l(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:s,set(e){const n=s?.call(this);o?.call(this,e),this.requestUpdate(t,n,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??b}static _$Ei(){if(this.hasOwnProperty(y("elementProperties")))return;const t=u(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(y("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(y("properties"))){const t=this.properties,e=[...d(t),...p(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(a(t))}else void 0!==t&&e.push(a(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,s)=>{if(i)t.adoptedStyleSheets=s.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const i of s){const s=document.createElement("style"),o=e.litNonce;void 0!==o&&s.setAttribute("nonce",o),s.textContent=i.cssText,t.appendChild(s)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(void 0!==s&&!0===i.reflect){const o=(void 0!==i.converter?.toAttribute?i.converter:v).toAttribute(e,i.type);this._$Em=t,null==o?this.removeAttribute(s):this.setAttribute(s,o),this._$Em=null}}_$AK(t,e){const i=this.constructor,s=i._$Eh.get(t);if(void 0!==s&&this._$Em!==s){const t=i.getPropertyOptions(s),o="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:v;this._$Em=s;const n=o.fromAttribute(e,t.type);this[s]=n??this._$Ej?.get(s)??n,this._$Em=null}}requestUpdate(t,e,i,s=!1,o){if(void 0!==t){const n=this.constructor;if(!1===s&&(o=this[t]),i??=n.getPropertyOptions(t),!((i.hasChanged??$)(o,e)||i.useDefault&&i.reflect&&o===this._$Ej?.get(t)&&!this.hasAttribute(n._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:s,wrapped:o},n){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,n??e??this[t]),!0!==o||void 0!==n)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===s&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,s=this[e];!0!==t||this._$AL.has(e)||void 0===s||this.C(e,void 0,i,s)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};x.elementStyles=[],x.shadowRootOptions={mode:"open"},x[y("elementProperties")]=new Map,x[y("finalized")]=new Map,g?.({ReactiveElement:x}),(_.reactiveElementVersions??=[]).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const A=globalThis,E=t=>t,w=A.trustedTypes,S=w?w.createPolicy("lit-html",{createHTML:t=>t}):void 0,C="$lit$",k=`lit$${Math.random().toFixed(9).slice(2)}$`,P="?"+k,T=`<${P}>`,O=document,M=()=>O.createComment(""),R=t=>null===t||"object"!=typeof t&&"function"!=typeof t,N=Array.isArray,U="[ \t\n\f\r]",H=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,D=/-->/g,I=/>/g,j=RegExp(`>|${U}(?:([^\\s"'>=/]+)(${U}*=${U}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),L=/'/g,z=/"/g,V=/^(?:script|style|textarea|title)$/i,B=t=>(e,...i)=>({_$litType$:t,strings:e,values:i}),W=B(1),q=B(2),F=Symbol.for("lit-noChange"),Y=Symbol.for("lit-nothing"),J=new WeakMap,K=O.createTreeWalker(O,129);function X(t,e){if(!N(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==S?S.createHTML(e):e}const Z=(t,e)=>{const i=t.length-1,s=[];let o,n=2===e?"<svg>":3===e?"<math>":"",r=H;for(let e=0;e<i;e++){const i=t[e];let a,h,c=-1,l=0;for(;l<i.length&&(r.lastIndex=l,h=r.exec(i),null!==h);)l=r.lastIndex,r===H?"!--"===h[1]?r=D:void 0!==h[1]?r=I:void 0!==h[2]?(V.test(h[2])&&(o=RegExp("</"+h[2],"g")),r=j):void 0!==h[3]&&(r=j):r===j?">"===h[0]?(r=o??H,c=-1):void 0===h[1]?c=-2:(c=r.lastIndex-h[2].length,a=h[1],r=void 0===h[3]?j:'"'===h[3]?z:L):r===z||r===L?r=j:r===D||r===I?r=H:(r=j,o=void 0);const d=r===j&&t[e+1].startsWith("/>")?" ":"";n+=r===H?i+T:c>=0?(s.push(a),i.slice(0,c)+C+i.slice(c)+k+d):i+k+(-2===c?e:d)}return[X(t,n+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),s]};class G{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let o=0,n=0;const r=t.length-1,a=this.parts,[h,c]=Z(t,e);if(this.el=G.createElement(h,i),K.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(s=K.nextNode())&&a.length<r;){if(1===s.nodeType){if(s.hasAttributes())for(const t of s.getAttributeNames())if(t.endsWith(C)){const e=c[n++],i=s.getAttribute(t).split(k),r=/([.?@])?(.*)/.exec(e);a.push({type:1,index:o,name:r[2],strings:i,ctor:"."===r[1]?st:"?"===r[1]?ot:"@"===r[1]?nt:it}),s.removeAttribute(t)}else t.startsWith(k)&&(a.push({type:6,index:o}),s.removeAttribute(t));if(V.test(s.tagName)){const t=s.textContent.split(k),e=t.length-1;if(e>0){s.textContent=w?w.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],M()),K.nextNode(),a.push({type:2,index:++o});s.append(t[e],M())}}}else if(8===s.nodeType)if(s.data===P)a.push({type:2,index:o});else{let t=-1;for(;-1!==(t=s.data.indexOf(k,t+1));)a.push({type:7,index:o}),t+=k.length-1}o++}}static createElement(t,e){const i=O.createElement("template");return i.innerHTML=t,i}}function Q(t,e,i=t,s){if(e===F)return e;let o=void 0!==s?i._$Co?.[s]:i._$Cl;const n=R(e)?void 0:e._$litDirective$;return o?.constructor!==n&&(o?._$AO?.(!1),void 0===n?o=void 0:(o=new n(t),o._$AT(t,i,s)),void 0!==s?(i._$Co??=[])[s]=o:i._$Cl=o),void 0!==o&&(e=Q(t,o._$AS(t,e.values),o,s)),e}class tt{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,s=(t?.creationScope??O).importNode(e,!0);K.currentNode=s;let o=K.nextNode(),n=0,r=0,a=i[0];for(;void 0!==a;){if(n===a.index){let e;2===a.type?e=new et(o,o.nextSibling,this,t):1===a.type?e=new a.ctor(o,a.name,a.strings,this,t):6===a.type&&(e=new rt(o,this,t)),this._$AV.push(e),a=i[++r]}n!==a?.index&&(o=K.nextNode(),n++)}return K.currentNode=O,s}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class et{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=Y,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Q(this,t,e),R(t)?t===Y||null==t||""===t?(this._$AH!==Y&&this._$AR(),this._$AH=Y):t!==this._$AH&&t!==F&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>N(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==Y&&R(this._$AH)?this._$AA.nextSibling.data=t:this.T(O.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,s="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=G.createElement(X(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(e);else{const t=new tt(s,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=J.get(t.strings);return void 0===e&&J.set(t.strings,e=new G(t)),e}k(t){N(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const o of t)s===e.length?e.push(i=new et(this.O(M()),this.O(M()),this,this.options)):i=e[s],i._$AI(o),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=E(t).nextSibling;E(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class it{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,o){this.type=1,this._$AH=Y,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=o,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=Y}_$AI(t,e=this,i,s){const o=this.strings;let n=!1;if(void 0===o)t=Q(this,t,e,0),n=!R(t)||t!==this._$AH&&t!==F,n&&(this._$AH=t);else{const s=t;let r,a;for(t=o[0],r=0;r<o.length-1;r++)a=Q(this,s[i+r],e,r),a===F&&(a=this._$AH[r]),n||=!R(a)||a!==this._$AH[r],a===Y?t=Y:t!==Y&&(t+=(a??"")+o[r+1]),this._$AH[r]=a}n&&!s&&this.j(t)}j(t){t===Y?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class st extends it{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===Y?void 0:t}}class ot extends it{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==Y)}}class nt extends it{constructor(t,e,i,s,o){super(t,e,i,s,o),this.type=5}_$AI(t,e=this){if((t=Q(this,t,e,0)??Y)===F)return;const i=this._$AH,s=t===Y&&i!==Y||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,o=t!==Y&&(i===Y||s);s&&this.element.removeEventListener(this.name,this,i),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class rt{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){Q(this,t)}}const at=A.litHtmlPolyfillSupport;at?.(G,et),(A.litHtmlVersions??=[]).push("3.3.2");const ht=globalThis;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class ct extends x{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const s=i?.renderBefore??e;let o=s._$litPart$;if(void 0===o){const t=i?.renderBefore??null;s._$litPart$=o=new et(e.insertBefore(M(),t),t,void 0,i??{})}return o._$AI(t),o})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return F}}ct._$litElement$=!0,ct.finalized=!0,ht.litElementHydrateSupport?.({LitElement:ct});const lt=ht.litElementPolyfillSupport;lt?.({LitElement:ct}),(ht.litElementVersions??=[]).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const dt={attribute:!0,type:String,converter:v,reflect:!1,hasChanged:$},pt=(t=dt,e,i)=>{const{kind:s,metadata:o}=i;let n=globalThis.litPropertyMetadata.get(o);if(void 0===n&&globalThis.litPropertyMetadata.set(o,n=new Map),"setter"===s&&((t=Object.create(t)).wrapped=!0),n.set(i.name,t),"accessor"===s){const{name:s}=i;return{set(i){const o=e.get.call(this);e.set.call(this,i),this.requestUpdate(s,o,t,!0,i)},init(e){return void 0!==e&&this.C(s,void 0,t,e),e}}}if("setter"===s){const{name:s}=i;return function(i){const o=this[s];e.call(this,i),this.requestUpdate(s,o,t,!0,i)}}throw Error("Unsupported decorator location: "+s)};function ut(t){return(e,i)=>"object"==typeof i?pt(t,e,i):((t,e,i)=>{const s=e.hasOwnProperty(i);return e.constructor.createProperty(i,t),s?Object.getOwnPropertyDescriptor(e,i):void 0})(t,e,i)}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function _t(t){return ut({...t,state:!0,attribute:!1})}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ft={en:{card:{title:"Thermostat",entity_not_found:"Entity not found: {entity}",off:"Off",next_scan:"Next scan",in:"in",today:"Today",tomorrow:"Tomorrow",past:"past",heat_protection_active:"Heat protection active"},thermostat:{heating:"Heating",cooling:"Cooling",ventilation:"Ventilation"},editor:{name:"Name",day_mode_entity:"Day Mode Entity",hermostat_mode_tentity:"Thermostat Mode Entity",show_title:"Show title"}},fr:{card:{title:"Thermostat",entity_not_found:"Entité introuvable: {entity}",off:"Éteint",next_scan:"Prochain scan",in:"dans",today:"Auj.",tomorrow:"Dem.",past:"passé",heat_protection_active:"Protection thermique active"},thermostat:{heating:"Chauffage",cooling:"Climatisation",ventilation:"Ventilation"},editor:{name:"Nom",day_mode_entity:"Entité mode jour",hermostat_mode_tentity:"Entité mode thermostat",show_title:"Afficher le titre"}}};function mt(t,e,i){const s=function(t){const e=t?.locale?.language||t?.language||"en",i=String(e).split("-")[0];return ft[e]?e:ft[i]?i:"en"}(t);let o=(n=ft[s]||ft.en,e.split(".").reduce((t,e)=>t&&null!=t[e]?t[e]:void 0,n));var n;return o||e}const gt="M 30 150 A 85 85 0 1 1 170 150",yt=34.2,vt=-145.8,$t=["var(--disabled-text-color, #9e9e9e)","#e74c3c","var(--primary-color, #3b82f6)","#d4a574"];class bt extends ct{constructor(){super(...arguments),this.options=[],this.labels=[],this.selectedIndex=-1}_getColorForIndex(t){return $t[t%$t.length]??"var(--primary-color)"}_valueToPercentage(t){return t/this.options.length}_strokeDashArc(t,e){const i=this._valueToPercentage(t);return[`${this._valueToPercentage(e)-i} 10`,`-${i}`]}_getPercentageFromEvent(t){if(!this._svg)return-1;const e=this._svg.getBoundingClientRect(),i=2*(t.clientX-e.left-e.width/2)/e.width,s=2*(t.clientY-e.top-e.height/2)/e.height,o=180*Math.atan2(s,i)/Math.PI;return o>=vt&&o<=yt?(yt-o)/180:o>=214.2?(yt+(360-o))/180:-1}_onSvgClick(t){const e=this._getPercentageFromEvent(t);if(e<0||0===this.options.length)return;const i=Math.floor(e*this.options.length),s=Math.max(0,Math.min(i,this.options.length-1));this.dispatchEvent(new CustomEvent("option-selected",{detail:{option:this.options[s]},bubbles:!0,composed:!0}))}render(){if(!this.options||0===this.options.length)return W`<div class="slider-container"></div>`;const t=this.currentValue?this.options.indexOf(this.currentValue):-1;return this.selectedIndex=-1!==t?t:-1,W`
      <div class="slider-container">
        <svg viewBox="0 0 200 200">
          <defs>
            <path id="arcPath" d="${gt}" pathLength="1" />
          </defs>

          ${q`
            <path
              d="${gt}"
              fill="none"
              stroke="var(--divider-color, #e0e0e0)"
              stroke-width="${25}"
              opacity="0.3"
              pathLength="1" 
            />
          `} ${-1!==this.selectedIndex?(()=>{const[t,e]=this._strokeDashArc(this.selectedIndex,this.selectedIndex+1),i=this._getColorForIndex(this.selectedIndex);return q`
                  <path
                    d="${gt}"
                    fill="none"
                    stroke="${i}"
                    stroke-width="${25}"
                    stroke-dasharray="${t}"
                    stroke-dashoffset="${e}"
                    stroke-linecap="butt"
                    pathLength="1"
                  />
                `})():null}
          ${(()=>{const t=this.options.length;if(t<2)return null;const e=.002,i=1/t,s=[0,i-e];for(let e=0;e<t-2;e++)s.push(.004),s.push(i-.004);return s.push(.004),s.push(100),q`
              <path
                d="${gt}"
                fill="none"
                stroke="rgba(150, 150, 150, 0.5)"
                stroke-width="${25}"
                stroke-dasharray="${s.join(" ")}"
                stroke-dashoffset="0"
                stroke-linecap="butt"
                pathLength="1"
                pointer-events="none"
              />
            `})()}
          ${this.options.map((t,e)=>{const[i,s]=this._strokeDashArc(e,e+1);return q`
              <path
                d="${gt}"
                fill="none"
                stroke="transparent"
                stroke-width="${35}"
                stroke-dasharray="${i}"
                stroke-dashoffset="${s}"
                pathLength="1"
                style="cursor: pointer;"
                @click=${t=>{t.stopPropagation(),this.dispatchEvent(new CustomEvent("option-selected",{detail:{option:this.options[e]},bubbles:!0,composed:!0}))}}
              />
            `})}
          ${this.options.map((t,e)=>{const i=100*((this._valueToPercentage(e)+this._valueToPercentage(e+1))/2),s=this.labels[e]??this.options[e];return q`
              <text
                font-size="12"
                font-weight="600"
                fill="var(--primary-text-color)"
                text-anchor="middle"
                dominant-baseline="middle"
                style="cursor: pointer; user-select: none;"
                @click=${t=>{t.stopPropagation(),this.dispatchEvent(new CustomEvent("option-selected",{detail:{option:this.options[e]},bubbles:!0,composed:!0}))}}
              >
                <textPath href="#arcPath" startOffset="${i}%" text-anchor="middle">
                  ${s}
                </textPath>
              </text>
            `})}
        </svg>
      </div>
    `}}bt.styles=r`
    :host {
      display: block;
    }

    .slider-container {
      display: flex;
      justify-content: center;
      padding: 8px 0;
    }

    svg {
      width: 100%;
      max-width: 240px;
      aspect-ratio: 1;
    }
  `,t([ut({attribute:!1})],bt.prototype,"hass",void 0),t([ut()],bt.prototype,"entityId",void 0),t([ut()],bt.prototype,"currentValue",void 0),t([ut({type:Array})],bt.prototype,"options",void 0),t([ut({type:Array})],bt.prototype,"labels",void 0),t([ut({type:Number})],bt.prototype,"selectedIndex",void 0),t([
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function(t){return(e,i,s)=>((t,e,i)=>(i.configurable=!0,i.enumerable=!0,Reflect.decorate&&"object"!=typeof e&&Object.defineProperty(t,e,i),i))(e,i,{get(){return(e=>e.renderRoot?.querySelector(t)??null)(this)}})}("svg")],bt.prototype,"_svg",void 0),customElements.define("homeshift-circular-slider",bt);class xt extends ct{setConfig(t){this._config=t}_onNameChanged(t){if(!this._config||!this.hass)return;const e=t.target.value;if(this._config.name===e)return;const i={...this._config,name:e};this._config=i,this._dispatchConfigChanged(i)}_onEntityChanged(t,e){if(!this._config||!this.hass)return;const i=t.detail.value;if(this._config[e]===i)return;const s={...this._config,[e]:i};this._config=s,this._dispatchConfigChanged(s)}_onShowTitleChanged(t){if(!this._config||!this.hass)return;const e=t.target.checked;if(this._config.show_title===e)return;const i={...this._config,show_title:e};this._config=i,this._dispatchConfigChanged(i)}_dispatchConfigChanged(t){const e=new CustomEvent("config-changed",{detail:{config:t},bubbles:!0,composed:!0});this.dispatchEvent(e)}render(){return this.hass&&this._config?W`
      <div class="card-config">
        <ha-textfield
          label="${mt(this.hass,"editor.name")}"
          .value=${this._config.name||""}
          @input=${this._onNameChanged}
        ></ha-textfield>

        <ha-entity-picker
          label="${mt(this.hass,"editor.day_mode_entity")}"
          .hass=${this.hass}
          .value=${this._config.day_mode_entity||""}
          @value-changed=${t=>this._onEntityChanged(t,"day_mode_entity")}
          allow-custom-entity
        ></ha-entity-picker>

        <ha-entity-picker
          label="${mt(this.hass,"editor.hermostat_mode_tentity")}"
          .hass=${this.hass}
          .value=${this._config.hermostat_mode_tentity||""}
          @value-changed=${t=>this._onEntityChanged(t,"hermostat_mode_tentity")}
          allow-custom-entity
        ></ha-entity-picker>

        <ha-formfield label="${mt(this.hass,"editor.show_title")}">
          <ha-switch
            .checked=${!1!==this._config.show_title}
            @change=${this._onShowTitleChanged}
          ></ha-switch>
        </ha-formfield>
      </div>
    `:W``}}xt.styles=r`
    .card-config {
      display: flex;
      flex-direction: column;
      gap: 16px;
      padding: 16px 0;
    }

    ha-textfield,
    ha-entity-picker {
      width: 100%;
    }

    ha-formfield {
      display: flex;
      align-items: center;
      padding: 8px 0;
    }
  `,t([ut({attribute:!1})],xt.prototype,"hass",void 0),t([_t()],xt.prototype,"_config",void 0),customElements.get("homeshift-card-editor")||customElements.define("homeshift-card-editor",xt);class At extends ct{constructor(){super(...arguments),this._tick=0}connectedCallback(){super.connectedCallback(),this._refreshInterval=setInterval(()=>{this._tick++},3e4)}disconnectedCallback(){super.disconnectedCallback(),clearInterval(this._refreshInterval)}static getStubConfig(){return{name:"Thermostat",day_mode_entity:"select.homeshift_day_mode",thermostat_mode_entity:"select.homeshift_thermostat_mode",override_duration_entity:"number.homeshift_override_duration",early_switch_entity:"number.homeshift_early_switch",next_mode_entity:"sensor.homeshift_next_mode",next_mode_at_entity:"sensor.homeshift_next_mode_at",heat_protection_entity:"binary_sensor.homeshift_cover_heat_active",show_title:!0}}static getConfigElement(){return document.createElement("homeshift-card-editor")}setConfig(t){if(!t)throw new Error("Missing configuration");this._config={name:t.name??"Thermostat",day_mode_entity:t.day_mode_entity??"select.homeshift_day_mode",thermostat_mode_entity:t.thermostat_mode_entity??"select.homeshift_thermostat_mode",override_duration_entity:t.override_duration_entity??"number.homeshift_override_duration",early_switch_entity:t.early_switch_entity??"number.homeshift_early_switch",next_mode_entity:t.next_mode_entity??"sensor.homeshift_next_mode",next_mode_at_entity:t.next_mode_at_entity??"sensor.homeshift_next_mode_at",heat_protection_entity:t.heat_protection_entity??"binary_sensor.homeshift_cover_heat_active",show_title:!1!==t.show_title}}getCardSize(){return 4}shouldUpdate(t){if(t.has("_config"))return!0;if(t.has("_tick"))return!0;if(t.has("hass")){const e=t.get("hass");if(!e)return!0;return[this._config?.day_mode_entity,this._config?.thermostat_mode_entity,this._config?.override_duration_entity,this._config?.early_switch_entity,this._config?.next_mode_entity,this._config?.next_mode_at_entity,this._config?.heat_protection_entity].filter(Boolean).some(t=>e.states[t]!==this.hass.states[t])}return!1}getEntityState(t){if(t)return this.hass?.states?.[t]}onSelect(t,e){const i=e.target,s=i?.value;s&&this.hass.callService("select","select_option",{entity_id:t,option:s})}onCircularSliderSelect(t,e){this.hass.callService("select","select_option",{entity_id:t,option:e})}onOffButtonClick(t,e){e&&this.hass.callService("select","select_option",{entity_id:t,option:e})}onOverrideDurationSelect(t){const e=this._config.override_duration_entity;if(!e)return;const i=Number(t.target.value);this.hass.callService("number","set_value",{entity_id:e,value:i})}onEarlySwitchSelect(t){const e=this._config.early_switch_entity;if(!e)return;const i=Number(t.target.value);this.hass.callService("number","set_value",{entity_id:e,value:i})}_formatRelativeTime(t){if(!t)return"";const e=new Date(t);if(isNaN(e.getTime()))return t;const i=e.getTime()-Date.now(),s=Math.round(i/6e4);if(s<=0)return mt(this.hass,"card.past")||"passé";if(s<60)return`${mt(this.hass,"card.in")||"dans"} ${s} min`;const o=Math.floor(s/60),n=s%60;return`${mt(this.hass,"card.in")||"dans"} ${o}h${n>0?n.toString().padStart(2,"0"):""}`}_formatAbsoluteTime(t){if(!t)return"";const e=new Date(t);if(isNaN(e.getTime()))return t;const i=new Date,s=new Date(i);s.setDate(s.getDate()+1);const o=e.toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"});return e.toDateString()===i.toDateString()?`${mt(this.hass,"card.today")||"Auj."} ${o}`:e.toDateString()===s.toDateString()?`${mt(this.hass,"card.tomorrow")||"Dem."} ${o}`:`${e.toLocaleDateString([],{month:"short",day:"numeric"})} ${o}`}_renderMain(t,e,i){const s=e.attributes?.option_map??{},o=Object.keys(s).length>0?Object.entries(s):(e.attributes?.options??[]).map(t=>[t,t]),n=t.attributes?.option_map??{},r=Object.keys(n).length>0,a=r?n.off??t.attributes?.options?.[0]??"":t.attributes?.options?.[0]??"",h=r?[a,...Object.entries(n).filter(([t])=>"off"!==t).map(([,t])=>t)]:t.attributes?.options??[],c=r?[mt(this.hass,"card.off")||a,...Object.keys(n).filter(t=>"off"!==t).map(t=>mt(this.hass,`thermostat.${t}`)||t)]:[mt(this.hass,"card.off")||(t.attributes?.options?.[0]??""),...["heating","cooling","ventilation"].map(t=>mt(this.hass,`thermostat.${t}`)||t)],l=this.getEntityState(this._config.next_mode_entity),d=this.getEntityState(this._config.next_mode_at_entity),p=Number(this.getEntityState(this._config.early_switch_entity)?.state??0),u=l?.state&&"unknown"!==l.state&&""!==l.state;return W`
      <div class="thermo-section">
        ${i?W`<div
              class="heat-protection-badge"
              title="${mt(this.hass,"card.heat_protection_active")||"Heat protection active"}"
            >
              <ha-icon icon="mdi:window-shutter"></ha-icon>
            </div>`:Y}
        <homeshift-circular-slider
          .hass=${this.hass}
          .entityId=${t.entity_id}
          .currentValue=${t.state}
          .options=${h}
          .labels=${c}
          @option-selected=${e=>this.onCircularSliderSelect(t.entity_id,e.detail.option)}
        ></homeshift-circular-slider>

        <div class="next-info-group">
          ${u||d?.state?W`<div class="next-info">
                ${u?W`<span class="next-mode-state"
                      >${l.state}</span
                    >`:Y}
                ${d?.state?W`<span class="next-mode-at-state"
                      >${this._formatAbsoluteTime(d.state)}</span
                    >`:Y}
              </div>`:Y}
          ${this._config.early_switch_entity?W`<select
                .value=${String(p)}
                class="list-select list-select--early ${0!==p?"active":""}"
                @change=${this.onEarlySwitchSelect}
              >
                ${At.EARLY_SWITCH_PRESETS.map(({label:t,value:e})=>W`<option
                      value="${e}"
                      ?selected=${p===e}
                    >
                      ${t}
                    </option>`)}
              </select>`:Y}
        </div>

        <div class="thermo-bottom">
          <div class="bottom-controls">
            <div class="day-section">
              <select
                .value=${e.state}
                @change=${t=>this.onSelect(e.entity_id,t)}
              >
                ${o.map(([t,i])=>W`<option
                      value="${i}"
                      ?selected=${i===e.state}
                    >
                      ${i}
                    </option>`)}
              </select>
            </div>

            ${(()=>{const t=Number(this.getEntityState(this._config.override_duration_entity)?.state??0);return W`<select
                .value=${String(t)}
                class="list-select list-select--override ${0!==t?"active":""}"
                @change=${this.onOverrideDurationSelect}
              >
                ${At.OVERRIDE_PRESETS.map(({label:e,value:i})=>W`<option
                    value="${i}"
                    ?selected=${t===i}
                  >
                    ${e}
                  </option>`)}
              </select>`})()}
          </div>
        </div>
      </div>
    `}render(){if(!this.hass||!this._config)return Y;const t=this._config.name??mt(this.hass,"card.title"),e=this.getEntityState(this._config.day_mode_entity),i=this.getEntityState(this._config.thermostat_mode_entity),s=e??{entity_id:this._config.day_mode_entity??"select.homeshift_day_mode",state:mt(this.hass,"preview.day_mode_state")||"Travail",attributes:{options:["Maison","Travail","Télétravail","Absence"],option_map:{home:"Maison",work:"Travail",remote:"Télétravail",away:"Absence"}}},o=i??{entity_id:this._config.thermostat_mode_entity??"select.homeshift_thermostat_mode",state:mt(this.hass,"preview.thermostat_state")||"Chauffage",attributes:{options:["Eteint","Chauffage","Climatisation","Ventilation"],option_map:{off:"Eteint",heating:"Chauffage",cooling:"Climatisation",ventilation:"Ventilation"}}},n="on"===this.getEntityState(this._config.heat_protection_entity)?.state;return W`
      <ha-card .header=${this._config.show_title?t:void 0}>
        <div class="container">
          ${this._renderMain(o,s,n)}
        </div>
      </ha-card>
    `}}At.OVERRIDE_PRESETS=[{label:"--",value:0},{label:"15min",value:15},{label:"30min",value:30},{label:"1h",value:60},{label:"2h",value:120},{label:"4h",value:240},{label:"8h",value:480},{label:"12h",value:720}],At.EARLY_SWITCH_PRESETS=[{label:"--",value:0},{label:"15min",value:15},{label:"30min",value:30},{label:"45min",value:45},{label:"1h",value:60},{label:"1h30",value:90},{label:"2h",value:120},{label:"3h",value:180},{label:"4h",value:240}],At.styles=r`
    ha-card {
      padding: 8px;
      position: relative;
      min-height: 240px;
      text-align: center;
    }

    .container {
      display: flex;
      justify-content: center;
      width: 100%;
    }

    /* SLIDER VIEW */
    .thermo-section {
      position: relative;
      width: 100%;
      max-width: 240px;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    homeshift-circular-slider {
      width: 100%;
    }

    .thermo-bottom {
      position: absolute;
      bottom: 16px;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
      z-index: 2;
      width: 90%;
    }

    .off-row {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
    }

    .bottom-controls {
      flex: 1;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .day-section {
      flex: 1;
      min-width: 0;
    }

    .day-section select {
      width: 100%;
    }

    .center-button {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      border: 1px solid var(--divider-color, #ccc);
      background: var(--card-background-color, #ffffff);
      cursor: pointer;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
      transition:
        background 0.2s,
        border-color 0.2s;
    }

    .center-button ha-icon {
      color: var(--secondary-text-color, #666);
    }

    .center-button.active {
      background: var(--primary-color);
      border-color: var(--primary-color);
    }

    .center-button.active ha-icon {
      color: var(--text-primary-color, #fff);
    }

    hui-card {
      --ha-card-box-shadow: none;
      --ha-card-border-width: 0;
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(5px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    /* UI ELEMENTS */
    select {
      padding: 8px;
      border-radius: 6px;
      border: 1px solid var(--divider-color, #ccc);
      background: var(--card-background-color);
      color: var(--primary-text-color);
    }

    .list-select {
      flex-shrink: 0;
      align-self: stretch;
      padding: 0 8px;
      border-radius: 6px;
      border: 1px solid var(--divider-color, #ccc);
      background: var(--card-background-color);
      color: var(--primary-text-color);
      font-size: 13px;
      cursor: pointer;
      transition:
        background 0.2s ease,
        border-color 0.2s ease,
        color 0.2s ease;
    }

    .list-select--override.active {
      border-color: var(--primary-color);
      background: var(--primary-color);
      color: var(--text-primary-color, #fff);
    }

    .list-select--early.active {
      border-color: var(--accent-color, var(--primary-color));
      background: var(--accent-color, var(--primary-color));
      color: var(--text-primary-color, #fff);
    }

    .list-select--early {
      padding: 8px;
    }

    .next-info-group {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 6px;
      z-index: 2;
      text-align: center;
      background: rgba(128, 128, 128, 0.12);
      border: 1px solid var(--divider-color, rgba(0, 0, 0, 0.1));
      border-radius: 10px;
      padding: 6px 12px;
    }

    .next-info {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 2px;
      pointer-events: none;
    }

    .next-mode-state {
      font-size: 13px;
      font-weight: 600;
      color: var(--primary-text-color);
    }

    .next-mode-at-state {
      font-size: 11px;
      color: var(--secondary-text-color);
    }

    .error {
      color: var(--error-color);
      padding: 16px;
    }

    .heat-protection-badge {
      position: absolute;
      right: -4px;
      top: 4%;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background: var(--error-color, #e7973c);
      color: var(--text-primary-color, #fff);
      z-index: 3;
      pointer-events: none;
      animation: fadeIn 0.3s ease;
    }

    .heat-protection-badge ha-icon {
      color: var(--text-primary-color, #fff);
      --mdi-icon-size: 20px;
    }
  `,t([ut({attribute:!1})],At.prototype,"hass",void 0),t([_t()],At.prototype,"_config",void 0),t([_t()],At.prototype,"_tick",void 0),customElements.get("homeshift-card")||customElements.define("homeshift-card",At),window.customCards=window.customCards||[],window.customCards.push({type:"homeshift-card",name:"HomeShift Card",description:"Card to manage day mode and thermostat mode via the HomeShift integration.",preview:!0});
//# sourceMappingURL=homeshift-card.js.map
