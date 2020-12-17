import React from 'react';
import { TemplateAnnotations } from '@redabacha/magnolia-template-annotations';
import PropTypes from 'prop-types';
import {
  EditorProvider,
  ComponentHelper,
  constants,
  EditorContextHelper
} from '../../util';

class EditablePage extends React.PureComponent {
  static propTypes = {
    children: PropTypes.element,
    config: PropTypes.shape({
      componentMappings: PropTypes.object
    }),
    content: PropTypes.object,
    isEditor: PropTypes.bool,
    templateDefinitions: PropTypes.object
  };

  static defaultProps = {
    children: null,
    config: {
      componentMappings: {}
    },
    content: null,
    isEditor: EditorContextHelper.inEditor(),
    templateDefinitions: null
  };

  componentDidMount() {
    this.addComment();
    EditorContextHelper.onFrameReady();
    EditorContextHelper.refresh();
  }

  componentDidUpdate() {
    this.addComment();
    EditorContextHelper.onFrameReady();
    EditorContextHelper.refresh();
  }

  addComment() {
    const contextValue = this.getContextValue();
    if (!this.node || !contextValue.isEditor) {
      return;
    }
    const pageTemplateDefinition =
      contextValue.content && contextValue.templateDefinitions
        ? contextValue.templateDefinitions[
            contextValue.content[constants.TEMPLATE_ID_PROP]
          ]
        : null;
    const openComment = TemplateAnnotations.getPageCommentString(
      contextValue.content,
      pageTemplateDefinition
    );
    ComponentHelper.addComment(this.node, '/cms:page');
    ComponentHelper.addComment(this.node, openComment);
  }

  hasPageComponent() {
    const { content, componentMappings } = this.getContextValue();
    return (
      content &&
      componentMappings &&
      componentMappings[content[constants.TEMPLATE_ID_PROP]]
    );
  }

  getContextValue() {
    const { content, config, isEditor, templateDefinitions } = this.props;
    const { componentMappings } = config;

    return {
      componentMappings,
      content,
      isEditor,
      templateDefinitions
    };
  }

  render() {
    const { children } = this.props;

    const contextValue = this.getContextValue();
    const pageComponent = this.hasPageComponent()
      ? ComponentHelper.getRenderedComponent(
          contextValue.content,
          contextValue.componentMappings
        )
      : children;

    // NOTE: We need a div tag as a parent node for Page's child HTML. It will cause an issue if we
    // don't have a parent node.
    return (
      <EditorProvider value={contextValue}>
        <div ref={node => (this.node = node)} key={contextValue.content['@id']}>
          {pageComponent}
        </div>
      </EditorProvider>
    );
  }
}

export default EditablePage;
