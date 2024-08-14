import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import restaurantReducer from '../redux/restaurantSlice'; // Adjust the import path as needed
import '@testing-library/jest-dom/extend-expect'; // for extended matchers
import RestaurantCard from '../components/RestaurantCard';

// Mock the alert function
global.alert = jest.fn();

// Set up a basic Redux store with the restaurant slice
const store = configureStore({
  reducer: {
    restaurants: restaurantReducer,
  },
});

// Sample restaurant data for testing
const sampleRestaurant = {
  id: 1,
  name: 'Test Restaurant',
  description: 'A sample restaurant for testing.',
  location: 'Test Location',
};

describe('RestaurantCard Component', () => {
  it('renders restaurant details', () => {
    render(
      <Provider store={store}>
        <RestaurantCard restaurant={sampleRestaurant} />
      </Provider>
    );

    // Check if the restaurant details are rendered
    expect(screen.getByText(/Test Restaurant/i)).toBeInTheDocument();
    expect(screen.getByText(/A sample restaurant for testing./i)).toBeInTheDocument();
    expect(screen.getByText(/Test Location/i)).toBeInTheDocument();
  });

  it('renders the Edit link with correct path', () => {
    render(
      <Provider store={store}>
        <RestaurantCard restaurant={sampleRestaurant} />
      </Provider>
    );

    // Check if the Edit link is rendered and has the correct path
    const editLink = screen.getByText(/Edit/i);
    expect(editLink).toBeInTheDocument();
    expect(editLink.getAttribute('href')).toBe('/edit/1');
  });

  it('dispatches delete action and shows alert on button click', () => {
    // Mock the deleteRestaurant action
    const mockDispatch = jest.fn();
    jest.mock('react-redux', () => ({
      useDispatch: () => mockDispatch,
    }));

    render(
      <Provider store={store}>
        <RestaurantCard restaurant={sampleRestaurant} />
      </Provider>
    );

    // Click the delete button
    fireEvent.click(screen.getByText(/Delete/i));

    // Check if the delete action is dispatched with correct restaurant ID
    expect(mockDispatch).toHaveBeenCalledWith(deleteRestaurant(1));

    // Check if alert is called with success message
    expect(global.alert).toHaveBeenCalledWith('Restaurant deleted successfully!');
  });
});
