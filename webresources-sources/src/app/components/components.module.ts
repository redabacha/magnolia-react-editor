import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { TitleComponent } from './title/title.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [
    RouterModule,
  ],
  declarations: [
    TitleComponent,
  ],
  entryComponents: [
    TitleComponent
  ],
})
export class ComponentsModule { }
