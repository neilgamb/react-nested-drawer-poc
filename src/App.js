import "./App.css";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";

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
    protected: false,
  },
  {
    path: "/problem",
    name: "Problem Page",
    element: <ProblemPage />,
    includeInDrawer: false,
    protected: false,
  },
  {
    path: "/",
    name: "Home Page",
    element: <HomePage />,
    includeInDrawer: false,
    protected: false,
  },
  {
    path: "/profile",
    name: "Profile Page",
    element: <ProfilePage />,
    includeInDrawer: false,
    protected: false,
  },
  {
    path: "/settings",
    name: "Settings Page",
    element: <SettingsPage />,
    includeInDrawer: false,
    protected: false,
  },
];

function Layout({ children }) {
  const location = useLocation();
  const routeName = routes.find(
    (route) => route.path === location.pathname
  )?.name;

  return (
    <div className="site-container">
      <div className="nav-menu-container"></div>
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
