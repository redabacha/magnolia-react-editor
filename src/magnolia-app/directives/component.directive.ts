import { Directive, ElementRef, Input, OnInit, ViewContainerRef, AfterContentInit } from '@angular/core';

import { MagnoliaContextService } from '../services/magnolia-context.service';
import { WindowRef } from '../services/windowref.service';

@Directive({
  selector: '[cmsComponent]'
})
export class ComponentDirective implements OnInit, AfterContentInit {
  /** Native element. */
  nativeElement: any;
  /** Component config. */
  @Input() component: any;

  constructor(
    private winRef: WindowRef,
    private el: ElementRef,
    private mgnlCtxService: MagnoliaContextService,
    public viewContainerRef: ViewContainerRef,
  ) {
    this.nativeElement = el.nativeElement;
  }

  ngOnInit(): void {
    if (this.mgnlCtxService.isEditionMode()) {
      // Get the HTML comment
    }
  }

  ngAfterContentInit(): void {
    if (this.mgnlCtxService.isEditionMode()) {
      this.winRef.nativeWindow.parent.mgnlRefresh();
    }
  }
}
