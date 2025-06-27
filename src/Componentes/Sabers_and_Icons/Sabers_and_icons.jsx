import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { useSabersIcons } from "../../context/SabersIconsContext";
import './Sabers_and_icons.css';

export const Sabers_and_icons = () => {
  const { sabersAndIcons, selectedIcon, handleIconClick } = useSabersIcons();

  const [activeCard, setActiveCard] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleMouseEnter = (index) => {
    setActiveCard(index);
  };

  const handleMouseLeave = () => {
    setActiveCard(null);
  };

  if (!selectedIcon) {
    return <div></div>;
  }

  const vibrate = keyframes`
    0% { box-shadow: 0px 0px 5px ${selectedIcon.color}, 0px 0px 10px ${selectedIcon.color}, 0px 0px 20px ${selectedIcon.color}; }
    25% { box-shadow: 0px 0px 8px ${selectedIcon.color}, 0px 0px 15px ${selectedIcon.color}, 0px 0px 25px ${selectedIcon.color}; }
    50% { box-shadow: 0px 0px 10px ${selectedIcon.color}, 0px 0px 20px ${selectedIcon.color}, 0px 0px 40px ${selectedIcon.color}; }
    75% { box-shadow: 0px 0px 8px ${selectedIcon.color}, 0px 0px 15px ${selectedIcon.color}, 0px 0px 25px ${selectedIcon.color}; }
    100% { box-shadow: 0px 0px 5px ${selectedIcon.color}, 0px 0px 10px ${selectedIcon.color}, 0px 0px 20px ${selectedIcon.color}; }
  `;

  const StyledDropdown = styled.div`
    border: 3px solid ${selectedIcon.color};
    animation: ${vibrate} 0.1s linear infinite;
  `;

  return (
    <div
      className="dropdown"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <img
        src={selectedIcon.icon}
        alt={selectedIcon.name}
        className="selected-icon"
      />

      {isOpen && (
        <StyledDropdown className="dropdown-content">
          {sabersAndIcons.map((e, index) => (
            <div
              key={e.id}
              className={`icon-saber-pair hoverIcon${e.color}`}
              onClick={() => handleIconClick(e)}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
              style={{
                filter:
                  activeCard !== null && activeCard !== index
                    ? 'grayscale(100%)'
                    : 'none',
              }}
            >
              <img src={e.icon} alt={e.name + " Icon"} />
              <img src={e.saber} alt={e.name + " Saber"} />
            </div>
          ))}
        </StyledDropdown>
      )}
    </div>
  );
};
