import React, { useState } from 'react'

export const DataContext = React.createContext()

export const DataProvider = ({children}) => {   
    const [ collection, setCollection ] = useState({})
    const [ authorized, setAuthorized ] = useState(null)
    const [ currentBook, setCurrentBook ] = useState(null)
    const [ userDetails, setUserDetails] = useState(null)
    const [ remove, setRemove ] = useState(false)
    return (
    <DataContext.Provider
      value={{
        collection,
        setCollection,
        authorized, 
        setAuthorized,
        currentBook, 
        setCurrentBook,
        userDetails,
        setUserDetails,
        remove, 
        setRemove
      }}
    >
      {children}
    </DataContext.Provider>
  );
}