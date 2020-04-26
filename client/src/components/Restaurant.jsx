import React from 'react';

const Restaurant = props => (
  <tr>
    <td>{props.name}</td>
    <td>{props.city}</td>
    <td>{props.state}</td>
    <td>{props.phoneNumber}</td>
    <td>{props.genre}</td>
  </tr>
);

export default Restaurant;
