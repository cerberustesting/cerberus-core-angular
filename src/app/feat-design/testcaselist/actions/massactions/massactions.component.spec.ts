import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MassactionsComponent } from './massactions.component';

describe('MassactionListComponent', () => {
  let component: MassactionsComponent;
  let fixture: ComponentFixture<MassactionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MassactionsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MassactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
