import { TestBed } from '@angular/core/testing';

import { ColumnService } from './column.service';

describe('ColumnService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ColumnService = TestBed.get(ColumnService);
    expect(service).toBeTruthy();
  });
});
