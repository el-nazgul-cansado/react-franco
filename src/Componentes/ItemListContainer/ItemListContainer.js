import './ItemListContainer.css'
import { useEffect, useState } from 'react'
import { pedirDatos } from '../../helpers/pedirDatos'
import { ItemList } from '../ItemList/ItemList'
import { useParams } from 'react-router-dom'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../../firebase/config'
import { Buscador } from '../Buscador/Buscador'

export const ItemListContainer = () => {
    
    const [productos, setProductos] = useState([])
    const [prodBusc, setProdBusc] = useState([])
    const [busqueda, setBusqueda] = useState("")
    const { categoryId } = useParams()
    

    useEffect(() => {
        
       /*  //1- referencia
        const productosRef = collection(db, 'productos')
        const q = categoryId
                    ? query(productosRef, where('category', 'array-contains', categoryId))
                    : productosRef
        
        //2- peticion de datos

        getDocs(q)
            .then((resp) => {
                console.log(resp.docs)
                setProductos(resp.docs.map((doc) => {
                    return{
                        ...doc.data(),
                        id: doc.id
                    }
                }))
            }) */
         
        
        
        
    pedirDatos()
        .then((res) => {
            if (categoryId) {
                setProductos(res.filter(prod => prod.category.includes(categoryId)))
                setProdBusc(res)
             } else {
                 setProductos(res)
                 setProdBusc(res)
             }
        })
        .catch((err) => {
              console.log(err)
         })
     }, [categoryId])

    const handleChange = e => {
        setBusqueda(e.target.value)
        filtrar(e.target.value)
      }
    
      const filtrar=(terminoBusqueda) => {
        let resultadosBusqueda=prodBusc.filter((elemento)=>{
          if(elemento.name.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
            || elemento.category.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())){
            return elemento;
          }
        })
        setProductos(resultadosBusqueda)
      }
    

    return(
        <main className='main'>
            <h2 className='titulo'>Nuestros productos</h2>
            <div>
                <Buscador handleChange={handleChange} busqueda={busqueda} />
            </div>
            <div>
                <ItemList productos={productos}/>
            </div>
        </main>
    )
        
}