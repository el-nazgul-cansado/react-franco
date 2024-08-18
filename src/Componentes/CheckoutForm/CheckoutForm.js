import { CharacterLimitInput } from '../CharacterInputNumberLimit/CharacterInputNumberLimit';
import './CheckoutForm.css'

export const CheckoutForm = ({ handleSubmit, handleInputChange, errors, values, cart }) => {

    return(
        <form onSubmit={handleSubmit}>
                    <input className="form-control checkout-form-input" maxLength='20' onChange={handleInputChange} type="text" name="nombre" value={values.nombre} placeholder="Tu nombre"/>
                    {errors.nombre && <div className="alert alert-danger p-1" role="alert">{errors.nombre}</div>}

                    <input className="form-control checkout-form-input" maxLength='35' onChange={handleInputChange} type="email" name="email" value={values.email} placeholder="Tu email"/>
                    {errors.email && <div className="alert alert-danger p-1" role="alert">{errors.email}</div>}

                    <CharacterLimitInput className={"form-control checkout-form-input"} onChange={handleInputChange} type="number" name={"celular"} value={values.celular} placeholder={"Tu celular"} limit={10} />
                    {errors.celular && <div className="alert alert-danger p-1" role="alert">{errors.celular}</div>}
                    <div>
                        <select
                            name="metodoDePago"
                            className="form-control checkout-form-input"
                            onChange={handleInputChange}
                            value={values.metodoDePago}
                        >
                            <option value={""} disabled>Selecciona un método de pago</option>
                            <option value={"mastercard"}>Mastercard</option>
                            <option value={"visa"}>Visa</option>
                        </select>
                    </div>
                    {errors.metodoDePago && <div className="alert alert-danger p-1" role="alert">{errors.metodoDePago}</div>}

                    <CharacterLimitInput className={"form-control checkout-form-input"} onChange={handleInputChange} type="number" name={"creditCard"} value={values.creditCard} placeholder={"Numero de la tarjeta"} limit={16} />
                    {errors.creditCard && <div className="alert alert-danger p-1" role="alert">{errors.creditCard}</div>}

                    <div>
                        <div>
                            <CharacterLimitInput className={"form-control checkout-form-input"} onChange={handleInputChange} type="number" name={"MM"} value={values.MM} placeholder={"MM"} limit={2} />
                            <CharacterLimitInput className={"form-control checkout-form-input"} onChange={handleInputChange} type="number" name={"YY"} value={values.YY} placeholder={"YY"} limit={2} />
                        </div>
                        <div>
                            <CharacterLimitInput className={"form-control checkout-form-input"} onChange={handleInputChange} type="number" name={"cvc"} value={values.cvc} placeholder={"CVC"} limit={3} />
                        </div>
                    </div>
                    {errors.datosTarjeta && <div className="alert alert-danger p-1" role="alert">{errors.datosTarjeta}</div>}
                    <input type='submit' className="checkout-summary-btn" disabled={cart.length===0} value='Finalizar compra' />
                </form>
    )
}