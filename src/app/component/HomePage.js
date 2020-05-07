/* eslint-disable react/prop-types */
import React from 'react';
import { EditableArea, EditorContextHelper } from '@magnolia/react-editor';

function HomePage(props) {
    const [areaVisible, setAreaVisible] = React.useState(true);
    React.useEffect(() => {
        EditorContextHelper.refresh();
    });

    const {
        header: headerContent,
        main: mainAreaContent,
        secondary: secondaryAreaContent,
        title,
        single
    } = props;

    function toggleArea() {
        setAreaVisible(!areaVisible);
    }

    return (
        <div className="content-background">
            <div>
                <EditableArea key="header" content={headerContent} />
            </div>
            <div className="container">
                <h1 className="bd-title">{title}</h1>
                <div>
                    <h2>Primary Area</h2>
                    <div className="col-12">
                        <EditableArea key="main" content={mainAreaContent} />
                    </div>
                </div>
                {
                    areaVisible
                        ? (
                            <div>
                                <h2>Secondary Area</h2>
                                <div className="col-12">
                                    <EditableArea key="secondary" content={secondaryAreaContent} />
                                </div>
                            </div>
                        )
                        : null
                }
                <div>
                    <h2>Single component area</h2>
                    <div className="col-12">
                        <EditableArea key="single" content={single} />
                    </div>
                </div>

                <button type="button" className="btn btn-danger" onClick={() => toggleArea()}>Click me</button>
            </div>
        </div>
    );
}

export default HomePage;
