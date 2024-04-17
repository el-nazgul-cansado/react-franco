import { useStarContext } from "../../context/StarContext";
import './StarsRangeAndCount.css'

export const StarsRangeAndCount = () => {

    const { quantity, setQuantity, size, setSize, starConfirm, setStarConfirm } = useStarContext()

    const handleStarConfirm = () => {
        if (starConfirm) {
            setStarConfirm(false);
        } else {
            setStarConfirm(true)
        }
    };

    const handleOnCLickQuantityIncrement = () => {
        if (quantity <= 3000) {
            setQuantity(quantity + 5)
        }
    }
    const handleOnCLickQuantityDecrement = () => {
        if (quantity >= 500) {
            setQuantity(quantity - 5)
        }
    }

    const handleOnCLickSizeIncrement = () => {
        if (size  <= 4.5) {
            setSize(size + .1)
        }
    }
    const handleOnCLickSizeDecrement = () => {
        if (size >= .5) {
            setSize(size - .1)
        }
    }

    const handleChangeQuantity = (event) => {
        setQuantity(event.target.value);
      };
    const handleChangeSize = (event) => {
        setSize(parseFloat(event.target.value));
      };

      return (
        <div className="rangeDropdown">
            <span className="starIndicator" style={{ width: `20px`, height: `20px` }}></span>
            <div className="rangeContainer">
                <div>
                    <div>
                        <label htmlFor="rangeQuantity">Cantidad: {quantity}</label>
                    </div>
                    <div className="inputButtonsContainer">
                        <button onClick={handleOnCLickQuantityDecrement} className="incrementDecrement">-</button>
                        <input
                            type="range"
                            id="rangeQuantity"
                            name="rangeQuantity"
                            min="500"
                            max="3000"
                            value={quantity}
                            onChange={handleChangeQuantity}
                        /><button onClick={handleOnCLickQuantityIncrement} className="incrementDecrement">+</button>
                    </div>
                </div>
                <div>
                    <div>
                        <label htmlFor="rangeSize">Tamaño: <span className="sizeIndicator" style={{ width: `${size * 2.5}px`, height: `${size * 2.5}px` }}></span></label>
                    </div>
                    <div className="inputButtonsContainer">
                        <button onClick={handleOnCLickSizeDecrement} className="incrementDecrement">-</button>
                        <input
                            type="range"
                            id="rangeSize"
                            name="rangeSize"
                            min=".5"
                            max="4.5"
                            step="0.1"
                            value={size}
                            onChange={handleChangeSize}
                        /><button onClick={handleOnCLickSizeIncrement} className="incrementDecrement">+</button>
                    </div>
                </div>
                <div>
                    <button className='starConfirm' onClick={handleStarConfirm}>Confirm</button>
                </div>
            </div>
        </div>
    );
    
}