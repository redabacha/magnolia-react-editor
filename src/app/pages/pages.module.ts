import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from '../components/components.module';

import { HomeComponent } from './home/home.component';

import { MagnoliaModule } from 'angular-components';

@NgModule({
  imports: [
    ComponentsModule,
    MagnoliaModule
  ],
  declarations: [
    HomeComponent
  ],
})
export class PagesModule { }
