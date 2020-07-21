import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestfoldersComponent } from './testfolders.component';

describe('TestfoldersComponent', () => {
  let component: TestfoldersComponent;
  let fixture: ComponentFixture<TestfoldersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestfoldersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestfoldersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
