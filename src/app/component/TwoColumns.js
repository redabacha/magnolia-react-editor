/* eslint-disable react/prop-types */
import React from 'react';
import { EditableArea, EditorContext, EditorContextHelper } from '@magnolia/react-editor';

function TwoColumns() {
    const context = React.useContext(EditorContext);
    React.useEffect(() => {
        EditorContextHelper.refresh();
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
                <EditableArea key="header" content={headerContent} />
            </div>
            <div className="container">
                <h1 className="bd-title">{title}</h1>
                <div className="row">
                    <div className="col-sm">
                        <EditableArea key="left" content={leftAreaContent} />
                    </div>
                    <div className="col-sm">
                        <EditableArea key="right" content={rightAreaContent} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TwoColumns;
