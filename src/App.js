import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

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

function App() {
  return (
    <div className="root">
      <BrowserRouter>
        <Routes>
          {routes.map((route, key) => (
            <Route key={key} path={route.path} element={route.element} />
          ))}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
