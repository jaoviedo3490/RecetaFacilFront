import { createContext, useState, useEffect } from "react";
const dataContext = createContext({});

const UserProvide = ({ children }) => {


    const [userName, setUserName] = useState('');
    const [loginSuccess, setLoginSuccess] = useState(false);
    const [openDrawer, setOpenDrawer] = useState(true);
    const [top, setTop] = useState('65');
    const [isMobile, setIsMobil] = useState(false);
    const correo = localStorage.getItem("correo");


    useEffect(() => {
        if (!correo) return;
        let formdata = new FormData();
        formdata.append('mail', correo);
        formdata.append('protocol', 'getVar');
        debugger;
        alert("A ver");
        fetch('http://localhost/recetaFacil/RecetaFacil.com/public/Services/login/Jwt/Auth', {
            method: 'POST',
            body: formdata
        }).then(response => {
            if (!response.ok) {
                alert("Ocurrio un error al validar su sesion");
                return response.json();
            }
            return response.json();
        }).then(data => {
            switch (data.data.Code) {
                case "200":
                    setLoginSuccess(true);
                    break;
                default: localStorage.removeItem("correo"); debugger;
                    setLoginSuccess(false);
                    break;
            }
        });
    }, [])
    return (
        <>
            <dataContext.Provider value={{ userName, setUserName, loginSuccess, setLoginSuccess, openDrawer, setOpenDrawer, top, setTop, isMobile, setIsMobil }}>
                {children}
            </dataContext.Provider>
        </>
    )
}

export { dataContext, UserProvide };