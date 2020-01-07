import React, { Component } from 'react';
import { TemplateAnnotations } from '@magnolia/template-annotations';
import PropTypes from 'prop-types';
import { Comment } from '../Comment';
import { RendererProvider } from '../../util';

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
        const isInPageEditor = Boolean(window.parent && window.parent.mgnlRefresh);

        this.state = {
            templateDefinitions,
            // eslint-disable-next-line react/no-unused-state
            componentMappings,
            content,
            inPageEditor: isInPageEditor
        };
    }

    render() {
        const { inPageEditor } = this.state;
        const { content, templateDefinitions } = this.state;
        const { children } = this.props;
        const openComment = TemplateAnnotations.getPageCommentString(content, templateDefinitions);
        // NOTE: We need a div tag as a parent node for Page's child HTML. It will cause an issue if we
        // don't have a parent node.
        if (inPageEditor) {
            return (
                <RendererProvider value={this.state}>
                    <div>
                        <Comment text={openComment} />
                        <Comment text="/cms:page" />
                        {children}
                    </div>
                </RendererProvider>
            );
        }
        return (
            <RendererProvider value={this.state}>
                <div>
                    {children}
                </div>
            </RendererProvider>
        );
    }
}

export default Page;
