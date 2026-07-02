import { render, screen } from '@testing-library/react';
import NotificationItem from './NotificationItem';

describe('NotificationItem component', () => {
    it('renders a li with the correct value and type', () => {
        render(<NotificationItem type="default" value="New course available" />);
        const li = screen.getByText('New course available');
        expect(li).toBeInTheDocument();
        expect(li).toHaveAttribute('data-notification-type', 'default');
    });

    it('renders the html content when the html prop is set', () => {
        render(<NotificationItem type="urgent" html="<u>test</u>" />);
        const li = screen.getByRole('listitem');
        expect(li).toHaveAttribute('data-notification-type', 'urgent');
        expect(li.innerHTML).toContain('<u>test</u>');
    });
});
