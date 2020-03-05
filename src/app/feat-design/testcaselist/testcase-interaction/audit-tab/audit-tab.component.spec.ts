import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditTabComponent } from './audit-tab.component';

describe('AuditTabComponent', () => {
  let component: AuditTabComponent;
  let fixture: ComponentFixture<AuditTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuditTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuditTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
