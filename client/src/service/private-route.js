import { Navigate, useLocation } from 'react-router-dom';
export function RequireAuth({ children }) {
  const TokenData = localStorage.getItem('Token');
  let location = useLocation();
  if (!TokenData) {
    return <Navigate to='/Sign-in' state={{ from: location }} />;
  }
  return children;
}
export function NotAuth({ children }) {
  const TokenData = localStorage.getItem('Token');
  if (TokenData) {
    return <Navigate to='/' />;
  }
  return children;
}
