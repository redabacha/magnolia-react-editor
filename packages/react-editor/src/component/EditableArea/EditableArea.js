import React from 'react';
import { TemplateAnnotations } from '@redabacha/magnolia-template-annotations';
import PropTypes from 'prop-types';
import { EditableComponent } from '../EditableComponent';
import { EditorContext, constants } from '../../util';

class EditableArea extends React.PureComponent {
  static propTypes = {
    content: PropTypes.object,
    parentTemplateId: PropTypes.string,
    className: PropTypes.any,
    elementType: PropTypes.string,
    children: PropTypes.node
  };

  static defaultProps = {
    content: {},
    parentTemplateId: null,
    className: undefined,
    elementType: 'div',
    children: null
  };

  constructor(props) {
    super(props);
    this.constants = constants;
  }

  componentDidMount() {
    if (!this.context) {
      // eslint-disable-next-line no-console
      console.error(
        'EditableArea component must be wrapped inside EditablePage component.'
      );
    }
    this.addComment();
  }

  static contextType = EditorContext;

  getParentTemplateId() {
    const { parentTemplateId } = this.props;
    const { content } = this.context;

    return parentTemplateId || content[constants.TEMPLATE_ID_PROP];
  }

  addComment() {
    const { isEditor } = this.context;
    if (!this.node || !isEditor) {
      return;
    }
    const { content } = this.props;
    const pageTemplateId = this.getParentTemplateId();
    const { templateDefinitions: allDefinitions } = this.context;
    const templateDefinitions = allDefinitions[pageTemplateId];
    const openComment = TemplateAnnotations.getAreaCommentString(
      content,
      templateDefinitions
    );
    this.node.parentNode.insertBefore(
      document.createComment(openComment),
      this.node
    );
    this.node.parentNode.insertBefore(
      document.createComment(this.constants.CLOSED_AREA_COMMENT),
      this.node.nextSibling
    );
  }

  render() {
    const { content, className, elementType, children } = this.props;
    const componentNames = content['@nodes'] || [];
    const element = React.createElement(elementType || 'div');
    return componentNames && componentNames.length > 0 ? (
      <element.type
        ref={node => (this.node = node)}
        key={content['@id']}
        className={className}
      >
        {children}
        {componentNames.map(name => (
          <EditableComponent
            key={content[name]['@id']}
            content={content[name]}
          />
        ))}
      </element.type>
    ) : null;
  }
}

export default EditableArea;
