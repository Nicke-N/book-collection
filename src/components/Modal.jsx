import React, { useEffect, useContext } from 'react'
import AddBook from './AddBook'
import EditBook from './EditBook'
import EditProfile from './EditProfile'
import './Modal.css'
import RemoveUser from './RemoveUser'
import { closeModal, showModal } from '../kit/Functions'
import { DataContext } from '../context/DataContext'
import RemoveBook from './RemoveBook'
import Register from './Register'
import Login from './Login'

export default function Modal(props) {

    const { setRemove, setModalData, remove } = useContext(DataContext)
    var modal, closeBtn, modalBtn

    useEffect(() => {
        modalBtn = document.getElementById('tradeHistory')
        if (modalBtn)
            modalBtn.addEventListener('click', showModal);

        closeBtn = document.getElementsByClassName('closeBtn')[0]
        if (closeBtn)
            closeBtn.addEventListener('click', () => { modal.style.display = 'none'; setRemove(false); setModalData(null) })

        modal = document.getElementById('simpleModal')
        if (modal)
            window.addEventListener('click', outsideClick)

    }, [])

    // useEffect(() => {

    // }, [props])

    const outsideClick = (e) => {

        if (e.target === modal) {
            setRemove(false)
            setModalData(null)
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
                            {remove && remove === 'user' ?
                                'Remove user'
                                : remove && remove === 'book' ?
                                    'Remove book'
                                    : props.data && props.data.title ?
                                        'Edit book details'
                                        : props.data && props.data.username ?
                                            'Edit user details'
                                            : props.data && props.data === 'addNewBook' ?
                                                'Add new Book'
                                                : props.data && props.data === 'login' ?
                                                    'Login'
                                                    : props.data && props.data === 'register' ?
                                                        'Register'
                                                        : null
                            }
                        </h2>
                    </div>
                    <div className="modal-body">
                        {remove && props.data.username ?
                            <RemoveUser />
                            : remove && props.data.title ?
                                <RemoveBook />
                                : props.data && props.data.title ?
                                    <EditBook data={props.data} />
                                    : props.data && props.data.username ?
                                        <EditProfile />
                                        : props.data && props.data === 'addNewBook' ?
                                            <AddBook />
                                            : props.data && props.data === 'login' ?
                                                <Login />
                                                : props.data && props.data === 'register' ?
                                                    <Register />
                                                    : null
                        }

                    </div>
                </div>
            </div>
        </div>
    )
}
