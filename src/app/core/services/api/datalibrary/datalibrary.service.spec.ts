import { TestBed } from '@angular/core/testing';

import { DatalibraryService } from './datalibrary.service';

describe('DatalibraryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DatalibraryService = TestBed.get(DatalibraryService);
    expect(service).toBeTruthy();
  });
});
