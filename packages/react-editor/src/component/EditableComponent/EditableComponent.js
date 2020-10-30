import React from 'react';
import PropTypes from 'prop-types';
import { TemplateAnnotations } from '@redabacha/magnolia-template-annotations';
import {
  EditorContext,
  EditorContextHelper,
  constants,
  ComponentHelper
} from '../../util';

export default class EditableComponent extends React.PureComponent {
  static propTypes = {
    content: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.constants = constants;
    this.state = { renderComments: false };
  }

  componentDidMount() {
    const { isEditor } = this.context;

    if (isEditor) {
      this.setState({ renderComments: true }, this.addComment);
    }
  }

  static contextType = EditorContext;

  addComment() {
    if (!this.openNode || !this.closeNode) {
      return;
    }
    const { content } = this.props;
    const templateId = content[constants.TEMPLATE_ID_PROP];
    const { templateDefinitions: allDefinitions } = this.context;
    const templateDefinitions = allDefinitions[templateId];
    const openComponentComment = TemplateAnnotations.getComponentCommentString(
      content,
      templateDefinitions
    );
    const closedComponentComment = this.constants.CLOSED_COMPONENT_COMMENT;
    this.openNode.parentNode.insertBefore(
      document.createComment(openComponentComment),
      this.openNode
    );
    this.closeNode.parentNode.insertBefore(
      document.createComment(closedComponentComment),
      this.closeNode
    );
    EditorContextHelper.refresh();
  }

  render() {
    const { componentMappings } = this.context;
    const { content } = this.props;
    const { renderComments } = this.state;

    const component = ComponentHelper.getRenderedComponent(
      content,
      componentMappings
    );

    if (renderComments) {
      return (
        <>
          <div
            ref={node => (this.openNode = node)}
            style={{ display: 'none' }}
          />
          {component}
          <div
            ref={node => (this.closeNode = node)}
            style={{ display: 'none' }}
          />
        </>
      );
    }

    return component;
  }
}
