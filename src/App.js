import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import {
    dlog, isInPageEditor, getEditorPath, removeExtension
} from './app/AppHelpers';
import ENVIRONMENT from './environments/environment';
import Page from './app/component/Page';

class App extends Component {
    static propTypes = {
        history: PropTypes.object
    };

    static defaultProps = {
        history: null
    };

    /**
     * On init
     */
    constructor(props) {
        super(props);

        dlog('***');
        dlog('App Constructor.');

        this.loadPageContent = this.loadPageContent.bind(this);

        // Initialize state object.
        this.state = {
            init: false,
            inPageEditor: isInPageEditor(),
            rootCmsPath: ENVIRONMENT.rootCmsPath,
            serverPath: ENVIRONMENT.serverPath,
            content: {},
            templateDefinitions: {}
        };
    }

    // https://reactjs.org/docs/react-component.html#unsafe_componentwillmount
    // eslint-disable-next-line camelcase
    UNSAFE_componentWillMount() {
        // Use ReactRouter to handle route events when the browser URL changes.
        const { history } = this.props;
        const { inPageEditor } = this.state;
        this.unlisten = history.listen((location, action) => {
            let relativePath = location.pathname;

            if (inPageEditor) {
                relativePath = getEditorPath(relativePath);
            }

            relativePath = removeExtension(relativePath);

            dlog('***');
            dlog(`Route Change. RelativePath: ${relativePath}`);

            this.loadPageContent(relativePath);
        });
    }

    componentDidMount() {
        this.loadPageContent();
    }


    componentDidUpdate(prevProps, prevState) {
        if (window.parent.mgnlRefresh !== undefined) {
            window.parent.mgnlRefresh();
        }
    }

    async loadTemplateDefinitions(templateId) {
        const templateEndpointUrl = `${ENVIRONMENT.templateDefinitionBase}/${templateId}`;

        // Loads the single page config
        const response = await fetch(templateEndpointUrl);
        const json = await response.json();

        console.log('Definition', json);

        this.setState({
            init: true,
            templateDefinitions: json
        });
    }

    async loadPageContent() {
        this.setState({ init: false });

        const fullURL = `${ENVIRONMENT.restUrlBase}${removeExtension(window.location.pathname)}`;
        dlog(`Request content from: ${fullURL}`);

        const response = await fetch(fullURL);

        const json = await response.json();

        console.log('CONTENT===', json);

        this.setState({
            content: json
        }, () => this.loadTemplateDefinitions(json['mgnl:template']));
    }

    render() {
        const { content, templateDefinitions, init } = this.state;
        console.log('The state', this.state);
        console.log('The state', content);
        console.log(Page);

        if (init) {
            dlog('***');
            dlog('App Render.');
            return (
                <Page key="mainPage" content={content} templateDefinitions={templateDefinitions} />
            );
        }
        return (
            <p>Loading content from CMS...</p>
        );
    }
}

export default withRouter(App);
