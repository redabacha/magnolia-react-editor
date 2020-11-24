import React from 'react';
import PropTypes from 'prop-types';
import { EditableArea } from '@magnolia/react-editor';

function NestedComponent(props) {
    const { title, nestedArea } = props;

    return (
        <div>
            <h2>{title}</h2>
            <EditableArea key="nestedArea" content={nestedArea} />
        </div>
    );
}
NestedComponent.propTypes = {
    title: PropTypes.string.isRequired,
    nestedArea: PropTypes.object.isRequired
};

export default NestedComponent;
