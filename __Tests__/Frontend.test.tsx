// @no-check

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, test, it } from '@jest/globals';
import Header from '../src/app/ui/Header';
import Footer from '../src/app/ui/Footer';
import Navigation from '../src/app/ui/Nav';
// import { usePathname } from 'next/navigation';
// import '@testing-library/jest-dom/extend-expect'; // for the "toBeInTheDocument" matcher

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

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}));
describe('Navigation Component', () => {
  test('renders with show prop as false', () => {
    render(<Navigation show={false} setter={() => { }} windowSize={{ width: 1024, height: 768 }} />);
    const sidebar = screen.queryByRole('navigation');
    expect(sidebar).not.toBeInTheDocument();
  });

  test('renders with show prop as true', () => {
    render(<Navigation show={true} setter={() => { }} windowSize={{ width: 1024, height: 768 }} />);
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

});