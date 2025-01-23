import { createContext, useEffect, useState, useContext } from "react"


export const CartContext = createContext()

export const useCartContext = () => {
  return useContext(CartContext)
}

const init = JSON.parse(localStorage.getItem('cart')) || []

export const CartProvider = ({children}) => {

    const add_to_cart_audio = new Audio("/assets/sounds/buttons_sounds/add_to_cart.mp3")

    const eliminate_audio = new Audio("/assets/sounds/buttons_sounds/eliminate.mp3")

    const [cart, setCart] = useState(init)
  
    const agregarAlCarrito = (item) => {
      if (cart.some((articulo) => articulo.id === item.id)) {
        const cartUpdate = cart.map((articulo) => {
          if (articulo.id === item.id) {
            return {
              ...articulo,
              cantidad: articulo.cantidad + item.cantidad 
            };
          }
          return articulo;
        });
        setCart(cartUpdate);
        add_to_cart_audio.play()
      } else {
        setCart([...cart, item]);
        add_to_cart_audio.play()
      }
    };

  const eliminarItem = (id) => {
    setCart( cart.filter(item => item.id !== id) )
    eliminate_audio.play()
  } 

  const isInCart = ( id ) => {
    return cart.some(item => item.id === id)
  }

  const emptyCart = () => {
    setCart([])
  }

  const totalCart = () => {
    return cart.reduce((acc, item) => acc + item.price * item.cantidad, 0)
  } 

  const totalCantidad = () => {
    return cart.reduce((acc, item) => acc + item.cantidad, 0)
  }

  const cantidadInCart = (id, cantidad) => {
      setCart(cart.map(item =>
          item.id === id ? { ...item, cantidad } : item
      ));
  };

  const updateColorInCart = (id, color) => {
      setCart(cart.map(item =>
          item.id === id ? { ...item, color } : item
      ));
  };

  const [installmentSelected, setInstallmentSelected] = useState({
                                                                    id: 'installment1',
                                                                    amount: '1',
                                                                    installmentPrice: (totalCart()).toFixed(2),
                                                                    total: (totalCart()).toFixed(2)
                                                                  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

    return(
        <CartContext.Provider value={ {cart, agregarAlCarrito, eliminarItem, isInCart, emptyCart, totalCart, totalCantidad, cantidadInCart, updateColorInCart, installmentSelected, setInstallmentSelected} }>
            {children}
        </CartContext.Provider>
     )
}