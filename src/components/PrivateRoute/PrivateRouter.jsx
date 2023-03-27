import { Navigate } from "react-router-dom";

const PrivateRouter = ({ component: Component, ...props }) => {
  return (
    props.loggedIn ? <Component { ...props } /> : <Navigate to='/signin' />
  );
};

export default PrivateRouter;
