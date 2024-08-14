import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { BrowserRouter as Router, MemoryRouter } from 'react-router-dom';
import { addRestaurant } from '../redux/actions'; // Adjust the import path as needed
import restaurantReducer from '../redux/restaurantSlice'; // Adjust the import path as needed
import '@testing-library/jest-dom/extend-expect'; // for extended matchers
import AddRestaurant from '../pages/AddRestaurant';

// Mock the alert function
global.alert = jest.fn();

// Set up a basic Redux store with the restaurant slice
const store = configureStore({
  reducer: {
    restaurants: restaurantReducer,
  },
});

// Mock the useNavigate function
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('AddRestaurant Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the form', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <AddRestaurant />
        </MemoryRouter>
      </Provider>
    );

    // Check if the form is rendered
    expect(screen.getByText(/Add Restaurant/i)).toBeInTheDocument();
  });

  it('dispatches addRestaurant action and shows alert on form submit', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <AddRestaurant />
        </MemoryRouter>
      </Provider>
    );

    // Fill out the form fields
    fireEvent.change(screen.getByLabelText(/Name:/i), { target: { value: 'New Restaurant' } });
    fireEvent.change(screen.getByLabelText(/Description:/i), { target: { value: 'A great place to eat' } });
    fireEvent.change(screen.getByLabelText(/Location:/i), { target: { value: 'Downtown' } });

    // Submit the form
    fireEvent.click(screen.getByText(/Submit/i));

    // Check if the addRestaurant action is dispatched with correct data
    expect(store.getActions()).toContainEqual(
      addRestaurant({
        id: expect.any(Number), // Since we're using Date.now() or similar, this will be any number
        name: 'New Restaurant',
        description: 'A great place to eat',
        location: 'Downtown',
      })
    );

    // Check if alert is called with the success message
    expect(global.alert).toHaveBeenCalledWith('Restaurant added successfully!');

    // Check if navigate is called to redirect to the home page
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });
});
