import * as actionTypes from './actionTypes';
import axios from '../../axios/axios-orders';


export const addIngredients = (name) => {
 
    return {
        type:actionTypes.ADD_INGERDIENT , 
        ingredientName : name
    }
   
}

export const removeIngredients = (name) => {
 
    return {
        type:actionTypes.REMOVE_INGERDIENT , 
        ingredientName : name
    }
   
}

export const setIngredients=(ingredients)=>{
    return {
        type:actionTypes.SET_INGERDIENTS,
        ingredients: ingredients
    }
  
}

export const FETCHIngredientsFailed =()=>{
    return{
        type:actionTypes.FETCH_INGERDIENTS_FAILED
    }
}

export const initIngredients=(token)=>{
    return dispatch =>{
        axios.get('https://my-burger-e30db.firebaseio.com/ingredients.json')
        .then( response => {
           dispatch(setIngredients(response.data));
        } )
        .catch( error => {
          dispatch(FETCHIngredientsFailed())
        } );

    }

}