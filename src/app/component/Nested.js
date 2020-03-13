import React from 'react';
import PropTypes from 'prop-types';
import { Area } from '@magnolia/react-editor';

function NestedComponent(props) {
    const { title, nestedArea, metadata } = props;

    return (
        <div>
            <h2>{title}</h2>
            <Area key="nestedArea" content={nestedArea} parentTemplateId={metadata['mgnl:template']} />
        </div>
    );
}
NestedComponent.propTypes = {
    title: PropTypes.object.isRequired,
    nestedArea: PropTypes.object.isRequired,
    metadata: PropTypes.object.isRequired
};

export default NestedComponent;
