import { TestBed, inject } from '@angular/core/testing';

import { MagnoliaContextService } from './magnolia-context.service';

describe('MagnoliaContextService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MagnoliaContextService]
    });
  });

  it('should be created', inject([MagnoliaContextService], (service: MagnoliaContextService) => {
    expect(service).toBeTruthy();
  }));
});
