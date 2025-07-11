import React from 'react';
import './MindfileBlock.css'

function MindfileBlock({ mindfile, onMindfileClick }) {
    return (
        <div
            className="mindfileBlock"
            onClick={() => onMindfileClick(mindfile._id)}
        >
            <div
                className='titleContainer'
            >
                <h3>{mindfile.title || 'Untitled'}</h3>
            </div>
            <div
                className='tagsAndDate'
            >
                {mindfile.tags && mindfile.tags.length > 0 && (
                    <div className="tags">
                        {mindfile.tags.map(tag => `#${tag} `)}
                    </div>
                )}
                <p className="date">
                    {new Date(mindfile.timestamp).toLocaleDateString()}
                </p>
            </div>
        </div>
    );
}
export default MindfileBlock