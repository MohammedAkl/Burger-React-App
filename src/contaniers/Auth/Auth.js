import React, {Component} from 'react';
import {connect} from 'react-redux'



import classes from './Auth.module.css';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/actions/index';
import { Redirect } from 'react-router';
import { updateObject, checkValidity } from '../../shared/utility';





class Auth extends Component {
    state={
        controls:{
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    name: 'Email',
                    placeholder: 'Email Address'
                },
                value: '',
                valid:false,
                validation: {
                    required:true,
                    isEmail:true
                },
                touched:false 
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    name: 'Password',
                    placeholder: 'Password'
                },
                value: '',
                valid:false,
                validation: {
                    required:true,
                    minLength:6

                },
                touched:false 
            }
        },
        isSignup:true

    }


    inputChangedHandler = (event, controlName) => {
        const updatedControls =  updateObject(this.state.controls, {
            [controlName]: updateObject(this.state.controls[controlName], {
                value: event.target.value,
                valid: checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true
            })

        });
        this.setState({controls: updatedControls});
    }
    submitHandler=(event)=>{
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value,this.state.controls.password.value, this.state.isSignup);
    }

    signupHandler=()=>{
        this.setState(prev=>{
            return{isSignup:!prev.isSignup};
        })
    }


    render(){
        const formElementsArray = [];
        for (let key in this.state.controls) {
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            });
        }
        let form = formElementsArray.map(formElement=>(
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
        
        ))

        if(this.props.loading){
            form=<Spinner/>
        }

        let errMsg=null;
        if(this.props.error) {
            errMsg=(
                <p className={classes.ErrMsg}>{this.props.error.message}</p>
            );
        }
        let authRredirect=null;
        if( this.props.isAuth ){
            if(this.props.buildingBurger){
                authRredirect=<Redirect to='/checkout'/>
            }
            else{
                authRredirect=<Redirect to='/'/>
            }
        }

        return(
            <div className={classes.Auth}>
                {errMsg}
                {authRredirect}
                <form onSubmit={this.submitHandler}>
                    {form}
                    <Button btnType='Success' >Submit</Button>
                </form>
                <Button btnType='Danger' clicked={this.signupHandler}>Switch To {this.state.isSignup ? 'Sign In' : 'Sign Up'}</Button>
                
            </div>
        );
    }
}


const mapStateToProps = state => {

    return{
        loading:state.auth.loading,
        error:state.auth.error,
        isAuth:state.auth.token,
        buildingBurger:state.burgerBuilder.building
    }
   
}


const mapDispatchToProps = dispatch =>{

    return {
        onAuth: (email, password, method) => dispatch(actions.auth(email, password, method))
    
    }
}
export default connect(mapStateToProps,mapDispatchToProps) (Auth);