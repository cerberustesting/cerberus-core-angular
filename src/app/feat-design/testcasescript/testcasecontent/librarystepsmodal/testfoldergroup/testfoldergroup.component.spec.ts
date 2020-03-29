import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestfoldergroupComponent } from './testfoldergroup.component';

describe('TestfoldergroupComponent', () => {
  let component: TestfoldergroupComponent;
  let fixture: ComponentFixture<TestfoldergroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestfoldergroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestfoldergroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
