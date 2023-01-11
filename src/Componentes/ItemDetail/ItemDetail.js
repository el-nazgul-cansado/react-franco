import { Link, useNavigate } from "react-router-dom"


export const ItemDetail = ({id, name, description, image, price, stock, category}) => {

    const navigate = useNavigate()

    const handleVolver = () => {
        navigate(-1)
    }

    return(
        <div>
            <h2>{name}</h2>
            <img src={image} alt={name} />
            <p>{description}</p>
            <p>Precio : <strong>$ {price}</strong></p>
            <button className="btn btn-primary" onCLick={handleVolver}>Volver</button>
            <Link className="btn btn-primary" to={'/'}>Inicio</Link>
        </div>
    )
}