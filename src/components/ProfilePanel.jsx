import React, { useContext, useEffect } from 'react'
import { DataContext } from '../context/DataContext'
import './ProfilePanel.css'
import { getUserDetails } from '../kit/api/User'

export default function ProfilePanel() {

    const { userDetails, setUserDetails } = useContext(DataContext)

    useEffect(() => {
        if (!userDetails) fetchDetails()
    }, [])

    const fetchDetails = async () => {
        await getUserDetails('nicke')
            .then(res => res.json())
            .then(data => setUserDetails(data))
    }

    return (
        <div id='user-info-panel'>
            {userDetails ?
                <div id='general-container'>
                    <div >
                        <img className='panel-img' src={userDetails.image} alt="Error loading image!" />
                    </div>
                    <div className='general-info'>
                        {userDetails.name}
                    </div>
                    <div className='general-info'>
                        {userDetails.email}
                    </div>
                    <div className='general-info'>
                        <a href={userDetails.instagram}>@Instagram</a>
                    </div>
                    <div className='general-info'>
                        <a href={userDetails.goodReads}>@GoodReads</a>
                    </div>
                    <textarea className='general-info panel-description' cols='10' rows='10' readOnly>
                    
                        {userDetails.description}
                      
                    </textarea>
                </div>
                : null
            }

            <div id='admin-container'>

            </div>
        </div >
    )
}
