import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { CartProvider } from './context/CartContext';
import { LoginProvider } from './context/LoginContext';
import { Routers } from './routers/Routers';
import { StarProvider } from './context/StarContext';

function App() {
  
  return (
      <LoginProvider>
        <CartProvider>
          <StarProvider>
            <Routers />
          </StarProvider>
        </CartProvider>
      </LoginProvider>
  );
}

export default App;
