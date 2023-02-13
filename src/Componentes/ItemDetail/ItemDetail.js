import { Link, useNavigate } from "react-router-dom"
import { ItemCount } from "../ItemCount/ItemCount"
import { useState, useContext } from "react"
import { Selector } from "../Selector/Selector"
import { CartContext } from '../../context/CartContext';
import "./ItemDetail.css"

export const ItemDetail = ({id, name, description, image, price, stock, category}) => {

    const { agregarAlCarrito, cart } = useContext(CartContext)
    
    const [cantidad, setCantidad] = useState(1)

    const navigate = useNavigate()

    const handleVolver = () => {
        navigate(-1)
    }

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
            <img className="itemDetailImage" src={image} align="left" alt={name} />
            <p className="itemDetailDescription">{description}</p>
            <p className="itemDetailPrice">Precio : <strong>$ {price}</strong></p>
            {
                <div>
                    <div className={`containerCountAlert ${category.includes("cable")
                                                                    && "containerNoOptions"}
                                                         ${category.includes("monitor")
                                                                    && "containerNoOptions"}`}>
                        <ItemCount max={stock} cantidad={cantidad} setCantidad={setCantidad} />
                        {stock <= 5 && <h5 className="itemDetailAlert">Quedan {stock} en stock!!</h5>}
                    </div>
                    {category.includes("consola", "joystick")
                                    ? <div className="itemDetailOptions"><Selector options={colores} set={setColor}/></div>
                                    : null}
                    {category.includes("mouse")
                                    ? <div className="itemDetailOptions"><Selector options={colores} set={setColor}/></div>
                                    : null}
                    {category.includes("teclado")
                                    ? <div className="itemDetailOptions"><Selector options={colores} set={setColor}/></div>
                                    : null}
                    <button onClick={handleAgregar} className="btn btn-success itemDetailAddToCart">Agregar al carrito</button>
                    {cart.length === 0
                            ? <button disabled = { cart.length === 0 } className="btn btn-success">Ir al carrito</button>
                            : <Link to="/cart"><button className="btn btn-success">Ir al carrito</button></Link>
                    }
                </div>
                
            }
             <br/>
            <button className="btn btn-primary itemDetailVolver" onClick={handleVolver}>Volver</button>
            
            <Link className="btn btn-primary itemDetailInicio" to={'/'}>Inicio</Link>
            
        </div>
    )
}