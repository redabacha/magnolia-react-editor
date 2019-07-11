import { Injectable } from '@angular/core';

function _window() : any {
   return window;
}

@Injectable()
export class WindowRef {
	
	//Return the native Javascript window object
	get nativeWindow() : any {
		return _window();
	}
}