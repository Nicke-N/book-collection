import React, { useContext } from 'react'
import { DataContext } from '../context/DataContext'
import { getUserDetails, updateUser, deleteUser } from '../kit/api/User'
import { authenticated } from '../kit/Functions'

export default function Profile() {

    const { authorized, setAuthorized } = useContext(DataContext)

    if (authenticated()) setAuthorized(true)

    return (
        
        authorized ?
            
            <div className='user-details-container'>
                Authorized
            </div>
             
            : 
             
            <div className='user-details-container'> 
                Guest
            </div>
            
    )
}
