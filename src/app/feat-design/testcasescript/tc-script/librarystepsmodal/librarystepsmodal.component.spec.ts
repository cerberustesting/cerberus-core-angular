import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LibrarystepsmodalComponent } from './librarystepsmodal.component';

describe('LibrarystepsmodalComponent', () => {
  let component: LibrarystepsmodalComponent;
  let fixture: ComponentFixture<LibrarystepsmodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LibrarystepsmodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LibrarystepsmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
