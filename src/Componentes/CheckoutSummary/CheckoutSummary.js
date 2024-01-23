import { useCartContext } from "../../context/CartContext";
import { useState, useEffect } from "react";
import { pedirDatos } from '../../helpers/pedirDatos'
import { FaTrashAlt } from "react-icons/fa"

export const CheckoutSummary = () => {
  const { cart, totalCart, eliminarItem } = useCartContext();
  const [allProds, setAllProds] = useState([])

  useEffect(() => {
    pedirDatos()
      .then(data => setAllProds(data))
  }, [])

  if (cart.length === 0) {
    return (
      <>
        <h3>Oh no!</h3>
        <p>Parece que tu carrito está vacío! D:</p>
      </>
    )
  }

  return (
    <section>
      <h2>Resumen de compra</h2>
      <div>
        {
          cart.map(product => {
            const matchingProduct = allProds.find(p => p.id === product.id);
            const outOfStock = matchingProduct && matchingProduct.stock === 0;
            return (
              <article key={product.id}>
                <h3>{product.name}</h3>
                <p>x{product.cantidad}</p>
                <p>{product.price * product.cantidad}</p>
                {outOfStock && <> <p>¡Este producto está sin stock!</p> <button onClick={() => eliminarItem(product.id)} className="btn btn-outline-danger"><FaTrashAlt /></button> </>}
              </article>
            );
          })
        }
      </div>
      <hr className="purchase-summary_hr" />
      <div className="purchase-summary_prices">
        <p><strong>Subtotal:</strong> {totalCart()}</p>
        <p><strong>IVA (19%):</strong> {totalCart() / 0.19}</p>
        <strong>Total:<span> {totalCart() * 0.19}</span></strong>
      </div>
    </section>
  )
}
