// External libraries.
import { render, screen } from '@testing-library/react';
import { StyleSheetTestUtils } from 'aphrodite';

// Component.
import BodySectionWithMarginBottom from './BodySectionWithMarginBottom';

// Suppress Aphrodite style injection.
beforeAll(() => StyleSheetTestUtils.suppressStyleInjection());
afterAll(() => StyleSheetTestUtils.clearBufferAndResumeStyleInjection());

/******************
* COMPONENT TESTS *
******************/

test('Renders the title and children', () => {
  render(
    <BodySectionWithMarginBottom title="News from the School">
      <p>School content here</p>
    </BodySectionWithMarginBottom>
  );

  expect(screen.getByRole('heading', { name: /news from the school/i })).toBeInTheDocument();
  expect(screen.getByText('School content here')).toBeInTheDocument();
});
