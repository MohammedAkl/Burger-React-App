import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import classes from './CheckoutSummary.module.css';
const checkoutSummary = (props) => {

    return(

        <div className={classes.CheckoutSummary}>
            <h3>We Hope You Happy Meal !</h3>

            <div className={classes.Burger}>
                <Burger ingredients={props.ingredients} />
            </div>
            <Button btnType='Danger' clicked={props.checkoutCancelled} >CANCEL</Button>
            <Button btnType='Success' clicked={props.checkoutContinued} >CONTINUE</Button>

        </div>
    );



}

export default checkoutSummary;