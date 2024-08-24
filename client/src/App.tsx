import { useRoutes } from "react-router-dom";
import { routerConfig } from "./routes";

function App() {
  const routes = useRoutes(routerConfig);
  return <>{routes}</>;
}

export default App;
