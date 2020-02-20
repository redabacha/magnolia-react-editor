import React from 'react';
import PropTypes from 'prop-types';

function Title(props) {
    const { content } = props;
    const { title } = content;

    return (
        <div>
            <h2>{title}</h2>
        </div>
    );
}

Title.propTypes = {
    content: PropTypes.string.isRequired
};

export default Title;
