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
    const [loading, setLoading] = useState(true)
    const [prodBusc, setProdBusc] = useState([])
    const [busqueda, setBusqueda] = useState("")
    const { categoryId } = useParams()
    

    useEffect(() => {
        
            const productosRef = collection(db, 'productos')
            const q = categoryId
                    ? query(productosRef, where('category', 'array-contains', categoryId))
                    : productosRef
        
        setTimeout(() => {
        if(categoryId){
            getDocs(q)
            .then((resp) => {
                
                setProductos(resp.docs.map((doc) => {
                    return{
                        ...doc.data(),
                        id: doc.id
                    }
                }
                    )
                        )
            }).finally(() => {
                setLoading(false)
                })
        }else{
            getDocs(productosRef)
            .then((resp) => {
                setProductos(resp.docs.map((doc) => {
                    return{
                        ...doc.data(),
                        id: doc.id
                    }
                }
                    )
                        )
            }).finally(() => {
                setLoading(false)
                })
        }}, 1000)
        
         
        
    setLoading(true) 
        
    /* pedirDatos()
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
         }).finally(() => {
                setLoading(false)
                })
         

     */} , [categoryId]) 

    const handleChange = e => {
        setBusqueda(e.target.value)
        filtrar(e.target.value)
      }
    
      const filtrar=(terminoBusqueda) => {
        let resultadosBusqueda=prodBusc.filter((e)=>{
          if(e.name.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
            || e.category.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())){
            return e;
          } 
        })
        setProductos(resultadosBusqueda)
      }
    

    return(
        <main className='main'>
            <h2 className='titulo'>Nuestros productos</h2>
           {/*  <div>
                <Buscador handleChange={handleChange} busqueda={busqueda} />
            </div> */}
            <div>
                {
                    loading
                        ? <h2>Cargando...</h2>
                        : <ItemList productos={productos} />
                }
            </div>
        </main>
    )
        
}