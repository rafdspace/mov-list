import { BrowserRouter } from "react-router";
import AppRouter from "./routes";
import Header from "./components/Header";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <AppRouter />
    </BrowserRouter>
  );
};

export default App;
