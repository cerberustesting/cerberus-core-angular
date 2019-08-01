import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportbyLabelComponent } from './reportby-label.component';

describe('ReportbyLabelComponent', () => {
  let component: ReportbyLabelComponent;
  let fixture: ComponentFixture<ReportbyLabelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportbyLabelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportbyLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
