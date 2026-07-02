import NotificationItem from './NotificationItem';
import closeButton from '../assets/close-button.png';
import './Notifications.css';

function Notifications({ notifications = [], displayDrawer = true }) {
    const handleClose = () => {
        console.log('Close button has been clicked');
    };

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
                        onClick={handleClose}
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
                                type={notification.type}
                                value={notification.value}
                                html={notification.html}
                            />
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default Notifications;
