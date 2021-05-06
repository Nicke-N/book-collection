import React, { useState } from 'react'

export const DataContext = React.createContext()

export const DataProvider = ({children}) => {   
    const [ collection, setCollection ] = useState({})
    
    
    return (
    <DataContext.Provider
      value={{
        collection,
        setCollection
      }}
    >
      {children}
    </DataContext.Provider>
  );
}