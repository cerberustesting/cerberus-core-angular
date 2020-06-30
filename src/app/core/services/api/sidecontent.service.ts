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

  constructor(private factoryResolver: ComponentFactoryResolver) {
    this.factoryResolver = factoryResolver;
    this.currentComponent = undefined;
  }

  /**
   * populate the rootViewContainer
   * @param viewContainerRef variable to populate with
   */
  setRootViewContainerRef(viewContainerRef): void {
    this.rootViewContainer = viewContainerRef;
  }

  /**
   * request to open a new component in the side block area
   * @param component component reference (not instance) to render
   * @param parameters variable to set to this component
   * @param forceComponent set to true do skip conflict check
   */
  addComponentToSideBlock(component: any, parameters?: {}, forceComponent?: boolean): void {

    // if the "force" flag is set
    if (forceComponent === true) {

      this.setComponentToSideBlock(component, parameters);

    } else if (this.currentComponent) {
      // if a component is already in use in the side content
      // if the side content interruption function is defined for the already in use component
      // @ts-ignore
      if (this.currentComponent.instance.sideContentInterruption) {
        // if the side content interruption allow the interruption of the current action in the side block
        // @ts-ignore
        if (this.currentComponent.instance.sideContentInterruption(component, parameters) === true) {

          this.setComponentToSideBlock(component, parameters);

        }
      }
    } else {
      // if the force flag isn't set and no component is currently in the side block
      this.setComponentToSideBlock(component, parameters);
    }

  }

  /**
   * set a compononent in the side block area
   * @param component component reference
   * @param parameters variable to set to this component
   */
  setComponentToSideBlock(component: any, parameters: any): void {
    // create the component from the reference provided as an argument
    const factory = this.factoryResolver.resolveComponentFactory(component);
    const _component = factory.create(this.rootViewContainer.parentInjector);

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

  /**
   * show the side block area
   */
  openSideBlock(): void {
    this.isOpen = true;
    this.change.emit(this.isOpen);
  }

  /**
   * close the side block area
   */
  closeSideBlock(): void {
    this.isOpen = false;
    this.change.emit(this.isOpen);
    this.currentComponent = undefined;
  }

  /**
   * returns the correct word depending on the interaction mode
   * @param mode interaction mode
   */
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
