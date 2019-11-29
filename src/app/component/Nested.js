import React from 'react';
import PropTypes from 'prop-types';
import { Area } from '@magnolia/magnolia-react-renderer';

function Title(props) {
    const { title, nestedArea } = props;

    return (
        <div>
            <h2>{title}</h2>
            <Area key="nestedArea" content={nestedArea} />
        </div>
    );
}
Title.propTypes = {
    title: PropTypes.string,
    nestedArea: PropTypes.object
};
Title.defaultProps = {
    title: '',
    nestedArea: null
};

export default Title;
