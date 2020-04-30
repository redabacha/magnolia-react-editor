import { Component, Input } from '@angular/core';

@Component({
  template: `
    <div class="content-background">
      <main class="container">
        <div editable-area [content]="header" [parentTemplateId]="metadata['mgnl:template']"></div>
        <h1>{{title}}</h1>
        <div>
          <h2>Primary Area</h2>
          <div class="col-12">
            <div editable-area [content]="main_area" [parentTemplateId]="metadata['mgnl:template']"></div>
          </div>
        </div>

        <div *ngIf="secondaryAreaVisible">
          <h2>Secondary Area</h2>
          <div class="col-12">
            <div editable-area [content]="secondary_area" [parentTemplateId]="metadata['mgnl:template']"></div>
          </div>
        </div>

        <button class="btn btn-danger" (click)="toggleArea()">Click me</button>
        <button class="btn btn-primary" routerLink="/about">About</button>
      </main>
    </div>
  `
})
export class HomeComponent {
  // properties
  @Input() title: any;
  // areas
  @Input() header: any;
  @Input() main_area: any;
  @Input() secondary_area: any;
  // metadata
  @Input() metadata: any;
  secondaryAreaVisible = true;

  toggleArea() {
    this.secondaryAreaVisible = !this.secondaryAreaVisible;
  }
}
