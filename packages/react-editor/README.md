# Magnolia React Editor

This library facilitates integration of front-end projects with Magnolia Page Editor.

## Usage

 1. Install the package:
```
npm install --save @magnolia/react-editor
```

 2. Connect to rest endpoints and use `<Page>` directive in your component:
```
render() {
   const COMPONENTS = {
      'sample-light-module:components/title': TitleComponent,
      'sample-light-module:components/text-image': ImageComponent,
      'sample-light-module:pages/standard': HomePage
   };

   let response = await fetch(environment.restUrlBase + environment.rootPath);
   const content = await response.json();
   response = await fetch(environment.templateDefinitionBase + '/' + content['mgnl:template']);
   const templateDefinitions = response.json();

   return(
      <Page templateDefinitions={templateDefinitions} content={content} componentMappings={COMPONENTS} />
   );
}
```

 3. Render areas inside your components using `<Area>` directive:
```
<h2>Primary Area</h2>
<div className="col-12">
  <Area key="main" content={mainAreaContent} />
</div>
```
