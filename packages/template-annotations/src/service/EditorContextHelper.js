function EditorContextHelper() {
    return {
        inEditor,
        refresh
    };

    function inEditor() {
        if (typeof window === 'undefined') {
            return false;
        }
        return Boolean(window.frameElement && window.frameElement.className.includes('gwt-Frame'));
    }

    function refresh() {
        if (inEditor() && window.parent.mgnlRefresh) {
            window.parent.mgnlRefresh();
        }
    }
}

export default EditorContextHelper();
