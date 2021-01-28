import { Injectable, Type } from '@angular/core';
import { EditorContextHelper } from '@magnolia/template-annotations';

@Injectable({
  providedIn: 'root'
})
export class EditorContextService {
  /** Component mapping */
  componentMapping = {};
  /** Template definitions */
  templateDefinitions = null;
  /** Template annotations */
  templateAnnotations = null;

  public inEditor(): boolean {
    return EditorContextHelper.inEditor();
  }

  public refresh(): void {
    EditorContextHelper.refresh();
  }

  public inEditorPreview(): boolean {
    return EditorContextHelper.inEditorPreview();
  }

  public onFrameReady(): void {
    EditorContextHelper.onFrameReady();
  }

  public setComponentMapping(componentMapping: object): void {
    this.componentMapping = componentMapping;
  }

  public getComponentMapping(templateId: string): Type<object> {
    return this.componentMapping ? this.componentMapping[templateId] : null;
  }

  public setTemplateDefinitions(templateDefinitions: object): void {
    this.templateDefinitions = templateDefinitions;
  }

  public getTemplateDefinition(template: string): Type<object> {
    return this.templateDefinitions[template];
  }

  public setTemplateAnnotations(templateAnnotations: object): void {
    this.templateAnnotations = templateAnnotations;
  }

  public getTemplateAnnotation(path: string): string {
    return this.templateAnnotations[path];
  }
}
