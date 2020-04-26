import React from 'react';
import unitedStates from '../unitedStates_states.js';

const StateFilterOptions = props => {
  const StateOptions = unitedStates.map(state => (
    <option value={state}>{state}</option>
  ));

  return (
    <select
      name="dropDownOptions"
      value={props.location}
      onChange={props.onDropdownChange}
    >
      {StateOptions}
    </select>
  );
};

export default StateFilterOptions;
