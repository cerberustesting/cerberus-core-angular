import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BugsReportTabComponent } from './bugs-report-tab.component';

describe('BugsReportTabComponent', () => {
  let component: BugsReportTabComponent;
  let fixture: ComponentFixture<BugsReportTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BugsReportTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BugsReportTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
