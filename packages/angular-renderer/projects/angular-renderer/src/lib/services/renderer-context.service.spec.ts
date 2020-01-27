import { TestBed, inject } from '@angular/core/testing';

import { RendererContextService } from './renderer-context.service';
import { WindowRefService } from './windowref.service';

describe('MagnoliaContextService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ WindowRefService ]
    });
  });

  it('should be created', inject([RendererContextService], (service: RendererContextService) => {
    expect(service).toBeTruthy();
  }));
});
