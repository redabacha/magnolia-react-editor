import { Component, Input } from '@angular/core';

@Component({
  template: `
    <div class="container">
      <div editable-area [content]="header" [parentTemplateId]="metadata['mgnl:template']"></div>
      <h1>{{ title }}</h1>

      <div>
        <h2>Primary Area</h2>
        <div class="col-12">
          <div editable-area [content]="main_area" [parentTemplateId]="metadata['mgnl:template']"></div>
        </div>
      </div>

      <button class="btn btn-primary" routerLink="/">Home</button>
    </div>
  `
})
export class AboutComponent {
  // properties
  @Input() title: any;
  // areas
  @Input() header: any;
  @Input() main_area: any;
  // metadata
  @Input() metadata: any;
}
