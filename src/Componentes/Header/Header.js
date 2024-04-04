import { Link } from "react-router-dom";
import { useLoginContext } from "../../context/LoginContext";
import { CartWidget } from "../CartWidget/CartWidget";
import { Sabers_and_icons } from "../Sabers_and_Icons/Sabers_and_icons";
import { StarsRangeAndCount } from "../StarsRangeAndCount/StarsRangeAndCount";
import './Header.css'

export const Header = () => {

    const { user, logout } = useLoginContext()

    return(
        <header className="contenedorLogoLinksCarrito">
            <Sabers_and_icons />
            <div className="contenedorLogo">
                <Link className="logoLink" to="/"><h2 className="logo">PMC</h2></Link>
            </div>
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
                 <button className="btn btn-danger" onClick={logout}>Logout</button>
                 </div>
                 : <Link to='/login'><button className="btn btn-danger">Login</button></Link>}
            </div>
        </header>
    )
}

export default Header;