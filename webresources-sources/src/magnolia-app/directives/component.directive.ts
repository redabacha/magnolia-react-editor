import {Directive, ElementRef, Input, OnInit, ViewContainerRef} from '@angular/core';

import {MagnoliaContextService} from '../services/magnolia-context.service';

@Directive({
  selector: '[cmsComponent]'
})
export class ComponentDirective implements OnInit {
	/** Native element. */
	nativeElement: any;
	/** Component config.*/
	@Input() component: any;
	
	/**
	 * Constructor.
	 */
	constructor(
		private el: ElementRef, 
		private mgnCtxService: MagnoliaContextService,
		public viewContainerRef: ViewContainerRef
	) {
		this.nativeElement = el.nativeElement;
	}
	
	/**
	 * On init
	 */
	ngOnInit(): void {
		if (this.mgnCtxService.isEditionMode()) {
			//Get the HTML comment
			let htmlComment = this.mgnCtxService.getHtmlComment(this.component['@path']);

			//Get parent
			let parentDiv = this.nativeElement.parentNode;
			//Create comment before
			let commentBefore = document.createComment(htmlComment.start);
			parentDiv.appendChild(commentBefore);
			//Create comment after
			let commentAfter = document.createComment(htmlComment.end);
			parentDiv.appendChild(commentAfter);
			//Insert comment before
			parentDiv.insertBefore(commentBefore, this.nativeElement);
			//Insert comment after
			parentDiv.insertBefore(commentAfter, this.nativeElement.nextSibling);
		}
	}
}