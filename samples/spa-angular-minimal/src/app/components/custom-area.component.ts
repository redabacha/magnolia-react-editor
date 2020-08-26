import { Component, Input } from '@angular/core';
import { EditableArea } from '@magnolia/angular-editor';

@Component({
  selector: '[custom-area]',
  template: `
    <div class="container">
      <div class="row">
        <ng-template ngFor let-component [ngForOf]="components">
          <editable-component [content]="component" class="col-sm-4"></editable-component>
        </ng-template>
      </div>
    </div>
  `
})
export class CustomArea extends EditableArea {
}
