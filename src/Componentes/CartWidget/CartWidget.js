import { BsFillCartFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { CartContext } from "../../context/CartContext"
import{ useContext } from "react"
import { useLoginContext } from "../../context/LoginContext";
import './CartWidget.css'

export const CartWidget = () => {

    const { totalCantidad } = useContext(CartContext)

    const { user } = useLoginContext()

    return(
        <Link to={user.logged
            ?"/cart"
            :"/login"}>
            <button className="cartButton"><BsFillCartFill color="#FFD700" size={50} /><span className="carritoCantidad">{totalCantidad()}</span></button>
        </Link>
    )
}