export const SET_SRM_PRODUCTS = 'SRM/SET_SRM_PRODUCTS'
export  const setProducts = (products) => ({ type: SET_SRM_PRODUCTS, products })

export const UPDATE_SRM_PRODUCTS = 'SRM/UPDATE_SRM_PRODUCTS'
export  const updateProducts = (product) => ({ type: UPDATE_SRM_PRODUCTS, product })

export const DELETE_SRM_PRODUCTS = 'SRM/DELETE_SRM_PRODUCTS'
export  const deleteProducts = (product) => ({ type: DELETE_SRM_PRODUCTS, product })

export const SET_SRM_GENERAL_TABS_DATA = 'SRM/SET_SRM_GENERAL_TABS_DATA'
export  const setGeneralTabsData = (data) => ({ type: SET_SRM_GENERAL_TABS_DATA, data })

export const SET_SRM_DESCRIPTION_PRODUCT_TABS_DATA = 'SRM/SET_SRM_DESCRIPTION_PRODUCT_TABS_DATA'
export  const setDescriptionProductTabsData = (data) => ({ type: SET_SRM_DESCRIPTION_PRODUCT_TABS_DATA, data })

export const SET_SRM_IMAGES_DESCRIPTION_PRODUCT_DATA = 'SRM/SET_SRM_IMAGES_DESCRIPTION_PRODUCT_DATA'
export  const setImagesDescriptionProductData = (data) => ({ type: SET_SRM_IMAGES_DESCRIPTION_PRODUCT_DATA, data })

export const SET_SRM_DESCRIPTION_TABLE_TABS_DATA = 'SRM/SET_SRM_DESCRIPTION_TABLE_TABS_DATA'
export  const setDescriptionTableTabsData = (data) => ({ type: SET_SRM_DESCRIPTION_TABLE_TABS_DATA, data })

export const SET_SRM_IMAGES_PRODUCT_DATA = 'SRM/SET_SRM_IMAGES_PRODUCT_DATA'
export  const setImagesProductData = (img) => ({ type: SET_SRM_IMAGES_PRODUCT_DATA, img })


export const EDIT_SRM_PRODUCTS_TABS = 'SRM/EDIT_SRM_PRODUCTS_TABS'
export  const editProductTabs = (data) => ({ type: EDIT_SRM_PRODUCTS_TABS, data })

export const RESET_SRM_PRODUCTS_TABS = 'SRM/RESET_SRM_PRODUCTS_TABS'
export  const resetProductTabs = () => ({ type: RESET_SRM_PRODUCTS_TABS })

export const SET_SRM_NEED_TO_DELITE_IMAGES = 'SRM/SET_SRM_NEED_TO_DELITE_IMAGES'
export  const setNeedToDeleteImages = (images) => ({ type: SET_SRM_NEED_TO_DELITE_IMAGES, images })

export const RESET_NEED_TO_DELITE_IMAGES = 'SRM/RESET_NEED_TO_DELITE_IMAGES'
export  const resetNeedToDeleteImages = () => ({ type: RESET_NEED_TO_DELITE_IMAGES,  })
