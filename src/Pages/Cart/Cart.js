import { useContext } from "react"
import { Link } from "react-router-dom"
import { Footer } from "../../Componentes/Footer/Footer"
import { CartContext } from "../../context/CartContext"
import { CartItem } from "../../Componentes/CartItem/CartItem"
import'./Cart.css'
import { CartInstallments } from "../../Componentes/CartInstallments/CartInstallments"

export const Cart = ( ) => {

    const { cart } = useContext(CartContext)

    if (cart.length === 0){

        return(
            <>
                <div className="emptyCartContainer">
                    <h2>Tu carrito esta vacio</h2>
                    <hr/>
                    <p>Anda a comprar algo</p>
                    <Link to="/" className="btn btn-primary">Ir a comprar algo</Link>
                </div>
                <div>
                    <Footer />
                </div>
            </>
        )
    }
    
    return(
        <>
            <div className="cartContainer">
                <h2 className="cartTitle">Tu compra</h2>

                <div className="cartItemInstallments">
                    <div>
                        {
                            cart.map(item =>(
                                <CartItem key={item.id} {...item} />

                            ))
                        }
                    </div>

                    <CartInstallments />
                </div>
            </div>
            <div>
                <Footer />
            </div>
        </>
    )
}