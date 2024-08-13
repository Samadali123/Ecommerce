import React, { createContext, useContext, useState } from 'react';

// Create the User Context
const AdminContext = createContext();

// Create a provider component
export const AdminProvider = ({ children }) => {
  // State to manage authentication status
  const [adminisAuthenticated, setadminIsAuthenticated] = useState(false);
  return (
    <AdminContext.Provider value={[adminisAuthenticated,setadminIsAuthenticated]}>
      {children}
    </AdminContext.Provider>
  );
};


export default AdminContext
