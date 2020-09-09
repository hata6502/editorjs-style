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

  private static initializeSpan({ span }: { span: HTMLSpanElement }) {
    span.classList.add('editorjs-style');

    const mutationObserver = new MutationObserver(() => {
      if (
        span.firstChild?.nodeName !== '#text' ||
        span.firstChild?.textContent?.slice(0, 1) !== '\u200b'
      ) {
        span.prepend(document.createTextNode('\u200b'));
      }

      if (
        span.lastChild?.nodeName !== '#text' ||
        span.lastChild?.textContent?.slice(-1) !== '\u200b'
      ) {
        span.append(document.createTextNode('\u200b'));
      }
    });

    mutationObserver.observe(span, {
      characterData: true,
      childList: true,
      subtree: true,
    });
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

    this.actions.innerHTML = '';

    if (span) {
      this.actions.innerHTML = `
        <div style="display: flex; align-items: center; justify-content: space-between; ">
          <div>Style settings</div>

          <button class="delete-button ${this.api.styles.settingsButton}" type="button">
            <svg class="icon" height="24" viewBox="0 0 24 24" width="24">
              <path d="M0 0h24v24H0z" fill="none"/>
              <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
            </svg>
          </button>
        </div>
        <input class="style-input ${this.api.styles.input}">
      `;

      const deleteButton = this.actions.querySelector(
        '.delete-button'
      ) as HTMLButtonElement | null;
      const styleInput = this.actions.querySelector(
        '.style-input'
      ) as HTMLInputElement | null;

      if (!deleteButton || !styleInput) {
        throw new Error("Couldn't render actions for editorjs-style. ");
      }

      deleteButton.addEventListener('click', () => {
        const clonedNodes = Array.from(span.childNodes).map((node) =>
          node.cloneNode(true)
        );

        clonedNodes.forEach((node) =>
          span.parentNode?.insertBefore(node, span)
        );
        span.remove();

        if (clonedNodes.length === 0) {
          return;
        }

        const selection = window.getSelection();

        if (!selection) {
          throw new Error(
            "Couldn't select unwrapped editorjs-style contents. "
          );
        }

        selection.removeAllRanges();

        const range = new Range();

        range.setStartBefore(clonedNodes[0]);
        range.setEndAfter(clonedNodes[clonedNodes.length - 1]);

        selection.addRange(range);
      });

      this.api.tooltip.onHover(deleteButton, 'Delete style', {
        placement: 'top',
      });

      styleInput.value = span.getAttribute('style') ?? '';

      styleInput.addEventListener('input', () =>
        span.setAttribute('style', styleInput.value)
      );
    }

    return Boolean(span);
  }

  clear() {
    this.actions.innerHTML = '';
  }

  render() {
    setTimeout(() => {
      const codexEditor = this.button.closest('.codex-editor');

      if (!codexEditor) {
        throw new Error(
          "Couldn't find the parent Editor.js of editorjs-style. "
        );
      }

      const mutationObserver = new MutationObserver(() => {
        if (codexEditor.querySelector('.codex-editor__loader')) {
          return;
        }

        codexEditor
          .querySelectorAll('span.editorjs-style')
          .forEach((element) => {
            EditorJSStyle.initializeSpan({ span: element as HTMLSpanElement });

            element.appendChild(document.createTextNode(''));
          });

        mutationObserver.disconnect();
      });

      mutationObserver.observe(codexEditor, { childList: true });
    });

    return this.button;
  }

  renderActions(): HTMLElement {
    return this.actions;
  }

  surround(range: Range) {
    const span = document.createElement('span');

    EditorJSStyle.initializeSpan({ span });

    span.append(range.extractContents());

    range.insertNode(span);
    this.api.selection.expandToTag(span);
  }

  private createButton() {
    const button = document.createElement('button');

    button.classList.add(this.api.styles.inlineToolButton);
    button.type = 'button';

    button.innerHTML = `
      <svg class="icon" height="24" viewBox="0 0 24 24" width="24">
        <path d="M0 0h24v24H0z" fill="none"/>
        <path d="M2.53 19.65l1.34.56v-9.03l-2.43 5.86c-.41 1.02.08 2.19 1.09 2.61zm19.5-3.7L17.07 3.98c-.31-.75-1.04-1.21-1.81-1.23-.26 0-.53.04-.79.15L7.1 5.95c-.75.31-1.21 1.03-1.23 1.8-.01.27.04.54.15.8l4.96 11.97c.31.76 1.05 1.22 1.83 1.23.26 0 .52-.05.77-.15l7.36-3.05c1.02-.42 1.51-1.59 1.09-2.6zM7.88 8.75c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm-2 11c0 1.1.9 2 2 2h1.45l-3.45-8.34v6.34z"/>
      </svg>
    `;

    return button;
  }
}

export default EditorJSStyle;
