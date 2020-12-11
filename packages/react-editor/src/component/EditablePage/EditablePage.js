import React from 'react';
import PropTypes from 'prop-types';
import {
    EditorProvider, ComponentHelper, constants, EditorContextHelper
} from '../../util';

class EditablePage extends React.PureComponent {
    static propTypes = {
        children: PropTypes.elementType,
        content: PropTypes.object,
        templateAnnotations: PropTypes.object,
        config: PropTypes.shape({
            componentMappings: PropTypes.object
        })
    }

    static defaultProps = {
        children: null,
        content: null,
        templateAnnotations: null,
        config: {
            componentMappings: {}
        }
    }

    componentDidMount() {
        this.addCloseComment();
        this.addOpenComment();
        EditorContextHelper.onFrameReady();
        EditorContextHelper.refresh();
    }

    // eslint-disable-next-line camelcase
    UNSAFE_componentWillUpdate() {
        this.node.firstChild.remove();
    }

    componentDidUpdate() {
        this.addOpenComment();
        EditorContextHelper.onFrameReady();
        EditorContextHelper.refresh();
    }

    addOpenComment() {
        const contextValue = this.getContextValue();
        if (!this.node) {
            return;
        }
        const openComment = contextValue.content && contextValue.templateAnnotations
            ? contextValue.templateAnnotations[contextValue.content['@path']] : null;
        ComponentHelper.addComment(this.node, openComment);
    }

    addCloseComment() {
        ComponentHelper.addComment(this.node, '/cms:page');
    }

    hasPageComponent() {
        const { content, componentMappings } = this.getContextValue();
        return content && componentMappings && componentMappings[content[constants.TEMPLATE_ID_PROP]];
    }

    getContextValue() {
        const { templateAnnotations, content, config } = this.props;
        const { componentMappings } = config;
        const isDevMode = process.env.NODE_ENV === 'development';

        const contextValue = {
            templateAnnotations,
            componentMappings,
            content,
            isDevMode
        };
        return contextValue;
    }

    render() {
        const contextValue = this.getContextValue();
        const { children } = this.props;
        const pageComponent = this.hasPageComponent() ? ComponentHelper.getRenderedComponent(contextValue.content, contextValue.componentMappings) : children;
        // NOTE: We need a div tag as a parent node for Page's child HTML. It will cause an issue if we
        // don't have a parent node.
        return (
            <EditorProvider value={contextValue}>
                <div ref={node => this.node = node} key={contextValue.content['@id']}>
                    {pageComponent}
                </div>
            </EditorProvider>
        );
    }
}

export default EditablePage;
