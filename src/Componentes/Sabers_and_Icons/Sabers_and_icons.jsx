import React, { useState, useEffect } from 'react';
import { sabers_and_icons_data } from '../../helpers/pedirDatos';
import './Sabers_and_icons.css';

export const Sabers_and_icons = () => {
    const [sabersAndIcons, setSabersAndIcons] = useState([]);
    const [selectedIcon, setSelectedIcon] = useState(null);
  
    useEffect(() => {
      // Llamada a la función que retorna la promesa con los datos
      sabers_and_icons_data()
        .then((res) => {
          setSabersAndIcons(res);
          if (res.length > 0) {
            setSelectedIcon(res[0]); // Asegúrate de que 'res' no está vacío
          }
        })
        .catch((error) => {
          console.error("Error cargando los datos de los íconos:", error);
        });
    }, []);
  
    const handleIconClick = (icon) => {
      setSelectedIcon(icon);
    };

    // Verifica que selectedIcon no sea null antes de intentar acceder a sus propiedades
    return (
        <div className="dropdown">
            {selectedIcon && (
              <img src={selectedIcon.icon} alt={selectedIcon.name} className="selected-icon" />
            )}
            <div className="dropdown-content">
                {sabersAndIcons.map((e) => (
                    <div key={e.id} className="icon-saber-pair" onClick={() => handleIconClick(e)}>
                        <img src={e.icon} alt={e.name + " Icon"} />
                        <img src={e.saber} alt={e.name + " Saber"} />
                    </div>
                ))}
            </div>
        </div>
    );
};
