# Magnolia Template Annotations

Magnolia Template Annotations help making front-end projects' content editable in Magnolia. +
It does so by injecting annotations (HTML comments really) around your components/templates, which Magnolia's Page Editor transforms into controls for web content authors/editors.

## Installation

```sh
npm install --save @magnolia/template-annotations
```

## Usage

To use *TemplateAnnotations*, you need to import it from *mgnl-service*:

```javascript
import { TemplateAnnotations } from '@magnolia/template-annotations';
```

*TemplateAnnotations* module provides these functions:

```javascript
function getAreaCommentString(data: object, templateDefinition: object, componentCount?: number): string;
function getComponentCommentString(data: object, templateDefinition: object): string;
function getPageCommentString(data: object, templateDefinition: object): string;
```
