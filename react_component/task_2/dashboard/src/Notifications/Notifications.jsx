import { Component } from 'react';
import NotificationItem from './NotificationItem';
import closeButton from '../assets/close-button.png';
import './Notifications.css';

class Notifications extends Component {
    markAsRead = (id) => {
        console.log(`Notification ${id} has been marked as read`);
    };

    handleClose = () => {
        console.log('Close button has been clicked');
    };

    render() {
        const { notifications = [], displayDrawer = true } = this.props;

        return (
            <div className="Notifications-container">
                <div className="menuItem">
                    <p>Your notifications</p>
                </div>

                {displayDrawer && (
                    <div className="Notifications">
                        <button
                            style={{
                                display: 'flex',
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                position: 'absolute',
                                right: '10px',
                                top: '10px',
                            }}
                            aria-label="Close"
                            onClick={this.handleClose}
                        >
                            <img style={{ width: '15px' }} src={closeButton} alt="close" />
                        </button>

                        <p>Here is the list of notifications</p>

                        <ul>
                            {notifications.length === 0 && (
                                <NotificationItem value="No new notification for now" />
                            )}

                            {notifications.map((notification) => (
                                <NotificationItem
                                    key={notification.id}
                                    id={notification.id}
                                    type={notification.type}
                                    value={notification.value}
                                    html={notification.html}
                                    markAsRead={this.markAsRead}
                                />
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        );
    }
}

export default Notifications;
