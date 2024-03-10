import stock from '../data/MOCK_DATA.json'
import sabers_and_icons from '../data/sabers_and_icons.json'

export const pedirDatos = () => {
    return new Promise ((resolve, reject) =>{
            resolve(stock)
    })
}

export const pedirItemPorId = (id) => {
    return new Promise((resolve, reject) => {
        setTimeout (() => {
            const item = stock.find((el) => el.id === id)
            if (item) {
                resolve(item)
            } else {
                reject({error: 'Valor incorrecto'})
            }
        }, 1500)
    })
}

export const sabers_and_icons_data = () => {
    return new Promise ((resolve, reject) =>{
            resolve(sabers_and_icons)
    })
}