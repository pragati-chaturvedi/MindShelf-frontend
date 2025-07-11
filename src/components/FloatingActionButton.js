import React from 'react';
import './FloatingActionButton.css';

function FloatingActionButton({ onClick }) {
    return (
        <button className='fab' onClick={onClick}>
            +
        </button>
    );
}

export default FloatingActionButton;