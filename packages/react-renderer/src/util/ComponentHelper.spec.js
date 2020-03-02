import React from 'react';
import ComponentHelper from './ComponentHelper';
import page from '../../mock/page';

// import definitions from '../../mock/template-definition';

describe('Test ComponentHelper', () => {
    let componentMapping;
    beforeEach(() => {
        componentMapping = {
            'sample-light-module:components/title': () => (<div />),
            'sample-light-module:components/text-image': () => (<div />),
            'sample-light-module:components/nested': () => (<div />),
            'sample-light-module:components/navigation': () => (<div />),
            'sample-light-module:pages/standard': () => (<div />)
        };
    });
    it('getRenderedComponent', () => {
        // GIVEN
        const area = page.main;
        const nestedComponentContent = area['0'];
        // WHEN
        const pageComponent = ComponentHelper.getRenderedComponent(page, componentMapping);
        const nestedComponent = ComponentHelper.getRenderedComponent(nestedComponentContent, componentMapping);

        // THEN
        expect(pageComponent).toBeDefined();
        expect(nestedComponent).toBeDefined();
    });
});
