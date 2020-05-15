import React from 'react';
import { TemplateAnnotations } from '@magnolia/template-annotations';
import PropTypes from 'prop-types';
import {
    EditorProvider, ComponentHelper, constants, EditorContextHelper
} from '../../util';

class EditablePage extends React.PureComponent {
    static propTypes = {
        children: PropTypes.elementType,
        content: PropTypes.object,
        templateDefinitions: PropTypes.object,
        config: PropTypes.shape({
            componentMappings: PropTypes.object
        })
    }

    static defaultProps = {
        children: null,
        content: null,
        templateDefinitions: null,
        config: {
            componentMappings: {}
        }
    }

    componentDidMount() {
        this.addCloseComment();
        this.addOpenComment();
        EditorContextHelper.refresh();
    }

    // eslint-disable-next-line camelcase
    UNSAFE_componentWillUpdate() {
        this.node.firstChild.remove();
    }

    componentDidUpdate() {
        this.addOpenComment();
        EditorContextHelper.refresh();
    }

    addOpenComment() {
        const contextValue = this.getContextValue();
        if (!this.node) {
            return;
        }
        const pageTemplateDefinition = contextValue.content && contextValue.templateDefinitions
            ? contextValue.templateDefinitions[contextValue.content[constants.TEMPLATE_ID_PROP]] : null;
        const openComment = TemplateAnnotations.getPageCommentString(contextValue.content, pageTemplateDefinition);
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
        const { templateDefinitions, content, config } = this.props;
        const { componentMappings } = config;
        const isDevMode = process.env.NODE_ENV === 'development';
        let search = null;
        if (typeof window !== 'undefined') {
            search = window.location.search;
        }
        const queryParams = new URLSearchParams(search);
        const inEditorPreview = queryParams.has('mgnlPreview' && queryParams.get('mgnlPreview') === 'true');
        const contextValue = {
            templateDefinitions,
            componentMappings,
            content,
            inEditorPreview,
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
