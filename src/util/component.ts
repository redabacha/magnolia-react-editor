import { createElement } from 'react';

export const getComponentProperties = (content: any) => {
  const props: {
    key: string;
    metadata: Record<string, string>;
    [name: string]: unknown;
  } = { key: content['@id'], metadata: {} };

  Object.keys(content).forEach(key => {
    if (
      key === 'masterContent' ||
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
  content: any,
  componentMappings?: Record<string, React.ComponentType<any>>
) => {
  if (!content || !componentMappings) {
    return createElement('div');
  }

  const componentClass = componentMappings[content['mgnl:template']];

  if (!componentClass) {
    console.log(
      JSON.stringify({
        message: `[magnolia-react-editor] Component ${content['mgnl:template']} is not mapped.`,
        content
      })
    );
    return createElement('div');
  }

  return createElement(componentClass, getComponentProperties(content));
};
