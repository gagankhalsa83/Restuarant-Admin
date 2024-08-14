import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import RestaurantList from '../components/RestaurantList';
import { addRestaurant } from '../redux/actions';

function Home() {
  const restaurants = useSelector((state) => state.restaurants);
  const dispatch = useDispatch();

  const handleAddRestaurant = (newRestaurant) => {
    dispatch(addRestaurant(newRestaurant));
  };

  return (
    <div className="home">
      <RestaurantList  />
    </div>
  );
}

export default Home;
