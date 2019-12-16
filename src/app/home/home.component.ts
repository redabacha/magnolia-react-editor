import { Component, Input, OnInit } from '@angular/core';
import { RendererContextService } from '@magnolia/angular-renderer';
import { TitleComponent } from '../title/title.component';
import { ComponentWithAreaComponent } from '../componentWithArea/componentWithArea.component';
import { environment } from '../../environments/environment';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  secondaryAreaVisible = true;
  @Input() content: any;

  toggleArea() {
    this.secondaryAreaVisible = !this.secondaryAreaVisible;
  }

  constructor(private rendererContext: RendererContextService) {
    this.rendererContext.setEditMode(true);
    this.rendererContext.setComponentMapping({
      'angular-magnolia-int:pages/home': HomeComponent,
      'angular-magnolia-int:components/title': TitleComponent,
      'angular-magnolia-int:components/componentWithArea': ComponentWithAreaComponent,
    });
  }

  ngOnInit(): void {
    fetch(environment.restUrlBase + environment.rootCmsPath).then(response => response.json())
        .then(content => {
          fetch(environment.templateDefinitionBase + '/' + content['mgnl:template']).then(response => response.json())
              .then(definitions => {
                this.rendererContext.setTemplateDefinitions(definitions);

                this.content = content;
              });
        });
  }
}
