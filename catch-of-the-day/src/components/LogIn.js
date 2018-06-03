import React from 'react';
import PropTypes from 'prop-types';

const LogIn = (props) => (
    <nav className="login">
        <h2>Inventor Login</h2>
        <p>Sign in to manage your store's inventory.</p>
        <button className="facebook" onClick={() => props.authenticate('facebook')}>LogIn with Facebook</button>
    </nav>
);

LogIn.propTypes = {
    authenticate: PropTypes.func.isRequired
};

export default LogIn;
