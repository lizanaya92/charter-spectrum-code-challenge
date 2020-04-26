import React from 'react';

const GenreFilterOptions = props => {
  const allGenres = props.findAllGenres(props.restaurantData);

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
