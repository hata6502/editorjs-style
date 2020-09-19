class EditorJSStyleError extends Error {
  constructor(...args: any[]) {
    super(...args);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, EditorJSStyleError);
    }

    this.name = 'EditorJSStyleError';
  }
}

export default EditorJSStyleError;
