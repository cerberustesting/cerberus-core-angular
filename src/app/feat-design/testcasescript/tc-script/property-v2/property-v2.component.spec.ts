import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyV2Component } from './property-v2.component';

describe('PropertyV2Component', () => {
  let component: PropertyV2Component;
  let fixture: ComponentFixture<PropertyV2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PropertyV2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertyV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
