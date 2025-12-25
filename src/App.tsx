import { BrowserRouter } from "react-router";
import AppRoutes from "./routes/AppRoutes";
import Header from "./components/Header";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <AppRoutes />
    </BrowserRouter>
  );
};

export default App;
