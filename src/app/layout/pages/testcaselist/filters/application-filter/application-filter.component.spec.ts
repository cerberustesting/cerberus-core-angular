import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationFilterComponent } from './application-filter.component';

describe('ApplicationFilterComponent', () => {
  let component: ApplicationFilterComponent;
  let fixture: ComponentFixture<ApplicationFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicationFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
