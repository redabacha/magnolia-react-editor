import {
	AfterViewInit,
	Component,
	ComponentFactoryResolver,
	ElementRef,
	Input,
	OnInit,
	QueryList,
	Type,
	ViewChildren
} from '@angular/core';

import {MagnoliaContextService} from '../services/magnolia-context.service';
import {ComponentDirective} from '../directives/component.directive';
import {MagnoliaComponent} from '../component/magnolia.component';

@Component({
	template: ""
})
export class AbstractArea implements OnInit, AfterViewInit {
	/** Area name. */
	@Input() public cmsArea: string;
	/** List of area's components. */
	components: any[];
	/** List of the component view containers. */
	@ViewChildren(ComponentDirective) templates: QueryList<ComponentDirective>;

	/**
	 * Constructor
	 */ 
	constructor(
		private elementRef: ElementRef,
		private mgnCtxService: MagnoliaContextService,
		private resolver: ComponentFactoryResolver
	) {

	}

	/**
	 * On init
	 */ 
  	ngOnInit() {
		this.mgnCtxService.getAreaComponents(this.cmsArea).then(data => {
			this.components = data;
		});
  	}

	/**
	 * Loads component after init
	 */
	ngAfterViewInit() {
		let current = this;

		//Attempt to load directly after init
		this.loadComponents(current);

		//Otherwise, observe the changes on the list of templates
		this.templates.changes.subscribe(() => this.loadComponents(current));
	}

	/**
	 * Loads the components dynamically.
	 *
	 * @param current The current area
	 */
	loadComponents(current: AbstractArea) {
		current.templates.forEach(function(item: ComponentDirective, index: number, array: ComponentDirective[]){
			//Gets the component
			let component = item.component;

			// Gets the component class
			let componentClass = current.mgnCtxService.getComponentMapping(component["mgnl:template"]);
			if (typeof componentClass!=="undefined") {
				setTimeout(() => {
					current.loadComponent(componentClass, item, component);
				});
			}
		});
	}

	/**
	 * Loads the components thanks to its cmsTemplateId
	 */
	loadComponent(componentClassName: string, item: ComponentDirective, component: any) {
		let factories = Array.from(this.resolver['_factories'].keys());
		let componentClass = factories.find((x: any) => x.key === componentClassName);

		//Gets the component factory
		let componentFactory = this.resolver.resolveComponentFactory(<Type<any>> componentClass);
		
		//Get the view container
		item.viewContainerRef.clear();
		let componentRef = item.viewContainerRef.createComponent(componentFactory);
		(<MagnoliaComponent>componentRef.instance).component = component;
	}
}