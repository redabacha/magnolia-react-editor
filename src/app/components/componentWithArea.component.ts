import { Component, Input } from '@angular/core';

@Component({
  template: `
    <div class="container">
      <div editable-area [content]="nested_area" [parentTemplateId]="metadata['mgnl:template']"></div>
    </div>
  `
})
export class ComponentWithAreaComponent {
  @Input() nested_area: any;
  // metadata
  @Input() metadata: any;
}
