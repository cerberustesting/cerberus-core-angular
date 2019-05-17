import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestcasescriptComponent } from './testcasescript.component';

describe('TestcasescriptComponent', () => {
  let component: TestcasescriptComponent;
  let fixture: ComponentFixture<TestcasescriptComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestcasescriptComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestcasescriptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
