import React, { useState } from 'react'

export const DataContext = React.createContext()

export const DataProvider = ({children}) => {   
    const [ collection, setCollection ] = useState({})
    const [ authorized, setAuthorized ] = useState(null)
    const [ currentBook, setCurrentBook ] = useState(null)
    const [ userDetails, setUserDetails] = useState(null)
    const [ remove, setRemove ] = useState(false)
    const [ searchVal, setSearchVal ] = useState(null)
    const [ filterOption, setFilterOption ] = useState(null)
    const [ userIP, setUserIP ]  = useState(null)
    const [ type, setType ] = useState(null)
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
        setRemove,
        filterOption, 
        setFilterOption,
        searchVal, 
        setSearchVal,
        userIP, 
        setUserIP,
        type,
        setType
      }}
    >
      {children}
    </DataContext.Provider>
  );
}