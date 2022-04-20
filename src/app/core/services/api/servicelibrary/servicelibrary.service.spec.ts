import { TestBed, inject } from '@angular/core/testing';

import { ServiceLibraryService } from './servicelibrary.service';

describe('ServiceLibraryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ServiceLibraryService]
    });
  });

  it('should be created', inject([ServiceLibraryService], (service: ServiceLibraryService) => {
    expect(service).toBeTruthy();
  }));
});
