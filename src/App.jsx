import LoginUserForm from "./Components/LoginUserForm.jsx";
import { useContext, useEffect, useMemo } from "react";
import { dataContext } from "./Components/Context/MetricsContext.jsx";
import MainMenu from "./Components/InternalComponentsApp/mainMenu.jsx";
import { Routes, Route, Navigate } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

function App() {
  const { loginSuccess, isLightmode } = useContext(dataContext);
  localStorage.removeItem("tempData");
  localStorage.removeItem("email");


  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = "";
    };
    window.addEventListener("pagehide", handleBeforeUnload);
    return () => {
      window.removeEventListener("pagehide", handleBeforeUnload);
    };
  }, []);

  return (

    <Routes>
      <Route
        path="/login"
        element={loginSuccess ? <Navigate to="/home" /> : <LoginUserForm />}
      />
      <Route
        path="/home"
        element={loginSuccess ? <MainMenu /> : <Navigate to="/login" />}
      />
      <Route path="/nueva/receta" element={loginSuccess ? <MainMenu /> : <Navigate to="/login" />} />
      <Route
        path="*"
        element={<Navigate to={loginSuccess ? "/home" : "/login"} />}
      />
    </Routes>

  );
}

export default App;
