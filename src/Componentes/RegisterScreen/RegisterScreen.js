import './RegisterScreen.scss'
import { useState } from 'react'
import { useLoginContext } from '../../context/LoginContext'
import { Footer } from '../Footer/Footer'
import { Link } from 'react-router-dom'


export const RegisterScreen = () => {


    const { user, register } = useLoginContext()

    const [values, setValues] = useState({
        email: '',
        password: '',
        error: '',
        displayName: null
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
            <div className='login-screen'>
                <div className='login'>
                    <h2>Register</h2>
                    <hr/>

                    <form onSubmit={handleSubmit}>
                        <input className='form-control my-2' type={'email'} value={values.email} onChange={handleInputChange} name='email'/>
                        <input className='form-control my-2' type={'password'} value={values.password} onChange={handleInputChange} name='password'/>
                        <input className='form-control my-2' type={'text'} value={values.displayName} onChange={handleInputChange} name='name'/>
                        <button className='btn btn-primary'>Registrarme</button>
                        {user.error && <p className='error'>{user.error}</p>}
                    </form>
                    <Link to='/login' className='btn btn-outline-primary'>Ya estoy registrado</Link>
                </div>
            </div>
            <Footer />
        </>
    )
}