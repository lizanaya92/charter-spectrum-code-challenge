import React from 'react';
import RestaurantList from './RestaurantList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurants: [
        {
          id: 'f223fdd0-4adc-423e-9747-980a66c256ca',
        },
      ],
    };

    this.diplayAllRestaurants = this.diplayAllRestaurants.bind(this);
  }

  componentDidMount() {
    this.diplayAllRestaurants();
  }

  diplayAllRestaurants() {
    fetch('http://localhost:3000/api/restaurants')
      .then(res => res.json())
      .then(data => {
        console.log('DATA:', data.results);
        this.setState({
          restaurants: data.results,
        });
        console.log('Here is the state', this.state.restaurants);
      })
      .catch(error => {
        if (error) {
          console.log('Encountered error fetching restaurants:', error);
        }
      });
  }

  render() {
    return (
      <div>
        <h1>FindEatz</h1>
        <RestaurantList restaurants={this.state.restaurants} />
      </div>
    );
  }
}

export default App;
