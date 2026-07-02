import { render, screen } from '@testing-library/react';
import Login from './Login';

describe('Login component', () => {
    it('renders the login text', () => {
        render(<Login />);
        expect(screen.getByText(/login to access the full dashboard/i)).toBeInTheDocument();
    });

    it('renders 2 inputs and 2 labels', () => {
        render(<Login />);
        expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    });

    it('renders a button with the text OK', () => {
        render(<Login />);
        expect(screen.getByRole('button', { name: /ok/i })).toBeInTheDocument();
    });
});
