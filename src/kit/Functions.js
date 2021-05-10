export const authenticated = () => sessionStorage.getItem('token') ? true : false

export const showModal = () => document.getElementById('simpleModal').style.display = 'flex'
export const closeModal = () => document.getElementById('simpleModal').style.display = 'none'