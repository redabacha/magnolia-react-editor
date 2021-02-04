import { Component, Input } from '@angular/core';
import { TemplateAnnotations } from '@magnolia/template-annotations';
import { AbstractComponent } from '../abstract/abstract.component';

@Component({
  selector: 'editable-page',
  template: `
    <ng-template [ngIf]="openComment">
      <mgnl-comment [text]="openComment"></mgnl-comment>
    </ng-template>
    <ng-container #child></ng-container>
    `
})
export class EditablePage extends AbstractComponent {

  @Input() set content(content: object) {
    if (content) {
      if (this.editorContext.templateDefinitions) {
        // tslint:disable-next-line:max-line-length
        this.openComment = TemplateAnnotations.getPageCommentString(content, this.editorContext.getTemplateDefinition(content['mgnl:template']));
      } else if (this.editorContext.templateAnnotations) {
        this.openComment = this.editorContext.getTemplateAnnotation(content['@path']);
      }
    }
  }
}
