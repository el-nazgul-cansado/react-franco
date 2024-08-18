import { useState, useEffect, useRef } from "react";
import { useDeliveryContext } from "../../context/DeliveryContext";
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import './DeliverySummary.css'

export const DeliverySummary = () => {
    
    const { finalSelectedOption } = useDeliveryContext();

    const apiKey = 'AIzaSyANetDCMcrv0ASgkPPC4Sllic7sNlM9ckw';
    const defaultLocation = { lat: -34.603722, lng: -58.381592 };

    const handleMapClick = () => {
        const address = 'Av. 9 de Julio, C1043 CABA, Argentina'; // Dirección predeterminada
        window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`, '_blank');
      };

      useEffect(() => {
        // Simula la carga de datos o realiza la carga real aquí
        const loadMapData = async () => {
            await new Promise(resolve => setTimeout(resolve, 1000)); // Simula tiempo de carga
        };

        loadMapData();
    }, []);

    if (finalSelectedOption.option === 'in-storePickup'){
        return(
            <div>
                <h2 className="delivery-summary-title">
                    Retiro del local
                </h2>
                <div className="delivery-summary-address-shift-map-container">
                    <div className="delivery-summary-address-shift-container">
                        <p className="delivery-summary-address-shift"><strong>Direccion: </strong>{finalSelectedOption.address} {finalSelectedOption.addressNumber}</p>
                        <p className="delivery-summary-address-shift"><strong>Horario: </strong>Lunes a Viernes de 9hs a 20hs</p>
                    </div>
                    <div>
                        <LoadScript googleMapsApiKey={apiKey}>
                            <GoogleMap
                                mapContainerStyle={{ height: '400px', width: '400px',borderRadius: '50%' }}
                                center={defaultLocation}
                                zoom={13}
                                onClick={handleMapClick}
                            >
                                <Marker position={defaultLocation} />
                            </GoogleMap>
                        </LoadScript>
                    </div>
                </div>
            </div>
        )
    } if(finalSelectedOption.option === 'delivery') {
        return(
            <div>
                <h2 className="delivery-summary-title">
                    Delivery
                </h2>
                <div className="delivery-summary-container">
                    <p className="delivery-summary-data"><strong>Direccion: </strong>{finalSelectedOption.address} {finalSelectedOption.addressNumber}</p>
                    <p className="delivery-summary-data"><strong>Dpto: </strong>{finalSelectedOption.dept ? finalSelectedOption.dept : '-'}</p>
                    <p className="delivery-summary-data"><strong>Provincia: </strong>{finalSelectedOption.province}</p>
                    <p className="delivery-summary-data"><strong>Ciudad: </strong>{finalSelectedOption.city}</p>
                    <p className="delivery-summary-data">Entre <strong>{finalSelectedOption.crossStreet1}</strong> y <strong>{finalSelectedOption.crossStreet2}</strong></p>
                    <p className="delivery-summary-data-last">Este es mi <strong>{finalSelectedOption.atHomeWork}</strong></p>
                </div>
            </div>
        )
    }
}