import {Directive, ElementRef, Input, OnInit} from '@angular/core';

import {MagnoliaContextService} from '../services/magnolia-context.service';

@Directive({ 
	selector: '[cmsArea]'
})
export class AreaDirective implements OnInit {
	/** Area name. */
	@Input() public cmsArea: string;

	/**
	 * Constructor.
	 */
    constructor(private el: ElementRef, private mgnCtxService: MagnoliaContextService) {

    }
    
	/**
	 * On init
	 */
	ngOnInit() {
		if (this.mgnCtxService.isEditionMode()) {
			//Get the area node
			console.log("Retrieving " + this.cmsArea);
			this.mgnCtxService.getAreaContent(this.cmsArea).then(areaNode => {
				console.log(areaNode);
				//Get the HTML comment
				let htmlComment = this.mgnCtxService.getHtmlComment(areaNode["@path"]);

				//Get parent
				let parentDiv = this.el.nativeElement.parentNode;
				//Create comment before
				let commentBefore = document.createComment(htmlComment.start);
				parentDiv.appendChild(commentBefore);
				//Create comment after
				let commentAfter = document.createComment(htmlComment.end);
				parentDiv.appendChild(commentAfter);
				//Insert comment before
				parentDiv.insertBefore(commentBefore, this.el.nativeElement);
				//Insert comment after
				parentDiv.insertBefore(commentAfter, this.el.nativeElement.nextSibling);
			});
		}
	}
}
