import { Component, ComponentFactoryResolver, Input, OnChanges, SimpleChanges } from '@angular/core';

import { TemplateAnnotations } from '@magnolia/template-annotations';
import { AbstractComponent } from '../abstract/abstract.component';
import { RendererContextService } from '../services/renderer-context.service';
import { WindowRefService } from '../services/windowref.service';

@Component({
  selector: 'mgnl-page',
  template: `
    <ng-template [ngIf]="openComment">
      <mgnl-comment [text]="openComment"></mgnl-comment>
    </ng-template>
    <ng-content></ng-content>
    <ng-template [ngIf]="closeComment">
      <mgnl-comment [text]="closeComment"></mgnl-comment>
    </ng-template>
    `
})
export class MgnlPageComponent {
  constructor(public rendererContext: RendererContextService) { }

  openComment: string;
  closeComment: string;

  @Input() set content(content: object) {
    if (content && this.rendererContext.isEditMode()) {
      this.openComment = TemplateAnnotations.getPageCommentString(content, this.rendererContext.getTemplateDefinition(content['mgnl:template']));
      this.closeComment = '/cms:page';
    }
  }
}
