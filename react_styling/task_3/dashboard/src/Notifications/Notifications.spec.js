import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import Notifications from './Notifications';
import { getLatestNotification } from "../utils/utils";

const mockNotifications = [
    {
        id: 1,
        type: "default",
        value: "New course available"
    },
    {
        id: 2,
        type: "urgent",
        value: "New resume available"
    },
    {
        id: 3,
        type: "urgent",
        value: getLatestNotification()
    }
];

let consoleSpy;

beforeEach(() => {
    consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => { });
});

afterEach(() => {
    consoleSpy.mockRestore();
    cleanup();
});

test('Renders 3 notification items with appropriate text', () => {
    const { getByText, container } = render(
        <Notifications
            displayDrawer={true}
            notifications={mockNotifications}
        />
    );

    expect(getByText('New course available')).toBeInTheDocument();
    expect(getByText('New resume available')).toBeInTheDocument();
    expect(container.querySelectorAll('li')).toHaveLength(3);
});

test('Renders with empty notifications array by default', () => {
    const { container } = render(<Notifications notifications={[]} />);
    expect(container.querySelectorAll('li')).toHaveLength(0);
});

test('Always displays "Your notifications" title', () => {
    const { getByText } = render(<Notifications />);
    expect(getByText('Your notifications')).toBeInTheDocument();
});

test('Does not display drawer elements when displayDrawer is false', () => {
    const { queryByText, queryByRole, container, getByText } = render(
        <Notifications displayDrawer={false} notifications={mockNotifications} />
    );

    expect(getByText('Your notifications')).toBeInTheDocument();
    expect(queryByText('Here is the list of notifications')).not.toBeInTheDocument();
    expect(container.querySelectorAll('li')).toHaveLength(0);
    expect(queryByRole('button', { name: /close/i })).not.toBeInTheDocument();
});

test('Displays list, paragraph and close button when displayDrawer is true', () => {
    const { getByText, getByRole, container } = render(
        <Notifications displayDrawer={true} notifications={mockNotifications} />
    );

    expect(getByText('Your notifications')).toBeInTheDocument();
    expect(getByText('Here is the list of notifications')).toBeInTheDocument();
    expect(container.querySelectorAll('li')).toHaveLength(3);
    expect(getByRole('button', { name: /close/i })).toBeInTheDocument();
});

test('Displays "No new notification for now" when displayDrawer is true and no notifications', () => {
    const { getByText, queryByRole, queryAllByRole } = render(
        <Notifications displayDrawer={true} notifications={[]} />
    );

    expect(getByText('Your notifications')).toBeInTheDocument();
    expect(getByText('No new notification for now')).toBeInTheDocument();
    expect(queryAllByRole('listitem')).toHaveLength(0);
    expect(queryByRole('button', { name: /close/i })).not.toBeInTheDocument();
});

test('Logs correct message when clicking on first notification item', () => {
    const { getByText } = render(
        <Notifications
            displayDrawer={true}
            notifications={mockNotifications}
        />
    );

    fireEvent.click(getByText('New course available'));
    expect(consoleSpy).toHaveBeenCalledWith('Notification 1 has been marked as read');
});

test('Logs correct message when clicking on second notification item', () => {
    const { getByText } = render(
        <Notifications
            displayDrawer={true}
            notifications={mockNotifications}
        />
    );

    fireEvent.click(getByText('New resume available'));
    expect(consoleSpy).toHaveBeenCalledWith('Notification 2 has been marked as read');
});

test('Logs correct message when clicking on third notification item', () => {
    const { container } = render(
        <Notifications
            displayDrawer={true}
            notifications={mockNotifications}
        />
    );

    fireEvent.click(container.querySelectorAll('li')[2]);
    expect(consoleSpy).toHaveBeenCalledWith('Notification 3 has been marked as read');
});
