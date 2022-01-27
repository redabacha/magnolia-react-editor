# Magnolia React

[![npm](https://shields.io/npm/v/@redabacha/magnolia-react-editor)](https://www.npmjs.com/package/@redabacha/magnolia-react-editor)
[![license](https://shields.io/github/license/redabacha/magnolia-react-editor)](https://github.com/redabacha/magnolia-react-editor/blob/main/LICENSE)

## Forked from https://git.magnolia-cms.com/projects/MODULES/repos/frontend-helpers/browse/packages/react-editor

## Differences to upstream

- significantly smaller (and now treeshakeable) bundle ([4kB minified](https://bundlephobia.com/package/@redabacha/magnolia-react-editor@2.3.1) vs [35kB minified](https://bundlephobia.com/package/@magnolia/react-editor@1.2.1-beta2))
- esmodule support
- rewritten with react hooks
- rewritten in typescript
- many fixes and improvements, some notable ones include:
  - rewritten html comment injection to not make assumptions about page layout and only ever render html comments in the spa editor
  - proper rerendering of components in the page
  - better logging for certain warnings and errors to make debugging much easier
  - fix for p13n of components with areas (see [MGNLFE-147](https://jira.magnolia-cms.com/browse/MGNLFE-147))
- slightly different but more flexible api to override default render behavior of areas and components
- no ssr support in spa editor
