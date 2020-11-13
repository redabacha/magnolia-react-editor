const SERVER = 'http://localhost:8080';
const CONTEXT = '/magnoliaAuthor';

export const environment = {
  server: SERVER,
  rootPath: '/angular-minimal',
  restUrlBase: SERVER + CONTEXT + '/.rest/delivery/pages/v1',
  restPreviewUrlBase: SERVER + CONTEXT + '/.rest/preview/pages/v1',
  templateDefinitionBase: SERVER + CONTEXT + '/.rest/template-definitions/v1'
};
