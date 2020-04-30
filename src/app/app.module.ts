import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { routing } from './app.routing';

import { MagnoliaModule } from '@magnolia/angular-editor';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home.component';
import { TitleComponent } from './components/title.component';
import { ComponentWithAreaComponent } from './components/componentWithArea.component';
import { AboutComponent } from './components/about.component';
import { RootComponent } from './root.component';
import { NavigationComponent } from './components/navigation.component';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    routing,
    MagnoliaModule,
  ],
  declarations: [
    AppComponent,
    RootComponent,
    HomeComponent,
    TitleComponent,
    AboutComponent,
    ComponentWithAreaComponent,
    NavigationComponent,
  ],
  entryComponents: [
    HomeComponent,
    AboutComponent,
    TitleComponent,
    ComponentWithAreaComponent,
    NavigationComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
