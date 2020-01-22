import React from 'react';
import {
    Area, RendererContext, Page
} from '@robsis/react-renderer';
import PropTypes from 'prop-types';
import { dlog } from '../AppHelpers';
import COMPONENTS from '../../environments/mapping';

function HomePage(props) {
    const [areaVisible, setAreaVisible] = React.useState(true);
    const context = React.useContext(RendererContext);
    React.useEffect(() => {
        if (window.parent.mgnlRefresh !== undefined) {
            window.parent.mgnlRefresh();
        }
    });
    dlog('render PageStandard.');
    dlog('page context', context);
    const { content, templateDefinitions } = props;
    const {
        header: headerContent,
        main: mainAreaContent,
        secondary: secondaryAreaContent,
        title,
        single
    } = content;

    function toggleArea() {
        setAreaVisible(!areaVisible);
    }

    return (
        <Page templateDefinitions={templateDefinitions} content={content} componentMappings={COMPONENTS}>
            <div className="content-background">
                <div>
                    <Area key="header" content={headerContent} />
                </div>
                <div className="container">
                    <h1 className="bd-title">{title}</h1>
                    <div>
                        <h2>Primary Area</h2>
                        <div className="col-12">
                            <Area key="main" content={mainAreaContent} />
                        </div>
                    </div>
                    {
                        areaVisible
                            ? (
                                <div>
                                    <h2>Secondary Area</h2>
                                    <div className="col-12">
                                        <Area key="secondary" content={secondaryAreaContent} />
                                    </div>
                                </div>
                            )
                            : null
                    }
                    <div>
                        <h2>Single component area</h2>
                        <div className="col-12">
                            <Area key="single" content={single} />
                        </div>
                    </div>

                    <button type="button" className="btn btn-danger" onClick={() => toggleArea()}>Click me</button>
                </div>
            </div>
        </Page>
    );
}

HomePage.propTypes = {
    content: PropTypes.object,
    templateDefinitions: PropTypes.object.isRequired
};

HomePage.defaultProps = {
    content: null
};

export default HomePage;
