import React from 'react';
import { useSelector } from 'react-redux';
import RestaurantCard from './RestaurantCard';

function RestaurantList( ) {
    const restaurant = useSelector((state) => state.restaurants);
  return (
    <div className="restaurant-list">
      {restaurant.map(restaurant => (
        <RestaurantCard key={restaurant.id} restaurant={restaurant} />
      ))}
    </div>
  );
}

export default RestaurantList;
