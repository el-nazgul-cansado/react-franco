import { Link } from "react-router-dom";
import { useState } from "react";
import { useLoginContext } from "../../context/LoginContext";
import { CartWidget } from "../CartWidget/CartWidget";
import './Header.css'

export const Header = () => {

    const { user, logout } = useLoginContext()

    const [ quantity, setQuantity ] = useState(0)

    const [ size, setSize ] = useState(0)

    const handleChangeQuantity = (event) => {
        setQuantity(event.target.value);
      };
    const handleChangeSize = (event) => {
        setSize(event.target.value);
      };

    return(
        <header className="contenedorLogoLinksCarrito">
            <div className="rangeCointainer">
                <label htmlFor="rangeQuantity">Cantidad: </label>
                <input
                    type="range"
                    id="rangeQuantity"
                    name="rangeQuantity"
                    min="0"
                    max="100"
                    value={quantity}
                    onChange={handleChangeQuantity}
                />
                <label htmlFor="rangeSize">Tamaño: </label>
                <input
                    type="range"
                    id="rangeSize"
                    name="rangeSize"
                    min="0"
                    max="100"
                    value={size}
                    onChange={handleChangeSize}
                />
            </div>
            <div className="contenedorLogo">
                <Link className="logoLink" to="/"><h2 className="logo">PMC</h2></Link>
            </div>
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
