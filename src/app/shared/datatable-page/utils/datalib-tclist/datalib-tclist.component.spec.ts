import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatalibTclistComponent } from './datalib-tclist.component';

describe('DatalibTclistComponent', () => {
  let component: DatalibTclistComponent;
  let fixture: ComponentFixture<DatalibTclistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatalibTclistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatalibTclistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
