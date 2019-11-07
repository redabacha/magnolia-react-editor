import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-component-with-area',
  templateUrl: './componentWithArea.component.html',
  styleUrls: ['./componentWithArea.component.scss']
})
export class ComponentWithAreaComponent implements OnInit {
  static key = 'ComponentWithAreaComponent';

  constructor() {
  }

  ngOnInit() {
  }
}
