/*
 Bean - copyright (c) Jacob Thornton 2011-2012
 https://github.com/fat/bean
 MIT license
*/
(function(v,w,j){"undefined"!=typeof module&&module.exports?module.exports=j():"function"==typeof define&&define.amd?define(j):w[v]=j()})("bean",this,function(v,w){v=v||"bean";w=w||this;for(var j=window,S=w[v],F=/[^\.]*(?=\..*)\.|.*/,B=/\..*/,q=document||{},p=q.documentElement||{},m=p.addEventListener,x=m?"addEventListener":"attachEvent",K={},y=Array.prototype.slice,k=function(b,a){return b.split(a||" ")},G={},l=k("click dblclick mouseup mousedown contextmenu mousewheel mousemultiwheel DOMMouseScroll mouseover mouseout mousemove selectstart selectend keydown keypress keyup orientationchange focus blur change reset select submit load unload beforeunload resize move DOMContentLoaded readystatechange message error abort scroll "+
(m?"show input invalid touchstart touchmove touchend touchcancel gesturestart gesturechange gestureend textinputreadystatechange pageshow pagehide popstate hashchange offline online afterprint beforeprint dragstart dragenter dragover dragleave drag drop dragend loadstart progress suspend emptied stalled loadmetadata loadeddata canplay canplaythrough playing waiting seeking seeked ended durationchange timeupdate play pause ratechange volumechange cuechange checking noupdate downloading cached updateready obsolete ":
"")),t=void 0,t=0;t<l.length;t++)l[t]&&(G[l[t]]=1);var C,T="compareDocumentPosition"in p?function(b,a){return a.compareDocumentPosition&&16===(a.compareDocumentPosition(b)&16)}:"contains"in p?function(b,a){a=9===a.nodeType||a===window?p:a;return a!==b&&a.contains(b)}:function(b,a){for(;b=b.parentNode;)if(b===a)return 1;return 0},l=function(b){b=b.relatedTarget;return!b?null==b:b!==this&&"xul"!==b.prefix&&!/document/.test(this.toString())&&!T(b,this)};C={mouseenter:{base:"mouseover",condition:l},mouseleave:{base:"mouseout",
condition:l},mousewheel:{base:/Firefox/.test(navigator.userAgent)?"DOMMouseScroll":"mousewheel"}};var u=k("altKey attrChange attrName bubbles cancelable ctrlKey currentTarget detail eventPhase getModifierState isTrusted metaKey relatedNode relatedTarget shiftKey srcElement target timeStamp type view which propertyName"),L=u.concat(k("button buttons clientX clientY dataTransfer fromElement offsetX offsetY pageX pageY screenX screenY toElement")),U=L.concat(k("wheelDelta wheelDeltaX wheelDeltaY wheelDeltaZ axis")),
V=u.concat(k("char charCode key keyCode keyIdentifier keyLocation location")),W=u.concat(k("data")),X=u.concat(k("touches targetTouches changedTouches scale rotation")),Y=u.concat(k("data origin source")),Z=u.concat(k("state")),$=/over|out/,H=[{reg:/key/i,fix:function(b,a){a.keyCode=b.keyCode||b.which;return V}},{reg:/click|mouse(?!(.*wheel|scroll))|menu|drag|drop/i,fix:function(b,a,c){a.rightClick=3===b.which||2===b.button;a.pos={x:0,y:0};if(b.pageX||b.pageY)a.clientX=b.pageX,a.clientY=b.pageY;else if(b.clientX||
b.clientY)a.clientX=b.clientX+q.body.scrollLeft+p.scrollLeft,a.clientY=b.clientY+q.body.scrollTop+p.scrollTop;$.test(c)&&(a.relatedTarget=b.relatedTarget||b[("mouseover"==c?"from":"to")+"Element"]);return L}},{reg:/mouse.*(wheel|scroll)/i,fix:function(){return U}},{reg:/^text/i,fix:function(){return W}},{reg:/^touch|^gesture/i,fix:function(){return X}},{reg:/^message$/i,fix:function(){return Y}},{reg:/^popstate$/i,fix:function(){return Z}},{reg:/.*/,fix:function(){return u}}],M={},r=function(b,a,
c){if(arguments.length&&(this.originalEvent=b=b||((a.ownerDocument||a.document||a).parentWindow||j).event,this.isNative=c,this.isBean=!0,b)){var e=b.type,d=b.target||b.srcElement,f,h,g;this.target=d&&3===d.nodeType?d.parentNode:d;if(c){g=M[e];if(!g){d=0;for(f=H.length;d<f;d++)if(H[d].reg.test(e)){M[e]=g=H[d].fix;break}}e=g(b,this,e);for(d=e.length;d--;)if(!((h=e[d])in this)&&h in b)this[h]=b[h]}}};r.prototype.preventDefault=function(){this.originalEvent.preventDefault?this.originalEvent.preventDefault():
this.originalEvent.returnValue=!1};r.prototype.stopPropagation=function(){this.originalEvent.stopPropagation?this.originalEvent.stopPropagation():this.originalEvent.cancelBubble=!0};r.prototype.stop=function(){this.preventDefault();this.stopPropagation();this.stopped=!0};r.prototype.stopImmediatePropagation=function(){this.originalEvent.stopImmediatePropagation&&this.originalEvent.stopImmediatePropagation();this.isImmediatePropagationStopped=function(){return!0}};r.prototype.isImmediatePropagationStopped=
function(){return this.originalEvent.isImmediatePropagationStopped&&this.originalEvent.isImmediatePropagationStopped()};r.prototype.clone=function(b){var a=new r(this,this.element,this.isNative);a.currentTarget=b;return a};var N=function(b,a,c,e){var d=c?function(d){var h=a.__beanDel?a.__beanDel.ft(d.target,b):this;if(c.apply(h,arguments))return d&&(d.currentTarget=h),a.apply(b,e?y.call(arguments,d?0:1).concat(e):arguments)}:function(c){a.__beanDel&&(c=c.clone(a.__beanDel?a.__beanDel.ft(c.target,
b):void 0));return a.apply(b,e?y.call(arguments,c?0:1).concat(e):arguments)};d.__beanDel=a.__beanDel;return d},D=function(b,a,c,e,d,f,h){var g=C[a];"unload"==a&&(c=O(I,b,a,c,e));g&&(g.condition&&(c=N(b,c,g.condition,f)),a=g.base||a);this.isNative=g=G[a]&&!!b[x];this.customType=!m&&!g&&a;this.element=b;this.type=a;this.original=e;this.namespaces=d;this.eventType=m||g?a:"propertychange";this.target=!m&&!g&&(b===q||b===j)?p:b;this[x]=!!this.target[x];this.root=h;this.handler=N(b,c,null,f)};D.prototype.inNamespaces=
function(b){var a,c,e=0;if(!b)return!0;if(!this.namespaces)return!1;for(a=b.length;a--;)for(c=this.namespaces.length;c--;)b[a]==this.namespaces[c]&&e++;return b.length===e};D.prototype.matches=function(b,a,c){return this.element===b&&(!a||this.original===a)&&(!c||this.handler===c)};var n,s={},J=function(b,a,c,e,d,f){var h=d?"r":"$";if(!a||"*"==a)for(var g in s)g.charAt(0)==h&&J(b,g.substr(1),c,e,d,f);else{d=0;g=s[h+a];var k="*"==b;if(g)for(h=g.length;d<h&&(!k&&!g[d].matches(b,c,e)||f(g[d],g,d,a));d++);
}};n={has:function(b,a,c,e){if(e=s[(e?"r":"$")+a])for(a=e.length;a--;)if(!e[a].root&&e[a].matches(b,c,null))return!0;return!1},get:function(b,a,c,e){var d=[];J(b,a,c,null,e,function(a){return d.push(a)});return d},put:function(b){var a=!b.root&&!this.has(b.element,b.type,null,!1),c=(b.root?"r":"$")+b.type;(s[c]||(s[c]=[])).push(b);return a},del:function(b){J(b.element,b.type,null,b.handler,b.root,function(a,b,e){b.splice(e,1);a.removed=!0;0===b.length&&delete s[(a.root?"r":"$")+a.type];return!1})},
entries:function(){var b,a=[];for(b in s)"$"==b.charAt(0)&&(a=a.concat(s[b]));return a}};var P,l=function(b){P=arguments.length?b:q.querySelectorAll?function(a,b){return b.querySelectorAll(a)}:function(){throw Error("Bean: No selector engine installed");}},E=function(b,a){if(m||!a||!(b&&b.propertyName!="_on"+a)){var c=n.get(this,a||b.type,null,!1),e=c.length,d=0;b=new r(b,this,!0);a&&(b.type=a);for(;d<e&&!b.isImmediatePropagationStopped();d++)c[d].removed||c[d].handler.call(this,b)}},Q=m?function(b,
a,c){b[c?"addEventListener":"removeEventListener"](a,E,!1)}:function(b,a,c,e){if(c)n.put(a=new D(b,e||a,function(a){E.call(b,a,e)},E,null,null,!0)),e&&null==b["_on"+e]&&(b["_on"+e]=0),a.target.attachEvent("on"+a.eventType,a.handler);else if(a=n.get(b,e||a,E,!0)[0])a.target.detachEvent("on"+a.eventType,a.handler),n.del(a)},O=function(b,a,c,e,d){return function(){e.apply(this,arguments);b(a,c,d)}},I=function(b,a,c,e){a=a&&a.replace(B,"");a=n.get(b,a,null,!1);var d={},f,h;f=0;for(h=a.length;f<h;f++)if((!c||
a[f].original===c)&&a[f].inNamespaces(e))n.del(a[f]),!d[a[f].eventType]&&a[f][x]&&(d[a[f].eventType]={t:a[f].eventType,c:a[f].type});for(f in d)n.has(b,d[f].t,null,!1)||Q(b,d[f].t,!1,d[f].c)},aa=m?function(b,a,c){var e=q.createEvent(b?"HTMLEvents":"UIEvents");e[b?"initEvent":"initUIEvent"](a,!0,!0,j,1);c.dispatchEvent(e)}:function(b,a,c){c=!m&&!b&&(c===q||c===j)?p:c;b?c.fireEvent("on"+a,q.createEventObject()):c["_on"+a]++},z=function(b,a,c){var e="string"==typeof a,d,f;if(e&&0<a.indexOf(" ")){a=k(a);
for(f=a.length;f--;)z(b,a[f],c);return b}if((f=e&&a.replace(B,""))&&C[f])f=C[f].base;if(!a||e){if(a=e&&a.replace(F,""))a=k(a,".");I(b,f,c,a)}else if("function"==typeof a)I(b,null,a);else for(d in a)a.hasOwnProperty(d)&&z(b,d,a[d]);return b},A=function(b,a,c,e){var d,f,h,g,j,m;if(void 0===c&&"object"==typeof a)for(d in a)a.hasOwnProperty(d)&&A.call(this,b,d,a[d]);else{if("function"!=typeof c){d=e;g=y.call(arguments,4);var l=c,q=d,p=function(a,b){for(var c,d="string"==typeof l?P(l,b):l;a&&a!==b;a=a.parentNode)for(c=
d.length;c--;)if(d[c]===a)return a};f=function(a){var b=p(a.target,this);b&&q.apply(b,arguments)};f.__beanDel={ft:p,selector:l};e=f}else g=y.call(arguments,3),e=d=c;f=k(a);this===K&&(e=O(z,b,a,e,d));for(h=f.length;h--;)m=n.put(j=new D(b,f[h].replace(B,""),e,d,k(f[h].replace(F,""),"."),g,!1)),j[x]&&m&&Q(b,j.eventType,!0,j.customType);return b}},t={on:A,add:function(b,a,c,e){return A.apply(null,"string"!=typeof c?y.call(arguments):[b,c,a,e].concat(3<arguments.length?y.call(arguments,5):[]))},one:function(){return A.apply(K,
arguments)},off:z,remove:z,clone:function(b,a,c){a=n.get(a,c,null,!1);c=a.length;for(var e=0,d,f;e<c;e++)a[e].original&&(d=[b,a[e].type],(f=a[e].handler.__beanDel)&&d.push(f.selector),d.push(a[e].original),A.apply(null,d));return b},fire:function(b,a,c){var e=k(a),d,f,h,g;for(d=e.length;d--;){a=e[d].replace(B,"");if(h=e[d].replace(F,""))h=k(h,".");if(!h&&!c&&b[x])aa(G[a],a,b);else{g=n.get(b,a,null,!1);c=[!1].concat(c);a=0;for(f=g.length;a<f;a++)g[a].inNamespaces(h)&&g[a].handler.apply(b,c)}}return b},
setSelectorEngine:l,noConflict:function(){w[v]=S;return this}};if(j.attachEvent){var R=function(){var b,a=n.entries();for(b in a)a[b].type&&"unload"!==a[b].type&&z(a[b].element,a[b].type);j.detachEvent("onunload",R);j.CollectGarbage&&j.CollectGarbage()};j.attachEvent("onunload",R)}l();return t});
/*! @source http://purl.eligrey.com/github/classList.js/blob/master/classList.js*/
if(typeof document!=="undefined"&&!("classList" in document.createElement("a"))){(function(j){if(!("HTMLElement" in j)&&!("Element" in j)){return}var a="classList",f="prototype",m=(j.HTMLElement||j.Element)[f],b=Object,k=String[f].trim||function(){return this.replace(/^\s+|\s+$/g,"")},c=Array[f].indexOf||function(q){var p=0,o=this.length;for(;p<o;p++){if(p in this&&this[p]===q){return p}}return -1},n=function(o,p){this.name=o;this.code=DOMException[o];this.message=p},g=function(p,o){if(o===""){
throw new n("SYNTAX_ERR","An invalid or illegal string was specified")}if(/\s/.test(o)){throw new n("INVALID_CHARACTER_ERR","String contains an invalid character")}return c.call(p,o)},d=function(s){var r=k.call(s.className),q=r?r.split(/\s+/):[],p=0,o=q.length;for(;p<o;p++){this.push(q[p])}this._updateClassName=function(){s.className=this.toString()}},e=d[f]=[],i=function(){return new d(this)};n[f]=Error[f];e.item=function(o){return this[o]||null};e.contains=function(o){o+="";return g(this,o)!==-1};
e.add=function(){var s=arguments,r=0,p=s.length,q,o=false;do{q=s[r]+"";if(g(this,q)===-1){this.push(q);o=true}}while(++r<p);if(o){this._updateClassName()}};e.remove=function(){var t=arguments,s=0,p=t.length,r,o=false;do{r=t[s]+"";var q=g(this,r);if(q!==-1){this.splice(q,1);o=true}}while(++s<p);if(o){this._updateClassName()}};e.toggle=function(p,q){p+="";var o=this.contains(p),r=o?q!==true&&"remove":q!==false&&"add";if(r){this[r](p)}return o};e.toString=function(){return this.join(" ")};
if(b.defineProperty){var l={get:i,enumerable:true,configurable:true};try{b.defineProperty(m,a,l)}catch(h){if(h.number===-2146823252){l.enumerable=false;b.defineProperty(m,a,l)}}}else{if(b[f].__defineGetter__){m.__defineGetter__(a,i)}}}(self))};
/* Modernizr 2.6.2 (Custom Build) | MIT & BSD
 * Build: http://modernizr.com/download/#-inlinesvg-smil-svg
 */
;window.Modernizr=function(a,b,c){function u(a){i.cssText=a}function v(a,b){return u(prefixes.join(a+";")+(b||""))}function w(a,b){return typeof a===b}function x(a,b){return!!~(""+a).indexOf(b)}function y(a,b,d){for(var e in a){var f=b[a[e]];if(f!==c)return d===!1?a[e]:w(f,"function")?f.bind(d||b):f}return!1}var d="2.6.2",e={},f=b.documentElement,g="modernizr",h=b.createElement(g),i=h.style,j,k={}.toString,l={svg:"http://www.w3.org/2000/svg"},m={},n={},o={},p=[],q=p.slice,r,s={}.hasOwnProperty,t;!w(s,"undefined")
&&!w(s.call,"undefined")?t=function(a,b){return s.call(a,b)}:t=function(a,b){return b in a&&w(a.constructor.prototype[b],"undefined")},Function.prototype.bind||(Function.prototype.bind=function(b){var c=this;if(typeof c!="function")throw new TypeError;var d=q.call(arguments,1),e=function(){if(this instanceof e){var a=function(){};a.prototype=c.prototype;var f=new a,g=c.apply(f,d.concat(q.call(arguments)));return Object(g)===g?g:f}return c.apply(b,d.concat(q.call(arguments)))};return e}),
m.svg=function(){return!!b.createElementNS&&!!b.createElementNS(l.svg,"svg").createSVGRect},m.inlinesvg=function(){var a=b.createElement("div");return a.innerHTML="<svg/>",(a.firstChild&&a.firstChild.namespaceURI)==l.svg},m.smil=function(){return!!b.createElementNS&&/SVGAnimate/.test(k.call(b.createElementNS(l.svg,"animate")))};for(var z in m)t(m,z)&&(r=z.toLowerCase(),e[r]=m[z](),p.push((e[r]?"":"no-")+r));return e.addTest=function(a,b){if(typeof a=="object")for(var d in a)t(a,d)&&e.addTest(d,a[d]);
else{a=a.toLowerCase();if(e[a]!==c)return e;b=typeof b=="function"?b():b,typeof enableClasses!="undefined"&&enableClasses&&(f.className+=" "+(b?"":"no-")+a),e[a]=b}return e},u(""),h=j=null,e._version=d,e}(this,this.document);

try {
  document.addEventListener('deviceready',function(){
    //fix https://github.com/stuartpb/stepdub/issues/2
    bean.on(document.body,"click",'a[target="_blank"]', function(e){
      open(e.target.href, '_system');
      e.stop();
      return false;
    });
  });
} catch(err) {
  navigator.notification.alert(err.message,null,'Prep error');
}