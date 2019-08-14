import { ComponentFactoryResolver, Injectable, Inject, ReflectiveInjector, Output, EventEmitter} from '@angular/core';

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
    this.isOpen = !this.isOpen;
    this.change.emit(this.isOpen);
  }
  closeSideBlock() {
    this.isOpen = false;
    this.change.emit(this.isOpen);
  }

  
}
