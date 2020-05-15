import { Component, Input } from '@angular/core';

@Component({
  template: `
    <div class="container">
      <h1 class="bd-title">{{title}}</h1>
      <div class="row">
        <div class="col-sm">
          <div editable-area [content]="left" [parentTemplateId]="metadata['mgnl:template']"></div>
        </div>
        <div class="col-sm">
          <div editable-area [content]="right" [parentTemplateId]="metadata['mgnl:template']"></div>
        </div>
      </div>
    </div>
  `
})
export class TwoColumnsComponent {
  @Input() title: string;
  @Input() left: object;
  @Input() right: object;
  // metadata
  @Input() metadata: object;
}
