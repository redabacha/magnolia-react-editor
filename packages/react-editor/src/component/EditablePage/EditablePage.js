import React from 'react';
import PropTypes from 'prop-types';
import { TemplateAnnotations } from '@magnolia/template-annotations';
import {
    EditorProvider, ComponentHelper, constants, EditorContextHelper
} from '../../util';

class EditablePage extends React.PureComponent {
    static propTypes = {
        children: PropTypes.elementType,
        content: PropTypes.object,
        templateDefinitions: PropTypes.object,
        templateAnnotations: PropTypes.object,
        config: PropTypes.shape({
            componentMappings: PropTypes.object
        })
    }

    static defaultProps = {
        children: null,
        content: null,
        templateDefinitions: null,
        templateAnnotations: null,
        config: {
            componentMappings: {}
        }
    }

    componentDidMount() {
        this.addComment();
        EditorContextHelper.onFrameReady();
        EditorContextHelper.refresh();
    }

    // eslint-disable-next-line camelcase
    UNSAFE_componentWillUpdate() {
        this.node.firstChild.remove();
    }

    componentDidUpdate() {
        this.addComment();
        EditorContextHelper.onFrameReady();
        EditorContextHelper.refresh();
    }

    addComment() {
        const contextValue = this.getContextValue();
        if (!this.node) {
            return;
        }
        if (contextValue.content) {
            if (contextValue.templateDefinitions) {
                ComponentHelper.addComment(this.node, TemplateAnnotations.getPageCommentString(contextValue.content, contextValue.templateDefinitions[contextValue.content[constants.TEMPLATE_ID_PROP]]));
            } else if (contextValue.templateAnnotations) {
                ComponentHelper.addComment(this.node, contextValue.templateAnnotations[contextValue.content['@path']]);
            }
        }
    }

    getContextValue() {
        const { templateDefinitions, templateAnnotations, content, config } = this.props;
        const { componentMappings } = config;
        const isDevMode = process.env.NODE_ENV === 'development';

        const contextValue = {
            templateDefinitions,
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
        const pageComponent = children ? children : ComponentHelper.getRenderedComponent(contextValue.content, contextValue.componentMappings);
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
