import React from 'react';
import { templateAnnotations } from '@magnolia/magnolia-template-annotations';
import PropTypes from 'prop-types';
import { Comment } from '../Comment';
import { RendererContext, constants } from '../../util';

class Area extends React.Component {
    static propTypes = {
        content: PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);
        this.constants = constants;
    }

    static contextType = RendererContext;

    getParentTemplateId() {
        const { content } = this.props;
        const areaPath = content['@path'];
        const paths = areaPath.split('/');

        let { content: parentContent } = this.context;

        if (paths.length > 2) {
            paths.forEach((p, idx) => {
                if (idx < 2 || idx >= paths.length - 1) {
                    return;
                }
                parentContent = parentContent[p];
            });
        }

        return parentContent['mgnl:template'];
    }

    renderComponentWithComment(componentName) {
        const { content } = this.props;
        const componentContent = content[componentName];
        const { inPageEditor } = this.context;
        if (componentContent) {
            const component = this.getRenderedComponent(componentContent);
            if (!inPageEditor) {
                return (
                    <React.Fragment key={componentContent['@id']}>
                        {component}
                    </React.Fragment>
                );
            }

            const templateId = componentContent['mgnl:template'];
            const { templateDefinitions: allDefinitions } = this.context;
            const templateDefinitions = allDefinitions[templateId];
            const openComponentComment = templateAnnotations.getComponentCommentString(componentContent, templateDefinitions);
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
        const componentTemplateId = componentContent['mgnl:template'];

        let componentClass;
        if (componentTemplateId) {
            const { componentMappings } = this.context;
            componentClass = componentMappings[componentTemplateId];
        }

        if (componentClass != null) {
            let passingProps = componentContent;
            const defaultProps = componentClass.propTypes || componentClass.defaultProps
            if (defaultProps && componentContent) {
                passingProps = Object.keys(defaultProps).reduce((pre, cur) => {
                    pre[cur] = componentContent[cur];
                    return pre;
                }, {});
            }
            return React.createElement(componentClass, passingProps);
        }
        // Fallback to creating a div.
        return React.createElement('div');
    }

    render() {
        const { content } = this.props;
        const { inPageEditor } = this.context;
        const componentNames = content['@nodes'];
        if (!inPageEditor) {
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
        const openComment = templateAnnotations.getAreaCommentString(content, templateDefinitions);
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
