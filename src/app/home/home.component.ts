import { Component, Input } from '@angular/core';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  @Input() content: any;
  secondaryAreaVisible = true;

  toggleArea() {
    this.secondaryAreaVisible = !this.secondaryAreaVisible;
  }
}
