import React from 'react';
import GenreFilterOptions from './GenreFilterOptions.jsx';

const GenreFilter = props => {
  

  const onDropdownChange = event => {
    
    event.preventDefault();
    props.selectedGenre(event.target.value);
  }; 

  return (
    <div>
      <label htmlFor="filterByGenre">Genre</label>
      <GenreFilterOptions
        genre={event.target.value}
        onDropdownChange={onDropdownChange}
        restaurantData={props.restaurantData}
      />
    </div>
  );

};

export default GenreFilter;
