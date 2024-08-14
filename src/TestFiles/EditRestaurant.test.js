import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { BrowserRouter as Router, MemoryRouter } from 'react-router-dom';
import { updateRestaurant } from '../redux/actions'; // Adjust the import path as needed
import restaurantReducer from '../redux/restaurantSlice'; // Adjust the import path as needed
import EditRestaurant from './EditRestaurant';
import '@testing-library/jest-dom/extend-expect'; // for extended matchers

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
  useParams: () => ({ id: '1' }), // Mocking useParams with a sample id
}));

describe('EditRestaurant Component', () => {
  const restaurant = {
    id: 1,
    name: 'Test Restaurant',
    description: 'A sample description',
    location: 'Test Location',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the form with existing values', async () => {
    // Set the initial state for the store
    store.getState().restaurants = [restaurant];

    render(
      <Provider store={store}>
        <MemoryRouter>
          <EditRestaurant />
        </MemoryRouter>
      </Provider>
    );

    // Ensure the component shows loading initially
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();

    // Wait for form to load with initial values
    await waitFor(() => {
      expect(screen.getByLabelText(/Name:/i).value).toBe(restaurant.name);
      expect(screen.getByLabelText(/Description:/i).value).toBe(restaurant.description);
      expect(screen.getByLabelText(/Location:/i).value).toBe(restaurant.location);
    });
  });

  it('dispatches updateRestaurant action and shows alert on form submit', async () => {
    // Set the initial state for the store
    store.getState().restaurants = [restaurant];

    render(
      <Provider store={store}>
        <MemoryRouter>
          <EditRestaurant />
        </MemoryRouter>
      </Provider>
    );

    // Wait for form to load with initial values
    await waitFor(() => {
      fireEvent.change(screen.getByLabelText(/Name:/i), { target: { value: 'Updated Name' } });
      fireEvent.change(screen.getByLabelText(/Description:/i), { target: { value: 'Updated Description' } });
      fireEvent.change(screen.getByLabelText(/Location:/i), { target: { value: 'Updated Location' } });

      // Submit the form
      fireEvent.click(screen.getByText(/Submit/i));

      // Check if updateRestaurant action is dispatched with correct data
      expect(store.getActions()).toContainEqual(
        updateRestaurant({
          id: 1,
          name: 'Updated Name',
          description: 'Updated Description',
          location: 'Updated Location',
        })
      );

      // Check if alert is called with the success message
      expect(global.alert).toHaveBeenCalledWith('Restaurant updated successfully!');

      // Check if navigate is called to redirect to the home page
      expect(mockNavigate).toHaveBeenCalledWith('/');
    });
  });
});
