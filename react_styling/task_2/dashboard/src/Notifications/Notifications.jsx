import React, { Component } from 'react';
import NotificationItem from './NotificationItem';
import closeButton from "../assets/close-button.png";

class Notifications extends Component {
    markAsRead = (id) => {
        console.log(`Notification ${id} has been marked as read`);
    }

    render() {
        const { notifications = [], displayDrawer = true } = this.props;
        let drawerContent = null;

        if (displayDrawer) {
            let content = <p>no new notification for now</p>;

            if (notifications.length > 0) {
                const items = notifications.map(notification => {
                    const itemProps = {
                        id: notification.id,
                        type: notification.type,
                        markAsRead: this.markAsRead
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
                        <ul className="pl-8">{items}</ul>
                    </>
                );
            }

            drawerContent = (
                <div className="notifications relative w-full border-2 border-dashed border-main-color p-1.5 md:w-1/4 md:min-w-[26rem]">
                    <button
                        className="absolute top-4 right-4 cursor-pointer border-none bg-transparent"
                        aria-label="Close"
                        onClick={() => console.log('Close button has been clicked')}
                    >
                        <img
                            src={closeButton}
                            alt="close"
                            className="h-[15px] w-[15px]"
                        />
                    </button>
                    {content}
                </div>
            );
        }

        return (
            <div className="root-notifications">
                <div className="notification-container absolute top-0 right-0 flex w-full flex-col items-end p-4">
                    <div className="notifications-title mb-2 text-right">Your notifications</div>
                    {drawerContent}
                </div>
            </div>
        )
    }
}

export default Notifications;
