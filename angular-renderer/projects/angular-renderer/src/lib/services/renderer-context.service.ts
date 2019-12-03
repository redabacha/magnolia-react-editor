import { Injectable, Type } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RendererContextService {
  /** Component mapping */
  componentMapping = {};
  /** Template definitions */
  templateDefinitions = {};
  /** Switch for render html comments for page editor */
  editMode = false;

  public setEditMode(editMode: boolean): void {
    this.editMode = editMode;
  }

  public isEditMode(): boolean {
    return this.editMode;
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
}
