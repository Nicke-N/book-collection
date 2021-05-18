import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './NavigationPanel.css'
import { goBack, showModal } from '../kit/Functions'
import { DataContext } from '../context/DataContext'
import Modal from './Modal'
import AddBook from './AddBook'

export default function NavigationPanel(props) {
    const { setType, authorized, setAuthorized, currentLocation } = useContext(DataContext)

    useEffect(() => {

    }, [currentLocation])

    const loginModal = () => {
        setType('login')

        showModal()

    }

    const registerModal = () => {
        setType('register')

        showModal()
    }

    const addBookModal = () => {
        setType('addNewBook')
        showModal()
    }

    const logout = () => {
        setAuthorized(null)
        sessionStorage.removeItem('token')
    }

    return (
        <div id='navigation-panel'>
            <div id='general-section'>
                <ul>
                    <li>
                        <Link to='/'>
                            <div className='nav-text'>
                                Collection
                            </div>

                        </Link>
                    </li>
                    <li>
                        <Link to='/latest'>
                            <div className='nav-text'>
                                Latest
                            </div>

                        </Link>
                    </li>
                    {authorized ?
                        <li>
                            <Link to='/profile'>
                                <div className='nav-text'>
                                    Profile
                            </div>

                            </Link>
                        </li>
                        : null
                    }


                    <li >
                        <Link onClick={goBack}>
                            <div className='nav-text'>
                                Return
                            </div>
                        </Link>
                    </li>
                </ul>
            </div>
            <div>
                <ul>
                    {authorized ?
                        <li>
                            <Link onClick={logout}>
                                <div className='nav-text'>
                                    Logout
                            </div>
                            </Link>
                        </li>
                        :
                        <li>
                            <Link onClick={loginModal}>
                                <div className='nav-text'>
                                    Login
                            </div>
                            </Link>
                        </li>
                    }

                    <li>
                        <Link onClick={registerModal}>
                            <div className='nav-text'>
                                Register
                            </div>
                        </Link>
                    </li>
                </ul>
            </div>
            <div id='admin-section'>
                {authorized ?

                    <ul>
                        <li>
                            <Link onClick={addBookModal}>
                                <div className='nav-text'>
                                    Add book
                            </div>
                            </Link>
                        </li>
                    </ul>

                    : null
                }

            </div>
            {/* <Modal type={type}/> */}
        </div>
    )
}
