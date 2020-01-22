// In this sample code, we use this file to configure server URLs

const SERVER = 'http://localhost:8080';
const SERVER_PATH = '/magnoliaAuthor';

const ENVIRONMENT = {
    server: SERVER,
    restUrlBase: `${SERVER + SERVER_PATH}/.rest/delivery/pages/v1`,
    templateDefinitionBase: `${SERVER + SERVER_PATH}/.rest/templateDefinition/v1`,
    serverPath: SERVER_PATH,
    rootCmsPath: '/react-sample',

    damUrl: SERVER + SERVER_PATH,
    staticFilePath: `${SERVER + SERVER_PATH}/.resources/webresources/static`
};

export default ENVIRONMENT;
