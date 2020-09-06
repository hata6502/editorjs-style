!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.EditorJSStyle=t():e.EditorJSStyle=t()}(window,(function(){return function(e){var t={};function n(o){if(t[o])return t[o].exports;var i=t[o]={i:o,l:!1,exports:{}};return e[o].call(i.exports,i,i.exports,n),i.l=!0,i.exports}return n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)n.d(o,i,function(t){return e[t]}.bind(null,i));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){"use strict";n.r(t);var o=function(){function e(e){var t=e.api;this.actions=document.createElement("div"),this.api=t,this.button=this.createButton()}return Object.defineProperty(e,"isInline",{get:function(){return!0},enumerable:!1,configurable:!0}),Object.defineProperty(e,"sanitize",{get:function(){return{span:!0}},enumerable:!1,configurable:!0}),Object.defineProperty(e,"title",{get:function(){return"Style"},enumerable:!1,configurable:!0}),e.initializeSpan=function(e){var t=e.span;t.classList.add("editorjs-style"),new MutationObserver((function(){var e,n,o,i,r,u;"#text"===(null===(e=t.firstChild)||void 0===e?void 0:e.nodeName)&&"​"===(null===(o=null===(n=t.firstChild)||void 0===n?void 0:n.textContent)||void 0===o?void 0:o.slice(0,1))||t.prepend(document.createTextNode("​")),"#text"===(null===(i=t.lastChild)||void 0===i?void 0:i.nodeName)&&"​"===(null===(u=null===(r=t.lastChild)||void 0===r?void 0:r.textContent)||void 0===u?void 0:u.slice(-1))||t.append(document.createTextNode("​"))})).observe(t,{characterData:!0,childList:!0,subtree:!0})},Object.defineProperty(e.prototype,"shortcut",{get:function(){return"CMD+S"},enumerable:!1,configurable:!0}),e.prototype.checkState=function(){var e,t=this.api.selection.findParentTag("SPAN","editorjs-style");if(this.button.classList.toggle(this.api.styles.inlineToolButtonActive,Boolean(t)),this.actions.innerHTML="",t){this.actions.append(document.createTextNode("Style"));var n=document.createElement("input");n.classList.add(this.api.styles.input),n.value=null!==(e=t.getAttribute("style"))&&void 0!==e?e:"",n.addEventListener("input",(function(){return t.setAttribute("style",n.value)})),this.actions.append(n)}return Boolean(t)},e.prototype.clear=function(){this.actions.innerHTML=""},e.prototype.render=function(){var t=this;return setTimeout((function(){var n=t.button.closest(".codex-editor");if(!n)throw new Error("Couldn't find the parent Editor.js of editorjs-style. ");var o=new MutationObserver((function(){n.querySelector(".codex-editor__loader")||(n.querySelectorAll("span.editorjs-style").forEach((function(t){e.initializeSpan({span:t}),t.appendChild(document.createTextNode(""))})),o.disconnect())}));o.observe(n,{childList:!0})})),this.button},e.prototype.renderActions=function(){return this.actions},e.prototype.surround=function(t){var n=document.createElement("span");e.initializeSpan({span:n}),n.append(t.extractContents()),t.insertNode(n),this.api.selection.expandToTag(n)},e.prototype.createButton=function(){var e=document.createElement("button");return e.classList.add(this.api.styles.inlineToolButton),e.type="button",e.innerHTML='\n      <svg class="icon" viewBox="0 0 24 24">\n        <path d="M0 0h24v24H0z" fill="none"/>\n        <path d="M2.53 19.65l1.34.56v-9.03l-2.43 5.86c-.41 1.02.08 2.19 1.09 2.61zm19.5-3.7L17.07 3.98c-.31-.75-1.04-1.21-1.81-1.23-.26 0-.53.04-.79.15L7.1 5.95c-.75.31-1.21 1.03-1.23 1.8-.01.27.04.54.15.8l4.96 11.97c.31.76 1.05 1.22 1.83 1.23.26 0 .52-.05.77-.15l7.36-3.05c1.02-.42 1.51-1.59 1.09-2.6zM7.88 8.75c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm-2 11c0 1.1.9 2 2 2h1.45l-3.45-8.34v6.34z"/>\n      </svg>\n    ',e},e}();t.default=o}]).default}));