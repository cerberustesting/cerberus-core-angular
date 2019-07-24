import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatalibraryComponent } from './datalibrary.component';

describe('DatalibraryComponent', () => {
  let component: DatalibraryComponent;
  let fixture: ComponentFixture<DatalibraryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatalibraryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatalibraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
