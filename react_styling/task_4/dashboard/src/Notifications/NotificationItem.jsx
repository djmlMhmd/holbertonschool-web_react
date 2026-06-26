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
        const itemClassName = `${textColorClass} list-none border-b border-gray-500 px-3 py-3 text-[1.05rem] min-[520px]:text-lg min-[912px]:list-item min-[912px]:border-none min-[912px]:px-0 min-[912px]:py-0 min-[912px]:text-base`;

        if (html) {
            return (
                <li
                    ref={this.liRef}
                    className={itemClassName}
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
                    className={itemClassName}
                    data-notification-type={type}
                    dangerouslySetInnerHTML={{ __html: value }}
                    onClick={this.handleClick}
                />
            );
        }

        return (
            <li
                ref={this.liRef}
                className={itemClassName}
                data-notification-type={type}
                onClick={this.handleClick}
            >
                {value}
            </li>
        );
    }
}

export default NotificationItem;
