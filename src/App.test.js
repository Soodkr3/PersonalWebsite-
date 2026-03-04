import { render, screen } from '@testing-library/react';
import App from './App';

test('renders hero text', () => {
  render(<App />);
  const heroText = screen.getByText(/welcome to my universe/i);
  expect(heroText).toBeInTheDocument();
});

test('renders top-left name', () => {
  render(<App />);
  expect(screen.getByText(/krish/i)).toBeInTheDocument();
});
