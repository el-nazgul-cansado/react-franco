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
            <button onClick={handleRestar} className="itemDetailCountButton decrement">-</button>
                <span className="itemDetailCount">{cantidad}</span>
            <button onClick={handleSumar} className="itemDetailCountButton increment">+</button>
        </div>
    )
}