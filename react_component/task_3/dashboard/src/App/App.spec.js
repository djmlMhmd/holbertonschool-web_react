import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
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

    it('calls the logOut prop once when ctrl and h keys are pressed', () => {
        const logOut = jest.fn();
        const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});

        render(<App logOut={logOut} />);
        fireEvent.keyDown(document, { key: 'h', ctrlKey: true });

        expect(logOut).toHaveBeenCalledTimes(1);

        alertSpy.mockRestore();
    });

    it('calls alert with the string Logging you out when ctrl and h keys are pressed', () => {
        const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});

        render(<App />);
        fireEvent.keyDown(document, { key: 'h', ctrlKey: true });

        expect(alertSpy).toHaveBeenCalledWith('Logging you out');

        alertSpy.mockRestore();
    });

    it('removes the keydown event listener when the component is unmounted', () => {
        const logOut = jest.fn();
        const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});

        const { unmount } = render(<App logOut={logOut} />);
        unmount();
        fireEvent.keyDown(document, { key: 'h', ctrlKey: true });

        expect(logOut).not.toHaveBeenCalled();
        expect(alertSpy).not.toHaveBeenCalled();

        alertSpy.mockRestore();
    });
});
