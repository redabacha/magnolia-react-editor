import { Directive, ElementRef, Input, OnInit, ViewContainerRef } from '@angular/core';

import { MagnoliaContextService } from '../services/magnolia-context.service';

@Directive({
  selector: '[cmsComponent]'
})
export class ComponentDirective implements OnInit {
  /** Native element. */
  nativeElement: any;
  /** Component config. */
  @Input() component: any;

  constructor(
    private el: ElementRef,
    private mgnCtxService: MagnoliaContextService,
    public viewContainerRef: ViewContainerRef
  ) {
    this.nativeElement = el.nativeElement;
  }

  ngOnInit(): void {
    if (this.mgnCtxService.isEditionMode()) {
      // Get the HTML comment
      const htmlComment = this.mgnCtxService.getHtmlComment(this.component['@path']);

      // Get parent element
      const parentDiv = this.nativeElement.parentNode;
      // Create comment before
      const commentBefore = document.createComment(htmlComment.start);
      parentDiv.appendChild(commentBefore);
      // Create comment after
      const commentAfter = document.createComment(htmlComment.end);
      parentDiv.appendChild(commentAfter);
      // Insert comment before
      parentDiv.insertBefore(commentBefore, this.nativeElement);
      // Insert comment after
      parentDiv.insertBefore(commentAfter, this.nativeElement.nextSibling);
    }
  }
}
