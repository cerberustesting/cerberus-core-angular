import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExecutionsperweekComponent } from './executionsperweek.component';

describe('ExecutionsperweekComponent', () => {
  let component: ExecutionsperweekComponent;
  let fixture: ComponentFixture<ExecutionsperweekComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExecutionsperweekComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExecutionsperweekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
