import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestfolderInteractionComponent } from './testfolder-interaction.component';

describe('TestfolderInteractionComponent', () => {
  let component: TestfolderInteractionComponent;
  let fixture: ComponentFixture<TestfolderInteractionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestfolderInteractionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestfolderInteractionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
