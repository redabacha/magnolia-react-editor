# Magnolia Angular Editor

Angular library which facilitates integration of front-end projects with Magnolia Page Editor.

## Usage

 1. Install the package:

```
npm install --save @magnolia/angular-editor
```

 2. Add `MagnoliaModule` into imports of your `app.module.ts`.

 3. Connect to REST endpoint and use `mgnl-page` in your `app.component.ts` (or other host component):
```
@Component({
  template: '<mgnl-page [content]="content"></mgnl-page>'
})
export class AppComponent implements OnInit
  constructor(private http: HttpClient, private rendererContext: RendererContextService) { }

  @Input() content: any;

  ngOnInit(): void {
    this.rendererContext.setComponentMapping({
      'angular-magnolia-int:pages/home': ListOfGroceriesCompnent,
      'angular-magnolia-int:components/textImage': TextImageComponent,
      'angular-magnolia-int:components/paragraph': ParagraphComponent,
    });

    this.http.get(environment.restUrlBase + environment.rootPath`).subscribe(content => {
      // request the template definitions for given page
      this.http.get(environment.templateDefinitionBase + '/' + content['mgnl:template']).subscribe(definitions => {
        this.rendererContext.setTemplateDefinitions(definitions);
        this.content = content;
      });
    });
  }
}
```

 4. Because these components are not specified in any template, they need to be added to `entryComponents`. (See [documentation](https://angular.io/guide/entry-components))

 5. Render areas inside your components using `mgnl-area` directive:
```
<h2>{{ content.pageTitle }}</h3>
<ul mgnl-area [content]="content" [name]="'area-name'"></ul>
```
