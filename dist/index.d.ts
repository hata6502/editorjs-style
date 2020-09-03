import type { InlineTool, InlineToolConstructorOptions } from '@editorjs/editorjs';
declare class EditorJSStyle implements InlineTool {
    static get isInline(): boolean;
    static get sanitize(): {};
    static get title(): string;
    private api;
    constructor({ api }: InlineToolConstructorOptions);
    get shortcut(): string;
    surround(range: Range): void;
    checkState(): boolean;
    render(): HTMLButtonElement;
}
export default EditorJSStyle;
