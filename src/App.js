import "./App.css";
import { useState, useEffect, useCallback } from "react";
import {
  BrowserRouter,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import classNames from "classnames";

import { NotFoundPage } from "./pages/404";
import { ProblemPage } from "./pages/ProblemPage";
import { AppointmentAuditPage } from "./pages/AppointmentAuditPage";
import { AppointmentTypeCustomization } from "./pages/AppointmentTypeCustomization";

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
    path: "/appointment-audit",
    name: "Appointment Audit",
    element: <AppointmentAuditPage />,
    includeInDrawer: true,
    menuLevel: "primary",
  },
  {
    path: "/appointment-type-customization",
    name: "Appointment Type Customization",
    element: <AppointmentTypeCustomization />,
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
  const [isMounted, setIsMounted] = useState(false);

  const runNavCheck = useCallback(() => {
    const isLocationInSecondaryMenu =
      routes.find((route) => route.path === location.pathname)?.menuLevel ===
      "secondary";

    setIsSecondaryMenuOpen(isLocationInSecondaryMenu);
  }, [location.pathname]);

  useEffect(() => {
    runNavCheck();
  }, [runNavCheck, location]);

  useEffect(() => {
    setTimeout(() => {
      setIsMounted(true);
    }, 0);
  }, [setIsMounted]);

  if (location.pathname === "/problem") {
    return <ProblemPage />;
  }

  if (!routes.some((route) => route.path === location.pathname)) {
    return <NotFoundPage />;
  }

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
              <h3 className="config-menu-icon">⬅</h3>
            </div>
          </div>
        </div>
        <div
          className={classNames(
            "nav-menu-secondary",
            { "secondary-menu-transition": isMounted },
            { "secondary-menu-open": isSecondaryMenuOpen },
            { "secondary-menu-closed": !isSecondaryMenuOpen }
          )}
        >
          <div
            className={`nav-menu-item-container sub-option`}
            onClick={() => setIsSecondaryMenuOpen(false)}
          >
            <div className="main-menu-container">
              <h3 className="main-menu-icon">⬅</h3>
              <h3>Main Menu </h3>
            </div>
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
      <div className="main-container" onClick={runNavCheck}>
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
