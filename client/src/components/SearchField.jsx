import React from 'react'; 

class SearchField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: ''
    };

    this.onInputChange = this.onInputChange.bind(this); 
    this.onSubmit = this.onSubmit.bind(this); 
    this.filterByInput = this.filterByInput.bind(this); 
    this.resetFilters = this.resetFilters.bind(this); 
    this.pressedEnter = this.pressedEnter.bind(this); 
  }

  filterByInput(input) {
    let restaurants = this.props.restaurantData.slice(); 
    let resultsArray = []; 

    for (let i = 0; i < restaurants.length; i++) {
      let restaurantName = restaurants[i].name.toUpperCase(); 
      let restaurantCity = restaurants[i].city.toUpperCase(); 
      let restaurantGenre = restaurants[i].genre.toUpperCase(); 

      if (restaurantName.includes(input) || restaurantCity.includes(input) || restaurantGenre.includes(input)) {
        resultsArray.push(restaurants[i]);
      }
    }

    return resultsArray; 
  }

  resetFilters(event) {
    event.preventDefault();
    window.location.reload(true);
  }

  onInputChange(event) {
    if (event.target.value === '') {
      this.resetFilters(event);
    } else {
      this.setState({
        input: event.target.value
      }); 
    }
  }

  pressedEnter (event) {
    if (event.key === 'Enter') {
      this.onSubmit();
    }
  }

  onSubmit() {
    event.preventDefault();

    let trimInput = this.state.input.trim(); 
    let searchInput = trimInput.toUpperCase(); 
    let results = this.filterByInput(searchInput);

    if (results.length > 0) {
      this.props.diplayFilteredRestaurants(results); 
    } else {
      this.props.handleNoRestaurantsFound();
    }
  }
  
  render() {
    return (
      <div className="search-form">
        <div className="search-input">
          <input
            type="text"
            placeholder="search by name, city, or genre"
            name={this.state.input}
            onInput={this.onInputChange}
            onKeyPress={this.pressedEnter}
          />
        </div>
        <button onClick={this.onSubmit}>Search</button>
      </div>
    );
  }
}

export default SearchField; 

