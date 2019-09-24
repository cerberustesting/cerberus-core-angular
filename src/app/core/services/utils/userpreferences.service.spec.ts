import { TestBed } from '@angular/core/testing';

import { UserPreferencesService } from './userpreferences.service';

describe('User.PreferencesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserPreferencesService = TestBed.get(UserPreferencesService);
    expect(service).toBeTruthy();
  });
});
