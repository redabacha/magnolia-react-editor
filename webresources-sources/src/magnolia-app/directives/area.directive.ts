import { Directive, ElementRef, Input, OnInit } from '@angular/core';

import { MagnoliaContextService } from '../services/magnolia-context.service';

@Directive({
  selector: '[cmsArea]'
})
export class AreaDirective implements OnInit {
  /** Area name. */
  @Input() public cmsArea: string;

  constructor(private el: ElementRef, private mgnCtxService: MagnoliaContextService) {
  }

  ngOnInit() {
    if (this.mgnCtxService.isEditionMode()) {
      // Get the area node
      console.log('Retrieving ' + this.cmsArea);
      this.mgnCtxService.getAreaContent(this.cmsArea).then(areaNode => {
        console.log(areaNode);
        // Get the HTML comment
        const htmlComment = this.mgnCtxService.getHtmlComment(areaNode['@path']);

        // Get parent
          const parentDiv = this.el.nativeElement.parentNode;
        // Create comment before
        const commentBefore = document.createComment(htmlComment.start);
        parentDiv.appendChild(commentBefore);
        // Create comment after
        const commentAfter = document.createComment(htmlComment.end);
        parentDiv.appendChild(commentAfter);
        // Insert comment before
        parentDiv.insertBefore(commentBefore, this.el.nativeElement);
        // Insert comment after
        parentDiv.insertBefore(commentAfter, this.el.nativeElement.nextSibling);
      });
    }
  }
}
