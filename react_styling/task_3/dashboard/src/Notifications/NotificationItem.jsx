import React, { PureComponent, createRef } from 'react';

class NotificationItem extends PureComponent {
    constructor(props) {
        super(props);
        this.liRef = createRef();
    }

    handleClick = () => {
        const { id, markAsRead } = this.props;

        if (markAsRead) {
            markAsRead(id);
        }
    }

    containsHTML = (str) => {
        return typeof str === 'string' && /<\/?[a-z][\s\S]*>/i.test(str);
    };

    render() {
        const { type = 'default', html, value } = this.props;
        const textColorClass = type === 'urgent'
            ? 'text-urgent-notification-item'
            : 'text-default-notification-item';

        if (html) {
            return (
                <li
                    ref={this.liRef}
                    className={textColorClass}
                    data-notification-type={type}
                    dangerouslySetInnerHTML={html}
                    onClick={this.handleClick}
                />
            );
        }

        if (value && this.containsHTML(value)) {
            return (
                <li
                    ref={this.liRef}
                    className={textColorClass}
                    data-notification-type={type}
                    dangerouslySetInnerHTML={{ __html: value }}
                    onClick={this.handleClick}
                />
            );
        }

        return (
            <li
                ref={this.liRef}
                className={textColorClass}
                data-notification-type={type}
                onClick={this.handleClick}
            >
                {value}
            </li>
        );
    }
}

export default NotificationItem;
