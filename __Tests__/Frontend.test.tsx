import React from 'react';
import { render, screen, fireEvent} from '@testing-library/react';
import Header from '../src/app/ui/Header';
import Footer from '../src/app/ui/Footer';
import Navigation from '../src/app/ui/Nav';
import NavigationMobile from '../src/app/ui/NavMobile';

describe('Header Component', () => {
  test('renders correctly', () => {
    render(<Header />);
    
    // Check if the header element is present in the document
    const headerElement = screen.getByRole('heading', { name: /Crypto Custodian/i });
    expect(headerElement).toBeInTheDocument();

    // Check if the Link component is present
    const linkElement = screen.getByRole('link', { name: /Crypto Custodian/i });
    expect(linkElement).toHaveAttribute('href', '/');
  });
});

describe('Footer Component', () => {
  test('renders correctly', () => {
    render(<Footer />);
    const footerText = screen.getByText(/© 2024 Crypto Custodian/i);
    expect(footerText).toBeInTheDocument();
  });
});

describe('Navigation Component', () => {

  describe('Navigation Component UI', () => {
    test('renders menu items on mobile with correct icons and links', () => {
      render(<NavigationMobile setter={() => {}} />);
      expect(screen.getByText('Dashboard')).toBeInTheDocument();
      expect(screen.getByText('Assets Overview')).toBeInTheDocument();
      expect(screen.getByText('Positions and Holdings')).toBeInTheDocument();
      expect(screen.getByText('APR and Performance Metrics')).toBeInTheDocument();
      expect(screen.getByText('Client Management')).toBeInTheDocument();
      expect(screen.getByText('Transaction and Compliance')).toBeInTheDocument();
    });
  });

  test('renders with show prop as true', () => {
    render(<Navigation show={true} setter={() => {}} />);
    const sidebar = screen.getByRole('navigation');
    expect(sidebar).toBeInTheDocument();
  });

  test('renders with show prop as false', () => {
    render(<Navigation show={false} setter={() => {}} />);
    const sidebar = screen.queryByRole('navigation');
    expect(sidebar).not.toBeInTheDocument();
  });

  describe('MenuItem Interaction', () => {
    test('clicking a menu item toggles the setter', () => {
      const setterMock = jest.fn();
      render(<Navigation show={true} setter={setterMock} />);
      const menuItem = screen.getByText('Dashboard');
      fireEvent.click(menuItem);
      expect(setterMock).toHaveBeenCalled();
    });
  });

  describe('ModalOverlay', () => {
    test('shows overlay when show prop is true', () => {
      render(<Navigation show={true} setter={() => {}} />);
      const overlay = screen.getByRole('dialog'); // Assuming overlay has a role of dialog
      expect(overlay).toBeInTheDocument();
    });
  });
});



