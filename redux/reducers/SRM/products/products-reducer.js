import { 
    EDIT_SRM_PRODUCTS_TABS, 
    RESET_NEED_TO_DELITE_IMAGES, 
    RESET_SRM_PRODUCTS_TABS, 
    SET_SRM_DESCRIPTION_PRODUCT_TABS_DATA, 
    SET_SRM_DESCRIPTION_TABLE_TABS_DATA, 
    SET_SRM_GENERAL_TABS_DATA, 
    SET_SRM_IMAGES_DESCRIPTION_PRODUCT_DATA, 
    SET_SRM_IMAGES_PRODUCT_DATA, 
    SET_SRM_NEED_TO_DELITE_IMAGES, 
    SET_SRM_PRODUCTS 
} from "./action";

let initialState = {
    products:[],
    genetalTabs:{
        name: '',
        inStock: true,
        countInStock: 0,
        category: 'приборы',
        price: '',
        sale: false,
        salePrice: 0,
    },
    descriptionProductTabs:{
        nameDescription: '',
        descriptionD: '',
        descriptionImages: [],
        ImgData: {},
    },
    descriptionTableTabs:{
        typeName:'',
        countPeople: 1,
        features:'Подходит для многократного использования',
        eco:'Экологически чистый продукт',
        equipment:'',
        structure:''
    },
    Images: [],
    needToDeleteImages: []
};

const productsReducer = (state = initialState, action) =>{
    switch (action.type) {
        case SET_SRM_PRODUCTS:{
            return {...state,products: action.products}
        } 
        case SET_SRM_GENERAL_TABS_DATA:{
            return {...state,genetalTabs: action.data}
        } 
        case SET_SRM_DESCRIPTION_PRODUCT_TABS_DATA:{
            return  {
                ...state, 
                descriptionProductTabs:{
                    ...state.descriptionProductTabs, 
                    nameDescription: action.data.nameDescription,
                    descriptionD: action.data.descriptionD,
                }
            }
        }
        case SET_SRM_IMAGES_DESCRIPTION_PRODUCT_DATA:{
            return {
                ...state, 
                descriptionProductTabs:{
                    ...state.descriptionProductTabs, 
                    descriptionImages: action.data.img,
                    ImgData: action.data.ImgData,
                }
            }
        } 
        case SET_SRM_DESCRIPTION_TABLE_TABS_DATA:{
            return {...state,descriptionTableTabs: action.data}
        }
        case SET_SRM_IMAGES_PRODUCT_DATA:{
            return {...state,Images: action.img}
        } 
        case SET_SRM_NEED_TO_DELITE_IMAGES:{
            return {
                ...state, 
                needToDeleteImages: state.needToDeleteImages.concat(action.images)
            }
        } 
        case RESET_NEED_TO_DELITE_IMAGES:{
            return {
                ...state, 
                needToDeleteImages: []
            }
        } 
        case EDIT_SRM_PRODUCTS_TABS:{
            return {
                ...state,
                genetalTabs:{
                    name: action.data.name,
                    inStock: action.data.inStock,
                    countInStock:  action.data.countInStock,
                    category: action.data.category,
                    price: action.data.price,
                    sale: action.data.sale,
                    salePrice: action.data.salePrice,
                    DescProductId:action.data.DescProductId,
                    DescProductTableId:action.data.DescProductTableId,
                },
                descriptionProductTabs:{
                    nameDescription: action.data.nameDescription,
                    descriptionD: action.data.description,
                    descriptionImages: action.data.imagesDescription,
                    ImgData: action.data.ImgData,
                },
                descriptionTableTabs:{
                    typeName:action.data.typeName,
                    countPeople: action.data.countPeople,
                    features:action.data.features,
                    eco:action.data.eco,
                    equipment:action.data.equipment,
                    structure:action.data.structure,
                },
                Images: action.data.images
            }
        } 
        case RESET_SRM_PRODUCTS_TABS:{
            return {
                ...state,
                genetalTabs:{
                    name: '',
                    inStock: true,
                    countInStock: 0,
                    category: 'приборы',
                    price: '',
                    sale: false,
                    salePrice: 0,
                },
                descriptionProductTabs:{
                    nameDescription: '',
                    descriptionD: '',
                    descriptionImages: [],
                    ImgData: {}
                },
                descriptionTableTabs:{
                    typeName:'',
                    countPeople: 1,
                    features:'Подходит для многократного использования',
                    eco:'Экологически чистый продукт',
                    equipment:'',
                    structure:''
                },
                Images: []
            }
        } 
        
        default:
            return state;
    }
} 


export default productsReducer;