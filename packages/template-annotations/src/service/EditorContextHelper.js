function EditorContextHelper() {
    return {
        inEditor,
        refresh,
        inEditorPreview
    };

    function inEditor() {
        if (typeof window === 'undefined') {
            return false;
        }
        return Boolean(window.frameElement && window.frameElement.className.includes('gwt-Frame'));
    }

    function inEditorPreview() {
        return inEditor() && window.parent.location.hash.endsWith(':view');
    }

    function refresh() {
        if (inEditor() && window.parent.mgnlRefresh) {
            window.parent.mgnlRefresh();
        }
    }
}

export default EditorContextHelper();
