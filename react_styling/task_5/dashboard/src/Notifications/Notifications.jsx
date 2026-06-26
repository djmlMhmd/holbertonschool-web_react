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
        const shouldBounce = notifications.length > 0 && displayDrawer === false;
        let content = <p className="text-[1.05rem] min-[912px]:text-base">No new notification for now</p>;

        if (notifications.length > 0) {
            const items = notifications.map((notification) => {
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
                    <p className="mb-3 pr-8 text-[1.05rem] min-[912px]:mb-4 min-[912px]:pr-0 min-[912px]:text-base">
                        Here is the list of notifications
                    </p>
                    <ul className="list-none p-0 min-[912px]:list-disc min-[912px]:pl-6">
                        {items}
                    </ul>
                </>
            );
        }

        return (
            <div className="root-notifications">
                <div className="notification-container absolute top-0 right-0 z-40 flex w-full flex-col items-end px-2 pt-1 min-[520px]:px-3 min-[520px]:pt-2">
                    <div className={`notification-title mb-1 text-right text-sm leading-none min-[520px]:text-base min-[520px]:leading-normal ${displayDrawer ? 'hidden min-[912px]:block' : 'block'} ${shouldBounce ? 'animate-bounce' : ''}`}>
                        Your notifications
                    </div>

                    {displayDrawer ? (
                        <div className="notifications fixed inset-0 z-50 h-screen w-screen border-2 border-dashed border-main-color bg-white p-3 min-[912px]:relative min-[912px]:inset-auto min-[912px]:h-auto min-[912px]:w-1/4 min-[912px]:min-w-[25rem] min-[912px]:p-1.5">
                            {notifications.length > 0 ? (
                                <button
                                    className="absolute top-3 right-3 cursor-pointer border-none bg-transparent min-[912px]:top-2 min-[912px]:right-2"
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
        )
    }
}

export default Notifications;
