import React from 'react';
import StateFilterOptions from './StateFilterOptions.jsx';

class StateFilter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: '',
    };
    this.onDropdownChange = this.onDropdownChange.bind(this);
  }

  onDropdownChange(event) {
    event.preventDefault();
    console.log('here is the event', event.target.value);
    this.setState(
      {
        location: event.target.value,
      },
      this.props.selectedState(event.target.value)
    );
  }

  render() {
    return (
      <div>
        <label htmlFor="filterByState">State</label>
        <StateFilterOptions
          location={this.state.location}
          onDropdownChange={this.onDropdownChange}
        />
      </div>
    );
  }
}

export default StateFilter;
