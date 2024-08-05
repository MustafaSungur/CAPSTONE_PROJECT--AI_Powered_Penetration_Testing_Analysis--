import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

const AuthLaout = () => {
  const { userToken } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (userToken) {
      navigate("/user/dashboard");
    }
  }, [userToken, navigate]);

  return (
    <>
      <Outlet />
    </>
  );
};

export default AuthLaout;
