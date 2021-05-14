export const authenticated = () => sessionStorage.getItem('token') ? true : false
export const showModal = () => document.getElementById('simpleModal').style.display = 'flex'
export const closeModal = () => document.getElementById('simpleModal').style.display = 'none'
export const addOptions = () => {
    const currYear = new Date().getFullYear()
    var startYear = 2010
    const yearContainer = document.getElementById('year')
    if(yearContainer)
    while(startYear <= currYear) {

        var option = document.createElement('option')
        option.setAttribute('value', startYear)
        option.textContent = startYear
        yearContainer.appendChild(option)
        startYear++
    }
    var month = 1
    const monthContainer = document.getElementById('month')
    if(monthContainer)
    while ( month <= 12) {
        var option = document.createElement('option')
        option.setAttribute('value', month)
        option.textContent = month
        monthContainer.appendChild(option)
        month++
    }
}
export const goBack = () => window.history.back()