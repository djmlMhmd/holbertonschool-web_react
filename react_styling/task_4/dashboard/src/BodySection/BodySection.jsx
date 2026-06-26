import React from 'react'

function BodySection({ title, children }) {
    return (
        <section className="bodySection">
            <h2 className="mb-2 text-[1.1rem] font-bold leading-tight min-[520px]:text-[2.1rem] md:text-2xl">{title}</h2>
            {children}
        </section>
    );
}

export default BodySection;
