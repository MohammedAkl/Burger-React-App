import * as actionTypes from './actionTypes';
import axios from '../../axios/axios-orders';


export const purchaseInit=()=>{
    return{
        type:actionTypes.PURCHASE_INIT
    }
}

export const purchaseBurgerSuccess =(id ,orderData) =>{

    return{
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId:id,
        orderData:orderData
    }

}
export const purchaseBurgerFail =(error) =>{

    return{
        type:actionTypes.PURCHASE_BURGER_FAIL,
        error:error
    }
}

export const purchaseBurgerStart=()=>{
    return{
        type:actionTypes.PURCHASE_BURGER_START
    }
}

export const purchaseBurger = (orderData, token)=>{

    return dispatch =>{
        dispatch(purchaseBurgerStart());
        axios.post( '/orders.json?auth=' + token, orderData )
        .then( response => {
           dispatch(purchaseBurgerSuccess(response.data.name,orderData)) 
        } )
        .catch( error => {
           dispatch(purchaseBurgerFail(error))
        } );
    }

}
export const fetechOrderStart =()=>{
    return{
        type:actionTypes.FETCH_ORDER_START
    }

}
export const fetechOrderSuccess =(orders)=>{
    return{
        type:actionTypes.FETCH_ORDER_SUCCESS,
        orders:orders
    }

}
export const fetechOrderFail =(error)=>{
    return{
        type:actionTypes.FETCH_ORDER_FAIL,
        error:error
    }

}

export const fetchOrders =(token, userId)=>{
    return dispatch =>{
        dispatch(fetechOrderStart());
        const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
        axios.get('/orders.json'+ queryParams)
        .then(res => {
            const fetchedOrders = [];
            for (let key in res.data) {
                fetchedOrders.push({
                    ...res.data[key],
                    id: key
                });
            }
            dispatch(fetechOrderSuccess(fetchedOrders));
        })
        .catch(error => {
            dispatch(dispatch(fetechOrderFail(error)))
        });
    }

}

