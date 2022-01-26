import { isInEditor, isInPreviewAsVisitor } from './editor';

export const getContentVariant = (
  content: any,
  templateAnnotations?: Record<string, string>
) => {
  if (
    !content ||
    !templateAnnotations ||
    !isInEditor() ||
    isInPreviewAsVisitor()
  ) {
    return content;
  }

  const variant = templateAnnotations[content['@path']]?.match(
    /selectedVariant="(.+)"/
  )?.[1];

  if (!variant || variant === content['@name']) {
    return content;
  }

  const contentVariant = content[variant];

  if (!contentVariant) {
    console.warn(`Missing variant ${variant} for content ${content['@path']}.`);
    return content;
  }

  return contentVariant;
};
