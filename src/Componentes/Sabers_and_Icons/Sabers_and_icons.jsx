import React from 'react';
import { useSabersIcons } from "../../context/SabersIconsContext" // Asegúrate de actualizar la ruta de importación según sea necesario
import './Sabers_and_icons.css';

export const Sabers_and_icons = () => {
  const { sabersAndIcons, selectedIcon, handleIconClick } = useSabersIcons();

  if (!selectedIcon) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="dropdown">
      <img src={selectedIcon.icon} alt={selectedIcon.name} className="selected-icon" />
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
