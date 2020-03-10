import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Page } from '@magnolia/react-editor';
import { removeExtension } from './app/AppHelpers';
import ENVIRONMENT from './environments/environment';
import COMPONENTS from './environments/mapping';

function App(props) {
    const [currentPath, setCurrentPath] = useState('');
    const [content, setContent] = useState(null);
    const [templateDefinitions, setTemplateDefinitions] = useState(null);
    const { history } = props;

    history.listen((location) => {
        // NOTE: Set old content to null to force re-rendering
        setContent(null);
        setTemplateDefinitions(null);
        setCurrentPath(location.pathname);
    });

    useEffect(() => {
        loadPageContent();
    }, [currentPath]);

    async function loadPageContent() {
        const { pathname } = window.location;
        const path = ENVIRONMENT.serverPath ? pathname.substr(ENVIRONMENT.serverPath.length) : pathname;
        const fullURL = `${ENVIRONMENT.restUrlBase}${removeExtension(path)}`;
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
        ? (<Page templateDefinitions={templateDefinitions} content={content} componentMappings={COMPONENTS} />) : (<p>Loading...</p>);
}
App.propTypes = {
    history: PropTypes.object
};
App.defaultProps = {
    history: null
};

export default withRouter(App);
