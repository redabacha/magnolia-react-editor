import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { routing } from './app.routing';
import { AppComponent } from './app.component';

import { PagesModule } from './pages/pages.module';

import { MagnoliaModule } from 'angular-components';
import { MagnoliaContextService } from 'angular-components';

@NgModule({
   imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    routing,
    PagesModule,
    MagnoliaModule
  ],
  declarations: [
    AppComponent
  ],
  providers: [
    MagnoliaContextService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
