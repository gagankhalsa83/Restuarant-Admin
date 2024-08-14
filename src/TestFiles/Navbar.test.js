import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect'; // for extended matchers
import Navbar from '../components/Navbar';

// Helper function to render the Navbar component with MemoryRouter
const renderWithRouter = (ui) => {
  return render(
    <MemoryRouter>
      {ui}
    </MemoryRouter>
  );
};

describe('Navbar Component', () => {
  it('renders the Navbar component', () => {
    renderWithRouter(<Navbar />);
    // Check if the Navbar is rendered
    expect(screen.getByRole('banner')).toBeInTheDocument(); // Using `role="banner"` to select the <nav> element
  });

  it('displays the correct title', () => {
    renderWithRouter(<Navbar />);
    // Check if the title "Restaurant Admin" is present
    expect(screen.getByText(/Restaurant Admin/i)).toBeInTheDocument();
  });

  it('renders the Home link', () => {
    renderWithRouter(<Navbar />);
    // Check if the Home link is present and has the correct path
    const homeLink = screen.getByText(/Home/i);
    expect(homeLink).toBeInTheDocument();
    expect(homeLink.getAttribute('href')).toBe('/');
  });

  it('renders the Add Restaurant link', () => {
    renderWithRouter(<Navbar />);
    // Check if the Add Restaurant link is present and has the correct path
    const addLink = screen.getByText(/Add Restaurant/i);
    expect(addLink).toBeInTheDocument();
    expect(addLink.getAttribute('href')).toBe('/add');
  });
});
