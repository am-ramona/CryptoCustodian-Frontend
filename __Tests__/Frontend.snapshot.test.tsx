// @no-check

import React from 'react';
import renderer, { create } from 'react-test-renderer';
import {describe, expect, test, it} from '@jest/globals';
import Header from '../src/app/ui/Header';
import Footer from '../src/app/ui/Footer';
import Navigation from '../src/app/ui/Nav';

describe('Header Component Snapshot', () => {
  it('should match the snapshot', () => {
    const tree = renderer.create(<Header />).toJSON();
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
      const tree = create(<Navigation show={true} setter={() => {}} windowSize={{ width: 1024, height: 768 }} />).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
