import React from 'react';
import PropTypes from 'prop-types';

function Title(props) {
  const { title } = props;

  return (
    <div>
      <h2>{title}</h2>
    </div>
  );
}

Title.propTypes = {
  title: PropTypes.string.isRequired
};

export default Title;
