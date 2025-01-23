import './ItemCount.css'

export const ItemCount = ({max, setCantidad, cantidad}) => {

    const add_amount_audio = new Audio(`${process.env.PUBLIC_URL}/assets/sounds/buttons_sounds/add_amount.mp3`)
    
    const handleRestar = () => {
        cantidad > 1 && setCantidad(cantidad - 1)
        if(cantidad > 1){
            add_amount_audio.play()
        }
    }

    const handleSumar = () => {
        cantidad < max && setCantidad(cantidad + 1)
        if(cantidad < max){
            add_amount_audio.play()
        }
    }

    return (
        <div className="itemDetailCountContainer">
            <button onClick={handleRestar} className="itemDetailCountButton decrement">-</button>
                <span className="itemDetailCount">{cantidad}</span>
            <button onClick={handleSumar} className="itemDetailCountButton increment">+</button>
        </div>
    )
}