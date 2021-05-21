import { useEditor } from '../hooks';
import { getAreaCommentString } from '../util';
import { Comment } from './Comment';
import { EditableComponent, EditableComponentProps } from './EditableComponent';

export type EditableAreaProps = {
  children?: React.ReactNode;
  content: any;
  parentTemplateId?: string;
  renderArea?: <T extends { children?: React.ReactNode }>(
    props: T
  ) => React.ReactElement;
  renderComponent?: <T extends EditableComponentProps>(
    props: T
  ) => React.ReactElement;
};

export const EditableArea = <
  T extends {} = React.HTMLAttributes<HTMLDivElement>
>({
  children,
  content,
  parentTemplateId,
  renderArea: propsRenderArea,
  renderComponent: propsRenderComponent,
  ...props
}: EditableAreaProps & T) => {
  const {
    content: pageContent,
    isEditor,
    renderArea: editorRenderArea,
    renderComponent: editorRenderComponent,
    templateAnnotations,
    templateDefinitions
  } = useEditor();

  const renderArea =
    propsRenderArea ?? editorRenderArea ?? (props => <div {...props} />);
  const renderComponent =
    propsRenderComponent ??
    editorRenderComponent ??
    (props => <EditableComponent {...props} />);

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
