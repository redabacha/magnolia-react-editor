function EditorContextHelper() {
  return {
    inEditor,
    refresh,
    inEditorPreview
  };

  function inIframe() {
    if (typeof window === 'undefined') {
      return false;
    }
    return Boolean(
      window.frameElement && window.frameElement.className.includes('gwt-Frame')
    );
  }

  function inEditor() {
    return inIframe() && window.parent.location.hash.endsWith(':edit');
  }

  function inEditorPreview() {
    return inIframe() && window.parent.location.hash.endsWith(':view');
  }

  function refresh() {
    if (inEditor() && window.parent.mgnlRefresh) {
      window.parent.mgnlRefresh();
    }
  }
}

export default EditorContextHelper();
