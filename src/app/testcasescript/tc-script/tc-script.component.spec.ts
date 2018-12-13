import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TcScriptComponent } from './tc-script.component';

describe('TcScriptComponent', () => {
  let component: TcScriptComponent;
  let fixture: ComponentFixture<TcScriptComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TcScriptComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TcScriptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
