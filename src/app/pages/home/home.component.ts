import {Component, Input } from '@angular/core';
import { MagnoliaComponent } from 'angular-components';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent extends MagnoliaComponent {

  @Input() list = ['a', 'b', 'c'];
}
