import { Component, Input } from '@angular/core';

@Component({
  template: `
    <div class="alert {{ type }}" role="alert">
      {{ text }}
    </div>
  `,
})
export class AlertComponent {
  @Input() type: string;
  @Input() text: string;
}
