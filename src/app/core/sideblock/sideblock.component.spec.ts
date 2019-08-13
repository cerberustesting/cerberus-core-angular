import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SideblockComponent } from './sideblock.component';

describe('SideblockComponent', () => {
  let component: SideblockComponent;
  let fixture: ComponentFixture<SideblockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SideblockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SideblockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
