import React from 'react';
import StateFilterOptions from './StateFilterOptions.jsx';

const StateFilter = props => {

  const onDropdownChange = event => {
    event.preventDefault();
    props.selectedState(event.target.value);
  }; 

  return (
    <div>
      <label htmlFor="filterByState">State</label>
      <StateFilterOptions
        location={event.target.value}
        onDropdownChange={onDropdownChange}
      />
    </div>
  );
};

export default StateFilter;
