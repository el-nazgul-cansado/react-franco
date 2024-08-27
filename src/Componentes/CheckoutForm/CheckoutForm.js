import { Formik, Form, Field } from 'formik';
import { CheckoutValidation } from './CheckoutFormValidation';
import './CheckoutForm.css'

export const CheckoutForm = ({ values, cart, handleSubmit }) => {

    return(
        <Formik
            initialValues={values}
            validationSchema={CheckoutValidation}
            onSubmit={handleSubmit}
            validateOnChange={false}
            validateOnBlur={false}
        >
        {({ errors, touched }) => (
                    <Form>
                        <Field className="form-control checkout-form-input" maxLength='20' type="text" name="nombre" placeholder="Tu nombre"/>
                        {errors.nombre && <div className="alert alert-danger p-1" role="alert">{errors.nombre}</div>}
    
                        <Field className="form-control checkout-form-input" maxLength='35' type="email" name="email" placeholder="Tu email"/>
                        {errors.email && <div className="alert alert-danger p-1" role="alert">{errors.email}</div>}
    
                        <Field className="form-control checkout-form-input" maxLength='16' type="text" name="celular" placeholder="Tu celular" />
                        {errors.celular && <div className="alert alert-danger p-1" role="alert">{errors.celular}</div>}
                        <div>
                            <Field as='select'
                                name="metodoDePago"
                                className="form-control checkout-form-input"
                            >
                                <option value={""} disabled>Selecciona un método de pago</option>
                                <option value={"mastercard"}>Mastercard</option>
                                <option value={"visa"}>Visa</option>
                            </Field>
                        </div>
                        {errors.metodoDePago && <div className="alert alert-danger p-1" role="alert">{errors.metodoDePago}</div>}
    
                        <Field className="form-control checkout-form-input" maxLength='16' type="text" name="creditCard" placeholder={"Numero de la tarjeta"} limit={16} />
                        {errors.creditCard && <div className="alert alert-danger p-1" role="alert">{errors.creditCard}</div>}
    
                        <div>
                            <div>
                                <Field className={"form-control checkout-form-input"} maxLength='2' type="text" name={"MM"} placeholder={"MM"} />
                                {errors.MM && <div className="alert alert-danger p-1" role="alert">{errors.MM}</div>}
                                <Field className={"form-control checkout-form-input"} maxLength='2' type="text" name={"YY"} placeholder={"YY"} />
                                {errors.YY && <div className="alert alert-danger p-1" role="alert">{errors.YY}</div>}
                            </div>
                            <div>
                                <Field className={"form-control checkout-form-input"} maxLength='3' type="text" name={"cvc"} placeholder={"CVC"} />
                                {errors.cvc && <div className="alert alert-danger p-1" role="alert">{errors.cvc}</div>}
                            </div>
                        </div>
                        {errors.datosTarjeta && <div className="alert alert-danger p-1" role="alert">{errors.datosTarjeta}</div>}
                        <input type='submit' className="checkout-summary-btn" disabled={cart.length===0} value='Finalizar compra' />
                    </Form>
        )}
        </Formik>
    )
}