import {AfterViewInit, Component, ComponentFactoryResolver, Input, OnInit} from '@angular/core';
import {MagnoliaComponent} from 'angular-components';

@Component({
  selector: 'app-component-with-area',
  templateUrl: './componentWithArea.component.html',
  styleUrls: ['./componentWithArea.component.scss']
})
export class ComponentWithAreaComponent extends MagnoliaComponent {
  @Input() content;

}
