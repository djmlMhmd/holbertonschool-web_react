import { render, screen } from '@testing-library/react';
import BodySectionWithMarginBottom from './BodySectionWithMarginBottom';

describe('BodySectionWithMarginBottom component', () => {
    it('contains a div with the class bodySectionWithMargin', () => {
        const { container } = render(
            <BodySectionWithMarginBottom title="test title">
                <p>test</p>
            </BodySectionWithMarginBottom>
        );
        expect(container.querySelector('.bodySectionWithMargin')).toBeInTheDocument();
    });

    it('renders the BodySection component with the title and children', () => {
        render(
            <BodySectionWithMarginBottom title="test title">
                <p>test child</p>
            </BodySectionWithMarginBottom>
        );
        expect(
            screen.getByRole('heading', { level: 2, name: /test title/i })
        ).toBeInTheDocument();
        expect(screen.getByText(/test child/i)).toBeInTheDocument();
    });
});
