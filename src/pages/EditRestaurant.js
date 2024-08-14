import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { updateRestaurant } from '../redux/actions';
import RestaurantForm from '../components/RestaurantForm';

function EditRestaurant() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const restaurants = useSelector((state) => state.restaurants);
  const [formValues, setFormValues] = useState(null);

  useEffect(() => {
    const restaurant = restaurants.find((r) => r.id === parseInt(id));
    if (restaurant) {
      setFormValues(restaurant);
    }
  }, [id, restaurants]);

  const handleSubmit = (values) => {
    dispatch(updateRestaurant({ id: parseInt(id), ...values }));
    alert('Restaurant updated successfully!');
    navigate('/');
  };

  return (
    <div className="edit-restaurant">
      <h2>Edit Restaurant</h2>
      {formValues ? <RestaurantForm initialValues={formValues} onSubmit={handleSubmit} /> : <p>Loading...</p>}
    </div>
  );
}

export default EditRestaurant;
