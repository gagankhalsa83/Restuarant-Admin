import { ADD_RESTAURANT, UPDATE_RESTAURANT, DELETE_RESTAURANT } from './actions';

const initialState = {
  restaurants: [],
};

const restaurantReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_RESTAURANT:
        console.log('testing',state);

      return {
        ...state,
        restaurants: [...state.restaurants, action.payload],
      };
    case UPDATE_RESTAURANT:
      return {
        ...state,
        restaurants: state.restaurants.map((restaurant) =>
          restaurant.id === action.payload.id ? action.payload : restaurant
        ),
      };
    case DELETE_RESTAURANT:
      return {
        ...state,
        restaurants: state.restaurants.filter((restaurant) => restaurant.id !== action.payload),
      };
    default:
      return state;
  }
};

export default restaurantReducer;
