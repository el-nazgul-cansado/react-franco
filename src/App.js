import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { CartProvider } from './context/CartContext';
import { LoginProvider } from './context/LoginContext';
import { SabersIconsProvider } from './context/SabersIconsContext';
import { StarProvider } from './context/StarContext';
import { Routers } from './routers/Routers';

function App() {
  
  return (
    <SabersIconsProvider>
      <LoginProvider>
        <CartProvider>
          <StarProvider>
            <Routers />
          </StarProvider>
        </CartProvider>
      </LoginProvider>
    </SabersIconsProvider>
  );
}

export default App;
