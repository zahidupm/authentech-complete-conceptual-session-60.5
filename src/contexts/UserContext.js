import React, { createContext, useState } from 'react';

const AuthContext = createContext();

const UserContext = ({children}) => {
    const [user, setUser] = useState(null);

    return (
        <AuthContext.Provider value={user}>
            {children}
        </AuthContext.Provider>
    );
};

export default UserContext;