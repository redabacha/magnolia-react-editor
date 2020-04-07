import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import EditablePage from './EditablePage';
import '../../../mock/mgnlRefresh.mock';
import pageContent from '../../../mock/page';
import templateDefinitions from '../../../mock/template-definition';

describe('EditablePage', () => {
    let componentMappings;
    let container = null;
    let config;
    beforeEach(() => {
        componentMappings = {
            'sample-light-module:components/title': () => (<div />),
            'sample-light-module:components/text-image': () => (<div />),
            'sample-light-module:components/nested': () => (<div />),
            'sample-light-module:components/navigation': () => (<div />),
            'sample-light-module:pages/standard': () => (<div />)
        };
        config = {
            componentMappings
        };
        container = document.createElement('div');
        document.body.appendChild(container);
    });

    afterEach(() => {
        // cleanup on exiting
        unmountComponentAtNode(container);
        container.remove();
        container = null;
    });

    it('Render Page', () => {
        // GIVEN
        // WHEN
        render(<EditablePage templateDefinitions={templateDefinitions} content={pageContent} config={config} />, container);
        // THEN
        expect(container.innerHTML.includes('cms:page content="website:/react-sample" dialog="mte:pages/pageProperties"')).toBe(true);
    });

    it('Render Page in a public site', () => {
        // GIVEN
        window.parent.mgnlRefresh = null;
        // WHEN
        render(<EditablePage templateDefinitions={templateDefinitions} content={pageContent} config={config} />, container);
        // THEN
        expect(container.innerHTML.includes('cms:page content="website:/react-sample" dialog="mte:pages/pageProperties"')).toBe(false);
    });
});
