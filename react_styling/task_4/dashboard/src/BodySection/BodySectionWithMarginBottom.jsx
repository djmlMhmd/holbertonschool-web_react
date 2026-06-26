import React from 'react';
import BodySection from './BodySection';

function BodySectionWithMarginBottom({ title, children, className = "" }) {
    return (
        <div className={`mb-8 min-[520px]:mb-10 ${className}`.trim()}>
            <BodySection title={title}>
                {children}
            </BodySection>
        </div>
    );
}

export default BodySectionWithMarginBottom;
