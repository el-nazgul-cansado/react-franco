import './ItemListContainer.css'
import { useEffect, useState } from 'react'
import { pedirDatos } from '../../helpers/pedirDatos'
import { ItemList } from '../ItemList/ItemList'
import { useParams } from 'react-router-dom'

export const ItemListContainer = () => {
    
    const [productos, setProductos] = useState([])
    const { categoryId } = useParams()

    useEffect(() => {
        pedirDatos()
            .then((res) => {
                if (categoryId) {
                    setProductos(res.filter(prod => prod.category.includes(categoryId)))
                } else {
                    setProductos(res)
                }
            })
            .catch((err) => {
                
            })
    }, [categoryId])
    

    return(
        <main className='main'>
            <h2 className='titulo'>Proyecto MultiConsola</h2>
            <div>
                <ItemList productos={productos}/>
            </div>
        </main>
    )
        
}