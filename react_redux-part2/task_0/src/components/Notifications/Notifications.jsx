// External libraries.
import { memo, useRef } from 'react';
import { StyleSheet, css } from 'aphrodite';
import { useSelector, useDispatch } from 'react-redux';

// Redux actions.
import {
  markNotificationAsRead,
} from '../../features/notifications/notificationsSlice';

// Components.
import NotificationItem from '../NotificationItem/NotificationItem';

// Assets.
import closeButton from "../../assets/close-icon.png";

const Notifications = memo(() => {
  const dispatch = useDispatch();
  const notifications = useSelector((state) => state.notifications.notifications);
  const DrawerRef = useRef(null);

  const handleMarkAsRead = (id) => dispatch(markNotificationAsRead(id));

  const handleToggleDrawer = () => {
    if (DrawerRef.current) {
      DrawerRef.current.classList.toggle(css(styles.visible));
    }
  };

  const opacityAnimation = {
    '0%': { opacity: 0.5 },
    '100%': { opacity: 1 }
  };

  const bounceAnimation = {
    '0%': { transform: 'translateY(0px)' },
    '33%': { transform: 'translateY(-5px)' },
    '66%': { transform: 'translateY(5px)' },
    '100%': { transform: 'translateY(0px)' }
  };

  // Styles.
  const styles = StyleSheet.create({
    notificationContainer: {
      width: '100%',
      padding: '1rem',
      position: 'absolute',
      top: 0,
      right: 0,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
      alignItems: 'flex-end'
    },
    notificationsTitle: {
      marginBottom: '0.5rem',
      position: 'relative',
      float: 'right',
      backgroundColor: '#fff8f8',
      cursor: 'pointer',
      padding: '10px',
      ':hover': {
        animationName: [opacityAnimation, bounceAnimation],
        animationDuration: '1s, 0.5s',
        animationIterationCount: '3, 3'
      }
    },
    notifications: {
      width: '500px',
      position: 'relative',
      padding: '0.5rem',
      border: '1px dashed red',
      opacity: 0,
      visibility: 'hidden',
      '@media (max-width: 900px)': {
        width: '100vw',
        height: '100vh',
        position: 'fixed',
        top: 0,
        left: 0,
        padding: 0,
        border: 'none',
        fontSize: '20px',
        backgroundColor: 'white',
        zIndex: 1000
      }
    },
    visible: {
      opacity: 1,
      visibility: 'visible',
    },
    notificationsP: {
      marginBottom: '1rem'
    },
    notificationsUl: {
      marginLeft: '2rem',
      '@media (max-width: 900px)': {
        margin: 0,
        padding: 0,
        listStyle: 'none'
      }
    },
    closeButton: {
      position: 'absolute',
      top: '0.60rem',
      right: '1rem',
      background: 'transparent',
      border: 'none',
      cursor: 'pointer'
    },
    closeButtonImg: {
      width: '15px',
      height: '15px'
    }
  });

  // Build drawer content.
  let content;

  if (notifications.length > 0) {
    const items = [];

    for (let i = 0; i < notifications.length; i += 1) {
      const notification = notifications[i];
      const itemProps = {
        id: notification.id,
        type: notification.type,
        markAsRead: handleMarkAsRead
      };

      if (notification.html) {
        items.push(
          <NotificationItem
            key={notification.id}
            {...itemProps}
            html={notification.html}
          />
        );
      } else {
        items.push(
          <NotificationItem
            key={notification.id}
            {...itemProps}
            value={notification.value}
          />
        );
      }
    }

    content = (
      <>
        <p className={css(styles.notificationsP)}>Here is the list of notifications</p>
        <ul className={css(styles.notificationsUl)}>{items}</ul>
      </>
    );
  } else {
    content = (
      <div className="Notifications">
        No new notifications for now
      </div>
    );
  }

  return (
    <div className="root-notifications">
      <div className={css(styles.notificationContainer)}>
        <div
          className={css(styles.notificationsTitle)}
          onClick={handleToggleDrawer}
        >
          Your notifications
        </div>
        <div
          ref={DrawerRef}
          className={`Notifications ${css(styles.notifications)}`}
        >
          <button
            className={css(styles.closeButton)}
            aria-label="Close"
            onClick={handleToggleDrawer}
          >
            <img
              src={closeButton}
              alt="close"
              className={css(styles.closeButtonImg)}
            />
          </button>
          {content}
        </div>
      </div>
    </div>
  );
});

export default Notifications;
