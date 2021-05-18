import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import './NavigationPanel.css'
import { goBack, showModal  } from '../kit/Functions'
import { DataContext } from '../context/DataContext'

export default function NavigationPanel() {
    const { setType } = useContext(DataContext)
    
    const loginModal = () => {
        setType('login')
        showModal()
    }

    const registerModal = () => {
        setType('register')
        showModal()
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
                                Latest reads
                            </div>

                        </Link>
                    </li>
                    <li>
                        <Link to='/profile'>
                            <div className='nav-text'>
                                Profile
                            </div>

                        </Link>
                    </li>

                    <li >
                        <Link onClick={goBack}>
                            <div className='nav-text'>
                                Return
                            </div>
                        </Link>
                    </li>
                </ul>
            </div>
            <div id='admin-section'>
                <ul>
                    <li>
                        <Link onClick={loginModal}>
                            <div className='nav-text'>
                                Login
                            </div>
                        </Link>
                    </li>
                    <li>
                        <Link onClick={registerModal}>
                            <div className='nav-text'>
                                Register
                            </div>
                        </Link>
                    </li>
                </ul>
            </div>
            
        </div>
    )
}
