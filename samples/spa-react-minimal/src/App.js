import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { EditablePage } from '@magnolia/react-editor';
import { removeExtension, getVersion } from './app/AppHelpers';
import ENVIRONMENT from './environments/environment';
import COMPONENTS from './environments/mapping';

function App(props) {
    const [currentPath, setCurrentPath] = useState('');
    const [content, setContent] = useState(null);
    const [templateDefinitions, setTemplateDefinitions] = useState(null);
    const { history } = props;
    const config = { componentMappings: COMPONENTS };

    history.listen((location) => {
        if (location.pathname !== currentPath) {
            setCurrentPath(location.pathname);
        }
    });

    useEffect(() => {
        loadPageContent();
    }, [currentPath]);

    async function loadPageContent() {
        const { pathname } = window.location;
        const version = getVersion();
        const path = ENVIRONMENT.serverPath ? pathname.substr(ENVIRONMENT.serverPath.length) : pathname;
        const fullURL = `${version ? ENVIRONMENT.restUrlBasePreview : ENVIRONMENT.restUrlBase}${removeExtension(path)}${version ? `?version=${version}` : ''}`;
        const contentResponse = await fetch(fullURL);
        const contentResponseData = await contentResponse.json();
        const templateId = contentResponseData['mgnl:template'];
        if (!templateId) {
            return;
        }
        const templateEndpointUrl = `${ENVIRONMENT.templateDefinitionBase}/${templateId}`;

        // Loads the single page config
        const templateResponse = await fetch(templateEndpointUrl);
        const templateResponseData = await templateResponse.json();
        setContent(contentResponseData);
        setTemplateDefinitions(templateResponseData);
    }

    return templateDefinitions && content
        ? (<EditablePage templateDefinitions={templateDefinitions} content={content} config={config} />) : (<p>Loading...</p>);
}
App.propTypes = {
    history: PropTypes.object
};
App.defaultProps = {
    history: null
};

export default withRouter(App);
