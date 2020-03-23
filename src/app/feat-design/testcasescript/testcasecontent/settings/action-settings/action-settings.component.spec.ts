import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionSettingsComponent } from './action-settings.component';

describe('ActionSettingsComponent', () => {
  let component: ActionSettingsComponent;
  let fixture: ComponentFixture<ActionSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActionSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
