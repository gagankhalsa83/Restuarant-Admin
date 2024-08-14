import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteRestaurant } from '../redux/actions';
import { Link } from 'react-router-dom';

function RestaurantCard({ restaurant }) {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteRestaurant(restaurant.id));
    alert('Restaurant deleted successfully!');
  };

  return (
    <div className="restaurant-card">
      <h3>{restaurant.name}</h3>
      <p>{restaurant.description}</p>
      <p>{restaurant.location}</p>
      <div className="actions">
        <Link to={`/edit/${restaurant.id}`}>Edit</Link>
        <button onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
}

export default RestaurantCard;
