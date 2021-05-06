import React from 'react'
import EditBook from './EditBook';
import './Modal.css'

export default function Modal(props) {
    var modalBtn = document.getElementById('tradeHistory')
    if (modalBtn)
    modalBtn.addEventListener('click', openModal);

    
    var closeBtn = document.getElementsByClassName('closeBtn')[0]
    if (closeBtn)
    closeBtn.addEventListener('click', closeModal)

    var modal = document.getElementById('simpleModal')
    if (modal)
    window.addEventListener('click', outsideClick)


    function openModal() {

        modal.style.display = 'flex';
    }


    function closeModal() {

        modal.style.display = 'none'
    }

  
    function outsideClick(e) {

        if (e.target === modal) {
 
            modal.style.display = 'none';
        }
    }
    return (
        <div>
            <div id="simpleModal" className="modal-overlay">
                <div className="modal-content">
                    <div className="modal-header">
                        <span className="closeBtn"> x </span>
                        <h2 className="modal-title">Edit book details</h2>
                    </div>
                    <div className="modal-body">
                    <EditBook data={props.data} />
                    </div>
                    <div className="modal-footer">
                        
                    </div>
                </div>
            </div>
        </div>
    )
}
