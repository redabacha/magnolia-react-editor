/* eslint-disable react/prop-types */
import React from 'react';
import { EditableArea, EditorContextHelper } from '@magnolia/react-editor';

function TwoColumns(props) {
    React.useEffect(() => {
        EditorContextHelper.refresh();
    });

    const {
        header: headerContent,
        left: leftAreaContent,
        right: rightAreaContent,
        title
    } = props;

    return (
        <div className="content-background">
            <div>
                <EditableArea content={headerContent} />
            </div>
            <div className="container">
                <h1 className="bd-title">{title}</h1>
                <div className="row">
                    <div className="col-sm">
                        <EditableArea content={leftAreaContent} />
                    </div>
                    <div className="col-sm">
                        <EditableArea content={rightAreaContent} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TwoColumns;
