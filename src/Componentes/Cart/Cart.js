import { useContext } from "react"
import { Link } from "react-router-dom"
import { CartContext } from "../../context/CartContext"
import { CartItem } from "../CartItem/CartItem"
import'./Cart.css'

export const Cart = ( ) => {

    const { cart, emptyCart, totalCart } = useContext(CartContext)

    if (cart.length === 0){

        return(
            <div className="container my-s cartContainer">
                <h2>Tu carrito esta vacio</h2>
                <hr/>
                <p>Anda a comprar algo</p>
                <Link to="/" className="btn btn-primary">Ir a comprar algo</Link>
            </div>
        )
    }
    
    return(
        <div className="container my-5 cartContainer">
            <h2>Tu compra</h2>
            <hr/>

            {
                cart.map(item =>(
                    <CartItem key={item.id} {...item} />

                ))
            }

            <h4>Total: ${totalCart()}</h4>

            <button onClick={emptyCart}  className="btn btn-danger">Vaciar Carrito</button>
            <Link to="/checkout" className="btn btn-success">Checkout</Link>

        </div>
    )
}