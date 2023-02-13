import { useState } from "react"
import { Link, Navigate } from "react-router-dom"
import { useCartContext } from "../../context/CartContext"
import { db } from "../../firebase/config"
import { collection, writeBatch, documentId, getDocs, where, query, addDoc } from "firebase/firestore"
import { CheckoutSummary } from "../CheckoutSummary/CheckoutSummary"
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import "./Checkout.css"


export const Checkout = () => {
    const { cart, totalCart, emptyCart } = useCartContext()

    const [createdOrder, setCreatedOrder] = useState(null)

    const [values, setValues] = useState({
        nombre: '',
        direccion: '',
        email: '',
        celular: '',
        metodoDePago: '',
        creditCard: '',
        cvc: '',
        MM: '',
        YY: ''
    })

    const handleInputChange = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

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
        
        productosAsync.docs.forEach(doc => {
            const item = cart.find(item => item.id === doc.id)

            if (doc.data().stock >= item.cantidad){
                batch.update(doc.ref, {stock: doc.data().stock - item.cantidad})
            } else {
                outOfStock.push(item)
            }
        })

        const MySwal = withReactContent(Swal)

        if(outOfStock.length === 0) {
            batch.commit()
                .then(() => {
                    addDoc(ordersRef, order)
                        .then((doc) => {
                            setCreatedOrder(doc.id)
                            emptyCart()
                        })
                        .catch((error) => console.log(error))
                            })
        } else {
            MySwal.fire({
                title: <strong>Oh no!!</strong>,
                html: <i>Ya no hay stock!!</i>,
                icon: 'error'
                })
        }

    }

    if (createdOrder) {
        return (
            <div className="compraExitosa">
                <h2>Tu compra ha sido exitosa</h2>
                <hr/>
                <p>tu codigo de compra es: {createdOrder}</p>

                <Link to="/" className="btn btn-success">Volver al inicio</Link>
            </div>
        )
    }

    if(cart.length === 0){
        return <Navigate to="/" />
    }

    return(
         <div className="checkoutContainer">   
            <div>
            <CheckoutSummary />
            </div>
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
                    <button className="btn btn-success">Terminar compra</button>
                </form>
            </div>
        </div>
    )
}