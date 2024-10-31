import { useContext, useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Footer } from "../../Componentes/Footer/Footer"
import { CartContext } from "../../context/CartContext"
import { LoginContext } from "../../context/LoginContext"
import { CartItem } from "../../Componentes/CartItem/CartItem"
import { Loading } from "../../Componentes/Loading/Loading"
import { CartInstallments } from "../../Componentes/CartInstallments/CartInstallments"
import'./Cart.css'

export const Cart = ( ) => {

    const { cart } = useContext(CartContext)

    const { user } = useContext(LoginContext)

    const [loading, setLoading] = useState(true)
    const [userLogged, setUserLogged] = useState(false)

    const navigate = useNavigate();

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
            navigate('/login-register');
          }
        }, 900);
    
        return () => clearTimeout(timeout);
      }, [userLogged, navigate]);

    if (cart.length === 0){

        return(
            <>
                {loading ? <Loading /> :
                <>
                    <div className="emptyCartContainer">
                        <h2 className="empty-cart-title">OH NO!!</h2>
                        <img className="empty-cart-img" src="/assets/images/empty-cart-c3po/c3po.jpg" alt="oh-no-c3po" />
                        <p className="empty-cart-paragraph">Parece que tu carrito esta vacio, andá a comprar algo</p>
                        <Link to="/"><button className="empty-cart-btn">Ir a comprar algo</button></Link>
                    </div>
                    <div>
                        <Footer />
                    </div>
                </>}
            </>
        )
    }
    
    return(
        <>
            {loading ? <Loading /> :
            <>
                <div className="cartContainer">
                    <h2 className="cartTitle">Tu compra</h2>

                    <div className="cartItemInstallments">
                        <div>
                            {
                                cart.map(item =>(
                                    <CartItem key={item.id} {...item} />

                                ))
                            }
                        </div>

                        <CartInstallments />
                    </div>
                </div>
                <div>
                    <Footer />
                </div>
            </>}
        </>
    )
}