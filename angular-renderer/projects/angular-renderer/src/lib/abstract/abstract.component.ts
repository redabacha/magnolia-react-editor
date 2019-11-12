import { AfterViewInit, Component, ComponentFactoryResolver, Input, Type, ViewChild, ViewContainerRef } from '@angular/core';
import { RendererContextService } from '../services/renderer-context.service';
import { WindowRefService } from '../services/windowref.service';

@Component({
  template: ''
})
export class AbstractComponent implements AfterViewInit {
  constructor(public resolver: ComponentFactoryResolver, public rendererContext: RendererContextService, public winRef: WindowRefService) { }

  @ViewChild('child', {static: false, read: ViewContainerRef}) child: ViewContainerRef;

  openComment: string;
  closeComment: string;

  @Input() set content(content: object) {
    if (!content) {
      return;
    }
    // Get the component class from mapping and create the instance
    const componentClass = this.rendererContext.getComponentMapping(content['mgnl:template']);
    if (componentClass) {
      setTimeout(() => this.loadComponent(componentClass, this.child, content));
    }
  }

  private loadComponent(componentClass: Type<any>, viewContainerRef: ViewContainerRef, content: object): void {
    // Get the component factory
    const componentFactory = this.resolver.resolveComponentFactory(componentClass);

    // Get the view container and set content
    viewContainerRef.clear();
    const componentRefInstance = viewContainerRef.createComponent(componentFactory).instance as AbstractComponent;
    componentRefInstance.content = content;
  }

  ngAfterViewInit(): void {
    if (this.rendererContext.isEditMode()) {
      this.winRef.nativeWindow.parent.mgnlRefresh();
    }
  }
}
