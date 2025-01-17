import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { useLoginContext } from '../context/LoginContext.js';
import { useSabersIcons } from '../context/SabersIconsContext.js';
import { LoginScreen } from '../Pages/LoginScreen/LoginScreen';
import { ItemDetailContainer } from '../Pages/ItemDetailContainer/ItemDetailContainer.js';
import IndexComponent from '../Pages/IndexComponent/IndexComponent';
import { Cart } from '../Pages/Cart/Cart';
import { ItemListContainer } from '../Componentes/ItemListContainer/ItemListContainer';
import { Header } from '../Componentes/Header/Header.js';
import { Checkout } from '../Pages/Checkout/Checkout.js';
import { Plataformas } from '../Pages/Plataformas/Plataformas.js';
import { DeliveryCheckout } from '../Pages/DeliveryCheckout/DeliveryCheckout.jsx';
import { ProtectedRoute } from './ProtectedRoute.jsx'; // ProtectedRoute es para asegurar que el usuario no se salte la seleccion de sable e icono al comienzo de la página
import { StarredBackground } from '../Componentes/StarredBackground/StarredBackground.jsx';


export const Routers = () => {

    const { user } = useLoginContext()

    const { toIndex } = useSabersIcons()

    return(
        
        <BrowserRouter>
            <StarredBackground />
            <Header /> 
            <Routes>
                <Route path="/" element={<IndexComponent />} />
                <Route path="/productos/:categoryId" element={<ItemListContainer />} />
                <Route path="/detail/:itemId"element={<ProtectedRoute toIndex={toIndex} > <ItemDetailContainer /> </ProtectedRoute>} />
                <Route path="/cart" element={ <ProtectedRoute toIndex={toIndex} > <Cart /> </ProtectedRoute> } />
                <Route path="/checkout" element={ <ProtectedRoute toIndex={toIndex} > <Checkout /> </ProtectedRoute> } />
                <Route path="/delivery-checkout" element={ <ProtectedRoute toIndex={toIndex} > <DeliveryCheckout /> </ProtectedRoute> } />
                <Route path="/plataformas" element={ <ProtectedRoute toIndex={toIndex} > <Plataformas /> </ProtectedRoute> } />
                <Route path={user.logged ? "/" : "/login-register"} element={<ProtectedRoute toIndex={toIndex} >{user.logged ? <IndexComponent /> : <LoginScreen />} </ProtectedRoute>} />
                <Route path="*" element={ <Navigate to={"/"} />} />
                <Route path="/detail/*" element={ <Navigate to={"/"} />} />
            </Routes>
        </BrowserRouter>
            
        
    )

}