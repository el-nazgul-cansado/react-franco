import { useCartContext } from "../../context/CartContext";

export const CheckoutSummary = ( { getTotal } ) => {

    const { cart, totalCart } = useCartContext();

    return (
        <section className="purchase-summary">
            <h2>Resumen de compra</h2>
            <div className="purchase-summary_products">
                <article>
                    <p className="m-0">Articulo</p>
                    <p className="m-0">Cantidad</p>
                    <p className="m-0">Precio</p>
                </article>
                {
                    cart.map(product => (
                        <article key={product.id}>
                            <h3 className="productName m-0">{product.name}</h3>
                            <p className="m-0">x{product.amount}</p>
                            <p className="m-0">{formatterPeso(product.price * product.amount)}</p>
                        </article>
                    ))
                }
            </div>
            <hr className="purchase-summary_hr" />
            <div className="purchase-summary_prices">
                <p><strong>Subtotal:</strong> {totalCart}</p>
                <p><strong>IVA (19%):</strong> {totalCart * 0.19}</p>
                <strong>Total:<span> {getTotal}</span></strong>
            </div>
        </section> 
    )
}
