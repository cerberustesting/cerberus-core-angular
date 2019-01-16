import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TcHeaderComponent } from './tc-header.component';

describe('TcHeaderComponent', () => {
  let component: TcHeaderComponent;
  let fixture: ComponentFixture<TcHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TcHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TcHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
