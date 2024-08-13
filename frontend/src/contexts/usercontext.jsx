import React, { createContext, useContext, useState } from 'react';

// Create the User Context
const UserContext = createContext();

// Create a provider component
export const UserProvider = ({ children }) => {
  // State to manage authentication status
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  return (
    <UserContext.Provider value={[isAuthenticated,setIsAuthenticated]}>
      {children}
    </UserContext.Provider>
  );
};


export default UserContext
