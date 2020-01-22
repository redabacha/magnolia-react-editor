import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { routing } from './app.routing';

import { MagnoliaModule } from '@robsis/angular-renderer';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { TitleComponent } from './title/title.component';
import { ComponentWithAreaComponent } from './componentWithArea/componentWithArea.component';
import { AboutComponent } from './about/about.component';
import { RootComponent } from './root.component';
import { NavigationComponent } from './navigation/navigation.component';

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
