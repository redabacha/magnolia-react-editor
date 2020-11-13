const SERVER = 'http://localhost:8080';
const CONTEXT = '/magnoliaAuthor';

export const environment = {
  server: SERVER,
  context: CONTEXT,
  restUrlBase: SERVER + CONTEXT + '/.rest/delivery/pages/v1',
  templateAnnotationsBase: SERVER + CONTEXT + '/.rest/template-annotations/v1'
};
