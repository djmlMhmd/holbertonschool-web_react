import React, { Component } from 'react';
import NotificationItem from './NotificationItem';
import closeButton from "../assets/close-button.png";

class Notifications extends Component {
    shouldComponentUpdate(nextProps) {
        const currentLength = this.props.notifications ? this.props.notifications.length : 0;
        const nextLength = nextProps.notifications ? nextProps.notifications.length : 0;

        return currentLength !== nextLength;
    }

    markAsRead = (id) => {
        console.log(`Notification ${id} has been marked as read`);
    }

    render() {
        const { notifications = [], displayDrawer = false } = this.props;
        let drawerContent = null;

        if (displayDrawer) {
            let content = "No new notification for now";

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
                <div className="relative w-full border-2 border-dashed border-main-color p-1.5 md:w-1/4 md:min-w-[26rem]">
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
                <div className="absolute top-0 right-0 flex w-full flex-col items-end p-4">
                    <div className="mb-2 text-right">Your notifications</div>
                    {drawerContent}
                </div>
            </div>
        )
    }
}

export default Notifications;
