import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportlistComponent } from './reportlist.component';

describe('ReportlistComponent', () => {
  let component: ReportlistComponent;
  let fixture: ComponentFixture<ReportlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
