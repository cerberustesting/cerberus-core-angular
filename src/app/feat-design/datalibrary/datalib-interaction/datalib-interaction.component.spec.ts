import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatalibInteractionComponent } from './datalib-interaction.component';

describe('DatalibInteractionComponent', () => {
  let component: DatalibInteractionComponent;
  let fixture: ComponentFixture<DatalibInteractionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatalibInteractionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatalibInteractionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
