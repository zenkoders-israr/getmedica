import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/Auth/Selectors";

const ACL = ({ children, allowed = [] }) => {
  const _user = useSelector(selectUser);

  return allowed?.includes(_user?.user_type) ? children : null;
};

ACL.propTypes = {
  children: PropTypes.node,
  allowed: PropTypes.arrayOf(PropTypes.string),
};

export default ACL;
