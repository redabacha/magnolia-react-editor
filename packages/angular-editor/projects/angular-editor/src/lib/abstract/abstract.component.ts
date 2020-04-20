import { AfterViewInit, Component, ComponentFactoryResolver, OnChanges, SimpleChanges, Type, ViewChild, ViewContainerRef } from '@angular/core';
import { EditorContextService } from '../services/editor-context.service';

@Component({
  template: ''
})
export class AbstractComponent implements AfterViewInit, OnChanges {
  constructor(
    public resolver: ComponentFactoryResolver, public editorContext: EditorContextService
  ) { }

  @ViewChild('child', { static: false, read: ViewContainerRef }) child: ViewContainerRef;

  openComment: string;
  closeComment: string;

  ngOnChanges(changes: SimpleChanges): void {
    const content = changes.content.currentValue;
    if (!content) {
      return;
    }
    // Get the component class from mapping and create the instance
    const componentClass = this.editorContext.getComponentMapping(content['mgnl:template']);
    if (componentClass) {
      setTimeout(() => this.loadComponent(componentClass, this.child, content));
    }
  }

  private loadComponent(componentClass: Type<any>, viewContainerRef: ViewContainerRef, content: object): void {
    // Get the component factory
    const componentFactory = this.resolver.resolveComponentFactory(componentClass);

    // Get the view container and set content
    viewContainerRef.clear();
    const componentRefInstance = viewContainerRef.createComponent(componentFactory).instance;
    const metadata = {};
    Object.keys(content).forEach(key => {
      if (key.startsWith('@') || key.startsWith('mgnl:') || key.startsWith('jcr:')) {
        metadata[key] = content[key];
      } else {
        componentRefInstance[key.replace('-', '_')] = content[key];
      }
    });
    componentRefInstance.metadata = metadata;
  }

  ngAfterViewInit(): void {
    if (this.editorContext.inEditor()) {
      setTimeout(() => this.editorContext.refresh());
    }
  }
}
