import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { useLoginContext } from '../context/LoginContext.js';
import { LoginScreen } from '../Componentes/LoginScreen/LoginScreen';
import { RegisterScreen } from '../Componentes/RegisterScreen/RegisterScreen'
import { ItemDetailContainer } from '../Componentes/ItemDetailContainer/ItemDetailContainer';
import CarouselContainer from '../Componentes/CarouselContainer/CarouselContainer';
import { Cart } from '../Componentes/Cart/Cart';
import { ItemListContainer } from '../Componentes/ItemListContainer/ItemListContainer';
import { Header } from '../Componentes/Header/Header.js';
import { Checkout } from '../Componentes/Checkout/Checkout.js';
import { Plataformas } from '../Componentes/Plataformas/Plataformas.js';
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
                <Route path="/plataformas" element={<Plataformas />} />
                <Route path='/register' element={<RegisterScreen />} />
                <Route path={user.logged ? "/" : "/login"} element={user.logged ? <CarouselContainer /> : <LoginScreen />} />
                <Route path="*" element={ <Navigate to={"/"} />} />
                <Route path="/detail/*" element={ <Navigate to={"/"} />} />
            </Routes>
        </BrowserRouter>
            
        
    )

}