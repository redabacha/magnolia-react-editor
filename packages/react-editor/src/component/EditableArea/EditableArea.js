import React from 'react';
import PropTypes from 'prop-types';
import { EditableComponent } from '../EditableComponent';
import {
    EditorContext, constants, EditorContextHelper, ComponentHelper
} from '../../util';

class EditableArea extends React.PureComponent {
    static propTypes = {
        content: PropTypes.object.isRequired,
        className: PropTypes.any,
        elementType: PropTypes.string,
        children: PropTypes.node
    };

    static defaultProps = {
        className: null,
        elementType: 'div',
        children: null
    }

    constructor(props) {
        super(props);
        this.constants = constants;
    }

    componentDidMount() {
        if (!this.context) {
            throw new Error('EditableArea component must be wrapped inside EditablePage component.');
        }
        this.addComment();
    }

    static contextType = EditorContext;

    addComment() {
        const { isDevMode } = this.context;
        const { content } = this.props;
        if (!this.node || (!isDevMode && !EditorContextHelper.inEditor())) {
            return;
        }
        const { templateAnnotations: allAnnotations } = this.context;
        const openComment = allAnnotations[content['@path']];
        this.node.parentNode.insertBefore(document.createComment(openComment), this.node);
        this.node.parentNode.insertBefore(document.createComment(this.constants.CLOSED_AREA_COMMENT), this.node.nextSibling);
    }

    render() {
        const {
            content, className, elementType, children
        } = this.props;
        const componentNames = content['@nodes'];
        const element = React.createElement(elementType || 'div');
        return (
            <element.type ref={node => this.node = node} key={content['@id']} className={ComponentHelper.classnames(className)}>
                {children}
                {
                    componentNames.map((name) => <EditableComponent key={content[name]['@id']} content={content[name]} />)
                }
            </element.type>
        );
    }
}

export default EditableArea;
