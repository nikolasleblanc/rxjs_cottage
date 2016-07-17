import React from 'react';
import classNames from 'classnames';

function Leaf({ color, padding, ...props }) {
  const classes = classNames(color, padding);
  console.log(classes);
  return (
    <div className={classes} {...props}>
      Leaf1
    </div>
  );
}

Leaf.propTypes = {
  color: React.PropTypes.string,
  padding: React.PropTypes.string,
};

export default Leaf;
