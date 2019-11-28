import { Component, OnInit, Input} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RendererContextService } from '@magnolia/angular-renderer';
import { TitleComponent } from './title/title.component';
import { ComponentWithAreaComponent } from './componentWithArea/componentWithArea.component';
import { environment } from '../environments/environment';
import { HomeComponent } from './home/home.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @Input() content: any;

  constructor(private http: HttpClient, private rendererContext: RendererContextService) {
    this.rendererContext.setEditMode(true);
    this.rendererContext.setComponentMapping({
      'angular-magnolia-int:pages/home': HomeComponent,
      'angular-magnolia-int:components/title': TitleComponent,
      'angular-magnolia-int:components/componentWithArea': ComponentWithAreaComponent,
    });
  }

    ngOnInit(): void {

        this.http.get(environment.restUrlBase + environment.rootCmsPath).pipe()
          .subscribe(data => {
              this.content = data;

              this.http.get(environment.templateDefinitionBase + '/' + this.content['mgnl:template']).pipe()
                  .subscribe(definitions => {
                      this.rendererContext.setTemplateDefinitions(definitions);
                  });
          });
    }
}
