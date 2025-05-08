import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/Auth/Selectors";

const MinimalLayout = () => {
  const navigate = useNavigate();
  const user = useSelector(selectUser);

  useEffect(() => {
    if (user?.id) {
      navigate("/dashboard");
    }
  }, []);

  return (
    <>
      <Outlet />
    </>
  );
};

export default MinimalLayout;
