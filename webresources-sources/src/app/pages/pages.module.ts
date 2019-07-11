import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from '../components/components.module';

import { HomeComponent } from './home/home.component';

import { MagnoliaModule } from '../../magnolia-app/magnolia.module';

export const routes = [
  { path: '', component: HomeComponent, pathMatch: 'full'  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ComponentsModule,
    MagnoliaModule
  ],
  declarations: [
    HomeComponent
  ]
})
export class PagesModule { }
