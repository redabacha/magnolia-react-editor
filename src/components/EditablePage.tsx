import { useEffect } from 'react';
import { EditorContext } from '../hooks';
import { getPageCommentString, getRenderedComponent } from '../util';
import { Comment } from './Comment';
import { EditableComponentProps } from './EditableComponent';

export type EditablePageProps = {
  children?: React.ReactNode;
  config: {
    componentMappings: {
      [key: string]: React.ComponentType<any>;
    };
  };
  content?: any;
  isEditor?: boolean;
  renderArea?: <T extends { children?: React.ReactNode }>(
    props: T
  ) => React.ReactElement;
  renderComponent?: <T extends EditableComponentProps>(
    props: T
  ) => React.ReactElement;
  templateAnnotations?: { [template: string]: string };
  /** @deprecated */
  templateDefinitions?: { [template: string]: any };
};

export const EditablePage = ({
  children,
  config: { componentMappings },
  content,
  isEditor = typeof window !== 'undefined' &&
    window.frameElement?.className.includes('gwt-Frame') &&
    window.parent.location.hash.endsWith(':edit'),
  renderArea,
  renderComponent,
  templateAnnotations,
  templateDefinitions
}: EditablePageProps) => {
  useEffect(() => {
    if (isEditor) {
      window.parent.mgnlFrameReady?.();
      window.parent.mgnlRefresh?.();
    }
  });

  let component = children ?? getRenderedComponent(content, componentMappings);

  if (isEditor) {
    let openComment;

    if (templateAnnotations) {
      openComment = templateAnnotations[content['@path']];
    } else if (templateDefinitions) {
      openComment = getPageCommentString(
        content,
        templateDefinitions[content['mgnl:template']]
      );
    }

    component = (
      <Comment openComment={openComment} closeComment="/cms:page">
        {component}
      </Comment>
    );
  }

  return (
    <EditorContext.Provider
      value={{
        componentMappings,
        content,
        isEditor,
        renderArea,
        renderComponent,
        templateAnnotations,
        templateDefinitions
      }}
    >
      {component}
    </EditorContext.Provider>
  );
};
