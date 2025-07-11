import React from 'react';
import './MindfileDetails.css'

function MindfileDetails({ mindfile, onClose }) {
    if (!mindfile) {
        return null;
    }

    return (
        <div
            className="mindfile-overlay"
            onClick={onClose}
        >
            <div
                className="mindfile-window"
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside window
            >
                <div
                    className='header'
                >
                    <h3>{mindfile.title || 'Untitled'}</h3>
                    <button
                        onClick={onClose}
                    >
                        Close
                    </button>
                </div>
                <p
                    className="date"
                >
                    Created At: {new Date(mindfile.timestamp).toLocaleString()}
                </p>
                {mindfile.tags && mindfile.tags.length > 0 && (
                    <div
                        className="tags"
                    >
                        <strong>Tags:</strong> {mindfile.tags.map(tag => `#${tag} `)}
                    </div>
                )}
                <p
                    className="summary"
                >
                    {mindfile.summary}
                </p>
                {mindfile.link && (
                    <p
                        className="link"
                    >
                        <strong>Source:</strong>
                        <a
                            href={mindfile.link}
                            target="_blank"
                        >
                            {mindfile.link}
                        </a>
                    </p>
                )}
            </div>
        </div>
    );
}
export default MindfileDetails
