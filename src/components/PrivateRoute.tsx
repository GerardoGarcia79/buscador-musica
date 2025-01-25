import { Navigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const PrivateRoute = ({ children }: Props) => {
  const { session } = UserAuth();

  if (session === undefined) {
    return <p>Loading...</p>;
  }

  return <>{session ? <>{children}</> : <Navigate to="/signin" />}</>;
};

export default PrivateRoute;
