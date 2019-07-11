import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { routing } from './app.routing';
import { AppComponent } from './app.component';

import { PagesModule } from './pages/pages.module';

import { MagnoliaModule } from '../magnolia-app/magnolia.module';
import { MagnoliaContextService } from '../magnolia-app/services/magnolia-context.service';

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
