import React, { useState, useEffect } from 'react';
import { sabers_and_icons_data } from '../../helpers/pedirDatos';
import './Sabers_and_icons.css'; // Asegúrate de tener este archivo CSS

export const Sabers_and_icons = () => {
    const [sabersAndIcons, setSabersAndIcons] = useState([]);
    const [selectedIcon, setSelectedIcon] = useState(null);
  
    useEffect(() => {
      // Llamada a la función que retorna la promesa con los datos
      sabers_and_icons_data()
        .then((res) => {
          setSabersAndIcons(res); // Actualizar el estado con la respuesta
          setSelectedIcon(res[0]); // Establecer el ícono seleccionado inicialmente al primer elemento
        })
        .catch((error) => {
          console.error("Error cargando los datos de los íconos:", error);
        });
    }, []);
  
    const handleIconClick = (icon) => {
      setSelectedIcon(icon);
    };
  
    return (
        <div className="dropdown">
            <img src={selectedIcon.icon} alt={selectedIcon.name} className="selected-icon" />
                <div className="dropdown-content">
                    {sabersAndIcons.map((e, index) => (
                        <div key={index} className="icon-saber-pair" onClick={() => handleIconClick(e)}>
                        <img src={e.icon} alt={e.name + " Icon"} />
                        <img src={e.saber} alt={e.name + " Saber"} />
                        </div>
                    ))}
                </div>
        </div>
      );
  };