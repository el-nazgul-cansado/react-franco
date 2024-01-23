import stock from '../data/MOCK_DATA.json'


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