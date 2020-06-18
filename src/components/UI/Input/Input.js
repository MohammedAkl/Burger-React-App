import React from 'react';

import classes from './Input.module.css';

const input =(props)=>{

    let inputElement = null;
    let elementClasses=[classes.InputElement];
    let errorMessage = null;

    if(props.inValid && props.shouldValidate && props.touched) {
        elementClasses.push(classes.InValid);
    }
    if(props.inValid &&  props.touched) {
        errorMessage=<p 
            className={classes.ValidationError}> 
                Please Enter a Valid {props.valueType} 
            </p>
    }
   
    switch ( props.elementType ) {
        case ( 'input' ):
            inputElement = <input
                className={elementClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />;
            break;
        case ( 'textarea' ):
            inputElement = <textarea
                className={elementClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />;
            break;
        case ( 'select' ):
            inputElement = (
                <select
                    className={elementClasses.join(' ')}
                    value={props.value}
                    onChange={props.changed}>
                    {props.elementConfig.options.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.displayValue}
                        </option>
                    ))}
                </select>
            );
            break;
        default:
            inputElement = <input
                className={elementClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />;
    }


    return(

        <div className={classes.Input}>
            <label className={classes.Label}>{props.lable}</label>
            {inputElement}   
            {errorMessage}         
        </div>


    );

}
export default input;