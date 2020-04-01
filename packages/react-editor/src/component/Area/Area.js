import React from 'react';
import { TemplateAnnotations } from '@magnolia/template-annotations';
import PropTypes from 'prop-types';
import { Comment } from '../Comment';
import { EditorContext, constants, ComponentHelper } from '../../util';

class Area extends React.Component {
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
            throw new Error('Area component must be wrapped inside Page component.');
        }
    }

    static contextType = EditorContext;

    getParentTemplateId() {
        const { parentTemplateId } = this.props;
        const { content } = this.context;

        return parentTemplateId || content[constants.TEMPLATE_ID_PROP];
    }

    renderComponentWithComment(componentName) {
        const { content } = this.props;
        const componentContent = content[componentName];
        const { inEditor, isDevMode } = this.context;
        if (componentContent) {
            const component = this.getRenderedComponent(componentContent);
            if (!isDevMode && !inEditor) {
                return (
                    <React.Fragment key={componentContent['@id']}>
                        {component}
                    </React.Fragment>
                );
            }

            const templateId = componentContent[constants.TEMPLATE_ID_PROP];
            const { templateDefinitions: allDefinitions } = this.context;
            const templateDefinitions = allDefinitions[templateId];
            const openComponentComment = TemplateAnnotations.getComponentCommentString(componentContent, templateDefinitions);
            const closedComponentComment = this.getComponentClosedCommentContent();

            return (
                <React.Fragment key={componentContent['@id']}>
                    <Comment text={openComponentComment} />
                    {component}
                    <Comment text={closedComponentComment} />
                </React.Fragment>
            );
        }

        return null;
    }

    getAreaClosedCommentContent() {
        return this.constants.CLOSED_AREA_COMMENT;
    }

    getComponentClosedCommentContent() {
        return this.constants.CLOSED_COMPONENT_COMMENT;
    }

    getRenderedComponent(componentContent) {
        const { componentMappings } = this.context;
        return ComponentHelper.getRenderedComponent(componentContent, componentMappings);
    }

    render() {
        const { content } = this.props;
        const { inEditor, isDevMode } = this.context;
        const componentNames = content['@nodes'];
        if (!isDevMode && !inEditor) {
            return (
                <>
                    {
                        componentNames.map((name) => this.renderComponentWithComment(name))
                    }
                </>
            );
        }

        const pageTemplateId = this.getParentTemplateId();
        const { templateDefinitions: allDefinitions } = this.context;
        const templateDefinitions = allDefinitions[pageTemplateId];
        const openComment = TemplateAnnotations.getAreaCommentString(content, templateDefinitions);
        return (
            <>
                <Comment text={openComment} />
                {
                    componentNames.map((name) => this.renderComponentWithComment(name))
                }
                <Comment text={this.getAreaClosedCommentContent()} />
            </>
        );
    }
}

export default Area;
