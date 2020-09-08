import { Component, Input } from '@angular/core';
import { environment } from '../../environments/environment';

@Component({
  template: `
    <div class="card">
      <img class="card-img-top" [src]="imageLink" alt="" *ngIf="imageLink" />
      <div class="card-body">
        <h3 class="card-title">{{title}}</h3>
        <p class="card-text" [innerHTML]="body"></p>
      </div>
    </div>
  `,
})
export class CardComponent {
  @Input() title: string;
  @Input() body: string;

  @Input() set image(image: any) {
    this.imageLink = environment.server + image.renditions['480'].link;
  }

  imageLink: string = null;
}
