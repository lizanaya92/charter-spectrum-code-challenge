import React from 'react';
import StateFilter from './StateFilter.jsx';
import GenreFilter from './GenreFilter.jsx';
import SearchField from './SearchField.jsx';

class Filters extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchFieldInput: '',
      displayFilters: false, 
      location: '',
      genre: '',
    };

    this.selectedState = this.selectedState.bind(this);
    this.onApplyFilters = this.onApplyFilters.bind(this);
    this.filterDataByState = this.filterDataByState.bind(this);
    this.selectedGenre = this.selectedGenre.bind(this);
    this.checkRestaurantGenre = this.checkRestaurantGenre.bind(this);
    this.clearFilters = this.clearFilters.bind(this);
    this.searchFieldInputUpdate = this.searchFieldInputUpdate.bind(this); 
    this.filterByInput = this.filterByInput.bind(this); 
    this.filterDisplayControl = this.filterDisplayControl.bind(this); 
  }

  onApplyFilters(event) {
    event.preventDefault();

    let arrayFilteredByState,
      arrayFilteredByGenre,
      arrayFilteredRestaurants;

    if (this.state.searchFieldInput !== '') {
      arrayFilteredRestaurants = this.ifSearchFieldPresent(this.state.searchFieldInput);
    } else {

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
    }

    if (arrayFilteredRestaurants.length > 0) {
      this.props.diplayFilteredRestaurants(arrayFilteredRestaurants);
    } else {
      this.props.handleNoRestaurantsFound();
    }
  }

  filterByInput(input, array) {
    let resultsArray = []; 
    let trimInput = input.trim(); 
    let searchInput = trimInput.toUpperCase();


    for (let i = 0; i < array.length; i++) {
      let restaurantName = array[i].name.toUpperCase(); 
      let restaurantCity = array[i].city.toUpperCase(); 
      let restaurantGenre = array[i].genre.toUpperCase(); 

      if (restaurantName.includes(searchInput) || restaurantCity.includes(searchInput) || restaurantGenre.includes(searchInput)) {
        resultsArray.push(array[i]);
      }
    }

    return resultsArray; 
  }

  ifSearchFieldPresent(input) {


    if (this.state.location !== '' && this.state.genre !== '') {
      let arrayFilteredByState = this.filterDataByState(this.state.location);
      let arrayFilteredByGenre = this.checkRestaurantGenre(
        arrayFilteredByState,
        this.state.genre
      );
      let arrayFilteredRestaurantsByGenreAndState = arrayFilteredByState.concat(
        arrayFilteredByGenre
      );

      return this.filterByInput(input, arrayFilteredRestaurantsByGenreAndState);
    }

    if (this.state.location !== '' && this.state.genre === '') {
      let arrayFilteredByState = this.filterDataByState(this.state.location);
      return this.filterByInput(input, arrayFilteredByState);
    }

    if (this.state.location === '' && this.state.genre !== '') {
      let arrayFilteredRestaurantsByGenre = this.checkRestaurantGenre(
        this.props.restaurantData,
        this.state.genre
      );
      return this.filterByInput(input, arrayFilteredRestaurantsByGenre);
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

  searchFieldInputUpdate (input) {
    this.setState({
      searchFieldInput: input
    });
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

  filterDisplayControl() {
    event.preventDefault();
    this.setState({
      displayFilters: !this.state.displayFilters
    });

    if (!displayFilters) {
      this.setState({
        location: '',
        genre: '',
      });
    }
  }

  render() {

    const displayFilters = this.state.displayFilters;
    let filterButton; 
    if (!displayFilters) {
      filterButton = <button onClick={this.filterDisplayControl}>Show Filters</button>;
    } else {
      filterButton = <button onClick={this.filterDisplayControl}>Hide Filters</button>;
    }

    const searchField = <SearchField 
      restaurantData={this.props.restaurantData}
      diplayFilteredRestaurants={this.props.diplayFilteredRestaurants}
      handleNoRestaurantsFound={this.props.handleNoRestaurantsFound}
      searchFieldInputUpdate={this.searchFieldInputUpdate}
    />;

    if (!this.state.displayFilters) {
      return (
        <div>
          {searchField}
          {filterButton}
        </div>
      );
    } else {
      return (
        <div>
          {searchField}
          <StateFilter selectedState={this.selectedState} />
          <GenreFilter
            restaurantData={this.props.restaurantData}
            selectedGenre={this.selectedGenre}
          />
          <button onClick={this.onApplyFilters}>Apply Filters</button>
          <button onClick={this.clearFilters}>Clear Filters</button>
          {filterButton}
        </div>
      );
    }
  }
}

export default Filters;
