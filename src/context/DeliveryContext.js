import { createContext, useContext, useState } from "react";

export const DeliveryContext = createContext()

export const useDeliveryContext = () => {
    return useContext(DeliveryContext)
}

export const DeliveryProvider = ({children}) => {

    const [selectedOption, setSelectedOption] = useState({
                                                            option: 'in-storePickup',
                                                            address: '',
                                                            addressNumber: '',
                                                            dept: '',
                                                            zipCode: '',
                                                            province: '',
                                                            city: '',
                                                            crossStreet1: '',
                                                            crossStreet2: '',
                                                            atHomeWork: ''
    });

    return(
        <DeliveryContext.Provider value={ {selectedOption, setSelectedOption} }>
            {children}
        </DeliveryContext.Provider>
    )

}