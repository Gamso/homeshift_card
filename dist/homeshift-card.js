function e(e,t,i,s){var o,n=arguments.length,r=n<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,i,s);else for(var a=e.length-1;a>=0;a--)(o=e[a])&&(r=(n<3?o(r):n>3?o(t,i,r):o(t,i))||r);return n>3&&r&&Object.defineProperty(t,i,r),r}"function"==typeof SuppressedError&&SuppressedError;
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t=globalThis,i=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s=Symbol(),o=new WeakMap;let n=class{constructor(e,t,i){if(this._$cssResult$=!0,i!==s)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(i&&void 0===e){const i=void 0!==t&&1===t.length;i&&(e=o.get(t)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&o.set(t,e))}return e}toString(){return this.cssText}};const r=(e,...t)=>{const i=1===e.length?e[0]:t.reduce((t,i,s)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+e[s+1],e[0]);return new n(i,e,s)},a=i?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const i of e.cssRules)t+=i.cssText;return(e=>new n("string"==typeof e?e:e+"",void 0,s))(t)})(e):e,{is:c,defineProperty:l,getOwnPropertyDescriptor:d,getOwnPropertyNames:h,getOwnPropertySymbols:u,getPrototypeOf:p}=Object,_=globalThis,m=_.trustedTypes,f=m?m.emptyScript:"",v=_.reactiveElementPolyfillSupport,g=(e,t)=>e,y={toAttribute(e,t){switch(t){case Boolean:e=e?f:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let i=e;switch(t){case Boolean:i=null!==e;break;case Number:i=null===e?null:Number(e);break;case Object:case Array:try{i=JSON.parse(e)}catch(e){i=null}}return i}},b=(e,t)=>!c(e,t),$={attribute:!0,type:String,converter:y,reflect:!1,useDefault:!1,hasChanged:b};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */Symbol.metadata??=Symbol("metadata"),_.litPropertyMetadata??=new WeakMap;let x=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=$){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(e,i,t);void 0!==s&&l(this.prototype,e,s)}}static getPropertyDescriptor(e,t,i){const{get:s,set:o}=d(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:s,set(t){const n=s?.call(this);o?.call(this,t),this.requestUpdate(e,n,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??$}static _$Ei(){if(this.hasOwnProperty(g("elementProperties")))return;const e=p(this);e.finalize(),void 0!==e.l&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(g("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(g("properties"))){const e=this.properties,t=[...h(e),...u(e)];for(const i of t)this.createProperty(i,e[i])}const e=this[Symbol.metadata];if(null!==e){const t=litPropertyMetadata.get(e);if(void 0!==t)for(const[e,i]of t)this.elementProperties.set(e,i)}this._$Eh=new Map;for(const[e,t]of this.elementProperties){const i=this._$Eu(e,t);void 0!==i&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const e of i)t.unshift(a(e))}else void 0!==e&&t.push(a(e));return t}static _$Eu(e,t){const i=t.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof e?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),void 0!==this.renderRoot&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const i of t.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((e,s)=>{if(i)e.adoptedStyleSheets=s.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const i of s){const s=document.createElement("style"),o=t.litNonce;void 0!==o&&s.setAttribute("nonce",o),s.textContent=i.cssText,e.appendChild(s)}})(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$ET(e,t){const i=this.constructor.elementProperties.get(e),s=this.constructor._$Eu(e,i);if(void 0!==s&&!0===i.reflect){const o=(void 0!==i.converter?.toAttribute?i.converter:y).toAttribute(t,i.type);this._$Em=e,null==o?this.removeAttribute(s):this.setAttribute(s,o),this._$Em=null}}_$AK(e,t){const i=this.constructor,s=i._$Eh.get(e);if(void 0!==s&&this._$Em!==s){const e=i.getPropertyOptions(s),o="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==e.converter?.fromAttribute?e.converter:y;this._$Em=s;const n=o.fromAttribute(t,e.type);this[s]=n??this._$Ej?.get(s)??n,this._$Em=null}}requestUpdate(e,t,i,s=!1,o){if(void 0!==e){const n=this.constructor;if(!1===s&&(o=this[e]),i??=n.getPropertyOptions(e),!((i.hasChanged??b)(o,t)||i.useDefault&&i.reflect&&o===this._$Ej?.get(e)&&!this.hasAttribute(n._$Eu(e,i))))return;this.C(e,t,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:i,reflect:s,wrapped:o},n){i&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,n??t??this[e]),!0!==o||void 0!==n)||(this._$AL.has(e)||(this.hasUpdated||i||(t=void 0),this._$AL.set(e,t)),!0===s&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}const e=this.constructor.elementProperties;if(e.size>0)for(const[t,i]of e){const{wrapped:e}=i,s=this[t];!0!==e||this._$AL.has(t)||void 0===s||this.C(t,void 0,i,s)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(t){throw e=!1,this._$EM(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(e){}firstUpdated(e){}};x.elementStyles=[],x.shadowRootOptions={mode:"open"},x[g("elementProperties")]=new Map,x[g("finalized")]=new Map,v?.({ReactiveElement:x}),(_.reactiveElementVersions??=[]).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const w=globalThis,S=e=>e,E=w.trustedTypes,k=E?E.createPolicy("lit-html",{createHTML:e=>e}):void 0,A="$lit$",C=`lit$${Math.random().toFixed(9).slice(2)}$`,T="?"+C,P=`<${T}>`,M=document,O=()=>M.createComment(""),D=e=>null===e||"object"!=typeof e&&"function"!=typeof e,I=Array.isArray,N="[ \t\n\f\r]",R=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,H=/-->/g,U=/>/g,z=RegExp(`>|${N}(?:([^\\s"'>=/]+)(${N}*=${N}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),j=/'/g,L=/"/g,B=/^(?:script|style|textarea|title)$/i,q=(e=>(t,...i)=>({_$litType$:e,strings:t,values:i}))(1),V=Symbol.for("lit-noChange"),F=Symbol.for("lit-nothing"),W=new WeakMap,K=M.createTreeWalker(M,129);function Y(e,t){if(!I(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==k?k.createHTML(t):t}const J=(e,t)=>{const i=e.length-1,s=[];let o,n=2===t?"<svg>":3===t?"<math>":"",r=R;for(let t=0;t<i;t++){const i=e[t];let a,c,l=-1,d=0;for(;d<i.length&&(r.lastIndex=d,c=r.exec(i),null!==c);)d=r.lastIndex,r===R?"!--"===c[1]?r=H:void 0!==c[1]?r=U:void 0!==c[2]?(B.test(c[2])&&(o=RegExp("</"+c[2],"g")),r=z):void 0!==c[3]&&(r=z):r===z?">"===c[0]?(r=o??R,l=-1):void 0===c[1]?l=-2:(l=r.lastIndex-c[2].length,a=c[1],r=void 0===c[3]?z:'"'===c[3]?L:j):r===L||r===j?r=z:r===H||r===U?r=R:(r=z,o=void 0);const h=r===z&&e[t+1].startsWith("/>")?" ":"";n+=r===R?i+P:l>=0?(s.push(a),i.slice(0,l)+A+i.slice(l)+C+h):i+C+(-2===l?t:h)}return[Y(e,n+(e[i]||"<?>")+(2===t?"</svg>":3===t?"</math>":"")),s]};class X{constructor({strings:e,_$litType$:t},i){let s;this.parts=[];let o=0,n=0;const r=e.length-1,a=this.parts,[c,l]=J(e,t);if(this.el=X.createElement(c,i),K.currentNode=this.el.content,2===t||3===t){const e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;null!==(s=K.nextNode())&&a.length<r;){if(1===s.nodeType){if(s.hasAttributes())for(const e of s.getAttributeNames())if(e.endsWith(A)){const t=l[n++],i=s.getAttribute(e).split(C),r=/([.?@])?(.*)/.exec(t);a.push({type:1,index:o,name:r[2],strings:i,ctor:"."===r[1]?te:"?"===r[1]?ie:"@"===r[1]?se:ee}),s.removeAttribute(e)}else e.startsWith(C)&&(a.push({type:6,index:o}),s.removeAttribute(e));if(B.test(s.tagName)){const e=s.textContent.split(C),t=e.length-1;if(t>0){s.textContent=E?E.emptyScript:"";for(let i=0;i<t;i++)s.append(e[i],O()),K.nextNode(),a.push({type:2,index:++o});s.append(e[t],O())}}}else if(8===s.nodeType)if(s.data===T)a.push({type:2,index:o});else{let e=-1;for(;-1!==(e=s.data.indexOf(C,e+1));)a.push({type:7,index:o}),e+=C.length-1}o++}}static createElement(e,t){const i=M.createElement("template");return i.innerHTML=e,i}}function Z(e,t,i=e,s){if(t===V)return t;let o=void 0!==s?i._$Co?.[s]:i._$Cl;const n=D(t)?void 0:t._$litDirective$;return o?.constructor!==n&&(o?._$AO?.(!1),void 0===n?o=void 0:(o=new n(e),o._$AT(e,i,s)),void 0!==s?(i._$Co??=[])[s]=o:i._$Cl=o),void 0!==o&&(t=Z(e,o._$AS(e,t.values),o,s)),t}class G{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:i}=this._$AD,s=(e?.creationScope??M).importNode(t,!0);K.currentNode=s;let o=K.nextNode(),n=0,r=0,a=i[0];for(;void 0!==a;){if(n===a.index){let t;2===a.type?t=new Q(o,o.nextSibling,this,e):1===a.type?t=new a.ctor(o,a.name,a.strings,this,e):6===a.type&&(t=new oe(o,this,e)),this._$AV.push(t),a=i[++r]}n!==a?.index&&(o=K.nextNode(),n++)}return K.currentNode=M,s}p(e){let t=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}}class Q{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,i,s){this.type=2,this._$AH=F,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===e?.nodeType&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=Z(this,e,t),D(e)?e===F||null==e||""===e?(this._$AH!==F&&this._$AR(),this._$AH=F):e!==this._$AH&&e!==V&&this._(e):void 0!==e._$litType$?this.$(e):void 0!==e.nodeType?this.T(e):(e=>I(e)||"function"==typeof e?.[Symbol.iterator])(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==F&&D(this._$AH)?this._$AA.nextSibling.data=e:this.T(M.createTextNode(e)),this._$AH=e}$(e){const{values:t,_$litType$:i}=e,s="number"==typeof i?this._$AC(e):(void 0===i.el&&(i.el=X.createElement(Y(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(t);else{const e=new G(s,this),i=e.u(this.options);e.p(t),this.T(i),this._$AH=e}}_$AC(e){let t=W.get(e.strings);return void 0===t&&W.set(e.strings,t=new X(e)),t}k(e){I(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let i,s=0;for(const o of e)s===t.length?t.push(i=new Q(this.O(O()),this.O(O()),this,this.options)):i=t[s],i._$AI(o),s++;s<t.length&&(this._$AR(i&&i._$AB.nextSibling,s),t.length=s)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){const t=S(e).nextSibling;S(e).remove(),e=t}}setConnected(e){void 0===this._$AM&&(this._$Cv=e,this._$AP?.(e))}}class ee{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,i,s,o){this.type=1,this._$AH=F,this._$AN=void 0,this.element=e,this.name=t,this._$AM=s,this.options=o,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=F}_$AI(e,t=this,i,s){const o=this.strings;let n=!1;if(void 0===o)e=Z(this,e,t,0),n=!D(e)||e!==this._$AH&&e!==V,n&&(this._$AH=e);else{const s=e;let r,a;for(e=o[0],r=0;r<o.length-1;r++)a=Z(this,s[i+r],t,r),a===V&&(a=this._$AH[r]),n||=!D(a)||a!==this._$AH[r],a===F?e=F:e!==F&&(e+=(a??"")+o[r+1]),this._$AH[r]=a}n&&!s&&this.j(e)}j(e){e===F?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class te extends ee{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===F?void 0:e}}class ie extends ee{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==F)}}class se extends ee{constructor(e,t,i,s,o){super(e,t,i,s,o),this.type=5}_$AI(e,t=this){if((e=Z(this,e,t,0)??F)===V)return;const i=this._$AH,s=e===F&&i!==F||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,o=e!==F&&(i===F||s);s&&this.element.removeEventListener(this.name,this,i),o&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}class oe{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){Z(this,e)}}const ne=w.litHtmlPolyfillSupport;ne?.(X,Q),(w.litHtmlVersions??=[]).push("3.3.2");const re=globalThis;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class ae extends x{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=((e,t,i)=>{const s=i?.renderBefore??t;let o=s._$litPart$;if(void 0===o){const e=i?.renderBefore??null;s._$litPart$=o=new Q(t.insertBefore(O(),e),e,void 0,i??{})}return o._$AI(e),o})(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return V}}ae._$litElement$=!0,ae.finalized=!0,re.litElementHydrateSupport?.({LitElement:ae});const ce=re.litElementPolyfillSupport;ce?.({LitElement:ae}),(re.litElementVersions??=[]).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const le={attribute:!0,type:String,converter:y,reflect:!1,hasChanged:b},de=(e=le,t,i)=>{const{kind:s,metadata:o}=i;let n=globalThis.litPropertyMetadata.get(o);if(void 0===n&&globalThis.litPropertyMetadata.set(o,n=new Map),"setter"===s&&((e=Object.create(e)).wrapped=!0),n.set(i.name,e),"accessor"===s){const{name:s}=i;return{set(i){const o=t.get.call(this);t.set.call(this,i),this.requestUpdate(s,o,e,!0,i)},init(t){return void 0!==t&&this.C(s,void 0,e,t),t}}}if("setter"===s){const{name:s}=i;return function(i){const o=this[s];t.call(this,i),this.requestUpdate(s,o,e,!0,i)}}throw Error("Unsupported decorator location: "+s)};function he(e){return(t,i)=>"object"==typeof i?de(e,t,i):((e,t,i)=>{const s=t.hasOwnProperty(i);return t.constructor.createProperty(i,e),s?Object.getOwnPropertyDescriptor(t,i):void 0})(e,t,i)}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function ue(e){return he({...e,state:!0,attribute:!1})}const pe={en:{card:{entity_not_found:"Entity not found: {entity}",unavailable:"Unavailable",today:"Today",tomorrow:"Tomorrow",heat_protection_active:"Heat protection active",cover_open_time:"Cover opening time",cover_close_time:"Cover closing time",cover_open_action:"Open the covers now (scheduled {time})",cover_close_action:"Close the covers now (scheduled {time})",cover_sending:"Sending…",cover_open_failed:"Could not open the covers: {error}",cover_close_failed:"Could not close the covers: {error}",covers_left_open:"Not closed: {covers}",thermostat_mode:"Thermostat mode",day_mode:"Day mode",next:"Next",covers:"Covers",duration_off:"No",decrease:"Decrease: {setting}",increase:"Increase: {setting}",override_label:"Keep my manual choice",override_none:"A manual change is replaced at the calendar's next pass.",override_effect:"After a change by hand, the calendar waits {duration} — until {time} if you change it now.",early_label:"Start events early",early_none:"{mode} will start at its scheduled time, {time}.",early_effect:"{mode} will start at {time} instead of {scheduled}.",early_no_event:"No event scheduled.",covers_left_open_count:"Not closed: {count} covers",inhibit_label:"Cover automation",inhibit_none:"Auto",inhibited_count:"{count} paused",inhibit_forever:"Until resumed",days_short:"d",inhibit_effect:"Pause for {duration} — until {time} if you start it now.",inhibit_effect_forever:"The cover stays paused until you resume it.",inhibited_until:"Paused until {time}",inhibited_forever:"Paused until resumed",pause:"Pause",resume:"Resume",resume_all:"Resume all",covers_paused:"Paused: {covers}",covers_paused_count:"{count} covers paused",inhibit_failed:"Could not pause or resume the cover: {error}"},thermostat:{off:"Off",heating:"Heating",cooling:"Cooling",ventilation:"Ventilation"},schedule:{title:"Schedules",empty:"No schedule for {mode}",on:"On",off:"Off",edit:"Edit schedules",back:"Back to timelines",active_mode:"Current day mode",next_run:"Next run",days:"Days"},editor:{name:"Name",day_mode_entity:"Day Mode Entity",thermostat_mode_entity:"Thermostat Mode Entity",override_duration_entity:"Override Duration Entity",early_switch_entity:"Early Switch Entity",next_mode_entity:"Next Mode Entity",next_mode_at_entity:"Next Mode Time Entity",heat_protection_entity:"Heat Protection Entity",cover_open_time_entity:"Cover Open Time Entity",cover_close_time_entity:"Cover Close Time Entity",open_covers_entity:"Open Covers Button",close_covers_entity:"Close Covers Button",cover_entity:"Cover Entity (legacy, overrides the buttons)",covers_left_open_entity:"Covers Left Open Entity",covers_inhibited_entity:"Paused covers entity",show_schedules:"Schedules panel (Scheduler integration)",schedule_entities:"Schedules panel: only these entities (all when empty)"},preview:{home:"Home",work:"Work",remote:"Remote",away:"Away"}},fr:{card:{entity_not_found:"Entité introuvable: {entity}",unavailable:"Indisponible",today:"Auj.",tomorrow:"Dem.",heat_protection_active:"Protection thermique active",cover_open_time:"Heure d'ouverture des volets",cover_close_time:"Heure de fermeture des volets",cover_open_action:"Ouvrir les volets maintenant (prévu à {time})",cover_close_action:"Fermer les volets maintenant (prévu à {time})",cover_sending:"Envoi…",cover_open_failed:"Impossible d'ouvrir les volets : {error}",cover_close_failed:"Impossible de fermer les volets : {error}",covers_left_open:"Non fermés : {covers}",thermostat_mode:"Mode thermostat",day_mode:"Mode du jour",next:"Prochain",covers:"Volets",duration_off:"Non",decrease:"Diminuer : {setting}",increase:"Augmenter : {setting}",override_label:"Garder mon choix manuel",override_none:"Un changement manuel est remplacé au prochain passage du calendrier.",override_effect:"Après un changement à la main, le calendrier attend {duration} — jusqu'à {time} si tu changes maintenant.",early_label:"Anticiper les événements",early_none:"{mode} commencera à l'heure prévue, {time}.",early_effect:"{mode} commencera à {time} au lieu de {scheduled}.",early_no_event:"Aucun événement prévu.",covers_left_open_count:"Non fermés : {count} volets",inhibit_label:"Pilotage auto des volets",inhibit_none:"Auto",inhibited_count:"{count} en pause",inhibit_forever:"Jusqu'à reprise",days_short:"j",inhibit_effect:"Pause de {duration} — jusqu'à {time} si tu l'actives maintenant.",inhibit_effect_forever:"Le volet reste en pause jusqu'à ce que tu le reprennes.",inhibited_until:"En pause jusqu'à {time}",inhibited_forever:"En pause jusqu'à reprise",pause:"Pause",resume:"Reprendre",resume_all:"Tout reprendre",covers_paused:"En pause : {covers}",covers_paused_count:"{count} volets en pause",inhibit_failed:"Échec de la mise en pause : {error}"},thermostat:{off:"Éteint",heating:"Chauffage",cooling:"Climatisation",ventilation:"Ventilation"},schedule:{title:"Plannings",empty:"Aucune planification pour {mode}",on:"Allumé",off:"Éteint",edit:"Modifier les planifications",back:"Retour aux frises",active_mode:"Mode du jour actuel",next_run:"Prochain lancement",days:"Jours"},editor:{name:"Nom",day_mode_entity:"Entité mode jour",thermostat_mode_entity:"Entité mode thermostat",override_duration_entity:"Entité durée de dérogation",early_switch_entity:"Entité anticipation",next_mode_entity:"Entité prochain mode",next_mode_at_entity:"Entité heure du prochain mode",heat_protection_entity:"Entité protection thermique",cover_open_time_entity:"Entité heure d'ouverture des volets",cover_close_time_entity:"Entité heure de fermeture des volets",open_covers_entity:"Bouton d'ouverture des volets",close_covers_entity:"Bouton de fermeture des volets",cover_entity:"Entité volet (ancienne option, prioritaire sur les boutons)",covers_left_open_entity:"Entité volets non fermés",covers_inhibited_entity:"Entité volets en pause",show_schedules:"Panneau des plannings (intégration Scheduler)",schedule_entities:"Panneau des plannings : seulement ces entités (toutes si vide)"},preview:{home:"Maison",work:"Travail",remote:"Télétravail",away:"Absence"}}};function _e(e,t){return t.split(".").reduce((e,t)=>e&&null!=e[t]?e[t]:void 0,e)}function me(e,t,i,s){const o=function(e){const t=e?.locale?.language||e?.language||"en",i=String(t).split("-")[0];return pe[t]?t:pe[i]?i:"en"}(e);let n=_e(pe[o],t)??_e(pe.en,t)??s;return null==n?t:(i&&Object.entries(i).forEach(([e,t])=>n=n.replace(`{${e}}`,t)),n)}const fe=[{key:"day_mode_entity",domains:["select","input_select"],default:"select.homeshift_day_mode"},{key:"thermostat_mode_entity",domains:["select","input_select"],default:"select.homeshift_thermostat_mode"},{key:"override_duration_entity",domains:["number","input_number"],default:"number.homeshift_override_duration"},{key:"early_switch_entity",domains:["number","input_number"],default:"number.homeshift_early_switch"},{key:"next_mode_entity",domains:["sensor"],default:"sensor.homeshift_next_mode"},{key:"next_mode_at_entity",domains:["sensor"],default:"sensor.homeshift_next_mode_at"},{key:"heat_protection_entity",domains:["binary_sensor"],default:"binary_sensor.homeshift_cover_heat_active"},{key:"cover_open_time_entity",domains:["sensor"],default:"sensor.homeshift_cover_open_time"},{key:"cover_close_time_entity",domains:["sensor"],default:"sensor.homeshift_cover_close_time"},{key:"open_covers_entity",domains:["button"],default:"button.homeshift_open_covers"},{key:"close_covers_entity",domains:["button"],default:"button.homeshift_close_covers"},{key:"cover_entity",domains:["cover"],default:""},{key:"covers_left_open_entity",domains:["binary_sensor"],default:"binary_sensor.homeshift_covers_left_open"},{key:"covers_inhibited_entity",domains:["sensor"],default:"sensor.homeshift_covers_inhibited"}];class ve extends ae{setConfig(e){this._config=e}_onNameChanged(e){if(!this._config||!this.hass)return;const t=e.target.value;if(this._config.name===t)return;const i={...this._config,name:t};this._config=i,this._dispatchConfigChanged(i)}_onEntityChanged(e,t){if(!this._config||!this.hass)return;const i=e.detail.value;if(this._config[t]===i)return;const s={...this._config,[t]:i};this._config=s,this._dispatchConfigChanged(s)}_onScheduleChanged(e,t){if(!this._config||!this.hass)return;const i={...this._config,[t]:e.detail.value};this._config=i,this._dispatchConfigChanged(i)}_dispatchConfigChanged(e){const t=new CustomEvent("config-changed",{detail:{config:e},bubbles:!0,composed:!0});this.dispatchEvent(t)}render(){return this.hass&&this._config?q`
      <div class="card-config">
        <ha-textfield
          label="${me(this.hass,"editor.name")}"
          .value=${this._config.name||""}
          @input=${this._onNameChanged}
        ></ha-textfield>

        ${fe.map(e=>q`<ha-entity-picker
            label="${me(this.hass,`editor.${e.key}`)}"
            .hass=${this.hass}
            .value=${this._config[e.key]||""}
            .includeDomains=${e.domains}
            @value-changed=${t=>this._onEntityChanged(t,e.key)}
            allow-custom-entity
          ></ha-entity-picker>`)}

        <ha-selector
          .hass=${this.hass}
          .label=${me(this.hass,"editor.show_schedules")}
          .selector=${{boolean:{}}}
          .value=${!1!==this._config.show_schedules}
          @value-changed=${e=>this._onScheduleChanged(e,"show_schedules")}
        ></ha-selector>
        <ha-selector
          .hass=${this.hass}
          .label=${me(this.hass,"editor.schedule_entities")}
          .selector=${{entity:{multiple:!0}}}
          .value=${this._config.schedule_entities??[]}
          @value-changed=${e=>this._onScheduleChanged(e,"schedule_entities")}
        ></ha-selector>
      </div>
    `:q``}}ve.styles=r`
    .card-config {
      display: flex;
      flex-direction: column;
      gap: 16px;
      padding: 16px 0;
    }

    ha-textfield,
    ha-entity-picker,
    ha-selector {
      width: 100%;
    }
  `,e([he({attribute:!1})],ve.prototype,"hass",void 0),e([ue()],ve.prototype,"_config",void 0),customElements.get("homeshift-card-editor")||customElements.define("homeshift-card-editor",ve);const ge=new Set(["unknown","unavailable",""]);function ye(e){const t="string"==typeof e?e:e?.state;return"string"==typeof t&&!ge.has(t)}function be(e){if(e<60)return`${e} min`;const t=Math.floor(e/60),i=Math.round(e%60);return i>0?`${t}h${String(i).padStart(2,"0")}`:`${t}h`}function $e(e){const t=e?.time_format;return{locale:"system"===t?void 0:e?.language,hour12:"12"===t||"24"!==t&&void 0}}function xe(e,t){const{locale:i,hour12:s}=$e(t);return e.toLocaleTimeString(i,{hour:"2-digit",minute:"2-digit",hour12:s})}const we=1440;function Se(e){const[t,i]=e.split(":").map(Number);return 60*t+(i||0)}function Ee(e){const t=e%we;return`${String(Math.floor(t/60)).padStart(2,"0")}:${String(t%60).padStart(2,"0")}`}const ke=e=>e.service.startsWith("climate.");function Ae(e){return e.timeslots.some(e=>e.actions.some(ke))}function Ce(e){const t=Ae(e),i=e.timeslots.filter(e=>!t||e.actions.some(ke)).map(e=>({slot:e,start:Se(e.start)})).sort((e,t)=>e.start-t.start),s=[];return i.forEach(({slot:e,start:t},o)=>{const n=function(e){const t=e.actions?.find(ke)??e.actions?.[0];if(!t)return{kind:"other",label:""};const[,i]=t.service.split("."),s=t.service_data??{},o=t.entity_id,n=s.hvac_mode;if("off"===n)return{kind:"off",entity:o,hvacMode:n,label:n};if("turn_off"===i)return{kind:"off",entity:o,label:"off"};if("number"==typeof s.temperature)return{kind:"cool"===n?"cool":"heat",entity:o,temperature:s.temperature,label:`${s.temperature}°`};if(null!=s.preset_mode){const e=String(s.preset_mode);return{kind:"preset",entity:o,preset:e,label:e}}return n?{kind:"cool"===n?"cool":"heat",entity:o,hvacMode:n,label:n}:"turn_on"===i?{kind:"on",entity:o,label:"on"}:{kind:"other",entity:o,label:i??t.service}}(e);let r;if(null!=e.stop)r=Se(e.stop),r<=t&&(r+=we);else{const e=i[(o+1)%i.length].start;r=e>t?e:e+we}r>we?(s.push({start:t,end:we,value:n}),r-we>0&&s.push({start:0,end:r-we,value:n})):s.push({start:t,end:r,value:n})}),function(e){const t=[];for(const i of e){const e=t[t.length-1];e&&e.end===i.start&&Te(e.value,i.value)?e.end=i.end:t.push({...i})}return t}(s.filter(e=>e.end>e.start).sort((e,t)=>e.start-t.start))}function Te(e,t){return e.kind===t.kind&&e.temperature===t.temperature&&e.preset===t.preset&&e.hvacMode===t.hvacMode&&e.label===t.label}function Pe(e,t=!1){const i=t&&Ae(e),s=e.timeslots.flatMap(e=>e.actions.filter(e=>!i||ke(e)).map(e=>e.entity_id).filter(e=>!!e));return[...new Set(s)]}const Me={heat:"mdi:radiator",cool:"mdi:snowflake",preset:"mdi:radiator",on:"mdi:toggle-switch-outline",off:"mdi:toggle-switch-off-outline",other:"mdi:calendar-clock"};function Oe(e){return"cool"===e?"cool":"heat"===e||"preset"===e?"heat":void 0}const De=["heat","preset","cool","on","off","other"];function Ie(e){const t=new Set(e.map(e=>e.value.kind));return["cool","heat","preset","on","off"].find(e=>t.has(e))??"other"}class Ne extends ae{constructor(){super(...arguments),this.schedules=[],this.tag="",this.entities=[]}connectedCallback(){super.connectedCallback(),this._clock=setInterval(()=>this.requestUpdate(),6e4)}disconnectedCallback(){super.disconnectedCallback(),clearInterval(this._clock)}render(){if(!this.hass)return F;const e=function(e,t,i){return e.filter(e=>e.tags?.includes(t)).filter(e=>!i.length||Pe(e).some(e=>i.includes(e))).sort((e,t)=>e.name.localeCompare(t.name))}(this.schedules,this.tag,this.entities);if(!e.length)return q`<div class="empty">
        ${me(this.hass,"schedule.empty",{mode:this.tag})}
      </div>`;const t=new Date,i=60*t.getHours()+t.getMinutes();return q`
      ${this._rooms(e).map(e=>this._renderRoom(e,i))}
      <div class="axis" aria-hidden="true">
        ${[0,6,12,18,24].map(e=>q`<span style="left: ${e/24*100}%">${e}h</span>`)}
      </div>
    `}_rooms(e){const t=new Map;for(const i of e){const e=Pe(i,!0),s=1===e.length?e[0]:void 0,o=s??i.entity_id;if(!t.has(o)){const e=s?this.hass.states[s]?.attributes?.friendly_name??s:i.name;t.set(o,{name:e,entity:s,schedules:[]})}t.get(o).schedules.push(i)}for(const e of t.values())e.schedules.sort((e,t)=>De.indexOf(Ie(Ce(e)))-De.indexOf(Ie(Ce(t))));return[...t.values()]}_renderRoom(e,t){const i=e.entity?.startsWith("climate.")?this.hass.states[e.entity]?.attributes?.current_temperature:void 0,s=e.schedules.every(e=>!this._enabled(e));return q`
      <div class="room">
        <div class="room-head">
          <span class="room-name ${s?"disabled":""}">${e.name}</span>
          ${"number"==typeof i?q`<span class="measured">${this._number(i)}°</span>`:F}
        </div>
        ${e.schedules.map(i=>this._renderRow(i,e,t))}
      </div>
    `}_enabled(e){const t=this.hass.states[e.entity_id];return t?"off"!==t.state:e.enabled}_renderRow(e,t,i){const s=Ce(e),o=Ie(s),n=this._enabled(e);return q`
      <div class="row ${n?"":"disabled"}" title=${e.name}>
        <ha-icon class="kind ${o}" icon=${Me[o]}></ha-icon>
        <div class="bar">
          ${s.map(e=>this._renderSegment(e))}
          <div class="now" style="left: ${i/we*100}%"></div>
        </div>
        <button
          class="switch ${n?"on":""}"
          role="switch"
          aria-checked=${n?"true":"false"}
          aria-label=${e.name}
          @click=${()=>this._toggle(e,t,n)}
        ></button>
      </div>
    `}_renderSegment(e){const{background:t,color:i}=function(e){switch(e.kind){case"cool":return{background:"#378ADD",color:"#fff"};case"off":return{background:"var(--divider-color, #5F5E5A)",color:"var(--secondary-text-color)"};case"on":return{background:"#1D9E75",color:"#fff"};case"other":return{background:"#888780",color:"#fff"};case"preset":return function(e){const t=e.toLowerCase();return/frost|hors|away|absen|vacation/.test(t)?{background:"#85B7EB",color:"#042C53"}:/eco|sleep|night|nuit/.test(t)?{background:"#FAC775",color:"#412402"}:/boost/.test(t)?{background:"#A32D2D",color:"#fff"}:/comfort|confort|home|activity/.test(t)?{background:"#EF9F27",color:"#412402"}:{background:"#B4B2A9",color:"#2C2C2A"}}(e.preset??"")}const t=e.temperature??19;return t<15?{background:"#85B7EB",color:"#042C53"}:t<17.5?{background:"#FAC775",color:"#412402"}:t<19.5?{background:"#EF9F27",color:"#412402"}:t<21?{background:"#D85A30",color:"#fff"}:{background:"#A32D2D",color:"#fff"}}(e.value),s=(e.end-e.start)/we*100,o=`${Ee(e.start)} – ${Ee(e.end)}`,n=this._label(e.value),r=s>=Math.max(10,2.2*n.length);return q`<div
      class="segment"
      style="left: ${e.start/we*100}%; width: ${s}%; background-color: ${t}; color: ${i}"
      title="${o} · ${n}"
    >
      ${r?n:F}
    </div>`}_number(e){const t=this.hass.locale?.language??this.hass.language??"en";return e.toLocaleString(t,{maximumFractionDigits:1})}_label(e){const t=e.entity?this.hass.states[e.entity]:void 0;return null!=e.temperature?`${this._number(e.temperature)}°`:null!=e.preset?t&&this.hass.formatEntityAttributeValue?this.hass.formatEntityAttributeValue(t,"preset_mode",e.preset):e.preset:null!=e.hvacMode?t&&this.hass.formatEntityState?this.hass.formatEntityState(t,e.hvacMode):e.hvacMode:"on"===e.kind||"off"===e.kind?me(this.hass,`schedule.${e.kind}`):e.label}async _toggle(e,t,i){if(i)return void await this.hass.callService("switch","turn_off",{entity_id:e.entity_id});const s=Oe(Ie(Ce(e))),o=s?t.schedules.filter(t=>{const i=Oe(Ie(Ce(t)));return t!==e&&i&&i!==s&&this._enabled(t)}):[];o.length&&await this.hass.callService("switch","turn_off",{entity_id:o.map(e=>e.entity_id)}),await this.hass.callService("switch","turn_on",{entity_id:e.entity_id})}}Ne.styles=r`
    :host {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    .room {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    .room-head {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 13px;
    }
    .room-name {
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-weight: 500;
    }
    .room-name.disabled {
      color: var(--secondary-text-color);
    }
    .row {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .row .bar {
      flex: 1;
    }
    /* A disabled schedule keeps its colors, hatched, so it stays readable. */
    .row.disabled .segment {
      background-image: repeating-linear-gradient(
        135deg,
        rgba(0, 0, 0, 0.3) 0 4px,
        transparent 4px 8px
      );
    }
    .kind {
      flex: none;
      --mdc-icon-size: 18px;
      color: var(--secondary-text-color);
    }
    .kind.heat,
    .kind.preset {
      color: #ef9f27;
    }
    .kind.cool {
      color: #378add;
    }
    .measured {
      flex: none;
      padding: 1px 8px;
      border-radius: 10px;
      background: color-mix(in srgb, var(--primary-text-color) 10%, transparent);
      font-size: 12px;
    }
    .switch {
      position: relative;
      flex: none;
      width: 34px;
      height: 18px;
      border: none;
      border-radius: 9px;
      background: var(--disabled-color, #888);
      cursor: pointer;
      padding: 0;
    }
    .switch::after {
      content: "";
      position: absolute;
      top: 3px;
      left: 3px;
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background: #fff;
      transition: left 0.15s;
    }
    .switch.on {
      background: var(--switch-checked-track-color, var(--primary-color));
    }
    .switch.on::after {
      left: 19px;
    }
    .switch:focus-visible {
      outline: 2px solid var(--primary-color);
      outline-offset: 2px;
    }
    .bar {
      position: relative;
      height: 20px;
      border-radius: 6px;
      background: color-mix(in srgb, var(--primary-text-color) 6%, transparent);
      overflow: hidden;
    }
    .segment {
      position: absolute;
      top: 0;
      bottom: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 11px;
      font-weight: 600;
      overflow: hidden;
      white-space: nowrap;
      box-shadow: inset -1px 0 0 var(--ha-card-background, var(--card-background-color));
    }
    .now {
      position: absolute;
      top: 0;
      bottom: 0;
      width: 2px;
      margin-left: -1px;
      background: var(--primary-text-color);
    }
    .axis {
      position: relative;
      height: 14px;
      /* Under the bars only: past the kind icon (18 + 8 px) and before the switch (34 + 8 px). */
      margin: -4px 42px 0 26px;
      font-size: 11px;
      color: var(--secondary-text-color);
    }
    .axis span {
      position: absolute;
      transform: translateX(-50%);
    }
    .axis span:first-child {
      transform: none;
    }
    .axis span:last-child {
      transform: translateX(-100%);
    }
    .empty {
      padding: 16px 0;
      text-align: center;
      font-size: 13px;
      color: var(--secondary-text-color);
    }
  `,e([he({attribute:!1})],Ne.prototype,"hass",void 0),e([he({attribute:!1})],Ne.prototype,"schedules",void 0),e([he()],Ne.prototype,"tag",void 0),e([he({attribute:!1})],Ne.prototype,"entities",void 0),customElements.get("homeshift-schedule-timeline")||customElements.define("homeshift-schedule-timeline",Ne);class Re extends ae{constructor(){super(...arguments),this.schedules=[],this.modes=[],this.activeMode="",this.entities=[],this._editing=!1,this._cardsVersion=0,this._cards=new Map,this._building=new Set}willUpdate(e){e.has("activeMode")&&this.modes.includes(this.activeMode)?this._selected=this.activeMode:this._selected&&this.modes.includes(this._selected)||(this._selected=this.modes[0]),e.has("entities")&&void 0!==e.get("entities")&&(this._cards=new Map,this._building.clear())}updated(){const e=this._selected?this._cards.get(this._selected):void 0;e&&e.hass!==this.hass&&(e.hass=this.hass)}_schedulerConfig(e){return{type:"custom:scheduler-card",title:!1,discover_existing:!1,show_header_toggle:!1,time_step:5,sort_by:["title"],display_options:{primary_info:["{name}"],secondary_info:[`<b>${me(this.hass,"schedule.next_run")}</b> {relative-time}`,`<b>${me(this.hass,"schedule.days")}</b> {days}`,"additional-tasks"],icon:"entity"},tags:[e],...this.entities.length?{include:this.entities}:{}}}_card(e){const t=this._cards.get(e);if(t)return t;this._building.has(e)||(this._building.add(e),this._buildCard(e).finally(()=>this._building.delete(e)))}async _buildCard(e){const t=this._schedulerConfig(e),i=this._cards;this._helpers??(this._helpers=window.loadCardHelpers?.()??Promise.resolve(void 0));const s=await this._helpers;let o;s?o=s.createCardElement(t):(await customElements.whenDefined("scheduler-card"),o=document.createElement("scheduler-card"),o.setConfig(t)),i===this._cards&&(o.addEventListener("ll-rebuild",t=>{t.stopPropagation(),this._cards.delete(e),this._cardsVersion++}),o.hass=this.hass,this._cards.set(e,o),this._cardsVersion++)}_select(e){this._selected=e}_onTabKeydown(e){const t={ArrowRight:1,ArrowLeft:-1}[e.key];if(!t)return;const i=this.modes.indexOf(this._selected??""),s=this.modes[(i+t+this.modes.length)%this.modes.length];this._select(s),e.preventDefault(),this.updateComplete.then(()=>this.shadowRoot?.querySelector('[aria-selected="true"]')?.focus())}render(){if(!this.hass||!this._selected)return F;const e=this._selected,t=me(this.hass,this._editing?"schedule.back":"schedule.edit");return q`
      <div class="header">
        <div class="tabs" role="tablist" @keydown=${this._onTabKeydown}>
          ${this.modes.map(t=>{const i=t===e;return q`<button
              class="tab ${i?"selected":""}"
              role="tab"
              aria-selected=${i?"true":"false"}
              tabindex=${i?0:-1}
              @click=${()=>this._select(t)}
            >
              <span class="label">${t}</span>
              ${t===this.activeMode?q`<span
                    class="active-dot"
                    title=${me(this.hass,"schedule.active_mode")}
                    aria-label=${me(this.hass,"schedule.active_mode")}
                  ></span>`:F}
            </button>`})}
        </div>
        <button
          class="edit"
          title=${t}
          aria-label=${t}
          aria-pressed=${this._editing?"true":"false"}
          @click=${()=>this._editing=!this._editing}
        >
          <ha-icon
            icon=${this._editing?"mdi:chart-timeline":"mdi:pencil"}
          ></ha-icon>
        </button>
      </div>
      <div class="content" role="tabpanel">
        ${this._editing?this._card(e)??F:q`<homeshift-schedule-timeline
              .hass=${this.hass}
              .schedules=${this.schedules}
              .tag=${e}
              .entities=${this.entities}
            ></homeshift-schedule-timeline>`}
      </div>
    `}}Re.styles=r`
    :host {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    .header {
      display: flex;
      align-items: center;
      gap: 6px;
    }
    /* Segmented control: one button per mode, the shown one filled. */
    .tabs {
      flex: 1;
      min-width: 0;
      display: flex;
      gap: 2px;
      padding: 3px;
      border-radius: 10px;
      background: color-mix(in srgb, var(--primary-text-color) 7%, transparent);
      overflow-x: auto;
      scrollbar-width: none;
    }
    .tab {
      flex: 1 0 auto;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 5px;
      padding: 5px 8px;
      border: none;
      border-radius: 8px;
      background: none;
      cursor: pointer;
      font: inherit;
      font-size: 13px;
      font-weight: 500;
      color: var(--secondary-text-color);
    }
    .tab:hover:not(.selected) {
      background: color-mix(in srgb, var(--primary-text-color) 6%, transparent);
    }
    .tab:focus-visible,
    .edit:focus-visible {
      outline: 2px solid var(--primary-color);
      outline-offset: 1px;
    }
    .tab.selected {
      background: var(--primary-color);
      color: var(--text-primary-color, #fff);
    }
    .active-dot {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: var(--state-active-color, var(--success-color, #43a047));
      flex: none;
    }
    .edit {
      flex: none;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 34px;
      height: 34px;
      padding: 0;
      border: none;
      border-radius: 10px;
      background: color-mix(in srgb, var(--primary-text-color) 7%, transparent);
      color: var(--primary-color);
      cursor: pointer;
      --mdc-icon-size: 18px;
    }
    .edit:hover {
      background: color-mix(in srgb, var(--primary-text-color) 12%, transparent);
    }
    .edit[aria-pressed="true"] {
      background: var(--primary-color);
      color: var(--text-primary-color, #fff);
    }
    /* The scheduler card blends into the panel. */
    .content {
      --ha-card-border-width: 0;
      --ha-card-box-shadow: none;
      --ha-card-background: transparent;
    }
  `,e([he({attribute:!1})],Re.prototype,"hass",void 0),e([he({attribute:!1})],Re.prototype,"schedules",void 0),e([he({attribute:!1})],Re.prototype,"modes",void 0),e([he()],Re.prototype,"activeMode",void 0),e([he({attribute:!1})],Re.prototype,"entities",void 0),e([ue()],Re.prototype,"_selected",void 0),e([ue()],Re.prototype,"_editing",void 0),e([ue()],Re.prototype,"_cardsVersion",void 0),customElements.get("homeshift-schedule-panel")||customElements.define("homeshift-schedule-panel",Re);class He extends ae{constructor(){super(...arguments),this.preview=!1,this._openSetting=null,this._inhibitIndex=He.INHIBIT_DEFAULT_INDEX,this._coversExpanded=!1,this._day=0,this._schedulesOpen=!1}connectedCallback(){super.connectedCallback(),this._scheduleMidnightRefresh()}disconnectedCallback(){super.disconnectedCallback(),clearTimeout(this._midnightTimer),clearTimeout(this._settingTimeout)}_scheduleMidnightRefresh(){clearTimeout(this._midnightTimer);const e=new Date,t=new Date(e);t.setHours(24,0,1,0),this._midnightTimer=setTimeout(()=>{this._day++,this._scheduleMidnightRefresh()},t.getTime()-e.getTime())}static getStubConfig(){return{name:"Thermostat",day_mode_entity:"select.homeshift_day_mode",thermostat_mode_entity:"select.homeshift_thermostat_mode",override_duration_entity:"number.homeshift_override_duration",early_switch_entity:"number.homeshift_early_switch",next_mode_entity:"sensor.homeshift_next_mode",next_mode_at_entity:"sensor.homeshift_next_mode_at",heat_protection_entity:"binary_sensor.homeshift_cover_heat_active",cover_open_time_entity:"sensor.homeshift_cover_open_time",cover_close_time_entity:"sensor.homeshift_cover_close_time",covers_left_open_entity:"binary_sensor.homeshift_covers_left_open",covers_inhibited_entity:"sensor.homeshift_covers_inhibited"}}static getConfigElement(){return document.createElement("homeshift-card-editor")}setConfig(e){if(!e)throw new Error("Missing configuration");const t={name:e.name??"Thermostat"};for(const i of fe)t[i.key]=e[i.key]??i.default;t.show_schedules=!1!==e.show_schedules,t.schedule_entities=Array.isArray(e.schedule_entities)?e.schedule_entities:[],this._config=t}getCardSize(){return 4}shouldUpdate(e){if(e.has("hass")&&this._refreshSchedules(),e.has("_config")||e.has("preview"))return!0;if(e.has("_day")||e.has("_openSetting")||e.has("_inhibitIndex")||e.has("_coversExpanded")||e.has("_coverPending")||e.has("_schedules")||e.has("_schedulesOpen"))return!0;if(e.has("hass")){const t=e.get("hass");if(!t)return!0;if(this._schedulesOpen)return!0;return fe.map(e=>this._config?.[e.key]).filter(Boolean).some(e=>t.states[e]!==this.hass.states[e])}return!1}_presetClass(e,t){const i=e=>e.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g,"").replace(/[^a-z0-9]+/g,"-");if(["off","heating","cooling","ventilation"].includes(i(e)))return i(e);return{eteint:"off",arret:"off",off:"off",chauffage:"heating",heat:"heating",heating:"heating",climatisation:"cooling",clim:"cooling",cool:"cooling",cooling:"cooling",ventilation:"ventilation",ventilateur:"ventilation",fan:"ventilation"}[i(t)]??i(e)}getEntityState(e){if(e)return this.hass?.states?.[e]}getCoversLeftOpen(){const e=this.getEntityState(this._config?.covers_left_open_entity)?.attributes?.covers;return Array.isArray(e)?e.map(e=>this.hass?.states?.[e]?.attributes?.friendly_name??e):[]}_friendlyName(e){return this.hass?.states?.[e]?.attributes?.friendly_name??e}getCoverInhibitions(){const e=this.getEntityState(this._config?.covers_inhibited_entity)?.attributes??{},t=Array.isArray(e.managed_covers)?e.managed_covers:[],i=new Map,s=Date.now();for(const[t,o]of Object.entries(e.covers??{}))"string"==typeof o&&new Date(o).getTime()<=s||i.set(t,"string"==typeof o?o:null);return{managed:t,inhibited:i}}async _callInhibitService(e,t){this._armSettingTimeout();try{await this.hass.callService("homeshift",e,t)}catch(e){this.dispatchEvent(new CustomEvent("hass-notification",{detail:{message:me(this.hass,"card.inhibit_failed",{error:e?.message??String(e)})},bubbles:!0,composed:!0}))}}_inhibitCover(e){const t=He.INHIBIT_PRESETS[this._inhibitIndex];this._callInhibitService("inhibit_covers",{entity_id:[e],...t?{duration:{minutes:t}}:{}})}_resumeCovers(e){this._callInhibitService("resume_covers",e?{entity_id:e}:{})}_stepInhibit(e){const t=He.INHIBIT_PRESETS.length-1;this._inhibitIndex=Math.min(t,Math.max(0,this._inhibitIndex+e)),this._armSettingTimeout()}_inhibitLabel(e){return e?e<1440?be(e):`${e/1440} ${me(this.hass,"card.days_short")}`:me(this.hass,"card.inhibit_forever")}_inhibitEnd(e){return e?me(this.hass,"card.inhibited_until",{time:this._formatAbsoluteTime(e)}):me(this.hass,"card.inhibited_forever")}_renderCoverInhibition({managed:e,inhibited:t}){const i="covers"===this._openSetting,s=He.INHIBIT_PRESETS,o=s[this._inhibitIndex],n=me(this.hass,"card.inhibit_label"),r=o?me(this.hass,"card.inhibit_effect",{duration:this._inhibitLabel(o),time:this._formatAbsoluteTime(new Date(Date.now()+6e4*o).toISOString())}):me(this.hass,"card.inhibit_effect_forever");return q`<div class="setting ${i?"open":""}">
      <button
        class="setting-head"
        aria-expanded=${i?"true":"false"}
        @click=${()=>this._toggleSetting("covers")}
      >
        <ha-icon icon="mdi:window-shutter-cog"></ha-icon>
        <span class="setting-label">${n}</span>
        <span class="setting-value ${t.size?"set":""}"
          >${t.size?me(this.hass,"card.inhibited_count",{count:String(t.size)}):me(this.hass,"card.inhibit_none")}</span
        >
        <ha-icon class="chevron" icon="mdi:chevron-down"></ha-icon>
      </button>
      ${i?q`<div class="setting-body">
            <div class="stepper">
              <button
                aria-label=${me(this.hass,"card.decrease",{setting:n})}
                ?disabled=${this._inhibitIndex<=0}
                @click=${()=>this._stepInhibit(-1)}
              >
                −
              </button>
              <span class="stepper-value" aria-live="polite"
                >${this._inhibitLabel(o)}</span
              >
              <button
                aria-label=${me(this.hass,"card.increase",{setting:n})}
                ?disabled=${this._inhibitIndex>=s.length-1}
                @click=${()=>this._stepInhibit(1)}
              >
                +
              </button>
            </div>
            <p class="setting-effect">${r}</p>
            <ul class="cover-list">
              ${e.map(e=>{const i=t.has(e),s=this._friendlyName(e),o=me(this.hass,i?"card.resume":"card.pause");return q`<li class="cover-item ${i?"paused":""}">
                  <span class="cover-name">
                    ${s}
                    <span class="cover-status"
                      >${i?this._inhibitEnd(t.get(e)??null):me(this.hass,"card.inhibit_none")}</span
                    >
                  </span>
                  <button
                    type="button"
                    class="cover-toggle"
                    aria-label="${o} — ${s}"
                    @click=${()=>i?this._resumeCovers([e]):this._inhibitCover(e)}
                  >
                    <ha-icon icon=${i?"mdi:play":"mdi:pause"}></ha-icon>
                    ${o}
                  </button>
                </li>`})}
            </ul>
            ${t.size>1?q`<button
                  type="button"
                  class="resume-all"
                  @click=${()=>this._resumeCovers()}
                >
                  ${me(this.hass,"card.resume_all")}
                </button>`:F}
          </div>`:F}
    </div>`}_refreshSchedules(){if(!this._config?.show_schedules||this.preview||!this.hass?.callWS)return;const e=Object.values(this.hass.states??{}).filter(e=>e.entity_id.startsWith("switch.schedule")).map(e=>`${e.entity_id}:${e.last_updated}`).join("|");e!==this._schedulesKey&&(this._schedulesKey=e,this.hass.callWS({type:"scheduler"}).then(e=>{this._schedules=Array.isArray(e)?e:void 0}).catch(()=>{this._schedules=void 0}))}_hasDaySchedules(e){return(this._schedules??[]).some(t=>t.tags?.some(t=>e.includes(t)))}_toggleSchedules(e){this._schedulesOpen=e,this.updateComplete.then(()=>this.shadowRoot?.querySelector(e?".schedules-close":".schedules-open")?.focus())}_renderSchedules(e,t){const i=me(this.hass,"schedule.title"),s=t=>q`<button
      type="button"
      class="schedules-bar ${t?"schedules-close":"schedules-open"}"
      aria-expanded=${t?"true":"false"}
      aria-controls="schedules-panel"
      @click=${()=>this._toggleSchedules(!t)}
    >
      <ha-icon icon="mdi:calendar-clock"></ha-icon>
      <span class="schedules-title">${i}</span>
      <span class="schedules-mode">${e}</span>
      <ha-icon
        class="chevron"
        icon=${t?"mdi:chevron-down":"mdi:chevron-up"}
      ></ha-icon>
    </button>`;return q`${s(!1)}
      ${this._schedulesOpen?q`<div
            id="schedules-panel"
            class="schedules-panel"
            role="region"
            aria-label=${i}
            @keydown=${e=>{"Escape"===e.key&&(e.stopPropagation(),this._toggleSchedules(!1))}}
          >
            ${s(!0)}
            <div class="schedules-body">
              <homeshift-schedule-panel
                .hass=${this.hass}
                .schedules=${this._schedules??[]}
                .modes=${t}
                .activeMode=${e}
                .entities=${this._config.schedule_entities??[]}
              ></homeshift-schedule-panel>
            </div>
          </div>`:F}`}onSelect(e,t){const i=t.target,s=i?.value;s&&this.hass.callService("select","select_option",{entity_id:e,option:s})}onThermostatSelect(e,t){this.hass.callService("select","select_option",{entity_id:e,option:t})}_coverCall(e){const t=this._config.cover_entity;if(t)return ye(this.getEntityState(t))?{domain:"cover",service:`${e}_cover`,entity_id:t}:void 0;const i="open"===e?this._config.open_covers_entity:this._config.close_covers_entity,s=this.getEntityState(i);return s&&"unavailable"!==s.state?{domain:"button",service:"press",entity_id:i}:void 0}async onCoverAction(e){const t=this._coverCall(e);if(t&&!this._coverPending){this._coverPending=e;try{await Promise.all([this.hass.callService(t.domain,t.service,{entity_id:t.entity_id}),new Promise(e=>setTimeout(e,He.COVER_FEEDBACK_MS))])}catch(t){this.dispatchEvent(new CustomEvent("hass-notification",{detail:{message:me(this.hass,`card.cover_${e}_failed`,{error:t?.message??String(t)})},bubbles:!0,composed:!0}))}finally{this._coverPending=void 0}}}_renderCoverTime(e,t){const i="open"===e?"mdi:roller-shade":"mdi:roller-shade-closed";if(!this._coverCall(e))return q`<span
        class="cover-time"
        title=${me(this.hass,`card.cover_${e}_time`)}
      >
        <ha-icon icon=${i}></ha-icon>${t}
      </span>`;const s=this._coverPending===e,o=me(this.hass,`card.cover_${e}_action`,{time:t});return q`<button
      type="button"
      class="cover-time actionable ${s?"pending":""}"
      title=${o}
      aria-label=${o}
      aria-busy=${s?"true":"false"}
      ?disabled=${void 0!==this._coverPending}
      @click=${()=>this.onCoverAction(e)}
    >
      <ha-icon icon=${i}></ha-icon>${s?me(this.hass,"card.cover_sending"):t}
    </button>`}_formatAbsoluteTime(e){if(!e)return"";const t=new Date(e);if(isNaN(t.getTime()))return"";const i=new Date,s=new Date(i);s.setDate(s.getDate()+1);const o=xe(t,this.hass?.locale);return t.toDateString()===i.toDateString()?`${me(this.hass,"card.today")} ${o}`:t.toDateString()===s.toDateString()?`${me(this.hass,"card.tomorrow")} ${o}`:`${function(e,t){const{locale:i}=$e(t);return e.toLocaleDateString(i,{month:"short",day:"numeric"})}(t,this.hass?.locale)} ${o}`}_settingLabel(e){return void 0===e?me(this.hass,"card.unavailable"):e?be(e):me(this.hass,"card.duration_off")}_clockIn(e){return xe(new Date(Date.now()+6e4*e),this.hass?.locale)}_clockAt(e,t=0){return xe(new Date(new Date(e).getTime()+6e4*t),this.hass?.locale)}_toggleSetting(e){this._openSetting=this._openSetting===e?null:e,this._armSettingTimeout()}_armSettingTimeout(){if(clearTimeout(this._settingTimeout),!this._openSetting)return;const e="covers"===this._openSetting?2e4:6e3;this._settingTimeout=setTimeout(()=>{this._openSetting=null},e)}_stepSetting(e,t,i,s){const o="override"===e?this._config.override_duration_entity:this._config.early_switch_entity;if(!o)return;const n=s>0?t.find(e=>e>i):[...t].reverse().find(e=>e<i);void 0!==n&&(this._armSettingTimeout(),this.hass.callService("number","set_value",{entity_id:o,value:n}))}_renderSetting(e,t,i,s,o,n){const r=void 0!==n&&this._openSetting===e;return q`<div class="setting ${r?"open":""}">
      <button
        class="setting-head"
        aria-expanded=${r?"true":"false"}
        ?disabled=${void 0===n}
        @click=${()=>this._toggleSetting(e)}
      >
        <ha-icon icon="${t}"></ha-icon>
        <span class="setting-label">${i}</span>
        <span class="setting-value ${n?"set":""}"
          >${this._settingLabel(n)}</span
        >
        <ha-icon class="chevron" icon="mdi:chevron-down"></ha-icon>
      </button>
      ${r?q`<div class="setting-body">
            <div class="stepper">
              <button
                aria-label=${me(this.hass,"card.decrease",{setting:i})}
                ?disabled=${n<=o[0]}
                @click=${()=>this._stepSetting(e,o,n,-1)}
              >
                −
              </button>
              <span class="stepper-value" aria-live="polite"
                >${this._settingLabel(n)}</span
              >
              <button
                aria-label=${me(this.hass,"card.increase",{setting:i})}
                ?disabled=${n>=o[o.length-1]}
                @click=${()=>this._stepSetting(e,o,n,1)}
              >
                +
              </button>
            </div>
            <p class="setting-effect">${s}</p>
          </div>`:F}
    </div>`}_minutes(e){if(!e)return null;const t=this.getEntityState(e);return t?function(e){if(!ye(e))return;const t=Number(e.state);return Number.isFinite(t)?t:void 0}(t):this.preview?0:null}_renderMain(e,t,i,s,o,n,r){const a=t.attributes?.option_map??{},c=Object.keys(a).length>0?Object.entries(a):(t.attributes?.options??[]).map(e=>[e,e]),l=e.attributes?.option_map??{},d=Object.keys(l).length>0?Object.entries(l):(e.attributes?.options??[]).map(e=>[e,e]),h=this.getEntityState(this._config.next_mode_entity),u=this.getEntityState(this._config.next_mode_at_entity),p=this._minutes(this._config.early_switch_entity),_=this._minutes(this._config.override_duration_entity),m=ye(h),f=m?h.state:"",v=ye(u)?this._formatAbsoluteTime(u.state):"",g=""!==v,y=_?me(this.hass,"card.override_effect",{duration:this._settingLabel(_),time:this._clockIn(_)}):me(this.hass,"card.override_none"),b=g?p?me(this.hass,"card.early_effect",{mode:f,time:this._clockAt(u.state),scheduled:this._clockAt(u.state,p)}):me(this.hass,"card.early_none",{mode:f,time:this._clockAt(u.state)}):me(this.hass,"card.early_no_event"),$=ye(n),x=ye(r),w=me(this.hass,"card.covers_left_open",{covers:s.join(", ")}),S=s.length>3,E=S?me(this.hass,"card.covers_left_open_count",{count:String(s.length)}):w,k=[...o.inhibited.keys()].map(e=>this._friendlyName(e)),A=k.length>2?me(this.hass,"card.covers_paused_count",{count:String(k.length)}):me(this.hass,"card.covers_paused",{covers:k.join(", ")}),C=[...o.inhibited.entries()].map(([e,t])=>`${this._friendlyName(e)} — ${this._inhibitEnd(t)}`).join("\n"),T=e.attributes?.current_key,P=ye(e);return q`
      <div class="rows">
        <div
          class="presets"
          role="group"
          aria-label=${me(this.hass,"card.thermostat_mode")}
        >
          ${d.map(([t,i])=>{const s=P&&(T?t===T:i===e.state);return q`<button
              class="preset preset--${this._presetClass(t,i)} ${s?"on":""}"
              aria-pressed=${s?"true":"false"}
              ?disabled=${!P}
              @click=${()=>this.onThermostatSelect(e.entity_id,i)}
            >
              ${me(this.hass,`thermostat.${t}`,void 0,i)}
            </button>`})}
        </div>

        <div class="row">
          <span class="row-key">${me(this.hass,"card.day_mode")}</span>
          <select
            aria-label=${me(this.hass,"card.day_mode")}
            .value=${t.state}
            ?disabled=${!ye(t)}
            @change=${e=>this.onSelect(t.entity_id,e)}
          >
            ${c.map(([e,i])=>q`<option
                value="${i}"
                ?selected=${i===t.state}
              >
                ${i}
              </option>`)}
          </select>
        </div>

        ${m||g?q`<div class="row next-row">
              <span class="row-key">${me(this.hass,"card.next")}</span>
              <span
                >${f}${m&&g?" · ":""}${v}</span
              >
            </div>`:F}

        ${null!==_?this._renderSetting("override","mdi:hand-back-left",me(this.hass,"card.override_label"),y,He.OVERRIDE_PRESETS,_):F}
        ${null!==p?this._renderSetting("early","mdi:clock-fast",me(this.hass,"card.early_label"),b,He.EARLY_SWITCH_PRESETS,p):F}

        ${$||x?q`<div class="row">
              <span class="row-key">${me(this.hass,"card.covers")}</span>
              <span class="cover-times">
                ${$?this._renderCoverTime("open",n):F}
                ${x?this._renderCoverTime("close",r):F}
              </span>
            </div>`:F}

        ${o.managed.length>0?this._renderCoverInhibition(o):F}

        ${i||s.length>0||k.length>0?q`<div class="alerts">
              ${i?q`<span class="chip chip--heat">
                    <ha-icon icon="mdi:window-shutter"></ha-icon>
                    ${me(this.hass,"card.heat_protection_active")}
                  </span>`:F}
              ${s.length>0&&!S?q`<span class="chip chip--covers">
                    <ha-icon icon="mdi:window-shutter-alert"></ha-icon>
                    ${E}
                  </span>`:F}
              ${S?q`<button
                    type="button"
                    class="chip chip--covers"
                    title=${w}
                    aria-label=${w}
                    aria-expanded=${this._coversExpanded?"true":"false"}
                    @click=${()=>this._coversExpanded=!this._coversExpanded}
                  >
                    <ha-icon icon="mdi:window-shutter-alert"></ha-icon>
                    ${E}
                  </button>`:F}
              ${k.length>0?q`<button
                    type="button"
                    class="chip chip--paused"
                    title=${C}
                    @click=${()=>{this._openSetting="covers",this._armSettingTimeout()}}
                  >
                    <ha-icon icon="mdi:window-shutter-cog"></ha-icon>
                    ${A}
                  </button>`:F}
            </div>
            ${S&&this._coversExpanded?q`<p class="covers-detail">${w}</p>`:F}`:F}
      </div>
    `}render(){if(!this.hass||!this._config)return F;const e=this.getEntityState(this._config.day_mode_entity),t=this.getEntityState(this._config.thermostat_mode_entity);if(!this.preview){const i=[[this._config.day_mode_entity,e],[this._config.thermostat_mode_entity,t]].filter(([,e])=>!e).map(([e])=>e||"?");if(i.length>0)return q`
          <ha-card>
            ${i.map(e=>q`<div class="error">
                  ${me(this.hass,"card.entity_not_found",{entity:e})}
                </div>`)}
          </ha-card>
        `}const i=e??{entity_id:this._config.day_mode_entity,state:me(this.hass,"preview.work"),attributes:{option_map:Object.fromEntries(["home","work","remote","away"].map(e=>[e,me(this.hass,`preview.${e}`)]))}},s=t??{entity_id:this._config.thermostat_mode_entity,state:me(this.hass,"thermostat.heating"),attributes:{option_map:Object.fromEntries(["off","heating","cooling","ventilation"].map(e=>[e,me(this.hass,`thermostat.${e}`)])),current_key:"heating"}},o="on"===this.getEntityState(this._config.heat_protection_entity)?.state,n=this.getEntityState(this._config.cover_open_time_entity)?.state,r=this.getEntityState(this._config.cover_close_time_entity)?.state,a=i.attributes?.options??[],c=ye(i)&&this._hasDaySchedules(a);return q`
      <ha-card>
        <div class="container" ?inert=${c&&this._schedulesOpen}>
          ${this._renderMain(s,i,o,this.getCoversLeftOpen(),this.getCoverInhibitions(),n,r)}
        </div>
        ${c?this._renderSchedules(i.state,a):F}
      </ha-card>
    `}}He.COVER_FEEDBACK_MS=600,He.OVERRIDE_PRESETS=[0,15,30,60,120,240,480,720],He.EARLY_SWITCH_PRESETS=[0,15,30,45,60,90,120,180,240],He.INHIBIT_PRESETS=[240,1440,2880,4320,10080,0],He.INHIBIT_DEFAULT_INDEX=1,He.styles=r`
    ha-card {
      padding: 12px;
      position: relative;
      /* Clips the schedules panel while it slides up. */
      overflow: hidden;
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
      /* Same gap above the first divider as the card's padding above. */
      margin-bottom: 12px;
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

    /* A paused cover is a choice, not a fault: calm colour, no animation. */
    .chip--paused {
      border: 0;
      font-family: inherit;
      background: var(--secondary-background-color, rgba(127, 127, 127, 0.12));
      color: var(--primary-text-color);
      cursor: pointer;
    }

    .chip--paused ha-icon {
      color: var(--secondary-text-color, #666);
    }

    .cover-list {
      list-style: none;
      margin: 8px 0 0;
      padding: 0;
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .cover-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      font-size: 13px;
    }

    .cover-name {
      display: flex;
      flex-direction: column;
      min-width: 0;
    }

    .cover-status {
      font-size: 12px;
      color: var(--secondary-text-color, #666);
    }

    .cover-item.paused .cover-status {
      color: var(--primary-color);
    }

    .cover-toggle,
    .resume-all {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      flex-shrink: 0;
      padding: 4px 10px;
      border-radius: 8px;
      border: 1px solid var(--divider-color, #ccc);
      background: var(--card-background-color);
      color: var(--primary-text-color);
      font-size: 13px;
      font-family: inherit;
      cursor: pointer;
    }

    .cover-toggle ha-icon {
      --mdc-icon-size: 16px;
    }

    .cover-toggle:hover,
    .resume-all:hover {
      border-color: var(--primary-color);
    }

    .cover-item.paused .cover-toggle {
      border-color: var(--primary-color);
      color: var(--primary-color);
    }

    .resume-all {
      align-self: flex-start;
      margin-top: 8px;
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

    /* Schedules: a bar at the foot of the card, and the panel it slides up. */
    .schedules-bar {
      display: flex;
      align-items: center;
      gap: 8px;
      width: calc(100% + 24px);
      margin: 10px -12px -12px;
      padding: 10px 12px;
      border: 0;
      border-top: 1px solid var(--divider-color, #e0e0e0);
      background: transparent;
      color: var(--secondary-text-color, #666);
      font-family: inherit;
      font-size: 12px;
      font-weight: 500;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      text-align: left;
      cursor: pointer;
    }

    .schedules-bar:hover {
      background: var(--secondary-background-color, rgba(127, 127, 127, 0.08));
    }

    .schedules-bar:focus-visible {
      outline: 2px solid var(--primary-color);
      outline-offset: -2px;
    }

    .schedules-bar ha-icon {
      --mdc-icon-size: 18px;
      flex-shrink: 0;
    }

    .schedules-title {
      flex: 1;
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .schedules-mode {
      color: var(--primary-text-color);
      text-transform: none;
      letter-spacing: normal;
    }

    /* Anchored to the foot of the card and as tall as its content: the top
       of the card stays in sight while the schedules are shorter than it;
       longer ones scroll inside the panel. */
    .schedules-panel {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      max-height: 100%;
      z-index: 1;
      border-top: 1px solid var(--divider-color, #e0e0e0);
      box-shadow: 0 -4px 12px rgba(0, 0, 0, 0.25);
      display: flex;
      flex-direction: column;
      background: var(--ha-card-background, var(--card-background-color, #fff));
      animation: schedules-slide-up 0.2s ease;
    }

    .schedules-panel .schedules-bar {
      width: 100%;
      margin: 0;
      border-top: 0;
      border-bottom: 1px solid var(--divider-color, #e0e0e0);
    }

    .schedules-body {
      flex: 1 1 auto;
      min-height: 0;
      overflow-y: auto;
      overscroll-behavior: contain;
      padding: 10px 12px 12px;
    }

    @keyframes schedules-slide-up {
      from {
        transform: translateY(100%);
      }
      to {
        transform: translateY(0);
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .schedules-panel {
        animation: none;
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
  `,e([he({attribute:!1})],He.prototype,"hass",void 0),e([he({type:Boolean})],He.prototype,"preview",void 0),e([ue()],He.prototype,"_config",void 0),e([ue()],He.prototype,"_openSetting",void 0),e([ue()],He.prototype,"_inhibitIndex",void 0),e([ue()],He.prototype,"_coverPending",void 0),e([ue()],He.prototype,"_coversExpanded",void 0),e([ue()],He.prototype,"_day",void 0),e([ue()],He.prototype,"_schedules",void 0),e([ue()],He.prototype,"_schedulesOpen",void 0),customElements.get("homeshift-card")||customElements.define("homeshift-card",He),window.customCards=window.customCards||[],window.customCards.push({type:"homeshift-card",name:"HomeShift Card",description:"Card to manage day mode and thermostat mode via the HomeShift integration.",preview:!0});
