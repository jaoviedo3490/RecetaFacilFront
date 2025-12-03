import { useContext } from "react";
import { dataContext } from "../Context/MetricsContext";
import OverView from "./MenuOptions/overView";
import NewReceta from "./MenuOptions/newReceta";
import NewCollection from "./MenuOptions/NewCollection";
import Graphics from "./MenuOptions/Graphics";

const MainContent = () => {
  const { menuOptions } = useContext(dataContext);

  const components = {
    dashboard: <OverView />,
    receta: <NewReceta />,
    collection: <NewCollection/>,
    graficos:<Graphics/>
  };

  return components[menuOptions] || <OverView />;
};

export default MainContent;
