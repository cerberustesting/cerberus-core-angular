import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticDurationComponent } from './statistic-duration.component';

describe('StatisticDurationComponent', () => {
  let component: StatisticDurationComponent;
  let fixture: ComponentFixture<StatisticDurationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatisticDurationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatisticDurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
