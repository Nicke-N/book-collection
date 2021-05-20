import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './NavigationPanel.css'
import { goBack, showModal } from '../kit/Functions'
import { DataContext } from '../context/DataContext'
import PanelPlank from './PanelPlank'

export default function NavigationPanel() {
    const { authorized, setAuthorized, currentLocation, setModalData} = useContext(DataContext)

    useEffect(() => {

    }, [currentLocation])

    const loginModal = () => {
        setModalData('login')
        showModal()
    }

    const registerModal = () => {
        setModalData('register')
        showModal()
    }

    const addBookModal = () => {
        setModalData('addNewBook')
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
                    <PanelPlank />
                    <li>
                        <Link to='/latest'>
                            <div className='nav-text'>
                                Latest
                            </div>

                        </Link>
                    </li>
                    <PanelPlank />
                    {authorized ?
                        <>
                        <li>
                            <Link to='/profile'>
                                <div className='nav-text'>
                                    Profile
                            </div>

                            </Link>
                        </li>
                        <PanelPlank />
                        </>
                        : null
                    }


                    <li >
                        <Link onClick={goBack}>
                            <div className='nav-text'>
                                Return
                            </div>
                        </Link>
                    </li>
                    <PanelPlank />
                </ul>
            </div>
            <div>
                <ul>
                    {authorized ?
                    <>
                        <li>
                            <Link onClick={logout}>
                                <div className='nav-text'>
                                    Logout
                            </div>
                            </Link>
                        </li>
                        <PanelPlank />
                        </>
                        :
                        <>
                        <li>
                            <Link onClick={loginModal}>
                                <div className='nav-text'>
                                    Login
                            </div>
                            </Link>
                        </li>
                        <PanelPlank />
                        </>
                    }

                    <li>
                        <Link onClick={registerModal}>
                            <div className='nav-text'>
                                Register
                            </div>
                        </Link>
                    </li>
                    <PanelPlank />
                </ul>
            </div>
            <div id='admin-section'>
                {authorized ?
                    <>
                    <ul>
                        <li>
                            <Link onClick={addBookModal}>
                                <div className='nav-text'>
                                    Add book
                            </div>
                            </Link>
                        </li>
                        <PanelPlank />
                    </ul>
                  
                    </>
                    : null
                }

            </div>
         
        </div>
    )
}
