import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticReliabilityComponent } from './statistic-reliability.component';

describe('StatisticReliabilityComponent', () => {
  let component: StatisticReliabilityComponent;
  let fixture: ComponentFixture<StatisticReliabilityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatisticReliabilityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatisticReliabilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
