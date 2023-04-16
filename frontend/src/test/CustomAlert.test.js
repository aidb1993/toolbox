import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CustomAlert from '../components/CustomAlert';
import '@testing-library/jest-dom/extend-expect';

describe('CustomAlert component', () => {
  it('renders an alert with the given message and variant', () => {
    const variant = 'success';
    const message = 'This is a success message.';
    render(<CustomAlert variant={variant} message={message} />);
    const alert = screen.getByRole('alert');
    expect(alert).toHaveTextContent(message);
    expect(alert).toHaveClass(`alert-${variant}`);
  });

  it('disappears when the close button is clicked', () => {
    const variant = 'danger';
    const message = 'This is a danger message.';
    render(<CustomAlert variant={variant} message={message} />);
    const closeButton = screen.getByRole('button', { name: /close/i });
    fireEvent.click(closeButton);
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });
});
