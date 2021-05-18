import React, { useContext, useEffect } from 'react'
import { DataContext } from '../context/DataContext'
import { getUserDetails } from '../kit/api/User'
import { authenticated } from '../kit/Functions'
import './Profile.css'
import Modal from '../components/Modal'
import ButtonRemove from '../components/ButtonRemove'
import ButtonEdit from '../components/ButtonEdit'

export default function Profile() {

    const { authorized, setAuthorized, userDetails, setUserDetails, remove, type } = useContext(DataContext)


    if (authenticated()) setAuthorized(true)

    useEffect(() => {
        if (!userDetails) {
            fetchDetails()
        }
    }, [userDetails])

    const fetchDetails = async () => {
        await getUserDetails('nicke')
            .then(res => res.json())
            .then(data => setUserDetails(data))
    }

    return (
        <div id='profile-container'>
            <div className='details-container'>
                {userDetails && Object.entries(userDetails).map((element) => {
 
                    if (element[0] === 'goodReads' || element[0] === 'instagram') {
                        return (
                            <div className='user-detail'><a href={element[1]}>{element[0]}: Visit my page! </a></div>
                        )
                    } else if (element[0] === 'image') {

                        return (
                            <div>
                                <img src={element[1]} alt="URL has changed!" />
                            </div>
                        )

                    } else if (element[0] !== 'password' && element[0] !== '__v' && element[0] !== '_id') {
                        return (
                            <div className='user-detail'>{element[0]}: {element[1]}</div>
                        )
                    }


                })
                }
            </div>


            {authorized ?

                <div id='btn-container'>
                    <ButtonRemove />
                    <ButtonEdit />
                    <Modal data={userDetails} remove={remove} />
                </div>

                :

                <Modal type={type} />

            }

        </div>
    )
}
