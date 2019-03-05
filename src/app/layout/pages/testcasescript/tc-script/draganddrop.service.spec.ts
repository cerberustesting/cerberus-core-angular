import { TestBed } from '@angular/core/testing';

import { DraganddropService } from './draganddrop.service';

describe('DraganddropService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DraganddropService = TestBed.get(DraganddropService);
    expect(service).toBeTruthy();
  });
});
