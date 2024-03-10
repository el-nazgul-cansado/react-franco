import { createContext, useState, useContext, useEffect } from "react";

const StarContext = createContext()

export const useStarContext = () => useContext(StarContext)

export const StarProvider = ({ children }) => {

    const [starConfirm, setStarConfirm] = useState(false)

    const [ quantity, setQuantity ] = useState(() => {
        const savedQuantity = localStorage.getItem('quantity');
        return savedQuantity ? Number(savedQuantity) : 500; // Asegúrate de convertir a Number si es necesario
    }) 

    const [ size, setSize ] = useState(() => {
        // Intenta obtener el tamaño de localStorage o usa un valor predeterminado
        const savedSize = localStorage.getItem('size');
        return savedSize ? Number(savedSize) : 1;
    });

    useEffect(() => {
        localStorage.setItem('quantity', quantity);
        localStorage.setItem('size', size);
    }, [quantity, size]);

    return(
        <StarContext.Provider value={{ quantity, setQuantity, size, setSize, starConfirm, setStarConfirm }}>
            {children}
        </StarContext.Provider>
    )
}