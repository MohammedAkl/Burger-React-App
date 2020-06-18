import React from 'react';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import Button from '../../UI/Button/Button';

const orderSummary =(props) =>{
    const ingredientSummary = Object.keys(props.ingredients)
        .map(igKey => {
            return(
                <li key={igKey}>
                    <span style={{textTransform : 'capitalize'}}>{igKey} :</span>{props.ingredients[igKey]}
                </li> );

        });

    return(
        <Aux>
           <h3><strong>Your Order :</strong></h3>

            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Total price : {props.price.toFixed(2)}$ </strong></p>
            <p>Continue to Checkout ?</p>
            <Button
                btnType='Success'
                clicked={props.purchaseContinue}
                 >Continue</Button>
            <Button btnType='Danger' clicked={props.purchaseCancel} >Cancel</Button>

        </Aux>
    );

}
export default orderSummary;