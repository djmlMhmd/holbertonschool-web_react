import { render, screen } from '@testing-library/react';
import BodySection from './BodySection';

describe('BodySection component', () => {
    it('renders a heading with the title prop value', () => {
        render(
            <BodySection title="test title">
                <p>test</p>
            </BodySection>
        );
        expect(
            screen.getByRole('heading', { level: 2, name: /test title/i })
        ).toBeInTheDocument();
    });

    it('renders any number of children passed to it', () => {
        render(
            <BodySection title="test title">
                <p>child one</p>
                <p>child two</p>
            </BodySection>
        );
        expect(screen.getByText(/child one/i)).toBeInTheDocument();
        expect(screen.getByText(/child two/i)).toBeInTheDocument();
    });
});
