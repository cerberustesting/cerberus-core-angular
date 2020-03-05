import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExecutionSettingsTabComponent } from './execution-settings-tab.component';

describe('ExecutionSettingsTabComponent', () => {
  let component: ExecutionSettingsTabComponent;
  let fixture: ComponentFixture<ExecutionSettingsTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExecutionSettingsTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExecutionSettingsTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
