import { createContext, useContext, useState, useEffect } from "react"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, signInWithPopup } from "firebase/auth";
import { auth, providerGoogle, providerFacebook } from '../firebase/config'

export const LoginContext = createContext()

export const useLoginContext = () => {
    return useContext(LoginContext)
}

export const LoginProvider = ({children}) => {

    const [user, setUser] = useState({
        email: '',
        logged: false,
        error: null,
        displayName: null
    })

    const googleLogin = () => {
        signInWithPopup(auth, providerGoogle)
            .catch((error) =>{
                setUser({
                    email: null,
                    logged: false,
                    error: error.message,
                    displayName: null
                })
            }
        )
    }
    const facebookLogin = () => {
        signInWithPopup(auth, providerFacebook)
            .catch((error) =>{
                setUser({
                    email: null,
                    logged: false,
                    error: error.message,
                    displayName: null
                })
            }
        )
    }

    const login = (values) => {
        signInWithEmailAndPassword(auth, values.email, values.password)
            .catch((error) =>{
                setUser({
                    email: null,
                    logged: false,
                    error: error.message,
                    displayName: null
                })
            }
            )
    }

    const logout = () => {
        signOut(auth)
            .then(() => {
                setUser({
                    email: null,
                    logged: false,
                    error: null,
                    displayName: null
                })
            })
    }

    const register = (values) => {
        createUserWithEmailAndPassword(auth, values.email, values.password, values.displayName)
            .catch((error) =>{
                setUser({
                    email: null,
                    logged: false,
                    error: error.message,
                    displayName: null
                })
            }
            )
    }

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser({
                    email: user.email,
                    logged: true,
                    error: null,
                    displayName: user.displayName
                   })
            }else {
                logout()
            }
        })
    }, [])

    return(
        <LoginContext.Provider value={{googleLogin, facebookLogin, user, login, logout, register}}>
            {children}
        </LoginContext.Provider>
    )
}