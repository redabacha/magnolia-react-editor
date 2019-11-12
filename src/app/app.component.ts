import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Event, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { MagnoliaContextService } from 'angular-components';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
  constructor(public router: Router, private mgnlCtxService: MagnoliaContextService) {

    this.router.events.subscribe((event: Event) => {
        if (event instanceof NavigationStart) {
          // Initializes the Magnolia service
          this.mgnlCtxService.setFragmentURL('/');
        }


        if (event instanceof NavigationEnd) {
        }

        if (event instanceof NavigationError) {
          console.log(event.error);
        }
    });
  }

  ngOnInit() {
   // this.router.navigate(['']);  //redirect other pages to homepage on browser refresh
  }

  ngAfterViewInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        window.scrollTo(0, 0);
      }
    });
  }
}
