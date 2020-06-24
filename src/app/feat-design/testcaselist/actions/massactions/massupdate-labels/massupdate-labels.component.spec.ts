import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MassupdateLabelsComponent } from './massupdate-labels.component';

describe('MassupdateLabelsComponent', () => {
  let component: MassupdateLabelsComponent;
  let fixture: ComponentFixture<MassupdateLabelsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MassupdateLabelsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MassupdateLabelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
