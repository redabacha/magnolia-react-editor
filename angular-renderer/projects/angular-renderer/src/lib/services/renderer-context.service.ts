import { Injectable, Type } from '@angular/core';
import { WindowRefService } from './windowref.service';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RendererContextService {
  /** Component mapping */
  componentMapping = {};
  /** Template definitions */
  templateDefinitions = {};

  constructor(private winRef: WindowRefService) { }

  public inEditor(): boolean {
    return this.winRef.nativeWindow.parent && this.winRef.nativeWindow.parent.mgnlRefresh;
  }

  public inEditorPreview(): boolean {
    const previewParam = this.getParamValueQueryString('mgnlPreview');
    return this.inEditor() && previewParam === 'true';
  }

  private getParamValueQueryString(paramName: string): string {
    const url = this.winRef.nativeWindow.location.href;
    let paramValue;
    if (url.includes('?')) {
      const httpParams = new HttpParams({ fromString: url.split('?')[1] });
      paramValue = httpParams.get(paramName);
    }
    return paramValue;
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
