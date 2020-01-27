import { Injectable, Type } from '@angular/core';
import { WindowRefService } from './windowref.service';

@Injectable({
  providedIn: 'root'
})
export class RendererContextService {
  /** Component mapping */
  componentMapping = {};
  /** Template definitions */
  templateDefinitions = {};

  constructor(private winRef: WindowRefService) { }

  public isEditMode(): boolean {
    return this.winRef.nativeWindow.parent.mgnlRefresh !== undefined;
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
