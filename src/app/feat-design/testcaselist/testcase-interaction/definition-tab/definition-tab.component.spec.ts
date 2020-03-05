import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DefinitionTabComponent } from './definition-tab.component';

describe('DefinitionTabComponent', () => {
  let component: DefinitionTabComponent;
  let fixture: ComponentFixture<DefinitionTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DefinitionTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DefinitionTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
