import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportbyOtherComponent } from './reportby-other.component';

describe('ReportbyOtherComponent', () => {
  let component: ReportbyOtherComponent;
  let fixture: ComponentFixture<ReportbyOtherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportbyOtherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportbyOtherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
