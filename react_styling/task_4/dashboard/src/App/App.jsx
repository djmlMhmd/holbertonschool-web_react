import React, { Component } from 'react';
import Notifications from '../Notifications/Notifications';
import Header from '../Header/Header';
import Login from '../Login/Login';
import Footer from '../Footer/Footer';
import CourseList from '../CourseList/CourseList';
import BodySection from '../BodySection/BodySection';
import BodySectionWithMarginBottom from '../BodySection/BodySectionWithMarginBottom';
import WithLogging from '../HOC/WithLogging';
import { getLatestNotification } from "../utils/utils";

const LoginWithLogging = WithLogging(Login);
const CourseListWithLogging = WithLogging(CourseList);
const DEFAULT_COURSES = [
  {
    id: 1,
    name: 'ES6',
    credit: 60
  },
  {
    id: 2,
    name: 'Webpack',
    credit: 20
  },
  {
    id: 3,
    name: 'React',
    credit: 40
  }
];

class App extends Component {
  static defaultProps = {
    isLoggedIn: false,
    logOut: () => { }
  };

  handleKeyDown = (event) => {
    if (event.ctrlKey && event.key === 'h') {
      alert('Logging you out');
      this.props.logOut();
    }
  };

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  render() {
    const { isLoggedIn = false } = this.props;
    const hasCoursesListProp = Object.prototype.hasOwnProperty.call(this.props, 'coursesList');
    const coursesList = hasCoursesListProp ? this.props.coursesList : DEFAULT_COURSES;

    const notificationsList = [
      {
        id: 1,
        type: "default",
        value: "New course available"
      },
      {
        id: 2,
        type: "urgent",
        value: "New resume available"
      },
      {
        id: 3,
        type: "urgent",
        value: getLatestNotification()
      }
    ];

    return (
      <div className="min-h-screen flex flex-col bg-white">
        <Notifications notifications={notificationsList} />

        <Header />

        <main className="flex flex-1 flex-col px-2 py-3 min-[520px]:px-4 min-[520px]:py-4 md:px-5 md:py-5">
          {isLoggedIn ? (
            <BodySectionWithMarginBottom title="Course list">
              <CourseListWithLogging courses={coursesList} />
            </BodySectionWithMarginBottom>
          ) : (
            <BodySectionWithMarginBottom title="Log in to continue">
              <LoginWithLogging />
            </BodySectionWithMarginBottom>
          )}

          <BodySection title="News from the School">
            <p>
              ipsum Lorem ipsum dolor sit amet consectetur, adipisicing elit. Similique,
              asperiores architecto blanditiis fuga doloribus sit illum aliquid ea distinctio
              minus accusantium, impedit quo voluptatibus ut magni dicta. Recusandae, quia dicta?
            </p>
          </BodySection>
        </main>

        <Footer />
      </div>
    );
  }
}

export default App;
