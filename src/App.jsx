
import LoginUserForm from "./Components/LoginUserForm.jsx";
import { useContext } from "react";
import { dataContext } from "./Components/Context/MetricsContext.jsx";
import SideBar from "./Components/InternalComponentsApp/SideBar.jsx";
import MainMenu from "./Components/InternalComponentsApp/mainMenu.jsx";
import { Routes, Route, Navigate } from "react-router-dom";



function App() {
  const { loginSuccess } = useContext(dataContext);
  return (
    <>
      <Routes>
        <Route path='/login' element={loginSuccess ? <Navigate to='/home' /> : <LoginUserForm />}></Route>
        <Route path='/home' element={loginSuccess ? <MainMenu/> : <Navigate to='/login'/>}></Route>
        <Route path='*' element={<Navigate to={loginSuccess ? "/main" : "/login"} />}></Route>
      </Routes>
    </>


  );
}

export default App;
