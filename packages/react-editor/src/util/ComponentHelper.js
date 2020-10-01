import React from 'react';
import constants from './constants';

function componentHelper() {
  return {
    getRenderedComponent,
    getComponentProperties,
    addComment,
    classnames
  };

  function getRenderedComponent(componentContent, componentMappings) {
    if (
      !componentContent ||
      !componentMappings ||
      !componentMappings[componentContent[constants.TEMPLATE_ID_PROP]]
    ) {
      return React.createElement('div');
    }

    const componentClass =
      componentMappings[componentContent[constants.TEMPLATE_ID_PROP]];

    return React.createElement(
      componentClass,
      getComponentProperties(componentContent)
    );
  }

  function getComponentProperties(componentContent) {
    if (!componentContent || typeof componentContent !== 'object') {
      return {};
    }
    const props = {};
    const metadata = {};
    Object.keys(componentContent).forEach(key => {
      if (
        key.startsWith('@') ||
        key.startsWith('mgnl:') ||
        key.startsWith('jcr:')
      ) {
        metadata[key] = componentContent[key];
      } else {
        props[key] = componentContent[key];
      }
    });
    props.metadata = metadata;
    return props;
  }

  function addComment(element, openComment, closeComment) {
    if (typeof document === 'undefined' || !element) {
      return;
    }
    if (openComment) {
      const openCommentElement = document.createComment(openComment);
      element.insertBefore(openCommentElement, element.firstChild);
    }
    if (closeComment) {
      const closeCommentElement = document.createComment(closeComment);
      element.appendChild(closeCommentElement);
    }
  }

  function classnames(...arg) {
    const classes = [];
    arg.forEach(item => {
      if (item == null) {
        return;
      }
      const itemType = typeof item;
      if (itemType === 'string' || itemType === 'number') {
        classes.push(item);
      } else if (Array.isArray(item) && item.length) {
        classes.push(classnames(...item));
      } else if (itemType === 'object') {
        Object.keys(item).forEach(key => {
          if (item[key]) {
            classes.push(key);
          }
        });
      }
    });
    return classes.join(' ');
  }
}

export default componentHelper();
