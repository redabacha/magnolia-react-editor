import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  secondaryAreaVisible = true;

  constructor() {
  }

  ngOnInit() {
  }

  onClickMe() {
    console.log('clicked!');
    this.secondaryAreaVisible = !this.secondaryAreaVisible;
  }
}
