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
        <div id='edit-coontainer'>
                    <form onSubmit={updateUserDetails}>  
            {userDetails ? Object.entries(userDetails).map((element) => {

                if (element[0] === 'password') {
                    return (
                        <>
                            <div className='user-detail'>
                            <label htmlFor='oldPassword'>Old Password</label>
                                <input maxLength='20' type='password' for='oldPassword' id='oldPassword'></input>
                            </div>
                            <div className='user-detail'>
                                <label htmlFor={element[0]}>{element[0]}</label>
                                <input maxLength='20' type='password' for={element[0]} id={element[0]}></input>
                            </div>
                        </>
                    )
                } else if (element[0] === 'description') {
                    return (
                        <div className='user-detail'>
                            <label htmlFor={element[0]}>{element[0]}</label>
                            <textarea maxLength='200' type='text' for={element[0]} id={element[0]}></textarea>
                        </div>
                    )
                } else if (element[0] === 'goodReads' || element[0] === 'instagram' || element[0] === 'image') {
                    return (
                        <div className='user-detail'>
                            <label htmlFor={element[0]}>{element[0]}</label>
                            <input maxLength='200' type='text' for={element[0]} id={element[0]}></input>
                        </div>
                    )
                } else if (element[0] !== '_id' && element[0] !== '__v') {
                    return (
                        <div className='user-detail'>
                            <label htmlFor={element[0]}>{element[0]}</label>
                            <input maxLength='20' type='text' for={element[0]} id={element[0]}></input>
                        </div>
                    )
                }

            }) : (
                <div>Error loading data</div>
            )}
            <button type='submit' name='update'>Update User</button>
        </form>

        </div>


    )
}
