import React , {Component} from 'react';
import classes from './Modal.module.css';
import Backdrop from '../Backdrop/Backdrop';
import Aux from '../../../hoc/Auxiliary/Auxiliary';

class modal  extends Component {

    shouldComponentUpdate(nextProps,PrevState){
        return nextProps.show !== this.props.show || nextProps.children !== this.props.children;

    };

    render(){

        return(
            <Aux>
                <Backdrop show={this.props.show} clicked={this.props.modalCancel} />

                <div 
                className={classes.Modal}
                style={{
                    transform: this.props.show ? 'translateY(0)' :'translateY(-200vh)' ,
                    opacity: this.props.show ? '1' : '0'} }>
                {this.props.children}

                </div>

            </Aux>
        );
    }

}
export default modal;