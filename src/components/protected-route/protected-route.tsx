type ProtectedRouteProps = {
  children: React.ReactElement;
  isProtected?: boolean;
};

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => children;
