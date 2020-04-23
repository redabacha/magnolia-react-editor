import React from 'react';
import PropTypes from 'prop-types';
import { TemplateAnnotations } from '@magnolia/template-annotations';
import { Comment } from '../Comment';
import {
    EditorContext, constants, ComponentHelper, EditorContextHelper
} from '../../util';

export default class EditableComponent extends React.Component {
    static propTypes = {
        content: PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);
        this.constants = constants;
    }

    static contextType = EditorContext;

    getComponentClosedCommentContent() {
        return this.constants.CLOSED_COMPONENT_COMMENT;
    }

    render() {
        const { content } = this.props;
        const { isDevMode, componentMappings } = this.context;
        const component = ComponentHelper.getRenderedComponent(content, componentMappings);
        if (!isDevMode && !EditorContextHelper.inEditor()) {
            return (
                <>
                    {component}
                </>
            );
        }

        const templateId = content[constants.TEMPLATE_ID_PROP];
        const { templateDefinitions: allDefinitions } = this.context;
        const templateDefinitions = allDefinitions[templateId];
        const openComponentComment = TemplateAnnotations.getComponentCommentString(content, templateDefinitions);
        const closedComponentComment = this.getComponentClosedCommentContent();

        return (
            <>
                <Comment text={openComponentComment} />
                {component}
                <Comment text={closedComponentComment} />
            </>
        );
    }
}
