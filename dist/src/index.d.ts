import type { InlineTool, InlineToolConstructorOptions } from '@editorjs/editorjs';
declare class EditorJSStyle implements InlineTool {
    static get isInline(): boolean;
    static get sanitize(): {
        span: boolean;
    };
    static get title(): string;
    private actions;
    private api;
    private button;
    constructor({ api }: InlineToolConstructorOptions);
    get shortcut(): string;
    checkState(): boolean;
    clear(): void;
    render(): HTMLButtonElement;
    renderActions(): HTMLElement;
    surround(range: Range): void;
    private createButton;
}
export default EditorJSStyle;
