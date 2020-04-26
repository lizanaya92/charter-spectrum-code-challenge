import React from 'react';
import Restaurant from './Restaurant.jsx';

const RestaurantList = props => {
  if (props.noRestaurantsFound === true) {
    return <h3>Sorry! No restaurants were found with the applied filters.</h3>;
  }
  const RestaurantComponent = props.restaurants.map(restaurant => (
    <Restaurant
      key={restaurant.id}
      name={restaurant.name}
      city={restaurant.city}
      state={restaurant.state}
      phoneNumber={restaurant.telephone}
      genre={restaurant.genre}
    />
  ));

  return <ul>{RestaurantComponent}</ul>;
};

export default RestaurantList;
