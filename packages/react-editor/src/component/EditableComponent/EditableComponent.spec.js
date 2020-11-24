import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import '../../../mock/mgnlRefresh.mock';
import EditableComponent from './EditableComponent';
import { EditorProvider } from '../../util';
import pageContent from '../../../mock/page';
import templateAnnotations from '../../../mock/template-annotations';

describe('EditableComponent component', () => {
    let componentMappings;
    let state;
    let container = null;
    beforeEach(() => {
        componentMappings = {
            'sample-light-module:components/title': () => (<div />),
            'sample-light-module:components/text-image': () => (<div />),
            'sample-light-module:components/nested': () => (<div />),
            'sample-light-module:components/navigation': () => (<div />),
            'sample-light-module:pages/standard': () => (<div />)
        };
        state = {
            templateAnnotations,
            componentMappings,
            content: pageContent
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

    it('Render EditableComponent', () => {
        // GIVEN
        const editableComponentText = 'cms:component content="/react-sample/main/0"';

        // WHEN
        render(
            <EditorProvider value={state}>
                <div>
                    <EditableComponent content={pageContent.main['0']} />
                </div>
            </EditorProvider>,
            container
        );
        // THEN
        expect(container.innerHTML.includes(cleanString(editableComponentText))).toBe(true);
    });

    it('Render EditableComponent in public a site', () => {
        // GIVEN
        window.frameElement = null;
        const areaCommentText = 'cms:component';

        // WHEN
        render(
            <EditorProvider value={state}>
                <div>
                    <EditableComponent content={pageContent.main['0']} />
                </div>
            </EditorProvider>,
            container
        );
        // THEN
        expect(container.innerHTML.includes(cleanString(areaCommentText))).toBe(false);
    });

    function cleanString(str) {
        return str.replace(/\n/g, ' ').replace(/\s+/g, ' ');
    }
});
