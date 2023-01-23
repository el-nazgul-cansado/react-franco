import axios from "axios";
import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';


export const Buscador = ({handleChange, busqueda}) => {

    return(
        <div className='containerInput'>
        <input className='form-control inputBuscar'
        onChange={handleChange} value={busqueda} placeholder="Busqueda por nombre o tipo de producto..."
        />
      </div>
    )
}