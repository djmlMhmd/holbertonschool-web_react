import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from './Footer';

test('renders correct text content in p elements', () => {
    render(<Footer />);

    const footerParagraph = screen.getByText(
        /copyright .*holberton school/i
    );

    expect(footerParagraph).toBeInTheDocument();
});
