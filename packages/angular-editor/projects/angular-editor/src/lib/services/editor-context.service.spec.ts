import { inject } from '@angular/core/testing';

import { EditorContextService } from './editor-context.service';
import '../../../../../mock/mgnlRefresh.mock';

describe('EditorContextService', () => {

  it('should be created', inject([EditorContextService], (service: EditorContextService) => {
    expect(service).toBeTruthy();
  }));

  it('should detect editor mode', inject([EditorContextService], (service: EditorContextService) => {
    expect(service.inEditor()).toBe(true);
  }));

  it('should detect preview mode', inject([EditorContextService], (service: EditorContextService) => {
    window.location.hash = ':view';
    expect(service.inEditorPreview()).toBe(true);
  }));
});
