import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Footer } from '../Footer/Footer'
import { useCartContext } from "../../context/CartContext"
import { useLoginContext } from "../../context/LoginContext"
import { CheckoutSummary } from "../CheckoutSummary/CheckoutSummary"
import { CheckoutForm } from "../CheckoutForm/CheckoutForm"
import { pedirDatos } from "../../helpers/pedirDatos"
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import "./Checkout.css"
/* import { db } from "../../firebase/config"
import { collection, writeBatch, documentId, getDocs, where, query, addDoc } from "firebase/firestore" */


export const Checkout = () => {
    const { cart, emptyCart } = useCartContext()

    const { user } = useLoginContext()

    const [createdOrder, setCreatedOrder] = useState(null)
    const [allProds, setAllProds] = useState([])
    const [errors, setErrors] = useState({})

    const [loadingCheck, setLoadingCheck] = useState(false)

    const [values, setValues] = useState({
        nombre: '',
        direccion: '',
        email: '',
        celular: '',
        metodoDePago: '',
        creditCard: '',
        cvc: '',
        MM: '',
        YY: '',
        ordenCodigo: ''
    })

    if (user.logged) {
        values.nombre = user.displayName
        values.email = user.email
    }

    const handleInputChange = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        })
    }
    
    useEffect(() => {
        pedirDatos()
        .then(data =>{ setAllProds(data)})
    },[allProds])

    const handleSubmit = (e) => {
        e.preventDefault()
<<<<<<< HEAD

        setLoadingCheck(true)

        const order = {
            cliente: values,
            item: cart,
            total: totalCart()
        }

        const batch = writeBatch(db)
        const ordersRef = collection(db, 'orders')
        const productosRef = collection(db, 'productos')

        const outOfStock = []

        const itemsRef = query(productosRef, where(documentId(), 'in', cart.map(prod => prod.id)))

        const productosAsync = await getDocs(itemsRef)
=======
>>>>>>> nueva_rama
        
        let check = true
        
            const MySwal = withReactContent(Swal)
                allProds.filter(producto =>
                    cart.find(item => {
                    if (item.id === producto.id) {
                        if (producto.stock <= 0){
                            MySwal.fire({
                                title: <strong>Oh no!!</strong>,
                                html: <i>Ya no hay stock de {item.name}!!</i>,
                                icon: 'error'
                                })
                            check = false
                          }
                    }
                    })
                  );

            let checkForm = {}
            
            if(!values.nombre.trim()) {
                checkForm.nombre = 'Este campo no puede estar vacio'
                check = false
                setErrors(checkForm)
            } else {
                delete errors.nombre
            }
            if(!values.direccion.trim()) {
                checkForm.direccion = 'Este campo no puede estar vacio'
                check = false
                setErrors(checkForm)
            } else {
                delete errors.direccion
            }
            if(!values.email.trim()) {
                checkForm.email = 'Este campo no puede estar vacio'
                check = false
                setErrors(checkForm)
            } else {
                delete errors.email
            }
            if(!values.celular.trim()) {
                checkForm.celular = 'Este campo no puede estar vacio'
                check = false
                setErrors(checkForm)
            } else {
                delete errors.celular
            }
            if(values.celular.length < 10) {
                checkForm.celular = 'Numero incompleto'
                check = false
                setErrors(checkForm)
            } else {
                delete errors.celular
            }
            if(values.metodoDePago.length <= 0) {
                checkForm.metodoDePago = 'Este campo no puede estar vacio'
                check = false
                setErrors(checkForm)
            } else {
                delete errors.metodoDePago
            }
            if(!values.creditCard.trim()) {
                checkForm.creditCard = 'Este campo no puede estar vacio'
                check = false
                setErrors(checkForm)
            } else {
                delete errors.creditCard
            }
            if(values.creditCard.length < 12) {
                checkForm.creditCard = 'Numero incompleto'
                check = false
                setErrors(checkForm)
            } else {
                delete errors.creditCard
            }
            if(!values.MM.trim()) {
                checkForm.datosTarjeta = 'Estos campos no puedenestar vacios'
                check = false
                setErrors(checkForm)
            } else {
                delete errors.datosTarjeta
            }
            if(!values.YY.trim()) {
                checkForm.datosTarjeta = 'Estos campos no puedenestar vacios'
                check = false
                setErrors(checkForm)
            } else {
                delete errors.datosTarjeta
            }
            if(!values.cvc.trim()) {
                checkForm.datosTarjeta = 'Estos campos no puedenestar vacios'
                check = false
                setErrors(checkForm)
            } else {
                delete errors.datosTarjeta
            }

            function generarCaracterAleatorio() {
                var caracteres = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
                var indice = Math.floor(Math.random() * caracteres.length);
                return caracteres.charAt(indice);
              }
            
              function generarCaracteresAleatorios(cantidad) {
                var resultado = "";
                for (var i = 0; i < cantidad; i++) {
                  resultado += generarCaracterAleatorio();
                }
                return resultado;
              }
              var caracteresAleatorios = generarCaracteresAleatorios(10);

        if (check) {
            allProds.filter(producto =>
                cart.find(item => {
                if (item.id === producto.id && item.cantidad > 0 && producto.stock > 0) {
                    let stockFinal = producto.stock - item.cantidad;
                    values.ordenCodigo = caracteresAleatorios
                    setCreatedOrder(values)
                    console.log(stockFinal)
                    emptyCart()
                  } 
                })
              );
        }
    }

    if(createdOrder) {
        return(
            <>
                <h2>Felicidades {createdOrder.nombre}!! Tu compra fue exitosa!!</h2>

                <h3>Tu codigo de compra es {createdOrder.ordenCodigo}</h3>

                <h2>Disfruta tu compra! Vuelve cuando quieras!!</h2>

                <Link to='/'>Volver al inicio</Link>
                <Footer />
            </>
        )
    }

    return(
        <>
            <div className="checkoutContainer">   
                <div>
                    <CheckoutSummary />
                </div>
                <div>
                    <h2>Terminar compra</h2>
                    <hr/>
                    <CheckoutForm handleSubmit={handleSubmit} handleInputChange={handleInputChange} values={values} errors={errors} cart={cart} />
                </div>
            </div>
<<<<<<< HEAD
            <div>
                <h2>Terminar compra</h2>
                <hr/>
                <form onSubmit={handleSubmit}>
                    <input className="form-control my-2" onChange={handleInputChange} type="text" name="nombre" value={values.nombre} placeholder="Tu nombre"/>

                    <input className="form-control my-2" onChange={handleInputChange} type="text" name="direccion" value={values.direccion} placeholder="Tu direccion"/>

                    <input className="form-control my-2" onChange={handleInputChange} type="email" name="email" value={values.email} placeholder="Tu email"/>

                    <input className="form-control my-2" onChange={handleInputChange} type="number" name="celular" value={values.celular} placeholder="Tu celular"/>
                    <div>
                        <select
                            name="metodoDePago"
                            className="form-control my-2"
                            onChange={handleInputChange}
                            value={values.paymentMethod}
                        >
                            <option value={""} disabled>Selecciona un método de pago</option>
                            <option value={"mastercard"}>Mastercard</option>
                            <option value={"visa"}>Visa</option>
                        </select>
                            
                    </div>
                    <input className="form-control my-2" onChange={handleInputChange} type="number" name="creditCard" value={values.creditCard} placeholder="Numero de la tarjeta"/>

                    <div>
                        <div>
                            <input className="form-control my-2" onChange={handleInputChange} type="number" name="MM" value={values.MM} placeholder="MM"/>
                            <input className="form-control my-2" onChange={handleInputChange} type="number" name="YY" value={values.YY} placeholder="YY"/>

                        </div>
                        <div>
                            <input className="form-control my-2" onChange={handleInputChange} type="number" name="cvc" value={values.cvc} placeholder="CVC"/>

                        </div>
                    </div>
                    <button className="btn btn-success" disabled={loadingCheck}>Terminar compra</button>
                </form>
            </div>
        </div>
=======
            <Footer />
        </>
>>>>>>> nueva_rama
    )
}