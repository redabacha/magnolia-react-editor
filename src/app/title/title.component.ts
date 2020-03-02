import { Component, Input } from '@angular/core';

@Component({
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.scss'],
})
export class TitleComponent {
  @Input() content: any;
}
