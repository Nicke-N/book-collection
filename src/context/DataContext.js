import React, { useState } from 'react'

export const DataContext = React.createContext()

export const DataProvider = ({children}) => {   
    const [ collection, setCollection ] = useState({})
    const [ authorized, setAuthorized ] = useState(null)
    const [ currentBook, setCurrentBook ] = useState(null)

    return (
    <DataContext.Provider
      value={{
        collection,
        setCollection,
        authorized, 
        setAuthorized,
        currentBook, 
        setCurrentBook
      }}
    >
      {children}
    </DataContext.Provider>
  );
}