import { Link, useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { DeliveryContext } from '../../context/DeliveryContext'
import { Footer } from '../../Componentes/Footer/Footer'
import './DeliveryCheckout.css'

export const DeliveryCheckout = () => {

    const { selectedOption, setSelectedOption, selectedAtHomeWorkOption, setSelectedAtHomeWorkOption, setFinalSelectedOption } = useContext(DeliveryContext)

    const navigate = useNavigate()

    const handleVolverDelivery = () => {
        navigate(-1)
    }

    const handleOptionInStorePickup = () => {
        setSelectedOption({
                            option: 'in-storePickup',
        });
        setSelectedAtHomeWorkOption('')
    };

    const handleOptionDelivery = () => {
        setSelectedOption({
                            option: 'delivery',
        });
    };

    const handleAtHomeWorkChange = (option) => {

        if(selectedOption.option === 'delivery'){
            setSelectedAtHomeWorkOption(option);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSelectedOption(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {

        e.preventDefault();
        setFinalSelectedOption({ ...selectedOption, atHomeWork: selectedAtHomeWorkOption });

        if (selectedOption.option === 'in-storePickup') {
            setFinalSelectedOption( {
                address: 'Avenida Siempreviva',
                addressNumber: 742,
                dept: null,
                zipCode: '1714',
                province: 'Buenos Aires',
                city: 'Ituzaingo',
                crossStreet1: 'Avenida Nuncaviva',
                crossStreet2: 'Avenida Avecesviva',
                atHomeWork: null
            });
        }

        navigate("/checkout")
    };

    return(
        <div className="deliveryFormAndActionsContainer">
            <form className='deliveryFormContainer' onSubmit={handleSubmit}>
                <div className={`in-storePickupContainer ${selectedOption.option === 'in-storePickup' ? 'deliverySelected' : ''}`} onClick={() => handleOptionInStorePickup()}>
                    <div className='in-storeDeliveryInputContainer'>
                        <input type="radio" className="deliveryRadioInput" id="in-storePickupInput" checked={selectedOption.option === 'in-storePickup'} onChange={handleOptionInStorePickup} />
                        <label className="deliveryCustomRadio" htmlFor="in-storePickupInput"></label>
                    </div>
                    <div className='in-storePickupParagraphsContainer'>
                        <p className='in-storePickupParagraph'>Retiro del local</p>
                        <p className='in-storePickupParagraph'>Gratis</p>
                    </div>
                </div>
                <div className="deliveryContainer">
                    <div className={`deliveryInputAndParagraphsContainer ${selectedOption.option === 'delivery' ? 'deliverySelected' : ''}`} onClick={() => handleOptionDelivery()}>
                        <div className='deliveryRadioInputContainer'>
                            <input type="radio" className="deliveryRadioInput" id="deliveryRadioInput" checked={selectedOption.option === 'delivery'} onChange={handleOptionDelivery} />
                            <label className="deliveryCustomRadio" htmlFor="deliveryRadioInput"></label>
                        </div>
                        <div className='deliveryParagraphsContainer'>
                            <p className='deliveryParagraph'>Envio a domicilio</p>
                            <p className='deliveryParagraph'>Gratis</p>
                        </div>
                    </div>
                    <div className='deliveryForm'>
                        <div className='inputsUp'>
                            <div className='deliveryInputLabelContainer'>
                                <label className={`deliveryInputLabel ${selectedOption.option === 'delivery' ? 'deliverySelectedLabel' : ''}`} htmlFor="address">Direccion</label>
                                <input className={`deliveryInput ${selectedOption.option === 'delivery' ? 'deliverySelectedInput' : ''}`} disabled={selectedOption.option === 'in-storePickup'} type="text" name="address" id="address" value={selectedOption.address || ''} onChange={handleInputChange} />
                            </div>
                            <div className='deliveryInputLabelContainer'>
                                <label className={`deliveryInputLabel ${selectedOption.option === 'delivery' ? 'deliverySelectedLabel' : ''}`} htmlFor="addressNumber">Altura</label>
                                <input className={`deliveryInput ${selectedOption.option === 'delivery' ? 'deliverySelectedInput' : ''}`} disabled={selectedOption.option === 'in-storePickup'} type="number" name="addressNumber" id="addressNumber" value={selectedOption.addressNumber || ''} onChange={handleInputChange} />
                            </div>
                            <div className='deliveryInputLabelContainer'>
                                <label className={`deliveryInputLabel ${selectedOption.option === 'delivery' ? 'deliverySelectedLabel' : ''}`} htmlFor="dept">Dpto (opcional)</label>
                                <input className={`deliveryInput ${selectedOption.option === 'delivery' ? 'deliverySelectedInput' : ''}`} disabled={selectedOption.option === 'in-storePickup'} type="text" name="dept" id="dept" value={selectedOption.dept || ''} onChange={handleInputChange} />
                            </div>
                        </div>
                        <div className='inputsDown'>
                            <div className='deliveryInputLabelContainer'>
                                <label className={`deliveryInputLabel ${selectedOption.option === 'delivery' ? 'deliverySelectedLabel' : ''}`} htmlFor="zipCode">Código postal</label>
                                <input className={`deliveryInput ${selectedOption.option === 'delivery' ? 'deliverySelectedInput' : ''}`} disabled={selectedOption.option === 'in-storePickup'} type="text" name="zipCode" id="zipCode" value={selectedOption.zipCode || ''} onChange={handleInputChange} />
                            </div>
                            <div className='deliveryInputLabelContainer'>
                                <label className={`deliveryInputLabel ${selectedOption.option === 'delivery' ? 'deliverySelectedLabel' : ''}`} htmlFor="province">Provincia</label>
                                <input className={`deliveryInput ${selectedOption.option === 'delivery' ? 'deliverySelectedInput' : ''}`} disabled={selectedOption.option === 'in-storePickup'} type="text" name="province" id="province" value={selectedOption.province || ''} onChange={handleInputChange} />
                            </div>
                            <div className='deliveryInputLabelContainer'>
                                <label className={`deliveryInputLabel ${selectedOption.option === 'delivery' ? 'deliverySelectedLabel' : ''}`} htmlFor="city">Ciudad</label>
                                <input className={`deliveryInput ${selectedOption.option === 'delivery' ? 'deliverySelectedInput' : ''}`} disabled={selectedOption.option === 'in-storePickup'} type="text" name="city" id="city" value={selectedOption.city || ''} onChange={handleInputChange} />
                            </div>
                        </div>
                        <div>
                            <label className={`crossStreetsLabel ${selectedOption.option === 'delivery' ? 'deliverySelectedLabel' : ''}`}>¿Entre que calles está?</label>
                            <div className='crossStreet'>
                                <div className='crossStreetInput'>
                                    <label className={`deliveryInputLabel ${selectedOption.option === 'delivery' ? 'deliverySelectedLabel' : ''}`} htmlFor="crossStreet1">Entre calle 1</label>
                                    <input className={`deliveryInput ${selectedOption.option === 'delivery' ? 'deliverySelectedInput' : ''}`} disabled={selectedOption.option === 'in-storePickup'} type="text" name="crossStreet1" id="crossStreet1" value={selectedOption.crossStreet1 || ''} onChange={handleInputChange} />
                                </div>
                                <div className='crossStreetInput'>
                                    <label className={`deliveryInputLabel ${selectedOption.option === 'delivery' ? 'deliverySelectedLabel' : ''}`} htmlFor="crossStreet2">Entre calle 2</label>
                                    <input className={`deliveryInput ${selectedOption.option === 'delivery' ? 'deliverySelectedInput' : ''}`} disabled={selectedOption.option === 'in-storePickup'} type="text" name="crossStreet2" id="crossStreet2" value={selectedOption.crossStreet2 || ''} onChange={handleInputChange} />
                                </div>
                            </div>
                        </div>
                        <div>
                            <label className={`atHomeWorkLabel ${selectedOption.option === 'delivery' ? 'deliverySelectedLabel' : ''}`}>¿Es tu trabajo o tu casa?</label>
                            <div className='atHomeWorkContainer'>
                                <div className="atHomeWorkOption" onClick={() => handleAtHomeWorkChange('work')}>
                                    <div className='atHomeWorkInputContainer'>
                                        <input className="deliveryRadioInput" disabled={selectedOption.option === 'in-storePickup'} checked={selectedAtHomeWorkOption === 'work'} onChange={() => handleAtHomeWorkChange('work')} type="radio" id="atWorkInput" />
                                        <label className="deliveryCustomRadio" htmlFor="atWorkInput"></label>
                                    </div>
                                    <div>
                                        <p className={`atHomeWorkParagraph ${selectedOption.option === 'delivery' ? 'deliverySelectedLabel' : ''}`}>Es mi trabajo</p>
                                    </div>
                                </div>
                                <div className="atHomeWorkOption" onClick={() => handleAtHomeWorkChange('home')}>
                                    <div className='atHomeWorkInputContainer'>
                                        <input className="deliveryRadioInput" disabled={selectedOption.option === 'in-storePickup'} checked={selectedAtHomeWorkOption === 'home'} onChange={() => handleAtHomeWorkChange('home')} type="radio" id="atHomeInput" />
                                        <label className="deliveryCustomRadio" htmlFor="atHomeInput"></label>
                                    </div>
                                    <div>
                                        <p className={`atHomeWorkParagraph ${selectedOption.option === 'delivery' ? 'deliverySelectedLabel' : ''}`}>Es mi casa</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="deliveryActionsContainer">
                    <Link to={'/cart'}><button className='deliveryBackButton' onClick={handleVolverDelivery}>Volver</button></Link>            
                    <input className='deliverySubmit' type="submit" name="deliverySubmit" id="deliverySubmit" value='Checkout' />
                </div>
            </form>
            <Footer />
        </div>
    )
}