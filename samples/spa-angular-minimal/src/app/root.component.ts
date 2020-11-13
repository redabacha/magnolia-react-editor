import { Component, Input } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { HomeComponent } from './pages/home.component';
import { EditorContextService } from '@magnolia/angular-editor';
import { TextImageComponent } from './components/textImage.component';
import { TwoColumnsComponent } from './components/twoColumns.component';
import { AboutComponent } from './pages/about.component';

import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { NavigationComponent } from './components/navigation.component';
import { CardComponent } from './components/card.component';
import { AlertComponent } from './components/alert.component';

@Component({
  template: '<editable-page [content]="content"></editable-page>',
})
export class RootComponent {
  @Input() content: any;

  constructor(private http: HttpClient, private router: Router, private editorContext: EditorContextService, private window: Window ) {
    this.editorContext.setComponentMapping({
      'angular-magnolia-int:pages/home': HomeComponent,
      'angular-magnolia-int:pages/about': AboutComponent,
      'angular-magnolia-int:components/textImage': TextImageComponent,
      'angular-magnolia-int:components/twoColumns': TwoColumnsComponent,
      'angular-magnolia-int:components/card': CardComponent,
      'angular-magnolia-int:components/alert': AlertComponent,
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
    const version = this.getVersion();
    this.http.get(`${version ?
      environment.restPreviewUrlBase : environment.restUrlBase}${environment.rootPath}${url}${version ? `?version=${version}` : ''}`)
      .subscribe(content => {
      // request the template definitions for given page
      this.http.get(environment.templateDefinitionBase + '/' + content['mgnl:template']).subscribe(definitions => {
        this.editorContext.setTemplateDefinitions(definitions);
        this.content = content;
      });
    });
  }

  private getVersion(): string {
    if (typeof window === 'undefined') {
      return '';
    }
    return new URLSearchParams(window.location.href).get('mgnlVersion');
  }
}
