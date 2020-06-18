import React from 'react';
import classes from './burgerLogo.module.css';
import burger_Logo from '../../assets/images/burger_Logo.png'

const burgerLogo = (props) =>(
    <div className={classes.Logo}>
            <img src={burger_Logo} alt="MyBurger" />

    </div>
);

export default burgerLogo;