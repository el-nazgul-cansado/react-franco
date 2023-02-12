import { useContext, useState, useEffect } from "react"
import { CartContext } from "../../context/CartContext"
import { FaTrashAlt } from "react-icons/fa"

export const CartItem = ({id, name, description, image, price, stock, category, cantidad}) => {

    const { eliminarItem, cantidadInCart } = useContext(CartContext)

    const [cantidadCart, setCantidadCart] = useState(cantidad)

    const handleRestarCart = () => {
        cantidadCart > 1 && setCantidadCart(cantidadCart - 1);
    }

    const handleSumarCart = () => {
        cantidadCart < stock && setCantidadCart(cantidadCart + 1);
    }

    useEffect(() => {
        cantidadInCart(id, cantidadCart);
    }, [id, cantidadCart]);

    return(
        <div>
            <h4>{name}</h4>
            <p>Precio: ${price * cantidad}</p>
            <button onClick={handleRestarCart}>-</button>
            <span>{cantidadCart}</span>
            <button onClick={handleSumarCart}>+</button>
            <button onClick={() => eliminarItem(id)} className="btn btn-outline-danger"><FaTrashAlt /></button>
            <hr/>
        </div>
    )
}