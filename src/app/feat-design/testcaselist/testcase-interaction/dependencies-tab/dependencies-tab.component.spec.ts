import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DependenciesTabComponent } from './dependencies-tab.component';

describe('DependenciesTabComponent', () => {
  let component: DependenciesTabComponent;
  let fixture: ComponentFixture<DependenciesTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DependenciesTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DependenciesTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
