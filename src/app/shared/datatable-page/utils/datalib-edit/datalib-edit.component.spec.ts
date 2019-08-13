import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatalibEditComponent } from './datalib-edit.component';

describe('DatalibEditComponent', () => {
  let component: DatalibEditComponent;
  let fixture: ComponentFixture<DatalibEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatalibEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatalibEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
