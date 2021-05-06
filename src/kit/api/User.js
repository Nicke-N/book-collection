

export const register = async (details) => {

    const user = {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(details)
    }

    return await fetch('http://localhost:5000/user/register', user)
                 .then(res => res.text())
                 .then(data => sessionStorage.setItem('registration', data))
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
            if (res === "Username doesn't exist!" || res === 'Wrong password!') {
                sessionStorage.setItem('error', `${res}`)
                return
            }

            sessionStorage.setItem('token', `Bearer ${res}`)
         
        })
        .catch(error => console.log(error))

}


export const getUserDetails = async () => {
    const user = {
        method: 'GET',
        headers: {
            'Content-type': 'application/json'
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

    return await fetch(`http:/localhost:5000/user/${userID}`, user)

}

export const deleteUser = async (userID) => {

    const user = {
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json',
            'token': sessionStorage.getItem('token')
        }
    }

    return await fetch(`http:/localhost:5000/user/${userID}`, user)

}