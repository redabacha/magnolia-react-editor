import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { routing } from './app.routing';

import { MagnoliaModule } from '@magnolia/angular-editor';

import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home.component';
import { TextImageComponent } from './components/textImage.component';
import { TwoColumnsComponent } from './components/twoColumns.component';
import { AboutComponent } from './pages/about.component';
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
    TextImageComponent,
    AboutComponent,
    TwoColumnsComponent,
    NavigationComponent,
  ],
  entryComponents: [
    HomeComponent,
    AboutComponent,
    TextImageComponent,
    TwoColumnsComponent,
    NavigationComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
