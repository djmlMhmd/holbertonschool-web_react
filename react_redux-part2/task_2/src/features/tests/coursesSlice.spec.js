import reducer, { fetchCourses, selectCourse, unSelectCourse } from '../courses/coursesSlice';
import { logout } from '../auth/authSlice';
import { configureStore } from '@reduxjs/toolkit';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

describe('coursesSlice', () => {
  const initialState = { courses: [] };
  let mock;

  beforeEach(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.restore();
  });

  it('should return the initial state by default', () => {
    expect(reducer(undefined, { type: '@@INIT' })).toEqual(initialState);
  });

  it('Should fetch courses correctly and set isSelected to false', async () => {
    const mockCourses = [
      { id: 1, name: 'React' },
      { id: 2, name: 'Redux' },
    ];

    mock.onGet('http://localhost:3000/courses.json').reply(200, {
      courses: mockCourses,
    });

    const store = configureStore({ reducer });
    await store.dispatch(fetchCourses());

    const state = store.getState();
    expect(state.courses).toEqual([
      { id: 1, name: 'React', isSelected: false },
      { id: 2, name: 'Redux', isSelected: false },
    ]);
  });

  it('Should set isSelected to true when selectCourse is dispatched', () => {
    const prevState = { courses: [{ id: 1, name: 'React', isSelected: false }] };
    const newState = reducer(prevState, selectCourse(1));
    expect(newState.courses[0].isSelected).toBe(true);
  });

  it('Should set isSelected to false when unSelectCourse is dispatched', () => {
    const prevState = { courses: [{ id: 1, name: 'React', isSelected: true }] };
    const newState = reducer(prevState, unSelectCourse(1));
    expect(newState.courses[0].isSelected).toBe(false);
  });

  it('Should reset courses when logout is dispatched', () => {
    const prevState = { courses: [{ id: 1, name: 'React', isSelected: false }] };
    const newState = reducer(prevState, logout());
    expect(newState).toEqual(initialState);
  });
});
