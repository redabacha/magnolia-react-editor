import React from 'react';
import PropTypes from 'prop-types';
import { Area } from '@magnolia/react-renderer';

function NestedComponent(props) {
    const { content } = props;
    const { title, nestedArea } = content;

    return (
        <div>
            <h2>{title}</h2>
            <Area key="nestedArea" content={nestedArea} parentContent={content} />
        </div>
    );
}
NestedComponent.propTypes = {
    content: PropTypes.object.isRequired
};

export default NestedComponent;
