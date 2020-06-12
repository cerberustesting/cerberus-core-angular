import { ComponentFactoryResolver, Injectable, Output, EventEmitter } from '@angular/core';

/**
 * Interaction mode types
 */
export enum INTERACTION_MODE {
  EDIT = 'EDIT',
  DUPLICATE = 'DUPLICATE',
  CREATE = 'CREATE'
}

@Injectable({
  providedIn: 'root'
})
export class SidecontentService {

  /** current component active in the side component */
  private currentComponent: any;

  /** save button title (view) */
  saveButtonTitle: string;

  /** is the side content expanded or collapsed? */
  isOpen = false;

  rootViewContainer: any;

  @Output() change: EventEmitter<boolean> = new EventEmitter();

  constructor(private factoryResolver: ComponentFactoryResolver, ) {
    this.factoryResolver = factoryResolver;
    this.currentComponent = undefined;
  }

  setRootViewContainerRef(viewContainerRef) {
    this.rootViewContainer = viewContainerRef;
  }

  /**
   * open the side content area with a speci
   * @param component component reference (not instance) to render
   * @param parameters variable to set to this component
   */
  addComponentToSideBlock(component: any, parameters?: {}) {

    const factory = this.factoryResolver.resolveComponentFactory(component);
    const _component = factory.create(this.rootViewContainer.parentInjector);

    // if a component is already in use in the side content
    if (this.currentComponent) {
      // if the side content interruption function is defined for the already in use component
      // @ts-ignore
      if (this.currentComponent.instance.sideContentInterruption) {
        // @ts-ignore
        if (this.currentComponent.instance.sideContentInterruption() === true) {

          // add the variable to provide to the injected component
          if (parameters) {
            for (const parameter in parameters) {
              if (parameter) {
                _component.instance[parameter] = parameters[parameter];
              }
            }
          }

          // remove the previous component and insert the new one
          this.rootViewContainer.remove(0);
          this.rootViewContainer.insert(_component.hostView);

          // assign this component as the current one
          this.currentComponent = _component;
        }
      }
    } else {

      // add the variable to provide to the injected component
      if (parameters) {
        for (const parameter in parameters) {
          if (parameter) {
            _component.instance[parameter] = parameters[parameter];
          }
        }
      }

      // remove the previous component and insert the new one
      this.rootViewContainer.remove(0);
      this.rootViewContainer.insert(_component.hostView);

      // assign this component as the current one
      this.currentComponent = _component;
    }


  }

  openSideBlock() {
    this.isOpen = true;
    this.change.emit(this.isOpen);
  }

  closeSideBlock() {
    this.isOpen = false;
    this.currentComponent = undefined;
    this.change.emit(this.isOpen);
  }

  // returns the correct word depending on
  // the interaction mode
  getsaveButtonTitle(mode: INTERACTION_MODE): string {
    switch (mode) {
      case 'EDIT': {
        return 'Save';
      }
      case 'CREATE': {
        return 'Create';
      }
      case 'DUPLICATE': {
        return 'Duplicate';
      }
    }
  }

}
