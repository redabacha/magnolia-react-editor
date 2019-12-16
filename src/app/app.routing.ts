import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: '**',
    redirectTo: ''
  },
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes, {
  preloadingStrategy: PreloadAllModules,  // <- comment this line for activate lazy load
  // useHash: true
});
