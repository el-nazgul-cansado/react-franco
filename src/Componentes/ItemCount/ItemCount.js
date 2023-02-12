

export const ItemCount = ({max, setCantidad, cantidad}) => {
    
    const handleRestar = () => {
        cantidad > 1 && setCantidad(cantidad - 1)
    }

    const handleSumar = () => {
        cantidad < max && setCantidad(cantidad + 1)
    }

    return (
        <div className="itemDetailCount">
            <button onClick={handleRestar} className="itemDetailRestar">-</button>
            <span className="itemDetailCantidad">{cantidad}</span>
            <button onClick={handleSumar} className="itemDetailSumar">+</button>
            <br/>
        </div>
    )
}