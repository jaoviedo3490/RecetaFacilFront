import { createContext, useState } from "react";
const dataContext = createContext({});
const UserProvide = ({ children }) => {

    
    const [userName, setUserName] = useState('');
    const [loginSuccess, setLoginSuccess] = useState(false);

    return (
        <>
            <dataContext.Provider value={{ userName, setUserName, loginSuccess, setLoginSuccess }}>
                {children}
            </dataContext.Provider>
        </>
    )
}

export { dataContext, UserProvide };