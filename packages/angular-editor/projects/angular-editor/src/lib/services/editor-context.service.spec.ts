import { TestBed, inject } from '@angular/core/testing';

import { EditorContextService } from './editor-context.service';
import { WindowRefService } from './windowref.service';

describe('EditorContextService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
          {
            provide: WindowRefService, useValue: {
              nativeWindow: {
                parent: {
                  mgnlRefresh: true
                },
                location: {
                  href: "/?mgnlPreview=true"
                }
              }
            }
          }
      ]
    });
  });

  it('should be created', inject([EditorContextService], (service: EditorContextService) => {
    expect(service).toBeTruthy();
  }));

  it('should detect editor mode', inject([EditorContextService], (service: EditorContextService) => {
    expect(service.inEditor()).toBe(true);
  }));

  it('should detect preview mode', inject([EditorContextService], (service: EditorContextService) => {
    expect(service.inEditorPreview()).toBe(true);
  }));
});
