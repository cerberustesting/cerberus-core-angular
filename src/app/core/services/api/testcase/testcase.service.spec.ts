import { TestBed } from '@angular/core/testing';

import { TestcaseService } from './testcase.service';

describe('TestcaseService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TestcaseService = TestBed.get(TestcaseService);
    expect(service).toBeTruthy();
  });
});
