import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MagnoliaModule } from 'angular-renderer';

import { TitleComponent } from './title/title.component';
import { ComponentWithAreaComponent } from './componentWithArea/componentWithArea.component';
import {HomeComponent} from './home/home.component';

@NgModule({
  imports: [
    CommonModule,
    MagnoliaModule,
  ],
  declarations: [
    HomeComponent,
    TitleComponent,
    ComponentWithAreaComponent,
  ],
  entryComponents: [
    TitleComponent,
    ComponentWithAreaComponent,
  ],
})
export class ComponentsModule { }
