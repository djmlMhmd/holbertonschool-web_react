// External libraries.
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { StyleSheetTestUtils } from 'aphrodite';

// Reducers.
import coursesReducer from '../../features/courses/coursesSlice';

// Components.
import CourseList from './CourseList';

// Helper to build a test store with preloaded courses state.
const createTestStore = (courses = []) =>
  configureStore({
    reducer: { courses: coursesReducer },
    preloadedState: { courses: { courses } },
  });

// Suppress Aphrodite style injection before tests.
beforeEach(() => {
  StyleSheetTestUtils.suppressStyleInjection();
});

// Clear and resume style injection after tests.
afterAll(() => {
  StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
});

/******************
* COMPONENT TESTS *
******************/

describe('CourseList Component Tests', () => {
  test('Renders correct number of rows with non-empty courses array', () => {
    const courses = [
      { id: 1, name: 'ES6', credit: '60' },
      { id: 2, name: 'Webpack', credit: '20' },
      { id: 3, name: 'React', credit: '40' },
    ];

    const { container } = render(
      <Provider store={createTestStore(courses)}>
        <CourseList />
      </Provider>
    );
    const allRows = container.querySelectorAll('tr');

    // 2 header rows + 3 data rows = 5 rows.
    expect(allRows).toHaveLength(5);
  });

  test('Renders 1 row and "No course available yet" message with empty courses array', () => {
    const { container } = render(
      <Provider store={createTestStore([])}>
        <CourseList />
      </Provider>
    );
    const allRows = container.querySelectorAll('tr');

    // Only 1 row should be rendered for empty state.
    expect(allRows).toHaveLength(1);
    expect(container).toHaveTextContent('No course available yet');
  });
});
