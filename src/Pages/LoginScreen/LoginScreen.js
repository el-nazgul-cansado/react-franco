import { useState } from 'react'
import { useLoginContext } from '../../context/LoginContext'
import { RegisterScreen } from '../RegisterScreen/RegisterScreen'
import { Footer } from '../../Componentes/Footer/Footer'
import { BsGoogle, BsFacebook } from "react-icons/bs";
import { FiArrowRight } from "react-icons/fi";
import './LoginScreen.css'

export const LoginScreen = () => {

    const [isRegistering, setIsRegistering] = useState(false);

    const handleRegisterClick = () => {
        setIsRegistering(true);
    };

    const handleLoginClick = () => {
        setIsRegistering(false);
    };

    const { login, user, googleLogin, facebookLogin } = useLoginContext()

    const [values, setValues] = useState({
        email: '',
        password: '',
        error: '',
        displayName: ''
    })

    const handleInputChange = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        login(values)

    }

    return(
        <>
            <div className='login-register-image-screen-container'>  
                <div className='login-register-image-container'>
                    <img className='login-register-image' src='/assets/images/login-register/login-register.png' alt='login-register-image' />
                </div>
                <div className='login-register-screen'>
                    <div className={`login ${isRegistering ? 'login-exit-active' : 'login-enter-active'}`}>
                        <h2 className='login-title'>Login</h2>
                        <form onSubmit={handleSubmit}>
                            <input className='login-input' type={'email'} value={values.email} onChange={handleInputChange} name='email' placeholder='Ingrese su email...' />
                            <input className='login-input' type={'password'} value={values.password} onChange={handleInputChange} name='password' placeholder='Ingrese su contraseña...' />
                            <button className='login-btn'>Ingresar</button>
                            <div className='error-container'>
                                {user.error && <p className='error'>{user.error}</p>}
                            </div>
                        </form>
                        <button className='login-google-fb-register-btn mny-2' onClick={googleLogin}><BsGoogle /> Ingresar con Google</button> <br />
                        <button className='login-google-fb-register-btn mny-2' onClick={facebookLogin}><BsFacebook /> Ingresar con Facebook</button> <br />
                        <button onClick={handleRegisterClick} className='login-google-fb-register-btn'><FiArrowRight /><span className='login-to-register-span'>Registrarme</span></button>
                    </div>
                    <div className={`register-screen ${isRegistering ? 'register-screen-exit-active' : 'register-screen-enter-active'}`}>
                        <RegisterScreen handleLoginClick={handleLoginClick} />
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}