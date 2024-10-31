import { useCartContext } from "../../context/CartContext";
import { useState, useEffect } from "react";
import { pedirDatos } from '../../helpers/pedirDatos'
import { FaTrashAlt } from "react-icons/fa"
import './CheckoutSummary.css'

export const CheckoutSummary = () => {
  const { cart, eliminarItem, installmentSelected } = useCartContext();
  const [allProds, setAllProds] = useState([])

  useEffect(() => {
    pedirDatos()
      .then(data => setAllProds(data))
  }, [])

  return (
    <section>
      <h2 className="checkout-summary-title">Resumen de compra</h2>
      <div>
        {
          cart.map(product => {
            const matchingProduct = allProds.find(p => p.id === product.id);
            const outOfStock = matchingProduct && matchingProduct.stock === 0;
            return (
              <article className="checkout-product-container" key={product.id}>
                <div className="checkout-product-name-container">
                  <h3 className="checkout-product-name">{product.name}</h3>
                </div>
                <div className="checkout-image-data-container">
                  <div className="checkout-product-image-container">
                    <img className="checkout-product-image" src={product.image} />
                  </div>
                  <div className="checkout-data-container">
                    {product.color && <p className="checkout-product-color"><strong>Color: </strong>{product.color}</p>}
                    <p className="checkout-product-quantity"><strong>Cantidad X </strong>{product.cantidad}</p>
                    <p className="checkout-product-price"><strong>Precio total: </strong>{product.price * product.cantidad}</p>
                  </div>
                </div>
                {outOfStock && <> <p>¡Este producto está sin stock!</p> <button onClick={() => eliminarItem(product.id)} className="btn btn-outline-danger"><FaTrashAlt /></button> </>}
              </article>
            );
          })
        }
      </div>
      <div className="purchase-summary-prices-container">
        <div className="checkout-summary-installments-amount-container">
          <p className="checkout-summary-installments"><strong>Cuotas X </strong> {installmentSelected.amount}</p>
          <p className="checkout-summary-amount"><strong>Valor de cuotas: </strong> ${installmentSelected.installmentPrice}</p>
        </div>
        <div className="checkout-summary-total-container">
          <strong className="checkout-summary-total">Total:<span> ${installmentSelected.total}</span></strong>
        </div>
      </div>
    </section>
  )
}
