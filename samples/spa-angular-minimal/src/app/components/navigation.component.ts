import { Component, AfterContentInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

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
    constructor(private router: Router) {}

    async fetchContent(): Promise<Array<object>> {
        const url = `${environment.restUrlBase}${environment.rootPath}`;
        const childUrl = `${environment.restUrlBase}${environment.rootPath}/@nodes`;
        const parentRes = fetch(url);
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
        return `${path.endsWith('/') ? path : `${path.substr(0, path.length)}.html`}`;
    }

    isActive(item: object): boolean {
        const path = this.getRelativePath(item['@path']);
        let { url } = this.router;
        url = url.replace(/\.html.*$/, '');
        url = url === '' ? '/' : url;
        return url === path;
    }

    getRelativePath(path: string): string {
        const relativePath = path.substring(this.rootPath.length);
        return relativePath === '' ? '/' : relativePath;
    }
}