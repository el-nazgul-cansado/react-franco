import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Footer } from '../../Componentes/Footer/Footer'
import { useCartContext } from "../../context/CartContext"
import { useLoginContext } from "../../context/LoginContext"
import { useDeliveryContext } from "../../context/DeliveryContext"
import { Loading } from "../../Componentes/Loading/Loading"
import { CheckoutSummary } from "../../Componentes/CheckoutSummary/CheckoutSummary"
import { CheckoutForm } from "../../Componentes/CheckoutForm/CheckoutForm"
import { DeliverySummary } from "../../Componentes/DeliverySummary/DeliverySummary"
import { pedirDatos } from "../../helpers/pedirDatos"
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import "./Checkout.css"
/* import { db } from "../../firebase/config"
import { collection, writeBatch, documentId, getDocs, where, query, addDoc } from "firebase/firestore" */


export const Checkout = () => {

    const navigate = useNavigate();

    const { cart, emptyCart } = useCartContext()

    const { user } = useLoginContext()

    const { selectedOption } = useDeliveryContext()

    const [createdOrder, setCreatedOrder] = useState(null)
    const [allProds, setAllProds] = useState([])
    const [userLogged, setUserLogged] = useState(false)
    const [isDeliverySummaryReady, setIsDeliverySummaryReady] = useState(false);

    const [loading, setLoading] = useState(true)

    const [values, setValues] = useState({
        nombre: '',
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

      useEffect(() => {
        // Simula la verificación del estado de carga del componente DeliverySummary
        const checkDeliverySummary = async () => {
            await new Promise(resolve => setTimeout(resolve, 1000)); // Simula tiempo de carga
            setIsDeliverySummaryReady(true); // Marca como listo cuando esté cargado
        };

        checkDeliverySummary();
    }, []);

    useEffect(() => {
        pedirDatos()
        .then(data =>{ setAllProds(data)})
    },[allProds])

    const handleSubmit = (values, { setSubmitting }) => {
        
        let check = true;
    
        const MySwal = withReactContent(Swal);
        allProds.filter(producto =>
            cart.find(item => {
                if (item.id === producto.id) {
                    if (producto.stock <= 0) {
                        MySwal.fire({
                            title: <strong>Oh no!!</strong>,
                            html: <i>Ya no hay stock de {item.name}!!</i>,
                            icon: 'error'
                        });
                        check = false;
                    }
                }
            })
        );
    
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
                        values.ordenCodigo = caracteresAleatorios;
                        setCreatedOrder(values);
                        emptyCart();
                        console.log(values);
                    }
                })
            );
        }
    
        // Indica que la operación de submit ha terminado
        setSubmitting(false);
    };

    const currentDate = new Date()
    const futureDate = new Date();
    futureDate.setDate(currentDate.getDate() + 3);
    const formattedDate = futureDate.toLocaleDateString();

    return(
        <>
        {createdOrder ? 
            <>
                <div className="complete-order-container">
                    <h2 className="complete-order-title">Gracias por tu compra maquina!!</h2>
                    <img className="complete-order-img" src="/assets/images/complete-order/complete-order-emoji.png" alt="complete-order-emoji" />
                    <h3 className="complete-order-code-date-ferawell">Tu codigo de compra es {createdOrder.ordenCodigo}</h3>
                    {selectedOption.option === 'in-storePickup' ?
                        <h3 className="complete-order-code-date-ferawell">Te esperamos de Lunes a viernes en Avenida Siempreviva 742 de 9hs a 20hs</h3>
                        :
                        <h3 className="complete-order-code-date-ferawell">Enviaremos tu paquete a partir del {formattedDate} de 9hs a 20hs</h3>
                        }
                    <h3 className="complete-order-code-date-ferawell">Disfruta tu compra!! Vuelve cuando quieras!!</h3>
                    <Link to='/'><button className="complete-order-btn">Volver al inicio</button></Link>
                </div>
                <Footer />
            </>
            :
            cart && cart.length === 0 ? (
                <>
                    <div className="emptyCartContainer">
                        <h2 className="empty-cart-title">OH NO!!</h2>
                        <img className="empty-cart-img" src="/assets/images/empty-cart-c3po/c3po.jpg" alt="oh-no-c3po" />
                        <p className="empty-cart-paragraph">Parece que t carrito esta vacio, andá a comprar algo</p>  {/* CSS en Cart.css */}
                        <Link to="/"><button className="empty-cart-btn">Ir a comprar algo</button></Link>
                    </div>
                    <div>
                        <Footer />
                    </div>
                </>
            ) : (
                <>
                
                    {loading ? <Loading /> :
                    <>
                        <div className="checkoutContainer">   
                            <div>
                                <CheckoutSummary />
                            </div>
                            <div>
                                <DeliverySummary />
                            </div>
                            <div>
                                <h2 className="delivery-summary-title">Terminar compra</h2>
                                <CheckoutForm 
                                    handleSubmit={handleSubmit} 
                                    values={values}
                                    cart={cart}
                                />
                            </div>
                        </div>
                        <Footer />
                    </>}
                </>
            )}
            
        

        </>

    )
}

        /* const order = {
            cliente: values,
            item: cart,
            total: totalCart()
        }

        const batch = writeBatch(db)
        const ordersRef = collection(db, 'orders')
        const productosRef = collection(db, 'productos')

        const outOfStock = []

        const itemsRef = query(productosRef, where(documentId(), 'in', cart.map(prod => prod.id)))

        const productosAsync = getDocs(itemsRef) */