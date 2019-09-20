import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LabelsTabComponent } from './labels-tab.component';

describe('LabelsTabComponent', () => {
  let component: LabelsTabComponent;
  let fixture: ComponentFixture<LabelsTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LabelsTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LabelsTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
