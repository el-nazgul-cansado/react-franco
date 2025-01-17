import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const ProtectedRoute = ({ toIndex, children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (toIndex !== 0) {
      // Redirige si toIndex no es 0
      navigate('/'); // Ruta a la que rediriges (puedes personalizarla)
    }
  }, [toIndex, navigate]);

  // Renderiza el contenido protegido solo si toIndex es 0
  return toIndex === 0 ? children : null;
};