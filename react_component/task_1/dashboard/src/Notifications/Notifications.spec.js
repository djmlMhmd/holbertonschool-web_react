import { render, screen } from '@testing-library/react';
import Notifications from './Notifications';
import { getLatestNotification } from '../utils/utils';

const notificationsList = [
    { id: 1, type: 'default', value: 'New course available' },
    { id: 2, type: 'urgent', value: 'New resume available' },
    { id: 3, type: 'urgent', html: getLatestNotification() },
];

describe('Notifications component', () => {
    it('renders the notifications title', () => {
        render(<Notifications notifications={notificationsList} />);
        expect(screen.getByText(/your notifications/i)).toBeInTheDocument();
    });

    it('renders the text Here is the list of notifications', () => {
        render(<Notifications notifications={notificationsList} />);
        expect(screen.getByText(/here is the list of notifications/i)).toBeInTheDocument();
    });

    it('renders 3 notification items', () => {
        render(<Notifications notifications={notificationsList} />);
        expect(screen.getAllByRole('listitem')).toHaveLength(3);
    });

    it('renders No new notification for now when the list is empty', () => {
        render(<Notifications notifications={[]} />);
        expect(screen.getByText(/no new notification for now/i)).toBeInTheDocument();
    });

    it('renders a close button', () => {
        render(<Notifications notifications={notificationsList} />);
        expect(screen.getByRole('button', { name: /close/i })).toBeInTheDocument();
    });

    it('does not render the drawer when displayDrawer is false', () => {
        render(<Notifications notifications={notificationsList} displayDrawer={false} />);
        expect(screen.queryByText(/here is the list of notifications/i)).not.toBeInTheDocument();
    });
});
