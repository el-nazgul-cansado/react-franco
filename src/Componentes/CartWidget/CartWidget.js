import { BsFillCartFill } from "react-icons/bs";

export const CartWidget = () => {

    return(
        <i className="btn btn-primary"><BsFillCartFill size={50} /><span className="carritoCantidad">0</span></i>
    )
}