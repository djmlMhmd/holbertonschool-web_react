// External libraries.
import { render, screen } from '@testing-library/react';
import { StyleSheetTestUtils } from 'aphrodite';

// Component.
import CourseListRow from './CourseListRow';

// Suppress Aphrodite style injection.
beforeAll(() => StyleSheetTestUtils.suppressStyleInjection());
afterAll(() => StyleSheetTestUtils.clearBufferAndResumeStyleInjection());

// Helper to render a row inside a valid table structure.
const renderRow = (ui) =>
  render(
    <table>
      <tbody>{ui}</tbody>
    </table>
  );

/******************
* COMPONENT TESTS *
******************/

test('Renders header row with one cell spanning two columns', () => {
  const { container } = renderRow(
    <CourseListRow isHeader={true} textFirstCell="Available courses" />
  );

  const th = container.querySelector('th');
  expect(th).toBeInTheDocument();
  expect(th).toHaveAttribute('colSpan', '2');
  expect(th).toHaveTextContent('Available courses');
});

test('Renders header row with two separate cells', () => {
  renderRow(
    <CourseListRow isHeader={true} textFirstCell="Course name" textSecondCell="Credit" />
  );

  expect(screen.getByText('Course name')).toBeInTheDocument();
  expect(screen.getByText('Credit')).toBeInTheDocument();
});

test('Renders data row with two cells', () => {
  renderRow(
    <CourseListRow textFirstCell="ES6" textSecondCell="60" />
  );

  expect(screen.getByText('ES6')).toBeInTheDocument();
  expect(screen.getByText('60')).toBeInTheDocument();
});
