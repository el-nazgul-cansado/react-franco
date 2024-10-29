import React, { createContext, useContext, useState, useEffect } from 'react';
import { sabers_and_icons_data } from '../helpers/pedirDatos'; // Asegúrate de actualizar la ruta de importación según sea necesario

const SabersIconsContext = createContext();

export const SabersIconsProvider = ({ children }) => {
  const [sabersAndIcons, setSabersAndIcons] = useState([]);
  const [selectedIcon, setSelectedIcon] = useState(() => {
    const savedIcon = localStorage.getItem('selectedIcon');
    return savedIcon ? JSON.parse(savedIcon) : null;
  });

  useEffect(() => {
    sabers_and_icons_data()
      .then((res) => {
        setSabersAndIcons(res);
        if (!selectedIcon && res.length > 0) {
          const initialSelection = res[0];
          setSelectedIcon(initialSelection);
          localStorage.setItem('selectedIcon', JSON.stringify(initialSelection));
          updateCursor(initialSelection.saber);
        }
      })
      .catch((error) => {
        console.error("Error cargando los datos de los íconos:", error);
      });

    // Actualizar el cursor según el ícono seleccionado
    if (selectedIcon) {
      updateCursor(selectedIcon.saber);
    }

    return () => {
      document.body.style.cursor = 'auto'; // Restablecer el cursor al desmontar
    };
  }, [selectedIcon]);

  const handleIconClick = (icon) => {
    setSelectedIcon(icon);
    localStorage.setItem('selectedIcon', JSON.stringify(icon));
    const audio = new Audio("/assets/sounds/sonido_sable_laser_icono.mp3");
    audio.play();
  };

  const updateCursor = (cursorUrl) => {
    document.body.style.cursor = `url('${cursorUrl}'), auto`;
  };

  return (
    <SabersIconsContext.Provider value={{ sabersAndIcons, selectedIcon, handleIconClick }}>
      {children}
    </SabersIconsContext.Provider>
  );
};

// Hook personalizado para facilitar el uso del contexto
export const useSabersIcons = () => useContext(SabersIconsContext);
