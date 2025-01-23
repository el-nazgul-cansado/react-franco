import { Link } from "react-router-dom"
import { useContext } from "react"
import { CartContext } from "../../context/CartContext"
import { useSabersIcons } from "../../context/SabersIconsContext"
import './CartInstallments.css'

export const CartInstallments = () => {

    const { installmentSelected, setInstallmentSelected, totalCart, emptyCart } = useContext(CartContext)
    
    const { selectedIcon } = useSabersIcons()

    const select_installment_audio = new Audio(`${process.env.PUBLIC_URL}/assets/sounds/buttons_sounds/next_card.mp3`)

    const empty_cart_audio = new Audio(`${process.env.PUBLIC_URL}/assets/sounds/buttons_sounds/eliminate.mp3`)

    const select_installment_handle = () => {
        select_installment_audio.play()
    }

    const handleEmptyCart = () => {
        empty_cart_audio.play()
        emptyCart()
    }

    const handleChange = (event) => {
        const installmentId = event.target.id
        switch (installmentId){
            case 'installment1':
                setInstallmentSelected({
                    id: 'installment1',
                    amount: '1',
                    installmentPrice: (totalCart()).toFixed(2),
                    total: (totalCart()).toFixed(2)
                })
                break;
            case 'installment2':
                setInstallmentSelected({
                    id: 'installment2',
                    amount: '3',
                    installmentPrice: ((totalCart() * 1.2) / 3).toFixed(2),
                    total: ((totalCart() * 1.2)).toFixed(2)
                })
                break;
            case 'installment3':
                setInstallmentSelected({
                    id: 'installment3',
                    amount: '6',
                    installmentPrice: ((totalCart() * 1.5) / 6).toFixed(2),
                    total: ((totalCart() * 1.5)).toFixed(2)
                })
                break;
            case 'installment4':
                setInstallmentSelected({
                    id: 'installment4',
                    amount: '9',
                    installmentPrice: ((totalCart() * 1.7) / 9).toFixed(2),
                    total: ((totalCart() * 1.7)).toFixed(2)
                })
                break;
            case 'installment5':
                setInstallmentSelected({
                    id: 'installment5',
                    amount: '12',
                    installmentPrice: ((totalCart() * 1.9) / 12).toFixed(2),
                    total: ((totalCart() * 1.9)).toFixed(2)
                })
                break;
            case 'installment6':
                setInstallmentSelected({
                    id: 'installment6',
                    amount: '24',
                    installmentPrice: ((totalCart() * 2.1) / 24).toFixed(2),
                    total: ((totalCart() * 2.1)).toFixed(2)
                })
                break;
            default:
                console.log('No se encontró esta cuota');
        }

    };

    const ulStyle = {
        cursor: `url(${selectedIcon.saber}), auto`
      };
      
      const liStyle = {
        cursor: 'inherit'
      };

    return(
        <div className="installmentsContainer">
            <ul style={ulStyle} className="installmentsList">
                <li>
                    <label onClick={select_installment_handle} style={liStyle} className={`installmentsLabel ${installmentSelected.id === 'installment1' ? 'selected' : ''}`}  htmlFor="installment1">
                        <div className="installmentsInputContainer">
                            <input style={liStyle} className="installmentsInput" type="radio" id="installment1" onChange={handleChange} checked={installmentSelected.id === 'installment1'} name="installment" />
                            <label style={liStyle} className="customRadio" htmlFor="installment1"></label>
                        </div>
                        <div className="installmentsTotal">
                            <p className='installmentsTotalParagraph'><strong>1X</strong> {(totalCart()).toFixed(2)}</p>
                            <p className='installmentsTotalParagraph'>{(totalCart()).toFixed(2)}</p>
                        </div>
                    </label>
                </li>
                <li>
                    <label onClick={select_installment_handle} style={liStyle} className={`installmentsLabel ${installmentSelected.id === 'installment2' ? 'selected' : ''}`} htmlFor="installment2">
                        <div className="installmentsInputContainer">
                            <input style={liStyle} className="installmentsInput" type="radio" id="installment2" onChange={handleChange} name="installment" />
                            <label style={liStyle} className="customRadio" htmlFor="installment2"></label>
                        </div>
                        <div className="installmentsTotal">
                            <p className='installmentsTotalParagraph'><strong>3X</strong> {((totalCart() * 1.2) / 3).toFixed(2)}</p>
                            <p className='installmentsTotalParagraph'>{(totalCart() * 1.2).toFixed(2)}</p>
                        </div>
                    </label>
                </li>
                <li>
                    <label onClick={select_installment_handle} style={liStyle} className={`installmentsLabel ${installmentSelected.id === 'installment3' ? 'selected' : ''}`} htmlFor="installment3">
                        <div className="installmentsInputContainer">
                            <input style={liStyle} className="installmentsInput" type="radio" id="installment3" onChange={handleChange} name="installment" />
                            <label style={liStyle} className="customRadio" htmlFor="installment3"></label>
                        </div>
                        <div className="installmentsTotal">
                            <p className='installmentsTotalParagraph'><strong>6X</strong> {((totalCart() * 1.5) / 6).toFixed(2)}</p>
                            <p className='installmentsTotalParagraph'>{(totalCart() * 1.5).toFixed(2)}</p>
                        </div>
                    </label>
                </li>
                <li>
                    <label onClick={select_installment_handle} style={liStyle} className={`installmentsLabel ${installmentSelected.id === 'installment4' ? 'selected' : ''}`} htmlFor="installment4">
                        <div className="installmentsInputContainer">
                            <input style={liStyle} className="installmentsInput" type="radio" id="installment4" onChange={handleChange} name="installment" />
                            <label style={liStyle} className="customRadio" htmlFor="installment4"></label>
                        </div>
                        <div className="installmentsTotal">
                            <p className='installmentsTotalParagraph'><strong>9X</strong> {((totalCart() * 1.7) / 9).toFixed(2)}</p>
                            <p className='installmentsTotalParagraph'>{(totalCart() * 1.7).toFixed(2)}</p>
                        </div>
                    </label>
                </li>
                <li>
                    <label onClick={select_installment_handle} style={liStyle} className={`installmentsLabel ${installmentSelected.id === 'installment5' ? 'selected' : ''}`} htmlFor="installment5">
                        <div className="installmentsInputContainer">
                            <input style={liStyle} className="installmentsInput" type="radio" id="installment5" onChange={handleChange} name="installment" />
                            <label style={liStyle} className="customRadio" htmlFor="installment5"></label>
                        </div>
                        <div className="installmentsTotal">
                            <p className='installmentsTotalParagraph'><strong>12X</strong> {((totalCart() * 1.9) / 12).toFixed(2)}</p>
                            <p className='installmentsTotalParagraph'>{(totalCart() * 1.9).toFixed(2)}</p>
                        </div>
                    </label>
                </li>
                <li>
                    <label onClick={select_installment_handle} style={liStyle} className={`installmentsLabel ${installmentSelected.id === 'installment6' ? 'selected' : ''}`}  htmlFor="installment6">
                        <div className="installmentsInputContainer">
                            <input style={liStyle} className="installmentsInput" type="radio" id="installment6" onChange={handleChange} name="installment" />
                            <label style={liStyle} className="customRadio" htmlFor="installment6"></label>
                        </div>
                        <div className="installmentsTotal">
                            <p className='installmentsTotalParagraph'><strong>24X</strong> {((totalCart() * 2.1) / 24).toFixed(2)}</p>
                            <p className='installmentsTotalParagraph'>{(totalCart() * 2.1).toFixed(2)}</p>
                        </div>
                    </label>
                </li>
            </ul>
            <div className="installmentsActions">
                <button onClick={handleEmptyCart}  className="installmentsEmptyCart">Vaciar Carrito</button>
                <Link to="/delivery-checkout"><button className="installmentsCheckout">Delivery</button></Link>
            </div>
        </div>
    )
}