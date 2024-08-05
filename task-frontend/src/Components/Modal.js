import React from 'react';
import './Modal.css';

const Modal = ({ show, handleClose, children }) => {
    if (!show) {
        return null;
    }
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="modal-close" onClick={handleClose}>Close</button>
                {children}
            </div>
        </div>
    );
};

export default Modal;
