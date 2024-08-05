import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const UserPrivateRoute = ({ children }) => {
  const { userToken } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userToken) {
      navigate("/auth/login");
    }
  }, []);

  // Render children only if userToken exists
  return userToken ? <>{children}</> : null;
};

export default UserPrivateRoute;
