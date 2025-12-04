import React from 'react';

const Section = ({ children, className = '', id = '' }) => {
    return (
        <section id={id} className={`py-20 ${className}`}>
            <div className="container-custom">
                {children}
            </div>
        </section>
    );
};

export default Section;
