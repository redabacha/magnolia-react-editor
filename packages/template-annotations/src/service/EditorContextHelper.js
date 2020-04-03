function EditorContextHelper() {
    return {
        inEditor,
        refresh
    };

    function inEditor() {
        return Boolean(window.parent && window.parent.mgnlRefresh);
    }

    function refresh() {
        if (inEditor()) {
            window.parent.mgnlRefresh();
        }
    }
}

export default EditorContextHelper();
