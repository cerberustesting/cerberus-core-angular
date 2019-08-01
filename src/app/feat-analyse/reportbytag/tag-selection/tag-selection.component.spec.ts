import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TagSelectionComponent } from './tag-selection.component';

describe('TagSelectionComponent', () => {
  let component: TagSelectionComponent;
  let fixture: ComponentFixture<TagSelectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TagSelectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TagSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
