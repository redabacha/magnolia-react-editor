import { Component, Input, OnInit } from '@angular/core';
import { MagnoliaComponent } from '../../../magnolia-app/component/magnolia.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, MagnoliaComponent {
  @Input() component: any;

  constructor() {
  }

  ngOnInit() {
  }
}
