import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App component', () => {
    it('is a class component', () => {
        expect(App.prototype instanceof React.Component).toBe(true);
    });

    it('renders the Notifications title', () => {
        render(<App />);
        expect(screen.getByText(/your notifications/i)).toBeInTheDocument();
    });

    it('renders the h1 heading School dashboard', () => {
        render(<App />);
        expect(
            screen.getByRole('heading', { level: 1, name: /school dashboard/i })
        ).toBeInTheDocument();
    });

    it('renders the Login component by default', () => {
        render(<App />);
        expect(screen.getByText(/login to access the full dashboard/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /ok/i })).toBeInTheDocument();
    });

    it('renders the CourseList component when isLoggedIn is true', () => {
        render(<App isLoggedIn={true} />);
        expect(screen.getByRole('table')).toBeInTheDocument();
        expect(screen.queryByText(/login to access the full dashboard/i)).not.toBeInTheDocument();
    });

    it('renders the Footer copyright text', () => {
        render(<App />);
        expect(screen.getByText(/copyright \d{4} - holberton school/i)).toBeInTheDocument();
    });
});
