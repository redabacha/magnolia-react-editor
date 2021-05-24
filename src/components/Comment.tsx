import { useLayoutEffect, useRef } from 'react';

export type CommentProps = {
  children?: React.ReactNode;
  openComment?: string;
  closeComment?: string;
};

/**
 * Used to render HTML comments needed for magnolia editor to work.
 * Will NOT delete previously rendered HTML comments on the page.
 */
export const Comment = ({
  children,
  openComment,
  closeComment
}: CommentProps) => {
  const openNode = useRef<HTMLDivElement>(null);
  const closeNode = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const currentOpenNode = openNode.current;
    const currentCloseNode = closeNode.current;

    if (openComment) {
      currentOpenNode?.insertAdjacentHTML(
        'beforebegin',
        `<!--${openComment}-->`
      );
    }

    if (closeComment) {
      currentCloseNode?.insertAdjacentHTML(
        'afterend',
        `<!--${closeComment}-->`
      );
    }

    return () => {
      if (currentOpenNode && openComment) {
        const sibling = currentOpenNode;

        while (
          sibling.previousSibling &&
          (sibling.previousSibling.nodeType === Node.COMMENT_NODE ||
            (sibling.previousSibling as HTMLElement).classList?.contains(
              'mgnlEditor'
            ))
        ) {
          sibling.previousSibling.remove();
        }
      }

      if (currentCloseNode && closeComment) {
        const sibling = currentCloseNode;

        while (
          sibling.nextSibling &&
          (sibling.nextSibling.nodeType === Node.COMMENT_NODE ||
            (sibling.nextSibling as HTMLElement).classList?.contains(
              'mgnlEditor'
            ))
        ) {
          sibling.nextSibling.remove();
        }
      }
    };
  }, [openComment, closeComment]);

  return (
    <>
      <div ref={openNode} style={{ display: 'none' }} />
      {children}
      <div ref={closeNode} style={{ display: 'none' }} />
    </>
  );
};
