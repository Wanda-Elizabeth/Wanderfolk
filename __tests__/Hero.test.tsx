import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Hero from '@/components/Hero';

describe('Hero Component', () => {
  it('renders the headline', () => {
    render(<Hero />);
    expect(screen.getByText(/meet people/i)).toBeInTheDocument();
  });

  it('renders the subheadline', () => {
    render(<Hero />);
    expect(screen.getByText(/genuine friendships/i)).toBeInTheDocument();
  });

  it('renders both CTA buttons', () => {
    render(<Hero />);
    expect(screen.getByRole('button', { name: /would you use this/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /tell us what you're looking for/i })).toBeInTheDocument();
  });

  it('opens validation modal on primary CTA click', async () => {
    const user = userEvent.setup();
    render(<Hero />);

    const primaryButton = screen.getByRole('button', { name: /would you use this/i });
    await user.click(primaryButton);

    // Modal should be visible
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });
});
