# Magnolia Angular Editor

Angular library which facilitates integration of front-end projects with Magnolia Page Editor.

## Usage

 1. Install the package:

```
npm install --save @magnolia/angular-editor
```

 2. Add `MagnoliaModule` into imports of your `app.module.ts`.

 3. Connect to REST endpoint and use `editable-page` in your `app.component.ts` (or other host component):
```
@Component({
  template: '<editable-page [content]="content"></editable-page>'
})
export class AppComponent implements OnInit
  constructor(private http: HttpClient, private editorContext: EditorContextService) { }

  @Input() content: any;

  ngOnInit(): void {
    this.editorContext.setComponentMapping({
      'angular-magnolia-int:pages/home': ListOfGroceriesCompnent,
      'angular-magnolia-int:components/textImage': TextImageComponent,
      'angular-magnolia-int:components/paragraph': ParagraphComponent,
    });

    this.http.get(environment.restUrlBase + environment.rootPath`).subscribe(content => {
      // request the template definitions for given page
      this.http.get(environment.templateDefinitionBase + '/' + content['mgnl:template']).subscribe(definitions => {
        this.editorContext.setTemplateDefinitions(definitions);
        this.content = content;
      });
    });
  }
}
```

 4. Because these components are not specified in any template, they need to be added to `entryComponents`. (See [documentation](https://angular.io/guide/entry-components))

 5. Render areas inside your components using `editable-area` directive:
```
<h2>{{ content.pageTitle }}</h3>
<ul editable-area [content]="content" [name]="'area-name'"></ul>
```
