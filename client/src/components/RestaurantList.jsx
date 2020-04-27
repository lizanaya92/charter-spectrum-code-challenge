import React from 'react';
import Restaurant from './Restaurant.jsx';

const RestaurantList = props => {
  if (props.noRestaurantsFound === true) {
    return <h3>Sorry! No restaurants were found with the applied filters.</h3>;
  }

  const indexOfLastRestaurant = props.currentPage * props.restaurantsPerPage;
  const indexOfFirstRestaurant = indexOfLastRestaurant - props.restaurantsPerPage;
  const currentRestaurantsOnDisplay = props.restaurants.slice(indexOfFirstRestaurant, indexOfLastRestaurant); 

  const pageNumbers = []; 
  for (let i = 1; i <= Math.ceil(props.restaurants.length / props.restaurantsPerPage); i++) {
    pageNumbers.push(i);
  }

  const renderPageNumbers = pageNumbers.map(number => {
    return (
      <button
        className="page-number-button"
        key={number}
        id={number}
        onClick={props.pageNumberClick}
      >
        {number}
      </button>
    );
  });


  const RestaurantComponent = currentRestaurantsOnDisplay.map(restaurant => (
    <Restaurant
      key={restaurant.id}
      name={restaurant.name}
      city={restaurant.city}
      state={restaurant.state}
      phoneNumber={restaurant.telephone}
      genre={restaurant.genre}
    />
  ));

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>City</th>
            <th>State</th>
            <th>Phone Number</th>
            <th>Genre</th>
          </tr>
        </thead>
        <tbody>
          {RestaurantComponent}
        </tbody>
      </table>
      <ul id="page-numbers">
        {renderPageNumbers}
      </ul>
    </div>
  );
};

export default RestaurantList;
