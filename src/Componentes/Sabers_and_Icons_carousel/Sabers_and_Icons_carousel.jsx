import { useRef, useState } from 'react';
import { useSabersIcons } from '../../context/SabersIconsContext';
import styled, { keyframes, css } from 'styled-components';
import { AiOutlineDoubleLeft, AiOutlineDoubleRight } from "react-icons/ai";
import './Sabers_and_Icons_carousel.css';

export const Sabers_and_Icons_carousel = () => {
    const { setToIndex, sabersAndIcons, handleIconClick } = useSabersIcons();
    const carouselRef = useRef(null);
    const [isAnimating, setIsAnimating] = useState(false);
    const [startBorderAnimation, setStartBorderAnimation] = useState(0)
    const [caruselPosition, setCaruselPosition] = useState(0)
    const cardWidth = 400;  // Ancho real de tus tarjetas
    const gapWidth = 250;   // Espacio entre las tarjetas

    const next_card_audio = new Audio("assets/sounds/buttons_sounds/next_card.mp3")
    const disabled_audio = new Audio("assets/sounds/buttons_sounds/disabled.mp3")

    const scrollLeft = () => {
        if (carouselRef.current && !isAnimating) {
            setIsAnimating(true);
            const scrollAmount = cardWidth + gapWidth;
            carouselRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
            setTimeout(() => {
                setIsAnimating(false);
            }, 500); // Duración de la animación (500ms)
        }
        if (caruselPosition === 0) {
            disabled_audio.play()  
        }  
        else {
            setCaruselPosition(caruselPosition - 1)
            next_card_audio.play()  
        }
    };

    const scrollRight = () => {
        if (carouselRef.current && !isAnimating) {
            setIsAnimating(true);
            const scrollAmount = cardWidth + gapWidth;
            carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            setTimeout(() => {
                setIsAnimating(false);
            }, 500); // Duración de la animación (500ms)
        }
        
        if (caruselPosition >= sabersAndIcons.length - 1) {
            disabled_audio.play()
        }  
        else  {
            setCaruselPosition(caruselPosition + 1)
            next_card_audio.play()  
            
        }
    };

    const vibrate = sabersAndIcons[caruselPosition]
    ? keyframes`
        0% { box-shadow: 0px 0px 10px ${sabersAndIcons[caruselPosition].color}, 0px 0px 20px ${sabersAndIcons[caruselPosition].color}, 0px 0px 40px ${sabersAndIcons[caruselPosition].color}; }
        25% { box-shadow: 0px 0px 16px ${sabersAndIcons[caruselPosition].color}, 0px 0px 30px ${sabersAndIcons[caruselPosition].color}, 0px 0px 50px ${sabersAndIcons[caruselPosition].color}; }
        50% { box-shadow: 0px 0px 20px ${sabersAndIcons[caruselPosition].color}, 0px 0px 40px ${sabersAndIcons[caruselPosition].color}, 0px 0px 80px ${sabersAndIcons[caruselPosition].color}; }
        75% { box-shadow: 0px 0px 16px ${sabersAndIcons[caruselPosition].color}, 0px 0px 30px ${sabersAndIcons[caruselPosition].color}, 0px 0px 50px ${sabersAndIcons[caruselPosition].color}; }
        100% { box-shadow: 0px 0px 10px ${sabersAndIcons[caruselPosition].color}, 0px 0px 20px ${sabersAndIcons[caruselPosition].color}, 0px 0px 40px ${sabersAndIcons[caruselPosition].color}; }
      `
    : null;

    const animate_horizontal_span_1 = keyframes`
        0% {
            transform: translateX(0%);
        }
        100% {
            transform: translateX(-100%);
        }
    `
    const animate_horizontal_span_2 = keyframes`
        0% {
            transform: translateX(0%);
        }
        100% {
            transform: translateX(100%);
        }
    `
    const animate_vertical_spans = keyframes`
        0% {
            transform: translateY(100%);
        }
        100% {
            transform: translateY(-100%);
        }
    `

    const expandUnderline = keyframes`
    0% {
      width: 0;
      left: 50%;
    }
    100% {
      width: 105%;
      left: -2.45%;
    }
  `;
  
  const StyledDiv =
  sabersAndIcons[caruselPosition] &&
  styled.div`
    position: relative;
    background-color: black;
    border-radius: 3px;
    height: 600px;
    width: 400px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    flex-grow: 0;
    position: relative;

    &::after {
      content: '';
      position: absolute;
      bottom: -1.3px; /* Ajusta la posición del subrayado */
      height: 3.5px; /* Ajusta el grosor del subrayado */
      border-radius: 20px;
      background-color: white;
      transition: width 0.3s ease-in-out, left 0.3s ease-in-out;
      width: 0; /* Inicialmente oculto */
      left: 50%; /* Comienza desde el centro */
    }

    & span {
        position: absolute;
        background-color: white;
        animation: ${vibrate} 0.003s infinite;
    }

    & span:nth-child(1) {
      top: 0;
      left: 400px;
      width: 100%;
      height: 3.5px;
    }

    & span:nth-child(2) {
      top: 0;
      right: 400px;
      width: 100%;
      height: 3.5px;
    }

    & span:nth-child(3) {
      top: 600px;
      right: 0;
      width: 3.5px;
      height: 100%;
    }

    & span:nth-child(4) {
      top: 600px;
      left: 0;
      width: 3.5px;
      height: 100%;
    }

    ${(props) =>
      props.startBorderAnimation === 1 &&
      css`
        &::after {
            animation: ${expandUnderline} .2s ease-out forwards, ${vibrate} 0.003s infinite; /* Animación de subrayado */
        }

        & span:nth-child(1) {
            animation: ${vibrate} 0.003s infinite, ${animate_horizontal_span_1} .2s linear forwards;
            animation-delay: .5s;
        }

        & span:nth-child(2) {
            animation: ${vibrate} 0.003s infinite, ${animate_horizontal_span_2} .2s linear forwards;
            animation-delay: .5s;
        }

        & span:nth-child(3) {
            animation: ${vibrate} 0.003s infinite, ${animate_vertical_spans} .5s linear forwards;
        }

        & span:nth-child(4) {
            animation: ${vibrate} 0.003s infinite, ${animate_vertical_spans} .5s linear forwards;
        }
      `}
  `;

    const handleToIndex = () => {
        handleIconClick(sabersAndIcons[caruselPosition])
        setTimeout(() => {
            setToIndex(0);
        }, 2750)
        setStartBorderAnimation(1)
    };

    const sableHover =
    sabersAndIcons[caruselPosition] &&
    {
        cursor: `url(${sabersAndIcons[caruselPosition].saber}), auto`
      };

    return (
        <>
            <div className='saiCarrouselContainer'>
                <button className={`${caruselPosition === 0 ? 'disabledSaiButton' : 'saiButton'}`} onClick={scrollLeft} disabled={isAnimating || startBorderAnimation === 1}><AiOutlineDoubleLeft className={`${caruselPosition === 0 ? 'disabledSaiIcon' : 'saiIcon'}`} /></button>
                <div className='saiCardContainer' ref={carouselRef}>
                    {sabersAndIcons.map((sai, index) => (
                        <div key={index}>
                            <StyledDiv className={`border${sai.color}`} 
                            style={sableHover}
                            startBorderAnimation={startBorderAnimation}>
                                <span></span>
                                <span></span>
                                <span></span>
                                <span></span>
                                <div className="saiProfile">
                                    <img className={`saiProfileImg border${sai.color}`} src={`${sai.profile}`} alt={`${sai.name}`} />
                                </div>
                                <div className="saiNameContainer">
                                    <p className='saiName'>{sai.name}</p>
                                </div>
                                <div>
                                    <img src={`${sai.icon}`} alt={`${sai.name}`} />
                                    <img className='saiSaber' src={`${sai.saber}`} alt={`${sai.name}`} />
                                </div>
                            </StyledDiv>
                        </div>
                    ))}
                </div>
                <button className={`${caruselPosition >= sabersAndIcons.length - 1 ? 'disabledSaiButton' : 'saiButton'}`} onClick={scrollRight} disabled={isAnimating || startBorderAnimation === 1}><AiOutlineDoubleRight className={`${caruselPosition >= sabersAndIcons.length - 1 ? 'disabledSaiIcon' : 'saiIcon'}`} /></button>
            </div>
            <button onClick={handleToIndex} className='toIndexButton'>Siguiente</button>
        </>
    );
};