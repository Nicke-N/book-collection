import React, { useContext, useEffect } from 'react'
import { DataContext } from '../context/DataContext'
import './ProfilePanel.css'
import { getUserDetails } from '../kit/api/User'
import PanelPlank from './PanelPlank'

export default function ProfilePanel() {

    const { userDetails, setUserDetails } = useContext(DataContext)
    const description = document.getElementById('panel-description')
   
    useEffect(() => {
       
        if (!userDetails) fetchDetails()

        console.log('effect')
    }, [userDetails])

    const fetchDetails = async () => {
        if (description) description.value = ''
        await getUserDetails('nicke')
            .then(res => res.json())
            .then(data => setUserDetails(data))
    }
    if (userDetails)
    console.log(userDetails.description)
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
                    <PanelPlank />
                    <div className='general-info'>
                        {userDetails.email}
                    </div>
                    <PanelPlank />
                    <div className='general-info'>
                        <a href={userDetails.instagram}>@Instagram</a>
                    </div>
                    <PanelPlank />
                    <div className='general-info'>
                        <a href={userDetails.goodReads}>@GoodReads</a>
                    </div>
                    <PanelPlank />
                    <textarea id='panel-description' className='general-info panel-description' cols='10' rows='10' readOnly>
                    
                        {userDetails.description}
                      
                    </textarea>
                    <PanelPlank />
                </div>
                : null
            }

            <div id='admin-container'>

            </div>
        </div >
    )
}
