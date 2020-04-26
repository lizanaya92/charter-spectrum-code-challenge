import React from 'react';
import GenreFilterOptions from './GenreFilterOptions.jsx';

class GenreFilter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      genre: '',
    };
    this.findAllGenres = this.findAllGenres.bind(this);
    this.onDropdownChange = this.onDropdownChange.bind(this);
  }

  findAllGenres(array) {
    const genres = [];
    for (let i = 0; i < array.length; i++) {
      const genreString = array[i].genre;
      const genreArray = genreString.split(',');
      for (let j = 0; j < genreArray.length; j++) {
        if (genres.indexOf(genreArray[j]) === -1) {
          genres.push(genreArray[j]);
        }
      }
    }
    genres.sort();
    return genres;
  }

  onDropdownChange(event) {
    event.preventDefault();
    console.log('here is the event', event.target.value);
    this.setState(
      {
        genre: event.target.value,
      },
      this.props.selectedGenre(event.target.value)
    );
  }

  render() {
    return (
      <div>
        <label htmlFor="filterByGenre">Genre</label>
        <GenreFilterOptions
          genre={this.state.genre}
          onDropdownChange={this.onDropdownChange}
          findAllGenres={this.findAllGenres}
          restaurantData={this.props.restaurantData}
        />
      </div>
    );
  }
}

export default GenreFilter;
