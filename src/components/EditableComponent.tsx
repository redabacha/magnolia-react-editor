import { useEditor } from '../hooks';
import { getComponentCommentString, getRenderedComponent } from '../util';
import { Comment } from './Comment';

export type EditableComponentProps = {
  content: any;
};

export const EditableComponent = ({ content }: EditableComponentProps) => {
  const {
    componentMappings,
    isEditor,
    templateAnnotations,
    templateDefinitions
  } = useEditor();

  const component = getRenderedComponent(content, componentMappings);

  if (isEditor) {
    let openComment;

    if (templateAnnotations) {
      openComment = templateAnnotations[content['@path']];
    } else if (templateDefinitions) {
      openComment = getComponentCommentString(
        content,
        templateDefinitions[content['mgnl:template']]
      );
    }

    return (
      <Comment openComment={openComment} closeComment="/cms:component">
        {component}
      </Comment>
    );
  }

  return component;
};
