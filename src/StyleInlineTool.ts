import type {
  API,
  InlineTool,
  InlineToolConstructorOptions,
} from '@editorjs/editorjs';
import { EditorJSStyleElement } from './EditorJSStyleElement';
import { EditorJSStyleError } from './EditorJSStyleError';

class StyleInlineTool implements InlineTool {
  static get isInline() {
    return true;
  }

  static get sanitize() {
    return {
      'editorjs-style': {
        class: true,
        id: true,
        style: true,
      },
    };
  }

  static get title() {
    return 'Style';
  }

  #actions: HTMLDivElement;
  #api: API;

  constructor({ api }: InlineToolConstructorOptions) {
    this.#actions = document.createElement('div');
    this.#api = api;

    if (customElements.get('editorjs-style')) {
      return;
    }

    customElements.define('editorjs-style', EditorJSStyleElement);
  }

  get shortcut() {
    return 'CMD+S';
  }

  checkState() {
    this.#actions.innerHTML = '';

    const editorjsStyle = this.#api.selection.findParentTag('EDITORJS-STYLE');

    if (!editorjsStyle) {
      return false;
    }

    this.#actions.innerHTML = `
      <div style="margin-left: 0.5rem; ">
        <div style="display: flex; align-items: center; justify-content: space-between; ">
          <div>Style settings</div>

          <button class="delete-button ${
            this.#api.styles.settingsButton
          }" type="button">
            <svg class="icon" height="24" viewBox="0 0 24 24" width="24">
              <path d="M0 0h24v24H0z" fill="none"/>
              <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
            </svg>
          </button>
        </div>

        <label style="display: flex; align-items: center; justify-content: space-between; ">
          <span>ID</span>

          <input class="id-input ${
            this.#api.styles.input
          }" placeholder="exciting" style="width: 80%; ">
        </label>

        <label style="display: flex; align-items: center; justify-content: space-between; ">
          <span>Class</span>

          <input class="class-input ${
            this.#api.styles.input
          }" placeholder="note editorial" style="width: 80%; ">
        </label>

        <label style="display: flex; align-items: center; justify-content: space-between; ">
          <span>Style</span>

          <textarea
            class="style-textarea ${this.#api.styles.input}"
            placeholder="background: #ffe7e8;"
            style="resize: none; width: 80%; ">
          </textarea>
        </label>
      </div>
    `;

    const deleteButton = this.#actions.querySelector(
      '.delete-button'
    ) as HTMLButtonElement | null;

    const classInput = this.#actions.querySelector(
      '.class-input'
    ) as HTMLInputElement | null;

    const idInput = this.#actions.querySelector(
      '.id-input'
    ) as HTMLInputElement | null;

    const styleTextarea = this.#actions.querySelector(
      '.style-textarea'
    ) as HTMLTextAreaElement | null;

    if (!deleteButton || !classInput || !idInput || !styleTextarea) {
      throw new EditorJSStyleError();
    }

    deleteButton.addEventListener('click', () => {
      const clonedNodes = Array.from(editorjsStyle.childNodes).map((node) =>
        node.cloneNode(true)
      );

      clonedNodes.forEach((node) =>
        editorjsStyle.parentNode?.insertBefore(node, editorjsStyle)
      );
      editorjsStyle.remove();

      if (clonedNodes.length === 0) {
        return;
      }

      const selection = window.getSelection();

      if (!selection) {
        throw new EditorJSStyleError();
      }

      selection.removeAllRanges();

      const range = new Range();

      range.setStartBefore(clonedNodes[0]);
      range.setEndAfter(clonedNodes[clonedNodes.length - 1]);

      selection.addRange(range);
    });

    this.#api.tooltip.onHover(deleteButton, 'Delete style', {
      placement: 'top',
    });

    classInput.value = editorjsStyle.className;

    classInput.addEventListener('input', () =>
      editorjsStyle.setAttribute('class', classInput.value)
    );

    idInput.value = editorjsStyle.id;

    idInput.addEventListener('input', () => (editorjsStyle.id = idInput.value));

    styleTextarea.value = editorjsStyle.getAttribute('style') ?? '';

    // To input line breaks
    styleTextarea.addEventListener('keydown', (event) =>
      event.stopPropagation()
    );

    styleTextarea.addEventListener('input', () =>
      editorjsStyle.setAttribute('style', styleTextarea.value)
    );

    return true;
  }

  clear() {
    this.#actions.innerHTML = '';
  }

  render() {
    const button = document.createElement('button');

    button.classList.add(this.#api.styles.inlineToolButton);
    button.type = 'button';

    button.innerHTML = `
      <svg class="icon" height="24" viewBox="0 0 24 24" width="24">
        <path d="M0 0h24v24H0z" fill="none"/>
        <path d="M2.53 19.65l1.34.56v-9.03l-2.43 5.86c-.41 1.02.08 2.19 1.09 2.61zm19.5-3.7L17.07 3.98c-.31-.75-1.04-1.21-1.81-1.23-.26 0-.53.04-.79.15L7.1 5.95c-.75.31-1.21 1.03-1.23 1.8-.01.27.04.54.15.8l4.96 11.97c.31.76 1.05 1.22 1.83 1.23.26 0 .52-.05.77-.15l7.36-3.05c1.02-.42 1.51-1.59 1.09-2.6zM7.88 8.75c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm-2 11c0 1.1.9 2 2 2h1.45l-3.45-8.34v6.34z"/>
      </svg>
    `;

    return button;
  }

  renderActions(): HTMLElement {
    return this.#actions;
  }

  surround(range: Range) {
    const editorjsStyle = new EditorJSStyleElement();

    editorjsStyle.append(
      range.collapsed ? 'new style' : range.extractContents()
    );

    setTimeout(() => {
      range.insertNode(editorjsStyle);
      this.#api.selection.expandToTag(editorjsStyle);
    });
  }
}

export { StyleInlineTool };
