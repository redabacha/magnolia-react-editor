import React, { useLayoutEffect } from 'react';
import { EditorContext } from '../hooks';
import { getPageCommentString, getRenderedComponent } from '../util';
import { Comment } from './Comment';

export type EditablePageProps = {
  children?: React.ReactNode;
  config: {
    componentMappings: {
      [key: string]: React.ComponentType<any>;
    };
  };
  content: any;
  isEditor?: boolean;
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
  templateAnnotations,
  templateDefinitions
}: EditablePageProps) => {
  // should run once after html comments have been injected
  useLayoutEffect(() => {
    if (isEditor) {
      window.parent.mgnlFrameReady?.();
      window.parent.mgnlRefresh?.();
    }
  }, [isEditor]);

  let component: React.ReactElement =
    getRenderedComponent(content, componentMappings) ?? children;

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
        templateAnnotations,
        templateDefinitions
      }}
    >
      {component}
    </EditorContext.Provider>
  );
};
