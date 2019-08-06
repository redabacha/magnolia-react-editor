import {Directive, ElementRef, Input, OnInit, Renderer2} from '@angular/core';

import {MagnoliaContextService} from '../services/magnolia-context.service';

@Directive({
  selector: '[cmsArea]'
})
export class AreaDirective implements OnInit {
  /** Area name. */
  @Input() public cmsArea: string;

  constructor(private el: ElementRef, private renderer: Renderer2, private mgnCtxService: MagnoliaContextService) {
  }

  ngOnInit() {
    if (this.mgnCtxService.isEditionMode()) {
      this.mgnCtxService.getAreaContent(this.cmsArea).then(areaNode => {
        // Get the data for HTML comments
        const htmlComment = this.mgnCtxService.getHtmlComment(areaNode['@path']);

        const startTag = document.createComment(htmlComment.start);
        this.renderer.insertBefore(this.el.nativeElement, startTag, this.el.nativeElement.firstChild);

        const endTag = document.createComment(htmlComment.end);
        this.renderer.appendChild(this.el.nativeElement, endTag);
      });
    }
  }
}
