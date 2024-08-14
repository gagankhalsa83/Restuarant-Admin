import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'; // Use MemoryRouter for routing in tests
import App from './App';
import '@testing-library/jest-dom/extend-expect'; // for extended matchers

// Helper function to render the App component with MemoryRouter
const renderWithRouter = (ui, { route = '/' } = {}) => {
  return render(
    <MemoryRouter initialEntries={[route]}>
      {ui}
    </MemoryRouter>
  );
};

describe('App Component', () => {
  it('renders the Navbar component', () => {
    renderWithRouter(<App />);
    expect(screen.getByRole('navigation')).toBeInTheDocument(); // Assuming Navbar uses <nav> or similar role
  });

  it('renders the Home page at the root path', async () => {
    renderWithRouter(<App />, { route: '/' });
    expect(await screen.findByText(/Home Page/i)).toBeInTheDocument(); // Adjust text to what you expect in Home page
  });

  it('renders the AddRestaurant page at /add path', async () => {
    renderWithRouter(<App />, { route: '/add' });
    expect(await screen.findByText(/Add Restaurant/i)).toBeInTheDocument(); // Adjust text to what you expect in AddRestaurant page
  });

  it('renders the EditRestaurant page at /edit/:id path', async () => {
    renderWithRouter(<App />, { route: '/edit/1' });
    expect(await screen.findByText(/Edit Restaurant/i)).toBeInTheDocument(); // Adjust text to what you expect in EditRestaurant page
  });
});
