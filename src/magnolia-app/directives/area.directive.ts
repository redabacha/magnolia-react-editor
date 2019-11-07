import {Directive, ElementRef, Input, OnInit, Renderer2} from '@angular/core';

import { MagnoliaContextService } from '../services/magnolia-context.service';

@Directive({
  selector: '[cmsArea]'
})
export class AreaDirective implements OnInit {
  /** Area name. */
  @Input() public cmsArea: string;

  constructor(private el: ElementRef, private renderer: Renderer2, private mgnlCtxService: MagnoliaContextService) {
  }

  ngOnInit() {
    if (this.mgnlCtxService.isEditionMode()) {
      // Get the HTML comment
    }
  }
}
