import React from 'react';
import ComponentHelper from './ComponentHelper';
import page from '../../mock/page';
import getComponentPropertiesJsonResult from '../../mock/expected-result/getComponentProperties';
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

    it('getComponentProperties', () => {
        // GIVEN
        const expectedResult = getComponentPropertiesJsonResult;

        // WHEN
        const result = ComponentHelper.getComponentProperties(page);

        // THEN
        expect(result).toMatchObject(expectedResult);
    });

    it('getComponentProperties with null content', () => {
        // GIVEN
        const expectedResult = {};

        // WHEN
        const result = ComponentHelper.getComponentProperties(null);

        // THEN
        expect(result).toMatchObject(expectedResult);
    });

    it('addComment', () => {
        // GIVEN
        const div = document.createElement('div');
        const openComment = 'open comment';
        const closeComment = 'close comment';

        // WHEN
        ComponentHelper.addComment(div, openComment, closeComment);

        // THEN
        expect(div.firstChild.textContent).toEqual(openComment);
        expect(div.lastChild.textContent).toEqual(closeComment);
    });
});
