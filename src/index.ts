import type {
  API,
  InlineTool,
  InlineToolConstructorOptions,
} from '@editorjs/editorjs';

class EditorJSStyle implements InlineTool {
  static get isInline() {
    return true;
  }

  static get sanitize() {
    return {
      span: true,
    };
  }

  static get title() {
    return 'Style';
  }

  private actions: HTMLDivElement;
  private api: API;
  private button: HTMLButtonElement;

  constructor({ api }: InlineToolConstructorOptions) {
    this.actions = document.createElement('div');
    this.api = api;
    this.button = this.createButton();
  }

  get shortcut() {
    return 'CMD+S';
  }

  checkState() {
    const span = this.api.selection.findParentTag('SPAN', 'editorjs-style');

    this.button.classList.toggle(
      this.api.styles.inlineToolButtonActive,
      Boolean(span)
    );
    this.actions.innerHTML = '';

    if (span) {
      this.actions.append(document.createTextNode('Style'));

      const input = document.createElement('input');

      input.classList.add(this.api.styles.input);
      input.value = span.getAttribute('style') ?? '';

      input.addEventListener('input', () =>
        span.setAttribute('style', input.value)
      );

      this.actions.append(input);
    }

    return Boolean(span);
  }

  clear() {
    this.actions.innerHTML = '';
  }

  render() {
    return this.button;
  }

  renderActions(): HTMLElement {
    return this.actions;
  }

  surround(range: Range) {
    const span = document.createElement('span');

    span.classList.add('editorjs-style');

    span.append(range.extractContents());
    span.append(document.createTextNode('\u200b'));
    span.prepend(document.createTextNode('\u200b'));

    range.insertNode(span);
    this.api.selection.expandToTag(span);
  }

  private createButton() {
    const button = document.createElement('button');

    button.classList.add(this.api.styles.inlineToolButton);
    button.type = 'button';
    button.innerHTML = `
      <svg class="icon" viewBox="0 0 24 24">
        <path d="M0 0h24v24H0z" fill="none"/>
        <path d="M2.53 19.65l1.34.56v-9.03l-2.43 5.86c-.41 1.02.08 2.19 1.09 2.61zm19.5-3.7L17.07 3.98c-.31-.75-1.04-1.21-1.81-1.23-.26 0-.53.04-.79.15L7.1 5.95c-.75.31-1.21 1.03-1.23 1.8-.01.27.04.54.15.8l4.96 11.97c.31.76 1.05 1.22 1.83 1.23.26 0 .52-.05.77-.15l7.36-3.05c1.02-.42 1.51-1.59 1.09-2.6zM7.88 8.75c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm-2 11c0 1.1.9 2 2 2h1.45l-3.45-8.34v6.34z"/>
      </svg>
    `;

    return button;
  }
}

export default EditorJSStyle;
