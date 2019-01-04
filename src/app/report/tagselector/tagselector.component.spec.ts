import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TagselectorComponent } from './tagselector.component';

describe('TagselectorComponent', () => {
  let component: TagselectorComponent;
  let fixture: ComponentFixture<TagselectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TagselectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TagselectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
