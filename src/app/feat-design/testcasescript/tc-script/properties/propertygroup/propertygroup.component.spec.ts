import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertygroupComponent } from './propertygroup.component';

describe('PropertygroupComponent', () => {
  let component: PropertygroupComponent;
  let fixture: ComponentFixture<PropertygroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PropertygroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertygroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
