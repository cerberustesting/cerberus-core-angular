import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyV3Component } from './property-v3.component';

describe('PropertyV3Component', () => {
  let component: PropertyV3Component;
  let fixture: ComponentFixture<PropertyV3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PropertyV3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertyV3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
