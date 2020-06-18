import React, {Component} from 'react';
import {connect} from'react-redux';


import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import axios from '../../../axios/axios-orders';
import Input from '../../../components/UI/Input/Input';
import classes from './ContactData.module.css';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as orderActions from '../../../store/actions/index';
import { updateObject, checkValidity } from '../../../shared/utility';

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    name: 'Name',
                    placeholder: 'Your Name'
                },
                value: '',
                valid:false,
                validation: {
                    required:true
                },
                touched:false 
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    name: 'Street',
                    placeholder: 'Street'
                },
                value: '',
                valid:false,
                validation: {
                    required:true
                },
                touched:false 
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    name: 'ZIP Code',
                    placeholder: 'ZIP Code'
                },
                value: '',
                valid:false,
                validation: {
                    required:true,
                    minLength:5,
                    maxLength:5,
                    isNumeric:true
                },
                touched:false 
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    name: 'Country',
                    placeholder: 'Country'
                },
                value: '',
                valid:false,
                validation: {
                    required:true
                },
                touched:false 
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    name: 'E-Mail',
                    placeholder: 'Your E-Mail'
                },
                value: '',
                valid:false,
                validation: {
                    required:true,
                    isEmail: true
                },
                touched:false 
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'}
                    ]
                },
                value: 'fastest',
                validation:{},
                valid:true
                
            }
        },
        formIsValid:false
    }

    orderHandler = ( event ) => {
        event.preventDefault();
        const formData = {};
        for (let formElementIdentifier in this.state.orderForm) {
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }
        const order = {
            ingredients: this.props.ings,
            price: this.props.price.toFixed(2),
            orderData: formData,
            userId: this.props.userId
        }
        this.props.onOrderBurger(order, this.props.token);
    }

    inputChangedHandler = (event, inputIdentifier) =>  {

        const updatedFormElement = updateObject( this.state.orderForm[inputIdentifier], {
            value:event.target.value,
            valid:checkValidity(event.target.value , this.state.orderForm[inputIdentifier].validation),
            touched: true
        });

        const updatedOrderForm = updateObject(this.state.orderForm, {
            [inputIdentifier]:updatedFormElement
        });
          
        let formIsValid = true;
        for (let inputIdentifier in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        }
        this.setState({orderForm: updatedOrderForm , formIsValid:formIsValid});
    }

    render () {
        const formElementsArray = [];
        for (let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }
        let form = (
            <form onSubmit={this.orderHandler}>
                {formElementsArray.map(formElement => (
                    <Input 
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        inValid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}
                        valueType={formElement.config.elementConfig.name}
                        changed={(event) => this.inputChangedHandler(event, formElement.id)} />
                ))}
                <Button btnType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
            </form>
        );
        if ( this.props.loading ) {
            form = <Spinner />;
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        );
    }
}

const mapStateToProps = state => {

    return{
        ings:state.burgerBuilder.ingredients,
        price:state.burgerBuilder.totalPrice,
        loading:state.order.loading,
        token:state.auth.token,
        userId:state.auth.userId
    }
   
};

const mapDispatchToProps = dispatch =>{

    return {
        onOrderBurger: (orderData, token) => dispatch(orderActions.purchaseBurger(orderData, token))
    }
}


export default connect(mapStateToProps,mapDispatchToProps) ( withErrorHandler( ContactData, axios) );