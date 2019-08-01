import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportbyTestfolderComponent } from './reportby-testfolder.component';

describe('ReportbyTestfolderComponent', () => {
  let component: ReportbyTestfolderComponent;
  let fixture: ComponentFixture<ReportbyTestfolderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportbyTestfolderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportbyTestfolderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
