import { render, screen } from '@testing-library/react';
import Footer from './Footer';

describe('Footer component', () => {
    it('renders the copyright text with the current year', () => {
        render(<Footer />);
        const currentYear = new Date().getFullYear();
        expect(
            screen.getByText(`Copyright ${currentYear} - Holberton School`)
        ).toBeInTheDocument();
    });
});
