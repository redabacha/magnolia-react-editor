import { Injectable } from '@angular/core';

function _window(): any {
   return window;
}

@Injectable({
  providedIn: 'root'
})
export class WindowRefService {
  // Return the native Javascript window object
  get nativeWindow(): any {
    return _window();
  }
}
