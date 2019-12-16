import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-component-with-area',
  templateUrl: './componentWithArea.component.html',
  styleUrls: ['./componentWithArea.component.scss'],
})
export class ComponentWithAreaComponent {
  @Input() content: any;
}
