import { render, screen } from '@testing-library/react';
import App from './App';

test('renders hero greeting', () => {
  render(<App />);
  const greeting = screen.getByText(/hi, my name is/i);
  expect(greeting).toBeInTheDocument();
});

test('renders navigation links', () => {
  render(<App />);
  expect(screen.getByText(/about/i)).toBeInTheDocument();
  expect(screen.getByText(/projects/i)).toBeInTheDocument();
  expect(screen.getByText(/contact/i)).toBeInTheDocument();
});

test('renders hero name', () => {
  render(<App />);
  expect(screen.getByText(/your name/i)).toBeInTheDocument();
});
