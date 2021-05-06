export const getCollection = async () => {
    const books = {
        method: 'GET',
        headers: {
            'Content-type': 'application/json'
        }
    }

      return fetch('http://localhost:5000/collection/', books)

}

export const getBook = async (bookID) => {
  const book = {
      method: 'GET',
      headers: {
          'Content-type': 'application/json'
      }
  }

    return fetch(`http://localhost:5000/collection/${bookID}`, book)

}

export const deleteBook = async (bookID) => {
  const book = {
    method: 'DELETE',
    headers: {
      'Content-type': 'application/json',
      'token': sessionStorage.getItem('token')
    }
  }

    return fetch(`http://localhost:5000/collection/${bookID}`, book)

}

export const editBook = async (bookID, newBook) => {

  const book = {
    method: 'PATCH',
    headers: {
      'Content-type': 'application/json',
      'token': sessionStorage.getItem('token')
    },
    body: JSON.stringify(newBook)
  }

    return fetch(`http://localhost:5000/collection/${bookID}`, book)

}

export const addBook = async (post) => {
    
        const book = {
          method: 'POST',
          headers: {
              'Content-type': 'application/json',
              'token': sessionStorage.getItem('token')
          },
          body: JSON.stringify(post)
        }
    
      return await fetch('http://localhost:5000/collection/', book)
      
      
}