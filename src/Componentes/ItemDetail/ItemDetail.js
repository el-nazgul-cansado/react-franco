import { Link, useNavigate } from "react-router-dom"
import { ItemCount } from "../ItemCount/ItemCount"
import { useState, useContext, useEffect } from "react"
import { Selector } from "../Selector/Selector"
import { CartContext } from '../../context/CartContext';
import "./ItemDetail.css"

export const ItemDetail = ({id, name, description, image, price, stock, category}) => {

    const { agregarAlCarrito, cart } = useContext(CartContext)
    
    const [cantidad, setCantidad] = useState(1)

    const [lensStyle, setLensStyle] = useState({});

    const navigate = useNavigate()

    const handleVolver = () => {
        navigate(-1)
    }

    const handleMouseMove = (e) => {
        const { left, top, width, height } = e.target.getBoundingClientRect();
        let x = (e.pageX - left) - window.scrollX;
        let y = (e.pageY - top) - window.scrollY;
        const zoomLevel = 1.5;
        const lensWidth = 200;
        const lensHeight = 200;
        const horizontalOffset = 200;

        x = Math.max(0, Math.min(x * zoomLevel - lensWidth / 2, width * zoomLevel - lensWidth));
        y = Math.max(0, Math.min(y * zoomLevel - lensHeight / 2, height * zoomLevel - lensHeight));

        const backgroundSize = `${width * zoomLevel}px ${height * zoomLevel}px`;
        const backgroundPosition = `-${x}px -${y}px`;

        setLensStyle({
            backgroundSize,
            backgroundPosition,
            display: 'block',
            backgroundColor: 'white',
            boxShadow: '0px 0px 10px 5px rgba(0, 0, 0, 0.3)',
            left: `${e.pageX - window.scrollX + horizontalOffset}px`,
            top: `${e.pageY - window.scrollY - 500}px`
        });
    };

    const handleMouseLeave = () => {
        setLensStyle({ display: 'none' });
    };

    const colores = [{
         vaule: 'rojo', text: 'Rojo', id:1},
        {vaule: 'azul', text: 'Azul', id:2},
        {vaule: 'verde', text: 'Verde', id:3},
        {vaule: 'blanco', text: 'Negro', id:4},
        {vaule: 'blanco', text: 'Blanco', id:5}
    ]

    const [color, setColor] = useState(null)

    const handleAgregar = () => {
        const item = {
            id,
            name,
            stock,
            category,
            image,
            description,
            price,
            cantidad,
            color
        }

        agregarAlCarrito(item)

    }

    return(
        <div className="itemDetailContainer">
            <h2 className="itemDetailName">{name}</h2>
            <div className="itemDetailUpperContainer">
                <div className="itemDetailImage">
                    <img src={image} alt={name} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} />
                    <div className="zoomLens" style={{ background: `url(${image}) no-repeat`, ...lensStyle }}></div>
                </div>
                <div className="itemDetailText">
                    <p className="itemDetailDescription">{description}</p>
                    <p className="itemDetailPrice">Precio: <strong>$ {price}</strong></p>
                    <div className={`containerCountAlert ${category.includes("cable") && "containerNoOptions"}
                                                        ${category.includes("monitor") && "containerNoOptions"}`}>
                        <ItemCount max={stock} cantidad={cantidad} setCantidad={setCantidad} />
                        {stock <= 5 && <h5 className="itemDetailAlert">Quedan {stock} en stock!!</h5>}
                    </div>
                    <div className="itemDetailSelector">
                            {category.includes("consola", "joystick")
                                            ? <div className="itemDetailOptions"><Selector options={colores} set={setColor}/></div>
                                            : null}
                            {category.includes("mouse")
                                            ? <div className="itemDetailOptions"><Selector options={colores} set={setColor}/></div>
                                            : null}
                            {category.includes("teclado")
                                            ? <div className="itemDetailOptions"><Selector options={colores} set={setColor}/></div>
                                            : null}
                    </div>
                </div>
                    
            </div>
            <div className="buttonsContainer">
                <button onClick={handleAgregar} className="btn btn-success itemDetailButtons">Agregar al carrito</button>
                
                <Link to={cart.length > 0 ? "/cart" : "#"}>
                    <button className={`btn btn-success itemDetailButtons ${cart.length === 0 ? "disabled" : ""}`} disabled={cart.length === 0}>
                        Ir al carrito
                    </button>
                </Link>
                
                <button className="btn btn-primary itemDetailButtons" onClick={handleVolver}>Volver</button>
                <Link className="btn btn-primary itemDetailButtons" to={'/'}>Inicio</Link>
            </div>
        </div>
    )
}