import React from 'react';
import { TemplateAnnotations } from '@magnolia/template-annotations';
import PropTypes from 'prop-types';
import {
  EditorProvider,
  ComponentHelper,
  constants,
  EditorContextHelper
} from '../../util';

class EditablePage extends React.PureComponent {
  static propTypes = {
    children: PropTypes.elementType,
    config: PropTypes.shape({
      componentMappings: PropTypes.object
    }),
    content: PropTypes.object,
    isDevMode: PropTypes.bool,
    templateDefinitions: PropTypes.object
  };

  static defaultProps = {
    children: null,
    config: {
      componentMappings: {}
    },
    content: null,
    isDevMode: process.env.NODE_ENV === 'development',
    templateDefinitions: null
  };

  componentDidMount() {
    this.addCloseComment();
    this.addOpenComment();
    EditorContextHelper.refresh();
  }

  // eslint-disable-next-line camelcase
  UNSAFE_componentWillUpdate() {
    this.node.firstChild.remove();
  }

  componentDidUpdate() {
    this.addOpenComment();
    EditorContextHelper.refresh();
  }

  addOpenComment() {
    const contextValue = this.getContextValue();
    if (!this.node) {
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
    ComponentHelper.addComment(this.node, openComment);
  }

  addCloseComment() {
    ComponentHelper.addComment(this.node, '/cms:page');
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
    const { content, config, isDevMode, templateDefinitions } = this.props;
    const { componentMappings } = config;

    return {
      componentMappings,
      content,
      isDevMode,
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
