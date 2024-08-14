export const ADD_RESTAURANT = 'ADD_RESTAURANT';
export const UPDATE_RESTAURANT = 'UPDATE_RESTAURANT';
export const DELETE_RESTAURANT = 'DELETE_RESTAURANT';

export const addRestaurant = (restaurant) => ({
  type: ADD_RESTAURANT,
  payload: restaurant,
});

export const updateRestaurant = (restaurant) => ({
  type: UPDATE_RESTAURANT,
  payload: restaurant,
});

export const deleteRestaurant = (id) => ({
  type: DELETE_RESTAURANT,
  payload: id,
});
