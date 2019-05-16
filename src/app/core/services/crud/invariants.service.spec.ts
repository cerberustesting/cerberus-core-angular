import { TestBed, inject } from '@angular/core/testing';

import { InvariantsService } from './invariants.service';

describe('InvariantsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InvariantsService]
    });
  });

  it('should be created', inject([InvariantsService], (service: InvariantsService) => {
    expect(service).toBeTruthy();
  }));
});
