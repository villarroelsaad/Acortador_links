import React, { createContext, useState } from 'react'
// Crea el contexto
const UserContext = createContext()

// Crea un proveedor de contexto
// eslint-disable-next-line react/prop-types
function UserProvider ({ children }) {
  const [user, setUser] = useState('')

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  )
}

export { UserProvider, UserContext }
