import { createContext, useContext } from 'react';
import { EditableComponentProps } from '../components/EditableComponent';

export const EditorContext = createContext<{
  componentMappings?: {
    [key: string]: React.ComponentType<any>;
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
}>({});

export const useEditor = () => useContext(EditorContext);
