import React from 'react';
import Restaurant from './Restaurant.jsx';

const RestaurantList = props => {
  const RestaurantComponent = props.restaurants.map(restaurant => (
    <Restaurant
      key={restaurant.id}
      name={restaurant.name}
      city={restaurant.city}
      phoneNumber={restaurant.telephone}
      genre={restaurant.genre}
    />
  ));

  return <ul>{RestaurantComponent}</ul>;
};

export default RestaurantList;
