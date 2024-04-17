import { useEffect } from "react"
import { useLocation, Navigate } from "react-router-dom"

export function RequireToken({ children }) {

  useEffect(() => {
    checkAccessToken();
  }, [])

  const checkAccessToken = async () => {
    const accessToken = localStorage.getItem('access_token');
    
  }

  let location = useLocation()

  if (!auth) {
    return <Navigate to='/signin' state={{ from: location }} />;
  }

  return children;
}