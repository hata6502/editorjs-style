class EditorJSStyleError extends Error {
  constructor(...args: any[]) {
    super(...args);

    this.name = 'EditorJSStyleError';
  }
}

export { EditorJSStyleError };
