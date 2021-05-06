import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import './Login.css'
import { login } from '../kit/api/User'
import { DataContext } from '../context/DataContext'

export default function Login() {

    const { setAuthorized } = useContext(DataContext)
    const history = useHistory()
    const submit = async (event) =>  {
        event.preventDefault()
        const details = {username: event.target[0].value, password: event.target[1].value} 

        await login(details)
        .then(() => {
            const token = sessionStorage.getItem('token')
            
            if (token) {
                setAuthorized(true)
                history.push('/collection')
               
            } else {
                console.log(sessionStorage.getItem('error'))
                document.getElementById('error').innerHTML = sessionStorage.getItem('error')
            }
        
        })      
        
    }
    return (
        <div>
            <div id='error'></div>
            <form onSubmit={submit}>
            <div>
                Username: 
                <input name='username' type="text" maxLength='15'/>
            </div>
            <div>
                Password: 
                <input name='password' type="password" maxLength='15'/>
            </div>

            <button type='submit' name='Login'>Login</button>
        </form>
        </div>
        
    )
}
