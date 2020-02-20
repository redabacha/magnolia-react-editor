import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import '../../../mock/mgnlRefresh.mock';
import Comment from './Comment';

describe('Comment component', () => {
    let container = null;
    beforeEach(() => {
        container = document.createElement('div');
        document.body.appendChild(container);
    });

    afterEach(() => {
        // cleanup on exiting
        unmountComponentAtNode(container);
        container.remove();
        container = null;
    });

    it('Render comment', () => {
        // GIVEN
        // WHEN
        render(
            <div>
                <Comment text='cms:page content="website:/react-sample" dialog="mte:pages/pageProperties"' />
            </div>,
            container
        );
        // THEN
        expect(container.innerHTML.includes('cms:page content="website:/react-sample" dialog="mte:pages/pageProperties"')).toBe(true);
    });
});
