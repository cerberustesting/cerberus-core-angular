import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TcSelectorComponent } from './tc-selector.component';

describe('TcSelectorComponent', () => {
  let component: TcSelectorComponent;
  let fixture: ComponentFixture<TcSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TcSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TcSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
