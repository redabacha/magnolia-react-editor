import { Component, Input } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RendererContextService } from '@robsis/angular-renderer';
import { TitleComponent } from './title/title.component';
import { ComponentWithAreaComponent } from './componentWithArea/componentWithArea.component';
import { AboutComponent } from './about/about.component';

import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { NavigationComponent } from './navigation/navigation.component';

@Component({
  template: '<mgnl-page [content]="content"></mgnl-page>',
})
export class RootComponent {
  @Input() content: any;

  constructor(private http: HttpClient, private router: Router, private rendererContext: RendererContextService) {
    this.rendererContext.setComponentMapping({
      'angular-magnolia-int:pages/home': HomeComponent,
      'angular-magnolia-int:pages/about': AboutComponent,
      'angular-magnolia-int:components/title': TitleComponent,
      'angular-magnolia-int:components/componentWithArea': ComponentWithAreaComponent,
      'angular-magnolia-int:components/navigation': NavigationComponent,
    });

    // refresh the content on navigation event
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.getContent(event.url);
      }
    });
  }

  private getContent(url: string): void {
    // strip everything after '.html'
    url = url.replace(/\.html.*$/, '');
    this.http.get(`${environment.restUrlBase}${environment.rootPath}${url}`).subscribe(content => {
      // request the template definitions for given page
      this.http.get(environment.templateDefinitionBase + '/' + content['mgnl:template']).subscribe(definitions => {
        this.rendererContext.setTemplateDefinitions(definitions);
        this.content = content;
      });
    });
  }
}
