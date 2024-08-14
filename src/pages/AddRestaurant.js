import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addRestaurant } from '../redux/actions'; // Import the action
import RestaurantForm from '../components/RestaurantForm';
import { useNavigate } from 'react-router-dom';

function AddRestaurant() {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    name: '',
    description: '',
    location: '',
  });

  const dispatch = useDispatch(); // Initialize useDispatch

  const handleSubmit = (values) => {
    const newRestaurant = {
      id: Date.now(), // Use Date.now() or another unique ID generator
      ...values,
    };
    console.log("new restaurant-->", newRestaurant)
    dispatch(addRestaurant(newRestaurant)); // Dispatch the addRestaurant action
    alert('Restaurant added successfully!');
    navigate('/');
  };

  return (
    <div className="add-restaurant">
      <h2>Add Restaurant</h2>
      <RestaurantForm initialValues={formValues} onSubmit={handleSubmit} />
    </div>
  );
}

export default AddRestaurant;
