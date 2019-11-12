import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MagnoliaModule } from 'angular-components';

import { TitleComponent } from './title/title.component';
import { ComponentWithAreaComponent } from './componentWithArea/componentWithArea.component';

@NgModule({
  imports: [
    RouterModule,
    MagnoliaModule,
  ],
  exports: [
    RouterModule,
  ],
  declarations: [
    TitleComponent,
      ComponentWithAreaComponent,
  ],
  entryComponents: [
    TitleComponent,
      ComponentWithAreaComponent,
  ],
})
export class ComponentsModule { }
