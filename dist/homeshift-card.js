function t(t,e,i,o){var s,n=arguments.length,r=n<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,i,o);else for(var a=t.length-1;a>=0;a--)(s=t[a])&&(r=(n<3?s(r):n>3?s(e,i,r):s(e,i))||r);return n>3&&r&&Object.defineProperty(e,i,r),r}"function"==typeof SuppressedError&&SuppressedError;
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const e=globalThis,i=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,o=Symbol(),s=new WeakMap;let n=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==o)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(i&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=s.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&s.set(e,t))}return t}toString(){return this.cssText}};const r=(t,...e)=>{const i=1===t.length?t[0]:e.reduce((e,i,o)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[o+1],t[0]);return new n(i,t,o)},a=i?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new n("string"==typeof t?t:t+"",void 0,o))(e)})(t):t,{is:c,defineProperty:h,getOwnPropertyDescriptor:l,getOwnPropertyNames:d,getOwnPropertySymbols:p,getPrototypeOf:_}=Object,u=globalThis,f=u.trustedTypes,m=f?f.emptyScript:"",v=u.reactiveElementPolyfillSupport,g=(t,e)=>t,y={toAttribute(t,e){switch(e){case Boolean:t=t?m:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},$=(t,e)=>!c(t,e),b={attribute:!0,type:String,converter:y,reflect:!1,useDefault:!1,hasChanged:$};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */Symbol.metadata??=Symbol("metadata"),u.litPropertyMetadata??=new WeakMap;let x=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=b){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),o=this.getPropertyDescriptor(t,i,e);void 0!==o&&h(this.prototype,t,o)}}static getPropertyDescriptor(t,e,i){const{get:o,set:s}=l(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:o,set(e){const n=o?.call(this);s?.call(this,e),this.requestUpdate(t,n,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??b}static _$Ei(){if(this.hasOwnProperty(g("elementProperties")))return;const t=_(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(g("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(g("properties"))){const t=this.properties,e=[...d(t),...p(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(a(t))}else void 0!==t&&e.push(a(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,o)=>{if(i)t.adoptedStyleSheets=o.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const i of o){const o=document.createElement("style"),s=e.litNonce;void 0!==s&&o.setAttribute("nonce",s),o.textContent=i.cssText,t.appendChild(o)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),o=this.constructor._$Eu(t,i);if(void 0!==o&&!0===i.reflect){const s=(void 0!==i.converter?.toAttribute?i.converter:y).toAttribute(e,i.type);this._$Em=t,null==s?this.removeAttribute(o):this.setAttribute(o,s),this._$Em=null}}_$AK(t,e){const i=this.constructor,o=i._$Eh.get(t);if(void 0!==o&&this._$Em!==o){const t=i.getPropertyOptions(o),s="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:y;this._$Em=o;const n=s.fromAttribute(e,t.type);this[o]=n??this._$Ej?.get(o)??n,this._$Em=null}}requestUpdate(t,e,i,o=!1,s){if(void 0!==t){const n=this.constructor;if(!1===o&&(s=this[t]),i??=n.getPropertyOptions(t),!((i.hasChanged??$)(s,e)||i.useDefault&&i.reflect&&s===this._$Ej?.get(t)&&!this.hasAttribute(n._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:o,wrapped:s},n){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,n??e??this[t]),!0!==s||void 0!==n)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===o&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,o=this[e];!0!==t||this._$AL.has(e)||void 0===o||this.C(e,void 0,i,o)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};x.elementStyles=[],x.shadowRootOptions={mode:"open"},x[g("elementProperties")]=new Map,x[g("finalized")]=new Map,v?.({ReactiveElement:x}),(u.reactiveElementVersions??=[]).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const w=globalThis,E=t=>t,A=w.trustedTypes,S=A?A.createPolicy("lit-html",{createHTML:t=>t}):void 0,C="$lit$",k=`lit$${Math.random().toFixed(9).slice(2)}$`,P="?"+k,T=`<${P}>`,O=document,M=()=>O.createComment(""),R=t=>null===t||"object"!=typeof t&&"function"!=typeof t,N=Array.isArray,U="[ \t\n\f\r]",H=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,D=/-->/g,I=/>/g,j=RegExp(`>|${U}(?:([^\\s"'>=/]+)(${U}*=${U}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),L=/'/g,z=/"/g,V=/^(?:script|style|textarea|title)$/i,B=t=>(e,...i)=>({_$litType$:t,strings:e,values:i}),W=B(1),q=B(2),F=Symbol.for("lit-noChange"),Y=Symbol.for("lit-nothing"),J=new WeakMap,K=O.createTreeWalker(O,129);function X(t,e){if(!N(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==S?S.createHTML(e):e}const Z=(t,e)=>{const i=t.length-1,o=[];let s,n=2===e?"<svg>":3===e?"<math>":"",r=H;for(let e=0;e<i;e++){const i=t[e];let a,c,h=-1,l=0;for(;l<i.length&&(r.lastIndex=l,c=r.exec(i),null!==c);)l=r.lastIndex,r===H?"!--"===c[1]?r=D:void 0!==c[1]?r=I:void 0!==c[2]?(V.test(c[2])&&(s=RegExp("</"+c[2],"g")),r=j):void 0!==c[3]&&(r=j):r===j?">"===c[0]?(r=s??H,h=-1):void 0===c[1]?h=-2:(h=r.lastIndex-c[2].length,a=c[1],r=void 0===c[3]?j:'"'===c[3]?z:L):r===z||r===L?r=j:r===D||r===I?r=H:(r=j,s=void 0);const d=r===j&&t[e+1].startsWith("/>")?" ":"";n+=r===H?i+T:h>=0?(o.push(a),i.slice(0,h)+C+i.slice(h)+k+d):i+k+(-2===h?e:d)}return[X(t,n+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),o]};class G{constructor({strings:t,_$litType$:e},i){let o;this.parts=[];let s=0,n=0;const r=t.length-1,a=this.parts,[c,h]=Z(t,e);if(this.el=G.createElement(c,i),K.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(o=K.nextNode())&&a.length<r;){if(1===o.nodeType){if(o.hasAttributes())for(const t of o.getAttributeNames())if(t.endsWith(C)){const e=h[n++],i=o.getAttribute(t).split(k),r=/([.?@])?(.*)/.exec(e);a.push({type:1,index:s,name:r[2],strings:i,ctor:"."===r[1]?ot:"?"===r[1]?st:"@"===r[1]?nt:it}),o.removeAttribute(t)}else t.startsWith(k)&&(a.push({type:6,index:s}),o.removeAttribute(t));if(V.test(o.tagName)){const t=o.textContent.split(k),e=t.length-1;if(e>0){o.textContent=A?A.emptyScript:"";for(let i=0;i<e;i++)o.append(t[i],M()),K.nextNode(),a.push({type:2,index:++s});o.append(t[e],M())}}}else if(8===o.nodeType)if(o.data===P)a.push({type:2,index:s});else{let t=-1;for(;-1!==(t=o.data.indexOf(k,t+1));)a.push({type:7,index:s}),t+=k.length-1}s++}}static createElement(t,e){const i=O.createElement("template");return i.innerHTML=t,i}}function Q(t,e,i=t,o){if(e===F)return e;let s=void 0!==o?i._$Co?.[o]:i._$Cl;const n=R(e)?void 0:e._$litDirective$;return s?.constructor!==n&&(s?._$AO?.(!1),void 0===n?s=void 0:(s=new n(t),s._$AT(t,i,o)),void 0!==o?(i._$Co??=[])[o]=s:i._$Cl=s),void 0!==s&&(e=Q(t,s._$AS(t,e.values),s,o)),e}class tt{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,o=(t?.creationScope??O).importNode(e,!0);K.currentNode=o;let s=K.nextNode(),n=0,r=0,a=i[0];for(;void 0!==a;){if(n===a.index){let e;2===a.type?e=new et(s,s.nextSibling,this,t):1===a.type?e=new a.ctor(s,a.name,a.strings,this,t):6===a.type&&(e=new rt(s,this,t)),this._$AV.push(e),a=i[++r]}n!==a?.index&&(s=K.nextNode(),n++)}return K.currentNode=O,o}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class et{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,o){this.type=2,this._$AH=Y,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=o,this._$Cv=o?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Q(this,t,e),R(t)?t===Y||null==t||""===t?(this._$AH!==Y&&this._$AR(),this._$AH=Y):t!==this._$AH&&t!==F&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>N(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==Y&&R(this._$AH)?this._$AA.nextSibling.data=t:this.T(O.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,o="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=G.createElement(X(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===o)this._$AH.p(e);else{const t=new tt(o,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=J.get(t.strings);return void 0===e&&J.set(t.strings,e=new G(t)),e}k(t){N(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,o=0;for(const s of t)o===e.length?e.push(i=new et(this.O(M()),this.O(M()),this,this.options)):i=e[o],i._$AI(s),o++;o<e.length&&(this._$AR(i&&i._$AB.nextSibling,o),e.length=o)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=E(t).nextSibling;E(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class it{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,o,s){this.type=1,this._$AH=Y,this._$AN=void 0,this.element=t,this.name=e,this._$AM=o,this.options=s,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=Y}_$AI(t,e=this,i,o){const s=this.strings;let n=!1;if(void 0===s)t=Q(this,t,e,0),n=!R(t)||t!==this._$AH&&t!==F,n&&(this._$AH=t);else{const o=t;let r,a;for(t=s[0],r=0;r<s.length-1;r++)a=Q(this,o[i+r],e,r),a===F&&(a=this._$AH[r]),n||=!R(a)||a!==this._$AH[r],a===Y?t=Y:t!==Y&&(t+=(a??"")+s[r+1]),this._$AH[r]=a}n&&!o&&this.j(t)}j(t){t===Y?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class ot extends it{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===Y?void 0:t}}class st extends it{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==Y)}}class nt extends it{constructor(t,e,i,o,s){super(t,e,i,o,s),this.type=5}_$AI(t,e=this){if((t=Q(this,t,e,0)??Y)===F)return;const i=this._$AH,o=t===Y&&i!==Y||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,s=t!==Y&&(i===Y||o);o&&this.element.removeEventListener(this.name,this,i),s&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class rt{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){Q(this,t)}}const at=w.litHtmlPolyfillSupport;at?.(G,et),(w.litHtmlVersions??=[]).push("3.3.2");const ct=globalThis;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class ht extends x{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const o=i?.renderBefore??e;let s=o._$litPart$;if(void 0===s){const t=i?.renderBefore??null;o._$litPart$=s=new et(e.insertBefore(M(),t),t,void 0,i??{})}return s._$AI(t),s})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return F}}ht._$litElement$=!0,ht.finalized=!0,ct.litElementHydrateSupport?.({LitElement:ht});const lt=ct.litElementPolyfillSupport;lt?.({LitElement:ht}),(ct.litElementVersions??=[]).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const dt={attribute:!0,type:String,converter:y,reflect:!1,hasChanged:$},pt=(t=dt,e,i)=>{const{kind:o,metadata:s}=i;let n=globalThis.litPropertyMetadata.get(s);if(void 0===n&&globalThis.litPropertyMetadata.set(s,n=new Map),"setter"===o&&((t=Object.create(t)).wrapped=!0),n.set(i.name,t),"accessor"===o){const{name:o}=i;return{set(i){const s=e.get.call(this);e.set.call(this,i),this.requestUpdate(o,s,t,!0,i)},init(e){return void 0!==e&&this.C(o,void 0,t,e),e}}}if("setter"===o){const{name:o}=i;return function(i){const s=this[o];e.call(this,i),this.requestUpdate(o,s,t,!0,i)}}throw Error("Unsupported decorator location: "+o)};function _t(t){return(e,i)=>"object"==typeof i?pt(t,e,i):((t,e,i)=>{const o=e.hasOwnProperty(i);return e.constructor.createProperty(i,t),o?Object.getOwnPropertyDescriptor(e,i):void 0})(t,e,i)}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function ut(t){return _t({...t,state:!0,attribute:!1})}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ft={en:{card:{title:"Thermostat",entity_not_found:"Entity not found: {entity}",off:"Off",next_scan:"Next scan",in:"in",today:"Today",tomorrow:"Tomorrow",past:"past",heat_protection_active:"Heat protection active",cover_open_time:"Cover opening time",cover_close_time:"Cover closing time",cover_open_action:"Open now",cover_close_action:"Close now",covers_left_open:"Covers left open: {covers}"},thermostat:{heating:"Heating",cooling:"Cooling",ventilation:"Ventilation"},editor:{name:"Name",day_mode_entity:"Day Mode Entity",hermostat_mode_tentity:"Thermostat Mode Entity",cover_open_time_entity:"Cover Open Time Entity",cover_close_time_entity:"Cover Close Time Entity",cover_entity:"Cover Entity (manual open/close)",covers_left_open_entity:"Covers Left Open Entity",show_title:"Show title"}},fr:{card:{title:"Thermostat",entity_not_found:"Entité introuvable: {entity}",off:"Éteint",next_scan:"Prochain scan",in:"dans",today:"Auj.",tomorrow:"Dem.",past:"passé",heat_protection_active:"Protection thermique active",cover_open_time:"Heure d'ouverture des volets",cover_close_time:"Heure de fermeture des volets",cover_open_action:"Ouvrir maintenant",cover_close_action:"Fermer maintenant",covers_left_open:"Volets non fermés : {covers}"},thermostat:{heating:"Chauffage",cooling:"Climatisation",ventilation:"Ventilation"},editor:{name:"Nom",day_mode_entity:"Entité mode jour",hermostat_mode_tentity:"Entité mode thermostat",cover_open_time_entity:"Entité heure d'ouverture des volets",cover_close_time_entity:"Entité heure de fermeture des volets",cover_entity:"Entité volet (ouverture/fermeture manuelle)",covers_left_open_entity:"Entité volets non fermés",show_title:"Afficher le titre"}}};function mt(t,e,i){const o=function(t){const e=t?.locale?.language||t?.language||"en",i=String(e).split("-")[0];return ft[e]?e:ft[i]?i:"en"}(t);let s=(n=ft[o]||ft.en,e.split(".").reduce((t,e)=>t&&null!=t[e]?t[e]:void 0,n));var n;return s?(i&&Object.entries(i).forEach(([t,e])=>s=s.replace(`{${t}}`,e)),s):e}const vt="M 30 150 A 85 85 0 1 1 170 150",gt=34.2,yt=-145.8,$t=["var(--disabled-text-color, #9e9e9e)","#e74c3c","var(--primary-color, #3b82f6)","#d4a574"];class bt extends ht{constructor(){super(...arguments),this.options=[],this.labels=[],this.selectedIndex=-1}_getColorForIndex(t){return $t[t%$t.length]??"var(--primary-color)"}_valueToPercentage(t){return t/this.options.length}_strokeDashArc(t,e){const i=this._valueToPercentage(t);return[`${this._valueToPercentage(e)-i} 10`,`-${i}`]}_getPercentageFromEvent(t){if(!this._svg)return-1;const e=this._svg.getBoundingClientRect(),i=2*(t.clientX-e.left-e.width/2)/e.width,o=2*(t.clientY-e.top-e.height/2)/e.height,s=180*Math.atan2(o,i)/Math.PI;return s>=yt&&s<=gt?(gt-s)/180:s>=214.2?(gt+(360-s))/180:-1}_onSvgClick(t){const e=this._getPercentageFromEvent(t);if(e<0||0===this.options.length)return;const i=Math.floor(e*this.options.length),o=Math.max(0,Math.min(i,this.options.length-1));this.dispatchEvent(new CustomEvent("option-selected",{detail:{option:this.options[o]},bubbles:!0,composed:!0}))}render(){if(!this.options||0===this.options.length)return W`<div class="slider-container"></div>`;const t=this.currentValue?this.options.indexOf(this.currentValue):-1;return this.selectedIndex=-1!==t?t:-1,W`
      <div class="slider-container">
        <svg viewBox="0 0 200 200">
          <defs>
            <path id="arcPath" d="${vt}" pathLength="1" />
          </defs>

          ${q`
            <path
              d="${vt}"
              fill="none"
              stroke="var(--divider-color, #e0e0e0)"
              stroke-width="${25}"
              opacity="0.3"
              pathLength="1" 
            />
          `} ${-1!==this.selectedIndex?(()=>{const[t,e]=this._strokeDashArc(this.selectedIndex,this.selectedIndex+1),i=this._getColorForIndex(this.selectedIndex);return q`
                  <path
                    d="${vt}"
                    fill="none"
                    stroke="${i}"
                    stroke-width="${25}"
                    stroke-dasharray="${t}"
                    stroke-dashoffset="${e}"
                    stroke-linecap="butt"
                    pathLength="1"
                  />
                `})():null}
          ${(()=>{const t=this.options.length;if(t<2)return null;const e=.002,i=1/t,o=[0,i-e];for(let e=0;e<t-2;e++)o.push(.004),o.push(i-.004);return o.push(.004),o.push(100),q`
              <path
                d="${vt}"
                fill="none"
                stroke="rgba(150, 150, 150, 0.5)"
                stroke-width="${25}"
                stroke-dasharray="${o.join(" ")}"
                stroke-dashoffset="0"
                stroke-linecap="butt"
                pathLength="1"
                pointer-events="none"
              />
            `})()}
          ${this.options.map((t,e)=>{const[i,o]=this._strokeDashArc(e,e+1);return q`
              <path
                d="${vt}"
                fill="none"
                stroke="transparent"
                stroke-width="${35}"
                stroke-dasharray="${i}"
                stroke-dashoffset="${o}"
                pathLength="1"
                style="cursor: pointer;"
                @click=${t=>{t.stopPropagation(),this.dispatchEvent(new CustomEvent("option-selected",{detail:{option:this.options[e]},bubbles:!0,composed:!0}))}}
              />
            `})}
          ${this.options.map((t,e)=>{const i=100*((this._valueToPercentage(e)+this._valueToPercentage(e+1))/2),o=this.labels[e]??this.options[e];return q`
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
                  ${o}
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
  `,t([_t({attribute:!1})],bt.prototype,"hass",void 0),t([_t()],bt.prototype,"entityId",void 0),t([_t()],bt.prototype,"currentValue",void 0),t([_t({type:Array})],bt.prototype,"options",void 0),t([_t({type:Array})],bt.prototype,"labels",void 0),t([_t({type:Number})],bt.prototype,"selectedIndex",void 0),t([
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function(t){return(e,i,o)=>((t,e,i)=>(i.configurable=!0,i.enumerable=!0,Reflect.decorate&&"object"!=typeof e&&Object.defineProperty(t,e,i),i))(e,i,{get(){return(e=>e.renderRoot?.querySelector(t)??null)(this)}})}("svg")],bt.prototype,"_svg",void 0),customElements.define("homeshift-circular-slider",bt);class xt extends ht{setConfig(t){this._config=t}_onNameChanged(t){if(!this._config||!this.hass)return;const e=t.target.value;if(this._config.name===e)return;const i={...this._config,name:e};this._config=i,this._dispatchConfigChanged(i)}_onEntityChanged(t,e){if(!this._config||!this.hass)return;const i=t.detail.value;if(this._config[e]===i)return;const o={...this._config,[e]:i};this._config=o,this._dispatchConfigChanged(o)}_onShowTitleChanged(t){if(!this._config||!this.hass)return;const e=t.target.checked;if(this._config.show_title===e)return;const i={...this._config,show_title:e};this._config=i,this._dispatchConfigChanged(i)}_dispatchConfigChanged(t){const e=new CustomEvent("config-changed",{detail:{config:t},bubbles:!0,composed:!0});this.dispatchEvent(e)}render(){return this.hass&&this._config?W`
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

        <ha-entity-picker
          label="${mt(this.hass,"editor.cover_open_time_entity")}"
          .hass=${this.hass}
          .value=${this._config.cover_open_time_entity||""}
          @value-changed=${t=>this._onEntityChanged(t,"cover_open_time_entity")}
          allow-custom-entity
        ></ha-entity-picker>

        <ha-entity-picker
          label="${mt(this.hass,"editor.cover_close_time_entity")}"
          .hass=${this.hass}
          .value=${this._config.cover_close_time_entity||""}
          @value-changed=${t=>this._onEntityChanged(t,"cover_close_time_entity")}
          allow-custom-entity
        ></ha-entity-picker>

        <ha-entity-picker
          label="${mt(this.hass,"editor.cover_entity")}"
          .hass=${this.hass}
          .value=${this._config.cover_entity||""}
          .includeDomains=${["cover"]}
          @value-changed=${t=>this._onEntityChanged(t,"cover_entity")}
          allow-custom-entity
        ></ha-entity-picker>

        <ha-entity-picker
          label="${mt(this.hass,"editor.covers_left_open_entity")}"
          .hass=${this.hass}
          .value=${this._config.covers_left_open_entity||""}
          .includeDomains=${["binary_sensor"]}
          @value-changed=${t=>this._onEntityChanged(t,"covers_left_open_entity")}
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
  `,t([_t({attribute:!1})],xt.prototype,"hass",void 0),t([ut()],xt.prototype,"_config",void 0),customElements.get("homeshift-card-editor")||customElements.define("homeshift-card-editor",xt);class wt extends ht{constructor(){super(...arguments),this._tick=0}connectedCallback(){super.connectedCallback(),this._refreshInterval=setInterval(()=>{this._tick++},3e4)}disconnectedCallback(){super.disconnectedCallback(),clearInterval(this._refreshInterval)}static getStubConfig(){return{name:"Thermostat",day_mode_entity:"select.homeshift_day_mode",thermostat_mode_entity:"select.homeshift_thermostat_mode",override_duration_entity:"number.homeshift_override_duration",early_switch_entity:"number.homeshift_early_switch",next_mode_entity:"sensor.homeshift_next_mode",next_mode_at_entity:"sensor.homeshift_next_mode_at",heat_protection_entity:"binary_sensor.homeshift_cover_heat_active",cover_open_time_entity:"sensor.homeshift_cover_open_time",cover_close_time_entity:"sensor.homeshift_cover_close_time",cover_entity:"cover.homeshift_daily_covers",covers_left_open_entity:"binary_sensor.homeshift_covers_left_open",show_title:!0}}static getConfigElement(){return document.createElement("homeshift-card-editor")}setConfig(t){if(!t)throw new Error("Missing configuration");this._config={name:t.name??"Thermostat",day_mode_entity:t.day_mode_entity??"select.homeshift_day_mode",thermostat_mode_entity:t.thermostat_mode_entity??"select.homeshift_thermostat_mode",override_duration_entity:t.override_duration_entity??"number.homeshift_override_duration",early_switch_entity:t.early_switch_entity??"number.homeshift_early_switch",next_mode_entity:t.next_mode_entity??"sensor.homeshift_next_mode",next_mode_at_entity:t.next_mode_at_entity??"sensor.homeshift_next_mode_at",heat_protection_entity:t.heat_protection_entity??"binary_sensor.homeshift_cover_heat_active",cover_open_time_entity:t.cover_open_time_entity??"sensor.homeshift_cover_open_time",cover_close_time_entity:t.cover_close_time_entity??"sensor.homeshift_cover_close_time",cover_entity:t.cover_entity??"",covers_left_open_entity:t.covers_left_open_entity??"binary_sensor.homeshift_covers_left_open",show_title:!1!==t.show_title}}getCardSize(){return 4}shouldUpdate(t){if(t.has("_config"))return!0;if(t.has("_tick"))return!0;if(t.has("hass")){const e=t.get("hass");if(!e)return!0;return[this._config?.day_mode_entity,this._config?.thermostat_mode_entity,this._config?.override_duration_entity,this._config?.early_switch_entity,this._config?.next_mode_entity,this._config?.next_mode_at_entity,this._config?.heat_protection_entity,this._config?.cover_open_time_entity,this._config?.cover_close_time_entity,this._config?.cover_entity,this._config?.covers_left_open_entity].filter(Boolean).some(t=>e.states[t]!==this.hass.states[t])}return!1}getEntityState(t){if(t)return this.hass?.states?.[t]}getCoversLeftOpen(){const t=this.getEntityState(this._config?.covers_left_open_entity)?.attributes?.covers;return Array.isArray(t)?t.map(t=>this.hass?.states?.[t]?.attributes?.friendly_name??t):[]}onSelect(t,e){const i=e.target,o=i?.value;o&&this.hass.callService("select","select_option",{entity_id:t,option:o})}onCircularSliderSelect(t,e){this.hass.callService("select","select_option",{entity_id:t,option:e})}onOffButtonClick(t,e){e&&this.hass.callService("select","select_option",{entity_id:t,option:e})}onCoverAction(t){const e=this._config.cover_entity;e&&this.hass.callService("cover",t,{entity_id:e})}onOverrideDurationSelect(t){const e=this._config.override_duration_entity;if(!e)return;const i=Number(t.target.value);this.hass.callService("number","set_value",{entity_id:e,value:i})}onEarlySwitchSelect(t){const e=this._config.early_switch_entity;if(!e)return;const i=Number(t.target.value);this.hass.callService("number","set_value",{entity_id:e,value:i})}_formatRelativeTime(t){if(!t)return"";const e=new Date(t);if(isNaN(e.getTime()))return t;const i=e.getTime()-Date.now(),o=Math.round(i/6e4);if(o<=0)return mt(this.hass,"card.past")||"passé";if(o<60)return`${mt(this.hass,"card.in")||"dans"} ${o} min`;const s=Math.floor(o/60),n=o%60;return`${mt(this.hass,"card.in")||"dans"} ${s}h${n>0?n.toString().padStart(2,"0"):""}`}_formatAbsoluteTime(t){if(!t)return"";const e=new Date(t);if(isNaN(e.getTime()))return t;const i=new Date,o=new Date(i);o.setDate(o.getDate()+1);const s=e.toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"});return e.toDateString()===i.toDateString()?`${mt(this.hass,"card.today")||"Auj."} ${s}`:e.toDateString()===o.toDateString()?`${mt(this.hass,"card.tomorrow")||"Dem."} ${s}`:`${e.toLocaleDateString([],{month:"short",day:"numeric"})} ${s}`}_renderMain(t,e,i,o,s,n){const r=e.attributes?.option_map??{},a=Object.keys(r).length>0?Object.entries(r):(e.attributes?.options??[]).map(t=>[t,t]),c=t.attributes?.option_map??{},h=Object.keys(c).length>0,l=h?c.off??t.attributes?.options?.[0]??"":t.attributes?.options?.[0]??"",d=h?[l,...Object.entries(c).filter(([t])=>"off"!==t).map(([,t])=>t)]:t.attributes?.options??[],p=h?[mt(this.hass,"card.off")||l,...Object.keys(c).filter(t=>"off"!==t).map(t=>mt(this.hass,`thermostat.${t}`)||t)]:[mt(this.hass,"card.off")||(t.attributes?.options?.[0]??""),...["heating","cooling","ventilation"].map(t=>mt(this.hass,`thermostat.${t}`)||t)],_=this.getEntityState(this._config.next_mode_entity),u=this.getEntityState(this._config.next_mode_at_entity),f=Number(this.getEntityState(this._config.early_switch_entity)?.state??0),m=_?.state&&"unknown"!==_.state&&""!==_.state,v=s&&"unknown"!==s&&"unavailable"!==s,g=n&&"unknown"!==n&&"unavailable"!==n,y=Boolean(this._config.cover_entity);return W`
      <div class="thermo-section">
        ${v||g?W`<div class="cover-times">
              ${v?W`<div
                    class="cover-time-row ${y?"actionable":""}"
                    title="${y?mt(this.hass,"card.cover_open_action")||"Open now":mt(this.hass,"card.cover_open_time")||"Cover opening time"}"
                    @click=${()=>this.onCoverAction("open_cover")}
                  >
                    <ha-icon icon="mdi:roller-shade"></ha-icon>
                    <span>${s}</span>
                  </div>`:Y}
              ${g?W`<div
                    class="cover-time-row ${y?"actionable":""}"
                    title="${y?mt(this.hass,"card.cover_close_action")||"Close now":mt(this.hass,"card.cover_close_time")||"Cover closing time"}"
                    @click=${()=>this.onCoverAction("close_cover")}
                  >
                    <ha-icon icon="mdi:roller-shade-closed"></ha-icon>
                    <span>${n}</span>
                  </div>`:Y}
            </div>`:Y}
        ${i||o.length>0?W`<div class="badge-stack">
              ${i?W`<div
                    class="badge heat-protection-badge"
                    title="${mt(this.hass,"card.heat_protection_active")||"Heat protection active"}"
                  >
                    <ha-icon icon="mdi:window-shutter"></ha-icon>
                  </div>`:Y}
              ${o.length>0?W`<div
                    class="badge covers-left-open-badge"
                    title="${mt(this.hass,"card.covers_left_open",{covers:o.join(", ")})}"
                  >
                    <ha-icon icon="mdi:window-shutter-alert"></ha-icon>
                  </div>`:Y}
            </div>`:Y}
        <homeshift-circular-slider
          .hass=${this.hass}
          .entityId=${t.entity_id}
          .currentValue=${t.state}
          .options=${d}
          .labels=${p}
          @option-selected=${e=>this.onCircularSliderSelect(t.entity_id,e.detail.option)}
        ></homeshift-circular-slider>

        <div class="next-info-group">
          ${m||u?.state?W`<div class="next-info">
                ${m?W`<span class="next-mode-state"
                      >${_.state}</span
                    >`:Y}
                ${u?.state?W`<span class="next-mode-at-state"
                      >${this._formatAbsoluteTime(u.state)}</span
                    >`:Y}
              </div>`:Y}
          ${this._config.early_switch_entity?W`<select
                .value=${String(f)}
                class="list-select list-select--early ${0!==f?"active":""}"
                @change=${this.onEarlySwitchSelect}
              >
                ${wt.EARLY_SWITCH_PRESETS.map(({label:t,value:e})=>W`<option
                      value="${e}"
                      ?selected=${f===e}
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
                ${a.map(([t,i])=>W`<option
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
                ${wt.OVERRIDE_PRESETS.map(({label:e,value:i})=>W`<option
                    value="${i}"
                    ?selected=${t===i}
                  >
                    ${e}
                  </option>`)}
              </select>`})()}
          </div>
        </div>
      </div>
    `}render(){if(!this.hass||!this._config)return Y;const t=this._config.name??mt(this.hass,"card.title"),e=this.getEntityState(this._config.day_mode_entity),i=this.getEntityState(this._config.thermostat_mode_entity),o=e??{entity_id:this._config.day_mode_entity??"select.homeshift_day_mode",state:mt(this.hass,"preview.day_mode_state")||"Travail",attributes:{options:["Maison","Travail","Télétravail","Absence"],option_map:{home:"Maison",work:"Travail",remote:"Télétravail",away:"Absence"}}},s=i??{entity_id:this._config.thermostat_mode_entity??"select.homeshift_thermostat_mode",state:mt(this.hass,"preview.thermostat_state")||"Chauffage",attributes:{options:["Eteint","Chauffage","Climatisation","Ventilation"],option_map:{off:"Eteint",heating:"Chauffage",cooling:"Climatisation",ventilation:"Ventilation"}}},n="on"===this.getEntityState(this._config.heat_protection_entity)?.state,r=this.getEntityState(this._config.cover_open_time_entity)?.state,a=this.getEntityState(this._config.cover_close_time_entity)?.state;return W`
      <ha-card .header=${this._config.show_title?t:void 0}>
        <div class="container">
          ${this._renderMain(s,o,n,this.getCoversLeftOpen(),r,a)}
        </div>
      </ha-card>
    `}}wt.OVERRIDE_PRESETS=[{label:"--",value:0},{label:"15min",value:15},{label:"30min",value:30},{label:"1h",value:60},{label:"2h",value:120},{label:"4h",value:240},{label:"8h",value:480},{label:"12h",value:720}],wt.EARLY_SWITCH_PRESETS=[{label:"--",value:0},{label:"15min",value:15},{label:"30min",value:30},{label:"45min",value:45},{label:"1h",value:60},{label:"1h30",value:90},{label:"2h",value:120},{label:"3h",value:180},{label:"4h",value:240}],wt.styles=r`
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

    .cover-times {
      position: absolute;
      right: 100%;
      margin-right: 8px;
      top: 4%;
      display: flex;
      flex-direction: column;
      gap: 4px;
      z-index: 2;
      animation: fadeIn 0.3s ease;
    }

    .cover-time-row {
      display: flex;
      align-items: center;
      gap: 4px;
      padding: 2px 6px;
      border-radius: 10px;
      background: rgba(128, 128, 128, 0.12);
      border: 1px solid var(--divider-color, rgba(0, 0, 0, 0.1));
      font-size: 11px;
      color: var(--secondary-text-color);
      white-space: nowrap;
    }

    .cover-time-row.actionable {
      cursor: pointer;
      transition:
        border-color 0.2s ease,
        background 0.2s ease;
    }

    .cover-time-row.actionable:hover {
      border-color: var(--primary-color);
      background: rgba(128, 128, 128, 0.22);
    }

    .cover-time-row ha-icon {
      color: var(--secondary-text-color);
      --mdi-icon-size: 14px;
    }

    /* Badges sit beside the dial and stack downwards, so heat protection
       and covers left open can be raised at the same time without one
       covering the other. */
    .badge-stack {
      position: absolute;
      left: 100%;
      margin-left: 8px;
      top: 4%;
      display: flex;
      flex-direction: column;
      gap: 8px;
      z-index: 3;
    }

    .badge {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 36px;
      height: 36px;
      border-radius: 50%;
      color: var(--text-primary-color, #fff);
      animation: fadeIn 0.3s ease;
    }

    .badge ha-icon {
      color: var(--text-primary-color, #fff);
      --mdi-icon-size: 20px;
    }

    .heat-protection-badge {
      background: var(--error-color, #e7973c);
      pointer-events: none;
    }

    /* Pulses between orange and yellow: a cover left up is something to act
       on tonight, not a steady status. Hoverable, so the tooltip can name
       the covers. */
    .covers-left-open-badge {
      background: var(--warning-color, #ff9800);
      cursor: help;
      animation:
        fadeIn 0.3s ease,
        covers-left-open-blink 1.2s ease-in-out infinite;
    }

    @keyframes covers-left-open-blink {
      0%,
      100% {
        background: var(--warning-color, #ff9800);
        opacity: 1;
      }
      50% {
        background: #ffd54f;
        opacity: 0.55;
      }
    }

    /* A blinking badge is exactly what reduced-motion asks us not to do;
       the colour alone still reads as a warning. */
    @media (prefers-reduced-motion: reduce) {
      .covers-left-open-badge {
        animation: fadeIn 0.3s ease;
      }
    }
  `,t([_t({attribute:!1})],wt.prototype,"hass",void 0),t([ut()],wt.prototype,"_config",void 0),t([ut()],wt.prototype,"_tick",void 0),customElements.get("homeshift-card")||customElements.define("homeshift-card",wt),window.customCards=window.customCards||[],window.customCards.push({type:"homeshift-card",name:"HomeShift Card",description:"Card to manage day mode and thermostat mode via the HomeShift integration.",preview:!0});
//# sourceMappingURL=homeshift-card.js.map
