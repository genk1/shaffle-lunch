import React from 'react';
import PropTypes from 'prop-types';

export default function Button({ onClickFunction, text }) {
  return (
    <button type="button" onClick={() => onClickFunction()}>
      {text}
    </button>
  );
}

Button.propTypes = {
  onClickFunction: PropTypes.func,
  text: PropTypes.string,
};
Button.defaultProps = {
  onClickFunction: () => {
    'FOO';
  },
  text: 'TEXT',
};
