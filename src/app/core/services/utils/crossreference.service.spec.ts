import { TestBed, inject } from '@angular/core/testing';

import { CrossreferenceService } from './crossreference.service';

describe('CrossreferenceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CrossreferenceService]
    });
  });

  it('should be created', inject([CrossreferenceService], (service: CrossreferenceService) => {
    expect(service).toBeTruthy();
  }));
});
