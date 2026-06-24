import React from 'react';
import BodySection from './BodySection';

function BodySectionWithMarginBottom({ title, children }) {
    return (
        <div className="mb-10">
            <BodySection title={title}>
                {children}
            </BodySection>
        </div>
    );
}

export default BodySectionWithMarginBottom;
