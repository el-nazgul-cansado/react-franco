import { useState, useEffect } from 'react';
import { sabers_and_icons_data } from '../../helpers/pedirDatos';
import './Sabers_and_icons.css';

export const Sabers_and_icons = () => {
  const [sabersAndIcons, setSabersAndIcons] = useState([]);
  const [selectedIcon, setSelectedIcon] = useState(() => {
    const savedIcon = localStorage.getItem('selectedIcon');
    return savedIcon ? JSON.parse(savedIcon) : null;
  });

  useEffect(() => {
    sabers_and_icons_data()
      .then((res) => {
        setSabersAndIcons(res);
        if (selectedIcon) {
          updateCursor(selectedIcon.saber);
        } else if (res.length > 0) {
          const initialSelection = res[0];
          setSelectedIcon(initialSelection);
          localStorage.setItem('selectedIcon', JSON.stringify(initialSelection));
          updateCursor(initialSelection.saber);
        }
      })
      .catch((error) => {
        console.error("Error cargando los datos de los íconos:", error);
      });

    // Efecto de limpieza para restablecer el cursor cuando el componente se desmonte
    return () => {
      document.body.style.cursor = 'auto';
    };
  }, [selectedIcon]);

  const handleIconClick = (icon) => {
    setSelectedIcon(icon);
    localStorage.setItem('selectedIcon', JSON.stringify(icon));
    updateCursor(icon.saber);
  };

  const updateCursor = (cursorUrl) => {
    // Aplica el cursor personalizado a nivel global
    document.body.style.cursor = `url('${cursorUrl}'), auto`;

    // Restaura el cursor 'pointer' para elementos interactivos
    // Aplicando el cursor de sable también para el estado 'hover'
    document.querySelectorAll('a, button, input, .clickable').forEach(element => {
      element.style.cursor = `url('${cursorUrl}'), pointer`;
      // Agrega el estado hover usando JavaScript
      element.addEventListener('mouseover', () => {
        element.style.cursor = `url('${cursorUrl}'), pointer`;
      });
      element.addEventListener('mouseout', () => {
        element.style.cursor = `url('${cursorUrl}'), auto`;
      });
    });
  };

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