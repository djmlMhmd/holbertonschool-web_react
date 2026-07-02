function NotificationItem({ type = 'default', value, html }) {
    if (html) {
        return (
            <li
                data-notification-type={type}
                dangerouslySetInnerHTML={{ __html: html }}
            ></li>
        );
    }

    return <li data-notification-type={type}>{value}</li>;
}

export default NotificationItem;
