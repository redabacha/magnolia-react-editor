import React from 'react';
import { useEditor } from '../hooks';
import { getRenderedComponent } from '../util';
import { Comment } from './Comment';

export type EditableComponentProps = {
  content: any;
};

export const EditableComponent = ({ content }: EditableComponentProps) => {
  const { componentMappings, isEditor, templateAnnotations } = useEditor();

  const component = getRenderedComponent(content, componentMappings);

  if (isEditor) {
    return (
      <Comment
        openComment={templateAnnotations?.[content['@path']]}
        closeComment="/cms:component"
      >
        {component}
      </Comment>
    );
  }

  return component;
};
