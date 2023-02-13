import { useCartContext } from "../../context/CartContext";

export const CheckoutSummary = () => {

    const { cart, totalCart } = useCartContext();

    return (
        <section>
            <h2>Resumen de compra</h2>
            <div>
                {
                    cart.map(product => (
                        <article key={product.id}>
                            <h3>{product.name}</h3>
                            <p>x{product.cantidad}</p>
                            <p>{product.price * product.cantidad}</p>
                        </article>
                    ))
                }
            </div>
            <hr className="purchase-summary_hr" />
            <div className="purchase-summary_prices">
                <p><strong>Subtotal:</strong> {totalCart()}</p>
                <p><strong>IVA (19%):</strong> {totalCart() * 0.19}</p>
                <strong>Total:<span> {totalCart() * 0.19}</span></strong>
            </div>
        </section> 
    )
}
