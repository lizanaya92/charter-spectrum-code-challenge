import React from 'react';
import StateFilter from './StateFilter.jsx';
import GenreFilter from './GenreFilter.jsx';

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
    this.selectedGenre = this.selectedGenre.bind(this);
    this.checkRestaurantGenre = this.checkRestaurantGenre.bind(this);
    this.clearFilters = this.clearFilters.bind(this);
  }

  onApplyFilters(event) {
    event.preventDefault();

    let arrayFilteredByState,
      arrayFilteredByGenre,
      arrayFilteredRestaurants;
    const copyOfRestaurantData = [...this.props.restaurantData];

    if (this.state.location !== '' && this.state.genre !== '') {
      arrayFilteredByState = this.filterDataByState(this.state.location);
      arrayFilteredByGenre = this.checkRestaurantGenre(
        arrayFilteredByState,
        this.state.genre
      );
      arrayFilteredRestaurants = arrayFilteredByState.concat(
        arrayFilteredByGenre
      );
    }

    if (this.state.location === '' && this.state.genre !== '') {
      arrayFilteredRestaurants = this.checkRestaurantGenre(
        copyOfRestaurantData,
        this.state.genre
      );
    }

    if (this.state.location !== '' && this.state.genre === '') {
      arrayFilteredRestaurants = this.filterDataByState(this.state.location);
    }

    if (arrayFilteredRestaurants.length > 0) {
      this.props.diplayFilteredRestaurants(arrayFilteredRestaurants);
    } else {
      this.props.handleNoRestaurantsFound();
    }
  }

  checkRestaurantGenre(array, selectedGenre) {
    const restaurantIncludesGenre = [];

    for (let i = 0; i < array.length; i++) {
      if (array[i].genre.includes(selectedGenre)) {
        restaurantIncludesGenre.push(array[i]);
      }
    }

    return restaurantIncludesGenre;
  }

  filterDataByState(st) {
    const arrayOfRestaurants = [...this.props.restaurantData];
    return arrayOfRestaurants.filter(obj => obj.state === st);
  }

  selectedState(selectedLocation) {
    this.setState({
      location: selectedLocation,
    });
  }

  selectedGenre(selectedGenre) {
    this.setState({
      genre: selectedGenre,
    });
  }

  clearFilters(event) {
    event.preventDefault();
    window.location.reload(true);
  }

  render() {
    return (
      <div>
        <StateFilter selectedState={this.selectedState} />
        <GenreFilter
          restaurantData={this.props.restaurantData}
          selectedGenre={this.selectedGenre}
        />
        <button onClick={this.onApplyFilters}>Apply Filters</button>
        <button onClick={this.clearFilters}>Clear Filters</button>
      </div>
    );
  }
}

export default Filters;
