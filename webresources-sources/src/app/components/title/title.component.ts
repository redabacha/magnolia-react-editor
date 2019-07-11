import { Component, Input, OnInit } from '@angular/core';
import { MagnoliaComponent } from '../../../magnolia-app/component/magnolia.component';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.scss']
})
export class TitleComponent implements OnInit, MagnoliaComponent {
  static key = 'TitleComponent';
  @Input() component: any;

  constructor() {
  }

  ngOnInit() {
  }
}
