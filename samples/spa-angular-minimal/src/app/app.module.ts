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
import { CustomArea } from './components/custom-area.component';
import { CardComponent } from './components/card.component';
import { AlertComponent } from './components/alert.component';

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
    CardComponent,
    AlertComponent,
    TextImageComponent,
    AboutComponent,
    TwoColumnsComponent,
    NavigationComponent,
    CustomArea
  ],
  entryComponents: [
    HomeComponent,
    AboutComponent,
    TextImageComponent,
    CardComponent,
    AlertComponent,
    TwoColumnsComponent,
    NavigationComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
