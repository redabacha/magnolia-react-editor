import { useEditor } from '../hooks';
import { getAreaCommentString } from '../util';
import { Comment } from './Comment';
import { EditableComponent, EditableComponentProps } from './EditableComponent';

export type EditableAreaProps = {
  content: any;
  parentTemplateId?: string;
  renderArea?: <
    T extends {
      children?: React.ReactNode;
    } = React.HTMLAttributes<HTMLDivElement>
  >(
    props: T
  ) => React.ReactElement;
  renderComponent?: <T extends EditableComponentProps>(
    props: T
  ) => React.ReactElement;
};

export const EditableArea = <
  T extends {
    children?: React.ReactNode;
  } = React.HTMLAttributes<HTMLDivElement>
>({
  children,
  content,
  parentTemplateId,
  renderArea = props => <div {...props} />,
  renderComponent = props => <EditableComponent {...props} />,
  ...props
}: EditableAreaProps & T) => {
  const {
    content: pageContent,
    isEditor,
    templateAnnotations,
    templateDefinitions
  } = useEditor();

  const component = renderArea({
    ...props,
    children: [
      children,
      (content?.['@nodes'] ?? []).map((id: string) =>
        renderComponent({ content: content[id], key: id })
      )
    ]
  });

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
