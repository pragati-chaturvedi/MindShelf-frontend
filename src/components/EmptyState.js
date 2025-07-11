import React from 'react';
import styles from './EmptyState.css';

function EmptyState() {
    return (
        <div className='emptyStateContainer'>
            <div className='icon'>

            </div>
            <h2 className='title'>Your MindShelf is Empty</h2>
            <p className='description'>
                Start adding links and text to build your knowledge collection. Click the <strong>"+"</strong> button to add your first Mindfile.
            </p>
        </div>
    );
}

export default EmptyState;