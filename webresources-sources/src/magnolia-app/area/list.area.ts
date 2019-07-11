import { Component, OnInit } 	from '@angular/core';

import { AbstractArea } 		from './abstract.area';

@Component({
	selector: "[list-area]",
  templateUrl: './list.area.html'
})
export class ListArea extends AbstractArea {}