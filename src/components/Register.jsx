import React, { useContext } from 'react'
import './Sign.css'
import { register, login } from '../kit/api/User'
import { DataContext } from '../context/DataContext'
import { authenticated, closeModal } from '../kit/Functions'

export default function Register() {


    const { setAuthorized } = useContext(DataContext)
    const submit = async (event) => {
        event.preventDefault()
        const details = {
            username: event.target[0].value,
            password: event.target[1].value,
            name: event.target[2].value,
            email: event.target[3].value,
            instagram: event.target[4].value,
            goodReads: event.target[5].value,
            description: event.target[6].value
        }


        await register(details)
            .then(async () => {
                const registration = sessionStorage.getItem('registration')
                if (registration === 'User was created!') {
                    await login({ username: details.username, password: details.password })
                        .then(authenticated() ? setAuthorized(true) : document.getElementById('error').textContent = 'Login failed for no reason!')
                        .then(closeModal())
                } else {

                    document.getElementById('error').textContent = registration
                }

            })

    }

    return (
        <div className='sign-container'>
            <div id='error'></div>
            <form onSubmit={submit} className='sign-container'>
                <label className='user-label'>Username</label>
                <input className='user-input' name='username' type="text" maxLength='15' />

                <label className='user-label'>Password</label>
                <input className='user-input' name='password' type="password" maxLength='15' />

                <label className='user-label'>Name</label>
                <input className='user-input' name='name' type="text" maxLength='15' />

                <label className='user-label'>Email</label>
                <input className='user-input' name='email' type="email" maxLength='50' />

                <label className='user-label'>instagram</label>
                <input className='user-input' name='instagram' type="text" maxLength='200' />


                <label className='user-label'>GoodReads</label>
                <input className='user-input' name='goodReads' type="text" maxLength='200' />

                <label className='user-label'>Description</label>
                <textarea className='user-text-area' name="description"  maxLength='200'></textarea>


                <button type='submit' name='register' className='accept-btn sign-btn'>Register</button>
            </form>
        </div>
    )
}
