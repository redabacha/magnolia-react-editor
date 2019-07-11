import { TestBed, inject } from '@angular/core/testing';

import { WindowrefService } from './windowref.service';

describe('WindowrefService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WindowrefService]
    });
  });

  it('should be created', inject([WindowrefService], (service: WindowrefService) => {
    expect(service).toBeTruthy();
  }));
});
