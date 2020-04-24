import React, { Component } from 'react';
import { TemplateAnnotations } from '@magnolia/template-annotations';
import PropTypes from 'prop-types';
import { Comment } from '../Comment';
import {
    EditorProvider, ComponentHelper, constants, EditorContextHelper
} from '../../util';

class EditablePage extends Component {
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

    constructor(props) {
        super(props);

        const { templateDefinitions, content, config } = props;
        const { componentMappings } = config;
        const isDevMode = process.env.NODE_ENV === 'development';
        let search = null;
        if (typeof window !== "undefined") {
            search = window.location.search;
          }
        const queryParams = new URLSearchParams(search);
        const inEditorPreview = queryParams.has('mgnlPreview' && queryParams.get('mgnlPreview') === 'true');

        this.state = {
            templateDefinitions,
            // eslint-disable-next-line react/no-unused-state
            componentMappings,
            content,
            // eslint-disable-next-line react/no-unused-state
            inEditorPreview,
            isDevMode
        };
    }

    hasPageComponent() {
        const { content, componentMappings } = this.state;
        return content && componentMappings && componentMappings[content[constants.TEMPLATE_ID_PROP]];
    }

    render() {
        const { isDevMode, componentMappings } = this.state;
        const { content, templateDefinitions } = this.state;
        const { children } = this.props;
        const pageTemplateDefinition = content && templateDefinitions ? templateDefinitions[content[constants.TEMPLATE_ID_PROP]] : null;
        const openComment = TemplateAnnotations.getPageCommentString(content, pageTemplateDefinition);
        const pageComponent = this.hasPageComponent() ? ComponentHelper.getRenderedComponent(content, componentMappings) : children;
        // NOTE: We need a div tag as a parent node for Page's child HTML. It will cause an issue if we
        // don't have a parent node.
        if (EditorContextHelper.inEditor() || isDevMode) {
            return (
                <EditorProvider value={this.state}>
                    <div>
                        <Comment text={openComment} />
                        <Comment text="/cms:page" />
                        {pageComponent}
                    </div>
                </EditorProvider>
            );
        }
        return (
            <EditorProvider value={this.state}>
                <div>
                    {pageComponent}
                </div>
            </EditorProvider>
        );
    }
}

export default EditablePage;