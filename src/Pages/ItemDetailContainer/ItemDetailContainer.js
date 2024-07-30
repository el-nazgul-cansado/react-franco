import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ItemDetail } from '../../Componentes/ItemDetail/ItemDetail'
import { Footer } from '../../Componentes/Footer/Footer'
import { pedirItemPorId } from '../../helpers/pedirDatos'
import { Loading } from '../../Componentes/Loading/Loading'
/* import { doc, getDoc } from "firebase/firestore"
import { db } from "../../firebase/config" */

export const ItemDetailContainer = () => {
  
    const [item, setItem] = useState(null)
    const [loading, setLoading] = useState(true)
    const {itemId} = useParams()

    useEffect(() => {
    
        pedirItemPorId(Number(itemId))
            .then((data) => {
                setItem(data)
                setLoading(false)
            })
            .catch((err) => {
                console.log(err)
            })

       /* const docRef = doc(db, "productos", itemId)
    
        getDoc(docRef)
            .then(doc => {
                setItem( {...doc.data(), id: doc.id} )
            }) */

    }, [itemId])

    return (
        <div>
            {  loading ? <Loading />
                    : item &&   <div>
                                    <ItemDetail {...item} />
                                    <Footer />
                                </div> 
            }
        </div>
  )
}
