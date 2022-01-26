export const isInIFrame = () =>
  typeof window === 'undefined' ? false : window !== window.parent;

export const isInEditor = () =>
  isInIFrame() && window.parent.location.hash.endsWith(':edit');

export const isInPreviewAsVisitor = () =>
  isInIFrame() && window.location.search.includes('mgnlPreviewAsVisitor=true');

export const refreshEditor = () => {
  window.parent.mgnlFrameReady?.();
  window.parent.mgnlRefresh?.();
};
