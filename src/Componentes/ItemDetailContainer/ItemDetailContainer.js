import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { pedirDatos, pedirItemPorId } from '../../helpers/pedirDatos'
import { ItemDetail } from '../ItemDetail/ItemDetail'

export const ItemDetailContainer = () => {
  
    const [item, setItem] = useState(null)
    const {itemId} = useParams()

    useEffect(() => {
        pedirItemPorId( Number(itemId) )
            .then((data) => {
                setItem(data)
            })
    }, [itemId])

    return (
    <div>
        {  
            item && <ItemDetail {...item} />
        }
    </div>
  )
}
