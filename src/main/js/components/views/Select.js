import React from 'react';
import PropTypes from 'prop-types';
import { Input } from 'reactstrap';

/**
 * A functional component for rendering a drop down list
 *
 * @export
 * @param {object} props - Component properties
 * @returns The new component
 */
export function Select(props) {
  return (
    <Input
      type="select"
      name={props.title}
      id={props.id}
      value={props.value}
      onChange={e => typeof props.onChange === 'function' ? props.onChange(e.target.value) : null}
      readOnly={props.readOnly}
    >
      {
        props.options.map(option => (
          <option key={option.value} value={option.value}>{option.label || option.value}</option>
        ))
      }
    </Input>
  );
}

export default Select;

Select.propTypes = {
  id: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  value: PropTypes.any,
  onChange: PropTypes.func.isRequired,
};

