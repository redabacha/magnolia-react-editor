import { useLayoutEffect, useRef } from 'react';

export type CommentProps = {
  children?: React.ReactNode;
  openComment?: string;
  closeComment?: string;
};

/**
 * Used to render HTML comments needed for magnolia editor to work.
 */
export const Comment = ({
  children,
  openComment,
  closeComment
}: CommentProps) => {
  const openNode = useRef<HTMLDivElement>(null);
  const closeNode = useRef<HTMLDivElement>(null);

  if (typeof document !== 'undefined') {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useLayoutEffect(() => {
      if (openComment) {
        openNode.current?.insertAdjacentHTML(
          'beforebegin',
          `<!--${openComment}-->`
        );
      }

      if (closeComment) {
        closeNode.current?.insertAdjacentHTML(
          'afterend',
          `<!--${closeComment}-->`
        );
      }
    }, [openComment, closeComment]);
  }

  return (
    <>
      <div ref={openNode} style={{ display: 'none' }} />
      {children}
      <div ref={closeNode} style={{ display: 'none' }} />
    </>
  );
};
