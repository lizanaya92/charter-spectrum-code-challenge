import React from 'react';
import StateFilter from './StateFilter.jsx';

class Filters extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: '',
      genre: '',
      attire: '',
    };

    this.selectedState = this.selectedState.bind(this);
    this.onApplyFilters = this.onApplyFilters.bind(this);
    this.filterDataByState = this.filterDataByState.bind(this);
  }

  onApplyFilters(event) {
    console.log('EVENT', event);
    console.log('Here is the State', this.state);
    event.preventDefault();
    if (this.state.location !== '') {
      const arrayFilteredRestaurants = this.filterDataByState(
        this.state.location
      );
      if (arrayFilteredRestaurants.length > 0) {
        this.props.diplayFilteredRestaurants(arrayFilteredRestaurants);
      } else {
        this.props.handleNoRestaurantsFound();
      }
    }
  }

  filterDataByState(st) {
    const arrayOfRestaurants = this.props.restaurantData;
    return arrayOfRestaurants.filter(obj => obj.state === st);
  }

  selectedState(selectedLocation) {
    this.setState({
      location: selectedLocation,
    });
  }

  render() {
    return (
      <div>
        <StateFilter selectedState={this.selectedState} />
        <button onClick={this.onApplyFilters}>Apply Filters</button>
      </div>
    );
  }
}

export default Filters;
