import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedstepComponent } from './selectedstep.component';

describe('SelectedstepComponent', () => {
  let component: SelectedstepComponent;
  let fixture: ComponentFixture<SelectedstepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectedstepComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectedstepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
