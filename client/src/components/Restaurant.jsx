import React from 'react';

const Restaurant = props => (
  <li>
    {props.name}
    {props.city}
    {props.state}
    {props.phoneNumber}
    {props.genre}
  </li>
);

export default Restaurant;
