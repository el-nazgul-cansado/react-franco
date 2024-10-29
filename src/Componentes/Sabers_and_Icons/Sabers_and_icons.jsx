import React from 'react';
import { useState } from 'react';
import { useSabersIcons } from "../../context/SabersIconsContext"
import './Sabers_and_icons.css';

export const Sabers_and_icons = () => {
  const { sabersAndIcons, selectedIcon, handleIconClick } = useSabersIcons();

  const [activeCard, setActiveCard] = useState(null);

  const handleMouseEnter = (index) => {
    setActiveCard(index);
  };
  
  const handleMouseLeave = () => {
    setActiveCard(null);
  };

  if (!selectedIcon) {
    return <div></div>;
  }

  return (
    <div className="dropdown">
      <img src={selectedIcon.icon} alt={selectedIcon.name} className="selected-icon" />
      <div className={`dropdown-content hoverDropdown${selectedIcon.color}`} >
        {sabersAndIcons.map((e, index) => (
          <div key={e.id} className={`icon-saber-pair ${activeCard === index ? 'active' : 'inactive'} hoverIcon${e.color}`} onClick={() => handleIconClick(e)}
          onMouseEnter={() => handleMouseEnter(index)}
          onMouseLeave={handleMouseLeave}
          style={{
            filter: activeCard !== null && activeCard !== index ? 'grayscale(100%)' : 'none',
          }}
          >
            <img src={e.icon} alt={e.name + " Icon"} />
            <img src={e.saber} alt={e.name + " Saber"} />
          </div>
        ))}
      </div>
    </div>
  );
};
