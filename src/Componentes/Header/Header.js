import { Link } from "react-router-dom";
import { CartWidget } from "../CartWidget/CartWidget";
import './Header.css'

export const Header = () => {
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
        </header>
    )
}

export default Header;
