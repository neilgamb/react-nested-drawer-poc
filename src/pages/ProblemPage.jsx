import { useNavigate } from "react-router-dom";

export const ProblemPage = () => {
  const navigate = useNavigate();

  return (
    <div className="page-container-inner problem">
      <h1 className="header-1">Uh oh, there was an error</h1>
      <h3 className="link" onClick={() => navigate("/")}>
        Go back home
      </h3>
    </div>
  );
};
