import React from 'react'
import { useHistory } from 'react-router-dom'
import './Register.css'
import { register, login } from '../kit/api/User'

export default function Register() {

    const history = useHistory()

    const submit = async (event) => {
        event.preventDefault()
        const details = {
            username: event.target[0].value,
            password: event.target[1].value,
            name: event.target[2].value,
            email: event.target[3].value,
            description: event.target[4].value
        }


        await register(details)
        .then( async () => {
            const registration = sessionStorage.getItem('registration')
            if (registration === 'User was created!' ) {
                await login({username: details.username, password: details.password})
                .then(history.push('/collection'))
            } else {
   
                document.getElementById('error').innerHTML = registration
            }
            
        })

    }

    return (
        <>
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
            <div>
                Name: 
                <input name='name' type="text" maxLength='15'/>
            </div>
            <div>
                Email: 
                <input name='email' type="email" maxLength='15'/>
            </div>
            <div>
                Description: 
                <textarea name="description" cols="20" rows="10" maxLength='200'></textarea>
            </div>

            <button type='submit' name='register'>Register</button>
        </form>
        </>
    )
}
