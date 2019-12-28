import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyvalueComponent } from './propertyvalue.component';

describe('PropertyvalueComponent', () => {
  let component: PropertyvalueComponent;
  let fixture: ComponentFixture<PropertyvalueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PropertyvalueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertyvalueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
