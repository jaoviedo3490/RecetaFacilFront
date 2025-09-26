import { createContext, useState, useEffect } from "react";
const dataContext = createContext({});

const UserProvide = ({ children }) => {


    const [userName, setUserName] = useState('');
    const [loginSuccess, setLoginSuccess] = useState(false);
    const [openDrawer, setOpenDrawer] = useState(true);
    const [top, setTop] = useState('65');
    const [isMobile, setIsMobil] = useState(false);
    const [eChartData, setChartData] = useState([]);
    const [collectionData, setCollectionData] = useState(0);
    const [recetasToday, setToday] = useState(0);
    const [menuOptions,setOptions] = useState('dashboard');
    const correo = localStorage.getItem("correo");
    const token = localStorage.getItem('barer');


    useEffect(() => {
        if (!correo) return;
        let formdata = new FormData();
        formdata.append('mail', correo);
        formdata.append('token', token);
        formdata.append('protocol', 'getVar');

        debugger;
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
                default:
                    localStorage.removeItem("correo"); debugger;
                    localStorage.removeItem("barer"); debugger;
                    setLoginSuccess(false);
                    break;
            }
        });
    }, [])
    return (
        <>
            <dataContext.Provider value={{menuOptions,setOptions,eChartData,setChartData, userName, collectionData,setCollectionData,setUserName, loginSuccess,recetasToday, setLoginSuccess,setToday, openDrawer, setOpenDrawer, top, setTop, isMobile, setIsMobil }}>
                {children}
            </dataContext.Provider>
        </>
    )
}

export { dataContext, UserProvide };