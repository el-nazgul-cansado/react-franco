import { Link } from "react-router-dom";
import { useLoginContext } from "../../context/LoginContext";
import { CartWidget } from "../CartWidget/CartWidget";
import './Header.css'

export const Header = () => {

    const { user, logout } = useLoginContext()

    return(
        <header className="contenedorLogoLinksCarrito">
            <div className="contenedorLogo">
            <Link className="logo" to="/"><h1>LOGO</h1></Link>
            </div>
            <nav className="contenedorLinks">
                <Link className="links" to="/">Inicio</ Link>
                <Link className="links" to="/productos/consola">Consolas</Link>
                <Link className="links" to="/productos/pc">Computadoras</Link>
                <Link className="links" to="#">Plataformas</Link>
            </nav>
            <section className="contenedorCarrito">
                <CartWidget />
            </section>
            <div className="contenedorHeader">
                
                {user.logged ?
                 <div>
                 <p> Bienvenid@ {user.displayName}</p>
                 <button className="btn btn-danger" onClick={logout}>Logout</button>
                 </div>
                 : <Link to='/login'><button className="btn btn-danger">Login</button></Link>}
            </div>
        </header>
    )
}

export default Header;
