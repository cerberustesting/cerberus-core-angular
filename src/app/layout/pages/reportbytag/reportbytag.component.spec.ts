import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportbytagComponent } from './reportbytag.component';

describe('ReportbytagComponent', () => {
  let component: ReportbytagComponent;
  let fixture: ComponentFixture<ReportbytagComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportbytagComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportbytagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
