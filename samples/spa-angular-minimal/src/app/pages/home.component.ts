import { Component, Input } from '@angular/core';

@Component({
  template: `
    <div class="content-background">
      <div editable-area [content]="header" [parentTemplateId]="metadata['mgnl:template']"></div>
      <main class="container">
        <h1>{{title}}</h1>
        <div class="col-12">
          <h2>Standard area:</h2>
          <div editable-area [content]="mainArea" [parentTemplateId]="metadata['mgnl:template']"></div>
        </div>

        <div class="col-12">
          <h2>Custom area:</h2>
          <div custom-area [content]="customArea" [parentTemplateId]="metadata['mgnl:template']"></div>
        </div>

        <div class="col-12">
          <h2>NoComponent area:</h2>
          <div editable-area [content]="staticArea" [parentTemplateId]="metadata['mgnl:template']">
            <div class="alert alert-primary" role="alert">{{ staticArea.text }}</div>
          </div>
        </div>
      </main>
    </div>
  `
})
export class HomeComponent {
  // properties
  @Input() title: string;
  // areas
  @Input() header: object;
  @Input() mainArea: object;
  @Input() staticArea: object;
  @Input() customArea: object;
  // metadata
  @Input() metadata: object;
}
