import { Injectable } from '@angular/core';
import { EditorContextService } from './editor-context.service';
import { WindowRefService } from './windowref.service';

/**
 * @deprecated RendererContextService is deprecated. Use EditorContextService instead.
 */
@Injectable({
    providedIn: 'root'
  })
export class RendererContextService extends EditorContextService {
    constructor(winRef: WindowRefService) {
        super(winRef);
        console.warn('RendererContextService is deprecated. Use EditorContextService instead.');
    }
}
