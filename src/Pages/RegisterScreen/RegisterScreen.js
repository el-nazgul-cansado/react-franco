import { useState } from 'react'
import { useLoginContext } from '../../context/LoginContext'
import { FiArrowLeft } from "react-icons/fi";
import { GiLightSabers } from "react-icons/gi";
import './RegisterScreen.css'

export const RegisterScreen = ({handleLoginClick}) => {


    const { user, register } = useLoginContext()

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
        register(values)

    }

    return(
        <>
            <div className='register'>
                <h2 className='register-title'>Register</h2>
                <form onSubmit={handleSubmit}>
                    <input className='register-input' type={'email'} value={values.email} onChange={handleInputChange} name='email' placeholder='Ingrese su email...'/>
                    <input className='register-input' type={'password'} value={values.password} onChange={handleInputChange} name='password' placeholder='Ingrese su contraseña...'/>
                    <button className='register--and-to-login-btn mny-2'><GiLightSabers className='login-register-icon' /><span className='registered-span'>Registrarme</span></button>
                    {user.error && <p className='error'>{user.error}</p>}
                </form>
                <button onClick={handleLoginClick} className='register--and-to-login-btn mny-2'><FiArrowLeft className='login-register-icon' />Ya estoy registrado</button>
            </div>
        </>
    )
}