import { Component, OnChanges, SimpleChanges } from '@angular/core';

import { TemplateAnnotations } from '@magnolia/magnolia-template-annotations';
import { AbstractComponent } from '../abstract/abstract.component';

@Component({
  selector: 'mgnl-component',
  template: `
    <ng-template [ngIf]="openComment">
      <mgnl-comment [text]="openComment"></mgnl-comment>
    </ng-template>
    <ng-container #child></ng-container>
    <ng-template [ngIf]="closeComment">
      <mgnl-comment [text]="closeComment"></mgnl-comment>
    </ng-template>
    `
})
export class MagnoliaComponent extends AbstractComponent implements OnChanges {
  ngOnChanges(changes: SimpleChanges): void {
    const content = changes.content.currentValue;
    if (this.rendererContext.isEditMode() && content) {
      this.openComment = TemplateAnnotations.getComponentCommentString(content, this.rendererContext.getTemplateDefinition(content['mgnl:template']));
      this.closeComment = '/cms:component';
    }
  }
}
