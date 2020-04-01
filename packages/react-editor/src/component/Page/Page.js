import React, { Component } from 'react';
import { TemplateAnnotations } from '@magnolia/template-annotations';
import PropTypes from 'prop-types';
import { Comment } from '../Comment';
import { EditorProvider, ComponentHelper, constants } from '../../util';

class Page extends Component {
    static propTypes = {
        children: PropTypes.elementType,
        templateDefinitions: PropTypes.object,
        content: PropTypes.object,
        componentMappings: PropTypes.object
    }

    static defaultProps = {
        children: null,
        templateDefinitions: null,
        content: null,
        componentMappings: {}
    }

    constructor(props) {
        super(props);
        const { templateDefinitions, content, componentMappings } = props;
        const isInEditor = Boolean(window.parent && window.parent.mgnlRefresh);
        const isDevMode = process.env.NODE_ENV === 'development';
        const queryParams = new URLSearchParams(window.location.search);
        const inEditorPreview = queryParams.has('mgnlPreview' && queryParams.get('mgnlPreview') === 'true');

        this.state = {
            templateDefinitions,
            // eslint-disable-next-line react/no-unused-state
            componentMappings,
            content,
            inEditor: isInEditor,
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
        const { inEditor, isDevMode, componentMappings } = this.state;
        const { content, templateDefinitions } = this.state;
        const { children } = this.props;
        const pageTemplateDefinition = content && templateDefinitions ? templateDefinitions[content[constants.TEMPLATE_ID_PROP]] : null;
        const openComment = TemplateAnnotations.getPageCommentString(content, pageTemplateDefinition);
        const pageComponent = this.hasPageComponent() ? ComponentHelper.getRenderedComponent(content, componentMappings) : children;
        // NOTE: We need a div tag as a parent node for Page's child HTML. It will cause an issue if we
        // don't have a parent node.
        if (inEditor || isDevMode) {
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

export default Page;
