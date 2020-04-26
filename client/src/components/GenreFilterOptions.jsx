import React from 'react';

const GenreFilterOptions = props => {
  
  const findAllGenres = array => {
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
    genres.unshift('Select Genre'); 
    return genres;
  };

  const allGenres = findAllGenres(props.restaurantData);

  const GenreOptions = allGenres.map(genre => (
    <option value={genre}>{genre}</option>
  ));

  return (
    <select
      name="dropDownOptions"
      value={props.genre}
      onChange={props.onDropdownChange}
    >
      {GenreOptions}
    </select>
  );
};

export default GenreFilterOptions;
