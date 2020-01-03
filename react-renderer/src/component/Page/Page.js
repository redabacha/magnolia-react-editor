import React, { Component } from 'react';
import { TemplateAnnotations } from '@magnolia/template-annotations';
import PropTypes from 'prop-types';
import { Comment } from '../Comment';
import { RendererContext } from '../../util';

class Page extends Component {
    static propTypes = {
        children: PropTypes.elementType
    }

    static defaultProps = {
        children: null
    }

    static contextType = RendererContext;

    render() {
        const { inPageEditor } = this.context;
        const { content, templateDefinitions } = this.context;
        const { children } = this.props;
        const openComment = TemplateAnnotations.getPageCommentString(content, templateDefinitions);
        if (inPageEditor) {
            return (
                <div>
                    <Comment text={openComment} />
                    <Comment text="/cms:page" />
                    {children}
                </div>
            );
        }
        return (
            <div>
                {children}
            </div>
        );
    }
}

export default Page;
