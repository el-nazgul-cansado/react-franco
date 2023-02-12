import "bootstrap/dist/css/bootstrap.min.css";


export const Buscador = ({handleChange, busqueda}) => {

    return(
        <div className='containerInput'>
        <input className='form-control inputBuscar'
        onChange={handleChange} value={busqueda} placeholder="Busqueda por nombre o tipo de producto..."
        />
      </div>
    )
}