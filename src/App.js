import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { CartProvider } from './context/CartContext';
import { LoginProvider } from './context/LoginContext';
import { Routers } from './routers/Routers';

function App() {
  
  return (
      <LoginProvider>
        <CartProvider>
          <Routers />
        </CartProvider>
      </LoginProvider>
  );
}

export default App;
