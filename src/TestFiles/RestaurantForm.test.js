import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // for extended matchers
import RestaurantForm from '../components/RestaurantForm';

describe('RestaurantForm Component', () => {
  const mockOnSubmit = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders form with initial values', () => {
    const initialValues = {
      name: 'Test Restaurant',
      description: 'A sample description',
      location: 'Test Location',
    };

    render(<RestaurantForm initialValues={initialValues} onSubmit={mockOnSubmit} />);

    // Check if initial values are rendered in the form fields
    expect(screen.getByLabelText(/Name:/i).value).toBe('Test Restaurant');
    expect(screen.getByLabelText(/Description:/i).value).toBe('A sample description');
    expect(screen.getByLabelText(/Location:/i).value).toBe('Test Location');
  });

  it('updates input fields on change', () => {
    render(<RestaurantForm onSubmit={mockOnSubmit} />);

    // Simulate user input
    fireEvent.change(screen.getByLabelText(/Name:/i), { target: { value: 'New Name' } });
    fireEvent.change(screen.getByLabelText(/Description:/i), { target: { value: 'New Description' } });
    fireEvent.change(screen.getByLabelText(/Location:/i), { target: { value: 'New Location' } });

    // Verify that input fields have updated values
    expect(screen.getByLabelText(/Name:/i).value).toBe('New Name');
    expect(screen.getByLabelText(/Description:/i).value).toBe('New Description');
    expect(screen.getByLabelText(/Location:/i).value).toBe('New Location');
  });

  it('calls onSubmit with form values on submit', () => {
    const initialValues = {
      name: 'Test Restaurant',
      description: 'A sample description',
      location: 'Test Location',
    };

    render(<RestaurantForm initialValues={initialValues} onSubmit={mockOnSubmit} />);

    // Simulate user input
    fireEvent.change(screen.getByLabelText(/Name:/i), { target: { value: 'Updated Name' } });
    fireEvent.change(screen.getByLabelText(/Description:/i), { target: { value: 'Updated Description' } });
    fireEvent.change(screen.getByLabelText(/Location:/i), { target: { value: 'Updated Location' } });

    // Simulate form submission
    fireEvent.click(screen.getByText(/Submit/i));

    // Verify that onSubmit is called with the updated values
    expect(mockOnSubmit).toHaveBeenCalledWith({
      name: 'Updated Name',
      description: 'Updated Description',
      location: 'Updated Location',
    });
  });
});
