import {useState, useCallback, useEffect} from 'react';

const storageName = 'ItemsToDescPopular'
const storageName2 = 'ItemsPatchId'

export const useItemstoDescPopular = () =>{
    const [itemPopular, setItemPopular] = useState(null)
    const [itemsStore, setItemsStore] = useState(null)
    const [id,setId] = useState(null)

    const itemsProduct = useCallback((items) =>{
        setItemPopular(items)
        sessionStorage.setItem(storageName, JSON.stringify({
            itemPopular: items
        }))
    }, []) 

    const itemsProductPatchId = useCallback((id) =>{
        setId(id)
        sessionStorage.setItem(storageName2, JSON.stringify({
            id: id
        }))
    }, []) 

    // проверка есть ли данные о пользователи в локальном сторе
    useEffect(()=>{
        const data = JSON.parse(sessionStorage.getItem(storageName))
        const dataId = JSON.parse(sessionStorage.getItem(storageName2))
        if(data){
            itemsProduct(data.itemPopular)
            // setId(dataId.id)
        }
    }, [itemsProduct,itemsProductPatchId])

    return {itemsProduct,itemsProductPatchId, id, itemPopular, itemsStore}
}