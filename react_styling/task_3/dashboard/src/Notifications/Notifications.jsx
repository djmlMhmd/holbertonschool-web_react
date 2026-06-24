import React, { Component } from 'react';
import NotificationItem from './NotificationItem';
import closeButton from "../assets/close-button.png";

class Notifications extends Component {
    shouldComponentUpdate(nextProps) {
        const currentLength = this.props.notifications ? this.props.notifications.length : 0;
        const nextLength = nextProps.notifications ? nextProps.notifications.length : 0;

        return currentLength !== nextLength || this.props.displayDrawer !== nextProps.displayDrawer;
    }

    markAsRead = (id) => {
        console.log(`Notification ${id} has been marked as read`);
    }

    render() {
        const { notifications = [], displayDrawer = true } = this.props;
        let content = <p>No new notification for now</p>;

        if (notifications.length > 0) {
            const items = notifications.map((notification) => {
                const itemProps = {
                    id: notification.id,
                    type: notification.type,
                    markAsRead: this.markAsRead,
                };

                if (notification.html) {
                    return (
                        <NotificationItem
                            key={notification.id}
                            {...itemProps}
                            html={notification.html}
                        />
                    );
                }

                return (
                    <NotificationItem
                        key={notification.id}
                        {...itemProps}
                        value={notification.value}
                    />
                );
            });

            content = (
                <>
                    <p className="mb-4">Here is the list of notifications</p>
                    <ul className="pl-6">{items}</ul>
                </>
            );
        }

        return (
            <div className="root-notifications">
                <div className="notification-container absolute top-0 right-0 flex w-full flex-col items-end px-4 pt-2">
                    <div className="notifications-title mb-1 text-right text-4xl leading-none md:text-base md:leading-normal">
                        Your notifications
                    </div>

                    {displayDrawer ? (
                        <div className="notifications relative w-full border-2 border-dashed border-main-color p-1.5 md:w-1/4 md:min-w-[25rem]">
                            {notifications.length > 0 ? (
                                <button
                                    className="absolute top-2 right-2 cursor-pointer border-none bg-transparent"
                                    aria-label="Close"
                                    onClick={() => console.log('Close button has been clicked')}
                                >
                                    <img
                                        src={closeButton}
                                        alt="close"
                                        className="h-[15px] w-[15px]"
                                    />
                                </button>
                            ) : null}
                            {content}
                        </div>
                    ) : null}
                </div>
            </div>
        );
    }
}

export default Notifications;
