import { Component, Input } from '@angular/core';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  // properties
  @Input() title: any;
  // areas
  @Input() header: any;
  @Input() main_area: any;
  @Input() secondary_area: any;
  // metadata
  @Input() metadata: any;
  secondaryAreaVisible = true;

  toggleArea() {
    this.secondaryAreaVisible = !this.secondaryAreaVisible;
  }
}
