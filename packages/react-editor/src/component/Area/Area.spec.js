import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import '../../../mock/mgnlRefresh.mock';
import Area from './Area';
import { RendererProvider } from '../../util';
import pageContent from '../../../mock/page';
import templateDefinitions from '../../../mock/template-definition';

describe('Area component', () => {
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
            templateDefinitions,
            componentMappings,
            content: pageContent,
            inEditor: true,
            inEditorPreview: false,
            isDevMode: true
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

    it('Render area', () => {
        // GIVEN
        const areaCommentText = `cms:area name="main" content="website:/react-sample/main"
        availableComponents="sample-light-module:components/text-image,sample-light-module:components/title,sample-light-module:components/nested"
         type="list" label="Main" inherit="false" optional="false" createdAreaNode="true" showAddButton="true" showNewComponentArea="true" description=""
         activationStatus="1"`;

        // WHEN
        render(
            <RendererProvider value={state}>
                <div>
                    <Area content={pageContent.main} />
                </div>
            </RendererProvider>,
            container
        );
        // THEN
        expect(container.innerHTML.includes(cleanString(areaCommentText))).toBe(true);
    });

    it('Render nested area', () => {
        // GIVEN
        const areaCommentText = `cms:area name="nestedArea" content="website:/react-sample/main/0/nestedArea"
            availableComponents="sample-light-module:components/text-image,sample-light-module:components/title"
            type="list" label="Nested Area" inherit="false" optional="false" createdAreaNode="true" showAddButton="true"
            showNewComponentArea="true" description="" activationStatus="0"`;

        // WHEN
        render(
            <RendererProvider value={state}>
                <div>
                    <Area content={pageContent.main['0'].nestedArea} parentTemplateId={pageContent.main['0']['mgnl:template']} />
                </div>
            </RendererProvider>,
            container
        );
        // THEN
        expect(container.innerHTML.includes(cleanString(areaCommentText))).toBe(true);
    });

    it('Render area in public a site', () => {
        // GIVEN
        state.inEditor = false;
        state.isDevMode = false;
        const areaCommentText = 'cms:area';

        // WHEN
        render(
            <RendererProvider value={state}>
                <div>
                    <Area content={pageContent.main} />
                </div>
            </RendererProvider>,
            container
        );
        // THEN
        expect(container.innerHTML.includes(cleanString(areaCommentText))).toBe(false);
    });

    function cleanString(str) {
        return str.replace(/\n/g, ' ').replace(/\s+/g, ' ');
    }
});
