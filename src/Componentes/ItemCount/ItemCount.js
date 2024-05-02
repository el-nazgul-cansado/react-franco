import './ItemCount.css'

export const ItemCount = ({max, setCantidad, cantidad}) => {
    
    const handleRestar = () => {
        cantidad > 1 && setCantidad(cantidad - 1)
    }

    const handleSumar = () => {
        cantidad < max && setCantidad(cantidad + 1)
    }

    return (
        <div className="itemDetailCountContainer">
            <button onClick={handleRestar} className="itemDetailCount">-</button>
                <span className="itemDetailCantidad">{cantidad}</span>
            <button onClick={handleSumar} className="itemDetailCount">+</button>
            <br/>
        </div>
    )
}