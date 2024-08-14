import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import restaurantReducer from '../redux/restaurantSlice'; // Adjust the import path as needed
import '@testing-library/jest-dom/extend-expect'; // for extended matchers
import RestaurantList from '../components/RestaurantList';

// Set up a basic Redux store with the restaurant slice
const store = configureStore({
  reducer: {
    restaurants: restaurantReducer,
  },
});

describe('RestaurantList Component', () => {
  const restaurants = [
    { id: 1, name: 'Restaurant One', description: 'Description One', location: 'Location One' },
    { id: 2, name: 'Restaurant Two', description: 'Description Two', location: 'Location Two' },
  ];

  it('renders without crashing', () => {
    render(
      <Provider store={store}>
        <RestaurantList />
      </Provider>
    );
    // Ensure the component renders without any errors
    expect(screen.getByText(/restaurant list/i)).toBeInTheDocument();
  });

  it('renders a list of restaurant cards', () => {
    // Set the initial state for the store
    store.getState().restaurants = restaurants;

    render(
      <Provider store={store}>
        <RestaurantList />
      </Provider>
    );

    // Check if the RestaurantCard components are rendered
    restaurants.forEach((restaurant) => {
      expect(screen.getByText(restaurant.name)).toBeInTheDocument();
      expect(screen.getByText(restaurant.description)).toBeInTheDocument();
      expect(screen.getByText(restaurant.location)).toBeInTheDocument();
    });
  });

  it('renders no restaurant cards when there are no restaurants', () => {
    // Set the initial state for the store with an empty array
    store.getState().restaurants = [];

    render(
      <Provider store={store}>
        <RestaurantList />
      </Provider>
    );

    // Check that no RestaurantCard components are rendered
    restaurants.forEach((restaurant) => {
      expect(screen.queryByText(restaurant.name)).not.toBeInTheDocument();
      expect(screen.queryByText(restaurant.description)).not.toBeInTheDocument();
      expect(screen.queryByText(restaurant.location)).not.toBeInTheDocument();
    });
  });
});

