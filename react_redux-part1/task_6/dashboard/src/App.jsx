// External libraries.
import { useEffect, useCallback } from 'react';
import axios from 'axios';
import { StyleSheet, css } from 'aphrodite';
import { useSelector, useDispatch } from 'react-redux';

// Utilities.
import { getLatestNotification } from './utils/utils';

// Redux actions
import { logout } from './features/auth/authSlice';

// Components.
import BodySection from './components/BodySection/BodySection';
import BodySectionWithMarginBottom from './components/BodySectionWithMarginBottom/BodySectionWithMarginBottom';
import CourseList from './pages/CourseList/CourseList';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Login from './pages/Login/Login';
import Notifications from './components/Notifications/Notifications';
import WithLogging from './components/HOC/WithLogging';

// HOCs with logging.
const LoginWithLoggingHOC = WithLogging(Login);
const CourseListWithLoggingHOC = WithLogging(CourseList);

// Styles.
const styles = StyleSheet.create({
  appContainer: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column'
  },
  mainBody: {
    flex: 1,
    padding: '1rem'
  },
  footerContainer: {
    padding: '1rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '0.8rem',
    fontWeight: 200,
    fontStyle: 'italic',
    borderTop: '0.25rem solid #e1003c'
  },
});

function App() {
  // Redux state et dispatch
  const { isLoggedIn } = useSelector((state) => state.auth);
  const notifications = useSelector((state) => state.notifications || []);
  const displayDrawer = useSelector((state) => state.displayDrawer || false);
  const dispatch = useDispatch();

  const handleLogout = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  // Note: Vous devrez créer des actions Redux pour ces fonctions aussi
  // Pour l'instant, je les laisse comme des fonctions locales
  const toggleNotificationsDrawer = useCallback(() => {
    // dispatch({ type: 'TOGGLE_DRAWER' }); // À implémenter dans un slice séparé
  }, []);

  const markNotificationReadById = useCallback(() => {
    // dispatch(markNotificationRead(id)); // À implémenter dans un slice séparé
  }, []);

  // Keyboard shortcut (Ctrl + h).
  const handleCtrlHKey = useCallback((event) => {
    if (event.ctrlKey && event.key === 'h') {
      alert('Logging you out');
      handleLogout();
    }
  }, [handleLogout]);

  // Fetch notifications.
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await axios.get('http://localhost:3000/notifications.json');
        const _notificationsList = (res.data.notifications || res.data).map((notif) => {
          if ((!notif.value && !notif.html) || notif.id === 3) {
            return { ...notif, html: { __html: getLatestNotification() } };
          }
          return notif;
        });
        // dispatch(setNotifications(_notificationsList)); // À implémenter
      } catch (err) {
        console.error('Error fetching notifications:', err);
      }
    };

    fetchNotifications();
  }, []);

  // Fetch courses if logged in.
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get('http://localhost:3000/courses.json');
        const _coursesList = res.data.courses || res.data;
        // dispatch(setCourses(_coursesList)); // À implémenter
      } catch (err) {
        console.error('Error fetching courses:', err);
      }
    };

    if (isLoggedIn) fetchCourses(); // Utilise isLoggedIn de Redux
  }, [isLoggedIn]);

  // Keyboard event listener.
  useEffect(() => {
    document.addEventListener('keydown', handleCtrlHKey);
    return () => document.removeEventListener('keydown', handleCtrlHKey);
  }, [handleCtrlHKey]);

  return (
    <div className={css(styles.appContainer)}>
      <Notifications
        notifications={notifications}
        displayDrawer={displayDrawer}
        handleDisplayDrawer={toggleNotificationsDrawer}
        handleHideDrawer={toggleNotificationsDrawer}
        markNotificationAsRead={markNotificationReadById}
      />

      <Header />

      <div className={css(styles.mainBody)}>
        {isLoggedIn ? (
          <BodySectionWithMarginBottom title="Course list">
            <CourseListWithLoggingHOC />
          </BodySectionWithMarginBottom>
        ) : (
          <BodySectionWithMarginBottom title="Log in to continue">
            <LoginWithLoggingHOC />
          </BodySectionWithMarginBottom>
        )}

        <BodySection title="News from the School">
          <p>Holberton School News goes here</p>
        </BodySection>
      </div>

      <div className={css(styles.footerContainer)}>
        <Footer />
      </div>
    </div>
  );
}

export default App;
