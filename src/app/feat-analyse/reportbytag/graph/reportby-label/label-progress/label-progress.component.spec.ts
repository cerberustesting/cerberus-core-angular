import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LabelProgressComponent } from './label-progress.component';

describe('LabelProgressComponent', () => {
  let component: LabelProgressComponent;
  let fixture: ComponentFixture<LabelProgressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LabelProgressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LabelProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
