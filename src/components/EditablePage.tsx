import { useEffect } from 'react';
import { EditorContext } from '../hooks';
import { getRenderedComponent } from '../util';
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
  templateAnnotations
}: EditablePageProps) => {
  // should run once after html comments have been injected
  useEffect(() => {
    if (isEditor) {
      window.parent.mgnlFrameReady?.();
      window.parent.mgnlRefresh?.();
    }
  }, [isEditor]);

  let component = children ?? getRenderedComponent(content, componentMappings);

  if (isEditor) {
    component = (
      <Comment
        openComment={templateAnnotations?.[content['@path']]}
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
