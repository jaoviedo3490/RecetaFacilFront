
import LoginUserForm from "./Components/LoginUserForm.jsx";
import { useContext} from "react";
import { dataContext } from "./Components/Context/MetricsContext.jsx";
import SideBar from "./Components/InternalComponentsApp/SideBar.jsx";
import MainMenu from "./Components/InternalComponentsApp/mainMenu.jsx";


function App() {
  const { loginSuccess } = useContext(dataContext);
  return (
    <>
      {/*<LoginUserForm />*/}
      <MainMenu></MainMenu>
    </>


  );
}

export default App;
