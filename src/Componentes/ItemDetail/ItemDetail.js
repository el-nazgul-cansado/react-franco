import { Link, useNavigate } from "react-router-dom"
import { ItemCount } from "../ItemCount/ItemCount"
import { useState } from "react"
import { Selector } from "../Selector/Selector"

export const ItemDetail = ({id, name, description, image, price, stock, category}) => {

    const [cantidad, setCantidad] = useState(1)

    const navigate = useNavigate()

    const handleVolver = () => {
        navigate(-1)
    }

    const colores = [{
        vaule: 'rojo', text: 'Rojo'},
        {vaule: 'azul', text: 'Azul'},
        {vaule: 'verde', text: 'Verde'},
        {vaule: 'blanco', text: 'Negro'},
        {vaule: 'blanco', text: 'Blanco'}
    ]

    const [color, setColor] = useState(null)

    const handleAgregar = () => {
        console.log({
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
        )
    }

    return(
        <div>
            <h2>{name}</h2>
            <img src={image} alt={name} />
            <p>{description}</p>
            <p>Precio : <strong>$ {price}</strong></p>
            <ItemCount max={stock} cantidad={cantidad} setCantidad={setCantidad} />
            <Selector options={colores} set={setColor}/>
            <button onClick={handleAgregar}>Agregar al carrito</button> <br/>
            <button className="btn btn-primary" onClick={handleVolver}>Volver</button>
            <Link className="btn btn-primary" to={'/'}>Inicio</Link>
            
        </div>
    )
}