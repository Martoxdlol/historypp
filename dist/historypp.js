!function(t,e){if("object"==typeof exports&&"object"==typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var r=e();for(var n in r)("object"==typeof exports?exports:t)[n]=r[n]}}(self,(function(){return function(){"use strict";var t={849:function(t){t.exports=function(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,n=new Array(e);r<e;r++)n[r]=t[r];return n},t.exports.default=t.exports,t.exports.__esModule=!0},168:function(t,e,r){var n=r(849);t.exports=function(t){if(Array.isArray(t))return n(t)},t.exports.default=t.exports,t.exports.__esModule=!0},564:function(t){function e(t,e,r,n,o,i,s){try{var a=t[i](s),u=a.value}catch(t){return void r(t)}a.done?e(u):Promise.resolve(u).then(n,o)}t.exports=function(t){return function(){var r=this,n=arguments;return new Promise((function(o,i){var s=t.apply(r,n);function a(t){e(s,o,i,a,u,"next",t)}function u(t){e(s,o,i,a,u,"throw",t)}a(void 0)}))}},t.exports.default=t.exports,t.exports.__esModule=!0},946:function(t){t.exports=function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")},t.exports.default=t.exports,t.exports.__esModule=!0},33:function(t){function e(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}t.exports=function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t},t.exports.default=t.exports,t.exports.__esModule=!0},837:function(t){t.exports=function(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t},t.exports.default=t.exports,t.exports.__esModule=!0},424:function(t){t.exports=function(t){return t&&t.__esModule?t:{default:t}},t.exports.default=t.exports,t.exports.__esModule=!0},519:function(t,e,r){var n=r(924).default;function o(){if("function"!=typeof WeakMap)return null;var t=new WeakMap;return o=function(){return t},t}t.exports=function(t){if(t&&t.__esModule)return t;if(null===t||"object"!==n(t)&&"function"!=typeof t)return{default:t};var e=o();if(e&&e.has(t))return e.get(t);var r={},i=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var s in t)if(Object.prototype.hasOwnProperty.call(t,s)){var a=i?Object.getOwnPropertyDescriptor(t,s):null;a&&(a.get||a.set)?Object.defineProperty(r,s,a):r[s]=t[s]}return r.default=t,e&&e.set(t,r),r},t.exports.default=t.exports,t.exports.__esModule=!0},26:function(t){t.exports=function(t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)},t.exports.default=t.exports,t.exports.__esModule=!0},2:function(t){t.exports=function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")},t.exports.default=t.exports,t.exports.__esModule=!0},918:function(t,e,r){var n=r(168),o=r(26),i=r(288),s=r(2);t.exports=function(t){return n(t)||o(t)||i(t)||s()},t.exports.default=t.exports,t.exports.__esModule=!0},924:function(t){function e(r){return"function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?(t.exports=e=function(t){return typeof t},t.exports.default=t.exports,t.exports.__esModule=!0):(t.exports=e=function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},t.exports.default=t.exports,t.exports.__esModule=!0),e(r)}t.exports=e,t.exports.default=t.exports,t.exports.__esModule=!0},288:function(t,e,r){var n=r(849);t.exports=function(t,e){if(t){if("string"==typeof t)return n(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);return"Object"===r&&t.constructor&&(r=t.constructor.name),"Map"===r||"Set"===r?Array.from(t):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?n(t,e):void 0}},t.exports.default=t.exports,t.exports.__esModule=!0},264:function(t,e,r){t.exports=r(588)},588:function(t,e,r){t=r.nmd(t);var n=r(424)(r(924)),o=function(t){var e,r=Object.prototype,o=r.hasOwnProperty,i="function"==typeof Symbol?Symbol:{},s=i.iterator||"@@iterator",a=i.asyncIterator||"@@asyncIterator",u=i.toStringTag||"@@toStringTag";function l(t,e,r){return Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{l({},"")}catch(t){l=function(t,e,r){return t[e]=r}}function c(t,e,r,n){var o=e&&e.prototype instanceof m?e:m,i=Object.create(o.prototype),s=new R(n||[]);return i._invoke=function(t,e,r){var n=h;return function(o,i){if(n===d)throw new Error("Generator is already running");if(n===y){if("throw"===o)throw i;return U()}for(r.method=o,r.arg=i;;){var s=r.delegate;if(s){var a=O(s,r);if(a){if(a===v)continue;return a}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if(n===h)throw n=y,r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);n=d;var u=f(t,e,r);if("normal"===u.type){if(n=r.done?y:p,u.arg===v)continue;return{value:u.arg,done:r.done}}"throw"===u.type&&(n=y,r.method="throw",r.arg=u.arg)}}}(t,r,s),i}function f(t,e,r){try{return{type:"normal",arg:t.call(e,r)}}catch(t){return{type:"throw",arg:t}}}t.wrap=c;var h="suspendedStart",p="suspendedYield",d="executing",y="completed",v={};function m(){}function b(){}function g(){}var w={};w[s]=function(){return this};var x=Object.getPrototypeOf,_=x&&x(x(S([])));_&&_!==r&&o.call(_,s)&&(w=_);var k=g.prototype=m.prototype=Object.create(w);function L(t){["next","throw","return"].forEach((function(e){l(t,e,(function(t){return this._invoke(e,t)}))}))}function P(t,e){function r(i,s,a,u){var l=f(t[i],t,s);if("throw"!==l.type){var c=l.arg,h=c.value;return h&&"object"===(0,n.default)(h)&&o.call(h,"__await")?e.resolve(h.__await).then((function(t){r("next",t,a,u)}),(function(t){r("throw",t,a,u)})):e.resolve(h).then((function(t){c.value=t,a(c)}),(function(t){return r("throw",t,a,u)}))}u(l.arg)}var i;this._invoke=function(t,n){function o(){return new e((function(e,o){r(t,n,e,o)}))}return i=i?i.then(o,o):o()}}function O(t,r){var n=t.iterator[r.method];if(n===e){if(r.delegate=null,"throw"===r.method){if(t.iterator.return&&(r.method="return",r.arg=e,O(t,r),"throw"===r.method))return v;r.method="throw",r.arg=new TypeError("The iterator does not provide a 'throw' method")}return v}var o=f(n,t.iterator,r.arg);if("throw"===o.type)return r.method="throw",r.arg=o.arg,r.delegate=null,v;var i=o.arg;return i?i.done?(r[t.resultName]=i.value,r.next=t.nextLoc,"return"!==r.method&&(r.method="next",r.arg=e),r.delegate=null,v):i:(r.method="throw",r.arg=new TypeError("iterator result is not an object"),r.delegate=null,v)}function E(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function j(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function R(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(E,this),this.reset(!0)}function S(t){if(t){var r=t[s];if(r)return r.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var n=-1,i=function r(){for(;++n<t.length;)if(o.call(t,n))return r.value=t[n],r.done=!1,r;return r.value=e,r.done=!0,r};return i.next=i}}return{next:U}}function U(){return{value:e,done:!0}}return b.prototype=k.constructor=g,g.constructor=b,b.displayName=l(g,u,"GeneratorFunction"),t.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===b||"GeneratorFunction"===(e.displayName||e.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,g):(t.__proto__=g,l(t,u,"GeneratorFunction")),t.prototype=Object.create(k),t},t.awrap=function(t){return{__await:t}},L(P.prototype),P.prototype[a]=function(){return this},t.AsyncIterator=P,t.async=function(e,r,n,o,i){void 0===i&&(i=Promise);var s=new P(c(e,r,n,o),i);return t.isGeneratorFunction(r)?s:s.next().then((function(t){return t.done?t.value:s.next()}))},L(k),l(k,u,"Generator"),k[s]=function(){return this},k.toString=function(){return"[object Generator]"},t.keys=function(t){var e=[];for(var r in t)e.push(r);return e.reverse(),function r(){for(;e.length;){var n=e.pop();if(n in t)return r.value=n,r.done=!1,r}return r.done=!0,r}},t.values=S,R.prototype={constructor:R,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=e,this.done=!1,this.delegate=null,this.method="next",this.arg=e,this.tryEntries.forEach(j),!t)for(var r in this)"t"===r.charAt(0)&&o.call(this,r)&&!isNaN(+r.slice(1))&&(this[r]=e)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var r=this;function n(n,o){return a.type="throw",a.arg=t,r.next=n,o&&(r.method="next",r.arg=e),!!o}for(var i=this.tryEntries.length-1;i>=0;--i){var s=this.tryEntries[i],a=s.completion;if("root"===s.tryLoc)return n("end");if(s.tryLoc<=this.prev){var u=o.call(s,"catchLoc"),l=o.call(s,"finallyLoc");if(u&&l){if(this.prev<s.catchLoc)return n(s.catchLoc,!0);if(this.prev<s.finallyLoc)return n(s.finallyLoc)}else if(u){if(this.prev<s.catchLoc)return n(s.catchLoc,!0)}else{if(!l)throw new Error("try statement without catch or finally");if(this.prev<s.finallyLoc)return n(s.finallyLoc)}}}},abrupt:function(t,e){for(var r=this.tryEntries.length-1;r>=0;--r){var n=this.tryEntries[r];if(n.tryLoc<=this.prev&&o.call(n,"finallyLoc")&&this.prev<n.finallyLoc){var i=n;break}}i&&("break"===t||"continue"===t)&&i.tryLoc<=e&&e<=i.finallyLoc&&(i=null);var s=i?i.completion:{};return s.type=t,s.arg=e,i?(this.method="next",this.next=i.finallyLoc,v):this.complete(s)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),v},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.finallyLoc===t)return this.complete(r.completion,r.afterLoc),j(r),v}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.tryLoc===t){var n=r.completion;if("throw"===n.type){var o=n.arg;j(r)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(t,r,n){return this.delegate={iterator:S(t),resultName:r,nextLoc:n},"next"===this.method&&(this.arg=e),v}},t}("object"===(0,n.default)(t)?t.exports:{});try{regeneratorRuntime=o}catch(t){Function("r","regeneratorRuntime = r")(o)}},25:function(t,e){Object.defineProperty(e,"__esModule",{value:!0}),e.typeToAction=function(t){return{forward:"Forward",backward:"Back",back:"Back",push:"Push",navigate:"Push",replace:"Replace",pop:"Pop"}[t.toLowerCase()]},e.default=void 0;e.default={Pop:"POP",Push:"PUSH",Replace:"REPLACE",Back:"POP",Forward:"POP",Exit:"POP"}},809:function(t,e,r){var n=r(424);function o(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,n=new Array(e);r<e;r++)n[r]=t[r];return n}Object.defineProperty(e,"__esModule",{value:!0}),e.default=function(){var t=this;this.blockBack=function(e){return t.blockedBackList.push(e),function(){t.blockedBackList=t.blockedBackList.filter((function(t){return t!==e}))}},this.block=function(e){return t.blockedList.push(e),function(){t.blockedList=t.blockedList.filter((function(t){return t!==e}))}},this.testBlocked=function(e,r){if(!t.blocked)return!1;if(t.blockedBackList[0]&&"Back"==e)t.blockedBackList[0](r);else{var n,i=function(t,e){var r;if("undefined"==typeof Symbol||null==t[Symbol.iterator]){if(Array.isArray(t)||(r=function(t,e){if(t){if("string"==typeof t)return o(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);return"Object"===r&&t.constructor&&(r=t.constructor.name),"Map"===r||"Set"===r?Array.from(t):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?o(t,e):void 0}}(t))){r&&(t=r);var n=0,i=function(){};return{s:i,n:function(){return n>=t.length?{done:!0}:{done:!1,value:t[n++]}},e:function(t){throw t},f:i}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var s,a=!0,u=!1;return{s:function(){r=t[Symbol.iterator]()},n:function(){var t=r.next();return a=t.done,t},e:function(t){u=!0,s=t},f:function(){try{a||null==r.return||r.return()}finally{if(u)throw s}}}}(t.blockedList);try{for(i.s();!(n=i.n()).done;)(0,n.value)(r)}catch(t){i.e(t)}finally{i.f()}}return!0}},n(r(25))},354:function(t,e,r){var n=r(519),o=r(424);Object.defineProperty(e,"__esModule",{value:!0}),e.default=function(t){var e=new d;e.history=t,t.eventEmitter=e,t.eventHandlers=e.eventHandlers,t.addEventListener=e.addEventListener,t.removeEventListener=e.removeEventListener,t.listen=e.listen,t.emit=e.emit,t.makeEvent=e.makeEvent,t.launchEvent=e.launchEvent};var i=o(r(837)),s=o(r(946)),a=o(r(33)),u=n(r(25)),l=r(319);function c(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function f(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?c(Object(r),!0).forEach((function(e){(0,i.default)(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):c(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}function h(t,e){var r;if("undefined"==typeof Symbol||null==t[Symbol.iterator]){if(Array.isArray(t)||(r=function(t,e){if(t){if("string"==typeof t)return p(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);return"Object"===r&&t.constructor&&(r=t.constructor.name),"Map"===r||"Set"===r?Array.from(t):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?p(t,e):void 0}}(t))||e&&t&&"number"==typeof t.length){r&&(t=r);var n=0,o=function(){};return{s:o,n:function(){return n>=t.length?{done:!0}:{done:!1,value:t[n++]}},e:function(t){throw t},f:o}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var i,s=!0,a=!1;return{s:function(){r=t[Symbol.iterator]()},n:function(){var t=r.next();return s=t.done,t},e:function(t){a=!0,i=t},f:function(){try{s||null==r.return||r.return()}finally{if(a)throw i}}}}function p(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,n=new Array(e);r<e;r++)n[r]=t[r];return n}var d=function(){function t(){(0,s.default)(this,t),this.eventHandlers={}}return(0,a.default)(t,[{key:"on",value:function(t,e){return this.addEventListener(t,e)}},{key:"addEventListener",value:function(t,e){var r=this;return this.eventHandlers[t]||(this.eventHandlers[t]=new Set),this.eventHandlers[t].add(e),function(){r.removeEventListener(t,e)}}},{key:"removeEventListener",value:function(t,e){this.eventHandlers[t]||(this.eventHandlers[t]=new Set),this.eventHandlers[t].delete(e)}},{key:"listen",value:function(t){var e=this;return this.addEventListener("listen",t),function(){e.removeEventListener("listen",t)}}},{key:"emit",value:function(t){var e;this.eventHandlers[t]||(this.eventHandlers[t]=new Set),this.eventHandlers.listen||(this.eventHandlers.listen=new Set);for(var r=!1,n=arguments.length,o=new Array(n>1?n-1:0),i=1;i<n;i++)o[i-1]=arguments[i];var s,a=o[0],u=h(this.eventHandlers.listen);try{for(u.s();!(s=u.n()).done;){var l=s.value;l(a)}}catch(t){u.e(t)}finally{u.f()}var c,f=h(this.eventHandlers[t]);try{for(f.s();!(c=f.n()).done;){var p=c.value;if(a.setCancelled=function(t){r=!!t},a.cancel=function(){r=!0,e=!0},a.stopPropagation=function(){e=!0},a.__defineGetter__("cancelled",(function(){return r})),p.apply(this,o),e)break}}catch(t){f.e(t)}finally{f.f()}return r}},{key:"makeEvent",value:function(t,e){var r=e.position||this.position,n=e.type||t,o=u.default[(0,u.typeToAction)(n)];return new l.HistoryEvent(f(f({},e),{},{history:this,position:r,type:n,action:o}))}},{key:"launchEvent",value:function(t,e){return this.emit(t,makeEvent(t,e))}}]),t}()},319:function(t,e,r){var n=r(424);Object.defineProperty(e,"__esModule",{value:!0}),e.HistoryEvent=void 0;var o=n(r(946)),i=n(r(33)),s=function(){function t(e){var r;(0,o.default)(this,t),this.history=e.history,this.type=e.type,this.action=e.action,this.location=e.location,this.lastPosition=e.lastPosition,this._position=null!==(r=e.position)&&void 0!==r?r:e.history.position,this.route=e.history.last,this.replaced=e.replaced,this.isNewRoute=!!e.isNewRoute}return(0,i.default)(t,[{key:"position",get:function(){return this._position}},{key:"movement",get:function(){return this.position-this.lastPosition}},{key:"last",get:function(){return this.history.list[this.lastPosition]}},{key:"retry",value:function(){"push"==this.type?this.history.push(this.route):"back"==this.type?this.history.back():"forward"==this.type?this.history.forward():"exit"==this.type&&this.history.exit()}}]),t}();e.HistoryEvent=s},959:function(t,e,r){var n=r(424);Object.defineProperty(e,"__esModule",{value:!0}),e.default=function(t){var e=this;t.addEventListener("backward",(function(r){var n=e.position;if(0==e.position){var o=e.makeEvent("exit",{lastPosition:n,position:e.position,location:r.location});e.testBlocked("Exit",o)||e.emit("exit",o)||t.exit()}else{e.position--;var i=e.makeEvent("back",{lastPosition:n,position:e.position,location:r.location});(e.testBlocked("Back",i)||e.emit("back",i))&&(e.position=n)}t.url=e.url})),t.addEventListener("forward",(function(r){if(e.position<e.last.position){var n=e.position;e.position++;var o=e.makeEvent("forward",{lastPosition:n,position:e.position,location:r.location});e.testBlocked("Forward",o)||e.emit("forward",o)?e.position=n:t.url=e.current.url}e.current==e.last&&t.disableForwardButton(),t.url=e.url})),t.addEventListener("navigate",(function(r){var n=e.position,o=null;e._push(r.url,o,null);var i=e.makeEvent("push",{lastPosition:n,position:e.position,location:r.location,setState:function(t){o=t},isNewRoute:!0});e.testBlocked("Push",i)||e.emit("push",i)?(e._pop(),e.position=n):t.disableForwardButton(),t.url=e.url}))},n(r(25))},575:function(t,e,r){var n=r(424);Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o=n(r(837)),i=n(r(946)),s=n(r(33));function a(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,n=new Array(e);r<e;r++)n[r]=t[r];return n}function u(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function l(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?u(Object(r),!0).forEach((function(e){(0,o.default)(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):u(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}var c={},f=function(){function t(e,r,n){(0,i.default)(this,t),this.state=r,this._url=e,this.options=l(l({},c),n)}return(0,s.default)(t,[{key:"mount",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"";this.URL=new URL(this.url,new URL(e,location.href)),this.history=t}},{key:"url",get:function(){return this.URL?this.URL.pathname+this.URL.search+this.URL.hash:this._url},set:function(t){this.URL?this.URL=new URL(t,this.URL):this._url=t}},{key:"_tryURL",value:function(){if(!this.URL)throw new TypeError("Route should be mounted first")}},{key:"position",get:function(){return this.history.list.indexOf(this)}},{key:"href",get:function(){return this._tryURL(),this.URL.href}},{key:"pathname",get:function(){return this._tryURL(),this.URL.pathname}},{key:"search",get:function(){return this._tryURL(),this.URL.search}},{key:"hash",get:function(){return this._tryURL(),this.URL.hash}},{key:"query",get:function(){this._tryURL();var t,e={},r=function(t,e){var r;if("undefined"==typeof Symbol||null==t[Symbol.iterator]){if(Array.isArray(t)||(r=function(t,e){if(t){if("string"==typeof t)return a(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);return"Object"===r&&t.constructor&&(r=t.constructor.name),"Map"===r||"Set"===r?Array.from(t):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?a(t,e):void 0}}(t))||e&&t&&"number"==typeof t.length){r&&(t=r);var n=0,o=function(){};return{s:o,n:function(){return n>=t.length?{done:!0}:{done:!1,value:t[n++]}},e:function(t){throw t},f:o}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var i,s=!0,u=!1;return{s:function(){r=t[Symbol.iterator]()},n:function(){var t=r.next();return s=t.done,t},e:function(t){u=!0,i=t},f:function(){try{s||null==r.return||r.return()}finally{if(u)throw i}}}}(this.URL.searchParams.keys());try{for(r.s();!(t=r.n()).done;){var n=t.value;e[n]=this.URL.searchParams.get(n)}}catch(t){r.e(t)}finally{r.f()}}}]),t}();e.default=f}},e={};function r(n){var o=e[n];if(void 0!==o)return o.exports;var i=e[n]={id:n,loaded:!1,exports:{}};return t[n](i,i.exports,r),i.loaded=!0,i.exports}r.nmd=function(t){return t.paths=[],t.children||(t.children=[]),t};var n={};return function(){var t=n,e=r(424);Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"Action",{enumerable:!0,get:function(){return p.default}}),t.default=void 0;var o=e(r(264)),i=e(r(918)),s=e(r(564)),a=e(r(946)),u=e(r(33)),l=e(r(575)),c=e(r(959)),f=e(r(354)),h=e(r(809)),p=e(r(25)),d=function(){function t(e){(0,a.default)(this,t),this.historyController=e,this._list=[],c.default.bind(this)(e),h.default.bind(this)(),(0,f.default)(this),this._push(location.href),this.blockedList=[],this.blockedBackList=[]}var e;return(0,u.default)(t,[{key:"_getRoute",value:function(t,e){var r;return t instanceof l.default?(r=t,null!=e&&(r.state=e)):r=new l.default(t.toString(),e),r}},{key:"_push",value:function(t,e,r){var n=this._getRoute(t,e,r);n.mount(this,this.url),this._list.push(n),this.position=n.position}},{key:"push",value:(e=(0,s.default)(o.default.mark((function t(e,r,n){var i,s;return o.default.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:i=this.position,this._push(e,r,n),s=this.makeEvent("push",{lastPosition:i,position:this.position,location:new URL(this.current.URL),isNewRoute:!0}),this.testBlocked("Push",s)||this.emit("push",s)?this._pop(this.last.position):this.historyController.url=this.current.url;case 5:case"end":return t.stop()}}),t,this)}))),function(t,r,n){return e.apply(this,arguments)})},{key:"insert",value:function(e,r,n,o){var s;t._verifyPos(e,this.length-1);var a=this._getRoute(r,n,o),u=this._list.splice(e),l=this.url;this.last&&(l=this.last.url),a.mount(this,l),this._list.push(a),(s=this._list).push.apply(s,(0,i.default)(u));var c=this.position;e<this.position&&this.position++;var f=this.makeEvent("insert",{lastPosition:c,position:this.position,location:new URL(this.current.URL),isNewRoute:!0});if(!this.emit("insert",f))return a;this.list=this.list.filter((function(t){return t!=a})),this.position=c}},{key:"replace",value:function(e,r,n,o){t._verifyPos(e,this.length-1);var i=this._getRoute(r,n,o),s=this._list[e];i.mount(this,s.url),this._list[e]=i;var a=this.makeEvent("replace",{lastPosition:lastPosition,replaced:s,position:this.position,location:new URL(this.current.URL),isNewRoute:!0});(this.testBlocked("Replace",a)||this.emit("replace",a))&&(this._list[e]=s)}},{key:"_pop",value:function(e){if(t._verifyPos(e,this.length-1),this.length<=1)throw new TypeError("History list cannot be empty");var r=this._list[e];return this._list.splice(e,1),r}},{key:"pop",value:function(t){t||(t=this.last.position),this.position;var e=this._pop(t);return(t==this.position||t<this.position)&&this.position--,this.historyController.url=this.url,e}},{key:"current",get:function(){return this._list[this.position]}},{key:"url",get:function(){return this.current?this.current.url:location.href}},{key:"list",get:function(){return this._list}},{key:"length",get:function(){return this._list.length}},{key:"last",get:function(){return this._list[this._list.length-1]}},{key:"blocked",get:function(){return!!this.blockedList.length}}],[{key:"_verifyPos",value:function(t,e){if(!Number.isInteger(t))throw new TypeError("Position isn't a integer");if(t<0)throw new TypeError("Position is lower than 0");if(t>e)throw new TypeError("Position is bigger than max")}}]),t}();"undefined"!=typeof window&&(window.HistoryPP=d);var y=d;t.default=y}(),n}()}));