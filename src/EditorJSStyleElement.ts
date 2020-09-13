class EditorJSStyleElement extends HTMLElement {
  constructor() {
    super();

    // To prevent Editor.js keydown event
    this.addEventListener('keydown', (event) => event.stopPropagation());

    const mutationObserver = new MutationObserver(() => {
      if (
        this.firstChild?.nodeName !== '#text' ||
        this.firstChild?.textContent?.slice(0, 1) !== '\u200b'
      ) {
        this.prepend('\u200b');
      }

      if (
        this.lastChild?.nodeName !== '#text' ||
        this.lastChild?.textContent?.slice(-1) !== '\u200b'
      ) {
        this.append('\u200b');
      }
    });

    mutationObserver.observe(this, {
      characterData: true,
      childList: true,
      subtree: true,
    });
  }
}

export default EditorJSStyleElement;
