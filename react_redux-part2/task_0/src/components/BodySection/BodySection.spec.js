// External libraries.
import { render, screen } from '@testing-library/react';

// Component.
import BodySection from './BodySection';

/******************
* COMPONENT TESTS *
******************/

test('Renders the title and children', () => {
  render(
    <BodySection title="Test Title">
      <p>Test content</p>
    </BodySection>
  );

  expect(screen.getByRole('heading', { name: /test title/i })).toBeInTheDocument();
  expect(screen.getByText('Test content')).toBeInTheDocument();
});
