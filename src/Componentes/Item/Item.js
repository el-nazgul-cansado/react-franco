import { Link } from "react-router-dom"



export const Item = ({id, name, description, image, price, stock, category}) =>{

    return(
        <div>
            <h2>{name}</h2>
            <img src={image} alt={name} />
            <p>Precio: <b>$ {price}</b></p>
            <p>{category}</p>
            <Link className="btn btn-primary" to={`/detail/${id}`}>Ver mas!</Link>
        </div>
    )
}