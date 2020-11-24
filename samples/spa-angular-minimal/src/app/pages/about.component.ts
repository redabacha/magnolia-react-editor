import { Component, Input } from '@angular/core';

@Component({
  template: `
    <div class="content-background">
      <div editable-area [content]="header"></div>
      <main class="container">
        <h1>{{ title }}</h1>

        <div>
          <div class="col-12">
            <div editable-area [content]="mainArea"></div>
          </div>
        </div>
      </main>
    </div>
  `
})
export class AboutComponent {
  // properties
  @Input() title: string;
  // areas
  @Input() header: object;
  @Input() mainArea: object;
}
