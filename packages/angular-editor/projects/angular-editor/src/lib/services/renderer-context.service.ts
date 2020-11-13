import { Injectable } from '@angular/core';
import { EditorContextService } from './editor-context.service';

/**
 * @deprecated RendererContextService is deprecated. Use EditorContextService instead.
 */
@Injectable({
    providedIn: 'root'
  })
export class RendererContextService extends EditorContextService {
    constructor() {
        super();
        console.warn('RendererContextService is deprecated. Use EditorContextService instead.');
    }
}
