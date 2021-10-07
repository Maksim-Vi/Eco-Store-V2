import { createSelector } from 'reselect'
 
const productsSelector = state => state.CRM_products.products

export const selectProductById = id => {
    return createSelector(
        productsSelector,
        products => products.filter(product => product.id === id)
    )
};
