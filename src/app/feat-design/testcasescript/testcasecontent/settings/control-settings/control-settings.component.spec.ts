import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlSettingsComponent } from './control-settings.component';

describe('ControlSettingsComponent', () => {
  let component: ControlSettingsComponent;
  let fixture: ComponentFixture<ControlSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ControlSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
