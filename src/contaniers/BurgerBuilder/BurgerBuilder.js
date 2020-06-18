import React , {Component} from 'react';
import {connect} from 'react-redux'

import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios/axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';



export class BurgerBuilder extends Component {
    state = {
        purchasing: false
    }
    componentDidMount () {
        this.props.onIinitIngredients();
        
    }

    updatePurchaseState =(ingredients)=> {
        const sum = Object.keys( ingredients )
            .map( igKey => {
                return ingredients[igKey];
            } )
            .reduce( ( sum, el ) => {
                return sum + el;
            }, 0 );
        return sum > 0 ;
    }
   
    purchaseHandler =() =>{ 

        if(this.props.isAuth){
            this.setState({purchasing: true});
        }
        else {
            this.props.history.push('/auth');
        }   
    }

    modalCancelHandler=() => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler=() => {
        this.props.onPurchaseIinit();
        this.props.history.push( '/checkout');
    }

    render() {
        const disabledInfo = {
            ...this.props.ings
        };
        for ( let key in disabledInfo ) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        let orderSummary = null;
        let burger = this.props.error ? <p>Ingredients can't be loaded!</p> : <Spinner />;

        if ( this.props.ings ) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings} />
                        <BuildControls
                            ingredientAdded={this.props.onIngredientsAdded}
                            ingredientRemoved={this.props.onIngredientsRemoved}
                            disabled={disabledInfo}
                            price={this.props.price}
                            purchasable={this.updatePurchaseState(this.props.ings)}
                            ordered={this.purchaseHandler}
                            isAuth={this.props.isAuth}
                        />
            </Aux>
            ); 
            orderSummary= <OrderSummary 
                ingredients={this.props.ings}
                purchaseCancel={this.modalCancelHandler}
                purchaseContinue={this.purchaseContinueHandler}
                price={this.props.price}/>;
        }
        if ( this.state.loading ) {
            orderSummary = <Spinner />;
        }



        return(
            <Aux>
                <Modal show={this.state.purchasing} modalCancel={this.modalCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );

    }
}

const mapStateToProps = state => {

    return{
        ings:state.burgerBuilder.ingredients,
        price:state.burgerBuilder.totalPrice,
        error:state.burgerBuilder.error,
        isAuth:state.auth.token
    }
   
}

const mapDispatchToProps = dispatch =>{

    return {
        onIngredientsAdded: (ingsName) => dispatch(actions.addIngredients(ingsName)),
        onIngredientsRemoved: (ingsName) => dispatch(actions.removeIngredients(ingsName)),
        onIinitIngredients: () => dispatch(actions.initIngredients()),
        onPurchaseIinit: () => dispatch(actions.purchaseInit())


    }
}

export default connect(mapStateToProps,mapDispatchToProps) (withErrorHandler(  BurgerBuilder ,axios));