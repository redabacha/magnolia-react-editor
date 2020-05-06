import { Component, Input } from '@angular/core';
import { environment } from '../../environments/environment';

@Component({
  template: `
    <div>
      <h3>{{title}}</h3>
      <div class="body" [innerHTML]="body">
      </div>
      <img class="img-responsive" [src]="imageLink" alt="" *ngIf="imageLink" />
    </div>
  `,
    styles: ['.body { font-size: small; word-wrap: break-word; }']
})
export class TextImageComponent {
  @Input() title: string;
  @Input() body: string;

  @Input() set image(image: any) {
    this.imageLink = environment.server + image.renditions['480'].link;
  }

  imageLink: string = null;
}
