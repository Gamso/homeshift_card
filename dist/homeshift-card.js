function e(e,t,i,s){var o,n=arguments.length,r=n<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,i,s);else for(var a=e.length-1;a>=0;a--)(o=e[a])&&(r=(n<3?o(r):n>3?o(t,i,r):o(t,i))||r);return n>3&&r&&Object.defineProperty(t,i,r),r}"function"==typeof SuppressedError&&SuppressedError;
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t=globalThis,i=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s=Symbol(),o=new WeakMap;let n=class{constructor(e,t,i){if(this._$cssResult$=!0,i!==s)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(i&&void 0===e){const i=void 0!==t&&1===t.length;i&&(e=o.get(t)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&o.set(t,e))}return e}toString(){return this.cssText}};const r=(e,...t)=>{const i=1===e.length?e[0]:t.reduce((t,i,s)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+e[s+1],e[0]);return new n(i,e,s)},a=i?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const i of e.cssRules)t+=i.cssText;return(e=>new n("string"==typeof e?e:e+"",void 0,s))(t)})(e):e,{is:c,defineProperty:h,getOwnPropertyDescriptor:l,getOwnPropertyNames:d,getOwnPropertySymbols:p,getPrototypeOf:u}=Object,_=globalThis,m=_.trustedTypes,v=m?m.emptyScript:"",f=_.reactiveElementPolyfillSupport,g=(e,t)=>e,y={toAttribute(e,t){switch(t){case Boolean:e=e?v:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let i=e;switch(t){case Boolean:i=null!==e;break;case Number:i=null===e?null:Number(e);break;case Object:case Array:try{i=JSON.parse(e)}catch(e){i=null}}return i}},b=(e,t)=>!c(e,t),$={attribute:!0,type:String,converter:y,reflect:!1,useDefault:!1,hasChanged:b};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */Symbol.metadata??=Symbol("metadata"),_.litPropertyMetadata??=new WeakMap;let x=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=$){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(e,i,t);void 0!==s&&h(this.prototype,e,s)}}static getPropertyDescriptor(e,t,i){const{get:s,set:o}=l(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:s,set(t){const n=s?.call(this);o?.call(this,t),this.requestUpdate(e,n,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??$}static _$Ei(){if(this.hasOwnProperty(g("elementProperties")))return;const e=u(this);e.finalize(),void 0!==e.l&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(g("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(g("properties"))){const e=this.properties,t=[...d(e),...p(e)];for(const i of t)this.createProperty(i,e[i])}const e=this[Symbol.metadata];if(null!==e){const t=litPropertyMetadata.get(e);if(void 0!==t)for(const[e,i]of t)this.elementProperties.set(e,i)}this._$Eh=new Map;for(const[e,t]of this.elementProperties){const i=this._$Eu(e,t);void 0!==i&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const e of i)t.unshift(a(e))}else void 0!==e&&t.push(a(e));return t}static _$Eu(e,t){const i=t.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof e?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),void 0!==this.renderRoot&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const i of t.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((e,s)=>{if(i)e.adoptedStyleSheets=s.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const i of s){const s=document.createElement("style"),o=t.litNonce;void 0!==o&&s.setAttribute("nonce",o),s.textContent=i.cssText,e.appendChild(s)}})(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$ET(e,t){const i=this.constructor.elementProperties.get(e),s=this.constructor._$Eu(e,i);if(void 0!==s&&!0===i.reflect){const o=(void 0!==i.converter?.toAttribute?i.converter:y).toAttribute(t,i.type);this._$Em=e,null==o?this.removeAttribute(s):this.setAttribute(s,o),this._$Em=null}}_$AK(e,t){const i=this.constructor,s=i._$Eh.get(e);if(void 0!==s&&this._$Em!==s){const e=i.getPropertyOptions(s),o="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==e.converter?.fromAttribute?e.converter:y;this._$Em=s;const n=o.fromAttribute(t,e.type);this[s]=n??this._$Ej?.get(s)??n,this._$Em=null}}requestUpdate(e,t,i,s=!1,o){if(void 0!==e){const n=this.constructor;if(!1===s&&(o=this[e]),i??=n.getPropertyOptions(e),!((i.hasChanged??b)(o,t)||i.useDefault&&i.reflect&&o===this._$Ej?.get(e)&&!this.hasAttribute(n._$Eu(e,i))))return;this.C(e,t,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:i,reflect:s,wrapped:o},n){i&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,n??t??this[e]),!0!==o||void 0!==n)||(this._$AL.has(e)||(this.hasUpdated||i||(t=void 0),this._$AL.set(e,t)),!0===s&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}const e=this.constructor.elementProperties;if(e.size>0)for(const[t,i]of e){const{wrapped:e}=i,s=this[t];!0!==e||this._$AL.has(t)||void 0===s||this.C(t,void 0,i,s)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(t){throw e=!1,this._$EM(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(e){}firstUpdated(e){}};x.elementStyles=[],x.shadowRootOptions={mode:"open"},x[g("elementProperties")]=new Map,x[g("finalized")]=new Map,f?.({ReactiveElement:x}),(_.reactiveElementVersions??=[]).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const E=globalThis,w=e=>e,S=E.trustedTypes,A=S?S.createPolicy("lit-html",{createHTML:e=>e}):void 0,C="$lit$",k=`lit$${Math.random().toFixed(9).slice(2)}$`,T="?"+k,P=`<${T}>`,I=document,O=()=>I.createComment(""),N=e=>null===e||"object"!=typeof e&&"function"!=typeof e,M=Array.isArray,R="[ \t\n\f\r]",D=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,H=/-->/g,U=/>/g,j=RegExp(`>|${R}(?:([^\\s"'>=/]+)(${R}*=${R}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),z=/'/g,L=/"/g,B=/^(?:script|style|textarea|title)$/i,q=(e=>(t,...i)=>({_$litType$:e,strings:t,values:i}))(1),V=Symbol.for("lit-noChange"),W=Symbol.for("lit-nothing"),F=new WeakMap,K=I.createTreeWalker(I,129);function Y(e,t){if(!M(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==A?A.createHTML(t):t}const J=(e,t)=>{const i=e.length-1,s=[];let o,n=2===t?"<svg>":3===t?"<math>":"",r=D;for(let t=0;t<i;t++){const i=e[t];let a,c,h=-1,l=0;for(;l<i.length&&(r.lastIndex=l,c=r.exec(i),null!==c);)l=r.lastIndex,r===D?"!--"===c[1]?r=H:void 0!==c[1]?r=U:void 0!==c[2]?(B.test(c[2])&&(o=RegExp("</"+c[2],"g")),r=j):void 0!==c[3]&&(r=j):r===j?">"===c[0]?(r=o??D,h=-1):void 0===c[1]?h=-2:(h=r.lastIndex-c[2].length,a=c[1],r=void 0===c[3]?j:'"'===c[3]?L:z):r===L||r===z?r=j:r===H||r===U?r=D:(r=j,o=void 0);const d=r===j&&e[t+1].startsWith("/>")?" ":"";n+=r===D?i+P:h>=0?(s.push(a),i.slice(0,h)+C+i.slice(h)+k+d):i+k+(-2===h?t:d)}return[Y(e,n+(e[i]||"<?>")+(2===t?"</svg>":3===t?"</math>":"")),s]};class X{constructor({strings:e,_$litType$:t},i){let s;this.parts=[];let o=0,n=0;const r=e.length-1,a=this.parts,[c,h]=J(e,t);if(this.el=X.createElement(c,i),K.currentNode=this.el.content,2===t||3===t){const e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;null!==(s=K.nextNode())&&a.length<r;){if(1===s.nodeType){if(s.hasAttributes())for(const e of s.getAttributeNames())if(e.endsWith(C)){const t=h[n++],i=s.getAttribute(e).split(k),r=/([.?@])?(.*)/.exec(t);a.push({type:1,index:o,name:r[2],strings:i,ctor:"."===r[1]?te:"?"===r[1]?ie:"@"===r[1]?se:ee}),s.removeAttribute(e)}else e.startsWith(k)&&(a.push({type:6,index:o}),s.removeAttribute(e));if(B.test(s.tagName)){const e=s.textContent.split(k),t=e.length-1;if(t>0){s.textContent=S?S.emptyScript:"";for(let i=0;i<t;i++)s.append(e[i],O()),K.nextNode(),a.push({type:2,index:++o});s.append(e[t],O())}}}else if(8===s.nodeType)if(s.data===T)a.push({type:2,index:o});else{let e=-1;for(;-1!==(e=s.data.indexOf(k,e+1));)a.push({type:7,index:o}),e+=k.length-1}o++}}static createElement(e,t){const i=I.createElement("template");return i.innerHTML=e,i}}function Z(e,t,i=e,s){if(t===V)return t;let o=void 0!==s?i._$Co?.[s]:i._$Cl;const n=N(t)?void 0:t._$litDirective$;return o?.constructor!==n&&(o?._$AO?.(!1),void 0===n?o=void 0:(o=new n(e),o._$AT(e,i,s)),void 0!==s?(i._$Co??=[])[s]=o:i._$Cl=o),void 0!==o&&(t=Z(e,o._$AS(e,t.values),o,s)),t}class G{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:i}=this._$AD,s=(e?.creationScope??I).importNode(t,!0);K.currentNode=s;let o=K.nextNode(),n=0,r=0,a=i[0];for(;void 0!==a;){if(n===a.index){let t;2===a.type?t=new Q(o,o.nextSibling,this,e):1===a.type?t=new a.ctor(o,a.name,a.strings,this,e):6===a.type&&(t=new oe(o,this,e)),this._$AV.push(t),a=i[++r]}n!==a?.index&&(o=K.nextNode(),n++)}return K.currentNode=I,s}p(e){let t=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}}class Q{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,i,s){this.type=2,this._$AH=W,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===e?.nodeType&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=Z(this,e,t),N(e)?e===W||null==e||""===e?(this._$AH!==W&&this._$AR(),this._$AH=W):e!==this._$AH&&e!==V&&this._(e):void 0!==e._$litType$?this.$(e):void 0!==e.nodeType?this.T(e):(e=>M(e)||"function"==typeof e?.[Symbol.iterator])(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==W&&N(this._$AH)?this._$AA.nextSibling.data=e:this.T(I.createTextNode(e)),this._$AH=e}$(e){const{values:t,_$litType$:i}=e,s="number"==typeof i?this._$AC(e):(void 0===i.el&&(i.el=X.createElement(Y(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(t);else{const e=new G(s,this),i=e.u(this.options);e.p(t),this.T(i),this._$AH=e}}_$AC(e){let t=F.get(e.strings);return void 0===t&&F.set(e.strings,t=new X(e)),t}k(e){M(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let i,s=0;for(const o of e)s===t.length?t.push(i=new Q(this.O(O()),this.O(O()),this,this.options)):i=t[s],i._$AI(o),s++;s<t.length&&(this._$AR(i&&i._$AB.nextSibling,s),t.length=s)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){const t=w(e).nextSibling;w(e).remove(),e=t}}setConnected(e){void 0===this._$AM&&(this._$Cv=e,this._$AP?.(e))}}class ee{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,i,s,o){this.type=1,this._$AH=W,this._$AN=void 0,this.element=e,this.name=t,this._$AM=s,this.options=o,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=W}_$AI(e,t=this,i,s){const o=this.strings;let n=!1;if(void 0===o)e=Z(this,e,t,0),n=!N(e)||e!==this._$AH&&e!==V,n&&(this._$AH=e);else{const s=e;let r,a;for(e=o[0],r=0;r<o.length-1;r++)a=Z(this,s[i+r],t,r),a===V&&(a=this._$AH[r]),n||=!N(a)||a!==this._$AH[r],a===W?e=W:e!==W&&(e+=(a??"")+o[r+1]),this._$AH[r]=a}n&&!s&&this.j(e)}j(e){e===W?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class te extends ee{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===W?void 0:e}}class ie extends ee{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==W)}}class se extends ee{constructor(e,t,i,s,o){super(e,t,i,s,o),this.type=5}_$AI(e,t=this){if((e=Z(this,e,t,0)??W)===V)return;const i=this._$AH,s=e===W&&i!==W||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,o=e!==W&&(i===W||s);s&&this.element.removeEventListener(this.name,this,i),o&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}class oe{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){Z(this,e)}}const ne=E.litHtmlPolyfillSupport;ne?.(X,Q),(E.litHtmlVersions??=[]).push("3.3.2");const re=globalThis;
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
const he={attribute:!0,type:String,converter:y,reflect:!1,hasChanged:b},le=(e=he,t,i)=>{const{kind:s,metadata:o}=i;let n=globalThis.litPropertyMetadata.get(o);if(void 0===n&&globalThis.litPropertyMetadata.set(o,n=new Map),"setter"===s&&((e=Object.create(e)).wrapped=!0),n.set(i.name,e),"accessor"===s){const{name:s}=i;return{set(i){const o=t.get.call(this);t.set.call(this,i),this.requestUpdate(s,o,e,!0,i)},init(t){return void 0!==t&&this.C(s,void 0,e,t),t}}}if("setter"===s){const{name:s}=i;return function(i){const o=this[s];t.call(this,i),this.requestUpdate(s,o,e,!0,i)}}throw Error("Unsupported decorator location: "+s)};function de(e){return(t,i)=>"object"==typeof i?le(e,t,i):((e,t,i)=>{const s=t.hasOwnProperty(i);return t.constructor.createProperty(i,e),s?Object.getOwnPropertyDescriptor(t,i):void 0})(e,t,i)}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function pe(e){return de({...e,state:!0,attribute:!1})}const ue={en:{card:{entity_not_found:"Entity not found: {entity}",unavailable:"Unavailable",today:"Today",tomorrow:"Tomorrow",heat_protection_active:"Heat protection active",cover_open_time:"Cover opening time",cover_close_time:"Cover closing time",cover_open_action:"Open the covers now (scheduled {time})",cover_close_action:"Close the covers now (scheduled {time})",cover_sending:"Sending…",cover_open_failed:"Could not open the covers: {error}",cover_close_failed:"Could not close the covers: {error}",covers_left_open:"Not closed: {covers}",thermostat_mode:"Thermostat mode",day_mode:"Day mode",next:"Next",covers:"Covers",duration_off:"No",decrease:"Decrease: {setting}",increase:"Increase: {setting}",override_label:"Keep my manual choice",override_none:"A manual change is replaced at the calendar's next pass.",override_effect:"After a change by hand, the calendar waits {duration} — until {time} if you change it now.",early_label:"Start events early",early_none:"{mode} will start at its scheduled time, {time}.",early_effect:"{mode} will start at {time} instead of {scheduled}.",early_no_event:"No event scheduled.",covers_left_open_count:"Not closed: {count} covers",inhibit_label:"Cover automation",inhibit_none:"Auto",inhibited_count:"{count} paused",inhibit_forever:"Until resumed",days_short:"d",inhibit_effect:"Pause for {duration} — until {time} if you start it now.",inhibit_effect_forever:"The cover stays paused until you resume it.",inhibited_until:"Paused until {time}",inhibited_forever:"Paused until resumed",pause:"Pause",resume:"Resume",resume_all:"Resume all",covers_paused:"Paused: {covers}",covers_paused_count:"{count} covers paused",inhibit_failed:"Could not pause or resume the cover: {error}"},thermostat:{off:"Off",heating:"Heating",cooling:"Cooling",ventilation:"Ventilation"},editor:{name:"Name",day_mode_entity:"Day Mode Entity",thermostat_mode_entity:"Thermostat Mode Entity",override_duration_entity:"Override Duration Entity",early_switch_entity:"Early Switch Entity",next_mode_entity:"Next Mode Entity",next_mode_at_entity:"Next Mode Time Entity",heat_protection_entity:"Heat Protection Entity",cover_open_time_entity:"Cover Open Time Entity",cover_close_time_entity:"Cover Close Time Entity",open_covers_entity:"Open Covers Button",close_covers_entity:"Close Covers Button",cover_entity:"Cover Entity (legacy, overrides the buttons)",covers_left_open_entity:"Covers Left Open Entity",covers_inhibited_entity:"Paused covers entity"},preview:{home:"Home",work:"Work",remote:"Remote",away:"Away"}},fr:{card:{entity_not_found:"Entité introuvable: {entity}",unavailable:"Indisponible",today:"Auj.",tomorrow:"Dem.",heat_protection_active:"Protection thermique active",cover_open_time:"Heure d'ouverture des volets",cover_close_time:"Heure de fermeture des volets",cover_open_action:"Ouvrir les volets maintenant (prévu à {time})",cover_close_action:"Fermer les volets maintenant (prévu à {time})",cover_sending:"Envoi…",cover_open_failed:"Impossible d'ouvrir les volets : {error}",cover_close_failed:"Impossible de fermer les volets : {error}",covers_left_open:"Non fermés : {covers}",thermostat_mode:"Mode thermostat",day_mode:"Mode du jour",next:"Prochain",covers:"Volets",duration_off:"Non",decrease:"Diminuer : {setting}",increase:"Augmenter : {setting}",override_label:"Garder mon choix manuel",override_none:"Un changement manuel est remplacé au prochain passage du calendrier.",override_effect:"Après un changement à la main, le calendrier attend {duration} — jusqu'à {time} si tu changes maintenant.",early_label:"Anticiper les événements",early_none:"{mode} commencera à l'heure prévue, {time}.",early_effect:"{mode} commencera à {time} au lieu de {scheduled}.",early_no_event:"Aucun événement prévu.",covers_left_open_count:"Non fermés : {count} volets",inhibit_label:"Pilotage auto des volets",inhibit_none:"Auto",inhibited_count:"{count} en pause",inhibit_forever:"Jusqu'à reprise",days_short:"j",inhibit_effect:"Pause de {duration} — jusqu'à {time} si tu l'actives maintenant.",inhibit_effect_forever:"Le volet reste en pause jusqu'à ce que tu le reprennes.",inhibited_until:"En pause jusqu'à {time}",inhibited_forever:"En pause jusqu'à reprise",pause:"Pause",resume:"Reprendre",resume_all:"Tout reprendre",covers_paused:"En pause : {covers}",covers_paused_count:"{count} volets en pause",inhibit_failed:"Échec de la mise en pause : {error}"},thermostat:{off:"Éteint",heating:"Chauffage",cooling:"Climatisation",ventilation:"Ventilation"},editor:{name:"Nom",day_mode_entity:"Entité mode jour",thermostat_mode_entity:"Entité mode thermostat",override_duration_entity:"Entité durée de dérogation",early_switch_entity:"Entité anticipation",next_mode_entity:"Entité prochain mode",next_mode_at_entity:"Entité heure du prochain mode",heat_protection_entity:"Entité protection thermique",cover_open_time_entity:"Entité heure d'ouverture des volets",cover_close_time_entity:"Entité heure de fermeture des volets",open_covers_entity:"Bouton d'ouverture des volets",close_covers_entity:"Bouton de fermeture des volets",cover_entity:"Entité volet (ancienne option, prioritaire sur les boutons)",covers_left_open_entity:"Entité volets non fermés",covers_inhibited_entity:"Entité volets en pause"},preview:{home:"Maison",work:"Travail",remote:"Télétravail",away:"Absence"}}};function _e(e,t){return t.split(".").reduce((e,t)=>e&&null!=e[t]?e[t]:void 0,e)}function me(e,t,i,s){const o=function(e){const t=e?.locale?.language||e?.language||"en",i=String(t).split("-")[0];return ue[t]?t:ue[i]?i:"en"}(e);let n=_e(ue[o],t)??_e(ue.en,t)??s;return null==n?t:(i&&Object.entries(i).forEach(([e,t])=>n=n.replace(`{${e}}`,t)),n)}const ve=[{key:"day_mode_entity",domains:["select","input_select"],default:"select.homeshift_day_mode"},{key:"thermostat_mode_entity",domains:["select","input_select"],default:"select.homeshift_thermostat_mode"},{key:"override_duration_entity",domains:["number","input_number"],default:"number.homeshift_override_duration"},{key:"early_switch_entity",domains:["number","input_number"],default:"number.homeshift_early_switch"},{key:"next_mode_entity",domains:["sensor"],default:"sensor.homeshift_next_mode"},{key:"next_mode_at_entity",domains:["sensor"],default:"sensor.homeshift_next_mode_at"},{key:"heat_protection_entity",domains:["binary_sensor"],default:"binary_sensor.homeshift_cover_heat_active"},{key:"cover_open_time_entity",domains:["sensor"],default:"sensor.homeshift_cover_open_time"},{key:"cover_close_time_entity",domains:["sensor"],default:"sensor.homeshift_cover_close_time"},{key:"open_covers_entity",domains:["button"],default:"button.homeshift_open_covers"},{key:"close_covers_entity",domains:["button"],default:"button.homeshift_close_covers"},{key:"cover_entity",domains:["cover"],default:""},{key:"covers_left_open_entity",domains:["binary_sensor"],default:"binary_sensor.homeshift_covers_left_open"},{key:"covers_inhibited_entity",domains:["sensor"],default:"sensor.homeshift_covers_inhibited"}];class fe extends ae{setConfig(e){this._config=e}_onNameChanged(e){if(!this._config||!this.hass)return;const t=e.target.value;if(this._config.name===t)return;const i={...this._config,name:t};this._config=i,this._dispatchConfigChanged(i)}_onEntityChanged(e,t){if(!this._config||!this.hass)return;const i=e.detail.value;if(this._config[t]===i)return;const s={...this._config,[t]:i};this._config=s,this._dispatchConfigChanged(s)}_dispatchConfigChanged(e){const t=new CustomEvent("config-changed",{detail:{config:e},bubbles:!0,composed:!0});this.dispatchEvent(t)}render(){return this.hass&&this._config?q`
      <div class="card-config">
        <ha-textfield
          label="${me(this.hass,"editor.name")}"
          .value=${this._config.name||""}
          @input=${this._onNameChanged}
        ></ha-textfield>

        ${ve.map(e=>q`<ha-entity-picker
            label="${me(this.hass,`editor.${e.key}`)}"
            .hass=${this.hass}
            .value=${this._config[e.key]||""}
            .includeDomains=${e.domains}
            @value-changed=${t=>this._onEntityChanged(t,e.key)}
            allow-custom-entity
          ></ha-entity-picker>`)}
      </div>
    `:q``}}fe.styles=r`
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
  `,e([de({attribute:!1})],fe.prototype,"hass",void 0),e([pe()],fe.prototype,"_config",void 0),customElements.get("homeshift-card-editor")||customElements.define("homeshift-card-editor",fe);const ge=new Set(["unknown","unavailable",""]);function ye(e){const t="string"==typeof e?e:e?.state;return"string"==typeof t&&!ge.has(t)}function be(e){if(e<60)return`${e} min`;const t=Math.floor(e/60),i=Math.round(e%60);return i>0?`${t}h${String(i).padStart(2,"0")}`:`${t}h`}function $e(e){const t=e?.time_format;return{locale:"system"===t?void 0:e?.language,hour12:"12"===t||"24"!==t&&void 0}}function xe(e,t){const{locale:i,hour12:s}=$e(t);return e.toLocaleTimeString(i,{hour:"2-digit",minute:"2-digit",hour12:s})}class Ee extends ae{constructor(){super(...arguments),this.preview=!1,this._openSetting=null,this._inhibitIndex=Ee.INHIBIT_DEFAULT_INDEX,this._coversExpanded=!1,this._day=0}connectedCallback(){super.connectedCallback(),this._scheduleMidnightRefresh()}disconnectedCallback(){super.disconnectedCallback(),clearTimeout(this._midnightTimer),clearTimeout(this._settingTimeout)}_scheduleMidnightRefresh(){clearTimeout(this._midnightTimer);const e=new Date,t=new Date(e);t.setHours(24,0,1,0),this._midnightTimer=setTimeout(()=>{this._day++,this._scheduleMidnightRefresh()},t.getTime()-e.getTime())}static getStubConfig(){return{name:"Thermostat",day_mode_entity:"select.homeshift_day_mode",thermostat_mode_entity:"select.homeshift_thermostat_mode",override_duration_entity:"number.homeshift_override_duration",early_switch_entity:"number.homeshift_early_switch",next_mode_entity:"sensor.homeshift_next_mode",next_mode_at_entity:"sensor.homeshift_next_mode_at",heat_protection_entity:"binary_sensor.homeshift_cover_heat_active",cover_open_time_entity:"sensor.homeshift_cover_open_time",cover_close_time_entity:"sensor.homeshift_cover_close_time",covers_left_open_entity:"binary_sensor.homeshift_covers_left_open",covers_inhibited_entity:"sensor.homeshift_covers_inhibited"}}static getConfigElement(){return document.createElement("homeshift-card-editor")}setConfig(e){if(!e)throw new Error("Missing configuration");const t={name:e.name??"Thermostat"};for(const i of ve)t[i.key]=e[i.key]??i.default;this._config=t}getCardSize(){return 4}shouldUpdate(e){if(e.has("_config")||e.has("preview"))return!0;if(e.has("_day")||e.has("_openSetting")||e.has("_inhibitIndex")||e.has("_coversExpanded")||e.has("_coverPending"))return!0;if(e.has("hass")){const t=e.get("hass");if(!t)return!0;return ve.map(e=>this._config?.[e.key]).filter(Boolean).some(e=>t.states[e]!==this.hass.states[e])}return!1}_presetClass(e,t){const i=e=>e.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g,"").replace(/[^a-z0-9]+/g,"-");if(["off","heating","cooling","ventilation"].includes(i(e)))return i(e);return{eteint:"off",arret:"off",off:"off",chauffage:"heating",heat:"heating",heating:"heating",climatisation:"cooling",clim:"cooling",cool:"cooling",cooling:"cooling",ventilation:"ventilation",ventilateur:"ventilation",fan:"ventilation"}[i(t)]??i(e)}getEntityState(e){if(e)return this.hass?.states?.[e]}getCoversLeftOpen(){const e=this.getEntityState(this._config?.covers_left_open_entity)?.attributes?.covers;return Array.isArray(e)?e.map(e=>this.hass?.states?.[e]?.attributes?.friendly_name??e):[]}_friendlyName(e){return this.hass?.states?.[e]?.attributes?.friendly_name??e}getCoverInhibitions(){const e=this.getEntityState(this._config?.covers_inhibited_entity)?.attributes??{},t=Array.isArray(e.managed_covers)?e.managed_covers:[],i=new Map,s=Date.now();for(const[t,o]of Object.entries(e.covers??{}))"string"==typeof o&&new Date(o).getTime()<=s||i.set(t,"string"==typeof o?o:null);return{managed:t,inhibited:i}}async _callInhibitService(e,t){this._armSettingTimeout();try{await this.hass.callService("homeshift",e,t)}catch(e){this.dispatchEvent(new CustomEvent("hass-notification",{detail:{message:me(this.hass,"card.inhibit_failed",{error:e?.message??String(e)})},bubbles:!0,composed:!0}))}}_inhibitCover(e){const t=Ee.INHIBIT_PRESETS[this._inhibitIndex];this._callInhibitService("inhibit_covers",{entity_id:[e],...t?{duration:{minutes:t}}:{}})}_resumeCovers(e){this._callInhibitService("resume_covers",e?{entity_id:e}:{})}_stepInhibit(e){const t=Ee.INHIBIT_PRESETS.length-1;this._inhibitIndex=Math.min(t,Math.max(0,this._inhibitIndex+e)),this._armSettingTimeout()}_inhibitLabel(e){return e?e<1440?be(e):`${e/1440} ${me(this.hass,"card.days_short")}`:me(this.hass,"card.inhibit_forever")}_inhibitEnd(e){return e?me(this.hass,"card.inhibited_until",{time:this._formatAbsoluteTime(e)}):me(this.hass,"card.inhibited_forever")}_renderCoverInhibition({managed:e,inhibited:t}){const i="covers"===this._openSetting,s=Ee.INHIBIT_PRESETS,o=s[this._inhibitIndex],n=me(this.hass,"card.inhibit_label"),r=o?me(this.hass,"card.inhibit_effect",{duration:this._inhibitLabel(o),time:this._formatAbsoluteTime(new Date(Date.now()+6e4*o).toISOString())}):me(this.hass,"card.inhibit_effect_forever");return q`<div class="setting ${i?"open":""}">
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
                </button>`:W}
          </div>`:W}
    </div>`}onSelect(e,t){const i=t.target,s=i?.value;s&&this.hass.callService("select","select_option",{entity_id:e,option:s})}onThermostatSelect(e,t){this.hass.callService("select","select_option",{entity_id:e,option:t})}_coverCall(e){const t=this._config.cover_entity;if(t)return ye(this.getEntityState(t))?{domain:"cover",service:`${e}_cover`,entity_id:t}:void 0;const i="open"===e?this._config.open_covers_entity:this._config.close_covers_entity,s=this.getEntityState(i);return s&&"unavailable"!==s.state?{domain:"button",service:"press",entity_id:i}:void 0}async onCoverAction(e){const t=this._coverCall(e);if(t&&!this._coverPending){this._coverPending=e;try{await Promise.all([this.hass.callService(t.domain,t.service,{entity_id:t.entity_id}),new Promise(e=>setTimeout(e,Ee.COVER_FEEDBACK_MS))])}catch(t){this.dispatchEvent(new CustomEvent("hass-notification",{detail:{message:me(this.hass,`card.cover_${e}_failed`,{error:t?.message??String(t)})},bubbles:!0,composed:!0}))}finally{this._coverPending=void 0}}}_renderCoverTime(e,t){const i="open"===e?"mdi:roller-shade":"mdi:roller-shade-closed";if(!this._coverCall(e))return q`<span
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
          </div>`:W}
    </div>`}_minutes(e){if(!e)return null;const t=this.getEntityState(e);return t?function(e){if(!ye(e))return;const t=Number(e.state);return Number.isFinite(t)?t:void 0}(t):this.preview?0:null}_renderMain(e,t,i,s,o,n,r){const a=t.attributes?.option_map??{},c=Object.keys(a).length>0?Object.entries(a):(t.attributes?.options??[]).map(e=>[e,e]),h=e.attributes?.option_map??{},l=Object.keys(h).length>0?Object.entries(h):(e.attributes?.options??[]).map(e=>[e,e]),d=this.getEntityState(this._config.next_mode_entity),p=this.getEntityState(this._config.next_mode_at_entity),u=this._minutes(this._config.early_switch_entity),_=this._minutes(this._config.override_duration_entity),m=ye(d),v=m?d.state:"",f=ye(p)?this._formatAbsoluteTime(p.state):"",g=""!==f,y=_?me(this.hass,"card.override_effect",{duration:this._settingLabel(_),time:this._clockIn(_)}):me(this.hass,"card.override_none"),b=g?u?me(this.hass,"card.early_effect",{mode:v,time:this._clockAt(p.state),scheduled:this._clockAt(p.state,u)}):me(this.hass,"card.early_none",{mode:v,time:this._clockAt(p.state)}):me(this.hass,"card.early_no_event"),$=ye(n),x=ye(r),E=me(this.hass,"card.covers_left_open",{covers:s.join(", ")}),w=s.length>3,S=w?me(this.hass,"card.covers_left_open_count",{count:String(s.length)}):E,A=[...o.inhibited.keys()].map(e=>this._friendlyName(e)),C=A.length>2?me(this.hass,"card.covers_paused_count",{count:String(A.length)}):me(this.hass,"card.covers_paused",{covers:A.join(", ")}),k=[...o.inhibited.entries()].map(([e,t])=>`${this._friendlyName(e)} — ${this._inhibitEnd(t)}`).join("\n"),T=e.attributes?.current_key,P=ye(e);return q`
      <div class="rows">
        <div
          class="presets"
          role="group"
          aria-label=${me(this.hass,"card.thermostat_mode")}
        >
          ${l.map(([t,i])=>{const s=P&&(T?t===T:i===e.state);return q`<button
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
                >${v}${m&&g?" · ":""}${f}</span
              >
            </div>`:W}

        ${null!==_?this._renderSetting("override","mdi:hand-back-left",me(this.hass,"card.override_label"),y,Ee.OVERRIDE_PRESETS,_):W}
        ${null!==u?this._renderSetting("early","mdi:clock-fast",me(this.hass,"card.early_label"),b,Ee.EARLY_SWITCH_PRESETS,u):W}

        ${$||x?q`<div class="row">
              <span class="row-key">${me(this.hass,"card.covers")}</span>
              <span class="cover-times">
                ${$?this._renderCoverTime("open",n):W}
                ${x?this._renderCoverTime("close",r):W}
              </span>
            </div>`:W}

        ${o.managed.length>0?this._renderCoverInhibition(o):W}

        ${i||s.length>0||A.length>0?q`<div class="alerts">
              ${i?q`<span class="chip chip--heat">
                    <ha-icon icon="mdi:window-shutter"></ha-icon>
                    ${me(this.hass,"card.heat_protection_active")}
                  </span>`:W}
              ${s.length>0&&!w?q`<span class="chip chip--covers">
                    <ha-icon icon="mdi:window-shutter-alert"></ha-icon>
                    ${S}
                  </span>`:W}
              ${w?q`<button
                    type="button"
                    class="chip chip--covers"
                    title=${E}
                    aria-label=${E}
                    aria-expanded=${this._coversExpanded?"true":"false"}
                    @click=${()=>this._coversExpanded=!this._coversExpanded}
                  >
                    <ha-icon icon="mdi:window-shutter-alert"></ha-icon>
                    ${S}
                  </button>`:W}
              ${A.length>0?q`<button
                    type="button"
                    class="chip chip--paused"
                    title=${k}
                    @click=${()=>{this._openSetting="covers",this._armSettingTimeout()}}
                  >
                    <ha-icon icon="mdi:window-shutter-cog"></ha-icon>
                    ${C}
                  </button>`:W}
            </div>
            ${w&&this._coversExpanded?q`<p class="covers-detail">${E}</p>`:W}`:W}
      </div>
    `}render(){if(!this.hass||!this._config)return W;const e=this.getEntityState(this._config.day_mode_entity),t=this.getEntityState(this._config.thermostat_mode_entity);if(!this.preview){const i=[[this._config.day_mode_entity,e],[this._config.thermostat_mode_entity,t]].filter(([,e])=>!e).map(([e])=>e||"?");if(i.length>0)return q`
          <ha-card>
            ${i.map(e=>q`<div class="error">
                  ${me(this.hass,"card.entity_not_found",{entity:e})}
                </div>`)}
          </ha-card>
        `}const i=e??{entity_id:this._config.day_mode_entity,state:me(this.hass,"preview.work"),attributes:{option_map:Object.fromEntries(["home","work","remote","away"].map(e=>[e,me(this.hass,`preview.${e}`)]))}},s=t??{entity_id:this._config.thermostat_mode_entity,state:me(this.hass,"thermostat.heating"),attributes:{option_map:Object.fromEntries(["off","heating","cooling","ventilation"].map(e=>[e,me(this.hass,`thermostat.${e}`)])),current_key:"heating"}},o="on"===this.getEntityState(this._config.heat_protection_entity)?.state,n=this.getEntityState(this._config.cover_open_time_entity)?.state,r=this.getEntityState(this._config.cover_close_time_entity)?.state;return q`
      <ha-card>
        <div class="container">
          ${this._renderMain(s,i,o,this.getCoversLeftOpen(),this.getCoverInhibitions(),n,r)}
        </div>
      </ha-card>
    `}}Ee.COVER_FEEDBACK_MS=600,Ee.OVERRIDE_PRESETS=[0,15,30,60,120,240,480,720],Ee.EARLY_SWITCH_PRESETS=[0,15,30,45,60,90,120,180,240],Ee.INHIBIT_PRESETS=[240,1440,2880,4320,10080,0],Ee.INHIBIT_DEFAULT_INDEX=1,Ee.styles=r`
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

    select {
      padding: 6px 8px;
      border-radius: 8px;
      border: 1px solid var(--divider-color, #ccc);
      background: var(--card-background-color);
      color: var(--primary-text-color);
      font-size: 13px;
      font-family: inherit;
    }
  `,e([de({attribute:!1})],Ee.prototype,"hass",void 0),e([de({type:Boolean})],Ee.prototype,"preview",void 0),e([pe()],Ee.prototype,"_config",void 0),e([pe()],Ee.prototype,"_openSetting",void 0),e([pe()],Ee.prototype,"_inhibitIndex",void 0),e([pe()],Ee.prototype,"_coverPending",void 0),e([pe()],Ee.prototype,"_coversExpanded",void 0),e([pe()],Ee.prototype,"_day",void 0),customElements.get("homeshift-card")||customElements.define("homeshift-card",Ee),window.customCards=window.customCards||[],window.customCards.push({type:"homeshift-card",name:"HomeShift Card",description:"Card to manage day mode and thermostat mode via the HomeShift integration.",preview:!0});
