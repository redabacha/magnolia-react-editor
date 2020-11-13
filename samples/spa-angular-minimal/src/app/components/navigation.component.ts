import { Component, AfterContentInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
    template: `
        <div>
            <nav class="navbar navbar-expand-sm bg-primary navbar-dark">
                <ul class="navbar-nav">
                    <ng-template ngFor let-item [ngForOf]="navData">
                        <li class="nav-item" [ngClass]="{'active': isActive(item)}">
                            <a class="nav-link" [routerLink]="getLink(item)">{{item.title || item['@name']}}</a>
                        </li>
                    </ng-template>
                </ul>
            </nav>
        </div>
    `
})
export class NavigationComponent implements AfterContentInit {
    navData: object;
    rootPath: string;

    constructor(private router: Router, private location: Location) {}

    async fetchContent(): Promise<Array<object>> {
        const url = this.router.url;
        // strip .html and context
        let path = this.location.prepareExternalUrl(url);
        path = path.replace(/\.html.*$/, '');
        path = environment.serverPath ? path.substr(environment.serverPath.length) : path;
        // find the root page (not ideal..)
        path = this.getRootPath(path);
        const pageUrl = `${environment.restUrlBase}${path}`;
        const childUrl = `${environment.restUrlBase}${path}@nodes`;
        const parentRes = fetch(pageUrl);
        const childRes = fetch(childUrl);
        await parentRes;
        await childRes;
        const parentData = await (await parentRes).json();
        const childData = await (await childRes).json();
        return [parentData, ...childData];
    }

    ngAfterContentInit(): void {
        if (!this.navData) {
            this.fetchContent().then(data => {
                this.navData = data;
                this.rootPath = data.length ? `/${data[0]['@name']}` : '';
            });
        }
    }

    getLink(item: object): string {
        const path = this.getRelativePath(item['@path']);
        return path.endsWith('/') ? path : path.substr(0, path.length);
    }

    isActive(item: object): boolean {
        const path = this.getRelativePath(item['@path']);
        let { url } = this.router;
        url = url.replace(/\.html.*$/, '');
        return url === path;
    }

    getRelativePath(path: string): string {
        const relativePath = path.substring(this.rootPath.length);
        return relativePath === '' ? '/' : relativePath;
    }

    getRootPath(path: string): string {
        const paths = path.split('/');
        if (paths.length < 2) {
            return path;
        }
        return `/${paths[1]}`;
    }
}
