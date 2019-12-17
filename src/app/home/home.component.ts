import { Component } from '@angular/core';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  secondaryAreaVisible = true;

  toggleArea() {
    this.secondaryAreaVisible = !this.secondaryAreaVisible;
  }
}
