import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import '../../../mock/mgnlRefresh.mock';
import EditableArea from './EditableArea';
import { EditorProvider } from '../../util';
import pageContent from '../../../mock/page';
import templateAnnotations from '../../../mock/template-annotations';

describe('EditableArea component', () => {
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

    it('Render EditableArea default', () => {
        // GIVEN
        const areaCommentText = 'cms:area content="/react-sample/main"';
        const className = { class1: true, class2: false, class3: true };

        // WHEN
        render(
            <EditorProvider value={state}>
                <div>
                    <EditableArea content={pageContent.main} className={className} />
                </div>
            </EditorProvider>,
            container
        );
        // THEN
        expect(container.innerHTML.includes(cleanString(areaCommentText))).toBe(true);
        expect(container.innerHTML.includes('class="class1 class3"')).toBe(true);
    });

    it('Render EditableArea with <ul>', () => {
        // GIVEN
        const areaCommentText = 'cms:area content="/react-sample/main"';
        const className = { class1: true, class2: false, class3: true };

        // WHEN
        render(
            <EditorProvider value={state}>
                <div>
                    <EditableArea content={pageContent.main} className={className} elementType="ul" />
                </div>
            </EditorProvider>,
            container
        );
        // THEN
        expect(container.innerHTML.includes(cleanString(areaCommentText))).toBe(true);
        expect(container.innerHTML.includes('ul class="class1 class3"')).toBe(true);
    });

    it('Render nested EditableArea', () => {
        // GIVEN
        const areaCommentText = 'cms:area content="/react-sample/main/0/nestedArea"';
        // WHEN
        render(
            <EditorProvider value={state}>
                <div>
                    <EditableArea content={pageContent.main['0'].nestedArea} />
                </div>
            </EditorProvider>,
            container
        );
        // THEN
        expect(container.innerHTML.includes(cleanString(areaCommentText))).toBe(true);
    });

    it('Render EditableArea in public a site', () => {
        // GIVEN
        window.frameElement = null;
        const areaCommentText = 'cms:area';

        // WHEN
        render(
            <EditorProvider value={state}>
                <div>
                    <EditableArea content={pageContent.main} />
                </div>
            </EditorProvider>,
            container
        );
        // THEN
        expect(container.innerHTML.includes(cleanString(areaCommentText))).toBe(false);
    });

    it('Render children of EditableArea', () => {
        // GIVEN
        window.frameElement = null;
        pageContent.main.title = 'fooBar';

        // WHEN
        render(
            <EditorProvider value={state}>
                <div>
                    <EditableArea content={pageContent.main}>
                        {pageContent.main.title}
                    </EditableArea>
                </div>
            </EditorProvider>,
            container
        );
        // THEN
        expect(container.innerHTML.includes('fooBar')).toBe(true);
    });

    function cleanString(str) {
        return str.replace(/\n/g, ' ').replace(/\s+/g, ' ');
    }
});
