import React from 'react';
import { create } from 'react-test-renderer';
import Header from '../src/app/ui/Header';
import Footer from '../src/app/ui/Footer';
import Navigation from '../src/app/ui/Nav';

describe('Header Component Snapshot', () => {
  test('matches the snapshot', () => {
    const tree = create(<Header />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe('Footer Component', () => {
    test('matches the snapshot', () => {
      const tree = create(<Footer />).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  describe('Navigation Snapshot', () => {
    test('matches the snapshot', () => {
      const tree = create(<Navigation show={true} setter={() => {}} />).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
  
  
  
