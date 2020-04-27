import React from 'react';
import unitedStates from '../unitedStates_states.js';

const StateFilterOptions = props => {
  const StateOptions = unitedStates.map(state => (
    <option value={state}>{state}</option>
  ));

  return (
    <select
      className="filter-drop-down-menu"
      name="dropDownOptions"
      value={props.location}
      onChange={props.onDropdownChange}
      defaultValue="All"
    >
      {StateOptions}
    </select>
  );
};

export default StateFilterOptions;
