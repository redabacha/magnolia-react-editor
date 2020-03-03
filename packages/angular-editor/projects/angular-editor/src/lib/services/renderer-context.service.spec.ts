import { TestBed, inject } from '@angular/core/testing';

import { RendererContextService } from './renderer-context.service';
import { WindowRefService } from './windowref.service';

describe('RendererContextService', () => {
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
