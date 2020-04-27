# Magnolia React Editor

This library facilitates integration of front-end projects with Magnolia Page Editor.

## Usage

 1. Install the package:
```
npm install --save @magnolia/react-editor
```

 2. Connect to rest endpoints and use `<EditablePage>` directive in your component:
```
render() {
   const COMPONENTS_MAPPING = {
      'sample-light-module:components/title': TitleComponent,
      'sample-light-module:components/text-image': ImageComponent,
      'sample-light-module:pages/standard': HomePage
   };

   let response = await fetch(environment.restUrlBase + environment.rootPath);
   const content = await response.json();
   response = await fetch(environment.templateDefinitionBase + '/' + content['mgnl:template']);
   const templateDefinitions = response.json();
   const pageConfig = {templateDefinitions: templateDefinitions, componentMappings: COMPONENTS_MAPPING}

   return(
      <EditablePage content={content} config={pageConfig} />
   );
}
```

 3. Render areas inside your components using `<EditableArea>` directive:
```
<h2>Primary Area</h2>
<div className="col-12">
  <EditableArea key="main" content={mainAreaContent} />
</div>
```

## Changelog

See the [CHANGELOG.md](https://git.magnolia-cms.com/projects/MODULES/repos/frontend-helpers/browse/packages/react-editor/CHANGELOG.md) file.
