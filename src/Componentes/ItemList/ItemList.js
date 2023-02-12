import { Item } from "../Item/Item"
import "./ItemList.css"




export const ItemList = ({productos}) => {

    return(
        <div className="row itemList">
            {
            productos.length > 0 &&
                productos.map((prod) => <Item key={prod.id} {...prod} />
                    
                )
            }
        </div>
    )
}