!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=2)}([function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e){function t(){return`${location.protocol}//${location.host}${location.pathname}`}e.getProtocol=function(){return location.protocol},e.getHostname=function(){return location.hostname},e.getPort=function(){return Number(location.port)},e.getHost=function(){return location.host},e.getCurrentUrl=t,e.currentUrlMatchesRegex=function(e){return new RegExp(e,"g").test(t())},e.urlEndsWith=function(e){return new RegExp(`^.*${e}$`).test(t())},e.getLastUrlSegment=function(){const e=t();return e.substr(e.lastIndexOf("/")+1)}}(t.UrlUtils||(t.UrlUtils={}))},function(e,t,n){var r=n(11),o=n(13);e.exports=function(e,t,n){var i=t&&n||0;"string"==typeof e&&(t="binary"==e?new Array(16):null,e=null);var u=(e=e||{}).random||(e.rng||r)();if(u[6]=15&u[6]|64,u[8]=63&u[8]|128,t)for(var l=0;l<16;++l)t[i+l]=u[l];return t||o(u)}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(3),o=n(6),i=n(0),u=n(7),l=n(10),a=".*(\\/projects).*(\\/issues).*",s="cf_10",c='a:contains("Komplexitätspunkte")';class f extends u.WebextMain{async onExecuteMain(){const e=await o.SettingsLoader.load(l.Settings);if(i.UrlUtils.currentUrlMatchesRegex(`${e.baseUrl}.*${a}`)){const e=this.calculateKPs(`.${s}`);e&&this.showKPSum(e)}}calculateKPs(e){const t=r.HtmlUtils.find(e);if(0!==t.length)return t.map(e=>Number(e.textContent)).reduce((e,t)=>e+t)}showKPSum(e){const t=r.HtmlUtils.findFirst(c);t.innerHTML=`${t.innerText}<br>(Gesamt: ${e})`}}t.KPCalculator=f,(new f).main()},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(4);!function(e){function t(e){const t=r.Sizzle.select(e);return 0===t.length?(console.log(`Kein Element mit Selector=${e} gefunden.`),[]):t}e.find=t,e.findFirst=function(e){if(0===t(e).length)throw new Error(`Kein Element mit Selector=${e} gefunden.`);return t(e)[0]},e.appendAfter=function(e,t){if(!e.parentNode)throw new Error(`Element=${e} hat kein Eltern-Element. Kann nicht hinzufügen.`);e.parentNode.insertBefore(t,e.nextSibling)},e.remove=function(e){t(e).forEach(e=>e.remove())},e.removeChildren=function(e){for(;e.firstChild;)e.removeChild(e.firstChild)},e.applyCss=function(e,n){t(e).forEach(e=>Object.assign(e.style,n))}}(t.HtmlUtils||(t.HtmlUtils={}))},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(0);!function(e){e.select=function(e){return[()=>r.UrlUtils.getCurrentUrl().endsWith(".xml"),()=>r.UrlUtils.getCurrentUrl().endsWith(".sds")].every(e=>!1===e())?n(5)(e):(console.log("not importing sizzle."),[])}}(t.Sizzle||(t.Sizzle={}))},function(e,t,n){var r;
/*!
 * Sizzle CSS Selector Engine v2.3.3
 * https://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2016-08-08
 */
/*!
 * Sizzle CSS Selector Engine v2.3.3
 * https://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2016-08-08
 */
!function(o){var i,u,l,a,s,c,f,d,p,h,g,m,y,v,b,w,x,E,C,N="sizzle"+1*new Date,S=o.document,D=0,T=0,A=ce(),L=ce(),M=ce(),P=function(e,t){return e===t&&(g=!0),0},R={}.hasOwnProperty,I=[],O=I.pop,B=I.push,$=I.push,_=I.slice,q=function(e,t){for(var n=0,r=e.length;n<r;n++)if(e[n]===t)return n;return-1},j="checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",U="[\\x20\\t\\r\\n\\f]",z="(?:\\\\.|[\\w-]|[^\0-\\xa0])+",H="\\["+U+"*("+z+")(?:"+U+"*([*^$|!~]?=)"+U+"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|("+z+"))|)"+U+"*\\]",k=":("+z+")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|"+H+")*)|.*)\\)|)",F=new RegExp(U+"+","g"),K=new RegExp("^"+U+"+|((?:^|[^\\\\])(?:\\\\.)*)"+U+"+$","g"),G=new RegExp("^"+U+"*,"+U+"*"),V=new RegExp("^"+U+"*([>+~]|"+U+")"+U+"*"),W=new RegExp("="+U+"*([^\\]'\"]*?)"+U+"*\\]","g"),J=new RegExp(k),X=new RegExp("^"+z+"$"),Q={ID:new RegExp("^#("+z+")"),CLASS:new RegExp("^\\.("+z+")"),TAG:new RegExp("^("+z+"|[*])"),ATTR:new RegExp("^"+H),PSEUDO:new RegExp("^"+k),CHILD:new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+U+"*(even|odd|(([+-]|)(\\d*)n|)"+U+"*(?:([+-]|)"+U+"*(\\d+)|))"+U+"*\\)|)","i"),bool:new RegExp("^(?:"+j+")$","i"),needsContext:new RegExp("^"+U+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+U+"*((?:-\\d)?\\d*)"+U+"*\\)|)(?=[^-]|$)","i")},Y=/^(?:input|select|textarea|button)$/i,Z=/^h\d$/i,ee=/^[^{]+\{\s*\[native \w/,te=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,ne=/[+~]/,re=new RegExp("\\\\([\\da-f]{1,6}"+U+"?|("+U+")|.)","ig"),oe=function(e,t,n){var r="0x"+t-65536;return r!=r||n?t:r<0?String.fromCharCode(r+65536):String.fromCharCode(r>>10|55296,1023&r|56320)},ie=/([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,ue=function(e,t){return t?"\0"===e?"�":e.slice(0,-1)+"\\"+e.charCodeAt(e.length-1).toString(16)+" ":"\\"+e},le=function(){m()},ae=Ee(function(e){return!0===e.disabled&&("form"in e||"label"in e)},{dir:"parentNode",next:"legend"});try{$.apply(I=_.call(S.childNodes),S.childNodes),I[S.childNodes.length].nodeType}catch(e){$={apply:I.length?function(e,t){B.apply(e,_.call(t))}:function(e,t){for(var n=e.length,r=0;e[n++]=t[r++];);e.length=n-1}}}function se(e,t,n,r){var o,i,l,a,s,f,p,h=t&&t.ownerDocument,g=t?t.nodeType:9;if(n=n||[],"string"!=typeof e||!e||1!==g&&9!==g&&11!==g)return n;if(!r&&((t?t.ownerDocument||t:S)!==y&&m(t),t=t||y,b)){if(11!==g&&(s=te.exec(e)))if(o=s[1]){if(9===g){if(!(l=t.getElementById(o)))return n;if(l.id===o)return n.push(l),n}else if(h&&(l=h.getElementById(o))&&C(t,l)&&l.id===o)return n.push(l),n}else{if(s[2])return $.apply(n,t.getElementsByTagName(e)),n;if((o=s[3])&&u.getElementsByClassName&&t.getElementsByClassName)return $.apply(n,t.getElementsByClassName(o)),n}if(u.qsa&&!M[e+" "]&&(!w||!w.test(e))){if(1!==g)h=t,p=e;else if("object"!==t.nodeName.toLowerCase()){for((a=t.getAttribute("id"))?a=a.replace(ie,ue):t.setAttribute("id",a=N),i=(f=c(e)).length;i--;)f[i]="#"+a+" "+xe(f[i]);p=f.join(","),h=ne.test(e)&&be(t.parentNode)||t}if(p)try{return $.apply(n,h.querySelectorAll(p)),n}catch(e){}finally{a===N&&t.removeAttribute("id")}}}return d(e.replace(K,"$1"),t,n,r)}function ce(){var e=[];return function t(n,r){return e.push(n+" ")>l.cacheLength&&delete t[e.shift()],t[n+" "]=r}}function fe(e){return e[N]=!0,e}function de(e){var t=y.createElement("fieldset");try{return!!e(t)}catch(e){return!1}finally{t.parentNode&&t.parentNode.removeChild(t),t=null}}function pe(e,t){for(var n=e.split("|"),r=n.length;r--;)l.attrHandle[n[r]]=t}function he(e,t){var n=t&&e,r=n&&1===e.nodeType&&1===t.nodeType&&e.sourceIndex-t.sourceIndex;if(r)return r;if(n)for(;n=n.nextSibling;)if(n===t)return-1;return e?1:-1}function ge(e){return function(t){return"input"===t.nodeName.toLowerCase()&&t.type===e}}function me(e){return function(t){var n=t.nodeName.toLowerCase();return("input"===n||"button"===n)&&t.type===e}}function ye(e){return function(t){return"form"in t?t.parentNode&&!1===t.disabled?"label"in t?"label"in t.parentNode?t.parentNode.disabled===e:t.disabled===e:t.isDisabled===e||t.isDisabled!==!e&&ae(t)===e:t.disabled===e:"label"in t&&t.disabled===e}}function ve(e){return fe(function(t){return t=+t,fe(function(n,r){for(var o,i=e([],n.length,t),u=i.length;u--;)n[o=i[u]]&&(n[o]=!(r[o]=n[o]))})})}function be(e){return e&&void 0!==e.getElementsByTagName&&e}for(i in u=se.support={},s=se.isXML=function(e){var t=e&&(e.ownerDocument||e).documentElement;return!!t&&"HTML"!==t.nodeName},m=se.setDocument=function(e){var t,n,r=e?e.ownerDocument||e:S;return r!==y&&9===r.nodeType&&r.documentElement?(v=(y=r).documentElement,b=!s(y),S!==y&&(n=y.defaultView)&&n.top!==n&&(n.addEventListener?n.addEventListener("unload",le,!1):n.attachEvent&&n.attachEvent("onunload",le)),u.attributes=de(function(e){return e.className="i",!e.getAttribute("className")}),u.getElementsByTagName=de(function(e){return e.appendChild(y.createComment("")),!e.getElementsByTagName("*").length}),u.getElementsByClassName=ee.test(y.getElementsByClassName),u.getById=de(function(e){return v.appendChild(e).id=N,!y.getElementsByName||!y.getElementsByName(N).length}),u.getById?(l.filter.ID=function(e){var t=e.replace(re,oe);return function(e){return e.getAttribute("id")===t}},l.find.ID=function(e,t){if(void 0!==t.getElementById&&b){var n=t.getElementById(e);return n?[n]:[]}}):(l.filter.ID=function(e){var t=e.replace(re,oe);return function(e){var n=void 0!==e.getAttributeNode&&e.getAttributeNode("id");return n&&n.value===t}},l.find.ID=function(e,t){if(void 0!==t.getElementById&&b){var n,r,o,i=t.getElementById(e);if(i){if((n=i.getAttributeNode("id"))&&n.value===e)return[i];for(o=t.getElementsByName(e),r=0;i=o[r++];)if((n=i.getAttributeNode("id"))&&n.value===e)return[i]}return[]}}),l.find.TAG=u.getElementsByTagName?function(e,t){return void 0!==t.getElementsByTagName?t.getElementsByTagName(e):u.qsa?t.querySelectorAll(e):void 0}:function(e,t){var n,r=[],o=0,i=t.getElementsByTagName(e);if("*"===e){for(;n=i[o++];)1===n.nodeType&&r.push(n);return r}return i},l.find.CLASS=u.getElementsByClassName&&function(e,t){if(void 0!==t.getElementsByClassName&&b)return t.getElementsByClassName(e)},x=[],w=[],(u.qsa=ee.test(y.querySelectorAll))&&(de(function(e){v.appendChild(e).innerHTML="<a id='"+N+"'></a><select id='"+N+"-\r\\' msallowcapture=''><option selected=''></option></select>",e.querySelectorAll("[msallowcapture^='']").length&&w.push("[*^$]="+U+"*(?:''|\"\")"),e.querySelectorAll("[selected]").length||w.push("\\["+U+"*(?:value|"+j+")"),e.querySelectorAll("[id~="+N+"-]").length||w.push("~="),e.querySelectorAll(":checked").length||w.push(":checked"),e.querySelectorAll("a#"+N+"+*").length||w.push(".#.+[+~]")}),de(function(e){e.innerHTML="<a href='' disabled='disabled'></a><select disabled='disabled'><option/></select>";var t=y.createElement("input");t.setAttribute("type","hidden"),e.appendChild(t).setAttribute("name","D"),e.querySelectorAll("[name=d]").length&&w.push("name"+U+"*[*^$|!~]?="),2!==e.querySelectorAll(":enabled").length&&w.push(":enabled",":disabled"),v.appendChild(e).disabled=!0,2!==e.querySelectorAll(":disabled").length&&w.push(":enabled",":disabled"),e.querySelectorAll("*,:x"),w.push(",.*:")})),(u.matchesSelector=ee.test(E=v.matches||v.webkitMatchesSelector||v.mozMatchesSelector||v.oMatchesSelector||v.msMatchesSelector))&&de(function(e){u.disconnectedMatch=E.call(e,"*"),E.call(e,"[s!='']:x"),x.push("!=",k)}),w=w.length&&new RegExp(w.join("|")),x=x.length&&new RegExp(x.join("|")),t=ee.test(v.compareDocumentPosition),C=t||ee.test(v.contains)?function(e,t){var n=9===e.nodeType?e.documentElement:e,r=t&&t.parentNode;return e===r||!(!r||1!==r.nodeType||!(n.contains?n.contains(r):e.compareDocumentPosition&&16&e.compareDocumentPosition(r)))}:function(e,t){if(t)for(;t=t.parentNode;)if(t===e)return!0;return!1},P=t?function(e,t){if(e===t)return g=!0,0;var n=!e.compareDocumentPosition-!t.compareDocumentPosition;return n||(1&(n=(e.ownerDocument||e)===(t.ownerDocument||t)?e.compareDocumentPosition(t):1)||!u.sortDetached&&t.compareDocumentPosition(e)===n?e===y||e.ownerDocument===S&&C(S,e)?-1:t===y||t.ownerDocument===S&&C(S,t)?1:h?q(h,e)-q(h,t):0:4&n?-1:1)}:function(e,t){if(e===t)return g=!0,0;var n,r=0,o=e.parentNode,i=t.parentNode,u=[e],l=[t];if(!o||!i)return e===y?-1:t===y?1:o?-1:i?1:h?q(h,e)-q(h,t):0;if(o===i)return he(e,t);for(n=e;n=n.parentNode;)u.unshift(n);for(n=t;n=n.parentNode;)l.unshift(n);for(;u[r]===l[r];)r++;return r?he(u[r],l[r]):u[r]===S?-1:l[r]===S?1:0},y):y},se.matches=function(e,t){return se(e,null,null,t)},se.matchesSelector=function(e,t){if((e.ownerDocument||e)!==y&&m(e),t=t.replace(W,"='$1']"),u.matchesSelector&&b&&!M[t+" "]&&(!x||!x.test(t))&&(!w||!w.test(t)))try{var n=E.call(e,t);if(n||u.disconnectedMatch||e.document&&11!==e.document.nodeType)return n}catch(e){}return se(t,y,null,[e]).length>0},se.contains=function(e,t){return(e.ownerDocument||e)!==y&&m(e),C(e,t)},se.attr=function(e,t){(e.ownerDocument||e)!==y&&m(e);var n=l.attrHandle[t.toLowerCase()],r=n&&R.call(l.attrHandle,t.toLowerCase())?n(e,t,!b):void 0;return void 0!==r?r:u.attributes||!b?e.getAttribute(t):(r=e.getAttributeNode(t))&&r.specified?r.value:null},se.escape=function(e){return(e+"").replace(ie,ue)},se.error=function(e){throw new Error("Syntax error, unrecognized expression: "+e)},se.uniqueSort=function(e){var t,n=[],r=0,o=0;if(g=!u.detectDuplicates,h=!u.sortStable&&e.slice(0),e.sort(P),g){for(;t=e[o++];)t===e[o]&&(r=n.push(o));for(;r--;)e.splice(n[r],1)}return h=null,e},a=se.getText=function(e){var t,n="",r=0,o=e.nodeType;if(o){if(1===o||9===o||11===o){if("string"==typeof e.textContent)return e.textContent;for(e=e.firstChild;e;e=e.nextSibling)n+=a(e)}else if(3===o||4===o)return e.nodeValue}else for(;t=e[r++];)n+=a(t);return n},(l=se.selectors={cacheLength:50,createPseudo:fe,match:Q,attrHandle:{},find:{},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(e){return e[1]=e[1].replace(re,oe),e[3]=(e[3]||e[4]||e[5]||"").replace(re,oe),"~="===e[2]&&(e[3]=" "+e[3]+" "),e.slice(0,4)},CHILD:function(e){return e[1]=e[1].toLowerCase(),"nth"===e[1].slice(0,3)?(e[3]||se.error(e[0]),e[4]=+(e[4]?e[5]+(e[6]||1):2*("even"===e[3]||"odd"===e[3])),e[5]=+(e[7]+e[8]||"odd"===e[3])):e[3]&&se.error(e[0]),e},PSEUDO:function(e){var t,n=!e[6]&&e[2];return Q.CHILD.test(e[0])?null:(e[3]?e[2]=e[4]||e[5]||"":n&&J.test(n)&&(t=c(n,!0))&&(t=n.indexOf(")",n.length-t)-n.length)&&(e[0]=e[0].slice(0,t),e[2]=n.slice(0,t)),e.slice(0,3))}},filter:{TAG:function(e){var t=e.replace(re,oe).toLowerCase();return"*"===e?function(){return!0}:function(e){return e.nodeName&&e.nodeName.toLowerCase()===t}},CLASS:function(e){var t=A[e+" "];return t||(t=new RegExp("(^|"+U+")"+e+"("+U+"|$)"))&&A(e,function(e){return t.test("string"==typeof e.className&&e.className||void 0!==e.getAttribute&&e.getAttribute("class")||"")})},ATTR:function(e,t,n){return function(r){var o=se.attr(r,e);return null==o?"!="===t:!t||(o+="","="===t?o===n:"!="===t?o!==n:"^="===t?n&&0===o.indexOf(n):"*="===t?n&&o.indexOf(n)>-1:"$="===t?n&&o.slice(-n.length)===n:"~="===t?(" "+o.replace(F," ")+" ").indexOf(n)>-1:"|="===t&&(o===n||o.slice(0,n.length+1)===n+"-"))}},CHILD:function(e,t,n,r,o){var i="nth"!==e.slice(0,3),u="last"!==e.slice(-4),l="of-type"===t;return 1===r&&0===o?function(e){return!!e.parentNode}:function(t,n,a){var s,c,f,d,p,h,g=i!==u?"nextSibling":"previousSibling",m=t.parentNode,y=l&&t.nodeName.toLowerCase(),v=!a&&!l,b=!1;if(m){if(i){for(;g;){for(d=t;d=d[g];)if(l?d.nodeName.toLowerCase()===y:1===d.nodeType)return!1;h=g="only"===e&&!h&&"nextSibling"}return!0}if(h=[u?m.firstChild:m.lastChild],u&&v){for(b=(p=(s=(c=(f=(d=m)[N]||(d[N]={}))[d.uniqueID]||(f[d.uniqueID]={}))[e]||[])[0]===D&&s[1])&&s[2],d=p&&m.childNodes[p];d=++p&&d&&d[g]||(b=p=0)||h.pop();)if(1===d.nodeType&&++b&&d===t){c[e]=[D,p,b];break}}else if(v&&(b=p=(s=(c=(f=(d=t)[N]||(d[N]={}))[d.uniqueID]||(f[d.uniqueID]={}))[e]||[])[0]===D&&s[1]),!1===b)for(;(d=++p&&d&&d[g]||(b=p=0)||h.pop())&&((l?d.nodeName.toLowerCase()!==y:1!==d.nodeType)||!++b||(v&&((c=(f=d[N]||(d[N]={}))[d.uniqueID]||(f[d.uniqueID]={}))[e]=[D,b]),d!==t)););return(b-=o)===r||b%r==0&&b/r>=0}}},PSEUDO:function(e,t){var n,r=l.pseudos[e]||l.setFilters[e.toLowerCase()]||se.error("unsupported pseudo: "+e);return r[N]?r(t):r.length>1?(n=[e,e,"",t],l.setFilters.hasOwnProperty(e.toLowerCase())?fe(function(e,n){for(var o,i=r(e,t),u=i.length;u--;)e[o=q(e,i[u])]=!(n[o]=i[u])}):function(e){return r(e,0,n)}):r}},pseudos:{not:fe(function(e){var t=[],n=[],r=f(e.replace(K,"$1"));return r[N]?fe(function(e,t,n,o){for(var i,u=r(e,null,o,[]),l=e.length;l--;)(i=u[l])&&(e[l]=!(t[l]=i))}):function(e,o,i){return t[0]=e,r(t,null,i,n),t[0]=null,!n.pop()}}),has:fe(function(e){return function(t){return se(e,t).length>0}}),contains:fe(function(e){return e=e.replace(re,oe),function(t){return(t.textContent||t.innerText||a(t)).indexOf(e)>-1}}),lang:fe(function(e){return X.test(e||"")||se.error("unsupported lang: "+e),e=e.replace(re,oe).toLowerCase(),function(t){var n;do{if(n=b?t.lang:t.getAttribute("xml:lang")||t.getAttribute("lang"))return(n=n.toLowerCase())===e||0===n.indexOf(e+"-")}while((t=t.parentNode)&&1===t.nodeType);return!1}}),target:function(e){var t=o.location&&o.location.hash;return t&&t.slice(1)===e.id},root:function(e){return e===v},focus:function(e){return e===y.activeElement&&(!y.hasFocus||y.hasFocus())&&!!(e.type||e.href||~e.tabIndex)},enabled:ye(!1),disabled:ye(!0),checked:function(e){var t=e.nodeName.toLowerCase();return"input"===t&&!!e.checked||"option"===t&&!!e.selected},selected:function(e){return e.parentNode&&e.parentNode.selectedIndex,!0===e.selected},empty:function(e){for(e=e.firstChild;e;e=e.nextSibling)if(e.nodeType<6)return!1;return!0},parent:function(e){return!l.pseudos.empty(e)},header:function(e){return Z.test(e.nodeName)},input:function(e){return Y.test(e.nodeName)},button:function(e){var t=e.nodeName.toLowerCase();return"input"===t&&"button"===e.type||"button"===t},text:function(e){var t;return"input"===e.nodeName.toLowerCase()&&"text"===e.type&&(null==(t=e.getAttribute("type"))||"text"===t.toLowerCase())},first:ve(function(){return[0]}),last:ve(function(e,t){return[t-1]}),eq:ve(function(e,t,n){return[n<0?n+t:n]}),even:ve(function(e,t){for(var n=0;n<t;n+=2)e.push(n);return e}),odd:ve(function(e,t){for(var n=1;n<t;n+=2)e.push(n);return e}),lt:ve(function(e,t,n){for(var r=n<0?n+t:n;--r>=0;)e.push(r);return e}),gt:ve(function(e,t,n){for(var r=n<0?n+t:n;++r<t;)e.push(r);return e})}}).pseudos.nth=l.pseudos.eq,{radio:!0,checkbox:!0,file:!0,password:!0,image:!0})l.pseudos[i]=ge(i);for(i in{submit:!0,reset:!0})l.pseudos[i]=me(i);function we(){}function xe(e){for(var t=0,n=e.length,r="";t<n;t++)r+=e[t].value;return r}function Ee(e,t,n){var r=t.dir,o=t.next,i=o||r,u=n&&"parentNode"===i,l=T++;return t.first?function(t,n,o){for(;t=t[r];)if(1===t.nodeType||u)return e(t,n,o);return!1}:function(t,n,a){var s,c,f,d=[D,l];if(a){for(;t=t[r];)if((1===t.nodeType||u)&&e(t,n,a))return!0}else for(;t=t[r];)if(1===t.nodeType||u)if(c=(f=t[N]||(t[N]={}))[t.uniqueID]||(f[t.uniqueID]={}),o&&o===t.nodeName.toLowerCase())t=t[r]||t;else{if((s=c[i])&&s[0]===D&&s[1]===l)return d[2]=s[2];if(c[i]=d,d[2]=e(t,n,a))return!0}return!1}}function Ce(e){return e.length>1?function(t,n,r){for(var o=e.length;o--;)if(!e[o](t,n,r))return!1;return!0}:e[0]}function Ne(e,t,n,r,o){for(var i,u=[],l=0,a=e.length,s=null!=t;l<a;l++)(i=e[l])&&(n&&!n(i,r,o)||(u.push(i),s&&t.push(l)));return u}function Se(e,t,n,r,o,i){return r&&!r[N]&&(r=Se(r)),o&&!o[N]&&(o=Se(o,i)),fe(function(i,u,l,a){var s,c,f,d=[],p=[],h=u.length,g=i||function(e,t,n){for(var r=0,o=t.length;r<o;r++)se(e,t[r],n);return n}(t||"*",l.nodeType?[l]:l,[]),m=!e||!i&&t?g:Ne(g,d,e,l,a),y=n?o||(i?e:h||r)?[]:u:m;if(n&&n(m,y,l,a),r)for(s=Ne(y,p),r(s,[],l,a),c=s.length;c--;)(f=s[c])&&(y[p[c]]=!(m[p[c]]=f));if(i){if(o||e){if(o){for(s=[],c=y.length;c--;)(f=y[c])&&s.push(m[c]=f);o(null,y=[],s,a)}for(c=y.length;c--;)(f=y[c])&&(s=o?q(i,f):d[c])>-1&&(i[s]=!(u[s]=f))}}else y=Ne(y===u?y.splice(h,y.length):y),o?o(null,u,y,a):$.apply(u,y)})}function De(e){for(var t,n,r,o=e.length,i=l.relative[e[0].type],u=i||l.relative[" "],a=i?1:0,s=Ee(function(e){return e===t},u,!0),c=Ee(function(e){return q(t,e)>-1},u,!0),f=[function(e,n,r){var o=!i&&(r||n!==p)||((t=n).nodeType?s(e,n,r):c(e,n,r));return t=null,o}];a<o;a++)if(n=l.relative[e[a].type])f=[Ee(Ce(f),n)];else{if((n=l.filter[e[a].type].apply(null,e[a].matches))[N]){for(r=++a;r<o&&!l.relative[e[r].type];r++);return Se(a>1&&Ce(f),a>1&&xe(e.slice(0,a-1).concat({value:" "===e[a-2].type?"*":""})).replace(K,"$1"),n,a<r&&De(e.slice(a,r)),r<o&&De(e=e.slice(r)),r<o&&xe(e))}f.push(n)}return Ce(f)}we.prototype=l.filters=l.pseudos,l.setFilters=new we,c=se.tokenize=function(e,t){var n,r,o,i,u,a,s,c=L[e+" "];if(c)return t?0:c.slice(0);for(u=e,a=[],s=l.preFilter;u;){for(i in n&&!(r=G.exec(u))||(r&&(u=u.slice(r[0].length)||u),a.push(o=[])),n=!1,(r=V.exec(u))&&(n=r.shift(),o.push({value:n,type:r[0].replace(K," ")}),u=u.slice(n.length)),l.filter)!(r=Q[i].exec(u))||s[i]&&!(r=s[i](r))||(n=r.shift(),o.push({value:n,type:i,matches:r}),u=u.slice(n.length));if(!n)break}return t?u.length:u?se.error(e):L(e,a).slice(0)},f=se.compile=function(e,t){var n,r=[],o=[],i=M[e+" "];if(!i){for(t||(t=c(e)),n=t.length;n--;)(i=De(t[n]))[N]?r.push(i):o.push(i);(i=M(e,function(e,t){var n=t.length>0,r=e.length>0,o=function(o,i,u,a,s){var c,f,d,h=0,g="0",v=o&&[],w=[],x=p,E=o||r&&l.find.TAG("*",s),C=D+=null==x?1:Math.random()||.1,N=E.length;for(s&&(p=i===y||i||s);g!==N&&null!=(c=E[g]);g++){if(r&&c){for(f=0,i||c.ownerDocument===y||(m(c),u=!b);d=e[f++];)if(d(c,i||y,u)){a.push(c);break}s&&(D=C)}n&&((c=!d&&c)&&h--,o&&v.push(c))}if(h+=g,n&&g!==h){for(f=0;d=t[f++];)d(v,w,i,u);if(o){if(h>0)for(;g--;)v[g]||w[g]||(w[g]=O.call(a));w=Ne(w)}$.apply(a,w),s&&!o&&w.length>0&&h+t.length>1&&se.uniqueSort(a)}return s&&(D=C,p=x),v};return n?fe(o):o}(o,r))).selector=e}return i},d=se.select=function(e,t,n,r){var o,i,u,a,s,d="function"==typeof e&&e,p=!r&&c(e=d.selector||e);if(n=n||[],1===p.length){if((i=p[0]=p[0].slice(0)).length>2&&"ID"===(u=i[0]).type&&9===t.nodeType&&b&&l.relative[i[1].type]){if(!(t=(l.find.ID(u.matches[0].replace(re,oe),t)||[])[0]))return n;d&&(t=t.parentNode),e=e.slice(i.shift().value.length)}for(o=Q.needsContext.test(e)?0:i.length;o--&&(u=i[o],!l.relative[a=u.type]);)if((s=l.find[a])&&(r=s(u.matches[0].replace(re,oe),ne.test(i[0].type)&&be(t.parentNode)||t))){if(i.splice(o,1),!(e=r.length&&xe(i)))return $.apply(n,r),n;break}}return(d||f(e,p))(r,t,!b,n,!t||ne.test(e)&&be(t.parentNode)||t),n},u.sortStable=N.split("").sort(P).join("")===N,u.detectDuplicates=!!g,m(),u.sortDetached=de(function(e){return 1&e.compareDocumentPosition(y.createElement("fieldset"))}),de(function(e){return e.innerHTML="<a href='#'></a>","#"===e.firstChild.getAttribute("href")})||pe("type|href|height|width",function(e,t,n){if(!n)return e.getAttribute(t,"type"===t.toLowerCase()?1:2)}),u.attributes&&de(function(e){return e.innerHTML="<input/>",e.firstChild.setAttribute("value",""),""===e.firstChild.getAttribute("value")})||pe("value",function(e,t,n){if(!n&&"input"===e.nodeName.toLowerCase())return e.defaultValue}),de(function(e){return null==e.getAttribute("disabled")})||pe(j,function(e,t,n){var r;if(!n)return!0===e[t]?t.toLowerCase():(r=e.getAttributeNode(t))&&r.specified?r.value:null});var Te=o.Sizzle;se.noConflict=function(){return o.Sizzle===se&&(o.Sizzle=Te),se},void 0===(r=function(){return se}.call(t,n,t,e))||(e.exports=r)}(window)},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e){e.load=async function(e){const t=await browser.storage.local.get()||{};let n=new e;return n=Object.assign(n,t),Promise.resolve(n)},e.save=async function(e){return browser.storage.local.set(e)}}(t.SettingsLoader||(t.SettingsLoader={}))},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(8);t.WebextMain=class{main(){r.Domready.onReady(()=>this.onExecuteMain())}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e){e.onReady=function(e){if(null===document)return void console.log("document undefined. not importing domready.");n(9)(e)}}(t.Domready||(t.Domready={}))},function(e,t,n){
/*!
  * domready (c) Dustin Diaz 2014 - License MIT
  */
e.exports=function(){var e,t=[],n=document,r=(n.documentElement.doScroll?/^loaded|^c/:/^loaded|^i|^c/).test(n.readyState);return r||n.addEventListener("DOMContentLoaded",e=function(){for(n.removeEventListener("DOMContentLoaded",e),r=1;e=t.shift();)e()}),function(e){r?setTimeout(e,0):t.push(e)}}()},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(1),o=n(14);class i{constructor(e="deprecated",t="https://redmine.n-design.de",n=u,r=!1){this.url=e,this.baseUrl=t,this.rules=n,this.hiddenComments=r}static fromJson(e){const t=Object.assign(new i,e);return this.migrate_v101_v102(t),t}static migrate_v101_v102(e){e.rules.filter(e=>null==e.enabled).forEach(e=>e.enabled=!0)}}t.Settings=i;const u=[new o.Rule(r(),'Grüne Färbung für Tickets mit Status "In Bearbeitung"','td.status:contains("In Bearbeitung")',{color:"#278753"},!0),new o.Rule(r(),'Rote Färbung und Fettdruck für Tickets mit Status "Gelöst"','td.status:contains("Gelöst")',{"font-weight":"bold",color:"#f44242"},!0),new o.Rule(r(),'Ausgrauen von Tickets mit Status "Erledigt"','tr:has(td.status:contains("Erledigt"))',{opacity:"0.5"},!0),new o.Rule(r(),"Hervorheben des Tickets, das ich in Bearbeitung habe",'tr:has(td.status:contains("In Bearbeitung")):has(td.assigned_to:contains("Marco Oetz"))',{"background-color":"#d3e0ed"},!0)]},function(e,t,n){(function(t){var n,r=t.crypto||t.msCrypto;if(r&&r.getRandomValues){var o=new Uint8Array(16);n=function(){return r.getRandomValues(o),o}}if(!n){var i=new Array(16);n=function(){for(var e,t=0;t<16;t++)0==(3&t)&&(e=4294967296*Math.random()),i[t]=e>>>((3&t)<<3)&255;return i}}e.exports=n}).call(this,n(12))},function(e,t){var n;n=function(){return this}();try{n=n||Function("return this")()||(0,eval)("this")}catch(e){"object"==typeof window&&(n=window)}e.exports=n},function(e,t){for(var n=[],r=0;r<256;++r)n[r]=(r+256).toString(16).substr(1);e.exports=function(e,t){var r=t||0,o=n;return o[e[r++]]+o[e[r++]]+o[e[r++]]+o[e[r++]]+"-"+o[e[r++]]+o[e[r++]]+"-"+o[e[r++]]+o[e[r++]]+"-"+o[e[r++]]+o[e[r++]]+"-"+o[e[r++]]+o[e[r++]]+o[e[r++]]+o[e[r++]]+o[e[r++]]+o[e[r++]]}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(1);class o{constructor(e,t,n,r,o=!0){this.id=e,this.note=t,this.selector=n,this.css=r,this.enabled=o}static empty(){return new o(r(),"","",{},!0)}}t.Rule=o}]);