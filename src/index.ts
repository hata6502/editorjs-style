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
      /*span: {
        'data-editorjs-inline': true,
      },*/
    };
  }

  static get title() {
    return 'Style';
  }

  private api: API;

  constructor({ api }: InlineToolConstructorOptions) {
    this.api = api;
  }

  get shortcut() {
    return 'CMD+E';
  }

  surround(range: Range) {}

  checkState() {
    return false;
  }

  render() {
    const button = document.createElement('button');

    button.classList.add(this.api.styles.inlineToolButton);
    button.type = 'button';
    button.innerHTML = `
      <svg class="icon" viewBox="0 0 14 14">
        <g stroke="currentColor" stroke-width="2">
          <circle cx="7" cy="7" r="6" fill="none" />
          <line x1="4" y1="7" x2="10" y2="7" />
          <line x1="7" y1="4" x2="7" y2="10" />
        </g>
      </svg>
    `;

    return button;
  }
}

export default EditorJSStyle;
