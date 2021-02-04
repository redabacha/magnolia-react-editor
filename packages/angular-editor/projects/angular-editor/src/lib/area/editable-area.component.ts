import { AfterViewInit, OnChanges, Component, Input, isDevMode } from '@angular/core';
import { TemplateAnnotations } from '@magnolia/template-annotations';
import { EditorContextService } from '../services/editor-context.service';

@Component({
  selector: '[editable-area]',
  template: `
    <ng-template [ngIf]="openComment">
      <mgnl-comment [text]="openComment"></mgnl-comment>
    </ng-template>
    <ng-content></ng-content>
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
  metadata: object;

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
      const metadata = {};
      Object.keys(content).forEach(key => {
        if (key.startsWith('@') || key.startsWith('mgnl:') || key.startsWith('jcr:')) {
          metadata[key] = content[key];
        } else {
          this[key.replace('-', '_')] = content[key];
        }
      });
      this.metadata = metadata;
    }
    return results;
  }

  ngAfterViewInit(): void {
    if (this.editorContext.inEditor()) {
      this.editorContext.refresh();
    }
  }

  ngOnChanges(): void {
    if (this.content && Object.entries(this.content).length > 0)  {
      this.components = this.getAreaComponents(this.content);

      if (this.editorContext.inEditor() || isDevMode()) {
          if (this.editorContext.templateDefinitions) {
            // tslint:disable-next-line:max-line-length
            this.openComment = TemplateAnnotations.getAreaCommentString(this.content, this.editorContext.getTemplateDefinition(this.parentTemplateId));
            this.closeComment = '/cms:area';
          } else if (this.editorContext.templateAnnotations) {
            this.openComment = this.editorContext.getTemplateAnnotation(this.content['@path']);
            this.closeComment = '/cms:area';
          }
      }
    }
  }
}
