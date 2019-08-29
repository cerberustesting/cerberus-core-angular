import { TestBed } from '@angular/core/testing';

import { HeaderTitleService } from './header-title.service';

describe('HeaderTitleService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HeaderTitleService = TestBed.get(HeaderTitleService);
    expect(service).toBeTruthy();
  });
});
