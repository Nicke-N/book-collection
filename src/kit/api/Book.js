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
      method: 'DELETE'
  }

    return fetch(`http://localhost:5000/collection/${bookID}`, book)

}

export const editBook = async (bookID, newBook) => {
  const book = {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json'
    },
      body: JSON.stringify(newBook)
  }

    return fetch(`http://localhost:5000/collection/${bookID}`, book)

}

export const addBook = async (post) => {
    
        const book = {
          method: 'POST',
          headers: {
              'Content-type': 'application/json'
          },
          body: JSON.stringify(post)
        }
    
        await fetch('http://localhost:5000/collection/', book)
          .then(res => {return res})
          .catch(err => console.log(err))
      
      
}