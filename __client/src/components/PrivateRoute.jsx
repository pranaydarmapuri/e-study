import { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from '../index'

const ProtectedRoute = ({
  component: Component,
  ...rest
}) => {

  const { authData } = useContext(AuthContext)

  return (
    <Route
      {...rest}
      render={props => {
        if (authData.id) {
          return <Component {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: "/",
                state: {
                  from: props.location
                }
              }}
            />
          );
        }
      }}
    />
  );
};

export default ProtectedRoute