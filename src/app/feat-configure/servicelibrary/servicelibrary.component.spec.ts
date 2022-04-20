import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceLibraryComponent } from './servicelibrary.component';

describe('ServiceLibraryComponent', () => {
  let component: ServiceLibraryComponent;
  let fixture: ComponentFixture<ServiceLibraryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceLibraryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceLibraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
