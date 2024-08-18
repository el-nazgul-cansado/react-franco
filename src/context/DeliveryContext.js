import { createContext, useContext, useState } from "react";

export const DeliveryContext = createContext()

export const useDeliveryContext = () => {
    return useContext(DeliveryContext)
}

export const DeliveryProvider = ({children}) => {

    const [selectedOption, setSelectedOption] = useState({
                                                            option: 'in-storePickup',
                                                            address: 'Avenida Siempreviva',
                                                            addressNumber: 742,
                                                            dept: null,
                                                            zipCode: '1714',
                                                            province: 'Buenos Aires',
                                                            city: 'Ituzaingo',
                                                            crossStreet1: 'Avenida Nuncaviva',
                                                            crossStreet2: 'Avenida Avecesviva',
                                                            atHomeWork: null
    });
    const [selectedAtHomeWorkOption, setSelectedAtHomeWorkOption] = useState('');

    const [finalSelectedOption, setFinalSelectedOption] = useState({
                                                                    option: 'in-storePickup',
                                                                    address: 'Avenida Siempreviva',
                                                                    addressNumber: 742,
                                                                    dept: null,
                                                                    zipCode: '1714',
                                                                    province: 'Buenos Aires',
                                                                    city: 'Ituzaingo',
                                                                    crossStreet1: 'Avenida Nuncaviva',
                                                                    crossStreet2: 'Avenida Avecesviva',
                                                                    atHomeWork: null
    })

    return(
        <DeliveryContext.Provider value={ {selectedOption, setSelectedOption, selectedAtHomeWorkOption, setSelectedAtHomeWorkOption, finalSelectedOption, setFinalSelectedOption} }>
            {children}
        </DeliveryContext.Provider>
    )

}