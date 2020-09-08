/* eslint-disable react/prop-types */
import React from 'react';
import { EditableArea, EditorContextHelper } from '@magnolia/react-editor';
import CustomArea from './CustomArea';

function HomePage(props) {
    const [areaVisible, setAreaVisible] = React.useState(true);
    React.useEffect(() => {
        EditorContextHelper.refresh();
    });

    const {
        header: headerContent,
        main: mainAreaContent,
        secondary: secondaryAreaContent,
        noComponent,
        title,
        single
    } = props;

    function toggleArea() {
        setAreaVisible(!areaVisible);
    }

    return (
        <div className="content-background">
            <div>
                <EditableArea content={headerContent} />
            </div>
            <div className="container">
                <h1 className="bd-title">{title}</h1>
                <div>
                    <h2>Primary Area</h2>
                    <div className="col-12">
                        <EditableArea content={mainAreaContent} />
                    </div>
                </div>
                {
                    areaVisible
                        ? (
                            <div>
                                <h2>Secondary Area</h2>
                                <div className="col-12">
                                    <EditableArea content={secondaryAreaContent} />
                                </div>
                            </div>
                        )
                        : null
                }
                <div>
                    <h2>Custom area</h2>
                    <div className="col-12">
                        <CustomArea content={single} />
                    </div>
                </div>

                <div>
                    <h2>NoComponent area</h2>
                    <div className="col-12">
                        <EditableArea content={noComponent}>
                            {noComponent.title}
                        </EditableArea>
                    </div>
                </div>

                <button type="button" className="btn btn-danger" onClick={() => toggleArea()}>Click me</button>
            </div>
        </div>
    );
}

export default HomePage;
