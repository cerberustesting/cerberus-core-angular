import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceInteractionComponent } from './service-interaction.component';

describe('ServiceInteractionComponent', () => {
  let component: ServiceInteractionComponent;
  let fixture: ComponentFixture<ServiceInteractionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceInteractionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceInteractionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
