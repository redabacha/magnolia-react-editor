import React from 'react';
import PropTypes from 'prop-types';
import { TemplateAnnotations } from '@magnolia/template-annotations';
import {
    EditorContext, constants, ComponentHelper, EditorContextHelper
} from '../../util';

export default class EditableComponent extends React.PureComponent {
    static propTypes = {
        content: PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);
        this.constants = constants;
    }

    componentDidMount() {
        this.addComment();
        this.removeRefs();
    }

    static contextType = EditorContext;

    addComment() {
        const { isDevMode } = this.context;
        const { content } = this.props;
        if (!this.openNode || !this.closeNode || (!isDevMode && !EditorContextHelper.inEditor())) {
            return;
        }
        const pageTemplateId = content[constants.TEMPLATE_ID_PROP];
        const { templateDefinitions, templateAnnotations } = this.context;
        if (templateDefinitions) {
            this.openNode.parentNode.insertBefore(document.createComment(TemplateAnnotations.getComponentCommentString(content, templateDefinitions[pageTemplateId])), this.openNode);
            this.closeNode.parentNode.insertBefore(document.createComment(this.constants.CLOSED_COMPONENT_COMMENT), this.closeNode.nextSibling);
        } else if (templateAnnotations) {
            this.openNode.parentNode.insertBefore(document.createComment(templateAnnotations[content['@path']]), this.openNode);
            this.closeNode.parentNode.insertBefore(document.createComment(this.constants.CLOSED_COMPONENT_COMMENT), this.closeNode.nextSibling);
        }
    }

    removeRefs() {
        if (!this.openNode || !this.closeNode) {
            return;
        }
        this.openNode.remove();
        this.closeNode.remove();
    }

    render() {
        const { content } = this.props;
        const { componentMappings } = this.context;
        const component = ComponentHelper.getRenderedComponent(content, componentMappings);

        return (
            <>
                <div ref={node => this.openNode = node} />
                {component}
                <div ref={node => this.closeNode = node} />
            </>
        );
    }
}
