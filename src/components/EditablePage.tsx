import { useEffect } from 'react';
import { EditorContext } from '../hooks';
import {
  getContentVariant,
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
};

export const EditablePage = ({
  children,
  config: { componentMappings },
  content: originalContent,
  isEditor = isInEditor(),
  renderArea,
  renderComponent,
  templateAnnotations
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
    component = (
      <Comment
        openComment={
          templateAnnotations?.[content?.['@path']] ??
          templateAnnotations?.[originalContent?.['@path']]
        }
        closeComment="/cms:page"
      >
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
        templateAnnotations
      }}
    >
      {component}
    </EditorContext.Provider>
  );
};
