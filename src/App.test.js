import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('Welcome', () => {
  render(<App />);
  const welcomeElement = screen.getByText('DevOps Capstone Project Demo');
  expect(welcomeElement).toBeInTheDocument();
});

test('renders description', () => {
  render(<App />);
  const descriptionElement = screen.getByText('Jenkins pipeline.');
  expect(descriptionElement).toBeInTheDocument();
});

test('renders result', () => {
  render(<App />);
  const descriptionElement = screen.getByText('Success');
  expect(descriptionElement).toBeInTheDocument();
});
