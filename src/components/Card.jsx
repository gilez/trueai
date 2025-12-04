import React from 'react';

const Card = ({ children, className = '', hover = true }) => {
    return (
        <div
            className={`
        glass rounded-2xl p-6 
        ${hover ? 'glass-hover hover:-translate-y-1 cursor-pointer' : ''}
        ${className}
      `}
        >
            {children}
        </div>
    );
};

export default Card;
