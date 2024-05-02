import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import { useLoginContext } from "../../context/LoginContext";
import { CartWidget } from "../CartWidget/CartWidget";
import { Sabers_and_icons } from "../Sabers_and_Icons/Sabers_and_icons";
import { StarsRangeAndCount } from "../StarsRangeAndCount/StarsRangeAndCount";
import { BsCaretDown } from "react-icons/bs";
import 'animate.css'
import './Header.css'

export const Header = () => {
    const { user, logout } = useLoginContext()

    const [rotationDegrees, setRotationDegrees] = useState(0);
    const [isToggled, setIsToggled] = useState(false);

    const handleClick = () => {
            setIsToggled(!isToggled)
            setRotationDegrees(prev => prev + 180);
    };

    return(
        <div className="headerContainer">
            <header>
                    <div className="contenedorLogoLinksCarrito" style={{ 
                        transform: isToggled ? 'translateY(-100%)' : 'translateY(0)',
                        transition: 'transform 0.5s ease-in-out'
                    }}>
                        <Sabers_and_icons />
                        <StarsRangeAndCount />
                        <nav className="contenedorLinks">
                            <Link className="links" to="/">Inicio</ Link>
                            <Link className="links" to="/productos/consola">Consolas</Link>
                            <Link className="links" to="/productos/pc">PC</Link>
                            <Link className="links" to="/plataformas">Plataformas</Link>
                        </nav>
                        <section className="contenedorCarrito">
                            <CartWidget />
                        </section>
                        <div className="contenedorHeader">               
                            {user.logged ?
                            <div>
                            <p className="userWelcome"> Bienvenid@ {user.displayName}</p>
                            <button className="loginLogout" onClick={logout}>Logout</button>
                            </div>
                            : <Link to='/login'><button className="loginLogout">Login</button></Link>}
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