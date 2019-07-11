import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WindowRef } from './windowref.service';
import { environment } from '../../environments/environment';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class MagnoliaContextService {
  /** Native window object. */
  nativeWindow: any;
  /** Single page config.*/
  singlePageConfig: any;
  /** Fragment URL.*/
  fragmentURL: string;
  /** Content node. */
  private contentNode: Promise<any>;
  /**
	 * Constructor
	 */
  constructor(private winRef: WindowRef, private http: HttpClient) {
    this.nativeWindow = winRef.nativeWindow;
    this.singlePageConfig = this.nativeWindow.singlePageConfig;
    this.fragmentURL = '/';
    if (this.singlePageConfig == null) {
      this.singlePageConfig = {};
    } else {
      this.contentNode = Promise.resolve(this.singlePageConfig.content);
    }
  }

  /**
	 * Set the fragment URL.
	 */
  setFragmentURL(fragment: string) {
    // If production mode, then gather content through a REST call
    if (!environment.mgnEditMode) {
      this.fragmentURL = fragment;

      this.contentNode = this.retrievePageContent();
    }
  }

  /**
	 * Return whether the page is in edition mode
	 *
	 * @return Whether the page is in edition mode
	 */
  isEditionMode(): boolean {
    return environment.mgnEditMode;
  }

  /**
	 * Returns the current Magnolia JCR node path.
	 */
  async getCurrentNode() {
    const content = await this.contentNode;

    return content['@path'];
  }

  /**
	 * Return the the defined area in the Magnolia context
	 *
	 * @param areaName The name of the area
	 */
  async getAreaContent(areaName: string) {
    const content = await this.contentNode;

    return content[areaName];
  }

  /**
	 * Return the area's defined components
	 *
	 * @param areaName The name of the area
	 */
  async getAreaComponents(areaName: string) {
    const results = new Array();

    const content = await this.contentNode;;

    // Gets the area content
    const areaContent = content[areaName];

    if (areaContent != null) {
      const components = areaContent['@nodes'];
      components.map(nodeName => {
        const value = areaContent[nodeName];

        if (typeof(value) === 'object' && value['@nodeType'] === 'mgnl:component') {
          results.push(value);
        }
      });
    }

    return results;
  }

  /**
	 * Return the component mapping
	 *
	 * @param nodePath The component mapping
	 */
  getComponentMapping(templateId: string) {
    if (this.singlePageConfig.componentMappings !== null) {
      return this.singlePageConfig.componentMappings[templateId];
    } else {
      return null;
    }
  }

  /**
	 * Return the HTML comment
	 *
	 * @param nodePath The node path
	 */
  getHtmlComment(nodePath: string) {
    if (this.singlePageConfig.htmlComments !== null) {
      return this.singlePageConfig.htmlComments[nodePath];
    } else {
      return null;
    }
  }

  private async retrievePageContent(): Promise<any> {
    this.singlePageConfig.componentMappings = await this.retrieveComponentMappings()

    return this.http.get(environment.restUrl + this.fragmentURL)
      .map(response => {
        // console.log("retrievePageContent with " + this.fragmentURL + " value " + JSON.stringify(response,
        // null, 2));
        return response;
      })
      .toPromise();
  }

  private async retrieveComponentMappings(): Promise<any> {
    return this.http.get(environment.configRestUrl + this.fragmentURL)
      .map(response => {
        // console.log("retrieveComponentMappings with " + this.fragmentURL + " value " +
        // JSON.stringify(response, null, 2));
        return response;
       })
      .toPromise();
  }
}
