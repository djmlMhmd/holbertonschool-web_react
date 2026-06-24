import React from 'react';

function BodySection({ title, children }) {
    return (
        <section className="bodySection">
            <h2 className="mb-2 text-[2.1rem] font-bold md:text-2xl">{title}</h2>
            {children}
        </section>
    );
}

export default BodySection;
