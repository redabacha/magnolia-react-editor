import { useEditor } from '../hooks';
import { getAreaCommentString, getContentVariant } from '../util';
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
  content: originalContent,
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

  const content = getContentVariant(originalContent, templateAnnotations);
  const component = renderArea({
    ...props,
    children: [
      children,
      (content?.['@nodes'] ?? []).map((name: string) =>
        renderComponent({
          content: content[name],
          key: content[name]?.['@id'] ?? name
        })
      )
    ],
    key: content?.['@id']
  });

  if (isEditor) {
    return (
      <Comment
        openComment={
          templateAnnotations?.[originalContent['@path']] ??
          getAreaCommentString(
            originalContent,
            templateDefinitions?.[
              parentTemplateId ?? pageContent['mgnl:template']
            ]
          )
        }
        closeComment="/cms:area"
      >
        {component}
      </Comment>
    );
  }

  return component;
};
