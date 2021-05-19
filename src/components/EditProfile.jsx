import React, { useEffect, useContext } from 'react'
import { updateUser, getUserDetails } from '../kit/api/User'
import { DataContext } from '../context/DataContext'
import {closeModal} from '../kit/Functions'

export default function EditProfile() {

    const { userDetails, setUserDetails } = useContext(DataContext)

    useEffect(() => {
        fillFields()
    }, [])

    const fillFields = () => {
        Object.entries(userDetails).map((element) => {
            if (element[0] !== '__v' && element[0] !== '_id' && element[0] !== 'description' && element[0] !== 'password')
                document.getElementById(element[0]).value = element[1]
        })
    }

    const updateUserDetails = async (e) =>  {
        e.preventDefault();
        const array = Array.from(e.target)
       
        var newDetails = {}
        array.map(element => element.value && element.value !== '' ? newDetails[element.id] = element.value : null )

        await updateUser(userDetails._id, newDetails)
        .then( async () => {
            await getUserDetails(newDetails.username)
            .then(res => res.json())
            .then(data => setUserDetails(data))
            .then(closeModal())
        })
        
    }

    return (
        <div id='edit-container'>
                    <form onSubmit={updateUserDetails} className='sign-container'>  
            {userDetails ? Object.entries(userDetails).map((element) => {

                if (element[0] === 'password') {
                    return (
                        <>
                            <>
                            <label className='user-label' htmlFor='oldPassword'>Old Password</label>
                                <input className='user-input' maxLength='20' type='password' for='oldPassword' id='oldPassword'></input>
                            </>
                            <>
                                <label className='user-label' htmlFor={element[0]}>New Password</label>
                                <input className='user-input' maxLength='20' type='password' for={element[0]} id={element[0]}></input>
                            </>
                        </>
                    )
                } else if (element[0] === 'description') {
                    return (
                        <>
                            <label className='user-label' htmlFor={element[0]}>{element[0]}</label>
                            <textarea maxLength='200' type='text' for={element[0]} id={element[0]}>{element[1]}</textarea>
                        </>
                    )
                } else if (element[0] === 'goodReads' || element[0] === 'instagram' || element[0] === 'image') {
                    return (
                        <>
                            <label className='user-label' htmlFor={element[0]}>{element[0]}</label>
                            <input className='user-input' maxLength='200' type='text' for={element[0]} id={element[0]}></input>
                        </>
                    )
                } else if (element[0] !== '_id' && element[0] !== '__v') {
                    return (
                        <>
                            <label className='user-label' htmlFor={element[0]}>{element[0]}</label>
                            <input className='user-input' maxLength='20' type='text' for={element[0]} id={element[0]}></input>
                        </>
                    )
                }

            }) : (
                <div>Error loading data</div>
            )}
            <button type='submit' className='accept-btn sign-btn' name='update'>Update User</button>
        </form>

        </div>


    )
}
