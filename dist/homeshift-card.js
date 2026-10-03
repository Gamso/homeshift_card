function t(t,e,i,o){var s,n=arguments.length,r=n<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,i,o);else for(var a=t.length-1;a>=0;a--)(s=t[a])&&(r=(n<3?s(r):n>3?s(e,i,r):s(e,i))||r);return n>3&&r&&Object.defineProperty(e,i,r),r}"function"==typeof SuppressedError&&SuppressedError;
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const e=globalThis,i=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,o=Symbol(),s=new WeakMap;let n=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==o)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(i&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=s.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&s.set(e,t))}return t}toString(){return this.cssText}};const r=(t,...e)=>{const i=1===t.length?t[0]:e.reduce((e,i,o)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[o+1],t[0]);return new n(i,t,o)},a=i?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new n("string"==typeof t?t:t+"",void 0,o))(e)})(t):t,{is:c,defineProperty:l,getOwnPropertyDescriptor:h,getOwnPropertyNames:d,getOwnPropertySymbols:p,getPrototypeOf:_}=Object,u=globalThis,m=u.trustedTypes,f=m?m.emptyScript:"",v=u.reactiveElementPolyfillSupport,g=(t,e)=>t,y={toAttribute(t,e){switch(e){case Boolean:t=t?f:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},$=(t,e)=>!c(t,e),b={attribute:!0,type:String,converter:y,reflect:!1,useDefault:!1,hasChanged:$};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */Symbol.metadata??=Symbol("metadata"),u.litPropertyMetadata??=new WeakMap;let w=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=b){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),o=this.getPropertyDescriptor(t,i,e);void 0!==o&&l(this.prototype,t,o)}}static getPropertyDescriptor(t,e,i){const{get:o,set:s}=h(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:o,set(e){const n=o?.call(this);s?.call(this,e),this.requestUpdate(t,n,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??b}static _$Ei(){if(this.hasOwnProperty(g("elementProperties")))return;const t=_(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(g("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(g("properties"))){const t=this.properties,e=[...d(t),...p(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(a(t))}else void 0!==t&&e.push(a(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,o)=>{if(i)t.adoptedStyleSheets=o.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const i of o){const o=document.createElement("style"),s=e.litNonce;void 0!==s&&o.setAttribute("nonce",s),o.textContent=i.cssText,t.appendChild(o)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),o=this.constructor._$Eu(t,i);if(void 0!==o&&!0===i.reflect){const s=(void 0!==i.converter?.toAttribute?i.converter:y).toAttribute(e,i.type);this._$Em=t,null==s?this.removeAttribute(o):this.setAttribute(o,s),this._$Em=null}}_$AK(t,e){const i=this.constructor,o=i._$Eh.get(t);if(void 0!==o&&this._$Em!==o){const t=i.getPropertyOptions(o),s="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:y;this._$Em=o;const n=s.fromAttribute(e,t.type);this[o]=n??this._$Ej?.get(o)??n,this._$Em=null}}requestUpdate(t,e,i,o=!1,s){if(void 0!==t){const n=this.constructor;if(!1===o&&(s=this[t]),i??=n.getPropertyOptions(t),!((i.hasChanged??$)(s,e)||i.useDefault&&i.reflect&&s===this._$Ej?.get(t)&&!this.hasAttribute(n._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:o,wrapped:s},n){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,n??e??this[t]),!0!==s||void 0!==n)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===o&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,o=this[e];!0!==t||this._$AL.has(e)||void 0===o||this.C(e,void 0,i,o)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};w.elementStyles=[],w.shadowRootOptions={mode:"open"},w[g("elementProperties")]=new Map,w[g("finalized")]=new Map,v?.({ReactiveElement:w}),(u.reactiveElementVersions??=[]).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const x=globalThis,E=t=>t,A=x.trustedTypes,S=A?A.createPolicy("lit-html",{createHTML:t=>t}):void 0,C="$lit$",k=`lit$${Math.random().toFixed(9).slice(2)}$`,T="?"+k,P=`<${T}>`,O=document,M=()=>O.createComment(""),N=t=>null===t||"object"!=typeof t&&"function"!=typeof t,R=Array.isArray,U="[ \t\n\f\r]",D=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,H=/-->/g,j=/>/g,z=RegExp(`>|${U}(?:([^\\s"'>=/]+)(${U}*=${U}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),I=/'/g,L=/"/g,B=/^(?:script|style|textarea|title)$/i,V=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),q=Symbol.for("lit-noChange"),W=Symbol.for("lit-nothing"),F=new WeakMap,K=O.createTreeWalker(O,129);function Y(t,e){if(!R(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==S?S.createHTML(e):e}const J=(t,e)=>{const i=t.length-1,o=[];let s,n=2===e?"<svg>":3===e?"<math>":"",r=D;for(let e=0;e<i;e++){const i=t[e];let a,c,l=-1,h=0;for(;h<i.length&&(r.lastIndex=h,c=r.exec(i),null!==c);)h=r.lastIndex,r===D?"!--"===c[1]?r=H:void 0!==c[1]?r=j:void 0!==c[2]?(B.test(c[2])&&(s=RegExp("</"+c[2],"g")),r=z):void 0!==c[3]&&(r=z):r===z?">"===c[0]?(r=s??D,l=-1):void 0===c[1]?l=-2:(l=r.lastIndex-c[2].length,a=c[1],r=void 0===c[3]?z:'"'===c[3]?L:I):r===L||r===I?r=z:r===H||r===j?r=D:(r=z,s=void 0);const d=r===z&&t[e+1].startsWith("/>")?" ":"";n+=r===D?i+P:l>=0?(o.push(a),i.slice(0,l)+C+i.slice(l)+k+d):i+k+(-2===l?e:d)}return[Y(t,n+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),o]};class Z{constructor({strings:t,_$litType$:e},i){let o;this.parts=[];let s=0,n=0;const r=t.length-1,a=this.parts,[c,l]=J(t,e);if(this.el=Z.createElement(c,i),K.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(o=K.nextNode())&&a.length<r;){if(1===o.nodeType){if(o.hasAttributes())for(const t of o.getAttributeNames())if(t.endsWith(C)){const e=l[n++],i=o.getAttribute(t).split(k),r=/([.?@])?(.*)/.exec(e);a.push({type:1,index:s,name:r[2],strings:i,ctor:"."===r[1]?et:"?"===r[1]?it:"@"===r[1]?ot:tt}),o.removeAttribute(t)}else t.startsWith(k)&&(a.push({type:6,index:s}),o.removeAttribute(t));if(B.test(o.tagName)){const t=o.textContent.split(k),e=t.length-1;if(e>0){o.textContent=A?A.emptyScript:"";for(let i=0;i<e;i++)o.append(t[i],M()),K.nextNode(),a.push({type:2,index:++s});o.append(t[e],M())}}}else if(8===o.nodeType)if(o.data===T)a.push({type:2,index:s});else{let t=-1;for(;-1!==(t=o.data.indexOf(k,t+1));)a.push({type:7,index:s}),t+=k.length-1}s++}}static createElement(t,e){const i=O.createElement("template");return i.innerHTML=t,i}}function G(t,e,i=t,o){if(e===q)return e;let s=void 0!==o?i._$Co?.[o]:i._$Cl;const n=N(e)?void 0:e._$litDirective$;return s?.constructor!==n&&(s?._$AO?.(!1),void 0===n?s=void 0:(s=new n(t),s._$AT(t,i,o)),void 0!==o?(i._$Co??=[])[o]=s:i._$Cl=s),void 0!==s&&(e=G(t,s._$AS(t,e.values),s,o)),e}class Q{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,o=(t?.creationScope??O).importNode(e,!0);K.currentNode=o;let s=K.nextNode(),n=0,r=0,a=i[0];for(;void 0!==a;){if(n===a.index){let e;2===a.type?e=new X(s,s.nextSibling,this,t):1===a.type?e=new a.ctor(s,a.name,a.strings,this,t):6===a.type&&(e=new st(s,this,t)),this._$AV.push(e),a=i[++r]}n!==a?.index&&(s=K.nextNode(),n++)}return K.currentNode=O,o}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class X{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,o){this.type=2,this._$AH=W,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=o,this._$Cv=o?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=G(this,t,e),N(t)?t===W||null==t||""===t?(this._$AH!==W&&this._$AR(),this._$AH=W):t!==this._$AH&&t!==q&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>R(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==W&&N(this._$AH)?this._$AA.nextSibling.data=t:this.T(O.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,o="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=Z.createElement(Y(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===o)this._$AH.p(e);else{const t=new Q(o,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=F.get(t.strings);return void 0===e&&F.set(t.strings,e=new Z(t)),e}k(t){R(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,o=0;for(const s of t)o===e.length?e.push(i=new X(this.O(M()),this.O(M()),this,this.options)):i=e[o],i._$AI(s),o++;o<e.length&&(this._$AR(i&&i._$AB.nextSibling,o),e.length=o)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=E(t).nextSibling;E(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class tt{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,o,s){this.type=1,this._$AH=W,this._$AN=void 0,this.element=t,this.name=e,this._$AM=o,this.options=s,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=W}_$AI(t,e=this,i,o){const s=this.strings;let n=!1;if(void 0===s)t=G(this,t,e,0),n=!N(t)||t!==this._$AH&&t!==q,n&&(this._$AH=t);else{const o=t;let r,a;for(t=s[0],r=0;r<s.length-1;r++)a=G(this,o[i+r],e,r),a===q&&(a=this._$AH[r]),n||=!N(a)||a!==this._$AH[r],a===W?t=W:t!==W&&(t+=(a??"")+s[r+1]),this._$AH[r]=a}n&&!o&&this.j(t)}j(t){t===W?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class et extends tt{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===W?void 0:t}}class it extends tt{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==W)}}class ot extends tt{constructor(t,e,i,o,s){super(t,e,i,o,s),this.type=5}_$AI(t,e=this){if((t=G(this,t,e,0)??W)===q)return;const i=this._$AH,o=t===W&&i!==W||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,s=t!==W&&(i===W||o);o&&this.element.removeEventListener(this.name,this,i),s&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class st{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){G(this,t)}}const nt=x.litHtmlPolyfillSupport;nt?.(Z,X),(x.litHtmlVersions??=[]).push("3.3.2");const rt=globalThis;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class at extends w{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const o=i?.renderBefore??e;let s=o._$litPart$;if(void 0===s){const t=i?.renderBefore??null;o._$litPart$=s=new X(e.insertBefore(M(),t),t,void 0,i??{})}return s._$AI(t),s})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return q}}at._$litElement$=!0,at.finalized=!0,rt.litElementHydrateSupport?.({LitElement:at});const ct=rt.litElementPolyfillSupport;ct?.({LitElement:at}),(rt.litElementVersions??=[]).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const lt={attribute:!0,type:String,converter:y,reflect:!1,hasChanged:$},ht=(t=lt,e,i)=>{const{kind:o,metadata:s}=i;let n=globalThis.litPropertyMetadata.get(s);if(void 0===n&&globalThis.litPropertyMetadata.set(s,n=new Map),"setter"===o&&((t=Object.create(t)).wrapped=!0),n.set(i.name,t),"accessor"===o){const{name:o}=i;return{set(i){const s=e.get.call(this);e.set.call(this,i),this.requestUpdate(o,s,t,!0,i)},init(e){return void 0!==e&&this.C(o,void 0,t,e),e}}}if("setter"===o){const{name:o}=i;return function(i){const s=this[o];e.call(this,i),this.requestUpdate(o,s,t,!0,i)}}throw Error("Unsupported decorator location: "+o)};function dt(t){return(e,i)=>"object"==typeof i?ht(t,e,i):((t,e,i)=>{const o=e.hasOwnProperty(i);return e.constructor.createProperty(i,t),o?Object.getOwnPropertyDescriptor(e,i):void 0})(t,e,i)}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function pt(t){return dt({...t,state:!0,attribute:!1})}const _t={en:{card:{entity_not_found:"Entity not found: {entity}",unavailable:"Unavailable",today:"Today",tomorrow:"Tomorrow",heat_protection_active:"Heat protection active",cover_open_time:"Cover opening time",cover_close_time:"Cover closing time",cover_open_action:"Open the covers now (scheduled {time})",cover_close_action:"Close the covers now (scheduled {time})",cover_sending:"Sending…",cover_open_failed:"Could not open the covers: {error}",cover_close_failed:"Could not close the covers: {error}",covers_left_open:"Not closed: {covers}",thermostat_mode:"Thermostat mode",day_mode:"Day mode",next:"Next",covers:"Covers",duration_off:"No",decrease:"Decrease: {setting}",increase:"Increase: {setting}",override_label:"Keep my manual choice",override_none:"A manual change is replaced at the calendar's next pass.",override_effect:"After a change by hand, the calendar waits {duration} — until {time} if you change it now.",early_label:"Start events early",early_none:"{mode} will start at its scheduled time, {time}.",early_effect:"{mode} will start at {time} instead of {scheduled}.",early_no_event:"No event scheduled.",covers_left_open_count:"Not closed: {count} covers"},thermostat:{off:"Off",heating:"Heating",cooling:"Cooling",ventilation:"Ventilation"},editor:{name:"Name",day_mode_entity:"Day Mode Entity",thermostat_mode_entity:"Thermostat Mode Entity",override_duration_entity:"Override Duration Entity",early_switch_entity:"Early Switch Entity",next_mode_entity:"Next Mode Entity",next_mode_at_entity:"Next Mode Time Entity",heat_protection_entity:"Heat Protection Entity",cover_open_time_entity:"Cover Open Time Entity",cover_close_time_entity:"Cover Close Time Entity",open_covers_entity:"Open Covers Button",close_covers_entity:"Close Covers Button",cover_entity:"Cover Entity (legacy, overrides the buttons)",covers_left_open_entity:"Covers Left Open Entity"},preview:{home:"Home",work:"Work",remote:"Remote",away:"Away"}},fr:{card:{entity_not_found:"Entité introuvable: {entity}",unavailable:"Indisponible",today:"Auj.",tomorrow:"Dem.",heat_protection_active:"Protection thermique active",cover_open_time:"Heure d'ouverture des volets",cover_close_time:"Heure de fermeture des volets",cover_open_action:"Ouvrir les volets maintenant (prévu à {time})",cover_close_action:"Fermer les volets maintenant (prévu à {time})",cover_sending:"Envoi…",cover_open_failed:"Impossible d'ouvrir les volets : {error}",cover_close_failed:"Impossible de fermer les volets : {error}",covers_left_open:"Non fermés : {covers}",thermostat_mode:"Mode thermostat",day_mode:"Mode du jour",next:"Prochain",covers:"Volets",duration_off:"Non",decrease:"Diminuer : {setting}",increase:"Augmenter : {setting}",override_label:"Garder mon choix manuel",override_none:"Un changement manuel est remplacé au prochain passage du calendrier.",override_effect:"Après un changement à la main, le calendrier attend {duration} — jusqu'à {time} si tu changes maintenant.",early_label:"Anticiper les événements",early_none:"{mode} commencera à l'heure prévue, {time}.",early_effect:"{mode} commencera à {time} au lieu de {scheduled}.",early_no_event:"Aucun événement prévu.",covers_left_open_count:"Non fermés : {count} volets"},thermostat:{off:"Éteint",heating:"Chauffage",cooling:"Climatisation",ventilation:"Ventilation"},editor:{name:"Nom",day_mode_entity:"Entité mode jour",thermostat_mode_entity:"Entité mode thermostat",override_duration_entity:"Entité durée de dérogation",early_switch_entity:"Entité anticipation",next_mode_entity:"Entité prochain mode",next_mode_at_entity:"Entité heure du prochain mode",heat_protection_entity:"Entité protection thermique",cover_open_time_entity:"Entité heure d'ouverture des volets",cover_close_time_entity:"Entité heure de fermeture des volets",open_covers_entity:"Bouton d'ouverture des volets",close_covers_entity:"Bouton de fermeture des volets",cover_entity:"Entité volet (ancienne option, prioritaire sur les boutons)",covers_left_open_entity:"Entité volets non fermés"},preview:{home:"Maison",work:"Travail",remote:"Télétravail",away:"Absence"}}};function ut(t,e){return e.split(".").reduce((t,e)=>t&&null!=t[e]?t[e]:void 0,t)}function mt(t,e,i,o){const s=function(t){const e=t?.locale?.language||t?.language||"en",i=String(e).split("-")[0];return _t[e]?e:_t[i]?i:"en"}(t);let n=ut(_t[s],e)??ut(_t.en,e)??o;return null==n?e:(i&&Object.entries(i).forEach(([t,e])=>n=n.replace(`{${t}}`,e)),n)}const ft=[{key:"day_mode_entity",domains:["select","input_select"],default:"select.homeshift_day_mode"},{key:"thermostat_mode_entity",domains:["select","input_select"],default:"select.homeshift_thermostat_mode"},{key:"override_duration_entity",domains:["number","input_number"],default:"number.homeshift_override_duration"},{key:"early_switch_entity",domains:["number","input_number"],default:"number.homeshift_early_switch"},{key:"next_mode_entity",domains:["sensor"],default:"sensor.homeshift_next_mode"},{key:"next_mode_at_entity",domains:["sensor"],default:"sensor.homeshift_next_mode_at"},{key:"heat_protection_entity",domains:["binary_sensor"],default:"binary_sensor.homeshift_cover_heat_active"},{key:"cover_open_time_entity",domains:["sensor"],default:"sensor.homeshift_cover_open_time"},{key:"cover_close_time_entity",domains:["sensor"],default:"sensor.homeshift_cover_close_time"},{key:"open_covers_entity",domains:["button"],default:"button.homeshift_open_covers"},{key:"close_covers_entity",domains:["button"],default:"button.homeshift_close_covers"},{key:"cover_entity",domains:["cover"],default:""},{key:"covers_left_open_entity",domains:["binary_sensor"],default:"binary_sensor.homeshift_covers_left_open"}];class vt extends at{setConfig(t){this._config=t}_onNameChanged(t){if(!this._config||!this.hass)return;const e=t.target.value;if(this._config.name===e)return;const i={...this._config,name:e};this._config=i,this._dispatchConfigChanged(i)}_onEntityChanged(t,e){if(!this._config||!this.hass)return;const i=t.detail.value;if(this._config[e]===i)return;const o={...this._config,[e]:i};this._config=o,this._dispatchConfigChanged(o)}_dispatchConfigChanged(t){const e=new CustomEvent("config-changed",{detail:{config:t},bubbles:!0,composed:!0});this.dispatchEvent(e)}render(){return this.hass&&this._config?V`
      <div class="card-config">
        <ha-textfield
          label="${mt(this.hass,"editor.name")}"
          .value=${this._config.name||""}
          @input=${this._onNameChanged}
        ></ha-textfield>

        ${ft.map(t=>V`<ha-entity-picker
            label="${mt(this.hass,`editor.${t.key}`)}"
            .hass=${this.hass}
            .value=${this._config[t.key]||""}
            .includeDomains=${t.domains}
            @value-changed=${e=>this._onEntityChanged(e,t.key)}
            allow-custom-entity
          ></ha-entity-picker>`)}
      </div>
    `:V``}}vt.styles=r`
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
  `,t([dt({attribute:!1})],vt.prototype,"hass",void 0),t([pt()],vt.prototype,"_config",void 0),customElements.get("homeshift-card-editor")||customElements.define("homeshift-card-editor",vt);const gt=new Set(["unknown","unavailable",""]);function yt(t){const e="string"==typeof t?t:t?.state;return"string"==typeof e&&!gt.has(e)}function $t(t){const e=t?.time_format;return{locale:"system"===e?void 0:t?.language,hour12:"12"===e||"24"!==e&&void 0}}function bt(t,e){const{locale:i,hour12:o}=$t(e);return t.toLocaleTimeString(i,{hour:"2-digit",minute:"2-digit",hour12:o})}class wt extends at{constructor(){super(...arguments),this.preview=!1,this._openSetting=null,this._coversExpanded=!1,this._day=0}connectedCallback(){super.connectedCallback(),this._scheduleMidnightRefresh()}disconnectedCallback(){super.disconnectedCallback(),clearTimeout(this._midnightTimer),clearTimeout(this._settingTimeout)}_scheduleMidnightRefresh(){clearTimeout(this._midnightTimer);const t=new Date,e=new Date(t);e.setHours(24,0,1,0),this._midnightTimer=setTimeout(()=>{this._day++,this._scheduleMidnightRefresh()},e.getTime()-t.getTime())}static getStubConfig(){return{name:"Thermostat",day_mode_entity:"select.homeshift_day_mode",thermostat_mode_entity:"select.homeshift_thermostat_mode",override_duration_entity:"number.homeshift_override_duration",early_switch_entity:"number.homeshift_early_switch",next_mode_entity:"sensor.homeshift_next_mode",next_mode_at_entity:"sensor.homeshift_next_mode_at",heat_protection_entity:"binary_sensor.homeshift_cover_heat_active",cover_open_time_entity:"sensor.homeshift_cover_open_time",cover_close_time_entity:"sensor.homeshift_cover_close_time",covers_left_open_entity:"binary_sensor.homeshift_covers_left_open"}}static getConfigElement(){return document.createElement("homeshift-card-editor")}setConfig(t){if(!t)throw new Error("Missing configuration");const e={name:t.name??"Thermostat"};for(const i of ft)e[i.key]=t[i.key]??i.default;this._config=e}getCardSize(){return 4}shouldUpdate(t){if(t.has("_config")||t.has("preview"))return!0;if(t.has("_day")||t.has("_openSetting")||t.has("_coversExpanded")||t.has("_coverPending"))return!0;if(t.has("hass")){const e=t.get("hass");if(!e)return!0;return ft.map(t=>this._config?.[t.key]).filter(Boolean).some(t=>e.states[t]!==this.hass.states[t])}return!1}_presetClass(t,e){const i=t=>t.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g,"").replace(/[^a-z0-9]+/g,"-");if(["off","heating","cooling","ventilation"].includes(i(t)))return i(t);return{eteint:"off",arret:"off",off:"off",chauffage:"heating",heat:"heating",heating:"heating",climatisation:"cooling",clim:"cooling",cool:"cooling",cooling:"cooling",ventilation:"ventilation",ventilateur:"ventilation",fan:"ventilation"}[i(e)]??i(t)}getEntityState(t){if(t)return this.hass?.states?.[t]}getCoversLeftOpen(){const t=this.getEntityState(this._config?.covers_left_open_entity)?.attributes?.covers;return Array.isArray(t)?t.map(t=>this.hass?.states?.[t]?.attributes?.friendly_name??t):[]}onSelect(t,e){const i=e.target,o=i?.value;o&&this.hass.callService("select","select_option",{entity_id:t,option:o})}onThermostatSelect(t,e){this.hass.callService("select","select_option",{entity_id:t,option:e})}_coverCall(t){const e=this._config.cover_entity;if(e)return yt(this.getEntityState(e))?{domain:"cover",service:`${t}_cover`,entity_id:e}:void 0;const i="open"===t?this._config.open_covers_entity:this._config.close_covers_entity,o=this.getEntityState(i);return o&&"unavailable"!==o.state?{domain:"button",service:"press",entity_id:i}:void 0}async onCoverAction(t){const e=this._coverCall(t);if(e&&!this._coverPending){this._coverPending=t;try{await Promise.all([this.hass.callService(e.domain,e.service,{entity_id:e.entity_id}),new Promise(t=>setTimeout(t,wt.COVER_FEEDBACK_MS))])}catch(e){this.dispatchEvent(new CustomEvent("hass-notification",{detail:{message:mt(this.hass,`card.cover_${t}_failed`,{error:e?.message??String(e)})},bubbles:!0,composed:!0}))}finally{this._coverPending=void 0}}}_renderCoverTime(t,e){const i="open"===t?"mdi:roller-shade":"mdi:roller-shade-closed";if(!this._coverCall(t))return V`<span
        class="cover-time"
        title=${mt(this.hass,`card.cover_${t}_time`)}
      >
        <ha-icon icon=${i}></ha-icon>${e}
      </span>`;const o=this._coverPending===t,s=mt(this.hass,`card.cover_${t}_action`,{time:e});return V`<button
      type="button"
      class="cover-time actionable ${o?"pending":""}"
      title=${s}
      aria-label=${s}
      aria-busy=${o?"true":"false"}
      ?disabled=${void 0!==this._coverPending}
      @click=${()=>this.onCoverAction(t)}
    >
      <ha-icon icon=${i}></ha-icon>${o?mt(this.hass,"card.cover_sending"):e}
    </button>`}_formatAbsoluteTime(t){if(!t)return"";const e=new Date(t);if(isNaN(e.getTime()))return"";const i=new Date,o=new Date(i);o.setDate(o.getDate()+1);const s=bt(e,this.hass?.locale);return e.toDateString()===i.toDateString()?`${mt(this.hass,"card.today")} ${s}`:e.toDateString()===o.toDateString()?`${mt(this.hass,"card.tomorrow")} ${s}`:`${function(t,e){const{locale:i}=$t(e);return t.toLocaleDateString(i,{month:"short",day:"numeric"})}(e,this.hass?.locale)} ${s}`}_settingLabel(t){return void 0===t?mt(this.hass,"card.unavailable"):t?function(t){if(t<60)return`${t} min`;const e=Math.floor(t/60),i=Math.round(t%60);return i>0?`${e}h${String(i).padStart(2,"0")}`:`${e}h`}(t):mt(this.hass,"card.duration_off")}_clockIn(t){return bt(new Date(Date.now()+6e4*t),this.hass?.locale)}_clockAt(t,e=0){return bt(new Date(new Date(t).getTime()+6e4*e),this.hass?.locale)}_toggleSetting(t){this._openSetting=this._openSetting===t?null:t,this._armSettingTimeout()}_armSettingTimeout(){clearTimeout(this._settingTimeout),this._openSetting&&(this._settingTimeout=setTimeout(()=>{this._openSetting=null},6e3))}_stepSetting(t,e,i,o){const s="override"===t?this._config.override_duration_entity:this._config.early_switch_entity;if(!s)return;const n=o>0?e.find(t=>t>i):[...e].reverse().find(t=>t<i);void 0!==n&&(this._armSettingTimeout(),this.hass.callService("number","set_value",{entity_id:s,value:n}))}_renderSetting(t,e,i,o,s,n){const r=void 0!==n&&this._openSetting===t;return V`<div class="setting ${r?"open":""}">
      <button
        class="setting-head"
        aria-expanded=${r?"true":"false"}
        ?disabled=${void 0===n}
        @click=${()=>this._toggleSetting(t)}
      >
        <ha-icon icon="${e}"></ha-icon>
        <span class="setting-label">${i}</span>
        <span class="setting-value ${n?"set":""}"
          >${this._settingLabel(n)}</span
        >
        <ha-icon class="chevron" icon="mdi:chevron-down"></ha-icon>
      </button>
      ${r?V`<div class="setting-body">
            <div class="stepper">
              <button
                aria-label=${mt(this.hass,"card.decrease",{setting:i})}
                ?disabled=${n<=s[0]}
                @click=${()=>this._stepSetting(t,s,n,-1)}
              >
                −
              </button>
              <span class="stepper-value" aria-live="polite"
                >${this._settingLabel(n)}</span
              >
              <button
                aria-label=${mt(this.hass,"card.increase",{setting:i})}
                ?disabled=${n>=s[s.length-1]}
                @click=${()=>this._stepSetting(t,s,n,1)}
              >
                +
              </button>
            </div>
            <p class="setting-effect">${o}</p>
          </div>`:W}
    </div>`}_minutes(t){if(!t)return null;const e=this.getEntityState(t);return e?function(t){if(!yt(t))return;const e=Number(t.state);return Number.isFinite(e)?e:void 0}(e):this.preview?0:null}_renderMain(t,e,i,o,s,n){const r=e.attributes?.option_map??{},a=Object.keys(r).length>0?Object.entries(r):(e.attributes?.options??[]).map(t=>[t,t]),c=t.attributes?.option_map??{},l=Object.keys(c).length>0?Object.entries(c):(t.attributes?.options??[]).map(t=>[t,t]),h=this.getEntityState(this._config.next_mode_entity),d=this.getEntityState(this._config.next_mode_at_entity),p=this._minutes(this._config.early_switch_entity),_=this._minutes(this._config.override_duration_entity),u=yt(h),m=u?h.state:"",f=yt(d)?this._formatAbsoluteTime(d.state):"",v=""!==f,g=_?mt(this.hass,"card.override_effect",{duration:this._settingLabel(_),time:this._clockIn(_)}):mt(this.hass,"card.override_none"),y=v?p?mt(this.hass,"card.early_effect",{mode:m,time:this._clockAt(d.state),scheduled:this._clockAt(d.state,p)}):mt(this.hass,"card.early_none",{mode:m,time:this._clockAt(d.state)}):mt(this.hass,"card.early_no_event"),$=yt(s),b=yt(n),w=mt(this.hass,"card.covers_left_open",{covers:o.join(", ")}),x=o.length>3,E=x?mt(this.hass,"card.covers_left_open_count",{count:String(o.length)}):w,A=t.attributes?.current_key,S=yt(t);return V`
      <div class="rows">
        <div
          class="presets"
          role="group"
          aria-label=${mt(this.hass,"card.thermostat_mode")}
        >
          ${l.map(([e,i])=>{const o=S&&(A?e===A:i===t.state);return V`<button
              class="preset preset--${this._presetClass(e,i)} ${o?"on":""}"
              aria-pressed=${o?"true":"false"}
              ?disabled=${!S}
              @click=${()=>this.onThermostatSelect(t.entity_id,i)}
            >
              ${mt(this.hass,`thermostat.${e}`,void 0,i)}
            </button>`})}
        </div>

        <div class="row">
          <span class="row-key">${mt(this.hass,"card.day_mode")}</span>
          <select
            aria-label=${mt(this.hass,"card.day_mode")}
            .value=${e.state}
            ?disabled=${!yt(e)}
            @change=${t=>this.onSelect(e.entity_id,t)}
          >
            ${a.map(([t,i])=>V`<option
                value="${i}"
                ?selected=${i===e.state}
              >
                ${i}
              </option>`)}
          </select>
        </div>

        ${u||v?V`<div class="row next-row">
              <span class="row-key">${mt(this.hass,"card.next")}</span>
              <span
                >${m}${u&&v?" · ":""}${f}</span
              >
            </div>`:W}

        ${null!==_?this._renderSetting("override","mdi:hand-back-left",mt(this.hass,"card.override_label"),g,wt.OVERRIDE_PRESETS,_):W}
        ${null!==p?this._renderSetting("early","mdi:clock-fast",mt(this.hass,"card.early_label"),y,wt.EARLY_SWITCH_PRESETS,p):W}

        ${$||b?V`<div class="row">
              <span class="row-key">${mt(this.hass,"card.covers")}</span>
              <span class="cover-times">
                ${$?this._renderCoverTime("open",s):W}
                ${b?this._renderCoverTime("close",n):W}
              </span>
            </div>`:W}

        ${i||o.length>0?V`<div class="alerts">
              ${i?V`<span class="chip chip--heat">
                    <ha-icon icon="mdi:window-shutter"></ha-icon>
                    ${mt(this.hass,"card.heat_protection_active")}
                  </span>`:W}
              ${o.length>0&&!x?V`<span class="chip chip--covers">
                    <ha-icon icon="mdi:window-shutter-alert"></ha-icon>
                    ${E}
                  </span>`:W}
              ${x?V`<button
                    type="button"
                    class="chip chip--covers"
                    title=${w}
                    aria-label=${w}
                    aria-expanded=${this._coversExpanded?"true":"false"}
                    @click=${()=>this._coversExpanded=!this._coversExpanded}
                  >
                    <ha-icon icon="mdi:window-shutter-alert"></ha-icon>
                    ${E}
                  </button>`:W}
            </div>
            ${x&&this._coversExpanded?V`<p class="covers-detail">${w}</p>`:W}`:W}
      </div>
    `}render(){if(!this.hass||!this._config)return W;const t=this.getEntityState(this._config.day_mode_entity),e=this.getEntityState(this._config.thermostat_mode_entity);if(!this.preview){const i=[[this._config.day_mode_entity,t],[this._config.thermostat_mode_entity,e]].filter(([,t])=>!t).map(([t])=>t||"?");if(i.length>0)return V`
          <ha-card>
            ${i.map(t=>V`<div class="error">
                  ${mt(this.hass,"card.entity_not_found",{entity:t})}
                </div>`)}
          </ha-card>
        `}const i=t??{entity_id:this._config.day_mode_entity,state:mt(this.hass,"preview.work"),attributes:{option_map:Object.fromEntries(["home","work","remote","away"].map(t=>[t,mt(this.hass,`preview.${t}`)]))}},o=e??{entity_id:this._config.thermostat_mode_entity,state:mt(this.hass,"thermostat.heating"),attributes:{option_map:Object.fromEntries(["off","heating","cooling","ventilation"].map(t=>[t,mt(this.hass,`thermostat.${t}`)])),current_key:"heating"}},s="on"===this.getEntityState(this._config.heat_protection_entity)?.state,n=this.getEntityState(this._config.cover_open_time_entity)?.state,r=this.getEntityState(this._config.cover_close_time_entity)?.state;return V`
      <ha-card>
        <div class="container">
          ${this._renderMain(o,i,s,this.getCoversLeftOpen(),n,r)}
        </div>
      </ha-card>
    `}}wt.COVER_FEEDBACK_MS=600,wt.OVERRIDE_PRESETS=[0,15,30,60,120,240,480,720],wt.EARLY_SWITCH_PRESETS=[0,15,30,45,60,90,120,180,240],wt.styles=r`
    ha-card {
      padding: 12px;
      position: relative;
    }

    .container {
      width: 100%;
    }

    .rows {
      display: flex;
      flex-direction: column;
    }

    /* Thermostat presets — one segmented control, one colour per mode. */
    .presets {
      display: grid;
      grid-auto-flow: column;
      grid-auto-columns: 1fr;
      border: 1px solid var(--divider-color, #ccc);
      border-radius: 8px;
      overflow: hidden;
      margin-bottom: 4px;
    }

    .preset {
      border: 0;
      border-left: 1px solid var(--divider-color, #ccc);
      background: transparent;
      color: var(--secondary-text-color, #666);
      font-size: 13px;
      font-family: inherit;
      padding: 8px 4px;
      cursor: pointer;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      transition:
        background 0.2s ease,
        color 0.2s ease;
    }

    .preset:first-child {
      border-left: 0;
    }

    .preset:hover {
      background: var(--secondary-background-color, rgba(127, 127, 127, 0.12));
    }

    .preset:disabled {
      cursor: default;
      opacity: 0.6;
    }

    .preset:focus-visible,
    .setting-head:focus-visible,
    .stepper button:focus-visible,
    .cover-time.actionable:focus-visible {
      outline: 2px solid var(--primary-color);
      outline-offset: -2px;
    }

    .preset.on {
      background: var(--secondary-text-color, #666);
      color: var(--text-primary-color, #fff);
    }

    .preset--heating.on {
      background: var(--state-climate-heat-color, #e24b4a);
    }

    .preset--cooling.on {
      background: var(--state-climate-cool-color, #378add);
    }

    .preset--ventilation.on {
      background: var(--state-fan-active-color, #1d9e75);
    }

    .preset--off.on {
      background: var(--divider-color, #9e9e9e);
      color: var(--primary-text-color);
    }

    .row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      padding: 8px 0;
      border-top: 1px solid var(--divider-color, #e0e0e0);
      font-size: 13px;
    }

    .row-key {
      color: var(--secondary-text-color, #666);
    }

    /* Collapsed by default: the value is readable without opening anything. */
    .setting {
      border-top: 1px solid var(--divider-color, #e0e0e0);
    }

    .setting-head {
      display: flex;
      align-items: center;
      gap: 8px;
      width: 100%;
      padding: 8px 0;
      border: 0;
      background: transparent;
      color: var(--primary-text-color);
      font-size: 13px;
      font-family: inherit;
      text-align: left;
      cursor: pointer;
    }

    .setting-head:disabled {
      cursor: default;
    }

    .setting-head:disabled .chevron {
      visibility: hidden;
    }

    .setting-head ha-icon {
      --mdc-icon-size: 18px;
      color: var(--secondary-text-color, #666);
      flex-shrink: 0;
    }

    .setting-label {
      flex: 1;
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .setting-value {
      color: var(--secondary-text-color, #666);
    }

    .setting-value.set {
      color: var(--primary-text-color);
      font-weight: 500;
    }

    .setting .chevron {
      transition: transform 0.15s ease;
    }

    .setting.open .chevron {
      transform: rotate(180deg);
    }

    .setting-body {
      padding: 0 0 10px 26px;
      animation: fadeIn 0.15s ease;
    }

    .stepper {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .stepper button {
      width: 34px;
      height: 34px;
      border-radius: 8px;
      border: 1px solid var(--divider-color, #ccc);
      background: var(--card-background-color);
      color: var(--primary-text-color);
      font-size: 18px;
      line-height: 1;
      cursor: pointer;
    }

    .stepper button:hover:not(:disabled) {
      background: var(--secondary-background-color, rgba(127, 127, 127, 0.12));
    }

    .stepper button:disabled {
      opacity: 0.4;
      cursor: default;
    }

    .stepper-value {
      min-width: 64px;
      text-align: center;
      font-size: 15px;
      font-weight: 500;
    }

    .setting-effect {
      margin: 8px 0 0;
      font-size: 12px;
      line-height: 1.4;
      color: var(--secondary-text-color, #666);
    }

    .cover-times {
      display: flex;
      gap: 6px;
    }

    .cover-time {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      padding: 4px 8px;
      border-radius: 8px;
      border: 1px solid var(--divider-color, #ccc);
      background: var(--card-background-color);
      color: var(--primary-text-color);
      font-size: 13px;
      font-family: inherit;
    }

    .cover-time ha-icon {
      --mdc-icon-size: 16px;
      color: var(--secondary-text-color, #666);
    }

    .cover-time.actionable {
      cursor: pointer;
    }

    .cover-time.actionable:hover:not(:disabled) {
      border-color: var(--primary-color);
    }

    .cover-time.actionable:disabled {
      cursor: progress;
    }

    .cover-time.pending {
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
      .cover-time.pending {
        animation: none;
      }
    }

    .error {
      color: var(--error-color);
      padding: 4px;
    }

    /* Alerts only exist while something is wrong; nothing is shown otherwise. */
    .alerts {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      padding-top: 10px;
      border-top: 1px solid var(--divider-color, #e0e0e0);
    }

    .chip {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      padding: 4px 8px;
      border-radius: 8px;
      font-size: 12px;
      animation: fadeIn 0.3s ease;
    }

    .chip ha-icon {
      --mdc-icon-size: 16px;
    }

    button.chip {
      border: 0;
      font-family: inherit;
      cursor: pointer;
    }

    button.chip:focus-visible {
      outline: 2px solid var(--primary-color);
      outline-offset: 2px;
    }

    .covers-detail {
      margin: 6px 0 0;
      font-size: 12px;
      line-height: 1.4;
      color: var(--primary-text-color);
    }

    .chip--heat {
      background: var(--error-color, #e7973c);
      color: var(--text-primary-color, #fff);
    }

    /* Pulses between orange and yellow: a cover left up is something to act
       on tonight, not a steady status. */
    .chip--covers {
      background: var(--warning-color, #ff9800);
      color: #412402;
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

    /* A blinking chip is exactly what reduced-motion asks us not to do;
       the colour alone still reads as a warning. */
    @media (prefers-reduced-motion: reduce) {
      .chip--covers {
        animation: fadeIn 0.3s ease;
      }
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(3px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    select {
      padding: 6px 8px;
      border-radius: 8px;
      border: 1px solid var(--divider-color, #ccc);
      background: var(--card-background-color);
      color: var(--primary-text-color);
      font-size: 13px;
      font-family: inherit;
    }
  `,t([dt({attribute:!1})],wt.prototype,"hass",void 0),t([dt({type:Boolean})],wt.prototype,"preview",void 0),t([pt()],wt.prototype,"_config",void 0),t([pt()],wt.prototype,"_openSetting",void 0),t([pt()],wt.prototype,"_coverPending",void 0),t([pt()],wt.prototype,"_coversExpanded",void 0),t([pt()],wt.prototype,"_day",void 0),customElements.get("homeshift-card")||customElements.define("homeshift-card",wt),window.customCards=window.customCards||[],window.customCards.push({type:"homeshift-card",name:"HomeShift Card",description:"Card to manage day mode and thermostat mode via the HomeShift integration.",preview:!0});
