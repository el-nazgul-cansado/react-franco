import { Item } from "../Item/Item"



export const ItemList = ({productos}) => {

    return(
        <div>
            {
            productos.length > 0 &&
                productos.map((prod) => <Item key={prod.id} {...prod} />
                    
                )
            }
        </div>
    )
}