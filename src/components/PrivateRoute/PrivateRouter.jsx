import {Navigate} from "react-router-dom";

const PrivateRouter = ({component: Component, ...props}) => {
  return (
    props.loggedIn ? <Component {...props} /> : <Navigate to='/' />
  );
};

export default PrivateRouter;
