import './LoginScreen.scss'
import { useState } from 'react'
import { useLoginContext } from '../../context/LoginContext'
import { Link } from 'react-router-dom'

export const LoginScreen = () => {


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
        <div className='login-screen'>
            <div className='login'>
                <h2>Login</h2>
                <hr/>

                <form onSubmit={handleSubmit}>
                    <input className='form-control my-2' type={'email'} value={values.email} onChange={handleInputChange} name='email'/>
                    <input className='form-control my-2' type={'password'} value={values.password} onChange={handleInputChange} name='password'/>
                    <button className='btn btn-primary'>Ingresar</button>
                    {user.error && <p className='error'>{user.error}</p>}
                </form>
                <button className='btn btn-primary mny-2' onClick={googleLogin}>Ingresar con Google</button> <br/>
                <button className='btn btn-primary mny-2' onClick={facebookLogin}>Ingresar con Facebook</button> <br/>
                <Link to="/register" className="btn btn-primary">Registrarme</Link>
            </div>
        </div>
    )
}