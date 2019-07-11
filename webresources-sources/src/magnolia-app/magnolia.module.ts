import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http'
//Services
import {WindowRef} from './services/windowref.service';
//Directives
import {AreaDirective} from './directives/area.directive';
import {ComponentDirective} from './directives/component.directive';
//Components
import {AbstractArea} from './area/abstract.area';
import {ListArea} from './area/list.area';

@NgModule({
	imports: [CommonModule, HttpClientModule],
	declarations: [ 
       AreaDirective,
       ComponentDirective, 
       
       AbstractArea,
       ListArea
	],               
	providers: [
		WindowRef
    ],
    exports:      [
	   AreaDirective,
	   ListArea,
	   ComponentDirective
    ]
})
export class MagnoliaModule { }