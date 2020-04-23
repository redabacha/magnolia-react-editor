import { Component, isDevMode, Input } from '@angular/core';

import { TemplateAnnotations } from '@magnolia/template-annotations';
import { AbstractComponent } from '../abstract/abstract.component';

@Component({
  selector: 'editable-component',
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
export class EditableComponent extends AbstractComponent {
  @Input() set content(content: object) {
    if ((this.editorContext.inEditor() || isDevMode()) && content) {
      this.openComment = TemplateAnnotations.getComponentCommentString(content, this.editorContext.getTemplateDefinition(content['mgnl:template']));
      this.closeComment = '/cms:component';
    }
  }
}
