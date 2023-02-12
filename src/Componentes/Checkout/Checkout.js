import { useState } from "react"
import { Link, Navigate } from "react-router-dom"
import { useCartContext } from "../../context/CartContext"
import { db } from "../../firebase/config"
import { collection, writeBatch, documentId, getDocs, where, query, addDoc } from "firebase/firestore"



export const Checkout = () => {
    const { cart, totalCart, emptyCart } = useCartContext()

    const [createdOrder, setCreatedOrder] = useState(null)

    const [values, setValues] = useState({
        nombre: '',
        direccion: '',
        email: ''
    })

    const handleInputChange = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if(values.nombre.length < 2) {
           alert("nombre invalido")
           return 
        }
        if(values.direccion.length < 2) {
           alert("direccion invalida")
           return 
        }
        if(values.email.length < 2) {
           alert("email invalido")
           return 
        }

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
            alert("Hay Items sin stock")
        }

    }

    if (createdOrder) {
        return (
            <div>
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
        <div>
            <h2>Terminar compra</h2>
            <hr/>

            <form onSubmit={handleSubmit}>
                <input className="form-control my-2" onChange={handleInputChange} type="text" name="nombre" value={values.nombre} placeholder="Tu nombre"/>
                <input className="form-control my-2" onChange={handleInputChange} type="text" name="direccion" value={values.direccion} placeholder="Tu direccion"/>
                <input className="form-control my-2" onChange={handleInputChange} type="email" name="email" value={values.email} placeholder="Tu email"/>
                <button className="btn btn-primary">Enviar</button>
            </form>
        </div>
    )
}