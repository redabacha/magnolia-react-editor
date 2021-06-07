import { createElement as _createElement } from 'react';

export const getComponentProperties = content => {
  const props = { metadata: {} };

  Object.keys(content).forEach(key => {
    if (
      key.startsWith('@') ||
      key.startsWith('mgnl:') ||
      key.startsWith('jcr:')
    ) {
      props.metadata[key] = content[key];
    } else {
      props[key] = content[key];
    }
  });

  return props;
};

export const getRenderedComponent = (
  content,
  componentMappings,
  createElement = _createElement
) => {
  if (!content || !componentMappings) {
    return createElement('div');
  }

  const componentClass = componentMappings[content['mgnl:template']];

  if (!componentClass) {
    console.error(`Component ${content['mgnl:template']} is not mapped.`, content);
    return createElement('div');
  }

  return createElement(componentClass, getComponentProperties(content));
};
