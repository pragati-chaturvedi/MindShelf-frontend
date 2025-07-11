import React, { useState } from 'react';
import './CreateMindfile.css'

function CreateMindfileDialog({ isOpen, onClose, onSave }) {
    const [link, setLink] = useState('');

    const handleInputChange = (event) => {
        setLink(event.target.value);
    };

    const handleSaveClick = () => {
        if (link.trim() !== '') {
            onSave(link); // Pass the link to the parent component
            setLink(''); // Clear the input after saving
            onClose(); // Close the dialog
        } else {
            // Optionally show an error message if the link is empty
            alert('Please paste a link.');
        }
    };

    if (!isOpen) {
        return null;
    }

    return (
        <div
            className="create-mindfile-overlay"
            onClick={onClose} // Close when clicking outside the dialog
        >
            <div
                className="create-mindfile-dialog"
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
            >
                <h3>Add to MindShelf</h3>
                <div className="inputGroup">
                    <label htmlFor="linkInput">
                        Paste Link:
                    </label>
                    <input
                        type="text"
                        id="linkInput"
                        value={link}
                        onChange={handleInputChange}
                    />
                </div>
                <div className='buttons'>
                    <button onClick={onClose} className='cancelButton'>
                        Cancel
                    </button>
                    <button onClick={handleSaveClick} className='addButton'>
                        Add to my MindShelf
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CreateMindfileDialog;