import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestcaseInteractionComponent } from './testcase-interaction.component';

describe('TestcaseInteractionComponent', () => {
  let component: TestcaseInteractionComponent;
  let fixture: ComponentFixture<TestcaseInteractionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestcaseInteractionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestcaseInteractionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
