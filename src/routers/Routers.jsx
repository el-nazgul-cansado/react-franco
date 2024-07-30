import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { useLoginContext } from '../context/LoginContext.js';
import { LoginScreen } from '../Pages/LoginScreen/LoginScreen';
import { ItemDetailContainer } from '../Pages/ItemDetailContainer/ItemDetailContainer.js';
import CarouselContainer from '../Pages/CarouselContainer/CarouselContainer';
import { Cart } from '../Pages/Cart/Cart';
import { ItemListContainer } from '../Componentes/ItemListContainer/ItemListContainer';
import { Header } from '../Componentes/Header/Header.js';
import { Checkout } from '../Pages/Checkout/Checkout.js';
import { Plataformas } from '../Pages/Plataformas/Plataformas.js';
import { DeliveryCheckout } from '../Pages/DeliveryCheckout/DeliveryCheckout.jsx';
import { StarredBackground } from '../Componentes/StarredBackground/StarredBackground.jsx';


export const Routers = () => {

    const { user } =useLoginContext()

    return(
        
        <BrowserRouter>
            <StarredBackground />
            <Header /> 
            <Routes>
                <Route path="/" element={<CarouselContainer />} />
                <Route path="/productos/:categoryId" element={<ItemListContainer />} />
                <Route path="/detail/:itemId"element={<ItemDetailContainer />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/delivery-checkout" element={<DeliveryCheckout />} />
                <Route path="/plataformas" element={<Plataformas />} />
                <Route path={user.logged ? "/" : "/login-register"} element={user.logged ? <CarouselContainer /> : <LoginScreen />} />
                <Route path="*" element={ <Navigate to={"/"} />} />
                <Route path="/detail/*" element={ <Navigate to={"/"} />} />
            </Routes>
        </BrowserRouter>
            
        
    )

}