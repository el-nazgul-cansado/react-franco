import { Link, useNavigate } from 'react-router-dom'
import { useContext, useState, useEffect } from 'react'
import { Loading } from '../../Componentes/Loading/Loading'
import { DeliveryContext } from '../../context/DeliveryContext'
import { LoginContext } from '../../context/LoginContext'
import { Footer } from '../../Componentes/Footer/Footer'
import { Formik, Form, Field } from 'formik';
import { DeliveryCheckoutValidation } from './DeliveryCheckoutValidation'
import './DeliveryCheckout.css'

export const DeliveryCheckout = () => {

    const { selectedOption, setSelectedOption } = useContext(DeliveryContext)

    const { user } = useContext(LoginContext)
    
    const navigate = useNavigate()

    const [loading, setLoading] = useState(true)
    const [userLogged, setUserLogged] = useState(false)

    const select_option_audio = new Audio("assets/sounds/buttons_sounds/next_card.mp3")

    setTimeout(() =>{
        setLoading(false)
    }, 900)

    useEffect(() => {
        const checkUserLogged = async () => {
          if (user.logged === true) {
            setUserLogged(true);
          }
        };
    
        checkUserLogged();
      }, [user.logged]);
    
      useEffect(() => {
        const timeout = setTimeout(() => {
          if (!userLogged) {
            navigate('/login-register'); // Reemplaza '/otra-ruta' con la ruta deseada
          }
        }, 900);
    
        return () => clearTimeout(timeout); // Limpia el timeout si el componente se desmonta
      }, [userLogged, navigate]);

    const handleOptionInStorePickup = (setFieldValue) => {
    // Actualiza el estado local
    setSelectedOption({
        option: 'in-storePickup',
        address: '',
        addressNumber: '',
        dept: null,
        zipCode: '',
        province: '',
        city: '',
        crossStreet1: '',
        crossStreet2: '',
        atHomeWork: ''
    });

    // Asegúrate de que Formik también tenga los valores correctos
    setFieldValue('option', 'in-storePickup');
    setFieldValue('address', '');
    setFieldValue('addressNumber', '');
    setFieldValue('dept', '');
    setFieldValue('zipCode', '');
    setFieldValue('province', '');
    setFieldValue('city', '');
    setFieldValue('crossStreet1', '');
    setFieldValue('crossStreet2', '');
    setFieldValue('atHomeWork', '');

    select_option_audio.play()
    };

    const handleOptionDelivery = (setFieldValue) => {
        setSelectedOption(prevState => ({
            ...prevState,
            option: 'delivery',
        }));
        setFieldValue('option', 'delivery');
        select_option_audio.play()
    };

    const handleAtHomeWorkChange = (value, setFieldValue) => {
        setSelectedOption(prevState => ({
            ...prevState,
            atHomeWork: value,
        }));
        setFieldValue('atHomeWork', value);
    };

    const handleSubmit = (values, actions) => {
        let finalValues;

        if (values.option === 'in-storePickup') {
            finalValues = {
                option: 'in-storePickup',
                address: 'Avenida Siempreviva',
                addressNumber: '742',
                dept: null,
                zipCode: '1714',
                province: 'Buenos Aires',
                city: 'Ituzaingo',
                crossStreet1: 'Avenida Nuncaviva',
                crossStreet2: 'Avenida Avecesviva',
                atHomeWork: ''
            };
        } else {
            finalValues = { ...values };
        }
    
        // Actualiza el estado local con los valores finales
        setSelectedOption(finalValues);
    
        // Actualiza Formik con los valores finales
        actions.setValues(finalValues);
    
        // Verifica si hay errores antes de proceder
        actions.validateForm(finalValues).then(errors => {
            if (Object.keys(errors).length === 0) {
                // Si no hay errores, navega al checkout
                navigate("/checkout");
            } else {
                console.error("Validation errors:", errors);
            }
        });
    
        // Marca la sumisión del formulario como completa
        actions.setSubmitting(false);
    };

    const validationSchema = selectedOption.option === 'delivery' && DeliveryCheckoutValidation

    return(
        <>
        {loading ? <Loading /> :
        <Formik
            initialValues={selectedOption}
            validationSchema={validationSchema}
            validateOnChange={false}
            onSubmit={handleSubmit}
        >
            {({errors, setFieldValue, touched }) => (
                        <div className="deliveryFormAndActionsContainer">
                            <Form className='deliveryFormContainer'>
                                <div className={`in-storePickupContainer ${selectedOption.option === 'in-storePickup' ? 'deliverySelected' : ''}`} onClick={() => handleOptionInStorePickup(setFieldValue)}>
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
                                    <div className={`deliveryInputAndParagraphsContainer ${selectedOption.option === 'delivery' ? 'deliverySelected' : ''}`} onClick={() => handleOptionDelivery(setFieldValue)}>
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
                                                <Field className={`deliveryInput ${selectedOption.option === 'delivery' ? 'deliverySelectedInput' : ''}`} disabled={selectedOption.option === 'in-storePickup'} type="text" name="address" id="address" />
                                                {errors.address && <div className="alert alert-danger p-1" role="alert">{errors.address}</div>}
                                            </div>
                                            <div className='deliveryInputLabelContainer'>
                                                <label className={`deliveryInputLabel ${selectedOption.option === 'delivery' ? 'deliverySelectedLabel' : ''}`} htmlFor="addressNumber">Altura</label>
                                                <Field className={`deliveryInput ${selectedOption.option === 'delivery' ? 'deliverySelectedInput' : ''}`} disabled={selectedOption.option === 'in-storePickup'} type="text" name="addressNumber" id="addressNumber" />
                                                {errors.addressNumber && <div className="alert alert-danger p-1" role="alert">{errors.addressNumber}</div>}
                                            </div>
                                            <div className='deliveryInputLabelContainer'>
                                                <label className={`deliveryInputLabel ${selectedOption.option === 'delivery' ? 'deliverySelectedLabel' : ''}`} htmlFor="dept">Dpto (opcional)</label>
                                                <Field className={`deliveryInput ${selectedOption.option === 'delivery' ? 'deliverySelectedInput' : ''}`} disabled={selectedOption.option === 'in-storePickup'} type="text" name="dept" id="dept" />
                                            </div>
                                        </div>
                                        <div className='inputsDown'>
                                            <div className='deliveryInputLabelContainer'>
                                                <label className={`deliveryInputLabel ${selectedOption.option === 'delivery' ? 'deliverySelectedLabel' : ''}`} htmlFor="zipCode">Código postal</label>
                                                <Field className={`deliveryInput ${selectedOption.option === 'delivery' ? 'deliverySelectedInput' : ''}`} disabled={selectedOption.option === 'in-storePickup'} type="text" name="zipCode" id="zipCode" />
                                                {errors.zipCode && <div className="alert alert-danger p-1" role="alert">{errors.zipCode}</div>}
                                            </div>
                                            <div className='deliveryInputLabelContainer'>
                                                <label className={`deliveryInputLabel ${selectedOption.option === 'delivery' ? 'deliverySelectedLabel' : ''}`} htmlFor="province">Provincia</label>
                                                <Field className={`deliveryInput ${selectedOption.option === 'delivery' ? 'deliverySelectedInput' : ''}`} disabled={selectedOption.option === 'in-storePickup'} type="text" name="province" id="province" />
                                                {errors.province && <div className="alert alert-danger p-1" role="alert">{errors.province}</div>}
                                            </div>
                                            <div className='deliveryInputLabelContainer'>
                                                <label className={`deliveryInputLabel ${selectedOption.option === 'delivery' ? 'deliverySelectedLabel' : ''}`} htmlFor="city">Ciudad</label>
                                                <Field className={`deliveryInput ${selectedOption.option === 'delivery' ? 'deliverySelectedInput' : ''}`} disabled={selectedOption.option === 'in-storePickup'} type="text" name="city" id="city" />
                                                {errors.city && <div className="alert alert-danger p-1" role="alert">{errors.city}</div>}
                                            </div>
                                        </div>
                                        <div>
                                            <label className={`crossStreetsLabel ${selectedOption.option === 'delivery' ? 'deliverySelectedLabel' : ''}`}>¿Entre que calles está?</label>
                                            <div className='crossStreet'>
                                                <div className='crossStreetInput'>
                                                    <label className={`deliveryInputLabel ${selectedOption.option === 'delivery' ? 'deliverySelectedLabel' : ''}`} htmlFor="crossStreet1">Entre calle 1</label>
                                                    <Field className={`deliveryInput ${selectedOption.option === 'delivery' ? 'deliverySelectedInput' : ''}`} disabled={selectedOption.option === 'in-storePickup'} type="text" name="crossStreet1" id="crossStreet1" />
                                                    {errors.crossStreet1 && <div className="alert alert-danger p-1" role="alert">{errors.crossStreet1}</div>}
                                                </div>
                                                <div className='crossStreetInput'>
                                                    <label className={`deliveryInputLabel ${selectedOption.option === 'delivery' ? 'deliverySelectedLabel' : ''}`} htmlFor="crossStreet2">Entre calle 2</label>
                                                    <Field className={`deliveryInput ${selectedOption.option === 'delivery' ? 'deliverySelectedInput' : ''}`} disabled={selectedOption.option === 'in-storePickup'} type="text" name="crossStreet2" id="crossStreet2" />
                                                    {errors.crossStreet2 && <div className="alert alert-danger p-1" role="alert">{errors.crossStreet2}</div>}
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <label className={`atHomeWorkLabel ${selectedOption.option === 'delivery' ? 'deliverySelectedLabel' : ''}`}>¿Es tu trabajo o tu casa?</label>
                                            <div className='atHomeWorkContainer'>
                                                <div className="atHomeWorkOption" onClick={() => handleAtHomeWorkChange('trabajo')}>
                                                    <div className='atHomeWorkInputContainer'>
                                                        <input className="deliveryRadioInput" disabled={selectedOption.option === 'in-storePickup'} checked={selectedOption.atHomeWork === 'trabajo'} onChange={() => handleAtHomeWorkChange('trabajo', setFieldValue)} type="radio" id="atWorkInput" />
                                                        <label className="deliveryCustomRadio" htmlFor="atWorkInput"></label>
                                                    </div>
                                                    <div>
                                                        <p className={`atHomeWorkParagraph ${selectedOption.option === 'delivery' ? 'deliverySelectedLabel' : ''}`}>Es mi trabajo</p>
                                                    </div>
                                                </div>
                                                <div className="atHomeWorkOption" onClick={() => handleAtHomeWorkChange('casa')}>
                                                    <div className='atHomeWorkInputContainer'>
                                                        <input className="deliveryRadioInput" disabled={selectedOption.option === 'in-storePickup'} checked={selectedOption.atHomeWork === 'casa'} onChange={() => handleAtHomeWorkChange('casa', setFieldValue)} type="radio" id="atHomeInput" />
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
                                    <Link to={'/cart'}><button className='deliveryBackButton'>Volver</button></Link>            
                                    <input className='deliverySubmit' type="submit" name="deliverySubmit" id="deliverySubmit" value='Checkout' />
                                </div>
                            </Form>
                            <Footer />
                        </div>
            )}
        </Formik>
}
        </>
    )
}