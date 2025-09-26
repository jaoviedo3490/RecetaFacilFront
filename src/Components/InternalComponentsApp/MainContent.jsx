import { useContext } from "react";
import { dataContext } from "../Context/MetricsContext";
import OverView from "./MenuOptions/overView";
import NewReceta from "./MenuOptions/newReceta";

const MainContent = () => {
  const { menuOptions } = useContext(dataContext);

  const components = {
    dashboard: <OverView />,
    receta: <NewReceta />
  };

  return components[menuOptions] || <OverView />;
};

export default MainContent;
