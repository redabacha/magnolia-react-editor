import { Injectable, Type } from '@angular/core';
import { EditorContextHelper, LoggerService } from '@magnolia/template-annotations';

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
    if (!componentMapping) {
      LoggerService.error('componentMapping cannot be null');
      return;
    }
    this.componentMapping = componentMapping;
  }

  public getComponentMapping(templateId: string): Type<object> {
    const component = this.componentMapping[templateId];
    if (!component) {
      LoggerService.error(`Component with ID ${templateId} is not mapped.`)
    }
    return component;
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
