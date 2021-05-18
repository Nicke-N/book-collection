import React, { useContext } from 'react'
import Delete from '../images/delete.svg'
import { showModal } from '../kit/Functions'
import { DataContext } from '../context/DataContext'

export default function ButtonRemove() {

    const { setRemove } = useContext(DataContext)
    const deleteModal = () => {
        
        setRemove(true)
        showModal()
       
    }

    return (
        <button className='profile-icon' onClick={deleteModal}>
            <img className='delete-icon profile-icon' src={Delete} alt="Icon is loading" />
        </button>
    )
}
