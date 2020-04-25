import React from 'react';

const Restaurant = props => (
  <li>
    {props.name}
    {props.city}
    {props.phoneNumber}
    {props.genre}
  </li>
);

export default Restaurant;
