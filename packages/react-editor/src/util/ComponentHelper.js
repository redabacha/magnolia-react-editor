import React from 'react';
import constants from './constants';

function componentHelper() {
    return { getRenderedComponent, getComponentProperties };

    function getRenderedComponent(componentContent, componentMappings) {
        if (!componentContent || !componentMappings || !componentMappings[componentContent[constants.TEMPLATE_ID_PROP]]) {
            return React.createElement('div');
        }

        const componentClass = componentMappings[componentContent[constants.TEMPLATE_ID_PROP]];

        return React.createElement(componentClass, getComponentProperties(componentContent));
    }

    function getComponentProperties(componentContent) {
        if (!componentContent || typeof componentContent !== 'object') {
            return {};
        }
        const props = {};
        const metadata = {};
        Object.keys(componentContent).forEach(key => {
            if (key.startsWith('@') || key.startsWith('mgnl:') || key.startsWith('jcr:')) {
                metadata[key] = componentContent[key];
            } else {
                props[key] = componentContent[key];
            }
        });
        props.metadata = metadata;
        return props;
    }
}

export default componentHelper();
