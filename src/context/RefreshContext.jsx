import React, { createContext, useContext, useState } from 'react';

const RefreshContext = createContext();

export const RefreshProvider = ({ children }) => {
  const [refreshCount, setRefreshCount] = useState(0);
  
  return (
    <RefreshContext.Provider value={{ refreshCount, setRefreshCount }}>
      {children}
    </RefreshContext.Provider>
  );
};

export const useRefresh = () => {
  return useContext(RefreshContext);
};
