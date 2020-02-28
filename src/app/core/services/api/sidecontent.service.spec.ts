import { TestBed } from '@angular/core/testing';

import { SidecontentService } from './sidecontent.service';

describe('SidecontentService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SidecontentService = TestBed.get(SidecontentService);
    expect(service).toBeTruthy();
  });
});
