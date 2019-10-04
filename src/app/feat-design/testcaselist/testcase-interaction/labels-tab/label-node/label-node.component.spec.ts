import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LabelNodeComponent } from './label-node.component';

describe('LabelNodeComponent', () => {
  let component: LabelNodeComponent;
  let fixture: ComponentFixture<LabelNodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LabelNodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LabelNodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
