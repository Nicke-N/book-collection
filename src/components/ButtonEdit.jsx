import React from 'react'
import Edit from '../images/edit.svg'
import { showModal } from '../kit/Functions'

export default function ButtonEdit() {
    return (
        <button className='profile-icon' onClick={showModal}>
            <img className='profile-icon' src={Edit} alt="icon is loading" />
        </button>
    )
}
