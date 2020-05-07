import React from 'react';
import { TemplateAnnotations } from '@magnolia/template-annotations';
import PropTypes from 'prop-types';
import { Comment } from '../Comment';
import { EditableComponent } from '../EditableComponent';
import {
    EditorContext, constants, EditorContextHelper
} from '../../util';

class EditableArea extends React.PureComponent {
    static propTypes = {
        content: PropTypes.object.isRequired,
        parentTemplateId: PropTypes.string
    };

    static defaultProps = {
        parentTemplateId: null
    }

    constructor(props) {
        super(props);
        this.constants = constants;
    }

    componentDidMount() {
        if (!this.context) {
            throw new Error('EditableArea component must be wrapped inside EditablePage component.');
        }
        EditorContextHelper.refresh();
    }

    static contextType = EditorContext;

    getParentTemplateId() {
        const { parentTemplateId } = this.props;
        const { content } = this.context;

        return parentTemplateId || content[constants.TEMPLATE_ID_PROP];
    }

    getAreaClosedCommentContent() {
        return this.constants.CLOSED_AREA_COMMENT;
    }

    renderComponents() {
        const { content } = this.props;
        const componentNames = content['@nodes'];
        return (
            <>
                {
                    componentNames.map((name) => <EditableComponent key={name} content={content[name]} />)
                }
            </>
        );
    }

    render() {
        const { content } = this.props;
        const { isDevMode } = this.context;
        if (!isDevMode && !EditorContextHelper.inEditor()) {
            return (
                <div>
                    {
                        this.renderComponents()
                    }
                </div>
            );
        }

        const pageTemplateId = this.getParentTemplateId();
        const { templateDefinitions: allDefinitions } = this.context;
        const templateDefinitions = allDefinitions[pageTemplateId];
        const openComment = TemplateAnnotations.getAreaCommentString(content, templateDefinitions);
        return (
            <>
                <Comment text={openComment} />
                <div>
                    {
                        this.renderComponents()
                    }
                </div>
                <Comment text={this.getAreaClosedCommentContent()} />
            </>
        );
    }
}

export default EditableArea;
