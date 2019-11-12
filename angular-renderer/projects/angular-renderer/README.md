# Angular Renderer

Angular library for easy integration with Magnolia CMS.

## Usage

 1. Add `@magnolia/angular-renderer` to your dependencies.

 2. Add `MagnoliaModule` into imports of your `app.module.ts`.

 3. Connect to REST endpoint and use `mgnl-page` in your `app.component.ts` (or other host component):
````
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

    this.http.get(environment.restUrlBase + environment.rootCmsPath).pipe()
        .subscribe(data => {
            this.content = data;
        });
  }
}
````

 4. Because these components are not specified in any template, we need to add them to `entryComponents`. (See [documentation](https://angular.io/guide/entry-components))

 5. Render areas inside your components using `mgnl-area` directive:
````
<h2>{{ content.pageTitle }}</h3>
<ul mgnl-area [content]="content" [name]="'area-name'"></ul>
````

 6. To enable editing mode in Magnolia page editor, you need to obtain also template definitions from separate REST endpoint:
````
this.http.get(environment.restUrlBase + environment.rootCmsPath).pipe()
    .subscribe(data => {
        this.content = data;

        this.http.get(environment.templateDefinitionBase + this.content['mgnl:template']).pipe()
            .subscribe(definitions => {
                this.rendererContext.setTemplateDefinitions(definitions);
            });
    });
````
