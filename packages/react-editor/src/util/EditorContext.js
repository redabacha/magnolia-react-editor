import React from 'react';

const EditorContext = React.createContext();
export const EditorProvider = EditorContext.Provider;
export const EditorConsumer = EditorContext.Consumer;
export default EditorContext;
