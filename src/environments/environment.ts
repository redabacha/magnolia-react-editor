const SERVER = 'http://localhost:8080';
const SERVER_PATH = '';

export const environment = {
  server: SERVER,
  restUrlBase: SERVER + SERVER_PATH + '/.rest/delivery/pages/v1',
  templateDefinitionBase: SERVER + SERVER_PATH + '/.rest/templateDefinition/v1',
  serverPath: SERVER_PATH,
  rootCmsPath: '/angular-minimal',

  damUrl: SERVER + SERVER_PATH,
  staticFilePath:
    SERVER + SERVER_PATH + '/.resources/webresources/static'
};
