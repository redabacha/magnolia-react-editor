# Magnolia Template Annotations

Magnolia Template Annotations help making front-end projects editable in Magnolia. It does so by injecting annotations (HTML comments) around your components, which Magnolia's Page Editor transforms into controls for content editors.

## Installation

```sh
npm install --save @magnolia/template-annotations
```

## Usage

To use _TemplateAnnotations_, you need to import it:

```javascript
import { TemplateAnnotations } from '@magnolia/template-annotations';
```

_TemplateAnnotations_ module provides these functions:

```javascript
function getAreaCommentString(data: object, templateDefinition: object, componentCount?: number): string;
function getComponentCommentString(data: object, templateDefinition: object): string;
function getPageCommentString(data: object, templateDefinition: object): string;
```

## Changelog

See the [CHANGELOG.md](https://git.magnolia-cms.com/projects/MODULES/repos/frontend-helpers/browse/packages/template-annotations/CHANGELOG.md) file.
