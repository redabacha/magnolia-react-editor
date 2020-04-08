import { inject } from '@angular/core/testing';

import { RendererContextService } from './renderer-context.service';
import '../../../../../mock/mgnlRefresh.mock';

describe('RendererContextService', () => {
  it('should be created', inject([RendererContextService], (service: RendererContextService) => {
    expect(service).toBeTruthy();
  }));

  it('should detect editor mode', inject([RendererContextService], (service: RendererContextService) => {
    expect(service.inEditor()).toBe(true);
  }));

  it('should detect preview mode', inject([RendererContextService], (service: RendererContextService) => {
    expect(service.inEditorPreview()).toBe(true);
  }));
});
