import React , {Component} from 'react';
import {Route , Switch, withRouter, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';


import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './contaniers/BurgerBuilder/BurgerBuilder';
import Logout from './contaniers/Auth/Logout/Logout';
import * as actions from './store/actions/index';
import asyncComponent from './hoc/asyncComponent/asyncComponent';



const asyncCheckout = asyncComponent(() => {
  return import('./contaniers/Checkout/Checkout');
});

const asyncOrders = asyncComponent(() => {
  return import('./contaniers/Orders/Orders');
});

const asyncAuth = asyncComponent(() => {
  return import('./contaniers/Auth/Auth');
});


class App extends Component {

  componentDidMount () {
    this.props.onTryAutoSignup();
  }

  render () {
    
  const routes = (
    <Switch>
      <Route path="/auth" component={asyncAuth} /> 
      <Route path="/checkout" component={asyncCheckout} />
      { this.props.isAuth? <Route path="/orders" component={asyncOrders} /> :null}
      <Route path="/logout" component={Logout} />
      <Route path="/" exact component={BurgerBuilder} />
      <Redirect to="/"/>
    </Switch>

  );

    return (
      <div>
        <Layout>
          {routes}
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuth: state.auth.token !== null
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch( actions.authCheckState() )
  };
};

export default withRouter( connect( mapStateToProps, mapDispatchToProps )( App ) );
