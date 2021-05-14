import React, { useEffect, useContext } from 'react'
import AddBook from './AddBook'
import EditBook from './EditBook'
import EditProfile from './EditProfile'
import './Modal.css'
import RemoveUser from './RemoveUser'
import { closeModal, showModal } from '../kit/Functions'
import { DataContext } from '../context/DataContext'

export default function Modal(props) {
   
    const { setRemove } = useContext(DataContext)
    var modal, closeBtn, modalBtn

    useEffect(() => {
        modalBtn = document.getElementById('tradeHistory')
        if (modalBtn)
        modalBtn.addEventListener('click', showModal);
        
        closeBtn = document.getElementsByClassName('closeBtn')[0]
        if (closeBtn)
        closeBtn.addEventListener('click', closeModal)
    
        modal = document.getElementById('simpleModal')
        if (modal)
        window.addEventListener('click', outsideClick)
    
    }, [])

    const outsideClick = (e) => {
       
        if (e.target === modal) {
            setRemove(false)
            closeModal()
            
        }
    }
    return (
        <div>
            <div id="simpleModal" className="modal-overlay">
                <div className="modal-content">
                    <div className="modal-header">
                        <span className="closeBtn"> x </span>
                        <h2 className="modal-title">
                            {props.remove ?
                                'Remove user'
                                : props.data && props.data.title ?
                                'Edit book details'
                                : props.data && props.data.username ?
                                'Edit user details'
                                : props.type && props.type === 'addNewBook' ?
                                'Add new Book'
                                : null
                            }
                            </h2>
                    </div>
                    <div className="modal-body">
                        {props.remove ? 
                            <RemoveUser />
                            : props.data && props.data.title ? 
                            <EditBook data={props.data} />
                            : props.data && props.data.username ?
                            <EditProfile />
                            : props.type && props.type === 'addNewBook' ?
                            <AddBook />
                            : null
                        }
                        
                    </div>
                </div>
            </div>
        </div>
    )
}
