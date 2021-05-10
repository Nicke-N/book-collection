import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { DataContext } from '../context/DataContext'
import { closeModal } from '../kit/Functions'
import { deleteUser } from '../kit/api/User'

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
        <div>
            <p>Are you sure you want to delete account: <b>{userDetails.username}</b> </p>
            <button className='accept-btn' onClick={removeAccount}>Yes</button>
            <button className='reject-btn' onClick={returnToProfile}>No</button>
        </div>
    )
}
