import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Event, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { MagnoliaContextService } from '../magnolia-app/services/magnolia-context.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
  constructor(public router: Router, private mgnCtxService: MagnoliaContextService) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        console.log('Navigating to ' + event.url);
        // Initializes the Magnolia service
        this.mgnCtxService.setFragmentURL(event.url);
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
