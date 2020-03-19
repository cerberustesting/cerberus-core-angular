import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestCaseSelectorComponent } from './testcaseselector.component';

describe('TcSelectorComponent', () => {
  let component: TestCaseSelectorComponent;
  let fixture: ComponentFixture<TestCaseSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestCaseSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestCaseSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
