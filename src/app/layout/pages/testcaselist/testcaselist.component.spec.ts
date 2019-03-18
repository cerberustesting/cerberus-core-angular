import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestcaselistComponent } from './testcaselist.component';

describe('TestcaselistComponent', () => {
  let component: TestcaselistComponent;
  let fixture: ComponentFixture<TestcaselistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestcaselistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestcaselistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
