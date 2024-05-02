import { Link, useNavigate } from "react-router-dom"
import { ItemCount } from "../ItemCount/ItemCount"
import { useState, useContext } from "react"
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
        let x = e.pageX - left - window.pageXOffset;
        let y = e.pageY - top - window.pageYOffset;
    
        const zoomLevel = 2;
        const lensWidth = 200;  // Ancho del lente
        const lensHeight = 200; // Altura del lente
    
        // Asegúrate de que el lente no muestre áreas fuera de la imagen
        x = Math.max(0, Math.min(x, width - lensWidth / zoomLevel));
        y = Math.max(0, Math.min(y, height - lensHeight / zoomLevel));
    
        let backgroundX = x * zoomLevel - lensWidth / 2;
        let backgroundY = y * zoomLevel - lensHeight / 2;
    
        backgroundX = Math.max(0, Math.min(width * zoomLevel - lensWidth, backgroundX));
        backgroundY = Math.max(0, Math.min(height * zoomLevel - lensHeight, backgroundY));
    
        setLensStyle({
            backgroundColor: 'black',
            backgroundSize: `${width * zoomLevel}px ${height * zoomLevel}px`,
            backgroundPosition: `-${backgroundX}px -${backgroundY}px`,
            display: 'block',
            left: '520px', // Usa la posición fija en X
            top: '2px', // Usa la posición fija en Y
            width: '500px',
            height: '500px'
        });
    };

    const handleMouseLeave = () => {
        setLensStyle(prevStyle => ({ ...prevStyle, display: 'none' }));
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

    const descriptionLength = description.length

    return(
        <div className="itemDetailContainer">
            <h2 className="itemDetailName">{name}</h2>
            <div className="itemDetailUpperContainer">
                <div className="itemDetailImage">
                    <img src={image} alt={name} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} />
                    <div className="zoomLens" style={{ background: `url(${image}) no-repeat`, ...lensStyle }}></div>
                </div>
                <div className="itemDetailText">
                    <div className="itemDetailDescriptionContainer">
                        <p className="itemDetailDescription" style={{ height: `${descriptionLength}` }}>{description}</p>
                    </div>
                    <p className="itemDetailPrice">Precio: <strong>$ {price} </strong></p>
                    <div className={`containerCountAlert ${category.includes("cable") && "containerNoOptions"}
                                                        ${category.includes("monitor") && "containerNoOptions"}`}>
                        <ItemCount max={stock} cantidad={cantidad} setCantidad={setCantidad} />
                        {stock <= 5 && <h5 className="itemDetailAlert">Quedan {stock} unidades en stock!!</h5>}
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
                <button onClick={handleAgregar} className="itemDetailButtons">Agregar al carrito</button>
                
                <Link to={cart.length > 0 && "/cart"}>
                    <button className={`itemDetailButtons ${cart.length === 0 ? "disabled" : ""}`} disabled={cart.length === 0}>
                        Ir al carrito
                    </button>
                </Link>
                
                <button className="itemDetailButtons" onClick={handleVolver}>Volver</button>
                <Link to={'/'}><button className="itemDetailButtons">Inicio</button></Link>
            </div>
        </div>
    )
}