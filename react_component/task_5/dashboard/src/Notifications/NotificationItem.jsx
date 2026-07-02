import { PureComponent } from 'react';

class NotificationItem extends PureComponent {
    handleClick = () => {
        const { id, markAsRead = () => {} } = this.props;
        markAsRead(id);
    };

    render() {
        const { type = 'default', value, html } = this.props;

        if (html) {
            return (
                <li
                    data-notification-type={type}
                    dangerouslySetInnerHTML={{ __html: html }}
                    onClick={this.handleClick}
                ></li>
            );
        }

        return (
            <li data-notification-type={type} onClick={this.handleClick}>
                {value}
            </li>
        );
    }
}

export default NotificationItem;
