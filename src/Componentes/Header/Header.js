import { Link } from "react-router-dom";
import { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { useLoginContext } from "../../context/LoginContext";
import { useSabersIcons } from "../../context/SabersIconsContext"
import { CartWidget } from "../CartWidget/CartWidget";
import { Sabers_and_icons } from "../Sabers_and_Icons/Sabers_and_icons";
import { StarsRangeAndCount } from "../StarsRangeAndCount/StarsRangeAndCount";
import { BsCaretDown } from "react-icons/bs";
import 'animate.css'
import './Header.css'

export const Header = () => {
    const { user, logout } = useLoginContext()

    const { selectedIcon } = useSabersIcons()

    const [rotationDegrees, setRotationDegrees] = useState(0);
    const [isToggled, setIsToggled] = useState(false);

    const handleClick = () => {
            setIsToggled(!isToggled)
            setRotationDegrees(prev => prev + 180);
    };

    const vibrate = keyframes`
        0% { box-shadow: 0px 0px 5px ${selectedIcon.color}, 0px 0px 10px ${selectedIcon.color}, 0px 0px 20px ${selectedIcon.color}; } /* Sombra más definida */
        25% { box-shadow: 0px 0px 8px ${selectedIcon.color}, 0px 0px 15px ${selectedIcon.color}, 0px 0px 25px ${selectedIcon.color}; } /* Sombra más definida */
        50% { box-shadow: 0px 0px 10px ${selectedIcon.color}, 0px 0px 20px ${selectedIcon.color}, 0px 0px 40px ${selectedIcon.color}; } /* Sombra más definida */
        75% { box-shadow: 0px 0px 8px ${selectedIcon.color}, 0px 0px 15px ${selectedIcon.color}, 0px 0px 25px ${selectedIcon.color}; } /* Sombra más definida */
        100% { box-shadow: 0px 0px 5px ${selectedIcon.color}, 0px 0px 10px ${selectedIcon.color}, 0px 0px 20px ${selectedIcon.color}; } /* Sombra más definida */
    `;
  

    const StyledLink = styled(Link)`
        font-size: 25px;
        color: #FFD700;
        text-decoration: none;
        position: relative;
    
        &:hover {
        color: #FFD700; /* El color del texto puede permanecer sin cambios */
        }
    
        &::after {
        content: '';
        position: absolute;
        left: 50%; /* Comienza desde el centro */
        bottom: -8px; /* Ajusta la posición del subrayado */
        width: 0;
        border-radius: 20px;
        height: 4px; /* Ajusta el grosor del subrayado */
        background-color: ${selectedIcon.color};
        transition: width 0.3s ease-in-out, left 0.3s ease-in-out;
        }
    
        &:hover::after {
        width: 100%; /* El subrayado se expande completamente */
        left: 0; /* El subrayado se expande hacia ambos lados */
        animation: ${vibrate} .003s infinite; /* Aplicamos la animación vibrate */
        }
    `;

    return(
        <div className="headerContainer">
            <header>
                    <div className="contenedorLogoLinksCarrito" style={{ 
                        transform: isToggled ? 'translateY(-100%)' : 'translateY(0)',
                        transition: 'transform 0.5s ease-in-out'
                    }}>
                        <div className="icons-stars-logo">
                            <Sabers_and_icons />
                            <StarsRangeAndCount />
                            <Link to="/"><img className="star-wars-logo" src="/assets/images/star-wars-logo.png" alt="star-wars-logo" /></ Link>
                        </div>
                        <nav className="contenedorLinks">
                            <StyledLink to="/productos/consola">Consolas</StyledLink>
                            <StyledLink to="/productos/pc">PC</StyledLink>
                            <StyledLink to="/plataformas">Plataformas</StyledLink>
                        </nav>
                        <section className="contenedorCarrito">
                            <CartWidget />
                        </section>
                        <div className="contenedorHeader">               
                            {user.logged ?
                            <div>
                            <p className="userWelcome"> Bienvenid@ {user.displayName}</p>
                            <Link to='/'><button className="loginLogout" onClick={logout}>Logout</button></Link>
                            </div>
                            : <Link to='/login-register'><button className="loginLogout">Login</button></Link>}
                        </div>
                    </div>
            </header>
            <div className="containerButton" style={{
                    transform: isToggled ? 'translateY(-370%)' : 'translateY(0)',
                    transition: 'transform 0.5s ease-in-out'
            }}>
                <button onClick={handleClick} className='headerButton'>
                    <BsCaretDown style={{ transform: `rotate(${rotationDegrees}deg)` }} className="headerButtonIcon" />
                </button>
            </div>
        </div>
    )
}

export default Header;