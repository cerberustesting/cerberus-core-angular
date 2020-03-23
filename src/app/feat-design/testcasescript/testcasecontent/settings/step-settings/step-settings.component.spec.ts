import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StepSettingsComponent } from './step-settings.component';

describe('StepSettingsComponent', () => {
  let component: StepSettingsComponent;
  let fixture: ComponentFixture<StepSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StepSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StepSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
