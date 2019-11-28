import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { routing } from './app.routing';

import { MagnoliaModule } from '@magnolia/angular-renderer';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { TitleComponent } from './title/title.component';
import { ComponentWithAreaComponent } from './componentWithArea/componentWithArea.component';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    routing,
    MagnoliaModule,
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    TitleComponent,
    ComponentWithAreaComponent
  ],
  entryComponents: [
    HomeComponent,
    TitleComponent,
    ComponentWithAreaComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
