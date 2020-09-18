class EditorJSStyleElement extends HTMLElement {
  constructor() {
    super();

    // To prevent Editor.js keydown event
    this.addEventListener('keydown', (event) => event.stopPropagation());
  }
}

export default EditorJSStyleElement;
