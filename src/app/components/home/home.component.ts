import { Component, Input, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { RendererContextService } from 'angular-renderer';
import { TitleComponent } from '../title/title.component';
import { ComponentWithAreaComponent } from '../componentWithArea/componentWithArea.component';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @Input() content: any;

  @Input() list = ['a', 'b', 'c'];

  constructor(private http: HttpClient, private rendererContext: RendererContextService) {
    this.rendererContext.setEditMode(false);
    this.rendererContext.setComponentMapping({
      'angular-magnolia-int:components/title': TitleComponent,
      'angular-magnolia-int:components/componentWithArea': ComponentWithAreaComponent,
    });
  }

  ngOnInit(): void {
    this.http.get(environment.restUrlBase + environment.rootCmsPath).pipe()
        .subscribe(data => this.content = data);
  }
}
