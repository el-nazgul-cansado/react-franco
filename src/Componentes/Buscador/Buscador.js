import "bootstrap/dist/css/bootstrap.min.css";
import './Buscador.css'

export const Buscador = ({handleChange, busqueda}) => {

    return(
        <div className='containerInput'>
          <input className='inputBuscar'
            onChange={handleChange} value={busqueda} placeholder="Busqueda por nombre o tipo de producto..."
          />
      </div>
    )
}