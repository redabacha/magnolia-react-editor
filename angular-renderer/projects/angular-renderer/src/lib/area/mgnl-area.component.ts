import { Component, Input } from '@angular/core';
import { TemplateAnnotations } from '@magnolia/magnolia-template-annotations';
import { RendererContextService } from '../services/renderer-context.service';

@Component({
  selector: '[mgnl-area]',
  template: `
    <ng-template [ngIf]="openComment">
      <mgnl-comment [text]="openComment"></mgnl-comment>
    </ng-template>
    <ng-template ngFor let-component [ngForOf]="components">
        <mgnl-component [content]="component"></mgnl-component>
    </ng-template>
    <ng-template [ngIf]="closeComment">
      <mgnl-comment [text]="closeComment"></mgnl-comment>
    </ng-template>
  `
})
export class MagnoliaAreaComponent {
  constructor(private rendererContext: RendererContextService) { }

  components: object[];
  openComment: string;
  closeComment: string;

  @Input() public name: string;

  @Input() set content(content: object) {
    if (content) {
      this.components = this.getAreaComponents(content, this.name);

      if (this.rendererContext.isEditMode()) {
        this.openComment = TemplateAnnotations.getAreaCommentString(content[this.name], this.rendererContext.getTemplateDefinition(content['mgnl:template']));
        this.closeComment = '/cms:area';
      }
    }
  }

  private getAreaComponents(content: object, areaName: string) {
    const results = [];

    // Gets the area content
    const areaContent = content[areaName];

    if (areaContent) {
      const components = areaContent['@nodes'];
      components.forEach(nodeName => {
        const value = areaContent[nodeName];

        if (typeof(value) === 'object' && value['@nodeType'] === 'mgnl:component') {
          results.push(value);
        }
      });
    }
    return results;
  }
}
