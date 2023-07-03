//css
import "./styles/app.css";
//components
import Page from "./components/pages/Page";
import NotFound from "./components/pages/NotFound";
//react
import { useState, createContext, useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  useNavigate,
} from "react-router-dom";
//js
import Cookies from "js-cookie";

export const UI = createContext();

const getInitialIsDark = () => {
  const initialIsDark = Cookies.get("isDark");
  return initialIsDark ? JSON.parse(initialIsDark) : false;
};

const App = () => {
  const [isDark, setIsDark] = useState(getInitialIsDark());
  useEffect(() => {
    Cookies.set("isDark", JSON.stringify(isDark), { expires: 400 });
  }, [isDark]);

  return (
    <UI.Provider value={{ isDark, setIsDark }}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <div
                className={`app-container ${isDark ? "dark-ui" : "light-ui"}`}
              >
                <Page />
              </div>
            }
          >
            <Route path="/signin" />
            <Route path="/signup" />
          </Route>
          <Route
            path="*"
            element={
              <div
                className={`app-container ${isDark ? "dark-ui" : "light-ui"}`}
              >
                <NotFound />
              </div>
            }
          />
        </Routes>
      </BrowserRouter>
    </UI.Provider>
  );
};

export default App;
