!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.EditorJSStyle=e():t.EditorJSStyle=e()}(window,(function(){return function(t){var e={};function n(o){if(e[o])return e[o].exports;var r=e[o]={i:o,l:!1,exports:{}};return t[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}return n.m=t,n.c=e,n.d=function(t,e,o){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:o})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)n.d(o,r,function(e){return t[e]}.bind(null,r));return o},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=0)}([function(t,e,n){"use strict";n.r(e);var o=function(){function t(t){var e=t.api;this.actions=document.createElement("div"),this.api=e,this.button=this.createButton()}return Object.defineProperty(t,"isInline",{get:function(){return!0},enumerable:!1,configurable:!0}),Object.defineProperty(t,"sanitize",{get:function(){return{span:!0}},enumerable:!1,configurable:!0}),Object.defineProperty(t,"title",{get:function(){return"Style"},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"shortcut",{get:function(){return"CMD+S"},enumerable:!1,configurable:!0}),t.prototype.checkState=function(){var t,e=this.api.selection.findParentTag("SPAN","editorjs-style");if(this.button.classList.toggle(this.api.styles.inlineToolButtonActive,Boolean(e)),this.actions.innerHTML="",e){this.actions.appendChild(document.createTextNode("Style"));var n=document.createElement("input");n.classList.add(this.api.styles.input),n.value=null!==(t=e.getAttribute("style"))&&void 0!==t?t:"",n.addEventListener("input",(function(){return e.setAttribute("style",n.value)})),this.actions.appendChild(n)}return Boolean(e)},t.prototype.clear=function(){this.actions.innerHTML=""},t.prototype.render=function(){return this.button},t.prototype.renderActions=function(){return this.actions},t.prototype.surround=function(t){var e=document.createElement("span");e.classList.add("editorjs-style"),e.appendChild(t.extractContents()),t.insertNode(e),this.api.selection.expandToTag(e)},t.prototype.createButton=function(){var t=document.createElement("button");return t.classList.add(this.api.styles.inlineToolButton),t.type="button",t.innerHTML='\n      <svg class="icon" viewBox="0 0 24 24">\n        <path d="M0 0h24v24H0z" fill="none"/>\n        <path d="M2.53 19.65l1.34.56v-9.03l-2.43 5.86c-.41 1.02.08 2.19 1.09 2.61zm19.5-3.7L17.07 3.98c-.31-.75-1.04-1.21-1.81-1.23-.26 0-.53.04-.79.15L7.1 5.95c-.75.31-1.21 1.03-1.23 1.8-.01.27.04.54.15.8l4.96 11.97c.31.76 1.05 1.22 1.83 1.23.26 0 .52-.05.77-.15l7.36-3.05c1.02-.42 1.51-1.59 1.09-2.6zM7.88 8.75c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm-2 11c0 1.1.9 2 2 2h1.45l-3.45-8.34v6.34z"/>\n      </svg>\n    ',t},t}();e.default=o}]).default}));