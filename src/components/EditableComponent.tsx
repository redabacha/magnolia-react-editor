import { useEditor } from '../hooks';
import {
  getComponentCommentString,
  getContentVariant,
  getRenderedComponent
} from '../util';
import { Comment } from './Comment';

export type EditableComponentProps = {
  content: any;
};

export const EditableComponent = ({
  content: originalContent
}: EditableComponentProps) => {
  const {
    componentMappings,
    isEditor,
    templateAnnotations,
    templateDefinitions
  } = useEditor();

  const content = getContentVariant(originalContent, templateAnnotations);
  const component = getRenderedComponent(content, componentMappings);

  if (isEditor) {
    return (
      <Comment
        openComment={
          templateAnnotations?.[originalContent['@path']] ??
          getComponentCommentString(
            originalContent,
            templateDefinitions?.[originalContent['mgnl:template']]
          )
        }
        closeComment="/cms:component"
      >
        {component}
      </Comment>
    );
  }

  return component;
};
