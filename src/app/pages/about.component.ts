import { Component, Input } from '@angular/core';

@Component({
  template: `
    <div class="content-background">
      <div editable-area [content]="header" [parentTemplateId]="metadata['mgnl:template']"></div>
      <main class="container">
        <h1>{{ title }}</h1>

        <div>
          <div class="col-12">
            <div editable-area [content]="mainArea" [parentTemplateId]="metadata['mgnl:template']"></div>
          </div>
        </div>
      </main>
    </div>
  `
})
export class AboutComponent {
  // properties
  @Input() title: string;
  // areas
  @Input() header: object;
  @Input() mainArea: object;
  // metadata
  @Input() metadata: object;
}
