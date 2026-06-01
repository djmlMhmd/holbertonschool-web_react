// External libraries.
import { useEffect, useCallback } from 'react';
import axios from 'axios';
import { StyleSheet, css } from 'aphrodite';
import { useSelector, useDispatch } from 'react-redux';

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
  const { isLoggedIn } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  // Keyboard shortcut (Ctrl + h).
  const handleCtrlHKey = useCallback((event) => {
    if (event.ctrlKey && event.key === 'h') {
      alert('Logging you out');
      handleLogout();
    }
  }, [handleLogout]);

  // Fetch courses if logged in.
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get('http://localhost:3000/courses.json');
        const _coursesList = res.data.courses || res.data;
        void _coursesList;
      } catch (err) {
        console.error('Error fetching courses:', err);
      }
    };

    if (isLoggedIn) fetchCourses();
  }, [isLoggedIn]);

  // Keyboard event listener.
  useEffect(() => {
    document.addEventListener('keydown', handleCtrlHKey);
    return () => document.removeEventListener('keydown', handleCtrlHKey);
  }, [handleCtrlHKey]);

  return (
    <div className={css(styles.appContainer)}>
      <Notifications />

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
