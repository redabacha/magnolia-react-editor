import { useEffect } from 'react';
import { EditorContext } from '../hooks';
import {
  getContentVariant,
  getPageCommentString,
  getRenderedComponent,
  isInEditor,
  refreshEditor
} from '../util';
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
  templateAnnotations?: Record<string, string>;
  /** @deprecated */
  templateDefinitions?: Record<string, any>;
};

export const EditablePage = ({
  children,
  config: { componentMappings },
  content: originalContent,
  isEditor = isInEditor(),
  renderArea,
  renderComponent,
  templateAnnotations,
  templateDefinitions
}: EditablePageProps) => {
  // should run once after html comments have been injected
  useEffect(() => {
    if (isEditor) {
      refreshEditor();
    }
  }, [isEditor]);

  const content = getContentVariant(originalContent, templateAnnotations);
  let component = children ?? getRenderedComponent(content, componentMappings);

  if (isEditor) {
    let openComment;

    if (templateAnnotations) {
      openComment = templateAnnotations[originalContent['@path']];
    } else if (templateDefinitions) {
      openComment = getPageCommentString(
        originalContent,
        templateDefinitions[originalContent['mgnl:template']]
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
