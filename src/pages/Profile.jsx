import React, { useContext, useEffect } from 'react'
import { DataContext } from '../context/DataContext'
import { getUserDetails } from '../kit/api/User'
import { authenticated } from '../kit/Functions'
import './Profile.css'
import Modal from '../components/Modal'
import ButtonRemove from '../components/ButtonRemove'
import ButtonEdit from '../components/ButtonEdit'

export default function Profile() {

    const { authorized, setAuthorized, userDetails, setUserDetails, remove } = useContext(DataContext)


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
                    {/* <button className='profile-btn' onClick={deleteModal}>
                    <img className='profile-icon' src="https://image.freepik.com/free-icon/trash-bin-symbol_318-10194.jpg" alt="URL has changed!" />
                </button>
                <button className='profile-btn' onClick={showModal}>
                    <img className='profile-icon' src="data:image/png;base64,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" alt="URL changed!" />
                </button> */}
                    <Modal data={userDetails} remove={remove} />
                </div>

                :

                null

            }

        </div>
    )
}
