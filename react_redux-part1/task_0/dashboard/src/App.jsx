import { useReducer, useCallback, useEffect } from 'react';
import axios from 'axios';
import Notifications from './components/Notifications/Notifications.jsx';
import Header from './components/Header/Header.jsx';
import LoginForm from './pages/Login/Login.jsx';
import CourseList from './pages/CourseList/CourseList.jsx';
import Footer from './components/Footer/Footer.jsx';
import BodySection from './components/BodySection/BodySection.jsx';
import BodySectionWithMarginBottom from './components/BodySectionWithMarginBottom/BodySectionWithMarginBottom.jsx'
import { APP_ACTIONS, initialState, appReducer } from './appReducer.js';
import { getLatestNotification } from './utils/utils';

function App() {
  // Déclaration des différents states
  const [state, dispatch] = useReducer(appReducer, initialState);

  const handleDisplayDrawer = useCallback(() => {
    dispatch({ type: APP_ACTIONS.TOGGLE_DRAWER });
  }, [dispatch]);
  const handleHideDrawer = useCallback(() => {
    dispatch({ type: APP_ACTIONS.TOGGLE_DRAWER });
  }, [dispatch]);

  useEffect(() => {
    const fetchNotificationsData = async () => {
      try {
        const baseUrl = import.meta.env.BASE_URL || '/';
        const response = await axios.get(`${baseUrl}notifications.json`);

        const data = Array.isArray(response.data) ? response.data : (Array.isArray(response) ? response : []);
        const transformedResponse = data.map((element, index, array) => {
          if (index === array.length - 1) {
            return { ...element, html: getLatestNotification() };
          } else {
            return element;
          }
        })
        dispatch({ type: APP_ACTIONS.SET_NOTIFICATIONS, payload: transformedResponse });
      }
      catch (error) {
        console.error(error);
      }
    };
    fetchNotificationsData();
  }, []);

  useEffect(() => {
    if (!state.user.isLoggedIn) {
      return;
    }

    const fetchCoursesData = async () => {
      try {
        const baseUrl = import.meta.env.BASE_URL || '/';
        const response = await axios.get(`${baseUrl}courses.json`);

        const data = Array.isArray(response.data) ? response.data : Array.isArray(response) ? response : [];
        dispatch({ type: APP_ACTIONS.SET_COURSES, payload: data });
      }
      catch (error) {
        console.error(error);
      }
    };
    fetchCoursesData();
  }, [state.user.isLoggedIn]);


  // Fonction logIn
  const logIn = useCallback((email, password) => {
    dispatch({ type: APP_ACTIONS.LOGIN, payload: { email, password } });
  }, [dispatch]);


  // Fonction logOut
  const logOut = useCallback(() => {
    dispatch({ type: APP_ACTIONS.LOGOUT });
  }, [dispatch]);


  // Fonction markNotificationAsRead
  const markNotificationAsRead = useCallback((id) => {
    console.log(`Notification ${id} has been marked as read`);
    dispatch({ type: APP_ACTIONS.MARK_NOTIFICATION_READ, payload: id });
  }, [dispatch]);

  return (
    <div className='flex flex-col min-h-screen'>
      <div className="header flex md:justify-between flex-col-reverse md:flex-row md:items-center">
        <div className="header-wrapper grow">
          <Header user={state.user} logOut={logOut} />
        </div>
        <div className="root-notifications">
          <Notifications notifications={state.notifications}
            markNotificationAsRead={markNotificationAsRead}
            displayDrawer={state.displayDrawer}
            handleDisplayDrawer={handleDisplayDrawer}
            handleHideDrawer={handleHideDrawer} />
        </div>
      </div>
      {state.user.isLoggedIn ?
        <BodySectionWithMarginBottom title={'Course list'}>
          <CourseList courses={state.courses} />
        </BodySectionWithMarginBottom>:
        <BodySectionWithMarginBottom title={'Log in to continue'}>
          <LoginForm logIn={logIn} email={state.user.email} password={state.user.password} />
        </BodySectionWithMarginBottom>
      }
      <BodySection title={'News from the School'}>
        <p className='pl-4'>ipsum Lorem ipsum dolor sit amet consectetur, adipisicing elit.
          Similique, asperiores architecto blanditiis fuga doloribus sit illum aliquid ea distinctio
          minus accusantium, impedit quo voluptatibus ut magni dicta. Recusandae, quia dicta?</p>
      </BodySection>
      <Footer user={state.user} />
    </div>
  )
}

export default App;
