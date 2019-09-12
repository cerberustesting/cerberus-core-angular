import { ComponentFactoryResolver, Injectable, Inject, ReflectiveInjector, Output, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export enum INTERACTION_MODE {
  EDIT = 'EDIT',
  DUPLICATE = 'DUPLICATE',
  CREATE = 'CREATE'
}

@Injectable({
  providedIn: 'root'
})
export class SidecontentService {

  rootViewContainer: any;
  isOpen = false;
  @Output() change: EventEmitter<boolean> = new EventEmitter();

  constructor(private factoryResolver: ComponentFactoryResolver) {
    this.factoryResolver = factoryResolver;
  }
  setRootViewContainerRef(viewContainerRef) {
    this.rootViewContainer = viewContainerRef;
  }
  addComponentToSideBlock(component: any, parameters?: {}) {
    console.log("addComponentToSideBlock called");
    const factory = this.factoryResolver.resolveComponentFactory(component);
    let _component = factory.create(this.rootViewContainer.parentInjector);
    if (parameters) {
      for (let parameter in parameters) {
        _component.instance[parameter] = parameters[parameter];
      }
    }
    this.rootViewContainer.remove(0);
    this.rootViewContainer.insert(_component.hostView);
  }
  openSideBlock() {
    this.isOpen = true;
    this.change.emit(this.isOpen);
  }
  closeSideBlock() {
    this.isOpen = false;
    this.change.emit(this.isOpen);
  }
  /** SIDE CONTENT SAVE BUTTON TITLE */
  saveButtonTitle: string;
  observableSaveButtonTitle = new BehaviorSubject<string>(this.saveButtonTitle);
  // returns the correct word depending on
  // the interaction mode
  getsaveButtonTitle(mode: INTERACTION_MODE): string {
    switch (mode) {
      case 'EDIT': {
        return "Edit";
      }
      case 'CREATE': {
        return "Create";
      }
      case 'DUPLICATE': {
        return "Duplicate";
      }
    }
  }

}
