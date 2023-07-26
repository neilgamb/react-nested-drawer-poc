import "./App.css";
import { useState, useEffect } from "react";
import {
  BrowserRouter,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";

import { NotFoundPage } from "./pages/404";
import { ProblemPage } from "./pages/ProblemPage";
import { HomePage } from "./pages/HomePage";
import { ProfilePage } from "./pages/ProfilePage";
import { SettingsPage } from "./pages/SettingsPage";

const routes = [
  {
    path: "*",
    name: "Not Found Page",
    element: <NotFoundPage />,
    includeInDrawer: false,
  },
  {
    path: "/problem",
    name: "Problem Page",
    element: <ProblemPage />,
    includeInDrawer: false,
  },
  {
    path: "/",
    name: "Home Page",
    element: <HomePage />,
    includeInDrawer: true,
    menuLevel: "primary",
  },
  {
    path: "/profile",
    name: "Profile Page",
    element: <ProfilePage />,
    includeInDrawer: true,
    menuLevel: "primary",
  },
  {
    path: "/settings",
    name: "Settings Page",
    element: <SettingsPage />,
    includeInDrawer: true,
    menuLevel: "secondary",
  },
];

function Layout({ children }) {
  const location = useLocation();
  const routeName = routes.find(
    (route) => route.path === location.pathname
  )?.name;

  const navigate = useNavigate();

  const [isSecondaryMenuOpen, setIsSecondaryMenuOpen] = useState(false);

  useEffect(() => {
    const isLocationInSecondaryMenu =
      routes.find((route) => route.path === location.pathname)?.menuLevel ===
      "secondary";

    setIsSecondaryMenuOpen(isLocationInSecondaryMenu);
  }, [location]);

  return (
    <div className="site-container">
      <div className="nav-menu-container">
        <div className="nav-menu-primary">
          {routes.map((route, i) => {
            if (route.includeInDrawer && route.menuLevel === "primary") {
              const isCurrentPath = route.path === location.pathname;

              return (
                <div
                  key={i}
                  className={`nav-menu-item-container${
                    isCurrentPath ? " selected" : ""
                  }`}
                  onClick={() => navigate(route.path)}
                >
                  <h3>{route.name}</h3>
                </div>
              );
            } else {
              return null;
            }
          })}
          <div
            className={`nav-menu-item-container sub-option`}
            onClick={() => setIsSecondaryMenuOpen(true)}
          >
            <div className="config-menu-container">
              <h3>Configuation Menu </h3>
              <h3 className="config-menu-icon">⚙</h3>
            </div>
          </div>
        </div>
        <div
          className={`nav-menu-secondary${
            isSecondaryMenuOpen
              ? " secondary-menu-open"
              : " secondary-menu-closed"
          }`}
        >
          <div
            className={`nav-menu-item-container sub-option`}
            onClick={() => setIsSecondaryMenuOpen(false)}
          >
            <h3 className="go-back">⬅ Go back</h3>
          </div>
          {routes.map((route, i) => {
            if (route.includeInDrawer && route.menuLevel === "secondary") {
              const isCurrentPath = route.path === location.pathname;

              return (
                <div
                  key={i}
                  className={`nav-menu-item-container${
                    isCurrentPath ? " selected" : ""
                  }`}
                  onClick={() => navigate(route.path)}
                >
                  <h3>{route.name}</h3>
                </div>
              );
            } else {
              return null;
            }
          })}
        </div>
      </div>
      <div className="main-container">
        <div className="header-container">
          <h1>{routeName}</h1>
        </div>
        <div className="page-container">{children}</div>
      </div>
    </div>
  );
}

function App() {
  return (
    <div className="root">
      <BrowserRouter>
        <Layout>
          <Routes>
            {routes.map((route, key) => (
              <Route key={key} path={route.path} element={route.element} />
            ))}
          </Routes>
        </Layout>
      </BrowserRouter>
    </div>
  );
}

export default App;
