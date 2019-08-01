import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportbystatusComponent } from './reportby-status.component';

describe('ReportbystatusComponent', () => {
  let component: ReportbystatusComponent;
  let fixture: ComponentFixture<ReportbystatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportbystatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportbystatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
