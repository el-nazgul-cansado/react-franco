import { BsFillCartFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { CartContext } from "../../context/CartContext"
import{ useContext, useState } from "react"
import { useLoginContext } from "../../context/LoginContext";

export const CartWidget = () => {

    const { totalCantidad } = useContext(CartContext)

    const { user } = useLoginContext()

    return(
        <Link to={user.logged
            ?"/cart"
            :"/login"}>
            <button className="btn btn-primary"><BsFillCartFill size={50} /><span className="carritoCantidad">{totalCantidad()}</span></button>
        </Link>
    )
}