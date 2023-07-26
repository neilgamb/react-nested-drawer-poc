import { useNavigate } from "react-router-dom";

export const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="page-container-inner not-found">
      <h1 className="header-1">Uh oh, page not found</h1>
      <h3 className="link" onClick={() => navigate("/")}>
        Go back home
      </h3>
    </div>
  );
};
