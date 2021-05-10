import React, { useEffect } from 'react'
import EditBook from './EditBook';
import EditProfile from './EditProfile';
import './Modal.css'

export default function Modal(props) {
   
    var modal, closeBtn, modalBtn

    useEffect(() => {
        modalBtn = document.getElementById('tradeHistory')
        if (modalBtn)
        modalBtn.addEventListener('click', openModal);
        
        closeBtn = document.getElementsByClassName('closeBtn')[0]
        if (closeBtn)
        closeBtn.addEventListener('click', closeModal)
    
        modal = document.getElementById('simpleModal')
        if (modal)
        window.addEventListener('click', outsideClick)
    
    }, [])

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
                        <h2 className="modal-title">
                            {props.data && props.data.title ?
                                'Edit book details'
                                : props.data && props.data.username ?
                                'Edit user details'
                                : null
                            }
                            </h2>
                    </div>
                    <div className="modal-body">
                        {props.data && props.data.title ? 
                            <EditBook data={props.data} />
                            : props.data && props.data.username ?
                            <EditProfile />
                            :
                            null
                        }
                        
                    </div>
                    <div className="modal-footer">
                        
                    </div>
                </div>
            </div>
        </div>
    )
}
