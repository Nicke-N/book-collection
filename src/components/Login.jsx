import React, { useContext } from 'react'
import './Sign.css'
import { login } from '../kit/api/User'
import { DataContext } from '../context/DataContext'
import { authenticated, closeModal} from '../kit/Functions'

export default function Login() {

    const { setAuthorized } = useContext(DataContext)

    const submit = async (event) =>  {
        event.preventDefault()
        const details = {username: event.target[0].value, password: event.target[1].value} 

        await login(details)
        .then(() => {
            
            if (authenticated()) {
                setAuthorized(true)
                closeModal()
               
            } else {

                document.getElementById('error').textContent = sessionStorage.getItem('error')
            }
        
        })      
    }

    return (
        <div className='sign-container'>
            <div id='error'></div>
            <form onSubmit={submit} className='sign-container'>
    
                <label className='user-label'>Username</label>
                <input className='user-input' name='username' type="text" maxLength='15'/>
                <label className='user-label'>Password</label>
                <input className='user-input' name='password' type="password" maxLength='15'/>
    

            <button className='accept-btn sign-btn' type='submit' name='Login'>Login</button>
        </form>
        </div>
        
    )
}
