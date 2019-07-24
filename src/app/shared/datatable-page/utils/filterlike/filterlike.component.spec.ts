import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterlikeComponent } from './filterlike.component';

describe('FilterlikeComponent', () => {
  let component: FilterlikeComponent;
  let fixture: ComponentFixture<FilterlikeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterlikeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterlikeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
