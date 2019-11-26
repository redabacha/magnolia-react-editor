import React, {Component} from "react";
import {withRouter} from "react-router-dom";

import {dlog
} from "./app/AppHelpers";

import ENVIRONMENT from "./environments/environment";

import Page from "./app/component/Page";

class App extends Component {
    /**
     * On init
     */
    constructor(props) {
        super(props);

        dlog("***");
        dlog("App Constructor.");

        this.loadPageContent = this.loadPageContent.bind(this);

        // Initialize state object.
        this.state = {
            init: false,
            inPageEditor: false,
            rootCmsPath: ENVIRONMENT.rootCmsPath,
            serverPath: ENVIRONMENT.serverPath,
            content: {},
            templateDefinitions: {}
        };
    }

    componentDidMount() {
        this.loadPageContent();
    }


    componentDidUpdate(prevProps, prevState) {
        if (window.parent.mgnlRefresh !== undefined) {
            window.parent.mgnlRefresh();
        }
    }

     async loadPageContent () {
        this.setState({init: false});

        let fullURL = ENVIRONMENT.restUrlBase + ENVIRONMENT.rootCmsPath ;
        dlog("Request content from: " + fullURL);

        let response = await fetch(fullURL);

        let json = await response.json();

        console.log("CONTENT===", json);

        this.setState({
            content: json
        }, () => this.loadTemplateDefinitions(json['mgnl:template']));
    }

    async loadTemplateDefinitions (templateId) {
        let templateEndpointUrl = ENVIRONMENT.templateDefinitionBase + "/" + templateId;

        //Loads the single page config
        let response = await fetch(templateEndpointUrl);
        let json = await response.json();

        console.log("Definition", json);

        this.setState({
            init: true,
            templateDefinitions: json
        });
    }

    getEditorPath(relativePath) {
        // remove serverPath
        relativePath = relativePath.substr(ENVIRONMENT.serverPath.length);

        // remove rootCmsPath
        relativePath = relativePath.substr(ENVIRONMENT.rootCmsPath.length);
        return relativePath;
    }

    removeExtension(path) {
        if (path.indexOf(".") > -1) {
            path = path.substr(0, path.lastIndexOf("."));
        }
        return path;
    }

    componentWillMount() {
        // Use ReactRouter to handle route events when the browser URL changes.
        this.unlisten = this.props.history.listen((location, action) => {
            var relativePath = location.pathname;

            if (this.state.inPageEditor) {
                relativePath = this.getEditorPath(relativePath);
            }

            relativePath = this.removeExtension(relativePath);

            dlog("***");
            dlog("Route Change. RelativePath: " + relativePath);

            this.loadPageContent(relativePath);
        });
    }

    render() {
        console.log("The state", this.state);
        console.log("The state", this.state.content);

        if (this.state.init) {
            dlog("***");
            dlog("App Render.");
            return (
              <Page key={"mainPage"} content={this.state.content} templateDefinitions={this.state.templateDefinitions} />
            );
        } else {
            return (
              <p>Loading content from CMS...</p>
            );
        }
    }
}

export default withRouter(App);
