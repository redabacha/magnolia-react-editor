import { Component, Input } from '@angular/core';

@Component({
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent {
  // properties
  @Input() title: any;
  // areas
  @Input() header: any;
  @Input() main_area: any;
  // metadata
  @Input() metadata: any;
}
