import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { DataContext } from '../context/DataContext'
import { closeModal } from '../kit/Functions'
import { deleteUser } from '../kit/api/User'
import './RemoveUser.css'

export default function RemoveUser() {

    const { userDetails, setRemove, setAuthorized } = useContext (DataContext)
    const history = useHistory()
    const removeAccount = async () => {

        await deleteUser(userDetails._id)
        setRemove(false)
        closeModal()
        setAuthorized(false)
        history.push('/register')
       
    }

    const returnToProfile = () => {
        setRemove(false)
        closeModal()
    }
    
    return (
        <div className='remove-container'>
            <p className='remove-text'>Are you sure you want to delete account: <b>{userDetails.username}</b> </p>
            <div className='remove-btn-container'>
                <button className='accept-btn' onClick={removeAccount}>Yes</button>
                <button className='reject-btn' onClick={returnToProfile}>No</button>
            </div>
                
        </div>
    )
}
