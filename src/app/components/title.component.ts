import { Component, Input } from '@angular/core';

@Component({
  template: `
    <div>
      <h3>{{title}}</h3>
    </div>
  `
})
export class TitleComponent {
  @Input() title: string;
}
