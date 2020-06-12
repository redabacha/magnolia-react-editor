import { AfterViewInit, OnChanges, Component, Input, isDevMode } from '@angular/core';
import { TemplateAnnotations } from '@magnolia/template-annotations';
import { EditorContextService } from '../services/editor-context.service';

@Component({
  selector: '[editable-area]',
  template: `
    <ng-template [ngIf]="openComment">
      <mgnl-comment [text]="openComment"></mgnl-comment>
    </ng-template>
    <ng-template ngFor let-component [ngForOf]="components">
        <editable-component [content]="component"></editable-component>
    </ng-template>
    <ng-template [ngIf]="closeComment">
      <mgnl-comment [text]="closeComment"></mgnl-comment>
    </ng-template>
  `
})
export class EditableArea implements AfterViewInit, OnChanges {
  constructor(public editorContext: EditorContextService) { }

  components: object[] = [];
  openComment: string;
  closeComment: string;

  @Input() parentTemplateId: string;
  @Input() content: object;

  private getAreaComponents(content: object) {
    const results = [];

    if (content) {
      const components = content['@nodes'];
      components.forEach(nodeName => {
        const value = content[nodeName];

        if (typeof(value) === 'object' && value['@nodeType'] === 'mgnl:component') {
          results.push(value);
        }
      });
    }
    return results;
  }

  ngAfterViewInit(): void {
    if (this.editorContext.inEditor()) {
      this.editorContext.refresh();
    }
  }

  ngOnChanges(): void {
    if (this.content && Object.entries(this.content).length > 0 && this.parentTemplateId)  {
      this.components = this.getAreaComponents(this.content);

      if (this.editorContext.inEditor() || isDevMode()) {
        // tslint:disable-next-line:max-line-length
        this.openComment = TemplateAnnotations.getAreaCommentString(this.content, this.editorContext.getTemplateDefinition(this.parentTemplateId));
        this.closeComment = '/cms:area';
      }
    }
  }
}
