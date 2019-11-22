import React from 'react';

const RendererContext = React.createContext();
export const RendererProvider = RendererContext.Provider;
export const RendererConsumer = RendererContext.Consumer;
export default RendererContext;
