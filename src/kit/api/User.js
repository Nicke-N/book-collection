

export const register = async (details) => {

    const user = {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(details)
    }

    return await fetch('http://localhost:5000/user/register', user)
                 .then(data => data.text())
                 .then(res => {
                     sessionStorage.setItem('registration', `${res}`)
                 })
                 .catch(error => console.log(error))

}
export const login = async (details) => {

    const post = {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(details)
    }

    await fetch('http://localhost:5000/user/login', post)
        .then(data => data.json())
        .then(res => {

            if (res.length > 40) {
                sessionStorage.setItem('token', `Bearer ${res}`)
                return
            } else if (res.length > 20) {
                sessionStorage.setItem('error', `${res}`)
                return
            }
            
        })
        .catch(error => console.log(error))

}


export const getUserDetails = async (username) => {
    const user = {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            'token': sessionStorage.getItem('token'),
            'user': username
        }
    }

      return fetch('http://localhost:5000/user/', user)

}

export const updateUser = async (userID, details) => {

    const user = {
        method: 'PATCH',
        headers: {
            'Content-type': 'application/json',
            'token': sessionStorage.getItem('token')
        },
        body: JSON.stringify(details)
    }

    return fetch(`http://localhost:5000/user/${userID}`, user)

}

export const deleteUser = async (userID) => {

    const user = {
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json',
            'token': sessionStorage.getItem('token')
        }
    }

    return fetch(`http://localhost:5000/user/${userID}`, user)

}