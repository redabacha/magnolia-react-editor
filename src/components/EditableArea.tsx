import React from 'react';
import { useEditor } from '../hooks';
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
  ...props
}: EditableAreaProps<T>) => {
  const { isEditor, templateAnnotations } = useEditor();

  const component = (
    <ElementType {...props}>
      {children}
      {(content?.['@nodes'] ?? []).map((id: string) => (
        <ComponentType key={id} content={content[id]} />
      ))}
    </ElementType>
  );

  if (isEditor) {
    return (
      <Comment
        openComment={templateAnnotations?.[content['@path']]}
        closeComment="/cms:area"
      >
        {component}
      </Comment>
    );
  }

  return component;
};
