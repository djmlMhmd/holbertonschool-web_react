import { render, screen } from '@testing-library/react';
import Header from './Header';

describe('Header component', () => {
    it('renders the holberton logo', () => {
        render(<Header />);
        expect(screen.getByAltText(/holberton logo/i)).toBeInTheDocument();
    });

    it('renders the h1 heading School dashboard', () => {
        render(<Header />);
        expect(
            screen.getByRole('heading', { level: 1, name: /school dashboard/i })
        ).toBeInTheDocument();
    });
});
