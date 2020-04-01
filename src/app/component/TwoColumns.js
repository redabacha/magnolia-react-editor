/* eslint-disable react/prop-types */
import React from 'react';
import { Area, EditorContext } from '@magnolia/react-editor';

function TwoColumns() {
    const context = React.useContext(EditorContext);
    React.useEffect(() => {
        if (window.parent.mgnlRefresh !== undefined) {
            window.parent.mgnlRefresh();
        }
    });
    const { content } = context;
    const {
        header: headerContent,
        left: leftAreaContent,
        right: rightAreaContent,
        title
    } = content;

    return (
        <div className="content-background">
            <div>
                <Area key="header" content={headerContent} />
            </div>
            <div className="container">
                <h1 className="bd-title">{title}</h1>
                <div className="row">
                    <div className="col-sm">
                        <Area key="left" content={leftAreaContent} />
                    </div>
                    <div className="col-sm">
                        <Area key="right" content={rightAreaContent} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TwoColumns;
