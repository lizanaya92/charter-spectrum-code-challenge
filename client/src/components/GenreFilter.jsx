import React from 'react';
import GenreFilterOptions from './GenreFilterOptions.jsx';

const GenreFilter = props => {
  const onDropdownChange = event => {
    event.preventDefault();
    props.selectedGenre(event.target.value);
  };

  return (
    <div>
      <label className="filter-button-label">Genre</label>
      <GenreFilterOptions
        onDropdownChange={onDropdownChange}
        restaurantData={props.restaurantData}
      />
    </div>
  );
};

export default GenreFilter;
