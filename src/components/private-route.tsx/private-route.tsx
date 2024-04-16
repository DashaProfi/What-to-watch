import { Navigate } from 'react-router-dom';
import { AppRoutes, AuthorizationStatus } from '../../const/const';
import { useSelector } from 'react-redux';
import { AppState } from '../../types/store';
interface PrivateRouteProps {
  children: JSX.Element;
}

const PrivateRoute = ({ children }: PrivateRouteProps): JSX.Element => {
  const { authorizationStatus } = useSelector((state: AppState) => state.user);
  return authorizationStatus === AuthorizationStatus.AUTH ? (
    children
  ) : (
    <Navigate to={AppRoutes.SignIn} />
  );
};

export default PrivateRoute;
