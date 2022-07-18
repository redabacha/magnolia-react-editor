import { useEditor } from '../hooks';
import { getContentVariant, getRenderedComponent } from '../util';
import { Comment } from './Comment';

export type EditableComponentProps = {
  content: any;
};

export const EditableComponent = ({
  content: originalContent
}: EditableComponentProps) => {
  const { componentMappings, isEditor, templateAnnotations } = useEditor();

  const content = getContentVariant(originalContent, templateAnnotations);
  const component = getRenderedComponent(content, componentMappings);

  if (isEditor) {
    return (
      <Comment
        openComment={
          templateAnnotations?.[content?.['@path']] ??
          templateAnnotations?.[originalContent?.['@path']]
        }
        closeComment="/cms:component"
      >
        {component}
      </Comment>
    );
  }

  return component;
};
