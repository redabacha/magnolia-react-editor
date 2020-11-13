const SERVER = 'http://localhost:8080';
const SERVER_PATH = '/magnoliaAuthor';

export const environment = {
  server: SERVER,
  serverPath: SERVER_PATH,
  restUrlBase: SERVER + SERVER_PATH + '/.rest/delivery/pages/v1',
  restPreviewUrlBase: SERVER + SERVER_PATH + '/.rest/preview/pages/v1',
  templateAnnotationsBase: SERVER + SERVER_PATH + '/.rest/template-annotations/v1'
};
