function t(t,e,i,o){var s,r=arguments.length,n=r<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(t,e,i,o);else for(var a=t.length-1;a>=0;a--)(s=t[a])&&(n=(r<3?s(n):r>3?s(e,i,n):s(e,i))||n);return r>3&&n&&Object.defineProperty(e,i,n),n}"function"==typeof SuppressedError&&SuppressedError;
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const e=globalThis,i=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,o=Symbol(),s=new WeakMap;let r=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==o)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(i&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=s.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&s.set(e,t))}return t}toString(){return this.cssText}};const n=(t,...e)=>{const i=1===t.length?t[0]:e.reduce((e,i,o)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[o+1],t[0]);return new r(i,t,o)},a=i?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new r("string"==typeof t?t:t+"",void 0,o))(e)})(t):t,{is:c,defineProperty:l,getOwnPropertyDescriptor:h,getOwnPropertyNames:d,getOwnPropertySymbols:p,getPrototypeOf:_}=Object,u=globalThis,m=u.trustedTypes,f=m?m.emptyScript:"",v=u.reactiveElementPolyfillSupport,g=(t,e)=>t,y={toAttribute(t,e){switch(e){case Boolean:t=t?f:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},$=(t,e)=>!c(t,e),b={attribute:!0,type:String,converter:y,reflect:!1,useDefault:!1,hasChanged:$};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */Symbol.metadata??=Symbol("metadata"),u.litPropertyMetadata??=new WeakMap;let x=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=b){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),o=this.getPropertyDescriptor(t,i,e);void 0!==o&&l(this.prototype,t,o)}}static getPropertyDescriptor(t,e,i){const{get:o,set:s}=h(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:o,set(e){const r=o?.call(this);s?.call(this,e),this.requestUpdate(t,r,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??b}static _$Ei(){if(this.hasOwnProperty(g("elementProperties")))return;const t=_(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(g("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(g("properties"))){const t=this.properties,e=[...d(t),...p(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(a(t))}else void 0!==t&&e.push(a(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,o)=>{if(i)t.adoptedStyleSheets=o.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const i of o){const o=document.createElement("style"),s=e.litNonce;void 0!==s&&o.setAttribute("nonce",s),o.textContent=i.cssText,t.appendChild(o)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),o=this.constructor._$Eu(t,i);if(void 0!==o&&!0===i.reflect){const s=(void 0!==i.converter?.toAttribute?i.converter:y).toAttribute(e,i.type);this._$Em=t,null==s?this.removeAttribute(o):this.setAttribute(o,s),this._$Em=null}}_$AK(t,e){const i=this.constructor,o=i._$Eh.get(t);if(void 0!==o&&this._$Em!==o){const t=i.getPropertyOptions(o),s="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:y;this._$Em=o;const r=s.fromAttribute(e,t.type);this[o]=r??this._$Ej?.get(o)??r,this._$Em=null}}requestUpdate(t,e,i,o=!1,s){if(void 0!==t){const r=this.constructor;if(!1===o&&(s=this[t]),i??=r.getPropertyOptions(t),!((i.hasChanged??$)(s,e)||i.useDefault&&i.reflect&&s===this._$Ej?.get(t)&&!this.hasAttribute(r._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:o,wrapped:s},r){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,r??e??this[t]),!0!==s||void 0!==r)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===o&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,o=this[e];!0!==t||this._$AL.has(e)||void 0===o||this.C(e,void 0,i,o)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};x.elementStyles=[],x.shadowRootOptions={mode:"open"},x[g("elementProperties")]=new Map,x[g("finalized")]=new Map,v?.({ReactiveElement:x}),(u.reactiveElementVersions??=[]).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const w=globalThis,E=t=>t,A=w.trustedTypes,S=A?A.createPolicy("lit-html",{createHTML:t=>t}):void 0,C="$lit$",k=`lit$${Math.random().toFixed(9).slice(2)}$`,P="?"+k,T=`<${P}>`,O=document,M=()=>O.createComment(""),R=t=>null===t||"object"!=typeof t&&"function"!=typeof t,D=Array.isArray,U="[ \t\n\f\r]",H=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,N=/-->/g,I=/>/g,j=RegExp(`>|${U}(?:([^\\s"'>=/]+)(${U}*=${U}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),L=/'/g,B=/"/g,z=/^(?:script|style|textarea|title)$/i,V=t=>(e,...i)=>({_$litType$:t,strings:e,values:i}),W=V(1),q=V(2),F=Symbol.for("lit-noChange"),K=Symbol.for("lit-nothing"),Y=new WeakMap,J=O.createTreeWalker(O,129);function Z(t,e){if(!D(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==S?S.createHTML(e):e}const X=(t,e)=>{const i=t.length-1,o=[];let s,r=2===e?"<svg>":3===e?"<math>":"",n=H;for(let e=0;e<i;e++){const i=t[e];let a,c,l=-1,h=0;for(;h<i.length&&(n.lastIndex=h,c=n.exec(i),null!==c);)h=n.lastIndex,n===H?"!--"===c[1]?n=N:void 0!==c[1]?n=I:void 0!==c[2]?(z.test(c[2])&&(s=RegExp("</"+c[2],"g")),n=j):void 0!==c[3]&&(n=j):n===j?">"===c[0]?(n=s??H,l=-1):void 0===c[1]?l=-2:(l=n.lastIndex-c[2].length,a=c[1],n=void 0===c[3]?j:'"'===c[3]?B:L):n===B||n===L?n=j:n===N||n===I?n=H:(n=j,s=void 0);const d=n===j&&t[e+1].startsWith("/>")?" ":"";r+=n===H?i+T:l>=0?(o.push(a),i.slice(0,l)+C+i.slice(l)+k+d):i+k+(-2===l?e:d)}return[Z(t,r+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),o]};class G{constructor({strings:t,_$litType$:e},i){let o;this.parts=[];let s=0,r=0;const n=t.length-1,a=this.parts,[c,l]=X(t,e);if(this.el=G.createElement(c,i),J.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(o=J.nextNode())&&a.length<n;){if(1===o.nodeType){if(o.hasAttributes())for(const t of o.getAttributeNames())if(t.endsWith(C)){const e=l[r++],i=o.getAttribute(t).split(k),n=/([.?@])?(.*)/.exec(e);a.push({type:1,index:s,name:n[2],strings:i,ctor:"."===n[1]?ot:"?"===n[1]?st:"@"===n[1]?rt:it}),o.removeAttribute(t)}else t.startsWith(k)&&(a.push({type:6,index:s}),o.removeAttribute(t));if(z.test(o.tagName)){const t=o.textContent.split(k),e=t.length-1;if(e>0){o.textContent=A?A.emptyScript:"";for(let i=0;i<e;i++)o.append(t[i],M()),J.nextNode(),a.push({type:2,index:++s});o.append(t[e],M())}}}else if(8===o.nodeType)if(o.data===P)a.push({type:2,index:s});else{let t=-1;for(;-1!==(t=o.data.indexOf(k,t+1));)a.push({type:7,index:s}),t+=k.length-1}s++}}static createElement(t,e){const i=O.createElement("template");return i.innerHTML=t,i}}function Q(t,e,i=t,o){if(e===F)return e;let s=void 0!==o?i._$Co?.[o]:i._$Cl;const r=R(e)?void 0:e._$litDirective$;return s?.constructor!==r&&(s?._$AO?.(!1),void 0===r?s=void 0:(s=new r(t),s._$AT(t,i,o)),void 0!==o?(i._$Co??=[])[o]=s:i._$Cl=s),void 0!==s&&(e=Q(t,s._$AS(t,e.values),s,o)),e}class tt{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,o=(t?.creationScope??O).importNode(e,!0);J.currentNode=o;let s=J.nextNode(),r=0,n=0,a=i[0];for(;void 0!==a;){if(r===a.index){let e;2===a.type?e=new et(s,s.nextSibling,this,t):1===a.type?e=new a.ctor(s,a.name,a.strings,this,t):6===a.type&&(e=new nt(s,this,t)),this._$AV.push(e),a=i[++n]}r!==a?.index&&(s=J.nextNode(),r++)}return J.currentNode=O,o}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class et{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,o){this.type=2,this._$AH=K,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=o,this._$Cv=o?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Q(this,t,e),R(t)?t===K||null==t||""===t?(this._$AH!==K&&this._$AR(),this._$AH=K):t!==this._$AH&&t!==F&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>D(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==K&&R(this._$AH)?this._$AA.nextSibling.data=t:this.T(O.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,o="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=G.createElement(Z(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===o)this._$AH.p(e);else{const t=new tt(o,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=Y.get(t.strings);return void 0===e&&Y.set(t.strings,e=new G(t)),e}k(t){D(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,o=0;for(const s of t)o===e.length?e.push(i=new et(this.O(M()),this.O(M()),this,this.options)):i=e[o],i._$AI(s),o++;o<e.length&&(this._$AR(i&&i._$AB.nextSibling,o),e.length=o)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=E(t).nextSibling;E(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class it{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,o,s){this.type=1,this._$AH=K,this._$AN=void 0,this.element=t,this.name=e,this._$AM=o,this.options=s,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=K}_$AI(t,e=this,i,o){const s=this.strings;let r=!1;if(void 0===s)t=Q(this,t,e,0),r=!R(t)||t!==this._$AH&&t!==F,r&&(this._$AH=t);else{const o=t;let n,a;for(t=s[0],n=0;n<s.length-1;n++)a=Q(this,o[i+n],e,n),a===F&&(a=this._$AH[n]),r||=!R(a)||a!==this._$AH[n],a===K?t=K:t!==K&&(t+=(a??"")+s[n+1]),this._$AH[n]=a}r&&!o&&this.j(t)}j(t){t===K?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class ot extends it{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===K?void 0:t}}class st extends it{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==K)}}class rt extends it{constructor(t,e,i,o,s){super(t,e,i,o,s),this.type=5}_$AI(t,e=this){if((t=Q(this,t,e,0)??K)===F)return;const i=this._$AH,o=t===K&&i!==K||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,s=t!==K&&(i===K||o);o&&this.element.removeEventListener(this.name,this,i),s&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class nt{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){Q(this,t)}}const at=w.litHtmlPolyfillSupport;at?.(G,et),(w.litHtmlVersions??=[]).push("3.3.2");const ct=globalThis;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class lt extends x{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const o=i?.renderBefore??e;let s=o._$litPart$;if(void 0===s){const t=i?.renderBefore??null;o._$litPart$=s=new et(e.insertBefore(M(),t),t,void 0,i??{})}return s._$AI(t),s})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return F}}lt._$litElement$=!0,lt.finalized=!0,ct.litElementHydrateSupport?.({LitElement:lt});const ht=ct.litElementPolyfillSupport;ht?.({LitElement:lt}),(ct.litElementVersions??=[]).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const dt={attribute:!0,type:String,converter:y,reflect:!1,hasChanged:$},pt=(t=dt,e,i)=>{const{kind:o,metadata:s}=i;let r=globalThis.litPropertyMetadata.get(s);if(void 0===r&&globalThis.litPropertyMetadata.set(s,r=new Map),"setter"===o&&((t=Object.create(t)).wrapped=!0),r.set(i.name,t),"accessor"===o){const{name:o}=i;return{set(i){const s=e.get.call(this);e.set.call(this,i),this.requestUpdate(o,s,t,!0,i)},init(e){return void 0!==e&&this.C(o,void 0,t,e),e}}}if("setter"===o){const{name:o}=i;return function(i){const s=this[o];e.call(this,i),this.requestUpdate(o,s,t,!0,i)}}throw Error("Unsupported decorator location: "+o)};function _t(t){return(e,i)=>"object"==typeof i?pt(t,e,i):((t,e,i)=>{const o=e.hasOwnProperty(i);return e.constructor.createProperty(i,t),o?Object.getOwnPropertyDescriptor(e,i):void 0})(t,e,i)}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function ut(t){return _t({...t,state:!0,attribute:!1})}const mt={en:{card:{title:"Thermostat",entity_not_found:"Entity not found: {entity}",off:"Off",today:"Today",tomorrow:"Tomorrow",heat_protection_active:"Heat protection active",cover_open_time:"Cover opening time",cover_close_time:"Cover closing time",cover_open_action:"Open the covers now (scheduled {time})",cover_close_action:"Close the covers now (scheduled {time})",covers_left_open:"Covers left open: {covers}",thermostat_mode:"Thermostat mode",day_mode:"Day mode",override_duration:"Override duration",early_switch:"Early switch",cover_sending:"Sending…",cover_open_failed:"Could not open the covers: {error}",cover_close_failed:"Could not close the covers: {error}"},thermostat:{heating:"Heating",cooling:"Cooling",ventilation:"Ventilation"},editor:{name:"Name",day_mode_entity:"Day Mode Entity",thermostat_mode_entity:"Thermostat Mode Entity",override_duration_entity:"Override Duration Entity",early_switch_entity:"Early Switch Entity",next_mode_entity:"Next Mode Entity",next_mode_at_entity:"Next Mode Time Entity",heat_protection_entity:"Heat Protection Entity",cover_open_time_entity:"Cover Open Time Entity",cover_close_time_entity:"Cover Close Time Entity",open_covers_entity:"Open Covers Button",close_covers_entity:"Close Covers Button",cover_entity:"Cover Entity (legacy, overrides the buttons)",covers_left_open_entity:"Covers Left Open Entity",show_title:"Show title"},preview:{home:"Home",work:"Work",remote:"Remote",away:"Away"}},fr:{card:{title:"Thermostat",entity_not_found:"Entité introuvable: {entity}",off:"Éteint",today:"Auj.",tomorrow:"Dem.",heat_protection_active:"Protection thermique active",cover_open_time:"Heure d'ouverture des volets",cover_close_time:"Heure de fermeture des volets",cover_open_action:"Ouvrir les volets maintenant (prévu à {time})",cover_close_action:"Fermer les volets maintenant (prévu à {time})",covers_left_open:"Volets non fermés : {covers}",thermostat_mode:"Mode thermostat",day_mode:"Mode jour",override_duration:"Durée de dérogation",early_switch:"Anticipation",cover_sending:"Envoi…",cover_open_failed:"Impossible d'ouvrir les volets : {error}",cover_close_failed:"Impossible de fermer les volets : {error}"},thermostat:{heating:"Chauffage",cooling:"Climatisation",ventilation:"Ventilation"},editor:{name:"Nom",day_mode_entity:"Entité mode jour",thermostat_mode_entity:"Entité mode thermostat",override_duration_entity:"Entité durée de dérogation",early_switch_entity:"Entité anticipation",next_mode_entity:"Entité prochain mode",next_mode_at_entity:"Entité heure du prochain mode",heat_protection_entity:"Entité protection thermique",cover_open_time_entity:"Entité heure d'ouverture des volets",cover_close_time_entity:"Entité heure de fermeture des volets",open_covers_entity:"Bouton d'ouverture des volets",close_covers_entity:"Bouton de fermeture des volets",cover_entity:"Entité volet (ancienne option, prioritaire sur les boutons)",covers_left_open_entity:"Entité volets non fermés",show_title:"Afficher le titre"},preview:{home:"Maison",work:"Travail",remote:"Télétravail",away:"Absence"}}};function ft(t,e){return e.split(".").reduce((t,e)=>t&&null!=t[e]?t[e]:void 0,t)}function vt(t,e,i,o){const s=function(t){const e=t?.locale?.language||t?.language||"en",i=String(e).split("-")[0];return mt[e]?e:mt[i]?i:"en"}(t);let r=ft(mt[s],e)??ft(mt.en,e)??o;return null==r?e:(i&&Object.entries(i).forEach(([t,e])=>r=r.replace(`{${t}}`,e)),r)}const gt="M 30 150 A 85 85 0 1 1 170 150",yt=["var(--disabled-text-color, #9e9e9e)","#e74c3c","var(--primary-color, #3b82f6)","#d4a574"];class $t extends lt{constructor(){super(...arguments),this.options=[],this.labels=[],this.label="",this.selectedIndex=-1}_getColorForIndex(t){return yt[t%yt.length]??"var(--primary-color)"}_valueToPercentage(t){return t/this.options.length}_strokeDashArc(t,e){const i=this._valueToPercentage(t);return[`${this._valueToPercentage(e)-i} 10`,`-${i}`]}_select(t){this.dispatchEvent(new CustomEvent("option-selected",{detail:{option:this.options[t]},bubbles:!0,composed:!0}))}_onKeyDown(t,e){const i=this.options.length;let o;switch(t.key){case"ArrowRight":case"ArrowUp":o=(e+1)%i;break;case"ArrowLeft":case"ArrowDown":o=(e-1+i)%i;break;case"Home":o=0;break;case"End":o=i-1;break;case"Enter":case" ":return t.preventDefault(),void this._select(e);default:return}t.preventDefault(),this.renderRoot.querySelector(`.segment[data-index="${o}"]`)?.focus()}render(){if(!this.options||0===this.options.length)return W`<div class="slider-container"></div>`;const t=this.currentValue?this.options.indexOf(this.currentValue):-1;return this.selectedIndex=-1!==t?t:-1,W`
      <div class="slider-container">
        <svg viewBox="0 0 200 200" role="radiogroup" aria-label=${this.label}>
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
          ${(()=>{const t=this.options.length;if(t<2)return null;const e=.002,i=1/t,o=[0,i-e];for(let e=0;e<t-2;e++)o.push(.004),o.push(i-.004);return o.push(.004),o.push(100),q`
              <path
                d="${gt}"
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
          ${this.options.map((t,e)=>{const[i,o]=this._strokeDashArc(e,e+1),s=100*((this._valueToPercentage(e)+this._valueToPercentage(e+1))/2),r=this.labels[e]??this.options[e],n=-1===this.selectedIndex?0===e:e===this.selectedIndex;return q`
              <g
                class="segment"
                data-index="${e}"
                role="radio"
                aria-checked="${e===this.selectedIndex}"
                aria-label="${r}"
                tabindex="${n?0:-1}"
                @click=${t=>{t.stopPropagation(),this._select(e)}}
                @keydown=${t=>this._onKeyDown(t,e)}
              >
                <path
                  class="hit"
                  d="${gt}"
                  fill="none"
                  stroke="transparent"
                  stroke-width="${35}"
                  stroke-dasharray="${i}"
                  stroke-dashoffset="${o}"
                  pathLength="1"
                />
                <text
                  font-size="12"
                  font-weight="600"
                  fill="var(--primary-text-color)"
                  text-anchor="middle"
                  dominant-baseline="middle"
                  aria-hidden="true"
                >
                  <textPath href="#arcPath" startOffset="${s}%" text-anchor="middle">
                    ${r}
                  </textPath>
                </text>
              </g>
            `})}
        </svg>
      </div>
    `}}$t.styles=n`
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

    .segment {
      cursor: pointer;
      user-select: none;
      outline: none;
    }

    .segment:focus-visible .hit {
      stroke: var(--primary-text-color, #000);
      stroke-opacity: 0.25;
    }
  `,t([_t()],$t.prototype,"currentValue",void 0),t([_t({type:Array})],$t.prototype,"options",void 0),t([_t({type:Array})],$t.prototype,"labels",void 0),t([_t()],$t.prototype,"label",void 0),t([_t({type:Number})],$t.prototype,"selectedIndex",void 0),customElements.get("homeshift-circular-slider")||customElements.define("homeshift-circular-slider",$t);const bt=[{key:"day_mode_entity",domains:["select","input_select"],default:"select.homeshift_day_mode"},{key:"thermostat_mode_entity",domains:["select","input_select"],default:"select.homeshift_thermostat_mode"},{key:"override_duration_entity",domains:["number","input_number"],default:"number.homeshift_override_duration"},{key:"early_switch_entity",domains:["number","input_number"],default:"number.homeshift_early_switch"},{key:"next_mode_entity",domains:["sensor"],default:"sensor.homeshift_next_mode"},{key:"next_mode_at_entity",domains:["sensor"],default:"sensor.homeshift_next_mode_at"},{key:"heat_protection_entity",domains:["binary_sensor"],default:"binary_sensor.homeshift_cover_heat_active"},{key:"cover_open_time_entity",domains:["sensor"],default:"sensor.homeshift_cover_open_time"},{key:"cover_close_time_entity",domains:["sensor"],default:"sensor.homeshift_cover_close_time"},{key:"open_covers_entity",domains:["button"],default:"button.homeshift_open_covers"},{key:"close_covers_entity",domains:["button"],default:"button.homeshift_close_covers"},{key:"cover_entity",domains:["cover"],default:""},{key:"covers_left_open_entity",domains:["binary_sensor"],default:"binary_sensor.homeshift_covers_left_open"}];class xt extends lt{setConfig(t){this._config=t}_onNameChanged(t){if(!this._config||!this.hass)return;const e=t.target.value;if(this._config.name===e)return;const i={...this._config,name:e};this._config=i,this._dispatchConfigChanged(i)}_onEntityChanged(t,e){if(!this._config||!this.hass)return;const i=t.detail.value;if(this._config[e]===i)return;const o={...this._config,[e]:i};this._config=o,this._dispatchConfigChanged(o)}_onShowTitleChanged(t){if(!this._config||!this.hass)return;const e=t.target.checked;if(this._config.show_title===e)return;const i={...this._config,show_title:e};this._config=i,this._dispatchConfigChanged(i)}_dispatchConfigChanged(t){const e=new CustomEvent("config-changed",{detail:{config:t},bubbles:!0,composed:!0});this.dispatchEvent(e)}render(){return this.hass&&this._config?W`
      <div class="card-config">
        <ha-textfield
          label="${vt(this.hass,"editor.name")}"
          .value=${this._config.name||""}
          @input=${this._onNameChanged}
        ></ha-textfield>

        ${bt.map(t=>W`<ha-entity-picker
            label="${vt(this.hass,`editor.${t.key}`)}"
            .hass=${this.hass}
            .value=${this._config[t.key]||""}
            .includeDomains=${t.domains}
            @value-changed=${e=>this._onEntityChanged(e,t.key)}
            allow-custom-entity
          ></ha-entity-picker>`)}

        <ha-formfield label="${vt(this.hass,"editor.show_title")}">
          <ha-switch
            .checked=${!1!==this._config.show_title}
            @change=${this._onShowTitleChanged}
          ></ha-switch>
        </ha-formfield>
      </div>
    `:W``}}xt.styles=n`
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
  `,t([_t({attribute:!1})],xt.prototype,"hass",void 0),t([ut()],xt.prototype,"_config",void 0),customElements.get("homeshift-card-editor")||customElements.define("homeshift-card-editor",xt);const wt=new Set(["unknown","unavailable",""]);function Et(t){const e="string"==typeof t?t:t?.state;return"string"==typeof e&&!wt.has(e)}function At(t){if(t<60)return`${t}min`;const e=Math.floor(t/60),i=Math.round(t%60);return i>0?`${e}h${String(i).padStart(2,"0")}`:`${e}h`}function St(t){const e=t?.time_format;return{locale:"system"===e?void 0:t?.language,hour12:"12"===e||"24"!==e&&void 0}}class Ct extends lt{constructor(){super(...arguments),this.preview=!1,this._day=0}connectedCallback(){super.connectedCallback(),this._scheduleMidnightRefresh()}disconnectedCallback(){super.disconnectedCallback(),clearTimeout(this._midnightTimer)}_scheduleMidnightRefresh(){clearTimeout(this._midnightTimer);const t=new Date,e=new Date(t);e.setHours(24,0,1,0),this._midnightTimer=setTimeout(()=>{this._day++,this._scheduleMidnightRefresh()},e.getTime()-t.getTime())}static getStubConfig(){return{name:"Thermostat",day_mode_entity:"select.homeshift_day_mode",thermostat_mode_entity:"select.homeshift_thermostat_mode",override_duration_entity:"number.homeshift_override_duration",early_switch_entity:"number.homeshift_early_switch",next_mode_entity:"sensor.homeshift_next_mode",next_mode_at_entity:"sensor.homeshift_next_mode_at",heat_protection_entity:"binary_sensor.homeshift_cover_heat_active",cover_open_time_entity:"sensor.homeshift_cover_open_time",cover_close_time_entity:"sensor.homeshift_cover_close_time",covers_left_open_entity:"binary_sensor.homeshift_covers_left_open",show_title:!0}}static getConfigElement(){return document.createElement("homeshift-card-editor")}setConfig(t){if(!t)throw new Error("Missing configuration");const e={name:t.name??"Thermostat",show_title:!1!==t.show_title};for(const i of bt)e[i.key]=t[i.key]??i.default;this._config=e}getCardSize(){return 4}shouldUpdate(t){if(t.has("_config")||t.has("preview"))return!0;if(t.has("_day")||t.has("_openBadge")||t.has("_coverPending"))return!0;if(t.has("hass")){const e=t.get("hass");if(!e)return!0;return bt.map(t=>this._config?.[t.key]).filter(Boolean).some(t=>e.states[t]!==this.hass.states[t])}return!1}getEntityState(t){if(t)return this.hass?.states?.[t]}getCoversLeftOpen(){const t=this.getEntityState(this._config?.covers_left_open_entity)?.attributes?.covers;return Array.isArray(t)?t.map(t=>this.hass?.states?.[t]?.attributes?.friendly_name??t):[]}onSelect(t,e){const i=e.target,o=i?.value;o&&this.hass.callService("select","select_option",{entity_id:t,option:o})}onCircularSliderSelect(t,e){this.hass.callService("select","select_option",{entity_id:t,option:e})}_coverCall(t){const e=this._config.cover_entity;if(e)return Et(this.getEntityState(e))?{domain:"cover",service:`${t}_cover`,entity_id:e}:void 0;const i="open"===t?this._config.open_covers_entity:this._config.close_covers_entity,o=this.getEntityState(i);return o&&"unavailable"!==o.state?{domain:"button",service:"press",entity_id:i}:void 0}async onCoverAction(t){const e=this._coverCall(t);if(e&&!this._coverPending){this._coverPending=t;try{await Promise.all([this.hass.callService(e.domain,e.service,{entity_id:e.entity_id}),new Promise(t=>setTimeout(t,Ct.COVER_FEEDBACK_MS))])}catch(e){this.dispatchEvent(new CustomEvent("hass-notification",{detail:{message:vt(this.hass,`card.cover_${t}_failed`,{error:e?.message??String(e)})},bubbles:!0,composed:!0}))}finally{this._coverPending=void 0}}}_renderCoverRow(t,e){const i="open"===t?"mdi:roller-shade":"mdi:roller-shade-closed";if(!this._coverCall(t))return W`<div
        class="cover-time-row"
        title=${vt(this.hass,`card.cover_${t}_time`)}
      >
        <ha-icon icon=${i}></ha-icon>
        <span>${e}</span>
      </div>`;const o=this._coverPending===t,s=vt(this.hass,`card.cover_${t}_action`,{time:e});return W`<button
      type="button"
      class="cover-time-row actionable ${o?"pending":""}"
      title=${s}
      aria-label=${s}
      aria-busy=${o?"true":"false"}
      ?disabled=${void 0!==this._coverPending}
      @click=${()=>this.onCoverAction(t)}
    >
      <ha-icon icon=${i}></ha-icon>
      <span
        >${o?vt(this.hass,"card.cover_sending"):e}</span
      >
    </button>`}onPresetSelect(t,e){const i=Number(e.target.value);Number.isFinite(i)&&this.hass.callService("number","set_value",{entity_id:t,value:i})}_renderPresetSelect(t,e,i,o){if(!t)return K;const s=function(t){if(!Et(t))return;const e=Number(t.state);return Number.isFinite(e)?e:void 0}(this.getEntityState(t)),r=void 0===s||e.some(t=>t.value===s)?e:[...e,{label:At(s),value:s}].sort((t,e)=>t.value-e.value),n=void 0!==s&&0!==s;return W`<select
      aria-label=${o}
      .value=${void 0===s?"":String(s)}
      class="list-select ${i} ${n?"active":""}"
      ?disabled=${void 0===s}
      @change=${e=>this.onPresetSelect(t,e)}
    >
      ${r.map(({label:t,value:e})=>W`<option value="${e}" ?selected=${s===e}>
            ${t}
          </option>`)}
    </select>`}_formatAbsoluteTime(t){if(!t)return"";const e=new Date(t);if(isNaN(e.getTime()))return"";const i=new Date,o=new Date(i);o.setDate(o.getDate()+1);const s=function(t,e){const{locale:i,hour12:o}=St(e);return t.toLocaleTimeString(i,{hour:"2-digit",minute:"2-digit",hour12:o})}(e,this.hass?.locale);return e.toDateString()===i.toDateString()?`${vt(this.hass,"card.today")} ${s}`:e.toDateString()===o.toDateString()?`${vt(this.hass,"card.tomorrow")} ${s}`:`${function(t,e){const{locale:i}=St(e);return t.toLocaleDateString(i,{month:"short",day:"numeric"})}(e,this.hass?.locale)} ${s}`}_renderBadge(t,e,i,o){const s=this._openBadge===t;return W`<button
        type="button"
        class="badge ${e}"
        title=${o}
        aria-label=${o}
        aria-expanded=${s?"true":"false"}
        @click=${()=>this._openBadge=s?void 0:t}
      >
        <ha-icon icon=${i}></ha-icon>
      </button>
      ${s?W`<div class="badge-detail">${o}</div>`:K}`}_renderMain(t,e,i,o,s,r){const n=e.attributes?.option_map??{},a=Object.keys(n).length>0?Object.entries(n):(e.attributes?.options??[]).map(t=>[t,t]),c=t.attributes?.option_map??{},l=Object.keys(c).length>0,h=l?c.off??t.attributes?.options?.[0]??"":t.attributes?.options?.[0]??"",d=l?[h,...Object.entries(c).filter(([t])=>"off"!==t).map(([,t])=>t)]:t.attributes?.options??[],p=l?[vt(this.hass,"card.off"),...Object.entries(c).filter(([t])=>"off"!==t).map(([t,e])=>vt(this.hass,`thermostat.${t}`,void 0,e))]:[vt(this.hass,"card.off"),...["heating","cooling","ventilation"].map(t=>vt(this.hass,`thermostat.${t}`))],_=this.getEntityState(this._config.next_mode_entity),u=this.getEntityState(this._config.next_mode_at_entity),m=Et(_),f=Et(u)?this._formatAbsoluteTime(u.state):"",v=Et(s),g=Et(r);return W`
      <div class="thermo-section">
        ${v||g?W`<div class="cover-times">
              ${v?this._renderCoverRow("open",s):K}
              ${g?this._renderCoverRow("close",r):K}
            </div>`:K}
        ${i||o.length>0?W`<div class="badge-stack">
              ${i?this._renderBadge("heat","heat-protection-badge","mdi:window-shutter",vt(this.hass,"card.heat_protection_active")):K}
              ${o.length>0?this._renderBadge("covers","covers-left-open-badge","mdi:window-shutter-alert",vt(this.hass,"card.covers_left_open",{covers:o.join(", ")})):K}
            </div>`:K}
        <homeshift-circular-slider
          .label=${vt(this.hass,"card.thermostat_mode")}
          .currentValue=${t.state}
          .options=${d}
          .labels=${p}
          @option-selected=${e=>this.onCircularSliderSelect(t.entity_id,e.detail.option)}
        ></homeshift-circular-slider>

        <div class="next-info-group">
          ${m||f?W`<div class="next-info">
                ${m?W`<span class="next-mode-state"
                      >${_.state}</span
                    >`:K}
                ${f?W`<span class="next-mode-at-state"
                      >${f}</span
                    >`:K}
              </div>`:K}
          ${this._renderPresetSelect(this._config.early_switch_entity,Ct.EARLY_SWITCH_PRESETS,"list-select--early",vt(this.hass,"card.early_switch"))}
        </div>

        <div class="thermo-bottom">
          <div class="bottom-controls">
            <div class="day-section">
              <select
                aria-label=${vt(this.hass,"card.day_mode")}
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

            ${this._renderPresetSelect(this._config.override_duration_entity,Ct.OVERRIDE_PRESETS,"list-select--override",vt(this.hass,"card.override_duration"))}
          </div>
        </div>
      </div>
    `}render(){if(!this.hass||!this._config)return K;const t=this._config.name??vt(this.hass,"card.title"),e=this.getEntityState(this._config.day_mode_entity),i=this.getEntityState(this._config.thermostat_mode_entity);if(!this.preview){const o=[[this._config.day_mode_entity,e],[this._config.thermostat_mode_entity,i]].filter(([,t])=>!t).map(([t])=>t||"?");if(o.length>0)return W`
          <ha-card .header=${this._config.show_title?t:void 0}>
            ${o.map(t=>W`<div class="error">
                  ${vt(this.hass,"card.entity_not_found",{entity:t})}
                </div>`)}
          </ha-card>
        `}const o=e??{entity_id:this._config.day_mode_entity,state:vt(this.hass,"preview.work"),attributes:{option_map:Object.fromEntries(["home","work","remote","away"].map(t=>[t,vt(this.hass,`preview.${t}`)]))}},s=i??{entity_id:this._config.thermostat_mode_entity,state:vt(this.hass,"thermostat.heating"),attributes:{option_map:{off:vt(this.hass,"card.off"),heating:vt(this.hass,"thermostat.heating"),cooling:vt(this.hass,"thermostat.cooling"),ventilation:vt(this.hass,"thermostat.ventilation")}}},r="on"===this.getEntityState(this._config.heat_protection_entity)?.state,n=this.getEntityState(this._config.cover_open_time_entity)?.state,a=this.getEntityState(this._config.cover_close_time_entity)?.state;return W`
      <ha-card .header=${this._config.show_title?t:void 0}>
        <div class="container">
          ${this._renderMain(s,o,r,this.getCoversLeftOpen(),n,a)}
        </div>
      </ha-card>
    `}}Ct.COVER_FEEDBACK_MS=600,Ct.OVERRIDE_PRESETS=[{label:"--",value:0},{label:"15min",value:15},{label:"30min",value:30},{label:"1h",value:60},{label:"2h",value:120},{label:"4h",value:240},{label:"8h",value:480},{label:"12h",value:720}],Ct.EARLY_SWITCH_PRESETS=[{label:"--",value:0},{label:"15min",value:15},{label:"30min",value:30},{label:"45min",value:45},{label:"1h",value:60},{label:"1h30",value:90},{label:"2h",value:120},{label:"3h",value:180},{label:"4h",value:240}],Ct.styles=n`
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

    button.cover-time-row {
      font: inherit;
      font-size: 11px;
    }

    .cover-time-row.actionable {
      cursor: pointer;
      transition:
        border-color 0.2s ease,
        background 0.2s ease,
        opacity 0.2s ease;
    }

    .cover-time-row.actionable:hover:not(:disabled) {
      border-color: var(--primary-color);
      background: rgba(128, 128, 128, 0.22);
    }

    .cover-time-row.actionable:focus-visible {
      outline: 2px solid var(--primary-color);
      outline-offset: 1px;
    }

    .cover-time-row.actionable:disabled {
      cursor: progress;
    }

    .cover-time-row.pending {
      border-color: var(--primary-color);
      color: var(--primary-color);
      animation: cover-pending 0.8s ease-in-out infinite alternate;
    }

    @keyframes cover-pending {
      from {
        opacity: 1;
      }
      to {
        opacity: 0.5;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .cover-time-row.pending {
        animation: none;
      }
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
      padding: 0;
      border: none;
      border-radius: 50%;
      color: var(--text-primary-color, #fff);
      cursor: pointer;
      font: inherit;
      animation: fadeIn 0.3s ease;
    }

    .badge:focus-visible {
      outline: 2px solid var(--primary-color);
      outline-offset: 2px;
    }

    .badge-detail {
      max-width: 140px;
      padding: 4px 8px;
      border-radius: 8px;
      background: var(--card-background-color, #fff);
      border: 1px solid var(--divider-color, rgba(0, 0, 0, 0.1));
      color: var(--primary-text-color);
      font-size: 11px;
      text-align: left;
      animation: fadeIn 0.2s ease;
    }

    .badge ha-icon {
      color: var(--text-primary-color, #fff);
      --mdi-icon-size: 20px;
    }

    .heat-protection-badge {
      background: var(--error-color, #e7973c);
    }

    /* Pulses between orange and yellow: a cover left up is something to act
       on tonight, not a steady status. Tapping it names the covers. */
    .covers-left-open-badge {
      background: var(--warning-color, #ff9800);
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
  `,t([_t({attribute:!1})],Ct.prototype,"hass",void 0),t([_t({type:Boolean})],Ct.prototype,"preview",void 0),t([ut()],Ct.prototype,"_config",void 0),t([ut()],Ct.prototype,"_coverPending",void 0),t([ut()],Ct.prototype,"_openBadge",void 0),t([ut()],Ct.prototype,"_day",void 0),customElements.get("homeshift-card")||customElements.define("homeshift-card",Ct),window.customCards=window.customCards||[],window.customCards.push({type:"homeshift-card",name:"HomeShift Card",description:"Card to manage day mode and thermostat mode via the HomeShift integration.",preview:!0});
