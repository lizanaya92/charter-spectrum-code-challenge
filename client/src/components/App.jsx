import React from 'react';
import RestaurantList from './RestaurantList.jsx';
import Filters from './Filters.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurants: [],
      noRestaurantsFound: false,
      currentPage: 1,
      restaurantsPerPage: 10,
    };

    this.diplayAllRestaurants = this.diplayAllRestaurants.bind(this);
    this.sortRestaurants = this.sortRestaurants.bind(this);
    this.diplayFilteredRestaurants = this.diplayFilteredRestaurants.bind(this);
    this.handleNoRestaurantsFound = this.handleNoRestaurantsFound.bind(this);
    this.pageNumberClick = this.pageNumberClick.bind(this);
  }

  componentDidMount() {
    this.diplayAllRestaurants();
  }

  sortRestaurants(a, b) {
    const restaurantA = a.name.toLowerCase();
    const restaurantB = b.name.toLowerCase();

    let alphabeticalComperison = 0;
    if (restaurantA > restaurantB) {
      alphabeticalComperison = 1;
    } else if (restaurantA < restaurantB) {
      alphabeticalComperison = -1;
    }
    return alphabeticalComperison;
  }

  diplayAllRestaurants() {
    fetch('https://findeatz.herokuapp.com/api/restaurants')
      .then(res => res.json())
      .then(data => {
        this.setState({
          restaurants: data.results.sort(this.sortRestaurants),
        });
      })
      .catch(error => {
        if (error) {
          console.log('Encountered error fetching restaurants:', error);
        }
      });
  }

  diplayFilteredRestaurants(data) {
    this.setState({
      restaurants: data,
    });
  }

  handleNoRestaurantsFound() {
    this.setState({
      noRestaurantsFound: true,
    });
  }

  pageNumberClick(event) {
    this.setState({
      currentPage: Number(event.target.id),
    });
  }

  render() {
    return (
      <div>
        <div id="wrap-image">
          <img
            src="homePagePicture.png"
            alt="people dinning"
            id="home-page-image"
          />
        </div>
        <h1 className="header">FindEatz</h1>
        <Filters
          restaurantData={this.state.restaurants}
          diplayFilteredRestaurants={this.diplayFilteredRestaurants}
          handleNoRestaurantsFound={this.handleNoRestaurantsFound}
        />
        <RestaurantList
          restaurants={this.state.restaurants}
          currentPage={this.state.currentPage}
          restaurantsPerPage={this.state.restaurantsPerPage}
          noRestaurantsFound={this.state.noRestaurantsFound}
          pageNumberClick={this.pageNumberClick}
        />
      </div>
    );
  }
}

export default App;
