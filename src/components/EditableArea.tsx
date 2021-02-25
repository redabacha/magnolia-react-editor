import React from 'react';
import { useEditor } from '../hooks';
import { getAreaCommentString } from '../util';
import { Comment } from './Comment';
import { EditableComponent, EditableComponentProps } from './EditableComponent';

export type EditableAreaProps<T> = React.HTMLAttributes<T> & {
  content: any;
  componentType?: React.ComponentType<EditableComponentProps>;
  elementType?: string;
  parentTemplateId?: string;
};

export const EditableArea = <T extends unknown = HTMLDivElement>({
  children,
  content,
  componentType: ComponentType = EditableComponent,
  elementType: ElementType = 'div',
  parentTemplateId,
  ...props
}: EditableAreaProps<T>) => {
  const {
    content: pageContent,
    isEditor,
    templateAnnotations,
    templateDefinitions
  } = useEditor();

  const component = (
    <ElementType {...props}>
      {children}
      {(content?.['@nodes'] ?? []).map((id: string) => (
        <ComponentType key={id} content={content[id]} />
      ))}
    </ElementType>
  );

  if (isEditor) {
    let openComment;

    if (templateAnnotations) {
      openComment = templateAnnotations[content['@path']];
    } else if (templateDefinitions) {
      openComment = getAreaCommentString(
        content,
        templateDefinitions[parentTemplateId ?? pageContent['mgnl:template']]
      );
    }

    return (
      <Comment openComment={openComment} closeComment="/cms:area">
        {component}
      </Comment>
    );
  }

  return component;
};
