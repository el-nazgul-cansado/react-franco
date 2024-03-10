import './ItemListContainer.css'
import { useEffect, useState } from 'react'
import { ItemList } from '../ItemList/ItemList'
import { useParams } from 'react-router-dom'
import { pedirDatos } from '../../helpers/pedirDatos'
import { Buscador } from '../Buscador/Buscador'
import { Footer } from '../Footer/Footer'
/* import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../../firebase/config' */

export const ItemListContainer = () => {
    
    const [productos, setProductos] = useState([])
    const { categoryId } = useParams()
    const [prodBusc, setProdBusc] = useState([])
    const [busqueda, setBusqueda] = useState("")

    useEffect(() => {
        
           /*  const productosRef = collection(db, 'productos')
            const q = categoryId
                    ? query(productosRef, where('category', 'array-contains', categoryId))
                    : productosRef
        
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
            })
        } */
        
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
         

    } , [categoryId]) 

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
            <h2 className='titleProducts'>Nuestros productos</h2>
           <div>
                <Buscador handleChange={handleChange} busqueda={busqueda} />
            </div>
            <div>
                <ItemList productos={productos} />
                <Footer />
            </div>
        </main>
    )
        
}