import React from 'react';
import constants from './constants';

function componentHelper() {
    return { getRenderedComponent };

    function getRenderedComponent(componentContent, componentMappings) {
        if (!componentContent || !componentMappings || !componentMappings[componentContent[constants.TEMPLATE_ID_PROP]]) {
            return React.createElement('div');
        }

        const componentClass = componentMappings[componentContent[constants.TEMPLATE_ID_PROP]];

        return React.createElement(componentClass, { content: componentContent });
    }
}

export default componentHelper();
