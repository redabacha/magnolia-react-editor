import { Component, Input, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'mgnl-comment',
  template: '',
})
export class CommentComponent {
  constructor(private elementRef: ElementRef, private renderer: Renderer2) { }

  @Input() set text(text: string) {
    if (text && this.elementRef.nativeElement.parentElement) {
      this.renderer.setProperty(this.elementRef.nativeElement, 'outerHTML', `<!-- ${text} -->`);
    }
  }
}
